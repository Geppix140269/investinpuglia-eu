// components/sections/HeroSection.tsx
'use client'

import Icon from '@/lib/iconMappings'

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-purple-50 to-emerald-50">
      {/* Gradient orbs matching other sections */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 pt-20 sm:pt-24 md:pt-28 text-center">
        {/* Premium badge matching other sections */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-5 py-2 rounded-full text-sm font-semibold mb-6 sm:mb-8 shadow-lg">
          <Icon name="Shield" size={20} />
          ESTABLISHED 2024 • PUGLIA, ITALY
        </div>

        {/* Main Title - Mobile optimized */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-gray-900 mb-6 md:mb-8 leading-tight">
          Puglia Investment 
          <span className="block font-bold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">
            Advisors
          </span>
        </h1>

        {/* Service Categories - Better mobile spacing */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 text-gray-600 mb-8 md:mb-10 text-sm sm:text-base md:text-lg">
          <span className="bg-white/70 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-white/50 shadow-md">Real Estate</span>
          <span className="bg-white/70 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-white/50 shadow-md">M&A</span>
          <span className="bg-white/70 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-white/50 shadow-md">Corporate Development</span>
          <span className="bg-white/70 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-white/50 shadow-md">EU Funding</span>
        </div>

        {/* Subtitle - Better mobile sizing */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto mb-8 md:mb-12 px-4 sm:px-0">
          Strategic advisory services for international investors
          seeking opportunities in Southern Italy
        </p>

        {/* CTA Buttons - Mobile optimized */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 md:mb-16 px-4 sm:px-0">
          <a href="/contact" className="bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:shadow-xl transition-all text-base sm:text-lg hover:scale-105 w-full sm:w-auto inline-flex items-center justify-center">Schedule Consultation</a>
          <a
            href="/calculator"
            className="bg-white/70 backdrop-blur-sm text-gray-900 border border-white/50 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:shadow-lg transition-all text-base sm:text-lg hover:scale-105 w-full sm:w-auto text-center"
          >
            EU Grant Analysis →
          </a>
        </div>

        {/* Trust indicators - Mobile optimized */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto px-4 sm:px-0">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-white/50">
            <Icon name="MapPin" size={32} className="mx-auto mb-2 sm:mb-3 text-purple-600" />
            <div className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">Local Expertise</div>
            <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              On-ground team<span className="hidden sm:inline"><br /></span>
              <span className="inline sm:hidden"> </span>in Puglia
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-white/50">
            <Icon name="Euro" size={32} className="mx-auto mb-2 sm:mb-3 text-emerald-600" />
            <div className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">Grant Specialists</div>
            <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Mini PIA & EU funds<span className="hidden sm:inline"><br /></span>
              <span className="inline sm:hidden"> </span>up to €2.25M
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-white/50">
            <Icon name="Shield" size={32} className="mx-auto mb-2 sm:mb-3 text-purple-600" />
            <div className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">Trusted Network</div>
            <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Regional partnerships<span className="hidden sm:inline"><br /></span>
              <span className="inline sm:hidden"> </span>& institutions
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


