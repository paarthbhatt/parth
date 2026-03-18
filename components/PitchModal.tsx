import { X } from "lucide-react"

export function PitchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto animate-pitch-modal-in">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 font-mono text-emerald-600 dark:text-emerald-400">
              Why I'm a fit for Cybersecurity Roles
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 p-6 rounded-2xl">
              <h4 className="text-xl font-semibold text-emerald-700 dark:text-emerald-300 mb-3">
                Validated Foundations
              </h4>
              <p className="leading-relaxed">
                Junior Cybersecurity Analyst (Cisco), Threat Intelligence (arcX), Pre‑Security (TryHackMe), and GitHub
                Foundations—giving me a strong base in SOC workflows, TI methodologies, and secure SDLC practices.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-2xl">
              <h4 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-3">Analyst Mindset</h4>
              <p className="leading-relaxed">
                Comfortable with log triage, IOC enrichment, and writing concise incident notes. I approach problems
                like an analyst: hypotheses, evidence, and iterative refinement.
              </p>
            </div>

            <div className="bg-gradient-to-r from-slate-50 to-zinc-50 dark:from-slate-900/20 dark:to-zinc-900/20 p-6 rounded-2xl">
              <h4 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-3">Impactful Projects</h4>
              <p className="leading-relaxed">
                Built a Smart City data dashboard for Delhi with real‑time visualization—evidence of reliability, data
                hygiene, and shipping user‑centric tools with security in mind.
              </p>
            </div>

            <div className="text-center pt-2">
              <p className="text-lg font-medium text-gray-800 dark:text-white">
                I'm ready to contribute on day one—curious, reliable, and focused on secure outcomes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
