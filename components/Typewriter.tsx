"use client"

import { useState, useEffect } from "react"
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion"

export function Typewriter({
  text,
  speed = 24,
  delay = 0,
  className = "",
}: {
  text: string
  speed?: number
  delay?: number
  className?: string
}) {
  const [out, setOut] = useState("")
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      setOut(text)
      return
    }

    let i = 0
    let intervalId: number | undefined
    const startId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        i += 1
        if (i > text.length) {
          if (intervalId) window.clearInterval(intervalId)
          return
        }
        setOut(text.slice(0, i))
      }, speed)
    }, delay)
    return () => {
      window.clearTimeout(startId)
      if (intervalId) window.clearInterval(intervalId)
    }
  }, [text, speed, delay, prefersReducedMotion])

  return (
    <>
      {/* The animated copy is decorative -- announcing it would read the string
          back one character at a time. Screen readers get the finished text. */}
      <span aria-hidden="true" className={className}>
        {out}
      </span>
      <span className="sr-only">{text}</span>
    </>
  )
}
