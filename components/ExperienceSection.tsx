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
            <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <h3 className="text-base sm:text-xl font-bold font-mono text-emerald-400">$ cat experience.log</h3>
            </div>

            <div className="space-y-3 sm:space-y-4 font-mono text-xs sm:text-sm">
              {experienceData.map((e, i) => (
                <div
                  key={i}
                  className={`scroll-reveal delay-${Math.min(i + 1, 4)} bg-emerald-500/5 border-l-4 border-emerald-500/50 pl-3 sm:pl-4 py-3 sm:py-4 hover:bg-emerald-500/10 hover:border-emerald-500 transition-all group`}
                >
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-emerald-500 font-mono">[{String(i + 1).padStart(2, '0')}]</span>
                    <span className="text-cyan-500 font-mono">{e.when}</span>
                    <span className="text-emerald-400 font-mono">→</span>
                    <span className="text-emerald-400 font-bold">{e.role}</span>
                    <span className="text-emerald-500/70 font-mono">@ {e.org}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">└─</span>
                    <p className="text-gray-300 leading-relaxed flex-1">{e.desc}</p>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-xs font-mono text-emerald-400">{e.status}</span>
                  </div>
                </div>
              ))}
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
