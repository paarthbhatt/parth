"use client"

import { useEffect, useState } from "react"

const QUERY = "(prefers-reduced-motion: reduce)"

/**
 * Tracks the user's reduced-motion preference so JS-driven animation loops
 * (matrix rain, glitch intervals, cursor spotlight) can opt out the same way
 * the CSS `@media (prefers-reduced-motion: reduce)` blocks do.
 *
 * Starts as `false` so server and first client render agree, then corrects on
 * mount. Animations that must never run for these users should also carry a
 * CSS guard rather than relying on this hook alone.
 */
export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(QUERY)
    setPrefersReducedMotion(mediaQuery.matches)

    const onChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener("change", onChange)
    return () => mediaQuery.removeEventListener("change", onChange)
  }, [])

  return prefersReducedMotion
}
