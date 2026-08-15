export function Header({ introDone }: { introDone: boolean }) {
  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-40 border-b-2 border-emerald-500/30 bg-black/90 backdrop-blur-md shadow-[0_8px_32px_-8px_rgba(16,185,129,0.4)] transition-all duration-700 relative overflow-hidden",
        introDone ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4",
      ].join(" ")}
    >
      <div className="absolute inset-0 scanlines opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
            <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />
            <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#06b6d4] animate-pulse" />
            <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6] animate-pulse" />
            <div className="ml-1 sm:ml-2 md:ml-3 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.5)] border border-emerald-500">
              PB
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold font-mono text-emerald-400 tracking-tight">
              Parth Bhatt
            </h1>
          </div>

          <div className="w-[80px] sm:w-[96px] md:w-[112px] lg:w-[128px]" aria-hidden="true" />
        </div>
        <div className="h-0.5 w-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 opacity-70" />
      </div>
    </header>
  )
}
