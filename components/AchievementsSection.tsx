import { TerminalStrip } from "./TerminalStrip"
import { ASCIIArt } from "./ASCIIArt"
import { HorizontalSlider } from "./HorizontalSlider"
import { achievementsData } from "../lib/data"

export function AchievementsSection() {
  return (
    <section
      id="achievements"
      className="relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-black to-slate-950"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      <TerminalStrip label="[ACHIEVEMENT.DAT]" meta="unlocked • trophy_scan" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-6 sm:mb-8 mt-4 sm:mt-6 px-2">
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

        <div className="mt-6 sm:mt-8">
          <HorizontalSlider ariaLabel="Achievements slider">
            {achievementsData.map((achievement, index) => (
              <div
                key={index}
                className="group relative snap-start min-w-[300px] sm:min-w-[420px] lg:min-w-[550px] bg-black border-2 border-emerald-500/30 rounded-lg p-4 sm:p-6 mr-3 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:border-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 scanlines opacity-20 pointer-events-none"></div>

                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${achievement.bgGradient} rounded-lg flex items-center justify-center border-2 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform`}>
                      <achievement.icon className="w-8 h-8 text-white" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded border border-cyan-500/30">
                          [ACHIEVEMENT]
                        </span>
                        <span className="text-xs font-mono text-emerald-500/70">{achievement.date}</span>
                      </div>
                      <h3 className="text-lg font-bold font-mono text-emerald-400 mb-1">
                        {achievement.title}
                      </h3>
                      <p className="text-xs font-mono text-cyan-400 mb-2">
                        {achievement.subtitle}
                      </p>
                      <p className="text-xs text-emerald-500/70 font-mono">@ {achievement.issuer}</p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 font-mono leading-relaxed">
                    {achievement.description}
                  </p>

                  {"links" in achievement && achievement.links && (
                    <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t border-emerald-500/20">
                      {"hackathon" in achievement.links && achievement.links.hackathon && (
                        <a href={achievement.links.hackathon} target="_blank" rel="noopener noreferrer"
                          className="text-[10px] font-mono px-2 py-1 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 transition-colors">
                          [HACKATHON]
                        </a>
                      )}
                      {"github" in achievement.links && achievement.links.github && (
                        <a href={achievement.links.github} target="_blank" rel="noopener noreferrer"
                          className="text-[10px] font-mono px-2 py-1 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 transition-colors">
                          [SOURCE]
                        </a>
                      )}
                      {"live" in achievement.links && achievement.links.live && (
                        <a href={achievement.links.live} target="_blank" rel="noopener noreferrer"
                          className="text-[10px] font-mono px-2 py-1 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 transition-colors">
                          [LIVE_DEMO]
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <div className="absolute top-2 right-2 opacity-30 group-hover:opacity-100 transition-opacity">
                  <div className="text-sm font-mono text-emerald-500 animate-pulse">🏆</div>
                </div>
              </div>
            ))}
          </HorizontalSlider>
        </div>

        <div className="text-center mt-6 sm:mt-8 px-2">
          <p className="text-xs font-mono text-emerald-500/50">
            [*] Total achievements unlocked: {achievementsData.length} | Status: ✓ VERIFIED
          </p>
        </div>
      </div>
    </section>
  )
}
