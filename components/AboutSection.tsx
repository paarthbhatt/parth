import { TerminalStrip } from "./TerminalStrip"
import { useScrollReveal } from "../hooks/useScrollReveal"

export function AboutSection() {
  const ref = useScrollReveal<HTMLElement>()
  return (
    <section ref={ref} id="about" className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-black to-slate-950 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      <TerminalStrip label="[SYSTEM_INFO.EXE]" meta="whoami • profile_scan" />

      <div className="container mx-auto max-w-5xl mt-4 sm:mt-8 relative z-10">
        <div className="scroll-reveal bg-black border-2 border-emerald-500/30 rounded-lg p-4 sm:p-6 shadow-[0_0_30px_rgba(16,185,129,0.2)] overflow-hidden">
          <div className="absolute inset-0 scanlines opacity-20 pointer-events-none"></div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 relative z-10">
            <div className="scroll-reveal delay-1 md:col-span-1 flex justify-center">
              <img
                src="/parth-bhatt-portrait.png"
                alt="Parth Bhatt"
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.4)]"
              />
            </div>
            <div className="scroll-reveal delay-2 md:col-span-2 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <h3 className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">$ ./whoami</h3>
              </div>

              <div className="space-y-2 sm:space-y-3 font-mono text-xs sm:text-sm">
                <div className="flex items-start gap-2 sm:gap-3">
                  <span className="text-emerald-500 flex-shrink-0">[✦]</span>
                  <p className="text-gray-300 leading-relaxed">
                    I'm Parth Bhatt, a cybersecurity enthusiast and B.Tech student from New Delhi who loves solving digital puzzles and outsmarting threats. Ever since I got my first computer at age 7, I've been fascinated by how systems work—and how to secure them.
                  </p>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <span className="text-emerald-500 flex-shrink-0">[✦]</span>
                  <p className="text-gray-300 leading-relaxed">
                    From ethical hacking to defensive security, I thrive on challenges that blend logic, strategy, and creativity. My goal? To turn passion into impact by protecting digital spaces and building smarter, safer systems.
                  </p>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-emerald-500/30">
                <p className="text-[10px] sm:text-xs font-mono text-emerald-500/70">
                  <span className="animate-pulse">●</span> STATUS: [ACTIVE] | MODE: [SECURITY-FIRST] | LOCATION: [NEW_DELHI]
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
