"use client"

import { NameDisplay } from "./NameDisplay"
import { RotatingGlitchText } from "./RotatingGlitchText"
import { Typewriter } from "./Typewriter"

export function HeroSection({
  isPitchOpen,
  setIsPitchOpen,
  setIsContactOpen,
}: { isPitchOpen: boolean; setIsPitchOpen: (open: boolean) => void; setIsContactOpen: (open: boolean) => void }) {
  return (
    <section className="crt-flicker relative min-h-[85vh] sm:min-h-[90vh] md:min-h-[92vh] lg:min-h-[105vh] xl:min-h-[115vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-black to-slate-950 px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        {/* Drifting ambient code snippets */}
        <div className="absolute inset-0">
          <div className="drift-1 absolute top-20 left-4 sm:left-10 text-emerald-500 font-mono text-xs sm:text-sm">
            {"const protect = () => encrypt()"}
          </div>
          <div className="drift-2 absolute top-40 right-4 sm:right-20 text-cyan-500 font-mono text-xs sm:text-sm">
            {"# cyber-threat-intel"}
          </div>
          <div className="drift-3 absolute bottom-40 left-4 sm:left-20 text-blue-500 font-mono text-xs sm:text-sm">
            {'$ sudo analyze --network'}
          </div>
          <div className="drift-4 absolute bottom-20 right-4 sm:right-10 text-green-500 font-mono text-xs sm:text-sm">
            {"// zero_day_protection"}
          </div>
        </div>

        {/* Ambient orbs */}
        <div className="absolute top-1/4 left-1/5 w-32 sm:w-52 h-32 sm:h-52 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-2/3 right-1/4 w-36 sm:w-60 h-36 sm:h-60 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-28 sm:w-48 h-28 sm:h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto w-full">

        {/* Avatar — stagger 1 */}
        <div className="hero-stagger-1 mb-6 sm:mb-7 md:mb-8 flex justify-center">
          <div className="relative group">
            {/* Outer double-glow rings */}
            <div className="avatar-outer-ring-2" />
            <div className="avatar-outer-ring" />
            {/* Inner emerald pulse halo */}
            <div className="absolute -inset-1 sm:-inset-1.5 md:-inset-2 bg-emerald-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity animate-pulse"></div>
            <img
              src="/parth-bhatt-portrait.png"
              alt="Parth Bhatt portrait"
              className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full border-2 border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.5)]"
            />
          </div>
        </div>

        {/* Name — stagger 2 */}
        <h1 className="hero-stagger-2 mb-3 sm:mb-4 md:mb-5 lg:mb-6">
          <NameDisplay glitch={false} />
        </h1>

        {/* Rotating subtitle — stagger 3 */}
        <div className="hero-stagger-3 mb-6 sm:mb-7 md:mb-8 lg:mb-10">
          <RotatingGlitchText
            items={[
              "Security Architect • AI Safety Engineer",
              "Building self-defending pipelines at DRDO (SAG)",
              "I don't just find vulnerabilities — I architect the defenses.",
              "Entropy Firewall • Robin Agent • SecretVault",
              "Top 1% TryHackMe • 4× Hackathon Winner",
              "DRDO SAG Intern • Cisco Certified • arcX Analyst",
            ]}
          />
        </div>

        {/* Typewriter lines — stagger 4 */}
        <div className="hero-stagger-4 space-y-1 sm:space-y-1.5 md:space-y-2 mb-6 sm:mb-7 md:mb-8 lg:mb-10 px-2">
          <Typewriter
            text="[✓] clearance verified • DRDO_SAG session active"
            delay={200}
            speed={18}
            className="font-mono text-emerald-400 text-[10px] sm:text-xs md:text-sm"
          />
          <br />
          <Typewriter
            text="[INFO] AppSec • AI Safety • DevSecOps • Threat Intelligence"
            delay={700}
            speed={18}
            className="font-mono text-cyan-400 text-[10px] sm:text-xs md:text-sm"
          />
        </div>

        {/* Buttons — stagger 5 */}
        <div className="hero-stagger-5 flex flex-col sm:flex-row gap-3 sm:gap-3.5 md:gap-4 justify-center items-center px-2">
          <a
            href="/Resume_PARTH.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="cyber-btn group"
            aria-label="Open Resume PDF"
          >
            <span className="cyber-btn__label">RESUME</span>
          </a>
          <button type="button" onClick={() => setIsPitchOpen(true)} className="cyber-btn" aria-label="Open My Pitch">
            <span className="cyber-btn__label">MY&nbsp;PITCH</span>
          </button>
          <button type="button" onClick={() => setIsContactOpen(true)} className="cyber-btn" aria-label="Open Hire Me">
            <span className="cyber-btn__label">HIRE&nbsp;ME</span>
          </button>
        </div>
      </div>
    </section>
  )
}
