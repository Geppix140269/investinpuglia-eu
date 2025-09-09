// app/investiscope/page.tsx
// Investment Analysis & Due Diligence Focus for investiscope.net
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

export default function InvestiScopePage() {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])
  
  return (
    <main className="min-h-screen">
      {/* Hero Section - Analysis Focus */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-5 pt-32 pb-20">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
              <Icon name="TrendingUp" size={16} />
              <span className="text-sm font-medium">Investment Intelligence Platform</span>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-light leading-tight mb-6">
              See What Others Miss in<br />
              <span className="font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Italian Real Estate
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-12">
              Professional-grade analysis reveals the true investment potential and hidden risks 
              in Puglia properties. Make decisions with institutional-level intelligence.
            </p>
            
            {/* Key Metrics */}
            <div className="grid md:grid-cols-4 gap-6 mb-12 max-w-4xl">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-cyan-400">€2.3M</div>
                <div className="text-sm text-gray-400">Avg. Risk Identified</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-green-400">47%</div>
                <div className="text-sm text-gray-400">Avg. Cost Reduction</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-400">23</div>
                <div className="text-sm text-gray-400">Analysis Points</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-purple-400">48h</div>
                <div className="text-sm text-gray-400">Report Delivery</div>
              </div>
            </div>
            
            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200">
                Get Property Analysis Report
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold text-lg border border-white/30 hover:bg-white/20 transition-all duration-200">
                View Sample Report
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Analysis Framework */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Institutional-Grade <span className="font-bold text-blue-600">Due Diligence</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our proprietary 23-point analysis framework uncovers what traditional valuations miss
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Legal Analysis */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Icon name="Scale" size={24} className="text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Legal & Compliance</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Title chain verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Zoning compliance check</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Outstanding liens search</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Building permit audit</span>
                </li>
              </ul>
            </div>
            
            {/* Financial Analysis */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Icon name="Calculator" size={24} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Financial Modeling</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">True cost projection</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Grant eligibility analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">ROI scenarios (3/5/10 year)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Tax optimization strategy</span>
                </li>
              </ul>
            </div>
            
            {/* Market Analysis */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Icon name="BarChart" size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Market Intelligence</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Comparable analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Tourism demand metrics</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Development pipeline</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Exit strategy options</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* The Report */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-4">
              Your Investment <span className="font-bold">Intelligence Report</span>
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Everything you need to make an informed decision, delivered in 48 hours
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-8">What You Receive:</h3>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Executive Summary</h4>
                  <p className="text-blue-200">Clear go/no-go recommendation with key risks and opportunities</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Financial Analysis</h4>
                  <p className="text-blue-200">Complete cost breakdown, ROI projections, and grant opportunities</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Risk Assessment</h4>
                  <p className="text-blue-200">Detailed analysis of legal, structural, and market risks</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Action Plan</h4>
                  <p className="text-blue-200">Step-by-step roadmap with vetted professional recommendations</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10 p-6 bg-white/10 rounded-xl">
              <p className="text-lg font-semibold mb-2">Investment: €2,500</p>
              <p className="text-blue-200">Average savings identified: €47,000+</p>
              <p className="text-sm text-blue-300 mt-2">ROI: 1,780% on analysis fee alone</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Make Decisions With Confidence
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join smart investors who see the full picture before committing capital
          </p>
          <button className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-semibold text-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200">
            Start Your Property Analysis
          </button>
          <p className="text-gray-500 text-sm mt-4">48-hour delivery • Professional grade • Actionable insights</p>
        </div>
      </section>
      
      <Suspense fallback={<LoadingSkeleton />}>
        <FAQ />
      </Suspense>
    </main>
  )
}