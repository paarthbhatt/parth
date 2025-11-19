"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  X,
  Award,
  Users,
  Shield,
  GitBranch,
  Building,
  Linkedin,
  Github,
  Twitter,
  Eye,
} from "lucide-react"

// Reusable NameDisplay Component
function NameDisplay({ glitch = false, className = "" }: { glitch?: boolean; className?: string }) {
  return (
    <span
      className={[
        "font-extrabold font-mono tracking-tight",
        // keep sizes consistent across loader and hero for a seamless transition
        "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl",
        "bg-clip-text text-transparent",
        glitch ? "glitch glitch-once" : "",
        className,
      ].join(" ")}
      data-text="Parth Bhatt"
      style={{ backgroundImage: "linear-gradient(90deg,#06b6d4,#10b981,#22c55e,#06b6d4)" }}
    >
      Parth Bhatt
    </span>
  )
}

// Contact Modal Component
function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform animate-scale-in">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Contact Details</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <Mail className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
              <p className="font-medium text-gray-800 dark:text-white">paarthbhatt37@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <Phone className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
              <p className="font-medium text-gray-800 dark:text-white">+91 8920948990</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <MapPin className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
              <p className="font-medium text-gray-800 dark:text-white">New Delhi, INDIA</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <Clock className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Availability</p>
              <p className="font-medium text-gray-800 dark:text-white">Available for immediate start</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Pitch Modal Component
function PitchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto animate-pitch-modal-in">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 font-mono text-emerald-600 dark:text-emerald-400">
              Why I'm a fit for Cybersecurity Roles
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 p-6 rounded-2xl">
              <h4 className="text-xl font-semibold text-emerald-700 dark:text-emerald-300 mb-3">
                Validated Foundations
              </h4>
              <p className="leading-relaxed">
                Junior Cybersecurity Analyst (Cisco), Threat Intelligence (arcX), Pre‑Security (TryHackMe), and GitHub
                Foundations—giving me a strong base in SOC workflows, TI methodologies, and secure SDLC practices.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-2xl">
              <h4 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-3">Analyst Mindset</h4>
              <p className="leading-relaxed">
                Comfortable with log triage, IOC enrichment, and writing concise incident notes. I approach problems
                like an analyst: hypotheses, evidence, and iterative refinement.
              </p>
            </div>

            <div className="bg-gradient-to-r from-slate-50 to-zinc-50 dark:from-slate-900/20 dark:to-zinc-900/20 p-6 rounded-2xl">
              <h4 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-3">Impactful Projects</h4>
              <p className="leading-relaxed">
                Built a Smart City data dashboard for Delhi with real‑time visualization—evidence of reliability, data
                hygiene, and shipping user‑centric tools with security in mind.
              </p>
            </div>

            <div className="text-center pt-2">
              <p className="text-lg font-medium text-gray-800 dark:text-white">
                I'm ready to contribute on day one—curious, reliable, and focused on secure outcomes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Terminal Strip Component
function TerminalStrip({
  label = "SESSION",
  meta = "status: online",
}: {
  label?: string
  meta?: string
}) {
  return (
    <div className="relative z-10 mx-auto max-w-7xl">
      {/* was -mb-6 which caused overlap with the next heading */}
      <div className="mx-4 sm:mx-6 lg:mx-8 mb-2 sm:mb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 rounded-t-xl border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-500/10 px-3 sm:px-4 py-2 backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]"></span>
            <span className="ml-3 font-mono text-xs sm:text-sm text-emerald-500 dark:text-emerald-400 tracking-wide">
              {label}
            </span>
          </div>
          <div className="font-mono text-[10px] sm:text-xs text-emerald-500/80 dark:text-emerald-300/80 sm:text-right">
            {meta}
          </div>
        </div>
      </div>
    </div>
  )
}

// Hacker Header Component
function Header({
  isContactOpen,
  setIsContactOpen,
  introDone,
}: { isContactOpen: boolean; setIsContactOpen: (open: boolean) => void; introDone: boolean }) {
  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-40 border-b-2 border-emerald-500/30 bg-black/90 backdrop-blur-md shadow-[0_8px_32px_-8px_rgba(16,185,129,0.4)] transition-all duration-700 relative overflow-hidden",
        introDone ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4",
      ].join(" ")}
    >
      {/* Scanlines */}
      <div className="absolute inset-0 scanlines opacity-10 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
            <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />
            <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#06b6d4] animate-pulse" />
            <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6] animate-pulse" />
            <div className="ml-1 sm:ml-2 md:ml-3 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.5)] border border-emerald-500">
              PB
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold font-mono text-emerald-400 tracking-tight">
              Parth Bhatt
            </h1>
          </div>

          <div className="w-[80px] sm:w-[96px] md:w-[112px] lg:w-[128px]" aria-hidden="true" />
        </div>
        <div className="h-0.5 w-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 opacity-70" />
      </div>
    </header>
  )
}

function RotatingGlitchText({
  items,
  interval = 2400,
  className = "",
}: {
  items: string[]
  interval?: number
  className?: string
}) {
  // type/delete timings (interval kept for API compat; not used directly)
  const typeMs = 32
  const holdMs = 1100
  const deleteMs = 18

  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing")
  const [text, setText] = useState("")

  useEffect(() => {
    let id: number | undefined

    if (phase === "typing") {
      const target = items[index]
      if (text.length < target.length) {
        id = window.setTimeout(() => setText(target.slice(0, text.length + 1)), typeMs)
      } else {
        setPhase("holding")
      }
    } else if (phase === "holding") {
      id = window.setTimeout(() => setPhase("deleting"), holdMs)
    } else if (phase === "deleting") {
      if (text.length > 0) {
        id = window.setTimeout(() => setText(text.slice(0, -1)), deleteMs)
      } else {
        setIndex((i) => (i + 1) % items.length)
        setPhase("typing")
      }
    }

    return () => {
      if (id) window.clearTimeout(id)
    }
  }, [phase, text, index, items])

  useEffect(() => {
    // reset text whenever index changes to new item
    if (phase === "typing") setText((t) => t) // no-op to keep react happy
  }, [index, phase])

  return (
    <span
      aria-live="polite"
      className={[
        "font-mono font-semibold text-lg sm:text-xl md:text-2xl bg-clip-text text-transparent",
        className,
      ].join(" ")}
      style={{ backgroundImage: "linear-gradient(90deg,#22c55e,#06b6d4,#60a5fa)" }}
    >
      {text}
    </span>
  )
}

// HorizontalSlider Component with safe useRef-based implementation
function HorizontalSlider({
  children,
  ariaLabel,
}: {
  children: React.ReactNode
  ariaLabel: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollByAmount = (dir: "left" | "right") => {
    const el = containerRef.current
    if (!el) return
    const amount = el.clientWidth * 0.9 * (dir === "left" ? -1 : 1)
    el.scrollBy({ left: amount, behavior: "smooth" })
  }

  return (
    <div className="relative">
      <div
        ref={containerRef}
        aria-label={ariaLabel}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-hide"
      >
        {children}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => scrollByAmount("left")}
          className="cyber-btn cyber-btn--sm"
          aria-label="Previous"
        >
          <span className="cyber-btn__label">◀ Prev</span>
        </button>
        <button
          type="button"
          onClick={() => scrollByAmount("right")}
          className="cyber-btn cyber-btn--sm"
          aria-label="Next"
        >
          <span className="cyber-btn__label">Next ▶</span>
        </button>
      </div>
    </div>
  )
}

// Certifications Section - Hacker Style
function CertificationsSection() {
  const certifications = [
    {
      title: "Junior Cybersecurity Analyst Career Path",
      issuer: "Cisco",
      date: "2025",
      icon: Shield,
      bgGradient: "from-blue-500 to-cyan-600",
      description: "Comprehensive cybersecurity training covering threat detection, incident response, and security analysis",
    },
    {
      title: "Foundation Level Threat Intelligence Analyst",
      issuer: "arcX",
      date: "2025",
      icon: Eye,
      bgGradient: "from-red-500 to-pink-600",
      description: "Specialized training in threat intelligence analysis, cyber threat hunting, and security intelligence",
    },
    {
      title: "GitHub Foundations",
      issuer: "GitHub",
      date: "2025",
      icon: GitBranch,
      bgGradient: "from-green-500 to-emerald-600",
      description: "Mastery of version control, collaborative development workflows, and open-source contribution practices",
    },
    {
      title: "Pre-Security Certificate",
      issuer: "TryHackMe",
      date: "2025",
      icon: Shield,
      bgGradient: "from-yellow-500 to-orange-600",
      description: "Foundational cybersecurity knowledge covering network security, web application security, and digital forensics",
    },
    {
      title: "Cybersecurity 101 Certificate",
      issuer: "TryHackMe",
      date: "2025",
      icon: Shield,
      bgGradient: "from-yellow-500 to-orange-600",
      description: "Fundamental concepts of cybersecurity including network security, web application security, and cryptography",
    },
    {
      title: "ICS Cybersecurity Risks, Vulnerabiltities and Threats (3 certs)",
      issuer: "CISA",
      date: "2025",
      icon: Building,
      bgGradient: "from-blue-600 to-indigo-600",
      description: "Specialized training on Industrial Control Systems (ICS) security, focusing on risks, vulnerabilities, and threat mitigation",
    },
    {
      title: "Introduction to Cybersecurity",
      issuer: "Cisco",
      date: "2025",
      icon: Shield,
      bgGradient: "from-blue-500 to-cyan-600",
      description: "Foundational understanding of cybersecurity principles, protecting personal online life, and insights into security challenges",
    },
    {
      title: "XSS Defense Bootcamp",
      issuer: "DevTown",
      date: "2025",
      icon: Shield,
      bgGradient: "from-purple-500 to-pink-600",
      description: "Deep dive into Cross-Site Scripting (XSS) attacks and defense mechanisms, focusing on secure coding practices",
    },
  ]

  return (
    <section
      id="certifications"
      className="relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-black to-slate-950"
    >
      {/* Matrix background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      <TerminalStrip label="[CREDENTIALS.SCAN]" meta="verifying • certification_store" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-6 sm:mb-8 mt-4 sm:mt-6 px-2">
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

        <div className="mt-6 sm:mt-8">
          <HorizontalSlider ariaLabel="Certifications slider">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="group relative snap-start min-w-[280px] sm:min-w-[380px] lg:min-w-[450px] bg-black border-2 border-emerald-500/30 rounded-lg p-4 sm:p-6 mr-3 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:border-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all duration-300 overflow-hidden"
              >
                {/* Scanlines */}
                <div className="absolute inset-0 scanlines opacity-20 pointer-events-none"></div>
                
                {/* Badge */}
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

                {/* Verification stamp */}
                <div className="absolute bottom-2 right-2 opacity-50 group-hover:opacity-100 transition-opacity">
                  <div className="text-xs font-mono text-emerald-500">✓ VERIFIED</div>
                </div>
              </div>
            ))}
          </HorizontalSlider>
        </div>

        <div className="text-center mt-6 sm:mt-8 px-2">
          <p className="text-xs font-mono text-emerald-500/50">
            [*] Total certificates verified: {certifications.length} | Status: ✓ AUTHENTICATED
          </p>
        </div>
      </div>
    </section>
  )
}

// Achievements Section - Hacker Style
function AchievementsSection() {
  const achievements = [
    {
      title: "Winner – MCA Eagles' CodeNest 2025",
      subtitle: "Top 3 in App Category",
      issuer: "Devpost",
      date: "Feb 2025",
      icon: Award,
      bgGradient: "from-yellow-500 to-orange-600",
      description: "Recognized for exceptional mobile application development skills and innovative problem-solving approach in a competitive coding environment.",
    },
    {
      title: "1st Position – Design Dojo Event",
      subtitle: "Sinusoid Fest Winner",
      issuer: "siNUsoid V8 - NIIT University",
      date: "2025",
      icon: Users,
      bgGradient: "from-green-500 to-emerald-600",
      description: "Demonstrated superior design thinking and creativity, leading to first place in a prestigious university-level design competition.",
    },
    {
      title: "Delhi Smart City Command Center",
      subtitle: "Smart City Dashboard Development",
      issuer: "Smart City Hackathon",
      date: "May 2025",
      icon: Building,
      bgGradient: "from-red-500 to-pink-600",
      description: "Developed a comprehensive smart city dashboard focused on Delhi, showcasing real-time and historical urban data to enhance city management and citizen engagement through interactive visualizations.",
    },
  ]

  return (
    <section
      id="achievements"
      className="relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-black to-slate-950"
    >
      {/* Matrix background */}
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
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="group relative snap-start min-w-[300px] sm:min-w-[420px] lg:min-w-[550px] bg-black border-2 border-emerald-500/30 rounded-lg p-4 sm:p-6 mr-3 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:border-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all duration-300 overflow-hidden"
              >
                {/* Scanlines */}
                <div className="absolute inset-0 scanlines opacity-20 pointer-events-none"></div>
                
                {/* Achievement display */}
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
                </div>

                {/* Trophy icon effect */}
                <div className="absolute top-2 right-2 opacity-30 group-hover:opacity-100 transition-opacity">
                  <div className="text-sm font-mono text-emerald-500 animate-pulse">🏆</div>
                </div>
              </div>
            ))}
          </HorizontalSlider>
        </div>

        <div className="text-center mt-6 sm:mt-8 px-2">
          <p className="text-xs font-mono text-emerald-500/50">
            [*] Total achievements unlocked: {achievements.length} | Status: ✓ VERIFIED
          </p>
        </div>
      </div>
    </section>
  )
}

// Brightened and detailed Footer Component
function Footer({ introDone }: { introDone: boolean }) {
  return (
    <footer
      className={[
        "rounded-t-2xl border-t border-emerald-500/25 bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 text-white backdrop-blur-md shadow-[0_-10px_30px_-12px_rgba(34,197,94,0.35)] transition-all duration-700",
        introDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-5">
        <div className="mb-2 sm:mb-3 flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-emerald-300" />
          <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-cyan-300" />
          <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-blue-300" />
          <span className="ml-1 sm:ml-2 font-mono text-[10px] sm:text-xs opacity-80">/dev/portfolio – link-layer</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/15 text-white text-xs sm:text-sm font-bold flex items-center justify-center shadow-lg border border-white/20">
              PB
            </div>
            <span className="text-base sm:text-lg font-semibold">Parth Bhatt</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xs sm:text-sm opacity-90 mr-0.5 sm:mr-1">Connect:</span>
            <a
              href="mailto:paarthbhatt37@gmail.com"
              className="group p-2 bg-white/15 hover:bg-white/25 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
            >
              <Mail className="w-4 h-4 text-white" />
            </a>
            <a
              href="https://www.linkedin.com/in/parth-bhatt-07bb36310/"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-2 bg-white/15 hover:bg-white/25 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
            >
              <Linkedin className="w-4 h-4 text-white" />
            </a>
            <a
              href="https://github.com/paarthbhatt"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-2 bg-white/15 hover:bg-white/25 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
            >
              <Github className="w-4 h-4 text-white" />
            </a>
            <a
              href="https://x.com/thatsparthbhatt"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-2 bg-white/15 hover:bg-white/25 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
            >
              <Twitter className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>

        <div className="text-center mt-4 pt-4 border-t border-white/20">
          <p className="text-xs sm:text-sm opacity-90">
            © 2025 Parth Bhatt • terminal-mode online • building secure, human‑centered software
          </p>
        </div>
      </div>
    </footer>
  )
}

// Hacker Boot Sequence Component
function HackerBootSequence({ introDissolve, onProceed, onCancel }: { introDissolve: boolean; onProceed: () => void; onCancel: () => void }) {
  const [currentLine, setCurrentLine] = useState(0)
  const [glitchActive, setGlitchActive] = useState(false)
  const [codeFalls, setCodeFalls] = useState<Array<{ left: number; delay: number; duration: number; text: string }>>([])
  const [showBanner, setShowBanner] = useState(true)
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  const [awaitingInput, setAwaitingInput] = useState(false)

  const bootSequence = [
    { delay: 0, kind: "cmd", text: "whoami" },
    { delay: 300, kind: "out", text: "parth_bhatt" },
    { delay: 600, kind: "cmd", text: "hostname" },
    { delay: 900, kind: "out", text: "parth-bhatt.dev" },
    { delay: 1200, kind: "cmd", text: "uname -srv" },
    { delay: 1500, kind: "out", text: "Linux 6.x #1337 SMP x86_64" },
    { delay: 1800, kind: "cmd", text: "ls modules" },
    { delay: 2100, kind: "out", text: "skills.sys  certs.sys  projects.sys" },
    { delay: 2400, kind: "cmd", text: "./scanner --capabilities --fast" },
    { delay: 2700, kind: "out", text: "capabilities: ThreatIntel ✓  Cybersecurity ✓  WebSec ✓" },
  ] as Array<{ delay: number; kind: "cmd" | "out"; text: string }>

  useEffect(() => {
    // Generate falling code particles
    const falls = Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
      text: Math.random().toString(36).substring(2, 15),
    }))
    setCodeFalls(falls)

    const glitchInterval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 100)
    }, 2000)

    return () => {
      clearInterval(glitchInterval)
    }
  }, [])

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []
    bootSequence.forEach((item, index) => {
      const timer = setTimeout(() => {
        setCurrentLine(index)
      }, item.delay)
      timers.push(timer)
    })
    // after last item rendered, enable y/n prompt
    const lastDelay = bootSequence[bootSequence.length - 1]?.delay ?? 0
    const afterId = setTimeout(() => setAwaitingInput(true), lastDelay + 150)
    timers.push(afterId)
    return () => timers.forEach(timer => clearTimeout(timer))
  }, [])

  // Capture keyboard for (y/n) once ready
  useEffect(() => {
    if (!awaitingInput) return
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (key === 'y' || key === 'enter') {
        onProceed()
      } else if (key === 'n') {
        onCancel()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [awaitingInput, onProceed, onCancel])

  return (
    <div
      className={`fixed inset-0 z-[60] bg-black flex items-center justify-center overflow-hidden ${introDissolve ? "dissolve-out" : ""}`}
    >
      {/* Matrix background effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse"></div>
      </div>

      {/* Falling code effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {codeFalls.map((fall, i) => (
          <div
            key={i}
            className="absolute text-emerald-500/20 font-mono text-xs"
            style={{
              left: `${fall.left}%`,
              animation: `fall ${fall.duration}s linear infinite`,
              animationDelay: `${fall.delay}s`,
            }}
          >
            {fall.text}
          </div>
        ))}
      </div>

      {/* Terminal Window */}
      <div className="relative z-10 w-full max-w-[95%] sm:max-w-4xl mx-2 sm:mx-4 bg-black border-2 border-emerald-500/50 rounded-lg shadow-[0_0_50px_rgba(16,185,129,0.5)] overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-emerald-500/10 border-b border-emerald-500/30 px-2 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1 sm:gap-2">
          <div className="flex gap-1 sm:gap-1.5">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-[10px] sm:text-xs font-mono text-emerald-400 ml-1 sm:ml-2 truncate">root@parth-bhatt:~</span>
        </div>

      {/* Desktop/Laptop best experience disclaimer */}
      {showDisclaimer && (
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20">
          <div className="group relative rounded-lg border-2 border-emerald-500/50 bg-black/85 px-3 py-2 shadow-[0_0_20px_rgba(16,185,129,0.35)] backdrop-blur">
            <div className="absolute -inset-0.5 rounded-lg bg-[conic-gradient(from_180deg_at_50%_50%,rgba(16,185,129,0.2),rgba(6,182,212,0.2),rgba(59,130,246,0.2),rgba(16,185,129,0.2))] blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-mono text-emerald-400">[NOTICE]</span>
              <span className="text-[10px] sm:text-xs font-mono text-emerald-200 whitespace-nowrap">
                Best experienced on <span className="text-cyan-400 font-semibold">desktop/laptop</span> 💻
              </span>
              <button
                type="button"
                aria-label="Dismiss notice"
                className="ml-1 text-emerald-500/70 hover:text-emerald-300 text-[10px] sm:text-xs"
                onClick={() => setShowDisclaimer(false)}
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

        {/* Terminal Content */}
        <div className="p-3 sm:p-4 md:p-6 font-mono text-[10px] sm:text-xs md:text-sm overflow-y-auto overflow-x-auto max-h-[75vh] sm:max-h-[70vh]">
          {/* ASCII Banner (shown first during loading) */}
          {showBanner && (
            <div className={`mb-2 sm:mb-4 text-center ${glitchActive ? "animate-pulse" : ""}`}>
              <pre className="hidden sm:block text-[7px] md:text-[9px] lg:text-[11px] xl:text-[12px] text-emerald-500 dark:text-emerald-400 whitespace-pre overflow-x-auto">
{`██████╗  █████╗ ██████╗ ████████╗██╗  ██╗    ██████╗ ██╗  ██╗ █████╗ ████████╗████████╗
██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██║  ██║    ██╔══██╗██║  ██║██╔══██╗╚══██╔══╝╚══██╔══╝
██████╔╝███████║██████╔╝   ██║   ███████║    ██████╔╝███████║███████║   ██║      ██║   
██╔═══╝ ██╔══██║██╔══██╗   ██║   ██╔══██║    ██╔══██╗██╔══██║██╔══██║   ██║      ██║   
██║     ██║  ██║██║  ██║   ██║   ██║  ██║    ██████╔╝██║  ██║██║  ██║   ██║      ██║   
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝      ╚═╝    `}
              </pre>
              <div className="block sm:hidden">
                <p className="font-mono text-[11px] text-emerald-400">[boot] Parth Bhatt Portfolio</p>
              </div>
            </div>
          )}

          {/* Boot Sequence Lines */
          }
          <div className="space-y-0.5 sm:space-y-1">
            {bootSequence.slice(0, currentLine + 1).map((item, index) => {
              const isCmd = item.kind === "cmd"
              return (
                <div
                  key={index}
                  className={`animate-fade-in break-words ${isCmd ? "text-emerald-500" : "text-emerald-400/80"}`}
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  {isCmd ? (
                    <>
                      <span className="text-cyan-500 text-[10px] sm:text-xs">root@parth-bhatt:~$</span>{" "}
                      <span className="text-[10px] sm:text-xs text-cyan-400">{item.text}</span>
                      {index === currentLine && <span className="animate-pulse text-emerald-500 inline-block ml-1">▊</span>}
                    </>
                  ) : (
                    <span className="pl-4 text-[10px] sm:text-xs text-emerald-400/80 block">{item.text}</span>
                  )}
                </div>
              )
            })}
          </div>

          {/* Final prompt */}
          {awaitingInput && (
            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-emerald-500/30 animate-fade-in">
              <div className="space-y-1 sm:space-y-1.5 text-[10px] sm:text-xs">
                <div className="text-emerald-400/80">status: OPERATIONAL</div>
                <div>
                  <span className="text-cyan-500">root@parth-bhatt:~$</span>{' '}
                  <span className="text-cyan-400">open portfolio? (y/n)</span>
                  <span className="animate-pulse text-emerald-500 inline-block ml-1">▊</span>
                </div>
                <div className="text-emerald-500/70">press Y or Enter to continue, N to close</div>
                {/* Mobile-friendly controls */}
                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onProceed}
                    className="px-3 py-1 rounded border border-emerald-500/60 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 transition-colors"
                    aria-label="Yes, open portfolio"
                  >
                    Y / ENTER
                  </button>
                  <button
                    type="button"
                    onClick={onCancel}
                    className="px-3 py-1 rounded border border-emerald-500/40 bg-transparent text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                    aria-label="No, close tab"
                  >
                    N
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Scanlines overlay */}
        <div className="absolute inset-0 scanlines opacity-10 pointer-events-none"></div>
      </div>
    </div>
  )
}

// Main App Component
export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isPitchOpen, setIsPitchOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [introDissolve, setIntroDissolve] = useState(false) // start dissolve animation before unmount

  useEffect(() => {
    const updateTheme = () => {
      const hour = new Date().getHours()
      const isDarkMode = hour >= 18 || hour < 6
      setIsDark(isDarkMode)
      if (isDarkMode) {
        document.documentElement.classList.add("dark")
        document.body.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
        document.body.classList.remove("dark")
      }
    }
    updateTheme()
    const interval = setInterval(updateTheme, 60000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className={`min-h-screen transition-colors duration-300 cursor-dollar ${isDark ? "dark" : ""}`}>
      {showIntro && (
        <HackerBootSequence
          introDissolve={introDissolve}
          onProceed={() => {
            setIntroDissolve(true)
            setTimeout(() => setShowIntro(false), 400)
          }}
          onCancel={() => {
            // attempt to close the tab; fallback to about:blank
            try {
              window.close()
              // some browsers block window.close(); fallback
              setTimeout(() => {
                try {
                  // @ts-ignore
                  window.open('', '_self')?.close()
                } catch {}
                window.location.href = 'about:blank'
              }, 150)
            } catch {
              window.location.href = 'about:blank'
            }
          }}
        />
      )}

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-950 px-4 sm:px-6 lg:px-8">
        <Header isContactOpen={isContactOpen} setIsContactOpen={setIsContactOpen} introDone={!showIntro} />
        <main className="pt-20 space-y-12 md:space-y-14">
          <HeroSection isPitchOpen={isPitchOpen} setIsPitchOpen={setIsPitchOpen} setIsContactOpen={setIsContactOpen} />
          {/* HeroSection setIsContactOpen={setIsContactOpen} isPitchOpen={isPitchOpen} setIsPitchOpen={setIsPitchOpen} /> */}
          <AboutSection />
          <ProjectsSection />
          <ExperienceSection />
          <SkillsSection />
          <CertificationsSection />
          <AchievementsSection />
          <ContactSection />
        </main>
        <Footer introDone={!showIntro} />
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        <PitchModal isOpen={isPitchOpen} onClose={() => setIsPitchOpen(false)} />
      </div>
    </div>
  )
}

// Hacker Portfolio Hero Section
function HeroSection({
  isPitchOpen,
  setIsPitchOpen,
  setIsContactOpen,
}: { isPitchOpen: boolean; setIsPitchOpen: (open: boolean) => void; setIsContactOpen: (open: boolean) => void }) {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] md:min-h-[92vh] lg:min-h-[105vh] xl:min-h-[115vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-black to-slate-950 px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
      {/* Matrix background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Hacker code snippets */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-4 sm:left-10 text-emerald-500 font-mono text-xs sm:text-sm animate-pulse">
            {"const protect = () => encrypt()"}
          </div>
          <div className="absolute top-40 right-4 sm:right-20 text-cyan-500 font-mono text-xs sm:text-sm animate-pulse delay-1000">
            {"# cyber-threat-intel"}
          </div>
          <div className="absolute bottom-40 left-4 sm:left-20 text-blue-500 font-mono text-xs sm:text-sm animate-pulse delay-2000">
            {'$ sudo analyze --network'}
          </div>
          <div className="absolute bottom-20 right-4 sm:right-10 text-green-500 font-mono text-xs sm:text-sm animate-pulse delay-3000">
            {"// zero_day_protection"}
          </div>
        </div>
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/5 w-32 sm:w-52 h-32 sm:h-52 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-2/3 right-1/4 w-36 sm:w-60 h-36 sm:h-60 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-28 sm:w-48 h-28 sm:h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto w-full">
        {/* Profile Avatar with glow */}
        <div className="mb-6 sm:mb-7 md:mb-8 flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-1 sm:-inset-1.5 md:-inset-2 bg-emerald-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity animate-pulse"></div>
          <img
            src="/parth-bhatt-portrait.png"
            alt="Parth Bhatt portrait"
              className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full border-2 border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.5)]"
          />
          </div>
        </div>

        <h1 className="mb-3 sm:mb-4 md:mb-5 lg:mb-6">
          <NameDisplay glitch={false} />
        </h1>

        {/* Rotating role titles */}
        <div className="mb-6 sm:mb-7 md:mb-8 lg:mb-10">
          <RotatingGlitchText
            items={[
              "Cyber Threat Intelligence Analyst",
              "Translating noise into signal • building secure tools",
              "Security is a process, not a product. — Schneier",
              "The Best Offense is the Best Defense",
              "Google Developer Certified",
              "Curiosity-driven. Reliable. Security-first.",
            ]}
          />
        </div>

        {/* Status messages */}
        <div className="space-y-1 sm:space-y-1.5 md:space-y-2 mb-6 sm:mb-7 md:mb-8 lg:mb-10 px-2">
          <Typewriter
            text="[✓] handshake complete • secure session established"
            delay={200}
            speed={18}
            className="font-mono text-emerald-400 text-[10px] sm:text-xs md:text-sm"
          />
          <br />
          <Typewriter
            text="[INFO] tech-savvy • driven • adaptive • security-focused"
            delay={700}
            speed={18}
            className="font-mono text-cyan-400 text-[10px] sm:text-xs md:text-sm"
          />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-3.5 md:gap-4 justify-center items-center px-2">
          <a
            href="/resume.pdf"
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

// About Section - Hacker Style
function AboutSection() {
  return (
    <section id="about" className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-black to-slate-950 overflow-hidden">
      {/* Matrix background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      <TerminalStrip label="[SYSTEM_INFO.EXE]" meta="whoami • profile_scan" />
      
      <div className="container mx-auto max-w-5xl mt-4 sm:mt-8 relative z-10">
        <div className="bg-black border-2 border-emerald-500/30 rounded-lg p-4 sm:p-6 shadow-[0_0_30px_rgba(16,185,129,0.2)] overflow-hidden">
          {/* Scanlines */}
          <div className="absolute inset-0 scanlines opacity-20 pointer-events-none"></div>
          
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 relative z-10">
            <div className="md:col-span-1 flex justify-center">
          <img
            src="/parth-bhatt-portrait.png"
            alt="Parth Bhatt"
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.4)]"
          />
        </div>
            <div className="md:col-span-2 space-y-3 sm:space-y-4">
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

// Hacker-style ASCII Art Component
function ASCIIArt({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      let currentIndex = 0
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          // Replace \n with actual newlines for display
          const currentText = text.slice(0, currentIndex + 1).replace(/\\n/g, '\n')
          setDisplayedText(currentText)
          currentIndex++
        } else {
          clearInterval(interval)
          setIsComplete(true)
        }
      }, 8)
      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timer)
  }, [text, delay])

  return (
    <div className="w-full">
      {/* Full ASCII on >= sm; compact hint on mobile to avoid distortion */}
      <div className="hidden sm:block overflow-x-auto">
        <pre className="inline-block max-w-full text-[6px] xs:text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] font-mono text-emerald-500 dark:text-emerald-400 whitespace-pre animate-pulse">
          {displayedText}
        </pre>
      </div>
      <div className="block sm:hidden">
        <p className="font-mono text-[11px] text-emerald-400">
          [ascii condensed] Best viewed on desktop/laptop
        </p>
      </div>
    </div>
  )
}

// Projects Section - Hacker Style
function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<"security" | "web" | "other">("security")
  const [isHacking, setIsHacking] = useState(false)

  const securityProjects = [
    {
      title: "SecretVault",
      tag: "Security & Encryption",
      img: "/secure-app-prototype.png",
      description: "Enterprise-grade API key management with AES encryption and zero-knowledge architecture.",
      url: "https://github.com/paarthbhatt/SecretVault",
      ascii: "╔════════════════╗\n║   SECRET VAULT  ║\n║  [ENCRYPTED]    ║\n║  AES-256-GCM    ║\n╚════════════════╝"
    },
    {
      title: "WHOIS Lookup Tool",
      tag: "Threat Intelligence",
      img: "/threat-intel-parser.png",
      description: "Python CLI for bulk domain WHOIS lookups with parallel processing and rate-limiting.",
      url: "https://github.com/paarthbhatt/Whois-Lookup-Terminal-Tool",
      ascii: "╔════════════════╗\n║   WHOIS SCAN    ║\n║  [DOMAIN] <--   ║\n║  → [OWNER]      ║\n╚════════════════╝"
    },
    {
      title: "SurveillanceOps",
      tag: "Security Monitoring",
      img: "/ai-camera.png",
      description: "Enterprise surveillance platform with real-time detection and encrypted analytics.",
      url: "https://surveillance-platform-updated.vercel.app/",
      ascii: "╔════════════════╗\n║  SURVEILLANCE   ║\n║  [MONITOR] ◉◉◉  ║\n║  AI-DETECT ✓    ║\n╚════════════════╝"
    },
  ]

  const webProjects = [
    {
      title: "Delhi Smart City Dashboard",
      tag: "Data Visualization",
      img: "/smart-city-dashboard.png",
      description: "Real-time dashboard for Delhi's smart city initiative with urban data visualization.",
      url: "https://delhi-smart-city.vercel.app/",
      ascii: "╔════════════════╗\n║  SMART CITY     ║\n║  [DASHBOARD]    ║\n║  RT-VISUALIZE ✓ ║\n╚════════════════╝"
    },
    {
      title: "STEM Code Lab",
      tag: "Educational Platform",
      img: "/threat-intel-parser.png",
      description: "Interactive platform for coding education through hands-on simulations.",
      url: "https://stem-codelab.vercel.app/",
      ascii: "╔════════════════╗\n║   CODE LAB      ║\n║  [LEARN] </>    ║\n║  SIMULATE ✓     ║\n╚════════════════╝"
    },
    {
      title: "AI-Based Camera",
      tag: "AI & Computer Vision",
      img: "/ai-camera.png",
      description: "Smart surveillance system using AI for real-time threat detection.",
      url: "https://circuitech-ai-based-camera.vercel.app/main.html",
      ascii: "╔════════════════╗\n║   AI CAMERA     ║\n║  [VISION] ▌◉   ║\n║  ML-DETECT ✓    ║\n╚════════════════╝"
    },
    {
      title: "Eco Track",
      tag: "Environmental Monitoring",
      img: "/eco-track.png",
      description: "Tool for tracking environmental data to promote sustainability practices.",
      url: "https://eco-track-chi.vercel.app/",
      ascii: "╔════════════════╗\n║   ECO TRACK     ║\n║  [MONITOR] 🌱   ║\n║  IoT-SENSOR ✓   ║\n╚════════════════╝"
    },
  ]

  const otherProjects = [
    {
      title: "Netflix Clone",
      tag: "Web App",
      img: "/netflix-clone.png",
      description: "Full-stack Netflix clone with authentication and streaming UI.",
      url: "https://netflix-clone-tau-black.vercel.app/",
      ascii: "╔════════════════╗\n║  NETFLIX CLONE  ║\n║  [STREAM] ▸▸▸   ║\n║  AUTH ✓         ║\n╚════════════════╝"
    },
    {
      title: "Machine Learning Model and Interpretations of Netflix dataset",
      tag: "Data Analysis",
      img: "/ml-netflix.png",
      description: "ML models on Netflix data with visualizations and statistical analysis.",
      url: "https://github.com/paarthbhatt/Netflix-data-files",
      ascii: "╔════════════════╗\n║   ML ANALYSIS   ║\n║  [DATA] ████    ║\n║  INSIGHT ✓      ║\n╚════════════════╝"
    },
  ]

  const HackerProjectCard = ({ project, index }: { project: typeof securityProjects[0] & { ascii?: string }; index: number }) => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
      const timer = setTimeout(() => setIsVisible(true), index * 150)
      return () => clearTimeout(timer)
    }, [index])

    return (
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`block relative bg-black border-2 border-emerald-500/30 rounded-lg p-3 sm:p-4 shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer hover:border-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300 overflow-hidden group ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        {/* Hacker scanlines effect */}
        <div className="absolute inset-0 scanlines opacity-30 pointer-events-none"></div>
        

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-mono text-emerald-500">[{project.tag}]</span>
            </div>
            <span className="text-xs font-mono text-emerald-500/50">#{String(index + 1).padStart(2, '0')}</span>
          </div>
          
          <img 
            src={project.img || "/placeholder.svg"} 
            alt={project.title} 
            className="w-full h-32 object-cover rounded border border-emerald-500/20 mb-3" 
          />
          
          <h4 className="text-base font-bold font-mono text-emerald-400 mb-2 group-hover:text-emerald-300 transition-colors">
            {project.title}
          </h4>
          
          <p className="text-xs text-gray-400 font-mono leading-relaxed">
            {project.description}
          </p>

          {/* Hacker button */}
          <div className="mt-4 flex items-center gap-2 text-xs font-mono">
            <span className="text-emerald-500 animate-pulse">&gt;</span>
            <span className="text-gray-500">Access target</span>
            <span className="text-emerald-500 group-hover:translate-x-1 transition-transform inline-block">→</span>
          </div>
        </div>

        {/* Glitch effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      </a>
    )
  }

  return (
    <section
      id="projects"
      className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-black to-slate-950 overflow-hidden"
    >
      {/* Matrix-style background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent"></div>
      </div>

      <TerminalStrip label="[PROJECTS.EXE]" meta="scanning • targets acquired" />
      
      <div className="container mx-auto max-w-7xl mt-6 space-y-8 relative z-10">
        {/* Hacker ASCII Header */}
        <div className="text-center mb-8">
          <ASCIIArt
            text="╔═══════════════════════════════════════════════════════════════╗\n║                                                                       ║\n║     ██████╗ ██████╗  ██████╗      ██╗███████╗ ██████╗████████╗     ║\n║     ██╔══██╗██╔══██╗██╔═══██╗     ██║██╔════╝██╔════╝╚══██╔══╝     ║\n║     ██████╔╝██████╔╝██║   ██║     ██║█████╗  ██║        ██║        ║\n║     ██╔═══╝ ██╔══██╗██║   ██║██   ██║██╔══╝  ██║        ██║        ║\n║     ██║     ██║  ██║╚██████╔╝╚█████╔╝███████╗╚██████╗   ██║        ║\n║     ╚═╝     ╚═╝  ╚═╝ ╚═════╝  ╚════╝ ╚══════╝ ╚═════╝   ╚═╝        ║\n║                                                                       ║\n╚═══════════════════════════════════════════════════════════════╝"
            delay={500}
          />
        </div>

        {/* Category Selector - Hacker Style */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { id: "security" as const, label: "SECURITY.EXE", count: securityProjects.length },
            { id: "web" as const, label: "WEB_APP.BIN", count: webProjects.length },
            { id: "other" as const, label: "OTHER.DATA", count: otherProjects.length },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setIsHacking(true)
                setTimeout(() => setIsHacking(false), 500)
                setSelectedCategory(cat.id)
              }}
              className={`relative px-6 py-3 font-mono text-sm border-2 transition-all duration-300 ${
                selectedCategory === cat.id
                  ? "border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                  : "border-emerald-500/30 bg-black/50 text-gray-400 hover:border-emerald-500/60 hover:text-emerald-500"
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                {cat.label}
                <span className="text-emerald-600">({cat.count})</span>
            </span>
              {selectedCategory === cat.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 animate-pulse"></div>
              )}
            </button>
        ))}
      </div>

        {/* Projects Grid */}
        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 transition-all duration-500 ${isHacking ? "blur-sm" : ""}`}>
          {selectedCategory === "security" &&
            securityProjects.map((project, i) => (
              <HackerProjectCard key={i} project={project} index={i} />
            ))}
          {selectedCategory === "web" &&
            webProjects.map((project, i) => (
              <HackerProjectCard key={i} project={project} index={i} />
            ))}
          {selectedCategory === "other" &&
            otherProjects.map((project, i) => (
              <HackerProjectCard key={i} project={project} index={i} />
            ))}
        </div>

        {/* Hacker Footer Text */}
        <div className="text-center mt-12">
          <p className="text-xs font-mono text-emerald-500/50">
            [*] Targets scanned: {securityProjects.length + webProjects.length + otherProjects.length} | Status: ✓ ONLINE
          </p>
        </div>
      </div>
    </section>
  )
}

// Experience Section - Hacker Terminal Log Style
function ExperienceSection() {
  const items = [
    {
      role: "Tech Team Member",
      org: "Sinusoid",
      when: "August 2024",
      desc: "Helped in the creation phase of the website, helped in event competition, operations and technical support.",
      status: "COMPLETED"
    },
    {
      role: "Tech Team Member",
      org: "TEDxNIITUniversity",
      when: "February 2025",
      desc: "Designed webpages all part of the website and helped in operations and technical support.",
      status: "COMPLETED"
    },
    {
      role: "Web Developer Internship",
      org: "LaunchED Global",
      when: "April 2025",
      desc: "Built a commercial dashboard for anime website.",
      status: "COMPLETED"
    },
    {
      role: "Virtual Internship – Cybersecurity & AI",
      org: "NIIT Foundation",
      when: "July 2025",
      desc: "Completed 4-week virtual internship focused on Cybersecurity & Artificial Intelligence.",
      status: "COMPLETED"
    },
  ]

  return (
    <section id="experience" className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-black to-slate-950 overflow-hidden">
      {/* Matrix background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      <TerminalStrip label="[HISTORY.LOG]" meta="experience • timeline_scan" />
      
      <div className="container mx-auto max-w-5xl mt-4 sm:mt-6 relative z-10">
        <div className="bg-black border-2 border-emerald-500/30 rounded-lg p-4 sm:p-6 shadow-[0_0_30px_rgba(16,185,129,0.2)] overflow-hidden">
          {/* Scanlines */}
          <div className="absolute inset-0 scanlines opacity-20 pointer-events-none"></div>
          
          <div className="relative z-10">
            {/* Terminal Header */}
            <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <h3 className="text-base sm:text-xl font-bold font-mono text-emerald-400">$ cat experience.log</h3>
            </div>

            {/* Terminal Log Entries */}
            <div className="space-y-3 sm:space-y-4 font-mono text-xs sm:text-sm">
        {items.map((e, i) => (
                <div
                  key={i}
                  className="bg-emerald-500/5 border-l-4 border-emerald-500/50 pl-3 sm:pl-4 py-3 sm:py-4 hover:bg-emerald-500/10 hover:border-emerald-500 transition-all group"
                >
                  {/* Terminal-style timestamp and status */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-emerald-500 font-mono">[{String(i + 1).padStart(2, '0')}]</span>
                    <span className="text-cyan-500 font-mono">{e.when}</span>
                    <span className="text-emerald-400 font-mono">→</span>
                    <span className="text-emerald-400 font-bold">{e.role}</span>
                    <span className="text-emerald-500/70 font-mono">@ {e.org}</span>
            </div>
                  
                  {/* Description as log entry */}
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">└─</span>
                    <p className="text-gray-300 leading-relaxed flex-1">{e.desc}</p>
                  </div>
                  
                  {/* Status badge */}
                  <div className="mt-2 flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-xs font-mono text-emerald-400">{e.status}</span>
                  </div>
          </div>
        ))}
            </div>

            {/* Terminal Footer */}
            <div className="mt-4 sm:mt-6 pt-4 border-t border-emerald-500/30">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-emerald-500/70">
                <span>[*]</span>
                <span>Total entries: {items.length}</span>
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

// Skills Section - Hacker Style
function SkillsSection() {
  const skills = ["Threat Intel", "Cybersecurity", "Vulnerability Management", "Web Application Security", "Artificial Intelligence", "Github", 
    "Cloud Security", "Incident Response", "Linux", "Python", "DSA", "Collaboration", "Networking", "Cloud Computing", "Project Management",
  "OOPs", "AI tools & Frameworks", "Network Security", "Security Operations", "Cisco Packet Tracer", "Kali Linux", "OWASP"] 

  const [isScanning, setIsScanning] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsScanning(false), 2000)
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <section
      id="skills"
      className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-black to-slate-950 overflow-hidden"
    >
      {/* Matrix background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      <TerminalStrip label="[SKILLS.SCAN]" meta="scanning • capability_matrix" />
      
      <div className="container mx-auto max-w-5xl mt-4 sm:mt-6 relative z-10">
        <div className="bg-black border-2 border-emerald-500/30 rounded-lg p-4 sm:p-6 shadow-[0_0_30px_rgba(16,185,129,0.2)] overflow-hidden">
          {/* Scanlines */}
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
          {skills.map((s, i) => (
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
                  <p>[*] Total skill sets loaded: {skills.length} | Status: ✓ OPERATIONAL</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// Contact Section - Hacker Style
function ContactSection() {
  return (
    <section id="contact" className="relative py-12 md:py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-black to-slate-950 overflow-hidden">
      {/* Matrix background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      <TerminalStrip label="[CONTACT.PROTO]" meta="communication • handshake_init" />
      
      <div className="container mx-auto max-w-3xl mt-4 sm:mt-6 relative z-10">
        <div className="bg-black border-2 border-emerald-500/30 rounded-lg p-4 sm:p-6 shadow-[0_0_30px_rgba(16,185,129,0.2)] overflow-hidden">
          {/* Scanlines */}
          <div className="absolute inset-0 scanlines opacity-20 pointer-events-none"></div>
          
          <div className="relative z-10 space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <h3 className="text-base sm:text-xl font-bold font-mono text-emerald-400">$ ./contact --init-session</h3>
            </div>

            {/* Availability */}
            <div className="border border-emerald-500/30 bg-emerald-500/5 rounded p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-emerald-500">[AVAILABLE]</span>
              </div>
              <p className="text-sm text-gray-300 font-mono leading-relaxed">
                Open to internships & part-time remote roles (Cybersecurity, AI, Blockchain). I'm flexible for collaborations, part-time work, and knowledge-sharing initiatives.
              </p>
            </div>

            {/* Location */}
            <div className="border border-emerald-500/30 bg-emerald-500/5 rounded p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-500 font-mono">[LOCATION]</span>
              </div>
              <p className="text-sm font-mono text-emerald-400">New Delhi, INDIA</p>
          </div>

            {/* Interests */}
            <div className="border border-emerald-500/30 bg-emerald-500/5 rounded p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-emerald-500">[INTERESTS]</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Ethical Hacking", "Security Operations", "AI in Cybersecurity", "Blockchain / Web3 Security", "Hackathons & CTF"].map((chip) => (
                  <span key={chip} className="px-3 py-1 rounded border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-mono text-xs hover:bg-emerald-500/20 transition-colors">
                  {chip}
                </span>
              ))}
            </div>
          </div>

            {/* Contact Info */}
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

            {/* Resume Link */}
            <div className="pt-4 border-t border-emerald-500/30">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-emerald-500/40 px-4 py-2 font-mono text-sm text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500 transition-all group"
              >
                <span className="group-hover:translate-x-1 transition-transform inline-block">&gt;</span>
                [DOWNLOAD] resume.pdf
              </a>
            </div>

            {/* Status */}
            <div className="pt-4 border-t border-emerald-500/30 text-xs font-mono text-emerald-500/70">
              <p>[*] Session ready | Handshake pending | Status: ✓ ONLINE</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


// safe Typewriter component that doesn't clip text
function Typewriter({
  text,
  speed = 24,
  delay = 0,
  className = "",
}: {
  text: string
  speed?: number
  delay?: number
  className?: string
}) {
  const [out, setOut] = useState("")
  useEffect(() => {
    let i = 0
    let intervalId: number | undefined
    const startId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        i += 1
        if (i > text.length) {
          if (intervalId) window.clearInterval(intervalId)
          return
        }
        setOut(text.slice(0, i))
      }, speed)
    }, delay)
    return () => {
      window.clearTimeout(startId)
      if (intervalId) window.clearInterval(intervalId)
    }
  }, [text, speed, delay])

  return (
    <span aria-live="polite" className={className} style={{ whiteSpace: "nowrap" }}>
      {out}
    </span>
  )
}
