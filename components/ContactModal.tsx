import { Mail, Phone, MapPin, Clock, X } from "lucide-react"

export function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform animate-scale-in">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Contact Details</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <Mail className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
              <p className="font-medium text-gray-800 dark:text-white">paarthbhatt37@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <Phone className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
              <p className="font-medium text-gray-800 dark:text-white">+91 8920948990</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <MapPin className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
              <p className="font-medium text-gray-800 dark:text-white">New Delhi, INDIA</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <Clock className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Availability</p>
              <p className="font-medium text-gray-800 dark:text-white">Available for immediate start</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
