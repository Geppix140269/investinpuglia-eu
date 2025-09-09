// components/sections/HeroSection_TrustCentered.tsx
'use client'

import { useState, useEffect } from 'react'
import Icon from '@/lib/iconMappings'

export default function HeroSectionTrustCentered() {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])
  
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #10b981 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse" />
      
      <div className="relative max-w-7xl mx-auto px-5 pt-32 pb-20">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-600/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
            <Icon name="Shield" size={16} className="text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">Your Personal Investment Advocate</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-light text-gray-900 leading-tight mb-6">
            I Protect Your Capital,<br />
            <span className="font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Maximize Your Returns
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mb-12">
            35 years preventing the costly mistakes that destroy foreign investments in Italy. 
            I solve problems others can't, negotiate like it's my money, and guarantee every professional I recommend.
          </p>
          
          {/* Value Props */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="XCircle" size={20} className="text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">€5M+ Saved</h3>
                <p className="text-sm text-gray-600">Through expert negotiation and risk prevention</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="CheckCircle" size={20} className="text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Zero Failures</h3>
                <p className="text-sm text-gray-600">In my personally-vetted professional network</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Users" size={20} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Exclusive Access</h3>
                <p className="text-sm text-gray-600">To professionals unavailable elsewhere</p>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full font-semibold text-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
              Get Your Free Investment Risk Report
            </button>
            <button className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg border-2 border-gray-200 hover:border-emerald-400 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
              See How I Protect Clients
            </button>
          </div>
          
          {/* Trust Elements */}
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Icon name="Shield" size={16} />
              <span>Personal Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Clock" size={16} />
              <span>Response in 24h</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Lock" size={16} />
              <span>Confidential</span>
            </div>
          </div>
          
        </div>
        
        {/* Problem Statement */}
        <div className="mt-20 bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl border border-white/50">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
            "I've Seen Too Many Investors Lose Fortunes to Preventable Mistakes"
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div>
              <h3 className="font-semibold text-lg text-red-600 mb-3">What Others Don't Tell You:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Icon name="AlertTriangle" size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">60% of foreign investors overpay by 30-50%</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="AlertTriangle" size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">Unvetted contractors disappear with deposits</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="AlertTriangle" size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">Hidden legal issues surface after purchase</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="AlertTriangle" size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">Grant applications fail due to technical errors</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-emerald-600 mb-3">How I Protect You:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle" size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">Personal vetting of every professional</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle" size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">Negotiate prices before you're identified as foreign</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle" size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">Complete due diligence before any commitment</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle" size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">Direct accountability - I stake my reputation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}