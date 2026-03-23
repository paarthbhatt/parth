"use client"

import { useState, useEffect } from "react"
import { TerminalStrip } from "./TerminalStrip"
import { skillsData } from "../lib/data"
import { useScrollReveal } from "../hooks/useScrollReveal"

export function SkillsSection() {
  const [isScanning, setIsScanning] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsScanning(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const ref = useScrollReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      id="skills"
      className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-black to-slate-950 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      <TerminalStrip label="[SKILLS.SCAN]" meta="scanning • capability_matrix" />

      <div className="container mx-auto max-w-5xl mt-4 sm:mt-6 relative z-10">
        <div className="scroll-reveal bg-black border-2 border-emerald-500/30 rounded-lg p-4 sm:p-6 shadow-[0_0_30px_rgba(16,185,129,0.2)] overflow-hidden">
          <div className="absolute inset-0 scanlines opacity-20 pointer-events-none"></div>

          <div className="relative z-10">
            {isScanning && (
              <div className="text-center py-6 sm:py-8">
                <p className="text-emerald-500 font-mono animate-pulse text-xs sm:text-sm">
                  [*] Scanning capabilities...
                </p>
              </div>
            )}

            {!isScanning && (
              <>
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  <h3 className="text-base sm:text-xl font-bold font-mono text-emerald-400">$ ./skills --list-all</h3>
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {skillsData.map((s, i) => (
                    <span
                      key={i}
                      className="inline-block px-2 sm:px-4 py-1.5 sm:py-2 rounded border border-emerald-500/40 bg-emerald-500/5 text-emerald-400 font-mono text-[10px] sm:text-xs hover:bg-emerald-500/10 hover:border-emerald-500 hover:shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all duration-300 relative group"
                    >
                      <span className="absolute -left-2 -top-2 w-1 h-1 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {s}
                      <span className="absolute -right-2 -bottom-2 w-1 h-1 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    </span>
                  ))}
                </div>

                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-emerald-500/30 text-xs font-mono text-emerald-500/70">
                  <p>[*] Total skill sets loaded: {skillsData.length} | Status: ✓ OPERATIONAL</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
