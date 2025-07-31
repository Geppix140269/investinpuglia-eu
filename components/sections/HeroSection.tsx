// components/sections/HeroSection.tsx
'use client'

import { useState } from 'react'
import Icon from '@/lib/iconMappings'
import CTAButton from '@/components/CTAButton'

export default function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-emerald-900">
      {/* Background with better contrast */}
      <div className="absolute inset-0 w-full h-full">
        {/* Darker gradient background as fallback */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-emerald-900"></div>
        
        {/* Video with stronger overlay for text readability */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-50' : 'opacity-0'
          }`}
          poster="/puglia-background-poster.jpg"
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source src="/puglia-background-optimized.webm" type="video/webm" />
          <source src="/puglia-background.mp4" type="video/mp4" />
        </video>
        
        {/* Strong dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 text-center">
        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight">
          Don't Risk Your Investment<br />
          <span className="font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
            Work with Puglia's Trusted Experts
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto mb-10">
          Save €100,000s and Years of Mistakes with Professional Guidance. 
          We connect you with verified local architects, engineers, and grant specialists.
        </p>
        
        {/* Single CTA Button - Clean and Professional */}
        <div className="flex justify-center">
          <CTAButton 
            variant="custom"
            href="/calculator"
            text="Check Your Grant Eligibility"
            location="hero"
            className="bg-white text-purple-900 px-10 py-5 rounded-full font-bold hover:shadow-2xl transition-all text-lg hover:scale-105"
          />
        </div>
        
        {/* Simple trust indicators */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/70 text-sm">
          <div className="flex items-center gap-2">
            <Icon name="Check" size={20} className="text-emerald-400" />
            <span>€50M+ Grants Secured</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Check" size={20} className="text-emerald-400" />
            <span>100% Success Rate</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Check" size={20} className="text-emerald-400" />
            <span>Verified Local Experts</span>
          </div>
        </div>
      </div>
    </section>
  )
}
