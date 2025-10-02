'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function FullOrchestrationPage() {
  return (
    <>
      <Navbar />

      <section className="relative bg-gradient-to-br from-indigo-900 to-purple-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-yellow-400 text-slate-900 px-4 py-2 rounded-full font-bold mb-6">
              TIER 2 - Full Service
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Full Acquisition Orchestration
            </h1>

            <p className="text-2xl text-indigo-200 mb-4">
              2.5-3.5% of Investment | 6-9 Months
            </p>

            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              I orchestrate your entire acquisition, secure your grants, and assemble your team. 6-9 months of expert coordination with zero commission conflicts.
            </p>

            <Link href="/contact" className="inline-block bg-yellow-400 text-slate-900 py-4 px-8 rounded-lg font-bold hover:bg-yellow-300 transition-all text-lg">
              Schedule Orchestration Consultation <ArrowRight className="inline-block ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">What You Get</h2>

            <div className="space-y-8">
              <div className="bg-indigo-50 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">Phase 1: Property Acquisition (Months 1-3)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" /><span>Property negotiation (I negotiate directly as YOUR representative)</span></p>
                    <p className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" /><span>Due diligence management</span></p>
                    <p className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" /><span>Purchase contract review</span></p>
                  </div>
                  <div className="space-y-2">
                    <p className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" /><span>Notary closing coordination</span></p>
                    <p className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" /><span>Utility transfers</span></p>
                    <p className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" /><span>Title transfer</span></p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">Phase 2: Grant Application & Approval (Months 2-6)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <p className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" /><span>Complete Mini PIA grant application</span></p>
                  <p className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" /><span>Technical documentation assembly</span></p>
                  <p className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" /><span>Financial projections and business plan</span></p>
                  <p className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" /><span>Grant approval milestone management</span></p>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">Phase 3: Project Team Setup (Months 4-9)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <p className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" /><span>Architect selection (3+ vetted options)</span></p>
                  <p className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" /><span>Contractor vetting (3+ competitive quotes)</span></p>
                  <p className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" /><span>Contract structuring and negotiation</span></p>
                  <p className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" /><span>Building permit application</span></p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-yellow-50 border-l-4 border-yellow-500 p-6">
              <h3 className="text-xl font-bold mb-2">Milestone-Based Payment (5 Payments):</h3>
              <ul className="space-y-1 text-sm">
                <li>• 30% at contract signing</li>
                <li>• 20% at property acquisition</li>
                <li>• 20% at grant submission</li>
                <li>• 20% at grant approval</li>
                <li>• 10% at team assembly</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Orchestrate Your Investment?</h2>
          <Link href="/contact" className="inline-block bg-yellow-400 text-slate-900 py-4 px-8 rounded-lg font-bold hover:bg-yellow-300 transition-all text-lg">
            Schedule Consultation <ArrowRight className="inline-block ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
