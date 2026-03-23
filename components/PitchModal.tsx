import { X } from "lucide-react"

export function PitchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="relative bg-black border-2 border-emerald-500/30 rounded-lg shadow-[0_0_40px_rgba(16,185,129,0.2)] max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto animate-pitch-modal-in group">
        <div className="absolute inset-0 scanlines opacity-20 pointer-events-none"></div>
        
        <div className="p-6 sm:p-8 relative z-10">
          <div className="flex justify-between items-start mb-6 border-b border-emerald-500/30 pb-4">
            <div className="flex flex-col">
              <span className="text-emerald-500/70 font-mono text-xs mb-1">[ACCESS_GRANTED: ROOT]</span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">
                &gt; WHY_IM_A_FIT<span className="animate-pulse">_</span>
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-emerald-500/70 hover:text-emerald-300 transition-colors p-2 bg-emerald-500/10 hover:bg-emerald-500/20 rounded border border-emerald-500/20"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="border border-emerald-500/30 bg-emerald-500/5 p-6 sm:p-8 relative group hover:bg-emerald-500/10 transition-colors">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-emerald-500"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-emerald-500"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-emerald-500"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-emerald-500"></div>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-mono text-emerald-500">[LOG_ENTRY.INITIATED]</span>
              </div>
              
              <p className="leading-relaxed sm:text-lg font-mono text-emerald-300">
                In a landscape of rapidly evolving AI risks, I bring a lethal combination of offensive security auditing and proactive infrastructure engineering. I specialize in developing resilient agentic workflows—implementing custom Write-Ahead Logging (WAL) and memory-compaction protocols for long-context stability. My philosophy is rooted in Sovereignty: building systems that are unignorable, unexploitable, and self-improving. I don't just prompt; I architect the backbone of the next generation of autonomous intelligence.
              </p>
            </div>
            
            <div className="pt-2 text-xs font-mono text-emerald-500/50 flex justify-end">
              <span>[EOF]</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
