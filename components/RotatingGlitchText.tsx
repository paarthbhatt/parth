"use client"

import { useState, useEffect } from "react"
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion"

export function RotatingGlitchText({
  items,
  className = "",
}: {
  items: string[]
  className?: string
}) {
  const typeMs = 32
  const holdMs = 1100
  const deleteMs = 18

  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing")
  const [text, setText] = useState("")
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

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
  }, [phase, text, index, items, prefersReducedMotion])

  return (
    <>
      {/* Decorative rotation. Announcing it would read a new partial string on
          every keystroke, so assistive tech gets the full list once instead. */}
      <span
        aria-hidden="true"
        className={[
          "font-mono font-semibold text-lg sm:text-xl md:text-2xl bg-clip-text text-transparent",
          className,
        ].join(" ")}
        style={{ backgroundImage: "linear-gradient(90deg,#22c55e,#06b6d4,#60a5fa)" }}
      >
        {prefersReducedMotion ? items[0] : text}
      </span>
      <span className="sr-only">{items.join(". ")}</span>
    </>
  )
}
