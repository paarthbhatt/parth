"use client"

import { useState } from "react"
import { bricolage } from "./font"
import { getIntroGraph, graphCaption } from "./graph"
import styles from "./intro.module.css"

/** Same end-state orientation the live scene settles near. */
const ANGLE = 0.15
const HALF = 1.3

function project(x: number, y: number, z: number) {
  const c = Math.cos(ANGLE)
  const s = Math.sin(ANGLE)
  const rx = x * c + z * s
  const rz = z * c - x * s
  const k = 1 / (1 - rz * 0.12)
  return { x: rx * k, y: y * k, depth: rz }
}

/**
 * Deterministic label de-collision for the static graph (it also renders on the
 * server and inside <noscript>, so nothing can be measured). Sizes are
 * estimates in graph units, deliberately generous; labels keep their side and
 * slide down past any neighbour whose box they would overlap.
 */
function labelCentres(pts: { x: number; y: number }[], titles: string[]) {
  const H = 0.15
  const GAP = 0.07
  const boxes = pts.map((p, i) => {
    const w = titles[i].length * 0.062 + 0.1
    const left = p.x > 0.35
    const x0 = left ? p.x - GAP - w : p.x + GAP
    return { i, x0, x1: x0 + w, y: -p.y - H / 2 }
  })
  const order = [...boxes].sort((a, b) => a.y - b.y)
  for (let k = 0; k < order.length; k++) {
    for (let j = 0; j < k; j++) {
      const a = order[k]
      const o = order[j]
      if (a.x0 < o.x1 && o.x0 < a.x1 && a.y < o.y + H) a.y = o.y + H
    }
  }
  return boxes.map((b) => b.y + H / 2)
}

/**
 * The static version of the intro: the name and the finished project graph as
 * SVG, with real links. Used for prefers-reduced-motion, for browsers with
 * neither WebGPU nor WebGL2, and (inside <noscript>) with JS off.
 */
export function IntroPoster({ interactive = true }: { interactive?: boolean }) {
  const graph = getIntroGraph()
  const [active, setActive] = useState<number | null>(null)
  const pts = graph.nodes.map((n) => project(n.x, n.y, n.z))
  const labelY = labelCentres(
    pts,
    graph.nodes.map((n) => n.title),
  )
  const pct = (v: number) => `${(((v + HALF) / (2 * HALF)) * 100).toFixed(2)}%`

  return (
    <div className={`${styles.poster} ${bricolage.variable}`}>
      <p className={styles.posterName}>Parth Bhatt</p>
      <div className={styles.posterGraph}>
        <svg viewBox={`${-HALF} ${-HALF} ${HALF * 2} ${HALF * 2}`} aria-hidden="true" focusable="false">
          {graph.edges.map((e) => (
            <line
              key={`${e.a}-${e.b}`}
              className={styles.posterEdge}
              x1={pts[e.a].x}
              y1={-pts[e.a].y}
              x2={pts[e.b].x}
              y2={-pts[e.b].y}
            />
          ))}
          {graph.nodes.map((n, i) => (
            <circle
              key={n.href}
              className={styles.posterNode}
              data-active={active === i}
              cx={pts[i].x}
              cy={-pts[i].y}
              r={0.05 + 0.014 * Math.sqrt(n.degree)}
              opacity={0.7 + 0.3 * (1 - (pts[i].depth + 1) / 2)}
            />
          ))}
        </svg>
        <ul className={styles.posterLabels} aria-label="Projects">
          {graph.nodes.map((n, i) => (
            <li key={n.href}>
              <a
                href={n.href}
                className={styles.posterLabel}
                data-side={pts[i].x > 0.35 ? "left" : "right"}
                style={{ left: pct(pts[i].x), top: pct(labelY[i]) }}
                onPointerEnter={interactive ? () => setActive(i) : undefined}
                onPointerLeave={interactive ? () => setActive(null) : undefined}
                onFocus={interactive ? () => setActive(i) : undefined}
                onBlur={interactive ? () => setActive(null) : undefined}
              >
                {n.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className={styles.caption}>{graphCaption(graph)}</p>
    </div>
  )
}
