// components/sections/HeroSection.tsx
'use client'

import Icon from '@/lib/iconMappings'
import CTAButton from '@/components/CTAButton'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Elegant gradient accent - subtle and professional */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-emerald-50 to-purple-50 blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-50 to-teal-50 blur-3xl opacity-30"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 text-center">
        {/* Premium badge */}
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
          <Icon name="Shield" size={16} className="text-emerald-600" />
          <span>Trusted by 100+ International Investors</span>
        </div>
        
        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-6 leading-tight">
          Don't Risk Your Investment<br />
          <span className="font-bold bg-gradient-to-r from-emerald-600 to-purple-600 bg-clip-text text-transparent">
            Work with Puglia's Trusted Experts
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto mb-10">
          Save €100,000s and Years of Mistakes with Professional Guidance. 
          We connect you with verified local architects, engineers, and grant specialists.
        </p>
        
        {/* CTA Buttons - More prominent */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <CTAButton 
            variant="custom"
            href="/calculator"
            text="Check Your Grant Eligibility"
            location="hero"
            className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all text-lg hover:scale-105 hover:from-emerald-700 hover:to-emerald-800"
          />
          <a 
            href="https://calendly.com/investinpuglia/30min" 
            className="bg-white text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all text-lg hover:scale-105 hover:border-gray-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Free Consultation →
          </a>
        </div>
        
        {/* Trust indicators with better styling */}
        <div className="flex flex-wrap justify-center gap-8 text-gray-600 text-sm">
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
            <Icon name="Check" size={20} className="text-emerald-600" />
            <span className="font-medium">€50M+ Grants Secured</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
            <Icon name="Check" size={20} className="text-emerald-600" />
            <span className="font-medium">100% Success Rate</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
            <Icon name="Check" size={20} className="text-emerald-600" />
            <span className="font-medium">Verified Local Experts</span>
          </div>
        </div>
      </div>
      
      {/* Subtle pattern overlay for texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
           }}
      />
    </section>
  )
}
