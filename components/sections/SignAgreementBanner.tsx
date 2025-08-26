'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function SignAgreementBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-white" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="text-center">
            {/* Urgent badge */}
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              <span className="text-white text-sm font-semibold">Limited Time: Special Launch Pricing Available</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-light text-white mb-6">
              Start Your Puglia Property Investment Today
            </h2>
            
            <p className="text-xl md:text-2xl text-emerald-100 mb-8 max-w-3xl mx-auto">
              Join international investors securing prime properties with <strong>€2.25M+ in available grants</strong> and professional support
            </p>

            {/* Value propositions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl mb-2">🏡</div>
                <div className="text-white font-semibold">Property Search</div>
                <div className="text-emerald-100 text-sm">From €1,500</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl mb-2">📄</div>
                <div className="text-white font-semibold">Legal Support</div>
                <div className="text-emerald-100 text-sm">Full assistance</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl mb-2">💰</div>
                <div className="text-white font-semibold">Grant Access</div>
                <div className="text-emerald-100 text-sm">Up to €2.25M</div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/sign-agreement"
                className="group relative inline-flex items-center justify-center bg-white text-emerald-700 py-4 px-8 rounded-lg font-bold hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="absolute inset-0 bg-white rounded-lg animate-pulse"></span>
                <span className="relative flex items-center">
                  ✍️ Sign Agreement & Start Now
                  <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </span>
              </Link>
              
              <Link 
                href="/services"
                className="inline-flex items-center justify-center bg-emerald-800/50 backdrop-blur-sm text-white py-4 px-8 rounded-lg font-semibold hover:bg-emerald-800 transition-all duration-300 border border-white/20"
              >
                View Service Phases
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 flex items-center justify-center gap-8 text-emerald-100">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">100% Online Process</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">UK Law Protection</span>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Secure Stripe Payments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}