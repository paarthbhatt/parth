"use client"

import { useEffect, useRef } from "react"

/**
 * CursorGlow
 * Renders a radial-gradient spotlight that follows the cursor —
 * "flashlight in a dark room" effect, personalised to the emerald/black palette.
 * Uses a div with pointer-events:none fixed to the viewport.
 */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = glowRef.current
    if (!el) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    let raf: number
    let targetX = -999
    let targetY = -999
    let currentX = -999
    let currentY = -999

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    const animate = () => {
      // Lerp for smooth trailing
      currentX += (targetX - currentX) * 0.1
      currentY += (targetY - currentY) * 0.1

      el.style.background = `radial-gradient(
        600px circle at ${currentX}px ${currentY}px,
        rgba(16, 185, 129, 0.07) 0%,
        rgba(6, 182, 212, 0.04) 30%,
        transparent 70%
      )`
      raf = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className="cursor-glow-overlay"
      aria-hidden="true"
    />
  )
}
