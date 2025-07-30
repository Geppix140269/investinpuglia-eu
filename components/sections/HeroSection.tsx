// components/sections/HeroSection.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Icon from '@/lib/iconMappings'
import CTAButton from '@/components/CTAButton'

export default function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false)

  const openTrullo = () => {
    const trulloButton = document.querySelector('button[aria-label="Open chat"]') as HTMLButtonElement
    if (trulloButton) {
      trulloButton.click()
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background - existing code */}
      <div className="absolute inset-0 w-full h-full">
        {/* ... video code ... */}
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 text-center">
        {/* Glass Badge - Hidden on mobile */}
        <div className="hidden md:inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 animate-fadeIn shadow-xl">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
          TRUSTED ADVISORY • VERIFIED LOCAL EXPERTS • PUGLIA
        </div>
        
        {/* Title and content ... */}
        
        {/* CTA Buttons with Trullo highlight */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn animation-delay-300 mb-8">
          <CTAButton 
            variant="custom"
            href="/calculator"
            text="Check Grant Eligibility"
            location="hero"
            className="bg-white text-purple-700 px-8 py-4 rounded-full font-bold hover:shadow-2xl transition-all text-lg"
          />
          <button
            onClick={openTrullo}
            className="group bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-2xl transition-all text-lg flex items-center justify-center gap-2"
          >
            <span className="text-xl">🤖</span>
            Chat with Trullo AI
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">6 Languages</span>
          </button>
        </div>
        
        {/* Glass Benefits Cards - Hidden on mobile */}
        <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-fadeIn animation-delay-300">
          {/* ... benefits cards ... */}
        </div>
        
        {/* Glass Contact Card - Hidden on mobile */}
        <div className="mt-16 animate-fadeIn animation-delay-500 hidden md:block">
          {/* ... contact card ... */}
        </div>
      </div>
    </section>
  )
}
