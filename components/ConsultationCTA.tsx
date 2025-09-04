'use client'

import { MessageSquare, Calendar, ArrowRight, Phone } from 'lucide-react'

interface ConsultationCTAProps {
  variant?: 'primary' | 'secondary' | 'inline' | 'banner' | 'hero'
  text?: string
  className?: string
}

export default function ConsultationCTA({ 
  variant = 'primary', 
  text = 'Book Your 30-Minute Call NOW',
  className = ''
}: ConsultationCTAProps) {
  
  const calendlyUrl = 'https://calendly.com/investinpuglia/30min?utm_source=website&utm_medium=cta&utm_campaign=free_consultation'
  
  if (variant === 'hero') {
    return (
      <div className={`bg-gradient-to-r from-green-500 to-green-600 text-white p-8 rounded-xl shadow-2xl ${className}`}>
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-3">Book Your FREE 30-Minute Consultation NOW!</h2>
          <p className="text-xl mb-6 text-white/95">Get Expert Advice on EU Grants Worth €200K-€2M</p>
          <a 
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-white text-green-600 px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all gap-3 animate-pulse"
          >
            <Phone className="h-6 w-6" />
            Book Your Call NOW
            <ArrowRight className="h-5 w-5" />
          </a>
          <p className="mt-4 text-white/90">⚡ Limited Slots Available - 100% FREE</p>
        </div>
      </div>
    )
  }
  
  if (variant === 'banner') {
    return (
      <div className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-xl ${className}`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold mb-2">Book FREE Consultation - 30 Minutes That Could Save You €200K+</h3>
            <p className="text-white/90">Direct access to EU grant experts - Schedule your call NOW</p>
          </div>
          <a 
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg hover:scale-105 transition-all inline-flex items-center gap-2 animate-pulse"
          >
            <Calendar className="h-6 w-6" />
            Book Your Call NOW
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    )
  }
  
  if (variant === 'inline') {
    return (
      <a 
        href={calendlyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-blue-600 hover:text-blue-700 font-bold underline inline-flex items-center gap-2 ${className}`}
      >
        <Calendar className="h-5 w-5" />
        {text}
        <ArrowRight className="h-4 w-4" />
      </a>
    )
  }
  
  if (variant === 'secondary') {
    return (
      <a 
        href={calendlyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-600 hover:text-white transition-all inline-flex items-center gap-2 ${className}`}
      >
        <Phone className="h-6 w-6" />
        {text}
        <ArrowRight className="h-5 w-5" />
      </a>
    )
  }
  
  // Primary variant (default)
  return (
    <a 
      href={calendlyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all inline-flex items-center gap-3 animate-pulse ${className}`}
    >
      <Phone className="h-6 w-6" />
      {text}
      <ArrowRight className="h-5 w-5" />
    </a>
  )
}