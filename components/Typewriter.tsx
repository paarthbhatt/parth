"use client"

import { useState, useEffect } from "react"

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
  useEffect(() => {
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
  }, [text, speed, delay])

  return (
    <span aria-live="polite" className={className} style={{ whiteSpace: "nowrap" }}>
      {out}
    </span>
  )
}
