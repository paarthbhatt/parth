import { securityProjectsData } from "@/lib/data"
import { projectId } from "@/lib/slug"

/**
 * The intro graph: one node per real project in `securityProjectsData`, and an
 * edge wherever two projects' tags share a word. Nothing here is typed in by
 * hand; add a project to lib/data.ts and it shows up as a node.
 */

export interface GraphNode {
  index: number
  title: string
  href: string
  /** Tag words this node shares with at least one neighbour. */
  words: string[]
  degree: number
  /** Unit-scale layout position, centred on the origin, max radius 1. */
  x: number
  y: number
  z: number
}

export interface GraphEdge {
  a: number
  b: number
  /** The tag words the two projects share. */
  shared: string[]
}

export interface IntroGraph {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

const STOP = new Set(["and", "the", "of", "for", "a", "an", "to", "in", "on", "with"])

function tagWords(tag: string): Set<string> {
  return new Set(
    tag
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 1 && !STOP.has(w)),
  )
}

/** Small deterministic PRNG so server, poster and scene agree on the layout. */
export function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function layout(count: number, edges: GraphEdge[]): [number, number, number][] {
  const rand = mulberry32(0x5eed)
  // Start on a Fibonacci sphere: evenly spread, no accidental overlaps.
  const p: [number, number, number][] = []
  for (let i = 0; i < count; i++) {
    const y = count === 1 ? 0 : 1 - (2 * (i + 0.5)) / count
    const r = Math.sqrt(1 - y * y)
    const th = i * Math.PI * (3 - Math.sqrt(5))
    p.push([Math.cos(th) * r + (rand() - 0.5) * 0.1, y, Math.sin(th) * r + (rand() - 0.5) * 0.1])
  }
  if (count < 2) return p.map(() => [0, 0, 0])

  // Fruchterman–Reingold in 3D, with a weak pull to the centre so isolated
  // projects stay on screen instead of drifting off.
  const k = 1.1 / Math.cbrt(count)
  const disp = p.map(() => [0, 0, 0])
  let temp = 0.25
  for (let it = 0; it < 400; it++) {
    for (const d of disp) d[0] = d[1] = d[2] = 0
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = p[i][0] - p[j][0]
        const dy = p[i][1] - p[j][1]
        const dz = p[i][2] - p[j][2]
        const d = Math.max(1e-3, Math.hypot(dx, dy, dz))
        const f = (k * k) / d / d
        disp[i][0] += dx * f
        disp[i][1] += dy * f
        disp[i][2] += dz * f
        disp[j][0] -= dx * f
        disp[j][1] -= dy * f
        disp[j][2] -= dz * f
      }
    }
    for (const e of edges) {
      const dx = p[e.a][0] - p[e.b][0]
      const dy = p[e.a][1] - p[e.b][1]
      const dz = p[e.a][2] - p[e.b][2]
      const d = Math.max(1e-3, Math.hypot(dx, dy, dz))
      const f = d / k
      disp[e.a][0] -= dx * f
      disp[e.a][1] -= dy * f
      disp[e.a][2] -= dz * f
      disp[e.b][0] += dx * f
      disp[e.b][1] += dy * f
      disp[e.b][2] += dz * f
    }
    for (let i = 0; i < count; i++) {
      disp[i][0] -= p[i][0] * 0.35
      disp[i][1] -= p[i][1] * 0.35
      disp[i][2] -= p[i][2] * 0.35
      const m = Math.max(1e-6, Math.hypot(disp[i][0], disp[i][1], disp[i][2]))
      const s = Math.min(m, temp) / m
      p[i][0] += disp[i][0] * s
      p[i][1] += disp[i][1] * s
      p[i][2] += disp[i][2] * s
    }
    temp = Math.max(0.005, temp * 0.985)
  }

  // Centre, flatten depth a little (labels read better), normalise to radius 1.
  const c = [0, 0, 0]
  for (const q of p) for (let a = 0; a < 3; a++) c[a] += q[a] / count
  let max = 1e-6
  for (const q of p) {
    q[0] -= c[0]
    q[1] -= c[1]
    q[2] = (q[2] - c[2]) * 0.7
    max = Math.max(max, Math.hypot(q[0], q[1], q[2]))
  }
  const out = p.map((q) => [q[0] / max, q[1] / max, q[2] / max] as [number, number, number])
  return spread(out)
}

/**
 * Force layouts pack a connected cluster tight and fling unconnected projects to
 * the rim, which piles labels on top of each other. Keep each node's direction
 * but hand out radii evenly by rank, then push apart any pair that is still
 * closer than a label-friendly gap.
 */
function spread(p: [number, number, number][]): [number, number, number][] {
  const n = p.length
  if (n < 3) return p
  const order = p.map((q, i) => ({ i, r: Math.hypot(q[0], q[1], q[2]) })).sort((a, b) => a.r - b.r)
  order.forEach(({ i, r }, rank) => {
    const target = 0.3 + 0.7 * Math.pow(rank / (n - 1), 0.8)
    const s = r > 1e-6 ? target / r : 0
    if (s === 0) {
      p[i] = [target, 0, 0]
    } else {
      p[i] = [p[i][0] * s, p[i][1] * s, p[i][2] * s]
    }
  })
  const minGap = 1.1 / Math.sqrt(n)
  for (let it = 0; it < 60; it++) {
    let moved = false
    for (let a = 0; a < n; a++) {
      for (let b = a + 1; b < n; b++) {
        // Labels live in screen space, so measure the gap mostly in x/y.
        const dx = p[a][0] - p[b][0]
        const dy = p[a][1] - p[b][1]
        const dz = (p[a][2] - p[b][2]) * 0.35
        const d = Math.max(1e-4, Math.hypot(dx, dy, dz))
        if (d >= minGap) continue
        const push = (minGap - d) / 2 / d
        p[a][0] += dx * push
        p[a][1] += dy * push
        p[b][0] -= dx * push
        p[b][1] -= dy * push
        moved = true
      }
    }
    if (!moved) break
  }
  let max = 1e-6
  for (const q of p) max = Math.max(max, Math.hypot(q[0], q[1], q[2]))
  return p.map((q) => [q[0] / max, q[1] / max, q[2] / max])
}

let cached: IntroGraph | null = null

export function getIntroGraph(): IntroGraph {
  if (cached) return cached
  const words = securityProjectsData.map((p) => tagWords(p.tag))
  const edges: GraphEdge[] = []
  for (let a = 0; a < words.length; a++) {
    for (let b = a + 1; b < words.length; b++) {
      const shared = [...words[a]].filter((w) => words[b].has(w))
      if (shared.length) edges.push({ a, b, shared })
    }
  }
  const pos = layout(securityProjectsData.length, edges)
  const nodes: GraphNode[] = securityProjectsData.map((p, index) => {
    const mine = edges.filter((e) => e.a === index || e.b === index)
    return {
      index,
      title: p.title,
      href: `#${projectId(p.title)}`,
      words: [...new Set(mine.flatMap((e) => e.shared))],
      degree: mine.length,
      x: pos[index][0],
      y: pos[index][1],
      z: pos[index][2],
    }
  })
  cached = { nodes, edges }
  return cached
}

/** Plain-language caption; every number in it is computed. */
export function graphCaption(g: IntroGraph): string {
  const n = g.nodes.length
  return `${n} project${n === 1 ? "" : "s"}, linked where their tags share a word.`
}
