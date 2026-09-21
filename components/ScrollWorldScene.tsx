"use client"

import { useMemo, useRef, useState, type ComponentType, type ReactElement } from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Sparkles } from "@react-three/drei"
import { WORLD_PROGRESS, camUFromP } from "./worldProgress"

/* ───────────────────────────────────────────────
   ScrollWorldScene — the 3D flight.
   One scene per sticky panel. The camera HOLDS on a
   diorama while its panel is centered in the viewport
   and FLIES (arc + bank) only during the transition
   between panels — everything reads off the same
   WORLD_PROGRESS.p that the DOM panels use.
   ─────────────────────────────────────────────── */

export type SceneAnchor = {
  id: string
  x: number
  z: number
  hue: string
  /** Where the camera should look — usually the diorama, sometimes the horizon. */
  lookX: number
  lookZ: number
}

export const SCENE_ANCHORS: SceneAnchor[] = [
  { id: "boot", x: 0, z: 0, hue: "#10b981", lookX: 0, lookZ: -1.2 },
  { id: "experience", x: 2.6, z: -6.4, hue: "#06b6d4", lookX: 2.6, lookZ: -6.4 },
  { id: "projects", x: -3.0, z: -12.8, hue: "#3b82f6", lookX: -3.0, lookZ: -12.8 },
  { id: "writeups", x: 2.8, z: -19.2, hue: "#22d3ee", lookX: 2.8, lookZ: -19.2 },
  { id: "skills", x: -2.6, z: -25.6, hue: "#10b981", lookX: -2.6, lookZ: -25.6 },
  { id: "certifications", x: 3.0, z: -32.0, hue: "#06b6d4", lookX: 3.0, lookZ: -32.0 },
  { id: "achievements", x: -2.8, z: -38.4, hue: "#eab308", lookX: -2.8, lookZ: -38.4 },
  { id: "contact", x: 0.4, z: -44.0, hue: "#10b981", lookX: 0, lookZ: -48 },
]

/* ── Camera sync math — mirrors the sticky-panel geometry in globals.css ──
   camU is "anchor index space": camU = i means the camera is centered on
   scene i exactly when its panel is pinned dead-center on screen. */

const HOLD_START = -0.1875 // camU offset where a panel pins
const HOLD_END = 0.375 // camU offset where it releases and the fly begins
const FLY_SPAN = 0.4375 // camU length of the fly between anchors
const CAM_DIST = 3.1

const clamp01 = (x: number) => Math.min(1, Math.max(0, x))
const smooth = (x: number) => x * x * (3 - 2 * x)

function orbit(a: SceneAnchor, spin: number) {
  return {
    x: a.x + Math.sin(spin) * CAM_DIST,
    y: 2.75,
    z: a.z + Math.cos(spin) * CAM_DIST,
  }
}

/** Hold-orbit angle: sweeps gently across a scene's pinned window. */
function holdSpin(g: number): number {
  const u = clamp01((g - HOLD_START) / (HOLD_END - HOLD_START))
  return -0.3 + u * 0.6
}

/** Desktop flight = true. Mobile, reduced-motion and skip get the hero rig only. */
export function renderAsStatic(skip: boolean): boolean {
  if (skip) return true
  if (typeof window === "undefined") return true
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true
  if (window.matchMedia("(hover: none), (max-width: 767px)").matches) return true
  return false
}

/* ── Shared materials & textures ── */

function useGlowTexture(color: string) {
  return useMemo(() => {
    const size = 128
    const cnv = document.createElement("canvas")
    cnv.width = size
    cnv.height = size
    const ctx = cnv.getContext("2d")!
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    g.addColorStop(0, color)
    g.addColorStop(0.35, `${color}55`)
    g.addColorStop(1, "#00000000")
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
    const tex = new THREE.CanvasTexture(cnv)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }, [color])
}

const CHASSIS = { color: "#0a1512", metalness: 0.55, roughness: 0.38 } as const
const DARK = { color: "#04100c", metalness: 0.4, roughness: 0.5 } as const

/* ── Small shared actors ── */

function GlowSprite({
  color,
  size = 1.6,
  opacity = 0.5,
  position = [0, 0, 0],
}: {
  color: string
  size?: number
  opacity?: number
  position?: [number, number, number]
}) {
  const tex = useGlowTexture(color)
  return (
    <sprite position={position} scale={[size, size, 1]}>
      <spriteMaterial
        map={tex}
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </sprite>
  )
}

function PulseRing({ color, offset, speed = 0.45 }: { color: string; offset: number; speed?: number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    const m = ref.current
    if (!m) return
    const t = (clock.elapsedTime * speed + offset) % 1
    const s = 0.7 + t * 1.7
    m.scale.set(s, s, s)
    const mat = m.material as THREE.MeshBasicMaterial
    mat.opacity = (1 - t) * 0.3
  })
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
      <ringGeometry args={[0.5, 0.53, 48]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  )
}

/** Sentinel drone orbiting inside the dome. */
function Drone({ color, radius, speed, phase }: { color: string; radius: number; speed: number; phase: number }) {
  const ref = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    const g = ref.current
    if (!g) return
    const t = clock.elapsedTime * speed + phase
    g.position.set(Math.cos(t) * radius, 1.55 + Math.sin(t * 1.7) * 0.22, Math.sin(t) * radius)
    g.rotation.y = -t + Math.PI / 2
  })
  return (
    <group ref={ref}>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <capsuleGeometry args={[0.035, 0.11, 4, 8]} />
        <meshStandardMaterial color="#0f1f1a" metalness={0.6} roughness={0.35} emissive={color} emissiveIntensity={0.35} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.045, 10, 10]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* Glow sprite instead of a point light — identical read, none of the
          cost of 8 extra dynamic lights in the shader. */}
      <GlowSprite color={color} size={0.55} opacity={0.6} />
    </group>
  )
}

/** Hex pedestal pylon supporting the core — nothing floats unsupported. */
function Pedestal({ color }: { color: string }) {
  return (
    <group>
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.34, 0.5, 0.28, 6]} />
        <meshStandardMaterial {...CHASSIS} />
      </mesh>
      <mesh position={[0, 0.56, 0]}>
        <cylinderGeometry args={[0.17, 0.28, 0.34, 6]} />
        <meshStandardMaterial color="#081410" metalness={0.7} roughness={0.3} emissive={color} emissiveIntensity={0.08} />
      </mesh>
      <mesh position={[0, 0.74, 0]}>
        <cylinderGeometry args={[0.11, 0.15, 0.06, 6]} />
        <meshStandardMaterial color="#0d2620" metalness={0.5} roughness={0.4} emissive={color} emissiveIntensity={0.25} />
      </mesh>
    </group>
  )
}

/** Data conduits running from the platform edge to the pedestal. */
function Conduits({ color }: { color: string }) {
  const ref = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    const g = ref.current
    if (!g) return
    g.children.forEach((child, i) => {
      const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial
      if (mat) mat.opacity = 0.3 + Math.sin(clock.elapsedTime * 2.4 + i * 2.1) * 0.2
    })
  })
  return (
    <group ref={ref}>
      {[0, 1, 2].map((i) => {
        const a = (i / 3) * Math.PI * 2 + 0.5
        const x1 = Math.cos(a) * 1.42
        const z1 = Math.sin(a) * 1.42
        const mx = x1 * 0.55
        const mz = z1 * 0.55
        return (
          <mesh key={i} position={[mx, 0.055, mz]} rotation={[-Math.PI / 2, 0, -a]}>
            <planeGeometry args={[0.05, Math.hypot(x1, z1) * 2, 1, 1]} />
            <meshBasicMaterial color={color} transparent opacity={0.4} depthWrite={false} />
          </mesh>
        )
      })}
    </group>
  )
}

function Dome({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.MeshPhysicalMaterial
      mat.opacity = 0.1 + Math.sin(clock.elapsedTime * 0.6) * 0.03
    }
  })
  return (
    <mesh ref={ref} position={[0, 0.85, 0]}>
      <sphereGeometry args={[1.42, 28, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={0.1}
        roughness={0.12}
        metalness={0}
        transmission={0.85}
        thickness={0.4}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}

/* ── Detailed themed cores — each stop reads as its subject ── */

/** ORIGIN — the analyst desk: laptop + side monitor + coffee mug + HUD holo. */
function CoreBoot({ color }: { color: string }) {
  const holo = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (holo.current) holo.current.rotation.y = clock.elapsedTime * 0.9
  })
  return (
    <group>
      {/* laptop: flat base + keyboard deck glow + lid hinged at the rear edge,
          pitched open ~106° so the screen faces the viewer */}
      <mesh position={[-0.32, 0.86, 0]}>
        <boxGeometry args={[0.46, 0.03, 0.32]} />
        <meshStandardMaterial color="#0c1c17" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[-0.32, 0.878, 0.03]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.36, 0.2]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
      <group position={[-0.32, 0.872, -0.15]} rotation={[-1.85, 0, 0]}>
        <mesh position={[0, 0, 0.16]}>
          <boxGeometry args={[0.46, 0.022, 0.32]} />
          <meshStandardMaterial color="#0c1c17" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.013, 0.16]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.41, 0.27]} />
          <meshBasicMaterial color={color} transparent opacity={0.9} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <pointLight position={[-0.3, 1.1, 0.3]} color={color} intensity={0.7} distance={2.2} />
      {/* standing monitor */}
      <mesh position={[0.36, 1.06, -0.06]}>
        <boxGeometry args={[0.44, 0.3, 0.03]} />
        <meshStandardMaterial color="#0c1c17" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.36, 1.06, -0.04]}>
        <planeGeometry args={[0.39, 0.25]} />
        <meshBasicMaterial color={color} transparent opacity={0.75} />
      </mesh>
      <mesh position={[0.36, 0.9, -0.06]}>
        <cylinderGeometry args={[0.02, 0.02, 0.12, 6]} />
        <meshStandardMaterial color="#123128" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* mug */}
      <mesh position={[0.05, 0.9, 0.18]}>
        <cylinderGeometry args={[0.045, 0.04, 0.09, 12]} />
        <meshStandardMaterial color="#1b332b" metalness={0.2} roughness={0.7} />
      </mesh>
      <mesh position={[0.05, 0.95, 0.18]}>
        <torusGeometry args={[0.032, 0.008, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#1b332b" roughness={0.7} />
      </mesh>
      {/* floating HUD holo */}
      <mesh ref={holo} position={[0, 1.34, 0]} rotation={[-0.35, 0, 0]}>
        <torusGeometry args={[0.2, 0.008, 8, 40]} />
        <meshBasicMaterial color={color} transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, 1.34, 0]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <Sparkles count={12} scale={[1.1, 0.7, 1.1]} position={[0, 1.32, 0]} size={1.6} speed={0.4} color={color} opacity={0.7} />
    </group>
  )
}

/** SUBROUTINE — the defense mainframe: windowed tower, blinking status lights, rotating radar dish. */
function CoreExperience({ color }: { color: string }) {
  const blink = useRef<THREE.Group>(null)
  const dish = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (blink.current) {
      blink.current.children.forEach((l, i) => {
        const mat = (l as THREE.Mesh).material as THREE.MeshBasicMaterial
        mat.opacity = 0.35 + 0.65 * Math.max(0, Math.sin(clock.elapsedTime * (2.2 + i * 0.9) + i))
      })
    }
    if (dish.current) dish.current.rotation.y = clock.elapsedTime * 0.8
  })
  return (
    <group>
      {/* mainframe tower */}
      <mesh position={[0, 1.28, 0]}>
        <boxGeometry args={[0.52, 1.08, 0.4]} />
        <meshStandardMaterial color="#0b1815" metalness={0.75} roughness={0.28} />
      </mesh>
      {/* window slits */}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[0, 1.62 - i * 0.19, 0.21]}>
          <planeGeometry args={[0.4, 0.07]} />
          <meshBasicMaterial color={color} transparent opacity={0.75 - i * 0.12} />
        </mesh>
      ))}
      {/* blinking status lights */}
      <group ref={blink}>
        {[-0.16, 0, 0.16].map((x, i) => (
          <mesh key={i} position={[x, 0.92, 0.21]}>
            <sphereGeometry args={[0.022, 8, 8]} />
            <meshBasicMaterial color={i === 1 ? "#fbbf24" : color} transparent />
          </mesh>
        ))}
      </group>
      {/* side rack */}
      <mesh position={[0.52, 1.02, 0]}>
        <boxGeometry args={[0.24, 0.62, 0.34]} />
        <meshStandardMaterial color="#0a1411" metalness={0.7} roughness={0.35} />
      </mesh>
      <mesh position={[0.52, 1.02, 0.18]}>
        <planeGeometry args={[0.16, 0.4]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </mesh>
      {/* rotating radar dish on top */}
      <group ref={dish} position={[0, 1.92, 0]}>
        <mesh>
          <sphereGeometry args={[0.16, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2.6]} />
          <meshStandardMaterial color="#13261f" metalness={0.6} roughness={0.4} side={THREE.DoubleSide} emissive={color} emissiveIntensity={0.15} />
        </mesh>
        <mesh position={[0, 0.05, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.18, 6]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>
      <mesh position={[0, 1.84, 0]}>
        <cylinderGeometry args={[0.03, 0.04, 0.1, 8]} />
        <meshStandardMaterial color="#0d2620" metalness={0.6} roughness={0.4} />
      </mesh>
      <Sparkles count={12} scale={[1.5, 1.2, 1.5]} position={[0, 1.35, 0]} size={1.8} speed={0.3} color={color} opacity={0.55} />
    </group>
  )
}

/** ARSENAL — the satellite build deck: solar-wing bus under assembly + drone arm. */
function CoreProjects({ color }: { color: string }) {
  const wingL = useRef<THREE.Group>(null)
  const wingR = useRef<THREE.Group>(null)
  const bus = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (bus.current) bus.current.position.y = 1.32 + Math.sin(t * 0.9) * 0.06
    const f = Math.sin(t * 0.55) * 0.12
    if (wingL.current) wingL.current.rotation.z = f
    if (wingR.current) wingR.current.rotation.z = -f
  })
  const wing = (side: -1 | 1) => (
    <group ref={side === -1 ? wingL : wingR} position={[side * 0.34, 0, 0]}>
      <mesh position={[side * 0.28, 0, 0]}>
        <boxGeometry args={[0.52, 0.02, 0.3]} />
        <meshStandardMaterial color="#0e2d4d" metalness={0.5} roughness={0.25} emissive={color} emissiveIntensity={0.22} />
      </mesh>
      {[0, 1].map((i) => (
        <mesh key={i} position={[side * (0.16 + i * 0.22), 0.012, 0]}>
          <planeGeometry args={[0.16, 0.24]} />
          <meshBasicMaterial color={color} transparent opacity={0.35} side={THREE.DoubleSide} />
        </mesh>
      ))}
      <mesh position={[side * 0.03, 0, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 0.06, 8]} />
        <meshStandardMaterial color="#1e3a8a" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  )
  return (
    <group>
      <group ref={bus}>
        <mesh>
          <boxGeometry args={[0.36, 0.26, 0.3]} />
          <meshStandardMaterial color="#10233a" metalness={0.75} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.16, 0]}>
          <cylinderGeometry args={[0.09, 0.11, 0.07, 16]} />
          <meshStandardMaterial color="#0c1c17" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.23, 0]}>
          <sphereGeometry args={[0.05, 10, 10]} />
          <meshBasicMaterial color={color} />
        </mesh>
        {wing(-1)}
        {wing(1)}
        <GlowSprite color={color} size={1.5} opacity={0.35} />
      </group>
      {/* assembly gantry arms reaching toward the bus */}
      <mesh position={[-0.75, 0.95, 0.2]} rotation={[0, 0, 0.7]}>
        <cylinderGeometry args={[0.025, 0.035, 0.7, 6]} />
        <meshStandardMaterial color="#0d2620" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0.78, 1.0, -0.18]} rotation={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.025, 0.035, 0.75, 6]} />
        <meshStandardMaterial color="#0d2620" metalness={0.6} roughness={0.4} />
      </mesh>
      <Sparkles count={14} scale={[1.7, 1.1, 1.7]} position={[0, 1.35, 0]} size={2} speed={0.35} color={color} opacity={0.55} />
    </group>
  )
}

/** SIGNALS — the intel uplink: dish mast + report slabs rising to a blinking beacon. */
function CoreWriteups({ color }: { color: string }) {
  const beacon = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (beacon.current) {
      const mat = beacon.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.4 + 0.6 * Math.abs(Math.sin(clock.elapsedTime * 2.6))
    }
  })
  return (
    <group>
      {/* radar mast */}
      <mesh position={[0, 1.3, 0]}>
        <cylinderGeometry args={[0.03, 0.05, 1.15, 6]} />
        <meshStandardMaterial color="#0d2620" metalness={0.65} roughness={0.35} />
      </mesh>
      <mesh position={[0, 1.88, 0.1]} rotation={[-0.5, 0.5, 0]}>
        <sphereGeometry args={[0.26, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2.4]} />
        <meshStandardMaterial color="#13261f" metalness={0.6} roughness={0.35} side={THREE.DoubleSide} emissive={color} emissiveIntensity={0.2} />
      </mesh>
      <mesh ref={beacon} position={[0, 2.05, 0.18]}>
        <sphereGeometry args={[0.04, 10, 10]} />
        <meshBasicMaterial color={color} transparent />
      </mesh>
      {/* floating report slabs — staggered heights */}
      {[0, 1, 2].map((i) => {
        const a = (i / 3) * Math.PI * 2 + 1.1
        const y = 0.98 + i * 0.17
        return (
          <group key={i} position={[Math.cos(a) * 0.55, y, Math.sin(a) * 0.55]} rotation={[0, -a + 1.57, 0]}>
            <mesh>
              <boxGeometry args={[0.3, 0.04, 0.42]} />
              <meshStandardMaterial color="#0c1c17" metalness={0.55} roughness={0.4} />
            </mesh>
            <mesh position={[0, 0.022, 0]}>
              <planeGeometry args={[0.24, 0.34]} />
              <meshBasicMaterial color={color} transparent opacity={0.7 - i * 0.15} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, 0.035, -0.12]}>
              <boxGeometry args={[0.06, 0.008, 0.06]} />
              <meshStandardMaterial color="#1b332b" roughness={0.6} />
            </mesh>
          </group>
        )
      })}
      <Sparkles count={12} scale={[1.4, 1.3, 1.4]} position={[0, 1.45, 0]} size={1.8} speed={0.3} color={color} opacity={0.55} />
    </group>
  )
}

/** STACK — the skill lattice: stacked translucent matrix layers with rising activity pulses. */
function CoreSkills({ color }: { color: string }) {
  const pulses = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (!pulses.current) return
    pulses.current.children.forEach((p, i) => {
      const t = (clock.elapsedTime * 0.35 + i / 3) % 1
      p.position.y = 0.9 + t * 0.85
      const mat = (p as THREE.Mesh).material as THREE.MeshBasicMaterial
      mat.opacity = (1 - t) * 0.85
    })
  })
  return (
    <group>
      {[0, 1, 2, 3].map((i) => (
        <group key={i} position={[0, 0.98 + i * 0.17, 0]} rotation={[0, i * 0.09, 0]}>
          <mesh>
            <boxGeometry args={[0.78, 0.012, 0.78]} />
            <meshStandardMaterial
              color="#0c1c17"
              metalness={0.4}
              roughness={0.5}
              transparent
              opacity={0.88 - i * 0.08}
              emissive={color}
              emissiveIntensity={0.05}
            />
          </mesh>
          {/* grid lines */}
          {[-0.26, 0, 0.26].map((x) => (
            <mesh key={`lx${i}${x}`} position={[x, 0.008, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.012, 0.76]} />
              <meshBasicMaterial color={color} transparent opacity={0.4 - i * 0.06} />
            </mesh>
          ))}
          {[-0.26, 0, 0.26].map((z) => (
            <mesh key={`lz${i}${z}`} position={[0, 0.008, z]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
              <planeGeometry args={[0.012, 0.76]} />
              <meshBasicMaterial color={color} transparent opacity={0.4 - i * 0.06} />
            </mesh>
          ))}
          {/* lit cells */}
          {[(i * 2) % 3, (i * 5 + 1) % 3].map((cx, ci) => (
            <mesh
              key={`c${i}${ci}`}
              position={[-0.26 + cx * 0.26, 0.01, -0.26 + ((i * 3 + ci * 2) % 3) * 0.26]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <planeGeometry args={[0.16, 0.16]} />
              <meshBasicMaterial color={color} transparent opacity={0.35} />
            </mesh>
          ))}
        </group>
      ))}
      {/* rising activity pulses */}
      <group ref={pulses}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[-Math.PI / 2, 0, (i / 3) * Math.PI]}>
            <planeGeometry args={[0.8, 0.05]} />
            <meshBasicMaterial color={color} transparent opacity={0.4} side={THREE.DoubleSide} depthWrite={false} />
          </mesh>
        ))}
      </group>
      <mesh position={[0, 1.75, 0]}>
        <octahedronGeometry args={[0.09, 0]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  )
}

/** VAULT — the credential vault: rotating ring + orbiting badge shards + core seal. */
function CoreCerts({ color }: { color: string }) {
  const ring = useRef<THREE.Group>(null)
  const shards = useRef<THREE.Group>(null)
  const seal = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (ring.current) ring.current.rotation.z = t * 0.4
    if (shards.current) {
      shards.current.rotation.y = t * 0.65
      shards.current.children.forEach((s, i) => {
        s.rotation.x = t * (0.8 + i * 0.2)
        s.rotation.y = t * (0.5 + i * 0.3)
      })
    }
    if (seal.current) {
      const mat = seal.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 0.5 + Math.sin(t * 2.2) * 0.35
    }
  })
  return (
    <group>
      {/* dodecahedron seal */}
      <mesh ref={seal} position={[0, 1.3, 0]}>
        <dodecahedronGeometry args={[0.17, 0]} />
        <meshStandardMaterial color="#123128" metalness={0.7} roughness={0.25} emissive={color} emissiveIntensity={0.6} />
      </mesh>
      {/* rotating vault ring (torus, tilted) */}
      <group ref={ring} position={[0, 1.3, 0]} rotation={[Math.PI / 2.6, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.46, 0.02, 10, 48]} />
          <meshStandardMaterial color="#0d2620" metalness={0.8} roughness={0.25} emissive={color} emissiveIntensity={0.3} />
        </mesh>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[Math.cos((i / 4) * Math.PI * 2) * 0.46, Math.sin((i / 4) * Math.PI * 2) * 0.46, 0]}>
            <boxGeometry args={[0.05, 0.05, 0.02]} />
            <meshBasicMaterial color={color} />
          </mesh>
        ))}
      </group>
      {/* orbiting badge shards */}
      <group ref={shards} position={[0, 1.3, 0]}>
        {[0, 1, 2].map((i) => {
          const a = (i / 3) * Math.PI * 2
          return (
            <mesh key={i} position={[Math.cos(a) * 0.66, Math.sin(a * 2) * 0.08, Math.sin(a) * 0.66]}>
              <icosahedronGeometry args={[0.05, 0]} />
              <meshStandardMaterial color="#0f3d33" metalness={0.7} roughness={0.3} emissive={color} emissiveIntensity={0.55} />
            </mesh>
          )
        })}
      </group>
      <GlowSprite color={color} size={1.7} opacity={0.4} position={[0, 1.3, 0]} />
      <Sparkles count={14} scale={[1.6, 1.2, 1.6]} position={[0, 1.3, 0]} size={1.8} speed={0.3} color={color} opacity={0.6} />
    </group>
  )
}

/** TROPHY — the winner's plinth: cup on hex tiers + orbiting star shards. */
function CoreAchievements({ color }: { color: string }) {
  const stars = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (stars.current) {
      stars.current.rotation.y = clock.elapsedTime * 0.55
      stars.current.children.forEach((s, i) => {
        s.rotation.z = clock.elapsedTime * (1 + i * 0.3)
      })
    }
  })
  return (
    <group>
      {/* hex tiers */}
      {[0, 1].map((i) => (
        <mesh key={i} position={[0, 0.88 + i * 0.09, 0]}>
          <cylinderGeometry args={[0.3 - i * 0.06, 0.36 - i * 0.06, 0.08, 6]} />
          <meshStandardMaterial color="#0d2620" metalness={0.75} roughness={0.3} emissive={color} emissiveIntensity={0.08} />
        </mesh>
      ))}
      {/* stem */}
      <mesh position={[0, 1.05, 0]}>
        <cylinderGeometry args={[0.035, 0.06, 0.14, 8]} />
        <meshStandardMaterial color="#1f2937" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* cup */}
      <mesh position={[0, 1.22, 0]}>
        <sphereGeometry args={[0.16, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2.2]} />
        <meshStandardMaterial color="#eab308" metalness={0.95} roughness={0.15} emissive="#7c5a00" emissiveIntensity={0.25} />
      </mesh>
      <mesh position={[0, 1.22, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.02, 8]} />
        <meshBasicMaterial color="#fde047" />
      </mesh>
      {/* handles */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.19, 1.24, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.05, 0.011, 8, 20, Math.PI]} />
          <meshStandardMaterial color="#eab308" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
      {/* orbiting star shards */}
      <group ref={stars} position={[0, 1.32, 0]}>
        {[0, 1, 2].map((i) => {
          const a = (i / 3) * Math.PI * 2
          return (
            <mesh key={i} position={[Math.cos(a) * 0.55, Math.sin(i * 2.1) * 0.1, Math.sin(a) * 0.55]}>
              <octahedronGeometry args={[0.055, 0]} />
              <meshStandardMaterial color="#fbbf24" metalness={0.85} roughness={0.2} emissive="#b45309" emissiveIntensity={0.4} />
            </mesh>
          )
        })}
      </group>
      <Sparkles count={16} scale={[1.5, 1.2, 1.5]} position={[0, 1.25, 0]} size={2.2} speed={0.35} color="#fde047" opacity={0.7} />
    </group>
  )
}

/** UPLINK — the comms array: steerable dish + expanding signal rings + beacon. */
function CoreContact({ color }: { color: string }) {
  const rings = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (!rings.current) return
    rings.current.children.forEach((r, i) => {
      const t = (clock.elapsedTime * 0.4 + i / 3) % 1
      r.scale.setScalar(0.3 + t * 2.6)
      const mat = (r as THREE.Mesh).material as THREE.MeshBasicMaterial
      mat.opacity = (1 - t) * 0.55
    })
  })
  return (
    <group>
      {/* tilting dish */}
      <group position={[0, 1.35, 0]} rotation={[-0.6, 0.4, 0]}>
        <mesh>
          <sphereGeometry args={[0.34, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2.6]} />
          <meshStandardMaterial color="#13261f" metalness={0.65} roughness={0.3} side={THREE.DoubleSide} emissive={color} emissiveIntensity={0.18} />
        </mesh>
        <mesh position={[0, 0.18, 0.14]} rotation={[Math.PI / 2.2, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.26, 6]} />
          <meshBasicMaterial color={color} />
        </mesh>
        <mesh position={[0, 0.02, 0]}>
          <sphereGeometry args={[0.045, 10, 10]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.035, 0.055, 0.5, 6]} />
        <meshStandardMaterial color="#0d2620" metalness={0.65} roughness={0.35} />
      </mesh>
      {/* expanding signal rings */}
      <group ref={rings} position={[0, 1.62, 0]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[-Math.PI / 2.4, 0, 0]}>
            <ringGeometry args={[0.28, 0.3, 40]} />
            <meshBasicMaterial color={color} transparent opacity={0.5} side={THREE.DoubleSide} depthWrite={false} />
          </mesh>
        ))}
      </group>
      <GlowSprite color={color} size={1.6} opacity={0.4} position={[0, 1.6, 0]} />
      <Sparkles count={12} scale={[1.4, 1.2, 1.4]} position={[0, 1.5, 0]} size={1.8} speed={0.3} color={color} opacity={0.55} />
    </group>
  )
}

const CORES: Record<string, ComponentType<{ color: string }>> = {
  boot: CoreBoot,
  experience: CoreExperience,
  projects: CoreProjects,
  writeups: CoreWriteups,
  skills: CoreSkills,
  certifications: CoreCerts,
  achievements: CoreAchievements,
  contact: CoreContact,
}

/* ── One diorama ── */

function Diorama({ anchor, index }: { anchor: SceneAnchor; index: number }) {
  const group = useRef<THREE.Group>(null)
  const Core = CORES[anchor.id]
  useFrame(({ clock }) => {
    const g = group.current
    if (g) g.rotation.y = Math.sin(clock.elapsedTime * 0.12 + index * 1.3) * 0.14
  })
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(3.1, 0.16, 3.1)), [])
  return (
    <group ref={group} position={[anchor.x, 0, anchor.z]}>
      {/* base plate */}
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[3.1, 0.16, 3.1]} />
        <meshStandardMaterial {...DARK} />
      </mesh>
      <lineSegments geometry={edges} position={[0, 0.08, 0]}>
        <lineBasicMaterial color="#22d3ee" transparent opacity={0.42} />
      </lineSegments>
      {/* landing ring + beacon */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.17, 0]}>
        <ringGeometry args={[1.06, 1.18, 48]} />
        <meshBasicMaterial color={anchor.hue} transparent opacity={0.5} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <mesh position={[1.32, 0.6, 1.32]}>
        <cylinderGeometry args={[0.025, 0.025, 0.95, 6]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.5} />
      </mesh>
      <mesh position={[1.32, 1.1, 1.32]}>
        <sphereGeometry args={[0.065, 10, 10]} />
        <meshBasicMaterial color={anchor.hue} />
      </mesh>
      <Conduits color={anchor.hue} />
      <Pedestal color={anchor.hue} />
      {/* the themed hero object, gently floating above its pedestal */}
      <Float speed={1.4} rotationIntensity={0.22} floatIntensity={0.5} floatingRange={[0.05, 0.14]}>
        <group position={[0, 1.06, 0]}>
          <Core color={anchor.hue} />
          <GlowSprite color={anchor.hue} size={1.9} opacity={0.5} />
        </group>
      </Float>
      <Dome color={anchor.hue} />
      <Drone color={anchor.hue} radius={0.85} speed={0.55 + index * 0.05} phase={index * 1.7} />
      <PulseRing color={anchor.hue} offset={0} />
      <PulseRing color={anchor.hue} offset={0.33} />
      <PulseRing color={anchor.hue} offset={0.66} />
      <Sparkles count={30} scale={[2.4, 1.6, 2.4]} position={[0, 1.1, 0]} size={2.4} speed={0.32} color={anchor.hue} opacity={0.55} />
      {/* colored key light pool */}
      <pointLight position={[0, 1.7, 0]} color={anchor.hue} intensity={7.5} distance={8} decay={1.8} />
      <GlowSprite color={anchor.hue} size={4.2} opacity={0.12} position={[0, 0.3, 0]} />
    </group>
  )
}

/* ── Camera: hold on a diorama while its panel is centered; fly in the gaps ── */

function CameraRig() {
  const look = useMemo(() => new THREE.Vector3(0, 1.05, -1.2), [])
  const pos = useMemo(() => new THREE.Vector3(0, 2.75, 3.1), [])
  useFrame(({ camera }, delta) => {
    const n = SCENE_ANCHORS.length
    const camU = camUFromP(clamp01(WORLD_PROGRESS.p), n)
    const i = Math.min(n - 1, Math.max(0, Math.floor(camU - HOLD_START)))
    const g = camU - i
    const A = SCENE_ANCHORS[i]
    const B = SCENE_ANCHORS[Math.min(n - 1, i + 1)]

    let tx: number, ty: number, tz: number, lx: number, lz: number, bank = 0

    if (g <= HOLD_END) {
      // HOLD — orbit the current diorama while its panel holds the screen.
      const o = orbit(A, holdSpin(g))
      tx = o.x
      ty = o.y
      tz = o.z
      lx = A.lookX
      lz = A.lookZ
    } else {
      // FLY — arc toward the next anchor while the panels crossfade.
      const s = smooth(clamp01((g - HOLD_END) / FLY_SPAN))
      const oa = orbit(A, 0.3)
      const ob = orbit(B, -0.3)
      tx = oa.x + (ob.x - oa.x) * s
      ty = 2.75 + Math.sin(s * Math.PI) * 1.15
      tz = oa.z + (ob.z - oa.z) * s
      lx = A.lookX + (B.lookX - A.lookX) * s
      lz = A.lookZ + (B.lookZ - A.lookZ) * s
      bank = Math.sin(s * Math.PI) * 0.05
    }

    // Damped approach keeps wheel, keyboard and Lenis input equally smooth.
    const k = 1 - Math.exp(-6.5 * delta)
    pos.x += (tx - pos.x) * k
    pos.y += (ty - pos.y) * k
    pos.z += (tz - pos.z) * k
    look.x += (lx - look.x) * k
    look.y += (1.05 - look.y) * k
    look.z += (lz - look.z) * k

    camera.position.copy(pos)
    camera.lookAt(look)
    if (bank !== 0) camera.rotateZ(bank)
  })
  return null
}

function Starfield() {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const n = 700
    const arr = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30
      arr[i * 3 + 1] = Math.random() * 7.5
      arr[i * 3 + 2] = 14 - Math.random() * 60
    }
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3))
    return g
  }, [])
  return (
    <points geometry={geo}>
      <pointsMaterial size={0.045} color="#34d399" transparent opacity={0.6} sizeAttenuation depthWrite={false} />
    </points>
  )
}

/* ── Exported canvases ── */

/** Full flight — desktop only. */
function FlightCanvas({ paused }: { paused: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ fov: 55, near: 0.1, far: 60, position: [0, 3.4, 4.8] }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      frameloop={paused ? "demand" : "always"}
    >
      <color attach="background" args={["#010604"]} />
      <fog attach="fog" args={["#010604", 8.5, 24]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 7, 3]} intensity={0.9} />
      <gridHelper args={[80, 52, "#123f31", "#0c3328"]} />
      <Starfield />
      {SCENE_ANCHORS.map((a) => (
        <group key={a.id}>
          {/* under-glow pool */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[a.x, 0.02, a.z]}>
            <circleGeometry args={[2.6, 32]} />
            <meshBasicMaterial color={a.hue} transparent opacity={0.12} depthWrite={false} />
          </mesh>
          <Diorama anchor={a} index={SCENE_ANCHORS.indexOf(a)} />
        </group>
      ))}
      <CameraRig />
    </Canvas>
  )
}

function HeroRig() {
  const group = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.2
  })
  return (
    <group ref={group} position={[0, -0.5, 0]}>
      <Diorama anchor={SCENE_ANCHORS[0]} index={0} />
    </group>
  )
}

/** Static fallback — a single slowly-turning hero diorama. */
function HeroCanvas() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ fov: 50, position: [2.6, 2.7, 3.4] }} gl={{ antialias: true }}>
      <color attach="background" args={["#010604"]} />
      <fog attach="fog" args={["#010604", 6, 14]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 3]} intensity={0.95} />
      <HeroRig />
    </Canvas>
  )
}

export function ScrollWorldScene({ skip, paused = false }: { skip: boolean; paused?: boolean }): ReactElement {
  const [staticMode] = useState(() => renderAsStatic(skip))
  if (staticMode) return <HeroCanvas />
  return <FlightCanvas paused={paused} />
}
