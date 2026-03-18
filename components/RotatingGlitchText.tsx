"use client"

import { useState, useEffect } from "react"

export function RotatingGlitchText({
  items,
  interval = 2400,
  className = "",
}: {
  items: string[]
  interval?: number
  className?: string
}) {
  const typeMs = 32
  const holdMs = 1100
  const deleteMs = 18

  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing")
  const [text, setText] = useState("")

  useEffect(() => {
    let id: number | undefined

    if (phase === "typing") {
      const target = items[index]
      if (text.length < target.length) {
        id = window.setTimeout(() => setText(target.slice(0, text.length + 1)), typeMs)
      } else {
        setPhase("holding")
      }
    } else if (phase === "holding") {
      id = window.setTimeout(() => setPhase("deleting"), holdMs)
    } else if (phase === "deleting") {
      if (text.length > 0) {
        id = window.setTimeout(() => setText(text.slice(0, -1)), deleteMs)
      } else {
        setIndex((i) => (i + 1) % items.length)
        setPhase("typing")
      }
    }

    return () => {
      if (id) window.clearTimeout(id)
    }
  }, [phase, text, index, items])

  return (
    <span
      aria-live="polite"
      className={[
        "font-mono font-semibold text-lg sm:text-xl md:text-2xl bg-clip-text text-transparent",
        className,
      ].join(" ")}
      style={{ backgroundImage: "linear-gradient(90deg,#22c55e,#06b6d4,#60a5fa)" }}
    >
      {text}
    </span>
  )
}
