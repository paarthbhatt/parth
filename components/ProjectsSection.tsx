"use client"

import { useState, useEffect } from "react"
import { TerminalStrip } from "./TerminalStrip"
import { ASCIIArt } from "./ASCIIArt"
import { securityProjectsData, webProjectsData, otherProjectsData } from "../lib/data"
import { useScrollReveal } from "../hooks/useScrollReveal"

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<"security" | "web" | "other">("security")
  const [isHacking, setIsHacking] = useState(false)
  const ref = useScrollReveal<HTMLElement>()

  const HackerProjectCard = ({ project, index }: { project: any; index: number }) => {
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
            className="w-full h-32 object-cover rounded border border-emerald-500/20 mb-3"
          />

          <h4 className="text-base font-bold font-mono text-emerald-400 mb-2 group-hover:text-emerald-300 transition-colors">
            {project.title}
          </h4>

          <p className="text-xs text-gray-400 font-mono leading-relaxed">
            {project.description}
          </p>

          <div className="mt-4 flex items-center gap-2 text-xs font-mono">
            <span className="text-emerald-500 animate-pulse">&gt;</span>
            <span className="text-gray-500">Access target</span>
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

      <TerminalStrip label="[PROJECTS.EXE]" meta="scanning • targets acquired" />

      <div className="container mx-auto max-w-7xl mt-6 space-y-8 relative z-10">
        <div className="text-center mb-8">
          <ASCIIArt
            text="╔═══════════════════════════════════════════════════════════════╗\n║                                                                       ║\n║     ██████╗ ██████╗  ██████╗      ██╗███████╗ ██████╗████████╗     ║\n║     ██╔══██╗██╔══██╗██╔═══██╗     ██║██╔════╝██╔════╝╚══██╔══╝     ║\n║     ██████╔╝██████╔╝██║   ██║     ██║█████╗  ██║        ██║        ║\n║     ██╔═══╝ ██╔══██╗██║   ██║██   ██║██╔══╝  ██║        ██║        ║\n║     ██║     ██║  ██║╚██████╔╝╚█████╔╝███████╗╚██████╗   ██║        ║\n║     ╚═╝     ╚═╝  ╚═╝ ╚═════╝  ╚════╝ ╚══════╝ ╚═════╝   ╚═╝        ║\n║                                                                       ║\n╚═══════════════════════════════════════════════════════════════╝"
            delay={500}
          />
        </div>

        <div className="scroll-reveal flex flex-wrap justify-center gap-4 mb-8">
          {[
            { id: "security" as const, label: "SECURITY.EXE", count: securityProjectsData.length },
            { id: "web" as const, label: "WEB_APP.BIN", count: webProjectsData.length },
            { id: "other" as const, label: "OTHER.DATA", count: otherProjectsData.length },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setIsHacking(true)
                setTimeout(() => setIsHacking(false), 500)
                setSelectedCategory(cat.id)
              }}
              className={`relative px-6 py-3 font-mono text-sm border-2 transition-all duration-300 ${selectedCategory === cat.id
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

        <div className={`scroll-reveal delay-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 transition-all duration-500 ${isHacking ? "blur-sm" : ""}`}>
          {selectedCategory === "security" &&
            securityProjectsData.map((project, i) => (
              <HackerProjectCard key={i} project={project} index={i} />
            ))}
          {selectedCategory === "web" &&
            webProjectsData.map((project, i) => (
              <HackerProjectCard key={i} project={project} index={i} />
            ))}
          {selectedCategory === "other" &&
            otherProjectsData.map((project, i) => (
              <HackerProjectCard key={i} project={project} index={i} />
            ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-xs font-mono text-emerald-500/50">
            [*] Targets scanned: {securityProjectsData.length + webProjectsData.length + otherProjectsData.length} | Status: ✓ ONLINE
          </p>
        </div>
      </div>
    </section>
  )
}
