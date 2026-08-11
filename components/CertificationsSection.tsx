import { TerminalStrip } from "./TerminalStrip"
import { ASCIIArt } from "./ASCIIArt"
import { HorizontalSlider } from "./HorizontalSlider"
import { certificationsHighlight, certificationsOther } from "../lib/data"
import { useScrollReveal } from "../hooks/useScrollReveal"

export function CertificationsSection() {
  const ref = useScrollReveal<HTMLElement>()
  return (
    <section
      ref={ref}
      id="certifications"
      className="relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-black to-slate-950"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      <TerminalStrip label="[CREDENTIALS.SCAN]" meta="verifying • certification_store" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="scroll-reveal text-center mb-6 sm:mb-8 mt-4 sm:mt-6 px-2">
          <ASCIIArt
            text={` ██████╗███████╗██████╗ ████████╗██╗███████╗██╗ ██████╗ █████╗ ████████╗██╗ ██████╗ ███╗   ██╗███████╗
██╔════╝██╔════╝██╔══██╗╚══██╔══╝██║██╔════╝██║██╔════╝██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║╚══███╔╝
██║     █████╗  ██████╔╝   ██║   ██║█████╗  ██║██║     ███████║   ██║   ██║██║   ██║██╔██╗ ██║  ███╔╝
██║     ██╔══╝  ██╔══██╗   ██║   ██║██╔══╝  ██║██║     ██╔══██║   ██║   ██║██║   ██║██║╚██╗██║ ███╔╝  
╚██████╗███████╗██║  ██║   ██║   ██║██║     ██║╚██████╗██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║███████╗
 ╚═════╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝╚═╝     ╚═╝ ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝`}
            delay={300}
          />
        </div>

        {/* ── Highlight tier: full slider cards ── */}
        <div className="mt-6 sm:mt-8">
          <HorizontalSlider ariaLabel="Certifications slider">
            {certificationsHighlight.map((cert, index) => (
              <div
                key={index}
                className="group relative snap-start min-w-[280px] sm:min-w-[380px] lg:min-w-[450px] bg-black border-2 border-emerald-500/30 rounded-lg p-4 sm:p-6 mr-3 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:border-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 scanlines opacity-20 pointer-events-none"></div>

                <div className="relative z-10 flex items-start gap-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${cert.bgGradient} rounded-lg flex items-center justify-center border-2 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform`}>
                    <cert.icon className="w-8 h-8 text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded border border-emerald-500/30">
                        [{cert.date}]
                      </span>
                      <span className="text-xs font-mono text-emerald-500/70">@ {cert.issuer}</span>
                    </div>
                    <h3 className="text-base font-bold font-mono text-emerald-400 mb-2 leading-tight">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-mono leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-2 right-2 opacity-50 group-hover:opacity-100 transition-opacity">
                  <div className="text-xs font-mono text-emerald-500">✓ VERIFIED</div>
                </div>
              </div>
            ))}
          </HorizontalSlider>
        </div>

        {/* ── Other tier: compact badge row ── */}
        {certificationsOther.length > 0 && (
          <div className="scroll-reveal delay-2 mt-6 sm:mt-8 bg-black border border-emerald-500/20 rounded-lg p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-emerald-500/70 rounded-full"></span>
              <span className="text-xs font-mono text-emerald-500/70">[OTHER_CREDENTIALS]</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {certificationsOther.map((cert, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-emerald-500/25 bg-emerald-500/5 text-emerald-400/80 font-mono text-[10px] sm:text-xs hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all"
                >
                  <span className="text-emerald-500/50">✓</span>
                  {cert.title}
                  <span className="text-emerald-500/40">({cert.issuer})</span>
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-6 sm:mt-8 px-2">
          <p className="text-xs font-mono text-emerald-500/50">
            [*] Total certificates verified: {certificationsHighlight.length + certificationsOther.length} | Status: ✓ AUTHENTICATED
          </p>
        </div>
      </div>
    </section>
  )
}
