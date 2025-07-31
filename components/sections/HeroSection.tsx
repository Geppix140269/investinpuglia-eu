// components/sections/HeroSection.tsx
'use client'

import Icon from '@/lib/iconMappings'
import CTAButton from '@/components/CTAButton'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-purple-50 to-emerald-50">
      {/* Gradient orbs matching other sections */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 text-center">
        {/* Premium badge matching other sections */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-5 py-2 rounded-full text-sm font-semibold mb-8 shadow-lg">
          <Icon name="Shield" size={20} />
          ESTABLISHED 2024 • PUGLIA, ITALY
        </div>

        {/* Main Title - Professional but matching style */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-gray-900 mb-8 leading-tight">
          Puglia Investment 
          <span className="block font-bold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">
            Advisors
          </span>
        </h1>

        {/* Service Categories with consistent styling */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-gray-600 mb-10 text-lg md:text-xl">
          <span className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/50 shadow-md">Real Estate</span>
          <span className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/50 shadow-md">M&A</span>
          <span className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/50 shadow-md">Corporate Development</span>
          <span className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/50 shadow-md">EU Funding</span>
        </div>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto mb-12">
          Strategic advisory services for international investors
          seeking opportunities in Southern Italy
        </p>

        {/* CTA Buttons matching other sections' style */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <CTAButton
            variant="custom"
            href="/contact"
            text="Schedule Consultation"
            location="hero"
            className="bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all text-lg hover:scale-105"
          />
          <a
            href="/calculator"
            className="bg-white/70 backdrop-blur-sm text-gray-900 border border-white/50 px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all text-lg hover:scale-105"
          >
            EU Grant Analysis →
          </a>
        </div>

        {/* Trust indicators matching the style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <div className="text-3xl font-light text-gray-900 mb-2">€127M+</div>
            <div className="text-sm text-gray-600">Facilitated Investments</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <div className="text-3xl font-light text-gray-900 mb-2">500+</div>
            <div className="text-sm text-gray-600">Client Engagements</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <div className="text-3xl font-light text-gray-900 mb-2">100%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
        </div>
      </div>
    </section>
  )
}
