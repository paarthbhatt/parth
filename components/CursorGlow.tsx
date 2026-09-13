"use client"

import { useEffect, useRef } from "react"

/**
 * Renders a radial-gradient spotlight that follows the cursor -- a "flashlight
 * in a dark room" effect in the emerald/black palette.
 *
 * The rAF loop parks itself once the glow has caught up with the pointer and is
 * restarted by the next mousemove, so an idle tab isn't repainting a full-screen
 * gradient 60 times a second. Skipped entirely for coarse pointers (no cursor to
 * follow) and for users who ask for reduced motion.
 */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = glowRef.current
    if (!el) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const coarsePointer = window.matchMedia("(pointer: coarse)")
    if (reducedMotion.matches || coarsePointer.matches) return

    let raf = 0
    let running = false
    let targetX = -999
    let targetY = -999
    let currentX = -999
    let currentY = -999

    const paint = () => {
      el.style.background = `radial-gradient(600px circle at ${currentX.toFixed(1)}px ${currentY.toFixed(1)}px, rgba(16, 185, 129, 0.07) 0%, rgba(6, 182, 212, 0.04) 30%, transparent 70%)`
    }

    const animate = () => {
      const dx = targetX - currentX
      const dy = targetY - currentY

      // Close enough: snap, paint once, and stop burning frames until the
      // pointer moves again.
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
        currentX = targetX
        currentY = targetY
        paint()
        running = false
        return
      }

      currentX += dx * 0.1
      currentY += dy * 0.1
      paint()
      raf = requestAnimationFrame(animate)
    }

    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(animate)
    }

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      start()
    }

    window.addEventListener("mousemove", onMove, { passive: true })

    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={glowRef} className="cursor-glow-overlay" aria-hidden="true" />
}
