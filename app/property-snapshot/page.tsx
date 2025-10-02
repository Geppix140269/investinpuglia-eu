'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle, AlertTriangle, Euro, FileSearch, Clock } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ROISavingsTable from '@/components/ROISavingsTable'

export default function PropertySnapshotPage() {
  const roiRows = [
    { riskAvoided: "Buying property with hidden structural issues", potentialSavings: "€50K-€100K" },
    { riskAvoided: "Property not eligible for grants", potentialSavings: "€350K-€2.25M lost" },
    { riskAvoided: "Overpaying due to foreigner premium", potentialSavings: "€30K-€80K" },
    { riskAvoided: "Legal issues (liens, ownership disputes)", potentialSavings: "€20K-€100K" }
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 to-purple-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-4 -right-4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-yellow-400 text-slate-900 px-4 py-2 rounded-full font-bold mb-6">
              TIER 0 - Entry Level Service
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Property Snapshot Analysis
            </h1>

            <p className="text-2xl text-indigo-200 mb-4">
              Test My Expertise for Just €500
            </p>

            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Have a specific property in mind? I'll analyze it thoroughly in 7 days - hidden costs, grant eligibility, red flags. If I save you from one bad decision, this pays for itself 100X.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://buy.stripe.com/aFa9AV4Og9W0eqi40y08g09"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-yellow-400 text-slate-900 py-4 px-8 rounded-lg font-bold hover:bg-yellow-300 transition-all text-lg shadow-xl"
              >
                Pay Now - €500 <ArrowRight className="inline-block ml-2 h-5 w-5" />
              </a>
              <Link
                href="/contact"
                className="inline-block bg-white/10 backdrop-blur-sm text-white py-4 px-8 rounded-lg font-semibold hover:bg-white/20 transition-all text-lg border-2 border-white"
              >
                Ask a Question First
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">What You Get</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <FileSearch className="h-12 w-12 text-indigo-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">Comprehensive Property Analysis</h3>
                <p className="text-gray-700 mb-4">
                  I'll analyze the specific property you're considering - not just generic advice, but detailed assessment of THIS property.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Hidden costs breakdown (renovation, permits, legal fees, utilities)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Grant eligibility assessment (€350K-€2.25M potential)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Red flags report (structural, legal, market concerns)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">"Should you proceed or walk away?" recommendation</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <Clock className="h-12 w-12 text-indigo-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">Fast Turnaround</h3>
                <p className="text-gray-700 mb-4">
                  Within 7-10 days, you'll receive a detailed written report covering all aspects of the property.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Market value assessment vs. asking price</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Estimated total investment required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Timeline and permit complexity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Risk rating and mitigation strategies</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">The ROI is Obvious</h2>
            <p className="text-xl text-gray-600 text-center mb-12">
              If I save you from ONE bad decision, this analysis pays for itself 100-1000X
            </p>

            <ROISavingsTable
              investment="€500"
              rows={roiRows}
              roiMultiple="100X-1000X"
            />

            <div className="mt-12 bg-indigo-50 rounded-xl p-8 border-l-4 border-indigo-600">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Real Example:</h3>
              <p className="text-gray-700 leading-relaxed">
                A UK investor was ready to purchase a €400K masseria in Ostuni. My €500 analysis revealed:
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Structural issues requiring €80K in immediate repairs</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Property NOT eligible for Mini PIA grants (€350K lost potential)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Legal dispute with neighbor over access road</span>
                </li>
              </ul>
              <p className="mt-4 font-semibold text-gray-900">
                They walked away and avoided a €200K+ mistake. Best €500 they ever spent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ideal For */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Who This Is For</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-green-600">✓ Ideal For:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">First-time Italian property investors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Anyone considering a specific property</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Those who want to "test" my expertise before larger commitment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Risk-averse buyers who need confidence before proceeding</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-red-600">✗ Not Suitable For:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span className="text-gray-700">Those who haven't identified any properties yet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span className="text-gray-700">Those looking for comprehensive market research (see Tier 1)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span className="text-gray-700">Projects already under contract</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Next Steps After Property Snapshot</h2>
            <p className="text-xl text-gray-200 mb-8">
              If the property checks out, you can:
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">Proceed Alone</h3>
                <p className="text-gray-200 text-sm">
                  Take my report and handle the purchase yourself (though you'll miss out on grant support and team assembly)
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 ring-2 ring-yellow-400">
                <h3 className="text-xl font-bold mb-3">Hire Me for Tier 1</h3>
                <p className="text-gray-200 text-sm">
                  Get comprehensive market research, fiscal setup, and decision framework (€2,500)
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">Hire Me for Tier 2</h3>
                <p className="text-gray-200 text-sm">
                  Full orchestration - property acquisition, grants, team assembly (2.5-3.5%)
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://buy.stripe.com/aFa9AV4Og9W0eqi40y08g09"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-yellow-400 text-slate-900 py-4 px-8 rounded-lg font-bold hover:bg-yellow-300 transition-all text-lg shadow-xl"
              >
                Pay Now - €500 <ArrowRight className="inline-block ml-2 h-5 w-5" />
              </a>
              <Link
                href="/pricing"
                className="inline-block bg-white text-indigo-900 py-4 px-8 rounded-lg font-bold hover:bg-gray-100 transition-all text-lg"
              >
                Compare All Service Tiers
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
