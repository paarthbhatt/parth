"use client"

import { useEffect, useRef } from "react"

/**
 * useScrollReveal
 * Attaches an IntersectionObserver to all elements matching `selector`
 * inside the given `containerRef`. When an element enters the viewport
 * it receives the class `scroll-revealed`; the CSS handles the animation.
 *
 * Usage:
 *   const ref = useScrollReveal<HTMLDivElement>()
 *   return <section ref={ref} className="scroll-reveal-container">...</section>
 */
export function useScrollReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const elements = container.querySelectorAll<HTMLElement>(".scroll-reveal")
    if (elements.length === 0) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      elements.forEach((el) => el.classList.add("scroll-revealed"))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-revealed")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
