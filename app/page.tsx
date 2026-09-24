"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { HackerBootSequence } from "@/components/HackerBootSequence"
import { ScrollWorld } from "@/components/ScrollWorld"
import { HeroSection } from "@/components/HeroSection"
import { AboutSection } from "@/components/AboutSection"
import { ProjectsSection } from "@/components/ProjectsSection"
import { WriteupsSection } from "@/components/WriteupsSection"
import { ExperienceSection } from "@/components/ExperienceSection"
import { SkillsSection } from "@/components/SkillsSection"
import { CertificationsSection } from "@/components/CertificationsSection"
import { AchievementsSection } from "@/components/AchievementsSection"
import { ContactSection } from "@/components/ContactSection"
import { ContactModal } from "@/components/ContactModal"
import { PitchModal } from "@/components/PitchModal"

const BOOT_SEEN_KEY = "boot_seen"

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isPitchOpen, setIsPitchOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [worldDone, setWorldDone] = useState(false)

  // Don't replay the boot sequence for the rest of the session once it's been seen.
  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem(BOOT_SEEN_KEY) === "1"
    } catch {
      // storage unavailable (private mode, etc.) — just show the boot
    }
    if (seen) setShowIntro(false)
  }, [])

  // When the flight is skipped or already seen this session, jump straight
  // to the terminal so no scroll-through stands between the visitor and the
  // content.
  useEffect(() => {
    if (!worldDone) return
    document.getElementById("main-terminal")?.scrollIntoView({ behavior: "auto", block: "start" })
  }, [worldDone])

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

  // The boot sequence runs its own exit animation (CRT power-off) and calls
  // this at the black frame — unmount immediately so the site is revealed
  // without a visible seam.
  const proceedFromIntro = () => {
    try {
      sessionStorage.setItem(BOOT_SEEN_KEY, "1")
    } catch {
      // ignore — the boot will simply show again next session
    }
    setShowIntro(false)
  }

  return (
    <div className={`transition-colors duration-300 cursor-hacked ${isDark ? "dark" : ""}`}>
      {showIntro && <HackerBootSequence onProceed={proceedFromIntro} />}

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-950 px-4 sm:px-6 lg:px-8">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded focus:border-2 focus:border-emerald-400 focus:bg-black focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-emerald-300 focus:outline-none"
        >
          Skip to main content
        </a>
        <Header introDone={!showIntro} />

        {!worldDone && <ScrollWorld onEnterTerminal={() => setWorldDone(true)} />}

        <div id="main-terminal">
          <main id="main-content" className="pt-20 space-y-12 md:space-y-14">
            <HeroSection
              setIsPitchOpen={setIsPitchOpen}
              setIsContactOpen={setIsContactOpen}
            />
            <AboutSection />
            <ProjectsSection />
            <WriteupsSection />
            <ExperienceSection />
            <SkillsSection />
            <CertificationsSection />
            <AchievementsSection />
            <ContactSection />
          </main>
          <Footer introDone={!showIntro} />
        </div>

        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        <PitchModal isOpen={isPitchOpen} onClose={() => setIsPitchOpen(false)} />
      </div>
    </div>
  )
}
