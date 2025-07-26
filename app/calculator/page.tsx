// app/calculator/page.tsx
'use client'

import Image from 'next/image'
import Icon from '@/lib/iconMappings'

export default function CalculatorPage() {
  return (
    <>
      {/* Hero Section with ALL effects */}
      <section className="min-h-screen flex items-center py-20 px-5 relative overflow-hidden bg-gradient-to-br from-[#667eea] via-[#764ba2] via-[#059669] to-[#047857] bg-[length:400%_400%] animate-gradient">
        {/* Animated background elements */}
        <div className="absolute -top-1/2 -right-1/2 w-[200%] h-[200%] opacity-10" 
             style={{
               background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
               animation: 'shimmer 15s linear infinite'
             }} />
        
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="text-center">
            {/* Badge with glow */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-7 py-3 rounded-full text-sm font-bold mb-8 shadow-lg animate-fadeIn">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
              AI-POWERED GRANT ANALYSIS
            </div>
            
            <h1 className="text-4xl md:text-6xl font-light text-white mb-6 animate-fadeIn animation-delay-100">
              Investment <strong className="font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Calculators</strong>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto animate-fadeIn animation-delay-200">
              Choose the perfect tool for analyzing your Italian property investment and PIA grant eligibility
            </p>
            
            {/* Glass morphism box */}
            <div className="inline-block bg-gradient-to-r from-green-400/20 to-emerald-500/10 backdrop-blur-md border border-green-400/30 px-8 py-5 rounded-full mb-10 animate-fadeIn animation-delay-300">
              <p className="text-white text-lg font-semibold flex items-center gap-2 justify-center">
                <Icon name="Banknote" size={24} />
                Calculate up to €3.1M in grants for your property investment
              </p>
            </div>
            
            {/* Feature cards with icons */}
            <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12 animate-fadeIn animation-delay-400">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-4 rounded-2xl text-white text-sm font-medium shadow-lg flex items-center gap-3">
                <Icon name="Check" size={20} />
                Instant Results
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-4 rounded-2xl text-white text-sm font-medium shadow-lg flex items-center gap-3">
                <Icon name="Check" size={20} />
                AI-Powered Analysis
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-4 rounded-2xl text-white text-sm font-medium shadow-lg flex items-center gap-3">
                <Icon name="Check" size={20} />
                Professional Report
              </div>
            </div>
          </div>
          
          {/* New Animated Cards Section */}
          <div className="relative mt-16">
            {/* Gradient blur behind cards */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent blur-3xl" />
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto relative">
              {/* Classic Calculator Card */}
              <div className="group transform hover:scale-105 transition-all duration-300 animate-fadeIn animation-delay-500">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-purple-400/30 shadow-2xl hover:shadow-purple-500/25">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 transition-all duration-300" />
                  
                  {/* Icon section */}
                  <div className="p-8 pb-0 relative z-10">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
                      <Icon name="Calculator" size={40} className="text-white" />
                    </div>
                    
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-200 px-4 py-2 rounded-full text-xs font-bold mb-4">
                      <Icon name="Star" size={16} />
                      MOST POPULAR
                    </div>
                    
                    <h2 className="text-3xl font-bold text-white mb-3">
                      Classic Calculator
                    </h2>
                    
                    <p className="text-white/80 mb-6">
                      Advanced Mini PIA Turismo grant calculator with detailed component breakdown
                    </p>
                    
                    {/* Features list */}
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-center gap-3 text-white/90">
                        <Icon name="CheckCircle" size={20} className="text-green-400" />
                        <span>Detailed grant breakdown</span>
                      </li>
                      <li className="flex items-center gap-3 text-white/90">
                        <Icon name="CheckCircle" size={20} className="text-green-400" />
                        <span>Email report generation</span>
                      </li>
                      <li className="flex items-center gap-3 text-white/90">
                        <Icon name="CheckCircle" size={20} className="text-green-400" />
                        <span>Professional PDF export</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* CTA section with gradient background */}
                  <div className="p-8 pt-0 relative z-10">
                    <a href="/classic" className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-4 rounded-2xl font-bold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 shadow-lg">
                      Open Classic Calculator
                      <Icon name="ArrowRight" size={20} className="inline-block ml-2" />
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Light Calculator Card */}
              <div className="group transform hover:scale-105 transition-all duration-300 animate-fadeIn animation-delay-600">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-xl border border-green-400/30 shadow-2xl hover:shadow-green-500/25">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-600/0 to-emerald-600/0 group-hover:from-green-600/10 group-hover:to-emerald-600/10 transition-all duration-300" />
                  
                  {/* Icon section */}
                  <div className="p-8 pb-0 relative z-10">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
                      <Icon name="Zap" size={40} className="text-white" />
                    </div>
                    
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-200 px-4 py-2 rounded-full text-xs font-bold mb-4">
                      <Icon name="Sparkles" size={16} />
                      QUICK & EASY
                    </div>
                    
                    <h2 className="text-3xl font-bold text-white mb-3">
                      Light Calculator
                    </h2>
                    
                    <p className="text-white/80 mb-6">
                      Streamlined calculator for quick Mini PIA grant estimates
                    </p>
                    
                    {/* Features list */}
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-center gap-3 text-white/90">
                        <Icon name="CheckCircle" size={20} className="text-green-400" />
                        <span>30-second calculation</span>
                      </li>
                      <li className="flex items-center gap-3 text-white/90">
                        <Icon name="CheckCircle" size={20} className="text-green-400" />
                        <span>Instant results</span>
                      </li>
                      <li className="flex items-center gap-3 text-white/90">
                        <Icon name="CheckCircle" size={20} className="text-green-400" />
                        <span>Mobile optimized</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* CTA section with gradient background */}
                  <div className="p-8 pt-0 relative z-10">
                    <a href="https://investiscopeeasy.netlify.app/" target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center py-4 rounded-2xl font-bold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 shadow-lg">
                      Open Light Calculator
                      <Icon name="ExternalLink" size={20} className="inline-block ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom info section */}
          <div className="text-center mt-16 animate-fadeIn animation-delay-700">
            <p className="text-white/80 text-sm mb-4">
              Not sure which calculator to use?
            </p>
            <a href="/contact" className="inline-flex items-center gap-2 text-white font-semibold hover:text-yellow-400 transition-colors">
              <Icon name="MessageCircle" size={20} />
              Chat with our experts
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
