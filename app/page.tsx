"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { HackerBootSequence } from "@/components/HackerBootSequence"
import { HeroSection } from "@/components/HeroSection"
import { AboutSection } from "@/components/AboutSection"
import { ProjectsSection } from "@/components/ProjectsSection"
import { ExperienceSection } from "@/components/ExperienceSection"
import { SkillsSection } from "@/components/SkillsSection"
import { CertificationsSection } from "@/components/CertificationsSection"
import { AchievementsSection } from "@/components/AchievementsSection"
import { ContactSection } from "@/components/ContactSection"
import { ContactModal } from "@/components/ContactModal"
import { PitchModal } from "@/components/PitchModal"

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isPitchOpen, setIsPitchOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [introDissolve, setIntroDissolve] = useState(false)

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
            try {
              window.close()
              setTimeout(() => {
                try {
                  // @ts-ignore
                  window.open("", "_self")?.close()
                } catch {}
                window.location.href = "about:blank"
              }, 150)
            } catch {
              window.location.href = "about:blank"
            }
          }}
        />
      )}

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-950 px-4 sm:px-6 lg:px-8">
        <Header isContactOpen={isContactOpen} setIsContactOpen={setIsContactOpen} introDone={!showIntro} />
        <main className="pt-20 space-y-12 md:space-y-14">
          <HeroSection
            isPitchOpen={isPitchOpen}
            setIsPitchOpen={setIsPitchOpen}
            setIsContactOpen={setIsContactOpen}
          />
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
