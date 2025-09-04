'use client'

import { useState, useEffect } from 'react'
import { Calendar, X, Phone } from 'lucide-react'

export default function FloatingConsultationCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    // Show the floating CTA after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all animate-bounce"
        aria-label="Book consultation"
      >
        <Phone className="h-6 w-6" />
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="bg-white rounded-lg shadow-2xl border-2 border-green-500 overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-3 flex items-center justify-between">
          <h3 className="font-bold text-sm">🎯 FREE Expert Consultation</h3>
          <button
            onClick={() => setIsMinimized(true)}
            className="text-white/80 hover:text-white"
            aria-label="Minimize"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4">
          <p className="text-gray-700 text-sm mb-3">
            Get expert advice on <strong>€200K-€2M EU grants</strong> for your Italian property investment!
          </p>
          
          <a
            href="https://calendly.com/investinpuglia/30min?utm_source=website&utm_medium=floating_cta&utm_campaign=free_consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg font-bold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 animate-pulse"
          >
            <Calendar className="h-5 w-5" />
            Book Your FREE Call NOW
          </a>
          
          <p className="text-xs text-gray-500 text-center mt-2">
            ⚡ Limited slots • 100% FREE
          </p>
        </div>
      </div>
    </div>
  )
}