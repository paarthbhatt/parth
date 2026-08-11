import { TerminalStrip } from "./TerminalStrip"
import { experienceData } from "../lib/data"
import { useScrollReveal } from "../hooks/useScrollReveal"

export function ExperienceSection() {
  const ref = useScrollReveal<HTMLElement>()
  return (
    <section ref={ref} id="experience" className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-black to-slate-950 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      <TerminalStrip label="[HISTORY.LOG]" meta="experience • timeline_scan" />

      <div className="container mx-auto max-w-5xl mt-4 sm:mt-6 relative z-10">
        <div className="scroll-reveal bg-black border-2 border-emerald-500/30 rounded-lg p-4 sm:p-6 shadow-[0_0_30px_rgba(16,185,129,0.2)] overflow-hidden">
          <div className="absolute inset-0 scanlines opacity-20 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 sm:mb-6 border-b border-emerald-500/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <h3 className="text-base sm:text-xl font-bold font-mono text-emerald-400">$ cat experience.log</h3>
              </div>
              <span className="text-xs font-mono text-cyan-400 border border-cyan-500/40 bg-cyan-500/10 px-2.5 py-0.5 rounded">
                [TOP DEFENCE EXPERIENCE LOADED]
              </span>
            </div>

            <div className="space-y-4 font-mono text-xs sm:text-sm">
              {experienceData.map((e, i) => {
                const isCrown = i === 0 // DRDO Internship

                return (
                  <div
                    key={i}
                    className={`scroll-reveal delay-${Math.min(i + 1, 4)} transition-all duration-300 relative group overflow-hidden rounded-r-md ${
                      isCrown
                        ? "bg-gradient-to-r from-emerald-950/40 via-cyan-950/30 to-black border-l-4 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.25)] p-4 sm:p-5 border-y border-r border-cyan-500/30"
                        : "bg-emerald-500/5 border-l-4 border-emerald-500/50 pl-3 sm:pl-4 py-3 sm:py-4 hover:bg-emerald-500/10 hover:border-emerald-500"
                    }`}
                  >
                    {isCrown && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] sm:text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 px-2 py-0.5 rounded shadow-[0_0_10px_rgba(6,182,212,0.4)] flex items-center gap-1">
                          <span>🏆</span> CROWN ACHIEVEMENT
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 rounded">
                          GOVT OF INDIA • DRDO SAG
                        </span>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`font-mono ${isCrown ? "text-cyan-400 font-bold" : "text-emerald-500"}`}>
                        [{String(i + 1).padStart(2, '0')}]
                      </span>
                      <span className="text-cyan-400 font-mono font-semibold">{e.when}</span>
                      <span className="text-emerald-400 font-mono">→</span>
                      <span className={`font-bold ${isCrown ? "text-cyan-300 text-base sm:text-lg" : "text-emerald-400"}`}>
                        {e.role}
                      </span>
                      <span className={`font-mono ${isCrown ? "text-cyan-200 font-semibold" : "text-emerald-500/70"}`}>
                        @ {e.org}
                      </span>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className={`${isCrown ? "text-cyan-400 font-bold" : "text-emerald-500"} mt-1`}>└─</span>
                      <p className={`${isCrown ? "text-gray-200 font-medium text-xs sm:text-sm" : "text-gray-300"} leading-relaxed flex-1`}>
                        {e.desc}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <span className={`inline-block w-2 h-2 ${isCrown ? "bg-cyan-400 shadow-[0_0_8px_#22d3ee]" : "bg-emerald-500"} rounded-full animate-pulse`}></span>
                      <span className={`text-xs font-mono ${isCrown ? "text-cyan-300 font-bold" : "text-emerald-400"}`}>
                        {e.status}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-4 sm:mt-6 pt-4 border-t border-emerald-500/30">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-emerald-500/70">
                <span>[*]</span>
                <span>Total entries: {experienceData.length}</span>
                <span>|</span>
                <span className="text-emerald-400">Status: ✓ ONLINE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
