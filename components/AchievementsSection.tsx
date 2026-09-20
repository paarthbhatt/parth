import { TerminalStrip } from "./TerminalStrip"
import { ASCIIArt } from "./ASCIIArt"
import { HorizontalSlider } from "./HorizontalSlider"
import { achievementsData } from "../lib/data"
import { useScrollReveal } from "../hooks/useScrollReveal"

export function AchievementsSection() {
  const ref = useScrollReveal<HTMLElement>()
  return (
    <section
      ref={ref}
      id="achievements"
      aria-labelledby="achievements-heading"
      className="relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-black to-slate-950"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      <TerminalStrip label="[ACHIEVEMENT.DAT]" meta="unlocked • trophy_scan" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <h2 id="achievements-heading" className="sr-only">
          Achievements
        </h2>
        <div className="scroll-reveal text-center mb-6 sm:mb-8 mt-4 sm:mt-6 px-2">
          <ASCIIArt
            text={` █████╗  ██████╗██╗  ██╗██╗███████╗██╗   ██╗███████╗███╗   ███╗███████╗███╗   ██╗████████╗███████╗
██╔══██╗██╔════╝██║  ██║██║██╔════╝██║   ██║██╔════╝████╗ ████║██╔════╝████╗  ██║╚══██╔══╝╚══███╔╝
███████║██║     ███████║██║█████╗  ██║   ██║█████╗  ██╔████╔██║█████╗  ██╔██╗ ██║   ██║     ███╔╝
██╔══██║██║     ██╔══██║██║██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╔╝██║██╔══╝  ██║╚██╗██║   ██║    ███╔╝
██║  ██║╚██████╗██║  ██║██║███████╗ ╚████╔╝ ███████╗██║ ╚═╝ ██║███████╗██║ ╚████║   ██║   ███████╗
╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝╚══════╝  ╚═══╝  ╚══════╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝`}
            delay={300}
          />
        </div>

        <div className="scroll-reveal delay-1 mt-6 sm:mt-8">
          <HorizontalSlider ariaLabel="Achievements slider">
            {achievementsData.map((achievement, index) => {
              const isCrown = index === 0 // GDG Cloud HackFest
              const isCert = "badge" in achievement && Boolean(achievement.badge)

              return (
                <div
                  key={index}
                  className={`group relative snap-start w-[min(100%,550px)] min-w-[260px] sm:min-w-[420px] lg:min-w-[550px] bg-black border-2 rounded-lg p-4 sm:p-6 mr-3 transition-all duration-300 overflow-hidden ${
                    isCrown
                      ? "border-cyan-400 shadow-[0_0_35px_rgba(6,182,212,0.35)] hover:shadow-[0_0_45px_rgba(6,182,212,0.5)] bg-gradient-to-br from-cyan-950/30 via-slate-950 to-black"
                      : isCert
                        ? "border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]"
                        : "border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:border-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                  }`}
                >
                  <div className="absolute inset-0 scanlines opacity-20 pointer-events-none"></div>

                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${achievement.bgGradient} rounded-lg flex items-center justify-center border-2 ${isCrown ? "border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.5)] scale-105" : isCert ? "border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.3)]" : "border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]"} group-hover:scale-110 transition-transform`}>
                        <achievement.icon className="w-8 h-8 text-white" />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          {isCrown ? (
                            <span className="text-[10px] font-mono font-bold bg-cyan-500/30 text-cyan-300 px-2 py-0.5 rounded border border-cyan-400/60 shadow-[0_0_10px_rgba(6,182,212,0.4)] flex items-center gap-1">
                              <span>🏆</span> CROWN HACKATHON WIN
                            </span>
                          ) : isCert ? (
                            <span className="text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-400/50 flex items-center gap-1">
                              <span aria-hidden="true">🎓</span> {achievement.badge}
                            </span>
                          ) : (
                            <span className="text-xs font-mono bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded border border-cyan-500/30">
                              [ACHIEVEMENT]
                            </span>
                          )}
                          <span className="text-xs font-mono text-emerald-400/90">{achievement.date}</span>
                        </div>
                        <h3 className={`font-bold font-mono ${isCrown ? "text-xl text-cyan-300" : isCert ? "text-lg text-cyan-300" : "text-lg text-emerald-400"} mb-1 leading-tight`}>
                          {achievement.title}
                        </h3>
                        <p className={`text-xs font-mono mb-2 ${isCrown ? "text-cyan-200 font-semibold" : "text-cyan-400"}`}>
                          {achievement.subtitle}
                        </p>
                        <p className="text-xs text-emerald-400/90 font-mono">@ {achievement.issuer}</p>
                      </div>
                    </div>

                    <p className="text-xs text-gray-300 font-mono leading-relaxed">
                      {achievement.description}
                    </p>

                    {("links" in achievement && achievement.links) || ("verify" in achievement && achievement.verify) ? (
                      <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t border-emerald-500/20">
                        {"links" in achievement && achievement.links && achievement.links.hackathon && (
                          <a href={achievement.links.hackathon} target="_blank" rel="noopener noreferrer"
                            className="text-[10px] font-mono px-2 py-1 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
                            [HACKATHON]
                          </a>
                        )}
                        {"links" in achievement && achievement.links && achievement.links.github && (
                          <a href={achievement.links.github} target="_blank" rel="noopener noreferrer"
                            className="text-[10px] font-mono px-2 py-1 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400">
                            [SOURCE]
                          </a>
                        )}
                        {"links" in achievement && achievement.links && achievement.links.live && (
                          <a href={achievement.links.live} target="_blank" rel="noopener noreferrer"
                            className="text-[10px] font-mono px-2 py-1 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400">
                            [LIVE_DEMO]
                          </a>
                        )}
                        {"verify" in achievement && achievement.verify && (
                          <a href={achievement.verify} target="_blank" rel="noopener noreferrer"
                            className="text-[10px] font-mono px-2 py-1 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
                            [VERIFY_CREDENTIAL]
                          </a>
                        )}
                      </div>
                    ) : null}
                  </div>

                  <div className="absolute top-2 right-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    <div className="text-base font-mono text-cyan-300 motion-safe:animate-pulse">
                      {isCert ? <span aria-hidden="true">🎓</span> : "🏆"}
                    </div>
                  </div>
                </div>
              )
            })}
          </HorizontalSlider>
        </div>

        <div className="text-center mt-6 sm:mt-8 px-2">
          <p className="text-xs font-mono text-emerald-400/80">
            [*] Total achievements unlocked: {achievementsData.length} | Status: ✓ VERIFIED
          </p>
        </div>
      </div>
    </section>
  )
}
