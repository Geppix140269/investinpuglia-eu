// app/surveys/page.tsx
'use client'

import { useState } from 'react'

export default function SurveysPage() {
  const [activeTab, setActiveTab] = useState('overview')

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
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white px-7 py-3 rounded-full text-sm font-bold mb-8 shadow-lg animate-fadeIn">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
              PROFESSIONAL DUE DILIGENCE
            </div>
            
            <h1 className="text-4xl md:text-6xl font-light text-white mb-6 animate-fadeIn animation-delay-100">
              Property Survey <strong className="font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Report</strong>
            </h1>
            
            <p className="text-2xl font-light text-white/90 mb-4 animate-fadeIn animation-delay-200">
              "Don't Buy Blind – Buy Smart"
            </p>
            
            <p className="text-lg text-white/80 max-w-3xl mx-auto mb-10 animate-fadeIn animation-delay-200">
              Our comprehensive property survey gives you complete confidence before investing. 
              Know exactly what you're buying, what you can do with it, and what grants you qualify for.
            </p>
            
            {/* Glass morphism box */}
            <div className="inline-block bg-gradient-to-r from-yellow-400/20 to-orange-500/10 backdrop-blur-md border border-yellow-400/30 px-8 py-5 rounded-full mb-10 animate-fadeIn animation-delay-300">
              <p className="text-white text-lg font-semibold">
                🛡️ Save €100,000+ by avoiding costly mistakes
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center animate-fadeIn animation-delay-400">
              <a 
                href="/surveys/order" 
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 px-10 py-5 rounded-full text-lg font-bold hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
              >
                🔘 Order Survey Report
                <span className="text-2xl">→</span>
              </a>
              <a 
                href="/surveys/report" 
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-white/20 transition-all duration-300"
              >
                📄 View Sample Report
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              📋 COMPREHENSIVE ANALYSIS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What's <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">Included</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every property survey includes 12 detailed sections covering all aspects of your investment
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8 hover:-translate-y-1 transition-all">
              <div className="text-4xl mb-4">🏛️</div>
              <h3 className="text-xl font-bold mb-3">Legal & Cadastral</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Ownership verification</li>
                <li>✓ Cadastral conformity</li>
                <li>✓ Zoning compliance</li>
                <li>✓ Heritage constraints</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 hover:-translate-y-1 transition-all">
              <div className="text-4xl mb-4">🔨</div>
              <h3 className="text-xl font-bold mb-3">Technical Assessment</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Structural analysis</li>
                <li>✓ Systems evaluation</li>
                <li>✓ Environmental risks</li>
                <li>✓ Renovation feasibility</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 hover:-translate-y-1 transition-all">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-3">Financial Analysis</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Cost breakdown</li>
                <li>✓ Grant eligibility</li>
                <li>✓ ROI projections</li>
                <li>✓ Market analysis</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              🚀 SIMPLE PROCESS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How It <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Works</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold mb-2">Submit Property</h3>
              <p className="text-gray-600">Share the property listing URL from any Italian real estate portal</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold mb-2">We Investigate</h3>
              <p className="text-gray-600">Our team conducts thorough due diligence and analysis</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold mb-2">Receive Report</h3>
              <p className="text-gray-600">Get your comprehensive report within 5-7 business days</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-bold mb-2">Make Decision</h3>
              <p className="text-gray-600">Invest with confidence knowing all risks and opportunities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-gradient-to-br from-orange-600 to-red-600 text-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Smart Investors Never Skip This Step
            </h2>
            <p className="text-xl opacity-90">
              A property survey costs less than 1% of your investment but can save you from 100% disaster
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">❌ Without Survey</h3>
              <ul className="space-y-3">
                <li>😰 Discover structural issues after purchase</li>
                <li>😰 Miss €800,000 in available grants</li>
                <li>😰 Face unexpected renovation costs</li>
                <li>😰 Legal complications with permits</li>
                <li>😰 Buy in wrong zone for your plans</li>
              </ul>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">✅ With Survey</h3>
              <ul className="space-y-3">
                <li>✨ Know exact renovation costs upfront</li>
                <li>✨ Maximize grant opportunities</li>
                <li>✨ Negotiate better purchase price</li>
                <li>✨ Plan renovations efficiently</li>
                <li>✨ Invest with complete confidence</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <div className="inline-block bg-white/20 backdrop-blur-md rounded-2xl p-8">
              <p className="text-3xl font-bold mb-2">Average Savings: €127,000</p>
              <p className="text-lg opacity-90">Based on avoided issues and captured grants</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              💎 INVESTMENT PROTECTION
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Survey <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Packages</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-xl p-8 hover:-translate-y-2 transition-all">
              <h3 className="text-2xl font-bold mb-4">Basic Survey</h3>
              <div className="text-5xl font-bold text-gray-900 mb-6">€499</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Structural assessment
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Legal status check
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Utilities evaluation
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Market positioning
                </li>
              </ul>
              <a href="/surveys/order" className="block w-full bg-gray-900 text-white text-center py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors">
                Order Basic Survey
              </a>
            </div>
            
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl shadow-xl p-8 hover:-translate-y-2 transition-all relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-4">Complete Analysis</h3>
              <div className="text-5xl font-bold text-gray-900 mb-6">€999</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Everything in Basic
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Renovation cost estimate
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Grant eligibility analysis
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  ROI projections
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  30-min consultation
                </li>
              </ul>
              <a href="/surveys/order" className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-4 rounded-xl font-bold hover:shadow-xl transition-all">
                Order Complete Analysis
              </a>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl shadow-xl p-8 hover:-translate-y-2 transition-all">
              <h3 className="text-2xl font-bold mb-4">Premium Package</h3>
              <div className="text-5xl font-bold text-gray-900 mb-6">€1,499</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Everything in Complete
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Contractor connections
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Grant application support
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Priority processing (3 days)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  90 days of support
                </li>
              </ul>
              <a href="/surveys/order" className="block w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 text-center py-4 rounded-xl font-bold hover:shadow-xl transition-all">
                Order Premium Package
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <div className="text-6xl mb-6">⭐⭐⭐⭐⭐</div>
          <blockquote className="text-2xl font-light mb-8 leading-relaxed">
            "The property survey saved us from a disaster. What looked like a bargain trullo turned out to need 
            €300,000 in structural work. We found a better property and secured €620,000 in grants instead!"
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl font-bold text-gray-900">
              MK
            </div>
            <div className="text-left">
              <div className="font-bold text-lg">Michael K.</div>
              <div className="text-gray-400">Property Investor, UK</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-5">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-3">How long does a property survey take?</h3>
              <p className="text-gray-700">
                Standard surveys are completed within 5-7 business days. Premium package includes priority 
                processing within 3 business days.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-3">Do I need to be in Italy for the survey?</h3>
              <p className="text-gray-700">
                No, our team handles everything remotely. You just need to provide the property listing URL 
                and any specific concerns you have.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-3">What if the survey finds major issues?</h3>
              <p className="text-gray-700">
                That's exactly why you need a survey! We'll help you understand the implications, estimate 
                repair costs, and decide whether to negotiate, proceed, or find a better property.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-3">Can you survey any property in Italy?</h3>
              <p className="text-gray-700">
                We specialize in Puglia but can arrange surveys throughout Southern Italy. Contact us for 
                properties in other regions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-yellow-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Invest with Confidence?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Don't risk your investment. Get the facts before you buy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="/surveys/order" 
              className="inline-flex items-center gap-3 bg-white text-orange-700 px-10 py-5 rounded-full text-lg font-bold hover:bg-gray-100 hover:-translate-y-1 hover:shadow-2xl transition-all"
            >
              Order Property Survey
              <span className="text-2xl">→</span>
            </a>
            <a 
              href="/contact" 
              className="inline-flex items-center gap-3 bg-transparent border-2 border-white text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-white hover:text-orange-700 transition-all"
            >
              Ask Questions First
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
