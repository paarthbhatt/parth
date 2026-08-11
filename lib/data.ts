import {
  Shield,
  Eye,
  GitBranch,
  Building,
  Award,
  Users
} from "lucide-react"

/* ───────────────────────────────────────────────
   CERTIFICATIONS — split into highlight + other
   ─────────────────────────────────────────────── */

/** Top-tier certifications shown as full slider cards */
export const certificationsHighlight = [
  {
    title: "Foundation Level Threat Intelligence Analyst",
    issuer: "arcX",
    date: "2025",
    icon: Eye,
    bgGradient: "from-red-500 to-pink-600",
    description: "Specialized training in threat intelligence analysis, cyber threat hunting, and security intelligence frameworks.",
  },
  {
    title: "ICS Cybersecurity Risks, Vulnerabilities and Threats (3 certs)",
    issuer: "CISA",
    date: "2025",
    icon: Building,
    bgGradient: "from-blue-600 to-indigo-600",
    description: "Specialized training on Industrial Control Systems (ICS) security, focusing on risks, vulnerabilities, and threat mitigation strategies.",
  },
  {
    title: "Junior Cybersecurity Analyst Career Path",
    issuer: "Cisco",
    date: "2025",
    icon: Shield,
    bgGradient: "from-blue-500 to-cyan-600",
    description: "Comprehensive cybersecurity training covering threat detection, incident response, and security analysis methodologies.",
  },
  {
    title: "Advent of Cyber 2025",
    issuer: "TryHackMe",
    date: "2025",
    icon: Shield,
    bgGradient: "from-blue-600 to-indigo-600",
    description: "Completed 24 cyber security challenges demonstrating consistency, tenacity & continuous learning across offensive and defensive domains.",
  },
]

/** Other certifications shown as compact badges */
export const certificationsOther = [
  { title: "GitHub Foundations", issuer: "GitHub" },
  { title: "Cybersecurity 101", issuer: "TryHackMe" },
  { title: "Pre-Security Certificate", issuer: "TryHackMe" },
  { title: "Introduction to Cybersecurity", issuer: "Cisco" },
  { title: "XSS Defense Bootcamp", issuer: "DevTown" },
]

/* ───────────────────────────────────────────────
   ACHIEVEMENTS
   ─────────────────────────────────────────────── */

export const achievementsData = [
  {
    title: "🥈 2nd Place – GDG Cloud New Delhi HackFest 2.0",
    subtitle: "$850 Prize | Powered by Turgon AI",
    issuer: "GDG Cloud New Delhi",
    date: "2025",
    icon: Award,
    bgGradient: "from-slate-500 to-blue-600",
    description: "Secured 2nd place and $850 prize at HackFest 2.0 (GDG Cloud New Delhi), powered by Turgon AI. Built a live AI-powered project deployed on Vercel, showcasing rapid engineering under competition pressure.",
    links: {
      hackathon: "https://www.commudle.com/communities/gdgcloudnd/hackathons/hackfest-2-0",
      github: "https://github.com/paarthbhatt/Hackfest_Hackathon_Project",
      live: "https://hackfest-hackathon-project.vercel.app/",
    },
  },
  {
    title: "Winner – MCA Eagles' CodeNest 2025",
    subtitle: "Top 3 in App Category",
    issuer: "Devpost",
    date: "Feb 2025",
    icon: Award,
    bgGradient: "from-yellow-500 to-orange-600",
    description: "Recognized for exceptional mobile application development skills and innovative problem-solving approach in a competitive coding environment.",
    links: {
      hackathon: "https://devpost.com/software/ecotrack-i98tyk",
      github: "https://github.com/paarthbhatt/EcoTrack",
      live: "https://eco-track-chi.vercel.app/",
    },
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
    title: "Hackorate Hackathon ",
    subtitle: "Vibe-Coding Excellence",
    issuer: "Sinusoid v9 - NIIT University",
    date: "2025",
    icon: Award,
    bgGradient: "from-purple-500 to-violet-600",
    description: "Achieved a top-tier ranking in this unique 'vibe-coding' competition. Recognized for maintaining exceptional development flow and code quality while delivering a creative solution under pressure.",
  },
]

/* ───────────────────────────────────────────────
   PROJECTS — Security & AI Security Focus
   ─────────────────────────────────────────────── */

export const securityProjectsData = [
  {
    title: "Entropy Firewall",
    tag: "AI Security & Firewall",
    img: "/entropy-firewall.png",
    description: "Advanced LLM firewall solution offering proactive defense for autonomous agents and large language models.",
    url: "https://github.com/paarthbhatt/entropy-firewall",
    sourceUrl: "https://github.com/paarthbhatt/entropy-firewall",
  },
  {
    title: "Robin Security Agent",
    tag: "Autonomous AI Agent",
    img: "/robin-security.png",
    description: "Autonomous AI security agent designed for proactive vulnerability assessment and threat mitigation.",
    url: "https://github.com/paarthbhatt/robin-security-agent",
    sourceUrl: "https://github.com/paarthbhatt/robin-security-agent",
  },
  {
    title: "Atreides Framework",
    tag: "AI Agent Architecture",
    img: "/atreides-preview.png",
    description: "Autonomous agent execution framework featuring long-context memory compaction and threat-resilient workflow isolation.",
    url: "https://atreides-web-liard.vercel.app/",
    sourceUrl: "https://github.com/paarthbhatt/Atreides",
  },
  {
    title: "Guardiant Security",
    tag: "AppSec & Active Shield",
    img: "/guardiant-preview.png",
    description: "Enterprise vulnerability monitoring & threat intelligence platform for active application defense.",
    url: "https://guardiant-website.vercel.app/",
    sourceUrl: "https://github.com/paarthbhatt/Guardiant",
  },
  {
    title: "Agentyc Framework",
    tag: "AI Security & Agent Ops",
    img: "/agentyc-preview.png",
    description: "Security-first agentic automation framework designed for agent workflow orchestration and threat containment.",
    url: "https://github.com/paarthbhatt/Agentyc",
    sourceUrl: "https://github.com/paarthbhatt/Agentyc",
  },
  {
    title: "Batcomputer",
    tag: "Security Command Center",
    img: "/batcomputer.png",
    description: "Centralized security command center and dashboard for analyzing and responding to threat telemetry.",
    url: "https://github.com/paarthbhatt/Batcomputer",
    sourceUrl: "https://github.com/paarthbhatt/Batcomputer",
  },
  {
    title: "SecretVault",
    tag: "Security & Encryption",
    img: "/secure-app-prototype.png",
    description: "Enterprise-grade API key management with AES encryption and zero-knowledge architecture.",
    url: "https://github.com/paarthbhatt/SecretVault",
    sourceUrl: "https://github.com/paarthbhatt/SecretVault",
  },
  {
    title: "WHOIS Lookup Tool",
    tag: "Threat Intelligence",
    img: "/threat-intel-parser.png",
    description: "Python CLI for bulk domain WHOIS lookups with parallel processing and rate-limiting.",
    url: "https://github.com/paarthbhatt/Whois-Lookup-Terminal-Tool",
    sourceUrl: "https://github.com/paarthbhatt/Whois-Lookup-Terminal-Tool",
  },
  {
    title: "SurveillanceOps",
    tag: "Security Monitoring",
    img: "/ai-camera.png",
    description: "Enterprise surveillance platform with real-time detection and encrypted analytics.",
    url: "https://surveillance-platform-updated.vercel.app/",
    sourceUrl: "https://surveillance-platform-updated.vercel.app/",
  },
]

/** Secondary / collapsed web and research projects shown as compact hyperlinked badges */
export const collapsedProjectsData = [
  {
    title: "Netflix Clone (DRDO Edition)",
    tag: "Full-Stack Web App",
    url: "https://netflix-drdo.vercel.app/",
  },
  {
    title: "Entropy Website",
    tag: "Web Ecosystem",
    url: "https://github.com/paarthbhatt/entropy-website",
  },
  {
    title: "Delhi Smart City Dashboard",
    tag: "Data Visualization",
    url: "https://delhi-smart-city.vercel.app/",
  },
  {
    title: "STEM Code Lab",
    tag: "Educational Platform",
    url: "https://stem-codelab.vercel.app/",
  },
  {
    title: "AI-Based Camera",
    tag: "Computer Vision",
    url: "https://circuitech-ai-based-camera.vercel.app/main.html",
  },
  {
    title: "Eco Track",
    tag: "Environmental Tracker",
    url: "https://eco-track-chi.vercel.app/",
  },
  {
    title: "Netflix ML Dataset Analysis",
    tag: "Data Science / ML",
    url: "https://github.com/paarthbhatt/Netflix-data-files",
  },
  {
    title: "Star Trek Project",
    tag: "Interactive Web",
    url: "https://github.com/paarthbhatt/Star-Trek",
  },
]

/* ───────────────────────────────────────────────
   EXPERIENCE — updated from LinkedIn (security-first order)
   ─────────────────────────────────────────────── */

export const experienceData = [
  {
    role: "Cyber Security Intern",
    org: "DRDO — Ministry of Defence, Govt. of India",
    when: "Jun 2026 – Present",
    desc: "Conducted whitebox and blackbox web application penetration testing for SAG division; identified vulnerabilities and executed successful PoC exploits.",
    status: "ACTIVE"
  },
  {
    role: "Cybersecurity & AI Intern",
    org: "Cisco Networking Academy × NIIT Foundation",
    when: "Jul 2025 – Aug 2025",
    desc: "Completed focused virtual internship on cybersecurity & AI in collaboration with Cisco Networking Academy x NIIT Foundation — covering threat detection pipelines, network defense, and AI-driven security analysis.",
    status: "COMPLETED"
  },
  {
    role: "Web Developer Intern",
    org: "LaunchED Global",
    when: "Feb 2025 – Apr 2025",
    desc: "Built production dashboards with React.js; applied secure coding practices across the development lifecycle.",
    status: "COMPLETED"
  },
  {
    role: "TEDx Technical Team Member",
    org: "TEDxNIITUniversity",
    when: "Aug 2024 – Feb 2025",
    desc: "Led technical infrastructure and web development for the university TEDx event over 7 months.",
    status: "COMPLETED"
  },
  {
    role: "Tech Team Member",
    org: "siNUsoid",
    when: "Aug 2024 – Jan 2025",
    desc: "Event operations, competition infrastructure, and technical support at university tech fest.",
    status: "COMPLETED"
  },
]

/* ───────────────────────────────────────────────
   SKILLS — reordered: security-first, generic-last
   ─────────────────────────────────────────────── */

export const skillsData = [
  "Threat Intelligence", "Vulnerability Management", "Incident Response",
  "Security Operations", "Network Security", "Web Application Security",
  "Cloud Security", "OWASP", "Kali Linux", "Cisco Packet Tracer",
  "Python", "Linux", "AI & LLM Security", "DevSecOps",
  "DSA", "Github", "Cloud Computing", "Networking",
  "AI Tools & Frameworks", "Collaboration", "Project Management",
]

/* ───────────────────────────────────────────────
   WRITE-UPS — NEW
   ─────────────────────────────────────────────── */

export const writeupsData = [
  {
    title: "John the Ripper: The Basics — Cracking Hashes Like a Pro",
    platform: "Medium",
    tag: "THM Room Writeup",
    description: "Step-by-step writeup covering NTLM & Linux shadow hash cracking, ZIP/RAR archive breaking, SSH key cracking using custom rules and single crack mode with tools like zip2john, rar2john, and ssh2john.",
    url: "https://medium.com/@paarthbhatt37/tryhackme-john-the-ripper-the-basics-cyber-security-101-thm-1be625362fa3",
  },
  {
    title: "\"The Game\" CTF — Reverse Engineering a Godot Tetris",
    platform: "X Thread",
    tag: "CTF Walkthrough",
    description: "Solved a TryHackMe CTF by reverse engineering a Tetris game built with Godot Engine to extract a hidden flag. Game hacking meets binary analysis.",
    url: "https://x.com/thatsparthbhatt/status/1929926261595316517",
  },
]

/* ───────────────────────────────────────────────
   CTF PROFILES — NEW
   ─────────────────────────────────────────────── */

export const ctfProfiles = {
  tryhackme: "https://tryhackme.com/p/paarthbhatt37",
  medium: "https://medium.com/@paarthbhatt37",
  github: "https://github.com/paarthbhatt",
}
