"use client"

import { useEffect, useRef, useState } from "react"
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion"

/**
 * Decorative ASCII banner that types itself in. Purely presentational: the
 * surrounding section supplies the real heading, so this is hidden from
 * assistive tech and dropped entirely on small screens.
 */
export function ASCIIArt({ text, delay = 0 }: { text: string; delay?: number }) {
  const normalized = text.replace(/\\n/g, "\n")
  const [displayedText, setDisplayedText] = useState("")
  const prefersReducedMotion = usePrefersReducedMotion()
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(normalized)
      return
    }

    const timer = setTimeout(() => {
      let currentIndex = 0
      intervalRef.current = setInterval(() => {
        currentIndex++
        setDisplayedText(normalized.slice(0, currentIndex))
        if (currentIndex >= normalized.length && intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
      }, 8)
    }, delay)

    return () => {
      clearTimeout(timer)
      // The interval is created inside the timeout callback, so it has to be
      // cleared here too -- returning a cleanup from that callback does nothing.
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [normalized, delay, prefersReducedMotion])

  return (
    <div className="hidden w-full overflow-x-auto sm:block" aria-hidden="true">
      <pre className="inline-block max-w-full whitespace-pre font-mono text-[6px] text-emerald-500 xs:text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] dark:text-emerald-400">
        {displayedText}
      </pre>
    </div>
  )
}
