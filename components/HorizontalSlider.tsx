"use client"

import { useRef } from "react"

export function HorizontalSlider({
  children,
  ariaLabel,
}: {
  children: React.ReactNode
  ariaLabel: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollByAmount = (dir: "left" | "right") => {
    const el = containerRef.current
    if (!el) return
    const amount = el.clientWidth * 0.9 * (dir === "left" ? -1 : 1)
    el.scrollBy({ left: amount, behavior: "smooth" })
  }

  return (
    <div className="relative">
      <div
        ref={containerRef}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            e.preventDefault()
            scrollByAmount("left")
          } else if (e.key === "ArrowRight") {
            e.preventDefault()
            scrollByAmount("right")
          }
        }}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-hide rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60"
      >
        {children}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => scrollByAmount("left")}
          className="cyber-btn cyber-btn--sm"
          aria-label="Scroll left"
        >
          <span className="cyber-btn__label">◀ Prev</span>
        </button>
        <button
          type="button"
          onClick={() => scrollByAmount("right")}
          className="cyber-btn cyber-btn--sm"
          aria-label="Scroll right"
        >
          <span className="cyber-btn__label">Next ▶</span>
        </button>
      </div>
    </div>
  )
}
