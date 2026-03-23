export function TerminalStrip({
  label = "SESSION",
  meta = "status: online",
}: {
  label?: string
  meta?: string
}) {
  return (
    <div className="relative z-10 mx-auto max-w-7xl">
      <div className="mx-4 sm:mx-6 lg:mx-8 mb-2 sm:mb-3">
        <div className="terminal-strip-scan relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 rounded-t-xl border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-500/10 px-3 sm:px-4 py-2 backdrop-blur overflow-hidden">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]"></span>
            <span className="ml-3 font-mono text-xs sm:text-sm text-emerald-500 dark:text-emerald-400 tracking-wide">
              {label}
            </span>
          </div>
          <div className="font-mono text-[10px] sm:text-xs text-emerald-500/80 dark:text-emerald-300/80 sm:text-right">
            {meta}
          </div>
        </div>
        {/* Emerald accent draw-in line */}
        <div className="section-accent-line w-full" />
      </div>
    </div>
  )
}

