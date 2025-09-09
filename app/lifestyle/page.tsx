// app/lifestyle/page.tsx  
// Lifestyle & Living Focus for in-puglia.com / www.in-puglia.com
'use client'

import { useState, useEffect } from 'react'
import Icon from '@/lib/iconMappings'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const LoadingSkeleton = () => (
  <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
)

const FAQ = dynamic(
  () => import('@/components/sections/FAQ'),
  { loading: () => <LoadingSkeleton />, ssr: false }
)

export default function LifestylePugliaPage() {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])
  
  return (
    <main className="min-h-screen">
      {/* Hero Section - Lifestyle Focus */}
      <section className="relative min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 overflow-hidden">
        {/* Mediterranean pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-5 pt-32 pb-20">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-orange-500/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
              <Icon name="Sun" size={16} className="text-orange-600" />
              <span className="text-sm font-medium text-orange-700">La Dolce Vita Awaits</span>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-light text-gray-900 leading-tight mb-6">
              Your Dream Life in<br />
              <span className="font-bold bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
                Puglia Starts Here
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mb-12">
              From finding your perfect trullo to navigating Italian bureaucracy, 
              I make your Mediterranean dream a stress-free reality.
            </p>
            
            {/* Lifestyle Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <Icon name="Home" size={32} className="text-orange-500 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Find Your Home</h3>
                <p className="text-sm text-gray-600">Trulli, masserias, or modern villas - matched to your lifestyle</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <Icon name="Heart" size={32} className="text-rose-500 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Live Like a Local</h3>
                <p className="text-sm text-gray-600">Connect with communities, find schools, join Italian life</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <Icon name="Sparkles" size={32} className="text-amber-500 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Stress-Free Move</h3>
                <p className="text-sm text-gray-600">From visas to utilities, everything handled for you</p>
              </div>
            </div>
            
            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-full font-semibold text-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                Start Your Puglia Journey
              </button>
              <button className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg border-2 border-gray-200 hover:border-orange-400 hover:shadow-lg transition-all duration-200">
                Download Living Guide
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Your New Life */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Everything You Need to <span className="font-bold text-orange-500">Live Your Dream</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              More than property - it's your complete lifestyle transformation
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Before You Arrive</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Icon name="CheckCircle" size={24} className="text-green-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Property Matching</h4>
                    <p className="text-gray-600">Find homes that match your lifestyle, not just your budget</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Icon name="CheckCircle" size={24} className="text-green-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Virtual Tours</h4>
                    <p className="text-gray-600">Explore properties and neighborhoods from anywhere</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Icon name="CheckCircle" size={24} className="text-green-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Legal Preparation</h4>
                    <p className="text-gray-600">Visa assistance, tax planning, and documentation</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">After You Arrive</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Icon name="CheckCircle" size={24} className="text-green-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Settling In Services</h4>
                    <p className="text-gray-600">Bank accounts, utilities, internet, healthcare registration</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Icon name="CheckCircle" size={24} className="text-green-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Community Integration</h4>
                    <p className="text-gray-600">Language tutors, social clubs, local connections</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Icon name="CheckCircle" size={24} className="text-green-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Ongoing Support</h4>
                    <p className="text-gray-600">Property management, renovation oversight, emergency help</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Success Stories */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-rose-50">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Living Their <span className="font-bold text-rose-500">Best Life</span>
            </h2>
            <p className="text-xl text-gray-600">Real stories from your future neighbors</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  JM
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">James & Mary</h4>
                  <p className="text-sm text-gray-600">London → Ostuni</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Giuseppe didn't just find us a house, he found us a new life. 
                Our kids are in local schools, we're part of the community, 
                and we've never been happier."
              </p>
              <p className="text-sm text-orange-500 mt-4">Moved 2023 • Restored Trullo</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  SF
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Sophie & Frank</h4>
                  <p className="text-sm text-gray-600">Amsterdam → Monopoli</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The lifestyle guide was invaluable. We knew exactly what to expect, 
                where to shop, how to navigate healthcare. It made the transition seamless."
              </p>
              <p className="text-sm text-orange-500 mt-4">Moved 2024 • Seaside Villa</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  RK
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Robert & Karen</h4>
                  <p className="text-sm text-gray-600">New York → Lecce</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "From visa help to finding our dream masseria, every step was handled. 
                We're now running a successful B&B and living the dream."
              </p>
              <p className="text-sm text-orange-500 mt-4">Moved 2022 • Masseria B&B</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Lifestyle Package */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Your Complete <span className="font-bold">Puglia Life Package</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Everything you need for a perfect transition to Italian living
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="text-xl font-bold mb-4 text-orange-400">Pre-Move Support</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-400 mt-0.5" />
                    <span>Property search & virtual tours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-400 mt-0.5" />
                    <span>Legal & visa assistance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-400 mt-0.5" />
                    <span>Financial planning & tax advice</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-400 mt-0.5" />
                    <span>School & healthcare research</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4 text-orange-400">Post-Move Support</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-400 mt-0.5" />
                    <span>Utilities & services setup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-400 mt-0.5" />
                    <span>Community introductions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-400 mt-0.5" />
                    <span>Language support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-400 mt-0.5" />
                    <span>24/7 emergency assistance</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-10 pt-10 border-t border-white/20">
              <p className="text-2xl font-bold mb-2">Complete Lifestyle Package: €4,500</p>
              <p className="text-gray-300">Or choose individual services as needed</p>
              <button className="mt-6 px-8 py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-full font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200">
                Start Your New Life
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Suspense fallback={<LoadingSkeleton />}>
        <FAQ />
      </Suspense>
    </main>
  )
}