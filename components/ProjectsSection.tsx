"use client"

import { useState, useEffect } from "react"
import { TerminalStrip } from "./TerminalStrip"
import { ASCIIArt } from "./ASCIIArt"
import { securityProjectsData, collapsedProjectsData } from "../lib/data"
import { useScrollReveal } from "../hooks/useScrollReveal"

export function ProjectsSection() {
  const ref = useScrollReveal<HTMLElement>()

  const HackerProjectCard = ({ project, index }: { project: any; index: number }) => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
      const timer = setTimeout(() => setIsVisible(true), index * 100)
      return () => clearTimeout(timer)
    }, [index])

    return (
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`block relative bg-black border-2 border-emerald-500/30 rounded-lg p-3 sm:p-4 shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer hover:border-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300 overflow-hidden group ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <div className="absolute inset-0 scanlines opacity-30 pointer-events-none"></div>

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
            className="w-full h-36 object-cover rounded border border-emerald-500/20 mb-3 group-hover:border-emerald-500/50 transition-colors"
          />

          <h4 className="text-base font-bold font-mono text-emerald-400 mb-2 group-hover:text-emerald-300 transition-colors">
            {project.title}
          </h4>

          <p className="text-xs text-gray-400 font-mono leading-relaxed">
            {project.description}
          </p>

          <div className="mt-4 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-emerald-500 animate-pulse">&gt;</span>
              <span className="text-gray-400 group-hover:text-emerald-300 transition-colors">Launch Target</span>
            </div>
            <span className="text-emerald-500 group-hover:translate-x-1 transition-transform inline-block">→</span>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      </a>
    )
  }

  return (
    <section
      ref={ref}
      id="projects"
      className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-black to-slate-950 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent"></div>
      </div>

      <TerminalStrip label="[PROJECTS.EXE]" meta="scanning • security & AI architecture targets" />

      <div className="container mx-auto max-w-7xl mt-6 space-y-8 relative z-10">
        <div className="text-center mb-8">
          <ASCIIArt
            text="╔═══════════════════════════════════════════════════════════════╗\n║                                                                       ║\n║     ██████╗ ██████╗  ██████╗      ██╗███████╗ ██████╗████████╗     ║\n║     ██╔══██╗██╔══██╗██╔═══██╗     ██║██╔════╝██╔════╝╚══██╔══╝     ║\n║     ██████╔╝██████╔╝██║   ██║     ██║█████╗  ██║        ██║        ║\n║     ██╔═══╝ ██╔══██╗██║   ██║██   ██║██╔══╝  ██║        ██║        ║\n║     ██║     ██║  ██║╚██████╔╝╚█████╔╝███████╗╚██████╗   ██║        ║\n║     ╚═╝     ╚═╝  ╚═╝ ╚═════╝  ╚════╝ ╚══════╝ ╚═════╝   ╚═╝        ║\n║                                                                       ║\n╚═══════════════════════════════════════════════════════════════╝"
            delay={500}
          />
        </div>

        {/* Header Label */}
        <div className="scroll-reveal flex items-center justify-between mb-4 border-b border-emerald-500/20 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <h3 className="text-base sm:text-lg font-mono text-emerald-400 font-bold">$ ./projects --featured-security</h3>
          </div>
          <span className="text-xs font-mono text-emerald-500/70">[{securityProjectsData.length} ACTIVE TARGETS]</span>
        </div>

        {/* Featured Security & AI Agent Grid */}
        <div className="scroll-reveal delay-1">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {securityProjectsData.map((project, i) => (
              <HackerProjectCard key={`security-${i}`} project={project} index={i} />
            ))}
          </div>
        </div>

        {/* Collapsed Secondary / Web & Research Projects */}
        <div className="scroll-reveal delay-2 mt-8 sm:mt-12 bg-black border border-emerald-500/20 rounded-lg p-4 sm:p-6 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
          <div className="flex items-center justify-between mb-4 border-b border-emerald-500/20 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500/70 rounded-full"></span>
              <h4 className="text-xs sm:text-sm font-mono text-emerald-400 font-semibold">[SECONDARY_REPOS_AND_OTHER_BUILDS]</h4>
            </div>
            <span className="text-[10px] sm:text-xs font-mono text-emerald-500/50">hyperlinks active</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
            {collapsedProjectsData.map((project, i) => (
              <a
                key={i}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col p-2.5 rounded border border-emerald-500/25 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-emerald-500/70 group-hover:text-emerald-400 transition-colors">
                    [{project.tag}]
                  </span>
                  <span className="text-emerald-500/50 group-hover:translate-x-0.5 transition-transform text-xs">↗</span>
                </div>
                <span className="font-mono text-xs text-emerald-300 group-hover:text-white font-medium truncate">
                  {project.title}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-xs font-mono text-emerald-500/50">
            [*] Total targets tracked: {securityProjectsData.length + collapsedProjectsData.length} | Status: ✓ ONLINE
          </p>
        </div>
      </div>
    </section>
  )
}
