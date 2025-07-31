// components/sections/HeroSection.tsx
'use client'

import Icon from '@/lib/iconMappings'
import CTAButton from '@/components/CTAButton'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Subtle gradient - more muted for professional look */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-gray-50 to-slate-50 blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-slate-50 to-gray-50 blur-3xl opacity-20"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 text-center">
        {/* Small established badge */}
        <div className="inline-flex items-center gap-2 text-gray-500 text-sm font-light mb-12">
          <span>Established 2018</span>
          <span className="mx-2">•</span>
          <span>Bari, Italy</span>
        </div>

        {/* Main Title - Clean and Professional */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-gray-900 mb-8 leading-tight tracking-tight">
          Puglia Investment Advisors
        </h1>

        {/* Service Categories */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-gray-600 mb-12 text-lg md:text-xl font-light">
          <span>Real Estate</span>
          <span className="text-gray-300">•</span>
          <span>M&A</span>
          <span className="text-gray-300">•</span>
          <span>Corporate Development</span>
          <span className="text-gray-300">•</span>
          <span>EU Funding</span>
        </div>

        {/* Subtle Tagline */}
        <p className="text-xl md:text-2xl text-gray-500 font-light max-w-3xl mx-auto mb-16">
          Strategic advisory services for international investors
          seeking opportunities in Southern Italy
        </p>

        {/* CTA Buttons - Understated */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <CTAButton
            variant="custom"
            href="/contact"
            text="Schedule Consultation"
            location="hero"
            className="bg-gray-900 text-white px-8 py-4 rounded-md font-light hover:bg-gray-800 transition-colors text-base tracking-wide"
          />
          <a
            href="/calculator"
            className="bg-white text-gray-900 border border-gray-300 px-8 py-4 rounded-md font-light hover:bg-gray-50 transition-colors text-base tracking-wide"
          >
            EU Grant Analysis
          </a>
        </div>

        {/* Minimal trust indicators */}
        <div className="mt-20 pt-12 border-t border-gray-100">
          <div className="flex flex-wrap justify-center gap-12 text-gray-400 text-sm font-light">
            <div>
              <div className="text-2xl font-light text-gray-600 mb-1">€127M+</div>
              <div>Facilitated Investments</div>
            </div>
            <div>
              <div className="text-2xl font-light text-gray-600 mb-1">500+</div>
              <div>Client Engagements</div>
            </div>
            <div>
              <div className="text-2xl font-light text-gray-600 mb-1">15+</div>
              <div>Years Combined Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Remove pattern overlay for cleaner look */}
    </section>
  )
}
