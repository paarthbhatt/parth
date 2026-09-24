import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  LineBasicNodeMaterial,
  LineSegments,
  Group,
  PerspectiveCamera,
  PointsNodeMaterial,
  RenderPipeline,
  Scene,
  Sprite,
  Vector3,
  WebGPURenderer,
} from "three/webgpu"
import type { Node } from "three/webgpu"
import {
  Fn,
  clamp,
  cos,
  cross,
  dot,
  exp,
  float,
  fract,
  hash,
  instanceIndex,
  instancedArray,
  length,
  max,
  mix,
  pass,
  screenCoordinate,
  select,
  sin,
  smoothstep,
  step,
  time,
  uniform,
  uv,
  vec3,
  vec4,
} from "three/tsl"
import { bloom } from "three/addons/tsl/display/BloomNode.js"
import type { IntroGraph } from "./graph"
import { mulberry32 } from "./graph"
import { rasterName } from "./text"

/* Spec palette. Particles are paper on void, resolved nodes cobalt, the hovered node signal. */
const PAPER = new Color("#EEF0F2")
const COBALT = new Color("#2448FF")
const SIGNAL = new Color("#FF5A1F")

export type Backend = "webgpu" | "webgl2"

export interface EngineOptions {
  canvas: HTMLCanvasElement
  graph: IntroGraph
  fontFamily: string
  mobile: boolean
  finePointer: boolean
  forceWebGL?: boolean
  /** Called every frame with projected node positions (CSS px) for the HTML labels. */
  onFrame: (frame: FrameInfo) => void
}

export interface FrameInfo {
  width: number
  height: number
  /** 0..1, how far the graph has formed. */
  graph: number
  nodes: { x: number; y: number; depth: number; visible: boolean }[]
}

export interface Engine {
  backend: Backend
  particles: number
  /** 0..1 scroll progress through the intro. */
  setProgress(p: number): void
  setHover(index: number | null): void
  setPointer(clientX: number, clientY: number, active: boolean): void
  resize(width: number, height: number): void
  setRunning(running: boolean): void
  dispose(): void
}

/** Particle budget per backend and device class. */
export function particleBudget(backend: Backend, mobile: boolean): number {
  if (backend === "webgpu") return mobile ? 70_000 : 200_000
  return mobile ? 32_000 : 90_000
}

const FOV = 35
const NAME_WIDTH_WIDE = 10
const NAME_WIDTH_TALL = 6.4
const GRAPH_RADIUS = 3.6
const AMBIENT_SHARE = 0.12
/** Share of graph particles that travel along edges as packets. */
const EDGE_SHARE = 0.34

/**
 * Divergence-free flow field: a sum of curls of plane waves,
 * curl(c * sin(w·p + φ)) = cos(w·p + φ) (w × c), on a lightly warped domain.
 * Cheap enough for 200k particles and still reads as turbulence.
 */
const FLOW_TERMS: [number, number, number, number, number, number, number, number][] = (() => {
  const r = mulberry32(0xc0ffee)
  const unit = () => {
    const z = r() * 2 - 1
    const t = r() * Math.PI * 2
    const s = Math.sqrt(1 - z * z)
    return [Math.cos(t) * s, Math.sin(t) * s, z]
  }
  const out: [number, number, number, number, number, number, number, number][] = []
  const freqs = [0.32, 0.45, 0.61, 0.83, 1.1, 1.45, 1.9]
  for (const f of freqs) {
    const w = unit()
    const c = unit()
    out.push([w[0] * f, w[1] * f, w[2] * f, c[0] / Math.sqrt(f), c[1] / Math.sqrt(f), c[2] / Math.sqrt(f), r() * 6.28, 0.25 + r() * 0.35])
  }
  return out
})()

function flowField(p: Node<"vec3">, t: Node<"float">): Node<"vec3"> {
  const q = p.add(sin(p.yzx.mul(0.9).add(t.mul(0.21))).mul(0.55))
  let v: Node<"vec3"> = vec3(0, 0, 0)
  for (const [wx, wy, wz, cx, cy, cz, ph, sp] of FLOW_TERMS) {
    const w = vec3(wx, wy, wz)
    const c = vec3(cx, cy, cz)
    v = v.add(cross(w, c).mul(cos(dot(q, w).add(t.mul(sp)).add(ph))))
  }
  return v
}

export async function createEngine(opts: EngineOptions): Promise<Engine> {
  const { canvas, graph, mobile, finePointer } = opts

  const renderer = new WebGPURenderer({
    canvas,
    antialias: false,
    alpha: false,
    powerPreference: "high-performance",
    forceWebGL: opts.forceWebGL === true,
  })
  renderer.setClearColor(0x000000, 1)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  await renderer.init()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const backendObj = renderer.backend as any
  const backend: Backend = backendObj.isWebGPUBackend ? "webgpu" : "webgl2"
  const COUNT = particleBudget(backend, mobile)

  const scene = new Scene()
  const camera = new PerspectiveCamera(FOV, 1, 0.1, 200)
  camera.position.set(0, 0, 14)

  /* ---------- CPU-side initial data ---------- */
  const rand = mulberry32(0xbadc0de)
  const gauss = () => {
    const u = Math.max(1e-6, rand())
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(6.2831853 * rand())
  }

  const pos = new Float32Array(COUNT * 3)
  const vel = new Float32Array(COUNT * 3)
  const home = new Float32Array(COUNT * 3) // text target (or drift home for ambient)
  const ga = new Float32Array(COUNT * 3) // node centre / edge start
  const gb = new Float32Array(COUNT * 3) // node offset / edge end
  const prm = new Float32Array(COUNT * 4) // seed, kind (-1 ambient, -2 edge, >=0 node index), phase, speed

  const nNodes = graph.nodes.length
  const nEdges = graph.edges.length
  const nodePos = graph.nodes.map((n) => new Vector3(n.x, n.y, n.z).multiplyScalar(GRAPH_RADIUS))
  const nodeRadius = graph.nodes.map((n) => GRAPH_RADIUS * (0.07 + 0.022 * Math.sqrt(n.degree)))
  const nodeWeight = nodeRadius.map((r) => r * r)
  const nodeWeightSum = nodeWeight.reduce((a, b) => a + b, 0)
  const edgeLen = graph.edges.map((e) => nodePos[e.a].distanceTo(nodePos[e.b]))
  const edgeLenSum = edgeLen.reduce((a, b) => a + b, 0)

  const pickWeighted = (weights: number[], sum: number) => {
    let x = rand() * sum
    for (let i = 0; i < weights.length; i++) {
      x -= weights[i]
      if (x <= 0) return i
    }
    return weights.length - 1
  }

  let wide = true
  const nameLines = (isWide: boolean) => (isWide ? ["Parth Bhatt"] : ["Parth", "Bhatt"])
  let nameRaster = rasterName(nameLines(wide), opts.fontFamily, COUNT, NAME_WIDTH_WIDE, rand)

  for (let i = 0; i < COUNT; i++) {
    const i3 = i * 3
    const i4 = i * 4
    const seed = rand()
    // Pure entropy: a loose cloud filling the frustum.
    pos[i3] = (rand() - 0.5) * 22
    pos[i3 + 1] = (rand() - 0.5) * 14
    pos[i3 + 2] = (rand() - 0.5) * 8
    prm[i4] = seed

    const r = rand()
    if (r < AMBIENT_SHARE) {
      prm[i4 + 1] = -1
      home[i3] = (rand() - 0.5) * 20
      home[i3 + 1] = (rand() - 0.5) * 12
      home[i3 + 2] = (rand() - 0.5) * 7
      continue
    }
    home[i3] = nameRaster.points[i3]
    home[i3 + 1] = nameRaster.points[i3 + 1]
    home[i3 + 2] = nameRaster.points[i3 + 2]

    if (nEdges > 0 && rand() < EDGE_SHARE) {
      // Packets travel along edges in small bunches, in both directions.
      const e = graph.edges[pickWeighted(edgeLen, edgeLenSum)]
      const flip = rand() < 0.5
      const A = nodePos[flip ? e.b : e.a]
      const B = nodePos[flip ? e.a : e.b]
      const jx = gauss() * 0.018, jy = gauss() * 0.018, jz = gauss() * 0.018
      ga.set([A.x + jx, A.y + jy, A.z + jz], i3)
      gb.set([B.x + jx, B.y + jy, B.z + jz], i3)
      const packets = 3
      const packet = (rand() * packets) | 0
      prm[i4 + 1] = -2
      prm[i4 + 2] = packet / packets + gauss() * 0.014 + (flip ? 0.5 / packets : 0)
      prm[i4 + 3] = 0.55 / Math.max(0.5, A.distanceTo(B))
    } else {
      const n = pickWeighted(nodeWeight, nodeWeightSum)
      const c = nodePos[n]
      // Uniform-in-ball offset: additive blending makes the core read brighter.
      const z = rand() * 2 - 1
      const t = rand() * Math.PI * 2
      const s = Math.sqrt(1 - z * z)
      const rr = nodeRadius[n] * Math.cbrt(rand())
      ga.set([c.x, c.y, c.z], i3)
      gb.set([Math.cos(t) * s * rr, z * rr, Math.sin(t) * s * rr], i3)
      prm[i4 + 1] = n
      prm[i4 + 2] = 0
      prm[i4 + 3] = (0.15 + rand() * 0.35) * (rand() < 0.5 ? -1 : 1)
    }
  }

  const posBuf = instancedArray(pos, "vec3")
  const velBuf = instancedArray(vel, "vec3")
  const homeBuf = instancedArray(home, "vec3")
  const gaBuf = instancedArray(ga, "vec3")
  const gbBuf = instancedArray(gb, "vec3")
  const prmBuf = instancedArray(prm, "vec4")

  /* ---------- uniforms ---------- */
  const uTime = uniform(0)
  const uDt = uniform(1 / 60)
  const uResolve = uniform(0)
  const uGraph = uniform(0)
  const uAngle = uniform(0)
  const uPointer = uniform(new Vector3(0, 0, 1000))
  const uPointerOn = uniform(0)
  const uHover = uniform(-10)
  const uSize = uniform(mobile ? 1.7 : 1.45)
  const uAlpha = uniform(Math.min(0.85, 0.5 * Math.sqrt(200_000 / COUNT)))

  const rotY = (p: Node<"vec3">) => {
    const c = cos(uAngle)
    const s = sin(uAngle)
    return vec3(p.x.mul(c).add(p.z.mul(s)), p.y, p.z.mul(c).sub(p.x.mul(s)))
  }

  /** Per-particle graph progress: staggered by seed so the name streams away, not snaps. */
  const graphProgress = (seed: Node<"float">) => smoothstep(0, 1, clamp(uGraph.mul(1.5).sub(seed.mul(0.5)), 0, 1))

  /* ---------- compute: one integration step per frame ---------- */
  const update = Fn(() => {
    const p = posBuf.element(instanceIndex)
    const v = velBuf.element(instanceIndex)
    const home = homeBuf.element(instanceIndex)
    const a = gaBuf.element(instanceIndex)
    const b = gbBuf.element(instanceIndex)
    const q = prmBuf.element(instanceIndex)

    const seed = q.x
    const kind = q.y
    const isAmbient = step(kind, -0.5).mul(step(-1.5, kind))
    const isEdge = step(kind, -1.5)

    const g = graphProgress(seed).mul(isAmbient.oneMinus()).toVar()

    // Graph target: along the edge for packets, orbiting inside the node ball otherwise.
    const f = fract(q.z.add(uTime.mul(q.w)))
    const ang = uTime.mul(q.w)
    const ca = cos(ang)
    const sa = sin(ang)
    const orbit = vec3(b.x.mul(ca).add(b.z.mul(sa)), b.y, b.z.mul(ca).sub(b.x.mul(sa)))
    const local = select(isEdge.greaterThan(0.5), mix(a, b, f), a.add(orbit))
    const graphTarget = rotY(local)

    const target = mix(home, graphTarget, g)

    // Spring toward the target once the signal resolves; ambient particles only drift home.
    const pull = uResolve.mul(mix(float(1), float(0.06), isAmbient))
    const k = float(26)

    // Turbulence: full entropy at first, a residual shimmer once resolved, a gust mid-transit.
    const transit = sin(g.mul(Math.PI))
    const amp = mix(float(1), float(0.045), uResolve.mul(isAmbient.oneMinus()))
      .add(transit.mul(0.9))
      .add(isAmbient.mul(0.15))
    const flow = flowField(p.mul(0.34), uTime).mul(amp).mul(2.4)

    const acc = target.sub(p).mul(k).mul(pull).add(flow).sub(p.mul(0.08).mul(uResolve.oneMinus())).toVar()

    // Pointer repulsion (desktop only; uPointerOn stays 0 on touch).
    const d = p.sub(uPointer)
    const dl = max(length(d.xy), 0.0001)
    const falloff = clamp(float(1).sub(dl.div(1.3)), 0, 1)
    acc.addAssign(vec3(d.xy.div(dl), 0).mul(falloff.mul(falloff).mul(uPointerOn).mul(70)))

    const damp = exp(uDt.mul(-7.5))
    const nv = v.add(acc.mul(uDt)).mul(damp).toVar()
    const np = p.add(nv.mul(uDt)).toVar()

    // Packets and settled node particles lock to their path so wrap-around is invisible.
    const lock = smoothstep(0.88, 1, g).mul(isEdge).mul(uPointerOn.mul(0.6).oneMinus())
    np.assign(mix(np, graphTarget, lock))
    nv.mulAssign(lock.oneMinus())

    v.assign(nv)
    p.assign(np)
  })().compute(COUNT)

  /* ---------- render ---------- */
  const material = new PointsNodeMaterial({
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: AdditiveBlending,
    sizeAttenuation: false,
  })
  material.positionNode = posBuf.toAttribute()
  material.sizeNode = uSize

  const q = prmBuf.toAttribute()
  const qSeed = q.x
  const qKind = q.y
  const rIsAmbient = step(qKind, -0.5).mul(step(-1.5, qKind))
  const rIsEdge = step(qKind, -1.5)
  const rIsNode = step(-0.5, qKind)
  const rg = graphProgress(qSeed).mul(rIsAmbient.oneMinus())
  const hovered = step(qKind.sub(uHover).abs(), 0.5).mul(rIsNode)
  const nodeColor = mix(vec3(COBALT.r, COBALT.g, COBALT.b), vec3(SIGNAL.r, SIGNAL.g, SIGNAL.b), hovered)
  const paper = vec3(PAPER.r, PAPER.g, PAPER.b)
  const col = mix(paper, nodeColor, rg.mul(rIsNode))
  const rf = fract(q.z.add(uTime.mul(q.w)))
  const edgeFade = mix(float(1), smoothstep(0, 0.1, rf).mul(smoothstep(1, 0.9, rf)).mul(0.85), rg.mul(rIsEdge))
  const round = smoothstep(0.5, 0.2, length(uv().sub(0.5)))
  const alpha = uAlpha
    .mul(mix(float(1), float(0.45), rIsAmbient))
    .mul(edgeFade)
    .mul(mix(float(1), float(1.6), rg.mul(rIsNode)))
    .mul(round)
  material.colorNode = vec4(col, 1)
  material.opacityNode = alpha

  const particles = new Sprite(material)
  particles.count = COUNT
  particles.frustumCulled = false
  scene.add(particles)

  // Edges: thin cobalt lines, rotated with the graph.
  const edgeGroup = new Group()
  const edgeGeo = new BufferGeometry()
  const edgeArr = new Float32Array(Math.max(1, nEdges) * 6)
  graph.edges.forEach((e, i) => {
    edgeArr.set([nodePos[e.a].x, nodePos[e.a].y, nodePos[e.a].z, nodePos[e.b].x, nodePos[e.b].y, nodePos[e.b].z], i * 6)
  })
  edgeGeo.setAttribute("position", new BufferAttribute(edgeArr, 3))
  const uLines = uniform(0)
  const lineMat = new LineBasicNodeMaterial({ transparent: true, depthWrite: false, depthTest: false, blending: AdditiveBlending })
  lineMat.colorNode = vec4(COBALT.r, COBALT.g, COBALT.b, 1)
  lineMat.opacityNode = uLines
  const lines = new LineSegments(edgeGeo, lineMat)
  lines.frustumCulled = false
  if (nEdges > 0) edgeGroup.add(lines)
  scene.add(edgeGroup)

  /* ---------- post: restrained bloom on the dense (resolved) signal, faint grain ---------- */
  const pipeline = new RenderPipeline(renderer)
  const scenePass = pass(scene, camera)
  const sceneColor = scenePass.getTextureNode("output")
  const bloomNode = bloom(sceneColor, 0.55, 0.32, 0.5)
  const lit = sceneColor.add(bloomNode)
  // Multiplicative grain: it textures the light, never lifts the void above #000.
  const grain = hash(screenCoordinate.x.add(screenCoordinate.y.mul(4096)).add(fract(time).mul(1e5))).sub(0.5).mul(0.09)
  pipeline.outputNode = vec4(lit.rgb.mul(grain.add(1)), 1)

  /* ---------- camera framing ---------- */
  let width = 1
  let height = 1
  let dText = 14
  let dGraph = 14
  const fitDistance = (halfW: number, halfH: number, fill: number) => {
    const t = Math.tan((FOV * Math.PI) / 360)
    return Math.max(halfW / (t * camera.aspect), halfH / t) / fill
  }
  const relayout = () => {
    const nowWide = width / height >= 1.05
    if (nowWide !== wide) {
      wide = nowWide
      nameRaster = rasterName(nameLines(wide), opts.fontFamily, COUNT, wide ? NAME_WIDTH_WIDE : NAME_WIDTH_TALL, rand)
      const pts = nameRaster.points
      for (let i = 0; i < COUNT; i++) {
        if (prm[i * 4 + 1] === -1) continue
        home[i * 3] = pts[i * 3]
        home[i * 3 + 1] = pts[i * 3 + 1]
        home[i * 3 + 2] = pts[i * 3 + 2]
      }
      homeBuf.value.needsUpdate = true
    }
    dText = fitDistance(nameRaster.width / 2, nameRaster.height / 2, wide ? 0.8 : 0.84)
    // Leave room for labels to the right of nodes.
    dGraph = fitDistance(GRAPH_RADIUS * 1.18 + (wide ? 0.9 : 0.6), GRAPH_RADIUS * 1.1, 0.92)
  }

  const resize = (w: number, h: number) => {
    width = Math.max(1, w)
    height = Math.max(1, h)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height, false)
    relayout()
  }
  resize(canvas.clientWidth || window.innerWidth, canvas.clientHeight || window.innerHeight)

  /* ---------- loop ---------- */
  let raf = 0
  let running = false
  let last = 0
  let elapsed = 0
  let simTime = 0
  let progress = 0
  let gSmooth = 0
  let pointerTarget = 0
  let pointerOn = 0
  const parallax = { x: 0, y: 0, tx: 0, ty: 0 }
  const tmp = new Vector3()
  const frameNodes = graph.nodes.map(() => ({ x: 0, y: 0, depth: 0, visible: false }))
  let disposed = false

  const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
  const sstep = (a: number, b: number, x: number) => {
    const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
    return t * t * (3 - 2 * t)
  }

  const frame = (now: number) => {
    if (!running || disposed) return
    raf = requestAnimationFrame(frame)
    const dt = Math.min(1 / 30, Math.max(0.001, (now - last) / 1000))
    last = now
    elapsed += dt
    simTime += dt

    // The name resolves on its own within ~2.4s; scroll then takes it into the graph.
    const resolve = ease(Math.min(1, Math.max(0, (elapsed - 0.3) / 2.0)))
    const gTarget = sstep(0.02, 0.92, progress)
    gSmooth += (gTarget - gSmooth) * Math.min(1, dt * 5)
    pointerOn += (pointerTarget - pointerOn) * Math.min(1, dt * 4)

    uTime.value = simTime
    uDt.value = dt
    uResolve.value = resolve
    uGraph.value = gSmooth
    uAngle.value = -0.35 + simTime * 0.025 + gSmooth * 0.5
    uPointerOn.value = pointerOn * resolve
    uLines.value = sstep(0.55, 1, gSmooth) * 0.42

    parallax.x += (parallax.tx - parallax.x) * Math.min(1, dt * 3)
    parallax.y += (parallax.ty - parallax.y) * Math.min(1, dt * 3)
    const dist = dText + (dGraph - dText) * gSmooth
    camera.position.set(parallax.x * dist * 0.035, parallax.y * dist * 0.025, dist)
    camera.lookAt(0, 0, 0)
    camera.updateMatrixWorld()
    edgeGroup.rotation.y = uAngle.value

    renderer.compute(update)
    pipeline.render()

    // Project nodes for the HTML labels.
    const c = Math.cos(uAngle.value)
    const s = Math.sin(uAngle.value)
    for (let i = 0; i < nNodes; i++) {
      const n = nodePos[i]
      tmp.set(n.x * c + n.z * s, n.y, n.z * c - n.x * s)
      const depth = tmp.z
      tmp.project(camera)
      const fn = frameNodes[i]
      fn.x = (tmp.x * 0.5 + 0.5) * width
      fn.y = (-tmp.y * 0.5 + 0.5) * height
      fn.depth = depth / GRAPH_RADIUS
      fn.visible = tmp.z < 1
    }
    opts.onFrame({ width, height, graph: gSmooth, nodes: frameNodes })
  }

  const setRunning = (r: boolean) => {
    if (disposed || r === running) return
    running = r
    if (r) {
      last = performance.now()
      raf = requestAnimationFrame(frame)
    } else {
      cancelAnimationFrame(raf)
    }
  }

  // Unproject the pointer onto the z=0 plane for repulsion.
  const ndc = new Vector3()
  const dir = new Vector3()
  const setPointer = (clientX: number, clientY: number, active: boolean) => {
    if (!finePointer) return
    const rect = canvas.getBoundingClientRect()
    const nx = ((clientX - rect.left) / rect.width) * 2 - 1
    const ny = -((clientY - rect.top) / rect.height) * 2 + 1
    parallax.tx = active ? nx : 0
    parallax.ty = active ? ny : 0
    pointerTarget = active ? 1 : 0
    ndc.set(nx, ny, 0.5).unproject(camera)
    dir.copy(ndc).sub(camera.position).normalize()
    const t = -camera.position.z / dir.z
    uPointer.value.copy(camera.position).addScaledVector(dir, t)
  }

  return {
    backend,
    particles: COUNT,
    setProgress: (p) => {
      progress = Math.min(1, Math.max(0, p))
    },
    setHover: (i) => {
      uHover.value = i === null ? -10 : i
    },
    setPointer,
    resize,
    setRunning,
    dispose: () => {
      if (disposed) return
      setRunning(false)
      disposed = true
      scene.remove(particles, edgeGroup)
      material.dispose()
      lineMat.dispose()
      edgeGeo.dispose()
      update.dispose()
      bloomNode.dispose()
      scenePass.dispose()
      pipeline.dispose()
      renderer.dispose()
    },
  }
}
