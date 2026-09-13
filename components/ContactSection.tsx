import { Mail, Phone, MapPin } from "lucide-react"
import { TerminalStrip } from "./TerminalStrip"
import { contactInfo, contactInterests, ctfProfiles } from "../lib/data"
import { useScrollReveal } from "../hooks/useScrollReveal"

const ctfLinkBase =
  "px-3 py-2 rounded font-mono text-xs transition-all group inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black"

export function ContactSection() {
  const ref = useScrollReveal<HTMLElement>()
  return (
    <section ref={ref} id="contact" aria-labelledby="contact-heading" className="relative py-12 md:py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-black to-slate-950 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      <TerminalStrip label="[CONTACT.PROTO]" meta="communication • handshake_init" />

      <div className="container mx-auto max-w-3xl mt-4 sm:mt-6 relative z-10">
        <div className="scroll-reveal bg-black border-2 border-emerald-500/30 rounded-lg p-4 sm:p-6 shadow-[0_0_30px_rgba(16,185,129,0.2)] overflow-hidden">
          <div className="absolute inset-0 scanlines opacity-20 pointer-events-none"></div>

          <div className="relative z-10 space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full motion-safe:animate-pulse" aria-hidden="true"></span>
              <h2 id="contact-heading" className="text-base sm:text-xl font-bold font-mono text-emerald-400">
                <span aria-hidden="true">$ ./</span>contact<span aria-hidden="true"> --init-session</span>
              </h2>
            </div>

            <div className="border border-emerald-500/30 bg-emerald-500/5 rounded p-4">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-emerald-400 font-mono text-sm">Availability</h3>
              </div>
              <p className="text-sm text-gray-300 font-mono leading-relaxed">
                Open to internships &amp; part-time remote roles (Cybersecurity, AI). I&apos;m flexible for collaborations, part-time work, and knowledge-sharing initiatives.
              </p>
            </div>

            <div className="border border-emerald-500/30 bg-emerald-500/5 rounded p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                <h3 className="text-emerald-400 font-mono text-sm">Location</h3>
              </div>
              <p className="text-sm font-mono text-emerald-400">{contactInfo.location}</p>
            </div>

            <div className="border border-emerald-500/30 bg-emerald-500/5 rounded p-4">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-emerald-400 font-mono text-sm">Interests</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {contactInterests.map((chip) => (
                  <li key={chip} className="px-3 py-1 rounded border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-mono text-xs">
                    {chip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-emerald-500/30 bg-emerald-500/5 rounded p-4">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-emerald-400 font-mono text-sm">CTF profiles</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={ctfProfiles.tryhackme}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${ctfLinkBase} border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500 focus-visible:ring-emerald-400`}
                >
                  <span className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true">&gt;</span>
                  TryHackMe
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <a
                  href={ctfProfiles.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${ctfLinkBase} border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500 focus-visible:ring-cyan-400`}
                >
                  <span className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true">&gt;</span>
                  Medium Blog
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <a
                  href={ctfProfiles.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${ctfLinkBase} border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500 focus-visible:ring-emerald-400`}
                >
                  <span className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true">&gt;</span>
                  GitHub
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-emerald-500/30 bg-emerald-500/5 rounded p-4 hover:bg-emerald-500/10 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                  <h3 className="text-emerald-400 font-mono text-xs">Email</h3>
                </div>
                <a
                  className="text-sm font-mono text-emerald-400 hover:text-emerald-300 hover:underline block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                  href={`mailto:${contactInfo.email}`}
                >
                  {contactInfo.email}
                </a>
              </div>
              <div className="border border-emerald-500/30 bg-emerald-500/5 rounded p-4 hover:bg-emerald-500/10 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                  <h3 className="text-emerald-400 font-mono text-xs">Phone</h3>
                </div>
                <a
                  className="text-sm font-mono text-emerald-400 hover:text-emerald-300 hover:underline block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                  href={`tel:${contactInfo.phone}`}
                >
                  {contactInfo.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-emerald-500/30">
              <a
                href={contactInfo.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-emerald-500/40 px-4 py-2.5 font-mono text-sm text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <span className="group-hover:translate-x-1 transition-transform inline-block" aria-hidden="true">&gt;</span>
                Download résumé (PDF)
              </a>
            </div>

            <div className="pt-4 border-t border-emerald-500/30 text-xs font-mono text-emerald-400/70" aria-hidden="true">
              <p>[*] Session ready | Handshake pending | Status: ✓ ONLINE</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
