import { Mail, Phone, MapPin } from "lucide-react"
import { TerminalStrip } from "./TerminalStrip"
import { useScrollReveal } from "../hooks/useScrollReveal"

export function ContactSection() {
  const ref = useScrollReveal<HTMLElement>()
  return (
    <section ref={ref} id="contact" className="relative py-12 md:py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-black to-slate-950 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      <TerminalStrip label="[CONTACT.PROTO]" meta="communication • handshake_init" />

      <div className="container mx-auto max-w-3xl mt-4 sm:mt-6 relative z-10">
        <div className="scroll-reveal bg-black border-2 border-emerald-500/30 rounded-lg p-4 sm:p-6 shadow-[0_0_30px_rgba(16,185,129,0.2)] overflow-hidden">
          <div className="absolute inset-0 scanlines opacity-20 pointer-events-none"></div>

          <div className="relative z-10 space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <h3 className="text-base sm:text-xl font-bold font-mono text-emerald-400">$ ./contact --init-session</h3>
            </div>

            <div className="border border-emerald-500/30 bg-emerald-500/5 rounded p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-emerald-500">[AVAILABLE]</span>
              </div>
              <p className="text-sm text-gray-300 font-mono leading-relaxed">
                Open to internships &amp; part-time remote roles (Cybersecurity, AI). I'm flexible for collaborations, part-time work, and knowledge-sharing initiatives.
              </p>
            </div>

            <div className="border border-emerald-500/30 bg-emerald-500/5 rounded p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-500 font-mono">[LOCATION]</span>
              </div>
              <p className="text-sm font-mono text-emerald-400">New Delhi, INDIA</p>
            </div>

            <div className="border border-emerald-500/30 bg-emerald-500/5 rounded p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-emerald-500">[INTERESTS]</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Ethical Hacking", "Security Operations", "AI in Cybersecurity", "Hackathons & CTF"].map((chip) => (
                  <span key={chip} className="px-3 py-1 rounded border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-mono text-xs hover:bg-emerald-500/20 transition-colors">
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-emerald-500/30 bg-emerald-500/5 rounded p-4 group hover:bg-emerald-500/10 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-500 font-mono text-xs">[EMAIL]</span>
                </div>
                <a className="text-sm font-mono text-emerald-400 hover:text-emerald-300 block" href="mailto:paarthbhatt37@gmail.com">
                  paarthbhatt37@gmail.com
                </a>
              </div>
              <div className="border border-emerald-500/30 bg-emerald-500/5 rounded p-4 group hover:bg-emerald-500/10 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-500 font-mono text-xs">[PHONE]</span>
                </div>
                <a className="text-sm font-mono text-emerald-400 hover:text-emerald-300 block" href="tel:+918920948990">
                  +91 8920948990
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-emerald-500/30">
              <a
                href="/Resume_PARTH.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-emerald-500/40 px-4 py-2 font-mono text-sm text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500 transition-all group"
              >
                <span className="group-hover:translate-x-1 transition-transform inline-block">&gt;</span>
                [DOWNLOAD] Resume_PARTH.pdf
              </a>
            </div>

            <div className="pt-4 border-t border-emerald-500/30 text-xs font-mono text-emerald-500/70">
              <p>[*] Session ready | Handshake pending | Status: ✓ ONLINE</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
