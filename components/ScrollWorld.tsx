"use client"

import dynamic from "next/dynamic"
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import { NameDisplay } from "./NameDisplay"
import { achievementsData } from "../lib/data"
import { WORLD_PROGRESS } from "./worldProgress"

/* The 3D flight is client-only and code-split: visitors who skip the world
   (or return for a second look) never download the WebGL bundle. */
const ScrollWorldScene = dynamic(
  () => import("./ScrollWorldScene").then((m) => m.ScrollWorldScene),
  { ssr: false }
)

/* ───────────────────────────────────────────────
   World definition — one scene per portfolio stop.
   ─────────────────────────────────────────────── */

type WorldScene = {
  id: string
  name: string
  sys: string
  status: string
  label: string
}

const SCENES: WorldScene[] = [
  { id: "boot", name: "ORIGIN", sys: "SYS.BOOT", status: "IDENTITY CONFIRMED", label: "Identity" },
  { id: "experience", name: "SUBROUTINE", sys: "OPS.HISTORY", status: "TIMELINE LOADED", label: "Experience" },
  { id: "projects", name: "ARSENAL", sys: "BUILD.DECK", status: "9 MODULES ARMED", label: "Projects" },
  { id: "writeups", name: "SIGNALS", sys: "INTEL.FEED", status: "3 REPORTS INDEXED", label: "Write-ups" },
  { id: "skills", name: "STACK", sys: "CAP.MATRIX", status: "21 SKILLS MAPPED", label: "Skills" },
  { id: "certifications", name: "VAULT", sys: "CRED.STORE", status: "7 CREDENTIALS VERIFIED", label: "Credentials" },
  { id: "achievements", name: "TROPHY", sys: "WIN.LOG", status: "9 UNLOCKS", label: "Trophies" },
  { id: "contact", name: "UPLINK", sys: "COMMS.OPEN", status: "CHANNEL READY", label: "Contact" },
]

/** Same gating as the 3D scene — kept local so the bundle stays split. */
function isStaticMode(): boolean {
  if (typeof window === "undefined") return true
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true
  if (window.matchMedia("(hover: none), (max-width: 767px)").matches) return true
  return false
}

/** Cheap probe — false on machines with GPU acceleration disabled. */
function webglAvailable(): boolean {
  try {
    const c = document.createElement("canvas")
    return !!(c.getContext("webgl2") || c.getContext("webgl"))
  } catch {
    return false
  }
}

/** If the WebGL context dies mid-session, swap to the CSS sky instead of crashing. */
class Scene3DBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(err: unknown) {
    console.warn("[scroll-world] 3D scene unavailable, using CSS sky:", err)
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

/** HUD chip — the chrome shared by every scene panel. */
function SceneHud({ scene }: { scene: WorldScene }) {
  return (
    <div className="sw-hud">
      <span className="sw-hud-dot" aria-hidden="true" />
      <span className="sw-hud-sys">{scene.sys}</span>
      <span className="sw-hud-sep" aria-hidden="true">{"//"}</span>
      <span className="sw-hud-name">{scene.name}</span>
      <span className="sw-hud-status">{scene.status}</span>
    </div>
  )
}

/** Large cyan side numeral with a label column underneath. */
function SceneGiant({ scene, index }: { scene: WorldScene; index: number }) {
  return (
    <div className="sw-giant" aria-hidden="true">
      <span className="sw-giant-num">{String(index + 1).padStart(2, "0")}</span>
      <span className="sw-giant-label">{scene.label}</span>
    </div>
  )
}

/* ── Scene panels (HTML layer floating over the 3D flight) ── */

function BootScene() {
  return (
    <div className="sw-panel sw-boot">
      <SceneHud scene={SCENES[0]} />
      <h1 className="sw-boot-name">
        <NameDisplay glitch={false} />
      </h1>
      <p className="sw-boot-role">SECURITY ARCHITECT × AI SAFETY ENGINEER</p>
      <p className="sw-boot-sub">
        Ex-DRDO (SAG) · CAISO · CAIT · CATP · arcX · 4× Hackathon Winner · Top 6% TryHackMe
      </p>
      <p className="sw-boot-hint">scroll to fly ↓</p>
    </div>
  )
}

function ExperienceScene() {
  return (
    <div className="sw-panel">
      <SceneHud scene={SCENES[1]} />
      <SceneGiant scene={SCENES[1]} index={1} />
      <div className="sw-card">
        <p className="sw-card-eyebrow">OPS.HISTORY · 01</p>
        <h2 className="sw-card-title">Cyber Security Intern — DRDO (SAG)</h2>
        <p className="sw-card-when">Jun 2026 – Jul 2026 · Ministry of Defence, Govt. of India</p>
        <p className="sw-card-body">
          Whitebox &amp; blackbox web-app penetration testing for SAG division — vulnerabilities
          found, PoC exploits executed.
        </p>
      </div>
      <div className="sw-row">
        <div className="sw-chip">
          <span className="sw-chip-key">Cisco × NIIT</span>
          <span className="sw-chip-val">Cybersecurity &amp; AI Intern · 2025</span>
        </div>
        <div className="sw-chip">
          <span className="sw-chip-key">LaunchED Global</span>
          <span className="sw-chip-val">Web Developer Intern · 2025</span>
        </div>
        <div className="sw-chip">
          <span className="sw-chip-key">TEDxNIITUniversity</span>
          <span className="sw-chip-val">Technical Team · 2024–25</span>
        </div>
      </div>
      <p className="sw-link-hint">
        full timeline in the terminal below <span aria-hidden="true">↓</span>
      </p>
    </div>
  )
}

function ProjectsScene() {
  return (
    <div className="sw-panel">
      <SceneHud scene={SCENES[2]} />
      <SceneGiant scene={SCENES[2]} index={2} />
      <div className="sw-card">
        <p className="sw-card-eyebrow">BUILD.DECK · FLAGSHIP</p>
        <h2 className="sw-card-title">Entropy Firewall</h2>
        <p className="sw-card-when">AI Security &amp; Firewall</p>
        <p className="sw-card-body">
          Proactive LLM firewall defending autonomous AI agents against prompt injection and
          execution exploits.
        </p>
        <a
          className="sw-cta"
          href="https://github.com/paarthbhatt/entropy-firewall"
          target="_blank"
          rel="noopener noreferrer"
        >
          [OPEN_REPOSITORY]
        </a>
      </div>
      <div className="sw-row">
        {[
          ["Robin Security Agent", "Autonomous AI Agent"],
          ["Atreides Framework", "AI Agent Architecture"],
          ["Guardiant Security", "AppSec & Active Shield"],
          ["Batcomputer", "Security Command Center"],
        ].map(([title, tag]) => (
          <div key={title} className="sw-chip">
            <span className="sw-chip-key">{title}</span>
            <span className="sw-chip-val">{tag}</span>
          </div>
        ))}
      </div>
      <p className="sw-link-hint">
        all 9 modules in the terminal below <span aria-hidden="true">↓</span>
      </p>
    </div>
  )
}

function WriteupsScene() {
  return (
    <div className="sw-panel">
      <SceneHud scene={SCENES[3]} />
      <SceneGiant scene={SCENES[3]} index={3} />
      <div className="sw-card">
        <p className="sw-card-eyebrow">INTEL.FEED · RESEARCH</p>
        <h2 className="sw-card-title">AI Agent Exploitation — HackTheAgent</h2>
        <p className="sw-card-body">
          Broke into a hackable AI ticketing agent — secrets, refunds and the internet behind one
          polite prompt. Every exploit traced back to trusting unverified input.
        </p>
        <a
          className="sw-cta"
          href="https://medium.com/@paarthbhatt37/i-broke-into-an-ai-employees-brain-here-s-what-it-told-me-9d3973785638"
          target="_blank"
          rel="noopener noreferrer"
        >
          [READ_WRITEUP]
        </a>
      </div>
      <div className="sw-row">
        <div className="sw-chip">
          <span className="sw-chip-key">John the Ripper</span>
          <span className="sw-chip-val">THM Hash-Cracking Walkthrough</span>
        </div>
        <div className="sw-chip">
          <span className="sw-chip-key">&quot;The Game&quot; CTF</span>
          <span className="sw-chip-val">Godot Reverse Engineering</span>
        </div>
      </div>
      <p className="sw-link-hint">
        full intel feed in the terminal below <span aria-hidden="true">↓</span>
      </p>
    </div>
  )
}

function SkillsScene() {
  const core = [
    "Threat Intelligence",
    "Vulnerability Management",
    "Incident Response",
    "Web App Security",
    "AI & LLM Security",
    "Network Security",
    "Cloud Security",
    "DevSecOps",
  ]
  return (
    <div className="sw-panel">
      <SceneHud scene={SCENES[4]} />
      <SceneGiant scene={SCENES[4]} index={4} />
      <div className="sw-card">
        <p className="sw-card-eyebrow">CAP.MATRIX · CORE</p>
        <h2 className="sw-card-title">Offense informs defense.</h2>
        <p className="sw-card-body">
          Eight load-bearing skills from a 21-skill stack — offensive testing, defensive operations
          and AI-safety engineering in one loop.
        </p>
      </div>
      <div className="sw-tagwrap">
        {core.map((s) => (
          <span key={s} className="sw-tag">
            {s}
          </span>
        ))}
      </div>
      <p className="sw-link-hint">
        full stack in the terminal below <span aria-hidden="true">↓</span>
      </p>
    </div>
  )
}

function CertificationsScene() {
  return (
    <div className="sw-panel">
      <SceneHud scene={SCENES[5]} />
      <SceneGiant scene={SCENES[5]} index={5} />
      <div className="sw-card">
        <p className="sw-card-eyebrow">CRED.STORE · VERIFIED</p>
        <h2 className="sw-card-title">Certified against the AI threat surface.</h2>
        <p className="sw-card-body">
          CAISO · CAIT · CATP — the CISO Network AI-security ladder, plus arcX threat-intel and
          GitHub Foundations.
        </p>
      </div>
      <div className="sw-tagwrap">
        {[
          "CAISO — Certified AI Security Officer",
          "CAIT — Certified AI Threat Hunter",
          "CATP — Certified AI Trust Practitioner",
          "arcX Threat Intel Analyst",
          "GitHub Foundations",
          "Cisco Junior Analyst",
        ].map((c) => (
          <span key={c} className="sw-tag">
            ✓ {c}
          </span>
        ))}
      </div>
      <p className="sw-link-hint">
        every credential in the terminal below <span aria-hidden="true">↓</span>
      </p>
    </div>
  )
}

function AchievementsScene() {
  const trophies = achievementsData.filter((a) => !("badge" in a))
  const certs = achievementsData.filter((a) => "badge" in a)
  return (
    <div className="sw-panel">
      <SceneHud scene={SCENES[6]} />
      <SceneGiant scene={SCENES[6]} index={6} />
      <div className="sw-card">
        <p className="sw-card-eyebrow">WIN.LOG · UNLOCKED</p>
        <h2 className="sw-card-title">
          {trophies.length} trophies. {certs.length} certifications.
        </h2>
        <p className="sw-card-body">
          GDG Cloud HackFest 2.0 — 2nd place, $850. CodeNest winner. siNUsoid design + vibe-code
          wins. Certified AI security officer on top.
        </p>
      </div>
      <div className="sw-row">
        {trophies.slice(0, 3).map((t) => (
          <div key={t.title} className="sw-chip">
            <span className="sw-chip-key">🏆 {t.title.replace(/^[^\w]+/, "")}</span>
            <span className="sw-chip-val">{t.issuer}</span>
          </div>
        ))}
      </div>
      <p className="sw-link-hint">
        full trophy log in the terminal below <span aria-hidden="true">↓</span>
      </p>
    </div>
  )
}

function ContactScene() {
  return (
    <div className="sw-panel">
      <SceneHud scene={SCENES[7]} />
      <SceneGiant scene={SCENES[7]} index={7} />
      <div className="sw-card sw-card-final">
        <p className="sw-card-eyebrow">COMMS.OPEN · UPLINK</p>
        <h2 className="sw-card-title">Channel open.</h2>
        <p className="sw-card-body">
          New Delhi · available for immediate start. Hire me, read my pitch, or grab the résumé —
          the full terminal is one scroll away.
        </p>
        <div className="sw-cta-row">
          <a className="sw-cta" href="#contact">
            [OPEN_UPLINK]
          </a>
          <a className="sw-cta sw-cta-ghost" href="/Parth_Resume.pdf" target="_blank" rel="noopener noreferrer">
            [RÉSUMÉ]
          </a>
        </div>
      </div>
      <p className="sw-link-hint">
        <span aria-hidden="true">↓</span> enter the terminal for the full dossier
      </p>
    </div>
  )
}

const PANELS = [
  BootScene,
  ExperienceScene,
  ProjectsScene,
  WriteupsScene,
  SkillsScene,
  CertificationsScene,
  AchievementsScene,
  ContactScene,
]

/* ───────────────────────────────────────────────
   ScrollWorld — pinned 3D flight + STICKY panels.
   Each scene is a full-viewport segment whose inner
   block is position: sticky, top: 0 — so the text
   holds dead-center while you scroll through it.
   Lenis smooths the whole page into one flow and a
   light wheel-snap settles on the nearest scene.
   ─────────────────────────────────────────────── */

type LenisLike = {
  raf: (t: number) => void
  destroy: () => void
  scrollTo: (target: number | HTMLElement, opts?: { offset?: number; duration?: number }) => void
}

export function ScrollWorld({ onEnterTerminal }: { onEnterTerminal: () => void }) {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const progressFillRef = useRef<HTMLDivElement | null>(null)
  const lenisRef = useRef<LenisLike | null>(null)
  const [active, setActive] = useState(0)
  const [offstage, setOffstage] = useState(false)
  const offstageRef = useRef(false)
  const snapLockUntil = useRef(0)
  const scenesLen = SCENES.length

  /* Skip / revisit: sessionStorage flag — SKIP lands at the terminal now
     and on every later visit this session. */
  const [skipWorld, setSkipWorld] = useState(false)
  const [staticMode, setStaticMode] = useState(true)
  const [use3D, setUse3D] = useState(false)
  useEffect(() => {
    setStaticMode(isStaticMode())
    setUse3D(!isStaticMode() && webglAvailable())
    try {
      if (sessionStorage.getItem("sw_seen") === "1") setSkipWorld(true)
    } catch {
      /* storage unavailable — play the world */
    }
  }, [])

  const enterTerminal = useCallback(() => {
    try {
      sessionStorage.setItem("sw_seen", "1")
    } catch {
      /* ignore */
    }
    setSkipWorld(true)
    onEnterTerminal()
  }, [onEnterTerminal])

  /* ESC skips the flight, as promised by the HUD chip. */
  useEffect(() => {
    if (skipWorld || staticMode) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") enterTerminal()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [skipWorld, staticMode, enterTerminal])

  /* Once the world scrolls out of view (terminal territory), pause the
     flight loop and drop the fixed HUD layers. */
  useEffect(() => {
    if (skipWorld) return
    const wrap = wrapRef.current
    if (!wrap) return
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? true
        offstageRef.current = !visible
        setOffstage(!visible)
      },
      { threshold: 0 }
    )
    io.observe(wrap)
    return () => io.disconnect()
  }, [skipWorld])

  /* Lenis smooth scrolling — one buttery, inertial flow across the whole page.
     Also routes in-page anchor links through lenis.scrollTo so jumps are
     animated consistently. Disabled for static mode (touch / reduced-motion
     keep native behavior). */
  useEffect(() => {
    if (skipWorld || staticMode) return
    let cancelled = false
    let raf = 0
    const onDocClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return
      const target = e.target as HTMLElement | null
      const a = target?.closest?.('a[href^="#"]')
      if (!a) return
      const href = a.getAttribute("href") || ""
      if (href === "#") return
      const el = document.getElementById(href.slice(1))
      if (!el) return
      e.preventDefault()
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: -64, duration: 1.2 })
      } else {
        el.scrollIntoView({ behavior: "smooth" })
      }
      history.replaceState(null, "", href)
    }
    document.addEventListener("click", onDocClick)
    import("lenis")
      .then(({ default: Lenis }) => {
        if (cancelled) return
        const lenis: LenisLike = new Lenis({
          duration: 1.15,
          easing: (t: number) => 1 - Math.pow(1 - t, 3),
          wheelMultiplier: 0.95,
          touchMultiplier: 1.4,
        })
        lenisRef.current = lenis
        document.documentElement.classList.add("lenis-on")
        const loop = (time: number) => {
          lenisRef.current?.raf(time)
          raf = requestAnimationFrame(loop)
        }
        raf = requestAnimationFrame(loop)
      })
      .catch(() => {
        /* lenis failed to load — native scrolling still works */
      })
    return () => {
      cancelled = true
      document.removeEventListener("click", onDocClick)
      cancelAnimationFrame(raf)
      lenisRef.current?.destroy()
      lenisRef.current = null
      document.documentElement.classList.remove("lenis-on")
    }
  }, [skipWorld, staticMode])

  /* Scroll driver: one rAF writes the shared 3D progress, the active scene
     and a light wheel-snap that settles on the nearest scene. */
  useEffect(() => {
    if (skipWorld) return
    const wrap = wrapRef.current
    if (!wrap) return

    WORLD_PROGRESS.p = 0

    const n = scenesLen

    let raf = 0
    const update = () => {
      raf = 0
      if (offstageRef.current) return
      const rect = wrap.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0

      WORLD_PROGRESS.p = p
      /* Progress bar is written straight to the DOM — no per-frame React
         re-render. React state only changes when the active scene flips. */
      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${p * 100}%`
      }
      const a = Math.min(n - 1, Math.floor(p * n))
      setActive(a)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()

    /* Wheel-snap: while a wheel gesture is settling (no new wheel events for
       ~140 ms), glide to the nearest scene center so the panel and its
       diorama always end up perfectly framed. Keyboard, scrollbar and touch
       scrolling stay free. */
    let snapTimer: ReturnType<typeof setTimeout> | null = null
    let snapping = false
    const snapTo = (target: number) => {
      if (Math.abs(target - window.scrollY) < 4) return
      snapping = true
      /* Route the glide through Lenis when it's driving the page — a native
         smooth scrollTo would fight Lenis' rAF loop and stutter. */
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { duration: 0.9 })
      } else {
        window.scrollTo({ top: target, behavior: "smooth" })
      }
      snapLockUntil.current = Date.now() + 800
      window.setTimeout(() => {
        snapping = false
      }, 800)
    }
    const onWheel = () => {
      if (Date.now() < snapLockUntil.current || snapping) return
      if (snapTimer) clearTimeout(snapTimer)
      snapTimer = setTimeout(() => {
        snapTimer = null
        if (offstageRef.current) return
        const rect = wrap.getBoundingClientRect()
        const total = rect.height - window.innerHeight
        if (total <= 0) return
        const p = Math.min(1, Math.max(0, -rect.top / total))
        /* Land at the center of the scene window that holds the scroll:
           scene i's panel is pinned for p·n ∈ [i, i+1), so its sweet spot
           is i + 0.5 — dead-center of the sticky window. */
        const center = Math.floor(p * n) + 0.5
        snapTo((center / n) * total)
      }, 140)
    }
    window.addEventListener("wheel", onWheel, { passive: true })
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (snapTimer) clearTimeout(snapTimer)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [skipWorld, scenesLen])

  const currentScene = SCENES[skipWorld ? 0 : active]

  /* Revisit / skip: compact hand-off card with a static hero diorama. */
  if (skipWorld) {
    return (
      <div className="sw-static" id="scroll-world">
        <div className="sw-static-card">
          <div className="sw-static-stage" aria-hidden="true">
            <Scene3DBoundary fallback={<div className="sw-sky-fallback" />}>
              <ScrollWorldScene skip />
            </Scene3DBoundary>
          </div>
          <div className="sw-static-inner">
            <p className="sw-static-sys">{"// SCROLL WORLD cached — skipped"}</p>
            <h2 className="sw-static-title">Terminal session resumed</h2>
            <p className="sw-static-sub">
              The flight replays on a fresh session. The full dossier is right below.
            </p>
            <div className="sw-cta-row">
              <a className="sw-cta" href="#main-terminal">
                [RESUME_SESSION ↓]
              </a>
              <button
                type="button"
                className="sw-cta sw-cta-ghost"
                onClick={() => {
                  try {
                    sessionStorage.removeItem("sw_seen")
                  } catch {
                    /* ignore */
                  }
                  window.scrollTo({ top: 0 })
                  setSkipWorld(false)
                }}
              >
                [REPLAY_WORLD]
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={wrapRef}
      className={`sw-wrap ${offstage ? "sw-offstage" : ""}`}
      id="scroll-world"
    >
      {/* Fixed 3D flight behind everything (CSS sky when WebGL is unavailable) */}
      <div className={`sw-stage ${offstage ? "sw-stage-paused" : ""}`} aria-hidden="true">
        {use3D ? (
          <Scene3DBoundary fallback={<div className="sw-sky-fallback" />}>
            <ScrollWorldScene skip={false} paused={offstage} />
          </Scene3DBoundary>
        ) : (
          <div className="sw-sky-fallback" />
        )}
        {/* Cinematic dressing: corner vignette + faint CRT scanlines over the flight */}
        <div className="sw-stage-vignette" />
        <div className="sw-stage-scanlines" />
      </div>

      {/* Fixed HUD chrome */}
      <div className="sw-chrome" aria-hidden="true">
        <div className="sw-chrome-top">
          <span className="sw-chrome-brand">PB://WORLD.SCAN</span>
          <button type="button" className="sw-skip" onClick={enterTerminal}>
            SKIP_FLIGHT [ESC]
          </button>
        </div>
        <div className="sw-progress">
          <div ref={progressFillRef} className="sw-progress-fill" style={{ width: "0%" }} />
        </div>
      </div>

      {/* Scene track — each segment is 100vh; its sticky inner panel holds
          dead-center while the segment scrolls past. Fades are pure CSS,
          driven by the .sw-seg-active flag. */}
      <div className="sw-track" role="list">
        {SCENES.map((scene, index) => {
          const Panel = PANELS[index]
          return (
            <div
              key={scene.id}
              role="listitem"
              className={`sw-seg ${index === active ? "sw-seg-active" : ""}`}
              data-scene={scene.id}
              style={{ zIndex: index === active ? 2 : 1 }}
            >
              <div className="sw-seg-inner">
                <Panel />
              </div>
            </div>
          )
        })}
      </div>

      {/* Floating position readout */}
      <div className="sw-float" aria-hidden="true">
        <span className="sw-float-num">
          {String(active + 1).padStart(2, "0")}/{SCENES.length}
        </span>
        <span className="sw-float-name">{currentScene.name}</span>
      </div>
    </div>
  )
}
