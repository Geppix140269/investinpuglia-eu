'use client'

import Link from 'next/link'
import { MessageSquare, Calendar, ArrowRight } from 'lucide-react'

interface ConsultationCTAProps {
  variant?: 'primary' | 'secondary' | 'inline' | 'banner'
  text?: string
  className?: string
}

export default function ConsultationCTA({ 
  variant = 'primary', 
  text = 'Book FREE Consultation',
  className = ''
}: ConsultationCTAProps) {
  
  if (variant === 'banner') {
    return (
      <div className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-xl ${className}`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold mb-2">Get Your FREE Expert Consultation</h3>
            <p className="text-white/90">Discover how to access €200K-€2M in EU grants for your investment</p>
          </div>
          <a 
            href="https://calendly.com/investinpuglia/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all inline-flex items-center gap-2 animate-pulse"
          >
            <MessageSquare className="h-5 w-5" />
            Start Now
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    )
  }
  
  if (variant === 'inline') {
    return (
      <Link 
        href="/consultation"
        className={`text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-2 ${className}`}
      >
        <Calendar className="h-4 w-4" />
        {text}
        <ArrowRight className="h-4 w-4" />
      </Link>
    )
  }
  
  if (variant === 'secondary') {
    return (
      <Link 
        href="/consultation"
        className={`bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-full font-bold hover:bg-blue-50 transition-all inline-flex items-center gap-2 ${className}`}
      >
        <MessageSquare className="h-5 w-5" />
        {text}
        <ArrowRight className="h-4 w-4" />
      </Link>
    )
  }
  
  // Primary variant (default)
  return (
    <Link 
      href="/consultation"
      className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all inline-flex items-center gap-2 animate-pulse ${className}`}
    >
      <MessageSquare className="h-5 w-5" />
      {text}
      <ArrowRight className="h-4 w-4" />
    </Link>
  )
}