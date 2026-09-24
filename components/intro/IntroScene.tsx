"use client"

import { useEffect, useRef, useState, type RefObject } from "react"
import { createEngine, type Engine } from "./engine"
import { bricolage } from "./font"
import { getIntroGraph, graphCaption } from "./graph"
import { resolveNameFont } from "./text"
import styles from "./intro.module.css"

interface Props {
  sectionRef: RefObject<HTMLElement | null>
  /** Called when neither WebGPU nor WebGL2 could start. */
  onFallback: () => void
}

const clamp01 = (x: number) => Math.min(1, Math.max(0, x))
const sstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a))
  return t * t * (3 - 2 * t)
}

/**
 * The live intro: a WebGPU (or WebGL2) particle field that resolves into the
 * name, then into the project graph as the visitor scrolls. Loaded with
 * next/dynamic so three.js never blocks first paint.
 */
export default function IntroScene({ sectionRef, onFallback }: Props) {
  const graph = getIntroGraph()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const labelRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const captionRef = useRef<HTMLParagraphElement>(null)
  const engineRef = useRef<Engine | null>(null)
  const graphRef = useRef(0)
  const [ready, setReady] = useState(false)
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return
    const stage = canvas.parentElement as HTMLElement

    let cancelled = false
    let engine: Engine | null = null
    const cleanups: (() => void)[] = []

    const mobile = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches
    const finePointer = window.matchMedia("(pointer: fine)").matches
    const forceWebGL = new URLSearchParams(window.location.search).get("intro") === "webgl"

    const progressOf = () => {
      const rect = section.getBoundingClientRect()
      const runway = rect.height - window.innerHeight
      return runway > 0 ? clamp01(-rect.top / runway) : 0
    }

    const onFrame: Parameters<typeof createEngine>[0]["onFrame"] = (f) => {
      engine?.setProgress(progressOf())
      graphRef.current = f.graph
      const show = sstep(0.62, 0.95, f.graph)
      const labels = labelRefs.current
      for (let i = 0; i < f.nodes.length; i++) {
        const el = labels[i]
        if (!el) continue
        const n = f.nodes[i]
        const left = n.x > f.width * 0.66
        const x = left ? n.x - 10 : n.x + 10
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${n.y.toFixed(1)}px, 0) translate(${left ? "-100%" : "0"}, -50%)`
        // Nodes at the back of the graph read a little quieter.
        el.style.opacity = String(show * (0.72 + 0.28 * clamp01(0.5 - n.depth * 0.5)))
        el.style.pointerEvents = show > 0.5 && n.visible ? "auto" : "none"
      }
      if (captionRef.current) captionRef.current.style.opacity = String(show)
    }

    ;(async () => {
      let family = 'system-ui, sans-serif'
      try {
        family = await resolveNameFont(bricolage.style.fontFamily)
      } catch {
        // system face it is
      }
      if (cancelled) return
      try {
        engine = await createEngine({
          canvas,
          graph,
          fontFamily: family,
          mobile,
          finePointer,
          forceWebGL,
          onFrame,
        })
      } catch (err) {
        if (!cancelled) {
          console.warn("[intro] 3D scene unavailable, showing the static graph.", err)
          onFallback()
        }
        return
      }
      if (cancelled) {
        engine.dispose()
        return
      }
      engineRef.current = engine
      section.dataset.backend = engine.backend
      section.dataset.particles = String(engine.particles)

      // Size
      const ro = new ResizeObserver(() => {
        engine?.resize(stage.clientWidth, stage.clientHeight)
      })
      ro.observe(stage)
      cleanups.push(() => ro.disconnect())

      // Pause offscreen and in hidden tabs.
      let inView = true
      const sync = () => engine?.setRunning(inView && document.visibilityState === "visible")
      const io = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting
        sync()
      })
      io.observe(section)
      document.addEventListener("visibilitychange", sync)
      cleanups.push(() => {
        io.disconnect()
        document.removeEventListener("visibilitychange", sync)
      })

      // Pointer parallax and repulsion, desktop only.
      if (finePointer) {
        const move = (e: PointerEvent) => {
          const r = stage.getBoundingClientRect()
          const inside = e.clientY >= r.top && e.clientY <= r.bottom && e.clientX >= r.left && e.clientX <= r.right
          engine?.setPointer(e.clientX, e.clientY, inside)
        }
        const leave = () => engine?.setPointer(0, 0, false)
        window.addEventListener("pointermove", move, { passive: true })
        document.documentElement.addEventListener("pointerleave", leave)
        cleanups.push(() => {
          window.removeEventListener("pointermove", move)
          document.documentElement.removeEventListener("pointerleave", leave)
        })
      }

      engine.setProgress(progressOf())
      sync()
      setReady(true)
    })()

    return () => {
      cancelled = true
      for (const c of cleanups) c()
      engine?.dispose()
      engineRef.current = null
    }
  }, [graph, onFallback, sectionRef])

  useEffect(() => {
    engineRef.current?.setHover(active)
  }, [active])

  /** Keyboard users reach the labels before the graph has formed: take them to it. */
  const revealGraph = () => {
    const section = sectionRef.current
    if (!section || graphRef.current > 0.9) return
    const top = section.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + section.offsetHeight - window.innerHeight, behavior: "instant" })
  }

  return (
    <>
      <canvas ref={canvasRef} className={styles.canvas} data-ready={ready} aria-hidden="true" />
      {ready && (
        <>
          <ul className={styles.labels} aria-label="Projects">
            {graph.nodes.map((n, i) => (
              <li key={n.href}>
                <a
                  ref={(el) => {
                    labelRefs.current[i] = el
                  }}
                  href={n.href}
                  className={styles.label}
                  data-active={active === i}
                  onPointerEnter={() => setActive(i)}
                  onPointerLeave={() => setActive((a) => (a === i ? null : a))}
                  onFocus={() => {
                    setActive(i)
                    revealGraph()
                  }}
                  onBlur={() => setActive((a) => (a === i ? null : a))}
                >
                  {n.title}
                </a>
              </li>
            ))}
          </ul>
          <p ref={captionRef} className={styles.caption} style={{ opacity: 0 }}>
            {graphCaption(graph)}
          </p>
        </>
      )}
    </>
  )
}
