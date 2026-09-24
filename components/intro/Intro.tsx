"use client"

import dynamic from "next/dynamic"
import { useCallback, useEffect, useRef, useState } from "react"
import { bricolage } from "./font"
import { IntroPoster } from "./IntroPoster"
import styles from "./intro.module.css"

// three.js lives only in this chunk; it loads after first paint.
const IntroScene = dynamic(() => import("./IntroScene"), { ssr: false })

type Mode = "pending" | "scene" | "static"

function canRender3D(): boolean {
  if (typeof navigator !== "undefined" && "gpu" in navigator) return true
  try {
    const c = document.createElement("canvas")
    return !!c.getContext("webgl2")
  } catch {
    return false
  }
}

/**
 * "Signal from noise": a particle field of pure entropy resolves into the
 * name, then (on scroll) into a graph of the real projects in lib/data.ts.
 * Falls back to a static poster for reduced motion or no GPU.
 */
export function Intro() {
  const sectionRef = useRef<HTMLElement>(null)
  const [mode, setMode] = useState<Mode>("pending")

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    const decide = () => setMode(reduce.matches || !canRender3D() ? "static" : "scene")
    decide()
    reduce.addEventListener("change", decide)
    return () => reduce.removeEventListener("change", decide)
  }, [])

  const fallback = useCallback(() => setMode("static"), [])

  return (
    <section
      ref={sectionRef}
      id="intro"
      aria-label="Intro"
      className={`${styles.intro} ${bricolage.variable}`}
      data-mode={mode === "static" ? "static" : "live"}
    >
      <div className={styles.stage}>
        {mode === "scene" && <IntroScene sectionRef={sectionRef} onFallback={fallback} />}
        {mode === "static" && <IntroPoster />}
        {mode === "pending" && (
          <noscript>
            <IntroPoster interactive={false} />
          </noscript>
        )}
        {mode !== "static" && <p className={styles.srOnly}>Parth Bhatt</p>}
        <a href="#main-content" className={styles.skip}>
          Skip intro
        </a>
      </div>
    </section>
  )
}
