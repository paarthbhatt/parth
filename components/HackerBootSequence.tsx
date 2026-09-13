"use client"

import { useState, useEffect } from "react"
import { useModalA11y } from "../hooks/useModalA11y"
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion"

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
] satisfies Array<{ delay: number; kind: "cmd" | "out"; text: string }>

export function HackerBootSequence({
  introDissolve,
  onProceed,
}: { introDissolve: boolean; onProceed: () => void }) {
  const [currentLine, setCurrentLine] = useState(0)
  const [glitchActive, setGlitchActive] = useState(false)
  const [codeFalls, setCodeFalls] = useState<Array<{ left: number; delay: number; duration: number; text: string }>>([])
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  const [awaitingInput, setAwaitingInput] = useState(false)

  const prefersReducedMotion = usePrefersReducedMotion()
  // The boot screen is a modal over the page: trap focus, close on Escape,
  // and lock background scroll while it's up.
  const dialogRef = useModalA11y(true, onProceed)

  useEffect(() => {
    if (prefersReducedMotion) {
      setCodeFalls([])
      return
    }

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
  }, [prefersReducedMotion])

  useEffect(() => {
    // Reduced motion: skip the staggered typing and show the whole log at once.
    if (prefersReducedMotion) {
      setCurrentLine(bootSequence.length - 1)
      setAwaitingInput(true)
      return
    }

    const timers: NodeJS.Timeout[] = []
    bootSequence.forEach((item, index) => {
      const timer = setTimeout(() => {
        setCurrentLine(index)
      }, item.delay)
      timers.push(timer)
    })
    const lastDelay = bootSequence[bootSequence.length - 1].delay
    const afterId = setTimeout(() => setAwaitingInput(true), lastDelay + 150)
    timers.push(afterId)
    return () => timers.forEach((timer) => clearTimeout(timer))
  }, [prefersReducedMotion])

  useEffect(() => {
    if (!awaitingInput) return
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (key === "y" || key === "enter") {
        onProceed()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [awaitingInput, onProceed])

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="boot-sequence-title"
      aria-describedby="boot-sequence-hint"
      className={`fixed inset-0 z-[60] bg-black flex items-center justify-center overflow-hidden ${introDissolve ? "dissolve-out" : ""}`}
    >
      <h2 id="boot-sequence-title" className="sr-only">
        Terminal boot sequence
      </h2>
      <p id="boot-sequence-hint" className="sr-only">
        Decorative intro animation. Press Y, Enter, or Escape to skip it and open the portfolio.
      </p>

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:20px_20px] motion-safe:animate-pulse"></div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
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

      <div className="relative z-10 w-full max-w-[95%] sm:max-w-4xl mx-2 sm:mx-4 bg-black border-2 border-emerald-500/50 rounded-lg shadow-[0_0_50px_rgba(16,185,129,0.5)] overflow-hidden">
        <div className="bg-emerald-500/10 border-b border-emerald-500/30 px-2 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1 sm:gap-2">
          <div className="flex gap-1 sm:gap-1.5">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-[10px] sm:text-xs font-mono text-emerald-400 ml-1 sm:ml-2 truncate">root@parth-bhatt:~</span>
          <button
            type="button"
            onClick={onProceed}
            className="ml-auto shrink-0 text-[10px] sm:text-xs font-mono text-emerald-300 hover:text-emerald-200 border border-emerald-500/40 rounded px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            SKIP INTRO »
          </button>
        </div>

        <div className="absolute inset-0 scanlines opacity-10 pointer-events-none" aria-hidden="true"></div>

        {showDisclaimer && (
          <div className="absolute top-12 right-2 sm:top-14 sm:right-3 z-20 max-w-[calc(100%-1rem)]">
            <div className="group relative rounded-lg border-2 border-emerald-500/50 bg-black/85 px-3 py-2 shadow-[0_0_20px_rgba(16,185,129,0.35)] backdrop-blur">
              <div className="absolute -inset-0.5 rounded-lg bg-[conic-gradient(from_180deg_at_50%_50%,rgba(16,185,129,0.2),rgba(6,212,212,0.2),rgba(59,130,246,0.2),rgba(16,185,129,0.2))] blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 flex items-start gap-2">
                <span className="text-[10px] sm:text-xs font-mono text-emerald-400 shrink-0">[NOTICE]</span>
                <span className="text-[10px] sm:text-xs font-mono text-emerald-200">
                  Press <span className="text-cyan-400 font-semibold">Y</span> to continue — buttons work on any device
                </span>
                <button
                  type="button"
                  aria-label="Dismiss notice"
                  className="-my-2 -mr-1 shrink-0 grid place-items-center w-11 h-11 text-emerald-400/90 hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                  onClick={() => setShowDisclaimer(false)}
                >
                  <span aria-hidden="true" className="text-sm leading-none">×</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="p-3 sm:p-4 md:p-6 font-mono text-[10px] sm:text-xs md:text-sm overflow-y-auto overflow-x-auto max-h-[75vh] sm:max-h-[70vh]">
          <div className={`mb-2 sm:mb-4 text-center ${glitchActive ? "motion-safe:animate-pulse" : ""}`} aria-hidden="true">
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
                      {index === currentLine && <span aria-hidden="true" className="motion-safe:animate-pulse text-emerald-500 inline-block ml-1">▊</span>}
                    </>
                  ) : (
                    <span className="pl-4 text-[10px] sm:text-xs text-emerald-400/80 block">{item.text}</span>
                  )}
                </div>
              )
            })}
          </div>

          {awaitingInput && (
            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-emerald-500/30 animate-fade-in">
              <div className="space-y-1 sm:space-y-1.5 text-[10px] sm:text-xs">
                <div className="text-emerald-400/80">status: OPERATIONAL</div>
                <div>
                  <span className="text-cyan-500">root@parth-bhatt:~$</span>{" "}
                  <span className="text-cyan-400">open portfolio? (y/n)</span>
                  <span aria-hidden="true" className="motion-safe:animate-pulse text-emerald-500 inline-block ml-1">▊</span>
                </div>
                <div className="text-emerald-400/90">press Y or Enter to continue — or tap SKIP INTRO</div>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onProceed}
                    className="min-h-11 px-4 py-2 rounded border border-emerald-500/60 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    Y / ENTER — open portfolio
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
