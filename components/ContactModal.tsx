"use client"

import { Mail, Phone, MapPin, Clock, X } from "lucide-react"
import { useModalA11y } from "@/hooks/useModalA11y"

export function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const dialogRef = useModalA11y(isOpen, onClose)

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Contact information"
        className="relative bg-black border-2 border-emerald-500/30 rounded-lg shadow-[0_0_40px_rgba(16,185,129,0.2)] p-6 sm:p-8 max-w-md w-full mx-4 transform animate-scale-in group overflow-hidden"
      >
        <div className="absolute inset-0 scanlines opacity-20 pointer-events-none"></div>

        <div className="relative z-10 flex justify-between items-start mb-6 border-b border-emerald-500/30 pb-4">
          <div className="flex flex-col">
            <span className="text-emerald-500/70 font-mono text-xs mb-1">[SYSTEM.COMM: PORT_443]</span>
            <h3 className="text-2xl font-bold font-mono text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">
              &gt; CONTACT_INFO<span className="animate-pulse">_</span>
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

        <div className="relative z-10 space-y-3">
          <div className="border border-emerald-500/30 bg-emerald-500/5 p-4 relative group hover:bg-emerald-500/10 transition-colors flex items-center gap-4">
            <Mail className="w-5 h-5 text-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.8)]" />
            <div>
              <p className="text-xs font-mono text-emerald-500/70">[EMAIL_ADDRESS]</p>
              <p className="font-mono text-emerald-300 text-sm">paarthbhatt37@gmail.com</p>
            </div>
          </div>

          <div className="border border-emerald-500/30 bg-emerald-500/5 p-4 relative group hover:bg-emerald-500/10 transition-colors flex items-center gap-4">
            <Phone className="w-5 h-5 text-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.8)]" />
            <div>
              <p className="text-xs font-mono text-emerald-500/70">[SECURE_LINE]</p>
              <p className="font-mono text-emerald-300 text-sm">+91 8920948990</p>
            </div>
          </div>

          <div className="border border-emerald-500/30 bg-emerald-500/5 p-4 relative group hover:bg-emerald-500/10 transition-colors flex items-center gap-4">
            <MapPin className="w-5 h-5 text-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.8)]" />
            <div>
              <p className="text-xs font-mono text-emerald-500/70">[PHYSICAL_NODE]</p>
              <p className="font-mono text-emerald-300 text-sm">New Delhi, INDIA</p>
            </div>
          </div>

          <div className="border border-emerald-500/30 bg-emerald-500/5 p-4 relative group hover:bg-emerald-500/10 transition-colors flex items-center gap-4">
            <Clock className="w-5 h-5 text-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.8)]" />
            <div>
              <p className="text-xs font-mono text-emerald-500/70">[STATUS]</p>
              <p className="font-mono text-emerald-300 text-sm">Available for immediate start</p>
            </div>
          </div>

          <div className="pt-2 text-xs font-mono text-emerald-500/50 flex justify-end">
             <span>[CONNECTION_SECURE]</span>
          </div>
        </div>
      </div>
    </div>
  )
}
