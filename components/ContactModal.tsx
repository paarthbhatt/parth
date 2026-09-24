"use client"

import { Mail, Phone, MapPin, Clock, X } from "lucide-react"
import { useModalA11y } from "@/hooks/useModalA11y"
import { contactInfo } from "@/lib/data"

export function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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
        aria-labelledby="contact-modal-title"
        className="relative bg-black border-2 border-emerald-500/30 rounded-lg shadow-[0_0_40px_rgba(16,185,129,0.2)] p-6 sm:p-8 max-w-md w-full mx-4 transform animate-scale-in group overflow-hidden"
      >
        <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" aria-hidden="true"></div>

        <div className="relative z-10 flex justify-between items-start mb-6 border-b border-emerald-500/30 pb-4">
          <div className="flex flex-col">
            <span className="text-emerald-400/80 font-mono text-xs mb-1" aria-hidden="true">[SYSTEM.COMM: PORT_443]</span>
            <h2 id="contact-modal-title" className="text-2xl font-bold font-mono text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">
              <span aria-hidden="true">&gt; </span>Contact info<span aria-hidden="true" className="motion-safe:animate-pulse">_</span>
            </h2>
          </div>
          <button
             type="button"
             onClick={onClose}
             className="grid place-items-center w-11 h-11 shrink-0 text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-500/10 hover:bg-emerald-500/20 rounded border border-emerald-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
             aria-label="Close contact information"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="relative z-10 space-y-3">
          <div className="border border-emerald-500/30 bg-emerald-500/5 p-4 relative hover:bg-emerald-500/10 transition-colors flex items-center gap-4">
            <Mail className="w-5 h-5 text-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.8)] shrink-0" aria-hidden="true" />
            <div>
              <p className="text-xs font-mono text-emerald-400/80">Email</p>
              <a
                href={`mailto:${contactInfo.email}`}
                className="font-mono text-emerald-300 text-sm hover:text-emerald-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
              >
                {contactInfo.email}
              </a>
            </div>
          </div>

          <div className="border border-emerald-500/30 bg-emerald-500/5 p-4 relative hover:bg-emerald-500/10 transition-colors flex items-center gap-4">
            <Phone className="w-5 h-5 text-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.8)] shrink-0" aria-hidden="true" />
            <div>
              <p className="text-xs font-mono text-emerald-400/80">Phone</p>
              <a
                href={`tel:${contactInfo.phone}`}
                className="font-mono text-emerald-300 text-sm hover:text-emerald-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
              >
                {contactInfo.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="border border-emerald-500/30 bg-emerald-500/5 p-4 relative hover:bg-emerald-500/10 transition-colors flex items-center gap-4">
            <MapPin className="w-5 h-5 text-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.8)] shrink-0" aria-hidden="true" />
            <div>
              <p className="text-xs font-mono text-emerald-400/80">Location</p>
              <p className="font-mono text-emerald-300 text-sm">{contactInfo.location}</p>
            </div>
          </div>

          <div className="border border-emerald-500/30 bg-emerald-500/5 p-4 relative hover:bg-emerald-500/10 transition-colors flex items-center gap-4">
            <Clock className="w-5 h-5 text-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.8)] shrink-0" aria-hidden="true" />
            <div>
              <p className="text-xs font-mono text-emerald-400/80">Status</p>
              <p className="font-mono text-emerald-300 text-sm">{contactInfo.availability}</p>
            </div>
          </div>

          <div className="pt-2 text-xs font-mono text-emerald-400/70 flex justify-end" aria-hidden="true">
             <span>[CONNECTION_SECURE]</span>
          </div>
        </div>
      </div>
    </div>
  )
}
