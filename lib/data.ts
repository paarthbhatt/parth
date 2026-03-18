import {
  Shield,
  Eye,
  GitBranch,
  Building,
  Award,
  Users
} from "lucide-react"

export const certificationsData = [
  {
    title: "Advent of Cyber 2025",
    issuer: "TryHackMe",
    date: "2025",
    icon: Shield,
    bgGradient: "from-blue-600 to-indigo-600",
    description: "Completed 24 cyber security challenges, demonstrating consistency, tenacity & continuous learning in security fundamentals.",
  },
  {
    title: "Junior Cybersecurity Analyst Career Path",
    issuer: "Cisco",
    date: "2025",
    icon: Shield,
    bgGradient: "from-blue-500 to-cyan-600",
    description: "Comprehensive cybersecurity training covering threat detection, incident response, and security analysis",
  },
  {
    title: "Foundation Level Threat Intelligence Analyst",
    issuer: "arcX",
    date: "2025",
    icon: Eye,
    bgGradient: "from-red-500 to-pink-600",
    description: "Specialized training in threat intelligence analysis, cyber threat hunting, and security intelligence",
  },
  {
    title: "GitHub Foundations",
    issuer: "GitHub",
    date: "2025",
    icon: GitBranch,
    bgGradient: "from-green-500 to-emerald-600",
    description: "Mastery of version control, collaborative development workflows, and open-source contribution practices",
  },
  {
    title: "Pre-Security Certificate",
    issuer: "TryHackMe",
    date: "2025",
    icon: Shield,
    bgGradient: "from-yellow-500 to-orange-600",
    description: "Foundational cybersecurity knowledge covering network security, web application security, and digital forensics",
  },
  {
    title: "Cybersecurity 101 Certificate",
    issuer: "TryHackMe",
    date: "2025",
    icon: Shield,
    bgGradient: "from-yellow-500 to-orange-600",
    description: "Fundamental concepts of cybersecurity including network security, web application security, and cryptography",
  },
  {
    title: "ICS Cybersecurity Risks, Vulnerabiltities and Threats (3 certs)",
    issuer: "CISA",
    date: "2025",
    icon: Building,
    bgGradient: "from-blue-600 to-indigo-600",
    description: "Specialized training on Industrial Control Systems (ICS) security, focusing on risks, vulnerabilities, and threat mitigation",
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco",
    date: "2025",
    icon: Shield,
    bgGradient: "from-blue-500 to-cyan-600",
    description: "Foundational understanding of cybersecurity principles, protecting personal online life, and insights into security challenges",
  },
  {
    title: "XSS Defense Bootcamp",
    issuer: "DevTown",
    date: "2025",
    icon: Shield,
    bgGradient: "from-purple-500 to-pink-600",
    description: "Deep dive into Cross-Site Scripting (XSS) attacks and defense mechanisms, focusing on secure coding practices",
  },
]

export const achievementsData = [
  {
    title: "Winner – MCA Eagles' CodeNest 2025",
    subtitle: "Top 3 in App Category",
    issuer: "Devpost",
    date: "Feb 2025",
    icon: Award,
    bgGradient: "from-yellow-500 to-orange-600",
    description: "Recognized for exceptional mobile application development skills and innovative problem-solving approach in a competitive coding environment.",
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
    title: "Delhi Smart City Command Center",
    subtitle: "Smart City Dashboard Development",
    issuer: "Smart City Hackathon",
    date: "May 2025",
    icon: Building,
    bgGradient: "from-red-500 to-pink-600",
    description: "Developed a comprehensive smart city dashboard focused on Delhi, showcasing real-time and historical urban data to enhance city management and citizen engagement through interactive visualizations.",
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

export const securityProjectsData = [
  {
    title: "SecretVault",
    tag: "Security & Encryption",
    img: "/secure-app-prototype.png",
    description: "Enterprise-grade API key management with AES encryption and zero-knowledge architecture.",
    url: "https://github.com/paarthbhatt/SecretVault",
  },
  {
    title: "WHOIS Lookup Tool",
    tag: "Threat Intelligence",
    img: "/threat-intel-parser.png",
    description: "Python CLI for bulk domain WHOIS lookups with parallel processing and rate-limiting.",
    url: "https://github.com/paarthbhatt/Whois-Lookup-Terminal-Tool",
  },
  {
    title: "SurveillanceOps",
    tag: "Security Monitoring",
    img: "/ai-camera.png",
    description: "Enterprise surveillance platform with real-time detection and encrypted analytics.",
    url: "https://surveillance-platform-updated.vercel.app/",
  },
]

export const webProjectsData = [
  {
    title: "Delhi Smart City Dashboard",
    tag: "Data Visualization",
    img: "/smart-city-dashboard.png",
    description: "Real-time dashboard for Delhi's smart city initiative with urban data visualization.",
    url: "https://delhi-smart-city.vercel.app/",
  },
  {
    title: "STEM Code Lab",
    tag: "Educational Platform",
    img: "/threat-intel-parser.png",
    description: "Interactive platform for coding education through hands-on simulations.",
    url: "https://stem-codelab.vercel.app/",
  },
  {
    title: "AI-Based Camera",
    tag: "AI & Computer Vision",
    img: "/ai-camera.png",
    description: "Smart surveillance system using AI for real-time threat detection.",
    url: "https://circuitech-ai-based-camera.vercel.app/main.html",
  },
  {
    title: "Eco Track",
    tag: "Environmental Monitoring",
    img: "/eco-track.png",
    description: "Tool for tracking environmental data to promote sustainability practices.",
    url: "https://eco-track-chi.vercel.app/",
  },
]

export const otherProjectsData = [
  {
    title: "Netflix Clone",
    tag: "Web App",
    img: "/netflix-clone.png",
    description: "Full-stack Netflix clone with authentication and streaming UI.",
    url: "https://netflix-clone-tau-black.vercel.app/",
  },
  {
    title: "Machine Learning Model and Interpretations of Netflix dataset",
    tag: "Data Analysis",
    img: "/ml-netflix.png",
    description: "ML models on Netflix data with visualizations and statistical analysis.",
    url: "https://github.com/paarthbhatt/Netflix-data-files",
  },
]

export const experienceData = [
  {
    role: "Tech Team Member",
    org: "Sinusoid",
    when: "August 2024",
    desc: "Helped in the creation phase of the website, helped in event competition, operations and technical support.",
    status: "COMPLETED"
  },
  {
    role: "Tech Team Member",
    org: "TEDxNIITUniversity",
    when: "February 2025",
    desc: "Designed webpages all part of the website and helped in operations and technical support.",
    status: "COMPLETED"
  },
  {
    role: "Web Developer Internship",
    org: "LaunchED Global",
    when: "April 2025",
    desc: "Built a commercial dashboard for anime website.",
    status: "COMPLETED"
  },
  {
    role: "Virtual Internship – Cybersecurity & AI",
    org: "NIIT Foundation",
    when: "July 2025",
    desc: "Completed 4-week virtual internship focused on Cybersecurity & Artificial Intelligence.",
    status: "COMPLETED"
  },
]

export const skillsData = [
  "Threat Intel", "Cybersecurity", "Vulnerability Management", "Web Application Security", 
  "Artificial Intelligence", "Github", "Cloud Security", "Incident Response", "Linux", 
  "Python", "DSA", "Collaboration", "Networking", "Cloud Computing", "Project Management",
  "OOPs", "AI tools & Frameworks", "Network Security", "Security Operations", 
  "Cisco Packet Tracer", "Kali Linux", "OWASP"
]
