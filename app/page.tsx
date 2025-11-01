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
        "text-5xl sm:text-7xl md:text-8xl",
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
              Why I’m a fit for Cybersecurity Roles
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
                I’m ready to contribute on day one—curious, reliable, and focused on secure outcomes.
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
        <div className="flex items-center justify-between rounded-t-xl border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-500/10 px-3 sm:px-4 py-2 backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]"></span>
            <span className="ml-3 font-mono text-xs sm:text-sm text-emerald-500 dark:text-emerald-400 tracking-wide">
              {label}
            </span>
          </div>
          <div className="font-mono text-[10px] sm:text-xs text-emerald-500/80 dark:text-emerald-300/80">{meta}</div>
        </div>
      </div>
    </div>
  )
}

// Enhanced Header Component
function Header({
  isContactOpen,
  setIsContactOpen,
  introDone,
}: { isContactOpen: boolean; setIsContactOpen: (open: boolean) => void; introDone: boolean }) {
  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-40 rounded-b-2xl border-b border-emerald-500/25 bg-white/75 dark:bg-black/70 backdrop-blur-md shadow-[0_6px_30px_-10px_rgba(16,185,129,0.35)] transition-all duration-700",
        introDone ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            <span className="h-2.5 w-2.5 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]" />
            <div className="ml-3 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-600 to-cyan-600 text-white font-bold flex items-center justify-center shadow-lg">
              PB
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-lg sm:text-xl font-bold font-mono text-gray-900 dark:text-white tracking-tight">
              Parth Bhatt
            </h1>
          </div>

          <div className="w-[112px] sm:w-[128px]" aria-hidden="true" />
        </div>
        <div className="h-0.5 w-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 opacity-90 rounded-full" />
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

// Certifications Section
function CertificationsSection() {
  const certifications = [
    {
      title: "Junior Cybersecurity Analyst Career Path",
      issuer: "Cisco",
      date: "2025",
      icon: Shield,
      bgGradient: "from-blue-500 to-cyan-600",
      description:
        "Comprehensive cybersecurity training covering threat detection, incident response, and security analysis",
    },
    {
      title: "Foundation Level Threat Intelligence Analyst",
      issuer: "arcX",
      date: "2025",
      icon: Eye,
      bgGradient: "from-red-500 to-pink-600",
      description:
        "Specialized training in threat intelligence analysis, cyber threat hunting, and security intelligence",
    },
    {
      title: "GitHub Foundations",
      issuer: "GitHub",
      date: "2025",
      icon: GitBranch,
      bgGradient: "from-green-500 to-emerald-600",
      description:
        "Mastery of version control, collaborative development workflows, and open-source contribution practices",
    },
    {
      title: "Pre-Security Certificate",
      issuer: "TryHackMe",
      date: "2025",
      icon: Shield,
      bgGradient: "from-yellow-500 to-orange-600",
      description:
        "Foundational cybersecurity knowledge covering network security, web application security, and digital forensics",
    },
  ]

  return (
    <section
      id="certifications"
      className="relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-950 dark:to-gray-950"
    >
      <TerminalStrip label="[CERT.LOG] Certifications" meta="channel: training • integrity: high" />
      <div className="pointer-events-none absolute inset-0">
        <div className="subtle-grid" />
        <div className="orb bg-emerald-400/20 w-28 sm:w-40 h-28 sm:h-40 top-6 left-8" />
        <div className="orb bg-cyan-400/20 w-24 sm:w-36 h-24 sm:h-36 bottom-10 right-10" />
        <div className="orb bg-blue-400/20 w-20 sm:w-28 h-20 sm:h-28 top-1/2 left-1/3" />
      </div>

      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-6 mt-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 font-mono text-emerald-600 dark:text-emerald-400">
            Professional Certifications
          </h2>
          <div className="flex justify-center">
            <p className="typing font-mono text-emerald-500/90 text-xs sm:text-sm space-y-1">
              [LOAD] parsing credential store…
            </p>
          </div>
        </div>

        <div className="mt-4 sm:mt-6">
          <HorizontalSlider ariaLabel="Certifications slider">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="group relative snap-start min-w-[320px] sm:min-w-[420px] lg:min-w-[520px] max-w-[560px] bg-white/85 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 mr-3 shadow-xl hover:shadow-emerald-500/20 transform hover:-translate-y-3 transition-all duration-500 card-3d overflow-hidden holo"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cert.bgGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                <div className="scanlines pointer-events-none" />
                <div
                  className={`relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${cert.bgGradient} rounded-2xl flex items-center justify-center mb-5 transform group-hover:scale-110 transition-all duration-500 shadow-lg`}
                >
                  <cert.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-2 leading-tight">
                  {cert.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-1">{cert.issuer}</p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4">{cert.date}</p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {cert.description}
                </p>
              </div>
            ))}
          </HorizontalSlider>
        </div>
      </div>
    </section>
  )
}

// Achievements Section
function AchievementsSection() {
  const achievements = [
    {
      title: "Winner – MCA Eagles' CodeNest 2025",
      subtitle: "Top 3 in App Category",
      issuer: "Devpost",
      date: "Feb 2025",
      icon: Award,
      bgGradient: "from-yellow-500 to-orange-600",
      description:
        "Recognized for exceptional mobile application development skills and innovative problem-solving approach in a competitive coding environment.",
    },
    {
      title: "1st Position – Design Dojo Event",
      subtitle: "Sinusoid Fest Winner",
      issuer: "siNUsoid V8 - NIIT University",
      date: "2025",
      icon: Users,
      bgGradient: "from-green-500 to-emerald-600",
      description:
        "Demonstrated superior design thinking and creativity, leading to first place in a prestigious university-level design competition.",
    },
    {
      title: "Delhi Smart City Command Center",
      subtitle: "Smart City Dashboard Development",
      issuer: "Smart City Hackathon",
      date: "May 2025",
      icon: Building,
      bgGradient: "from-red-500 to-pink-600",
      description:
        "Developed a comprehensive smart city dashboard focused on Delhi, showcasing real-time and historical urban data to enhance city management and citizen engagement through interactive visualizations.",
    },
  ]

  return (
    <section
      id="achievements"
      className="relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950"
    >
      <TerminalStrip label="[ACHV.LOG] Achievements" meta="scope: impact • signal: strong" />
      <div className="pointer-events-none absolute inset-0">
        <div className="subtle-grid" />
        <div className="orb bg-pink-400/20 w-24 sm:w-36 h-24 sm:h-36 top-8 right-8" />
        <div className="orb bg-cyan-400/20 w-20 sm:w-28 h-20 sm:h-28 bottom-10 left-12" />
        <div className="orb bg-green-400/25 w-20 sm:w-36 h-20 sm:h-36 top-1/2 right-1/3" />
      </div>

      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-6 mt-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 font-mono text-cyan-600 dark:text-cyan-400">
            Key Achievements
          </h2>
          <div className="flex justify-center">
            <p className="typing font-mono text-emerald-500/90 text-xs sm:text-sm" style={{ animationDelay: "0.25s" }}>
              [OK] signals verified • rendering cards…
            </p>
          </div>
        </div>

        <div className="mt-4 sm:mt-6">
          <HorizontalSlider ariaLabel="Achievements slider">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="group relative snap-start min-w-[340px] sm:min-w-[460px] lg:min-w-[560px] max-w-[600px] bg-white/85 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-7 sm:p-9 mr-3 shadow-xl hover:shadow-emerald-500/20 transform hover:-translate-y-3 transition-all duration-500 card-3d overflow-hidden holo"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${achievement.bgGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                <div className="scanlines pointer-events-none" />
                <div
                  className={`relative w-16 h-16 sm:w-18 sm:h-18 bg-gradient-to-br ${achievement.bgGradient} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-all duration-500 shadow-lg`}
                >
                  <achievement.icon className="w-8 h-8 sm:w-9 sm:h-9 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  {achievement.title}
                </h3>
                <p className="text-base sm:text-lg text-purple-600 dark:text-purple-400 font-semibold mb-2">
                  {achievement.subtitle}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{achievement.issuer}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{achievement.date}</p>
                <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">{achievement.description}</p>
              </div>
            ))}
          </HorizontalSlider>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-blue-300" />
          <span className="ml-2 font-mono text-xs opacity-80">/dev/portfolio – link-layer</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/15 text-white font-bold flex items-center justify-center shadow-lg border border-white/20">
              PB
            </div>
            <span className="text-lg font-semibold">Parth Bhatt</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm/none opacity-90 mr-1">Connect:</span>
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

    const dissolveTimeout = setTimeout(() => setIntroDissolve(true), 5200)
    const introTimeout = setTimeout(() => setShowIntro(false), 6000)

    return () => {
      clearInterval(interval)
      clearTimeout(dissolveTimeout)
      clearTimeout(introTimeout)
    }
  }, [])

  return (
    <div className={`min-h-screen transition-colors duration-300 cursor-dollar ${isDark ? "dark" : ""}`}>
      {showIntro && (
        <div
          className={`fixed inset-0 z-[60] bg-black flex items-center justify-center overflow-hidden ${introDissolve ? "dissolve-out" : ""}`}
        >
          <div className="absolute inset-0 starfield"></div>
          <div className="absolute inset-0 starfield-2"></div>
          <div className="relative z-10 text-center animate-fade-in">
            <h1 className="">
              <NameDisplay glitch={false} />
            </h1>
            <div className="mt-4 text-emerald-300 font-mono text-xs sm:text-sm space-y-1">
              <p className="typing">[BOOT] Initializing systems…</p>
              <p className="typing" style={{ animationDelay: "0.6s" }}>
                [OK] Loading profile: Parth Bhatt<span className="caret">|</span>
              </p>
              <p className="typing" style={{ animationDelay: "1.2s" }}>
                [SCAN] skills: threat intel • appsec • hacking
              </p>
              <p className="typing typing-wide" style={{ animationDelay: "2.0s" }}>
                [CERT] cisco • arcX • tryhackme • github foundations
              </p>
              <p className="typing typing-wide" style={{ animationDelay: "3.0s" }}>
                [ACHV] codenest top 3 • design dojo winner • smart city viz
              </p>
              <p className="typing" style={{ animationDelay: "4.2s" }}>
                [WIT] curiosity-driven • reliable • security‑first
              </p>
              <p className="typing" style={{ animationDelay: "5.0s" }}>
                [READY] initiating secure portfolio launch…
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 px-4 sm:px-6 lg:px-8">
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

// Neutral Portfolio Hero Section
function HeroSection({
  isPitchOpen,
  setIsPitchOpen,
  setIsContactOpen,
}: { isPitchOpen: boolean; setIsPitchOpen: (open: boolean) => void; setIsContactOpen: (open: boolean) => void }) {
  return (
    <section className="relative min-h-[92vh] md:min-h-[105vh] lg:min-h-[115vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900 px-4 sm:px-6 lg:px-8">
      {/* Cyber background content */}
      <div className="absolute inset-0 pointer-events-none">
        {/* faint code snippets */}
        <div className="absolute inset-0 opacity-10 dark:opacity-10">
          <div className="absolute top-20 left-4 sm:left-10 text-sky-600 font-mono text-xs sm:text-sm animate-bounce">
            {"<Portfolio />"}
          </div>
          <div className="absolute top-40 right-4 sm:right-20 text-emerald-600 font-mono text-xs sm:text-sm animate-bounce delay-1000">
            {"function defend() { return true }"}
          </div>
          <div className="absolute bottom-40 left-4 sm:left-20 text-cyan-600 font-mono text-xs sm:text-sm animate-bounce delay-2000">
            {'const focus = ["Threat Intel","AppSec"]'}
          </div>
          <div className="absolute bottom-20 right-4 sm:right-10 text-blue-600 font-mono text-xs sm:text-sm animate-bounce delay-3000">
            {"// ship secure experiences"}
          </div>
        </div>
        {/* colorful soft orbs */}
        <div className="absolute top-1/4 left-1/5 w-24 sm:w-40 h-24 sm:h-40 bg-sky-400/25 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-2/3 right-1/4 w-28 sm:w-48 h-28 sm:h-48 bg-emerald-400/25 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-20 sm:w-36 h-20 sm:h-36 bg-cyan-400/25 rounded-full blur-2xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 right-1/3 w-24 sm:w-44 h-24 sm:h-44 bg-pink-400/20 rounded-full blur-2xl animate-pulse delay-3000"></div>
        {/* subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto">
        <div className="mb-6 flex justify-center">
          <img
            src="/parth-bhatt-portrait.png"
            alt="Parth Bhatt portrait"
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-emerald-400 shadow-[0_0_24px_rgba(16,185,129,0.35)]"
          />
        </div>

        <h1 className="mb-2">
          <NameDisplay />
        </h1>

        {/* Rotating line: role -> what I do -> quotes */}
        <div className="mb-6">
          <RotatingGlitchText
            items={[
              "Cyber Threat Intelligence Analyst",
              "Translating noise into signal • building secure tools",
              "“Security is a process, not a product.” — Schneier",
              "The Best Offense is the Best Defense",
              "Google Developer Certified",
              "Curiosity-driven. Reliable. Security-first.",
            ]}
          />
        </div>

        <div className="space-y-2 mb-8">
          <Typewriter
            text="[OPEN] handshake complete • secure session established"
            delay={200}
            speed={18}
            className="font-mono text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm"
          />
          <br />
          <Typewriter
            text="[FACT] tech-savvy • driven • can think quick on their feet • adaptable"
            delay={700}
            speed={18}
            className="font-mono text-cyan-600 dark:text-cyan-400 text-xs sm:text-sm"
          />
        </div>

        {/* ... existing chips if any ... */}

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="cyber-btn"
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

// About Section
function AboutSection() {
  return (
    <section id="about" className="relative py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 section-hover-tint">
      <TerminalStrip label="[ABOUT]" meta="whoami • profile" />
      <div className="container mx-auto max-w-5xl mt-6 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <img
            src="/parth-bhatt-portrait.png"
            alt="Parth Bhatt"
            className="w-40 h-40 rounded-2xl border border-emerald-400/60 shadow-[0_0_24px_rgba(16,185,129,0.25)] mx-auto md:mx-0"
          />
        </div>
        <div className="md:col-span-2">
          <h3 className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mb-2">About</h3>
          <p className="typing-wide font-mono text-emerald-500/90 text-xs sm:text-sm">
            [INFO] concise summary incoming…
          </p>
          <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            I’m Parth Bhatt, a cybersecurity enthusiast and B.Tech student from New Delhi who loves solving digital puzzles and outsmarting threats. Ever since I got my first computer at age 7, I’ve been fascinated by how systems work—and how to secure them.
          </p>
          <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            From ethical hacking to defensive security, I thrive on challenges that blend logic, strategy, and creativity. My goal? To turn passion into impact by protecting digital spaces and building smarter, safer systems.
          </p>
        </div>
      </div>
    </section>
  )
}

// Projects Section
function ProjectsSection() {
  const items = [
    {
      title: "Delhi Smart City Dashboard",
      tag: "Sustainable Development",
      img: "/smart-city-dashboard.png",
      description: "A real-time dashboard for Delhi's smart city initiative, visualizing urban data to improve city management and citizen engagement.",
      url: "https://delhi-smart-city.vercel.app/"
    },
    {
      title: "STEM Code Lab",
      tag: "Coding Simulations",
      img: "/threat-intel-parser.png",
      description: "An interactive platform for students to learn coding through hands-on simulations and challenges.",
      url: "https://stem-codelab.vercel.app/"
    },
    {
      title: "Eco Track",
      tag: "Environmental Monitoring",
      img: "/eco-track.png",
      description: "A tool for tracking and analyzing environmental data to promote sustainability and eco-friendly practices.",
      url: "https://eco-track-chi.vercel.app/"
    },
    {
      title: "AI-Based Camera",
      tag: "AI in Surveillance",
      img: "/ai-camera.png",
      description: "A smart surveillance system using AI to detect and alert on unusual activities in real-time.",
      url: "https://circuitech-ai-based-camera.vercel.app/main.html"
    },
    {
      title: "Machine Learning Model and Interpretations of Netflix dataset",
      tag: "Visualizations and Statistical summaries",
      img: "/ml-netflix.png",
      description: "Built and interpreted ML models on Netflix data, providing insights through visualizations and statistics.",
      url: "https://github.com/paarthbhatt/Netflix-data-files"
    },
    {
      title: "Netflix Clone",
      tag: "Web Development",
      img: "/netflix-clone.png",
      description: "A full-stack clone of Netflix with authentication, streaming UI, and personalized recommendations.",
      url: "https://netflix-clone-tau-black.vercel.app/"
    },
  ]
  return (
    <section
      id="projects"
      className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-950 dark:to-gray-950"
    >
      <TerminalStrip label="[PROJECTS]" meta="evidence • shipped" />
      <div className="container mx-auto max-w-7xl mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p, i) => (
          <a
            key={i}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white/85 dark:bg-gray-800/80 rounded-2xl p-4 shadow-xl holo card-3d cursor-pointer hover:shadow-emerald-500/20 transition-all duration-300"
          >
            <article>
              <img src={p.img || "/placeholder.svg"} alt={p.title} className="w-full h-40 object-cover rounded-xl mb-3" />
              <span className="inline-block px-2 py-1 text-xs font-mono bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 rounded">
                {p.tag}
              </span>
              <h4 className="mt-2 text-lg font-bold text-gray-800 dark:text-white">{p.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {p.description}
              </p>
            </article>
          </a>
        ))}
      </div>
    </section>
    
  )
}

// Experience Section
function ExperienceSection() {
  const items = [
    {
      role: "Tech Team Member",
      org: "Sinusoid",
      when: "August 2024",
      desc: "Helped in the creation phase of the website, helped in event competition, operations and technical support.",
    },
    {
      role: "Tech Team Member",
      org: "TEDxNIITUniversity",
      when: "February 2025",
      desc: "Designed webpages all part of the website and helped in operations and technical support.",
    },
    
    {
      role: "Web Developer Internship",
      org: "LaunchED Global",
      when: "April 2025",
      desc: "Built a commercial dashboard for anime website.",
    },
    {
      role: "Virtual Internship – Cybersecurity & AI",
      org: "NIIT Foundation",
      when: "July 2025",
      desc: "Completed 4-week virtual internship focused on Cybersecurity & Artificial Intelligence.",
    },
  ]
  return (
    <section id="experience" className="relative py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
      <TerminalStrip label="[EXPERIENCE]" meta="practice • learning" />
      <div className="container mx-auto max-w-5xl mt-6 space-y-6">
        {items.map((e, i) => (
          <div key={i} className="bg-white/85 dark:bg-gray-800/80 rounded-2xl p-5 shadow-lg holo">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="font-bold text-gray-800 dark:text-white">{e.role}</h4>
              <span className="text-emerald-600 dark:text-emerald-300 font-mono">• {e.org}</span>
              <span className="ml-auto text-xs font-mono text-gray-500 dark:text-gray-400">{e.when}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{e.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// Skills Section
function SkillsSection() {
  const skills = ["Threat Intel", "Cybersecurity", "Vulnerability Management", "Web Application Security", "Artificial Intelligence", "Github", 
    "Cloud Security", "Incident Response", "Linux", "Python", "DSA", "Collaboration", "Networking", "Cloud Computing", "Project Management",
  "OOPs", "AI tools & Frameworks", "Network Security", "Security Operations", "Cisco Packet Tracer", "Kali Linux", "OWASP"] 
  return (
    <section
      id="skills"
      className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-950 dark:to-gray-950"
    >
      <TerminalStrip label="[SKILLS]" meta="toolbox • evolving" />
      <div className="container mx-auto max-w-5xl mt-6">
        <div className="flex flex-wrap gap-3">
          {skills.map((s, i) => (
            <span
              key={i}
              className="px-3 py-2 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-mono text-sm holo"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
  return (
    <section id="contact" className="relative py-12 md:py-14 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
      <TerminalStrip label="[CONTACT]" meta="reach • collaborate" />
      <div className="container mx-auto max-w-3xl mt-6">
        <p className="typing font-mono text-emerald-500/90 text-xs sm:text-sm">[OPEN] contact channel ready…</p>

        <div className="mt-4 rounded-2xl bg-white dark:bg-gray-900 border border-emerald-500/20 p-5 md:p-6">
          <p className="text-sm text-gray-600 dark:text-gray-300">Availability</p>
          <p className="text-base text-gray-800 dark:text-white leading-relaxed mt-1">
            Open to internships & part-time remote roles (Cybersecurity, AI, Blockchain). I’m flexible for 
            collaborations, part-time work, and knowledge-sharing initiatives.
          </p>

          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">Location</p>
            <p className="text-base font-semibold text-gray-800 dark:text-white">New Delhi, INDIA</p>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">Open To</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                "Ethical Hacking",
                "Security Operations",
                "AI in Cybersecurity",
                "Blockchain / Web3 Integrations Security",
                "Hackathons & CTF Collaborations",
              ].map((chip) => (
                <span
                  key={chip}
                  className="px-3 py-1 rounded-md border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-mono text-xs"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Email</p>
              <a
                className="text-base font-semibold text-gray-800 dark:text-white"
                href="mailto:paarthbhatt37@gmail.com"
              >
                paarthbhatt37@gmail.com
              </a>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Phone</p>
              <a className="text-base font-semibold text-gray-800 dark:text-white" href="tel:+918920948990">
                +91 8920948990
              </a>
            </div>
          </div>

          <div className="mt-5">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/40 px-4 py-2 font-mono text-sm text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/10 transition-colors"
            >
              Resume
            </a>
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
