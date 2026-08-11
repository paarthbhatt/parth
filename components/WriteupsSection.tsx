"use client"

import { useState, useEffect } from "react"
import { TerminalStrip } from "./TerminalStrip"
import { writeupsData } from "../lib/data"
import { useScrollReveal } from "../hooks/useScrollReveal"

export function WriteupsSection() {
  const ref = useScrollReveal<HTMLElement>()

  const WriteupCard = ({ writeup, index }: { writeup: typeof writeupsData[number]; index: number }) => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
      const timer = setTimeout(() => setIsVisible(true), index * 200)
      return () => clearTimeout(timer)
    }, [index])

    return (
      <a
        href={writeup.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`block relative bg-black border-2 border-emerald-500/30 rounded-lg p-4 sm:p-6 shadow-[0_0_20px_rgba(16,185,129,0.2)] cursor-pointer hover:border-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300 overflow-hidden group ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        style={{ transition: "opacity 0.5s ease, transform 0.5s ease, border-color 0.3s, box-shadow 0.3s" }}
      >
        <div className="absolute inset-0 scanlines opacity-20 pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-mono bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/30">
                [{writeup.tag}]
              </span>
            </div>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
              writeup.platform === "Medium"
                ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                : "bg-blue-500/15 text-blue-400 border-blue-500/30"
            }`}>
              {writeup.platform}
            </span>
          </div>

          <h4 className="text-base sm:text-lg font-bold font-mono text-emerald-400 mb-2 group-hover:text-emerald-300 transition-colors leading-tight">
            {writeup.title}
          </h4>

          <p className="text-xs sm:text-sm text-gray-400 font-mono leading-relaxed">
            {writeup.description}
          </p>

          <div className="mt-4 flex items-center gap-2 text-xs font-mono">
            <span className="text-cyan-500 animate-pulse">&gt;</span>
            <span className="text-gray-500">Read writeup</span>
            <span className="text-cyan-500 group-hover:translate-x-1 transition-transform inline-block">→</span>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      </a>
    )
  }

  return (
    <section
      ref={ref}
      id="writeups"
      className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-black to-slate-950 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.02)_1px,transparent_1px),linear_gradient(to_bottom,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      <TerminalStrip label="[WRITEUPS.LOG]" meta="analysis • deep_dives" />

      <div className="container mx-auto max-w-5xl mt-4 sm:mt-6 relative z-10">
        <div className="scroll-reveal">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
            <h3 className="text-base sm:text-xl font-bold font-mono text-emerald-400">$ cat writeups/*.md</h3>
          </div>

          <p className="text-xs sm:text-sm font-mono text-gray-400 mb-6 sm:mb-8">
            <span className="text-emerald-500">[*]</span> Security teams hire based on how you think. These are breakdowns of real vulnerabilities, CTF solutions, and technical deep-dives.
          </p>
        </div>

        <div className="scroll-reveal delay-1 grid sm:grid-cols-2 gap-4 sm:gap-6">
          {writeupsData.map((writeup, i) => (
            <WriteupCard key={i} writeup={writeup} index={i} />
          ))}
        </div>

        <div className="scroll-reveal delay-2 mt-6 sm:mt-8 text-center">
          <p className="text-xs font-mono text-emerald-500/50">
            [*] Entries loaded: {writeupsData.length} | More coming soon | Status: ✓ PUBLISHED
          </p>
        </div>
      </div>
    </section>
  )
}
