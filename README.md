# 🛡️ Parth Bhatt — Portfolio & Security Workspace

> **Security Architect & AI Safety Engineer** | **Cyber Security Intern @ DRDO (SAG)** | **4× Hackathon Winner** | **Top 6% TryHackMe**

Live Portfolio: [https://parthbhatt.me](https://parthbhatt.me)

---

## 📌 Overview

This repository contains the source code for my cybersecurity and security engineering portfolio, built using **Next.js 15 (App Router)**, **React 18**, **TypeScript**, and **Tailwind CSS v4**.

Designed with a high-fidelity **"Hacker Terminal"** aesthetic — featuring interactive terminal boot sequences, Matrix code rain, CRT scanline overlays, responsive visual telemetry, and custom cursor spotlight effects — this platform highlights my work in:

- **AI Safety & Agentic Security Frameworks** (Entropy Firewall, Atreides, Agentyc)
- **Autonomous Security Agents & Vulnerability Scanners** (Robin Security Agent, Guardiant)
- **Threat Intelligence Telemetry & CLI Tools** (Batcomputer, WHOIS Lookup CLI)
- **Application Security & Web Penetration Testing** (DRDO SAG Internship, SecretVault)

---

## ⚡ Tech Stack

| Domain | Technologies |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript (Strict Mode) |
| **UI & Styling** | Tailwind CSS v4 + 1,000-line Custom Animation System |
| **Icons & Design** | Lucide React, Geist Sans, Geist Mono |
| **State & Hooks** | React 18 (`useScrollReveal`, `useIsMobile`) |
| **Security Headers** | CSP, HSTS, X-Frame-Options, X-Content-Type-Options |
| **Deployment** | Vercel (Production CI/CD) |

---

## 🚀 Featured Security Engineering Projects

### 🛡️ AI & Agentic Security
- **[Entropy Firewall](https://github.com/paarthbhatt/entropy-firewall)** — Proactive LLM firewall defending autonomous AI agents against prompt injection and execution exploits.
- **[Robin Security Agent](https://github.com/paarthbhatt/robin-security-agent)** — Autonomous AI security agent designed for automated vulnerability assessment and mitigation.
- **[Atreides Framework](https://atreides-web-liard.vercel.app/)** ([Source](https://github.com/paarthbhatt/Atreides)) — High-performance AI agent execution architecture with memory compaction & threat containment.
- **[Guardiant Security](https://guardiant-website.vercel.app/)** ([Source](https://github.com/paarthbhatt/Guardiant)) — Enterprise AppSec platform for continuous vulnerability scanning and incident response.
- **[Agentyc](https://github.com/paarthbhatt/Agentyc)** — Security-first automation framework for agent workflow orchestration.

### 🛰️ Threat Intelligence & Defense
- **[Batcomputer](https://github.com/paarthbhatt/Batcomputer)** — Centralized security command center dashboard for threat telemetry analysis.
- **[SecretVault](https://github.com/paarthbhatt/SecretVault)** — Zero-knowledge key management platform powered by AES encryption.
- **[WHOIS Lookup CLI](https://github.com/paarthbhatt/Whois-Lookup-Terminal-Tool)** — Parallelized Python CLI for bulk domain WHOIS lookups and threat intel parsing.
- **[SurveillanceOps](https://surveillance-platform-updated.vercel.app/)** — Real-time surveillance platform with encrypted detection analytics.

---

## ✍️ Write-ups & Technical Research

- 📝 **[John the Ripper: The Basics](https://medium.com/@paarthbhatt37/tryhackme-john-the-ripper-the-basics-cyber-security-101-thm-1be625362fa3)** (*Medium*) — In-depth breakdown of NTLM/Shadow hash cracking, SSH private key breaking, and custom cracking rules.
- 🎮 **["The Game" CTF Walkthrough](https://x.com/thatsparthbhatt/status/1929926261595316517)** (*X / Twitter*) — Reverse engineering a Godot Engine Tetris game to extract hidden flags via binary modding.

---

## 📁 Repository Structure

```
parth/
├── app/
│   ├── globals.css          # Master stylesheet (animations, CRT overlays, scanlines)
│   ├── layout.tsx           # Root layout (Fonts, ScrollProgress, CursorGlow, Metadata)
│   └── page.tsx             # Main page controller (state, dark mode, intro sequence)
│
├── components/
│   ├── HackerBootSequence   # Terminal boot intro with ASCII banner & Matrix rain
│   ├── HeroSection          # Hero viewport with avatar, gradient name, rotating text
│   ├── AboutSection         # DRDO SAG profile & security-architect identity
│   ├── ProjectsSection      # Featured security grid & collapsed secondary repos
│   ├── WriteupsSection      # Technical write-ups & CTF analysis showcase
│   ├── ExperienceSection    # Timeline log of DRDO SAG, Cisco, & tech roles
│   ├── CertificationsSection# 2-Tier certification layout (Highlight vs Badges)
│   ├── AchievementsSection  # Hackathon trophies (GDG Cloud 2nd Place, CodeNest)
│   ├── ContactSection       # Contact interface + CTF profile badges
│   ├── TerminalStrip        # Section header chrome with animated scan sweep
│   ├── ScrollProgress       # Floating progress bar with comet tip
│   └── CursorGlow           # Cursor-following radial spotlight overlay
│
├── hooks/
│   └── useScrollReveal.ts   # IntersectionObserver driver for smooth reveal effects
│
├── lib/
│   ├── data.ts              # Centralized single source of truth for portfolio data
│   └── utils.ts             # Tailwind class merge helper (`cn`)
│
├── public/                  # Project preview screenshots & static assets
├── next.config.mjs          # Hardened Next.js security headers & config
├── package.json             # Dependencies & scripts
└── tsconfig.json            # TypeScript configuration
```

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18.x or later)
- npm (Package Manager)

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/paarthbhatt/parth.git
cd parth

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Generate optimized production build
npm run build

# Start production server
npm run start
```

---

## 🔒 Security Headers & Hardening

Configured directly in `next.config.mjs`:

```javascript
headers: [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  { key: 'Content-Security-Policy', value: "..." }
]
```

---

## 🌐 Connect & Profiles

- **TryHackMe**: [tryhackme.com/p/paarthbhatt37](https://tryhackme.com/p/paarthbhatt37)
- **Medium Blog**: [medium.com/@paarthbhatt37](https://medium.com/@paarthbhatt37)
- **LinkedIn**: [linkedin.com/in/parth-bhatt-07bb36310](https://www.linkedin.com/in/parth-bhatt-07bb36310/)
- **Twitter / X**: [@thatsparthbhatt](https://x.com/thatsparthbhatt)
- **Email**: [paarthbhatt37@gmail.com](mailto:paarthbhatt37@gmail.com)

---

© 2026 Parth Bhatt. All rights reserved.
