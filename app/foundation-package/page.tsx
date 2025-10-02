'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle, Euro, Search, FileText, Building } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ROISavingsTable from '@/components/ROISavingsTable'

export default function FoundationPackagePage() {
  const roiRows = [
    { riskAvoided: "3 trips to Italy (flights, hotels, time)", potentialSavings: "€6,000" },
    { riskAvoided: "Hiring wrong professionals", potentialSavings: "€20K-€50K" },
    { riskAvoided: "Missing grant deadlines", potentialSavings: "€200K-€500K" },
    { riskAvoided: "Fiscal/banking setup mistakes", potentialSavings: "€5K-€10K" },
    { riskAvoided: "Market research (200 hours @ €100/hr)", potentialSavings: "€20K+" }
  ];

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-indigo-900 to-purple-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-yellow-400 text-slate-900 px-4 py-2 rounded-full font-bold mb-6">
              TIER 1 - Foundation Service
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Investment Foundation Package
            </h1>

            <p className="text-2xl text-indigo-200 mb-4">
              €2,500 | 30-45 Days
            </p>

            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              30-45 days of market research, property options, fiscal setup, and decision framework. What takes others 6 months and €50K in mistakes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://buy.stripe.com/28E14p94w0lq81Ucx408g0a"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-yellow-400 text-slate-900 py-4 px-8 rounded-lg font-bold hover:bg-yellow-300 transition-all text-lg shadow-xl"
              >
                Pay Now - €2,500 <ArrowRight className="inline-block ml-2 h-5 w-5" />
              </a>
              <Link
                href="/contact"
                className="inline-block bg-white/10 backdrop-blur-sm text-white py-4 px-8 rounded-lg font-semibold hover:bg-white/20 transition-all text-lg border-2 border-white"
              >
                Ask Questions First
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">What You Get</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-indigo-50 rounded-xl p-6">
                <Search className="h-12 w-12 text-indigo-600 mb-4" />
                <h3 className="text-xl font-bold mb-4">Part A: Market Intelligence</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Custom property search (5-8 options matching your criteria)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Comparative market analysis for each property</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>ROI projections per property with realistic assumptions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Grant eligibility matrix (which properties qualify for which grants)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Hidden costs assessment for all options</span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-50 rounded-xl p-6">
                <Building className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold mb-4">Part B: Foundation Setup</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Fiscal code (codice fiscale) process coordination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Bank account opening coordination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Introduction to my vetted lawyer (for entity setup if needed)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Initial real estate agent vetting and briefing</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-xl p-6">
                <FileText className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-4">Part C: Decision Framework</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Investment decision matrix comparing all options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Risk assessment per property (what could go wrong)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Timeline and budget framework per option</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>"Which property should you buy?" recommendation with rationale</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">ROI: 100X-234X</h2>
            <ROISavingsTable investment="€2,500" rows={roiRows} roiMultiple="100X-234X" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Build Your Foundation?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://buy.stripe.com/28E14p94w0lq81Ucx408g0a"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-yellow-400 text-slate-900 py-4 px-8 rounded-lg font-bold hover:bg-yellow-300 transition-all text-lg shadow-xl"
            >
              Pay Now - €2,500 <ArrowRight className="inline-block ml-2 h-5 w-5" />
            </a>
            <Link
              href="/pricing"
              className="inline-block bg-white text-indigo-900 py-4 px-8 rounded-lg font-bold hover:bg-gray-100 transition-all text-lg"
            >
              Compare Service Tiers
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
