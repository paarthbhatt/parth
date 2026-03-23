"use client"

import { useEffect, useState } from "react"

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(Math.min(pct, 100))
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Top progress bar */}
      <div className="scroll-progress-track">
        <div
          className="scroll-progress-bar"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {progress > 2 && <div className="scroll-progress-comet" aria-hidden="true" />}
        </div>
      </div>

      {/* Floating percentage badge */}
      <div
        className="scroll-progress-badge"
        style={{ opacity: progress > 2 ? 1 : 0 }}
        aria-hidden="true"
      >
        <span className="text-[10px] font-mono text-emerald-400">{Math.round(progress)}%</span>
      </div>
    </>
  )
}
