"use client"

import { X } from "lucide-react"
import { useModalA11y } from "@/hooks/useModalA11y"
import { pitchStatement } from "@/lib/data"

export function PitchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const dialogRef = useModalA11y(isOpen, onClose)

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pitch-modal-title"
        className="relative bg-black border-2 border-emerald-500/30 rounded-lg shadow-[0_0_40px_rgba(16,185,129,0.2)] max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto animate-pitch-modal-in"
      >
        <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" aria-hidden="true"></div>

        <div className="p-6 sm:p-8 relative z-10">
          <div className="flex justify-between items-start gap-3 mb-6 border-b border-emerald-500/30 pb-4">
            <div className="flex flex-col">
              <span className="text-emerald-400/90 font-mono text-xs mb-1" aria-hidden="true">[ACCESS_GRANTED: ROOT]</span>
              <h2 id="pitch-modal-title" className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">
                <span aria-hidden="true">&gt; </span>Why I&apos;m a fit<span aria-hidden="true" className="motion-safe:animate-pulse">_</span>
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="grid place-items-center w-11 h-11 shrink-0 text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-500/10 hover:bg-emerald-500/20 rounded border border-emerald-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              aria-label="Close pitch"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="border border-emerald-500/30 bg-emerald-500/5 p-6 sm:p-8 relative hover:bg-emerald-500/10 transition-colors">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-emerald-500" aria-hidden="true"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-emerald-500" aria-hidden="true"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-emerald-500" aria-hidden="true"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-emerald-500" aria-hidden="true"></div>

              <div className="flex items-center gap-2 mb-4" aria-hidden="true">
                <span className="w-2 h-2 bg-emerald-500 rounded-full motion-safe:animate-pulse"></span>
                <span className="text-sm font-mono text-emerald-500">[LOG_ENTRY.INITIATED]</span>
              </div>

              <p className="leading-relaxed sm:text-lg font-mono text-emerald-300">
                {pitchStatement}
              </p>
            </div>

            <div className="pt-2 text-xs font-mono text-emerald-400/80 flex justify-end" aria-hidden="true">
              <span>[EOF]</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
