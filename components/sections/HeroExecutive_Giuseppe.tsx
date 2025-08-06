// Path: components/sections/HeroExecutive.tsx
'use client'

import { useState, useEffect } from 'react'

const HeroExecutive = () => {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])
  
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 1px, transparent 15px)',
          }}
        />
      </div>
      
      {/* Main Content */}
      <div className="relative flex min-h-screen">
        {/* Left side - Content */}
        <div className="w-full lg:w-1/2 flex items-center px-8 lg:px-20">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Minimal intro */}
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-12">
              International Investment Advisory
            </p>
            
            {/* Main statement */}
            <h1 className="text-4xl lg:text-6xl font-thin text-gray-900 leading-tight mb-8">
              I transform
              <span className="block font-normal text-emerald-600 mt-2">ambition</span>
              <span className="block font-thin text-gray-900 mt-2">into Italian reality</span>
            </h1>
            
            {/* Subtle description */}
            <p className="text-lg text-gray-600 font-light leading-relaxed mb-16 max-w-md">
              Three decades orchestrating nine-figure deals. 
              Now navigating Puglia&apos;s €2.25M grant landscape 
              for a select few.
            </p>
            
            {/* CTA */}
            <div>
              <a 
                href="/consultation"
                className="group inline-flex items-center text-gray-900 hover:text-emerald-600 transition-all duration-300"
              >
                <span className="text-base tracking-wide">Request a Conversation</span>
                <svg 
                  className="ml-3 w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              
              <p className="mt-6 text-sm text-gray-400">
                By invitation or referral only
              </p>
            </div>
            
            {/* Minimal credentials */}
            <div className="mt-24 pt-8 border-t border-gray-100">
              <div className="flex flex-wrap gap-8 text-sm text-gray-400">
                <span>Est. 1994</span>
                <span>Sitges • Taranto • London</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Visual */}
        <div className="hidden lg:block w-1/2 relative bg-gray-50">
          {/* Placeholder for image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              {/* Replace this with your image */}
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <p className="text-gray-300 text-6xl font-thin">Image Here</p>
              </div>
            </div>
          </div>
          
          {/* Subtle overlay text */}
          <div className="absolute bottom-12 left-12 right-12">
            <div className="flex justify-between text-gray-600 text-xs font-light uppercase tracking-widest opacity-50">
              <span>CapitalImprese</span>
              <span>•</span>
              <span>Mari e Trulli</span>
              <span>•</span>
              <span>30 Years</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroExecutive
