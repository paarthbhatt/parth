"use client"

import { useState, useEffect, useRef } from "react"
import { useModalA11y } from "../hooks/useModalA11y"
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion"

const bootSequence = [
  { delay: 0, kind: "cmd", text: "whoami" },
  { delay: 150, kind: "out", text: "parth_bhatt" },
  { delay: 300, kind: "cmd", text: "hostname" },
  { delay: 450, kind: "out", text: "parth-bhatt.dev" },
  { delay: 600, kind: "cmd", text: "uname -srv" },
  { delay: 750, kind: "out", text: "Linux 6.x #1337 SMP x86_64" },
  { delay: 900, kind: "cmd", text: "ls modules" },
  { delay: 1050, kind: "out", text: "skills.sys  certs.sys  projects.sys" },
  { delay: 1200, kind: "cmd", text: "./scanner --capabilities --fast" },
  { delay: 1350, kind: "out", text: "capabilities: ThreatIntel ✓  Cybersecurity ✓  WebSec ✓" },
  { delay: 1550, kind: "cmd", text: "systemctl start portfolio.target" },
  { delay: 1750, kind: "out", text: "mounting world.......... [ OK ]" },
  { delay: 1950, kind: "out", text: "launching experience.... [ OK ]" },
] satisfies Array<{ delay: number; kind: "cmd" | "out"; text: string }>

const LAST_DELAY = bootSequence[bootSequence.length - 1].delay
/** Status line dwell, then the CRT power-off hands off to the live site. */
const LAUNCH_DELAY = LAST_DELAY + 400
const EXIT_DURATION = 650

export function HackerBootSequence({ onProceed }: { onProceed: () => void }) {
  const [currentLine, setCurrentLine] = useState(0)
  const [glitchActive, setGlitchActive] = useState(false)
  const [codeFalls, setCodeFalls] = useState<Array<{ left: number; delay: number; duration: number; text: string }>>([])
  const [launching, setLaunching] = useState(false)
  const [exiting, setExiting] = useState(false)
  const exitedRef = useRef(false)
  const onProceedRef = useRef(onProceed)

  useEffect(() => {
    onProceedRef.current = onProceed
  }, [onProceed])

  const prefersReducedMotion = usePrefersReducedMotion()

  /* Exit choreography: flip to the CRT power-off animation, then hand off to
     the live site at the black frame. Guarded so ESC and the auto-run timer
     can't both trigger it. */
  const beginExit = () => {
    if (exitedRef.current) return
    exitedRef.current = true
    setExiting(true)
    setTimeout(() => onProceedRef.current(), EXIT_DURATION)
  }

  // The boot screen is a modal over the page: trap focus, close on Escape
  // (routed through the animated exit), and lock background scroll while up.
  const dialogRef = useModalA11y(true, beginExit)

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

  /* Pure auto-run: lines play, status flips to LAUNCHING, CRT power-off, handoff. */
  useEffect(() => {
    if (prefersReducedMotion) {
      setCurrentLine(bootSequence.length - 1)
      const t = setTimeout(beginExit, 900)
      return () => clearTimeout(t)
    }

    const timers: ReturnType<typeof setTimeout>[] = []
    bootSequence.forEach((item, index) => {
      timers.push(setTimeout(() => setCurrentLine(index), item.delay))
    })
    timers.push(setTimeout(() => setLaunching(true), LAUNCH_DELAY))
    timers.push(setTimeout(beginExit, LAUNCH_DELAY + 400))
    return () => timers.forEach((timer) => clearTimeout(timer))
  }, [prefersReducedMotion])

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="boot-sequence-title"
      aria-describedby="boot-sequence-hint"
      onClick={beginExit}
      className={`fixed inset-0 z-[60] bg-black flex flex-col overflow-hidden ${exiting ? "boot-out" : ""}`}
    >
      <h2 id="boot-sequence-title" className="sr-only">
        Terminal boot sequence
      </h2>
      <p id="boot-sequence-hint" className="sr-only">
        Decorative intro animation. It plays automatically and opens the portfolio when it ends. Press Escape or click to skip.
      </p>

      {/* Backdrop: pulsing grid + matrix rain */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.04)_1px,transparent_1px)] bg-[size:20px_20px] motion-safe:animate-pulse"></div>
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {codeFalls.map((fall, i) => (
          <div
            key={i}
            className="absolute text-emerald-500/15 font-mono text-xs"
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

      {/* Fullscreen terminal */}
      <div className="relative z-10 flex-1 flex flex-col min-h-0">
        <div className="bg-emerald-500/10 border-b border-emerald-500/30 px-4 py-2 flex items-center gap-2 shrink-0">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-xs font-mono text-emerald-400 ml-2 truncate">root@parth-bhatt:~ — boot</span>
        </div>

        <div className="relative flex-1 min-h-0 px-4 sm:px-8 md:px-14 py-6 font-mono text-xs sm:text-sm md:text-base overflow-y-auto">
          <div className="absolute inset-0 scanlines opacity-10 pointer-events-none" aria-hidden="true"></div>

          <div className={`mb-6 text-center ${glitchActive ? "motion-safe:animate-pulse" : ""}`} aria-hidden="true">
            <pre className="hidden sm:block text-[7px] md:text-[9px] lg:text-[12px] text-emerald-500 dark:text-emerald-400 whitespace-pre overflow-x-auto">
              {`██████╗  █████╗ ██████╗ ████████╗██╗  ██╗    ██████╗ ██╗  ██╗ █████╗ ████████╗████████╗
██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██║  ██║    ██╔══██╗██║  ██║██╔══██╗╚══██╔══╝╚══██╔══╝
██████╔╝███████║██████╔╝   ██║   ███████║    ██████╔╝███████║███████║   ██║      ██║   
██╔═══╝ ██╔══██║██╔══██╗   ██║   ██╔══██║    ██╔══██╗██╔══██║██╔══██║   ██║      ██║   
██║     ██║  ██║██║  ██║   ██║   ██║  ██║    ██████╔╝██║  ██║██║  ██║   ██║      ██║   
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝      ╚═╝    `}
            </pre>
            <div className="block sm:hidden">
              <p className="font-mono text-xs text-emerald-400">[boot] Parth Bhatt Portfolio</p>
            </div>
          </div>

          <div className="space-y-1">
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
                      <span className="text-cyan-500 text-xs sm:text-sm">root@parth-bhatt:~$</span>{" "}
                      <span className="text-xs sm:text-sm text-cyan-400">{item.text}</span>
                      {index === currentLine && !launching && (
                        <span aria-hidden="true" className="motion-safe:animate-pulse text-emerald-500 inline-block ml-1">
                          ▊
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="pl-4 text-xs sm:text-sm text-emerald-400/80 block">{item.text}</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Fixed status footer — flips to LAUNCHING right before the handoff */}
        <div className="shrink-0 border-t border-emerald-500/30 bg-emerald-500/5 px-4 sm:px-8 py-3 flex items-center justify-between font-mono text-[10px] sm:text-xs">
          <span className={launching ? "text-cyan-300" : "text-emerald-400/80"}>
            {launching ? "status: ALL SYSTEMS OPERATIONAL — LAUNCHING…" : "status: boot in progress…"}
          </span>
          <span className="hidden sm:inline text-emerald-500/60">[ESC / click to skip]</span>
          <span aria-hidden="true" className={launching ? "text-cyan-300 motion-safe:animate-pulse" : "text-emerald-500"}>
            {launching ? "▮▮▮▮" : "▊"}
          </span>
        </div>
      </div>
    </div>
  )
}
