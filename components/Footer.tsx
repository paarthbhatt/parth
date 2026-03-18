import { Mail, Linkedin, Github, Twitter } from "lucide-react"

export function Footer({ introDone }: { introDone: boolean }) {
  return (
    <footer
      className={[
        "rounded-t-2xl border-t border-emerald-500/25 bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 text-white backdrop-blur-md shadow-[0_-10px_30px_-12px_rgba(34,197,94,0.35)] transition-all duration-700",
        introDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-5">
        <div className="mb-2 sm:mb-3 flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-emerald-300" />
          <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-cyan-300" />
          <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-blue-300" />
          <span className="ml-1 sm:ml-2 font-mono text-[10px] sm:text-xs opacity-80">/dev/portfolio – link-layer</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/15 text-white text-xs sm:text-sm font-bold flex items-center justify-center shadow-lg border border-white/20">
              PB
            </div>
            <span className="text-base sm:text-lg font-semibold">Parth Bhatt</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xs sm:text-sm opacity-90 mr-0.5 sm:mr-1">Connect:</span>
            <a
              href="mailto:paarthbhatt37@gmail.com"
              className="group p-2 bg-white/15 hover:bg-white/25 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
            >
              <Mail className="w-4 h-4 text-white" />
            </a>
            <a
              href="https://www.linkedin.com/in/parth-bhatt-07bb36310/"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-2 bg-white/15 hover:bg-white/25 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
            >
              <Linkedin className="w-4 h-4 text-white" />
            </a>
            <a
              href="https://github.com/paarthbhatt"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-2 bg-white/15 hover:bg-white/25 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
            >
              <Github className="w-4 h-4 text-white" />
            </a>
            <a
              href="https://x.com/thatsparthbhatt"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-2 bg-white/15 hover:bg-white/25 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
            >
              <Twitter className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>

        <div className="text-center mt-4 pt-4 border-t border-white/20">
          <p className="text-xs sm:text-sm opacity-90">
            © 2025 Parth Bhatt • terminal-mode online • building secure, human‑centered software
          </p>
        </div>
      </div>
    </footer>
  )
}
