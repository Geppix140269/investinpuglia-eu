/**
 * Advisory Page
 *
 * Marketing page showcasing the 3-Phase Advisory Flow and Savings Calculator.
 * Demonstrates the value proposition of advisory services for Puglia investments.
 *
 * Layout:
 * - Hero section with CTA buttons
 * - Two-column layout (desktop) / stacked (mobile)
 * - Left: Animated AdvisoryFlow component
 * - Right: Interactive SavingsCalculator
 * - Footer: Notes on third-party professionals and contact information
 *
 * Fully responsive, accessible, and optimized for Lighthouse scores.
 */

import { Metadata } from 'next'
import AdvisoryFlow from '@/components/AdvisoryFlow'
import SavingsCalculator from '@/components/SavingsCalculator'
import { Download, Calendar, Mail, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Advisory Services | InvestInPuglia.eu',
  description:
    'From opportunity to funded project — strategy, structuring, delivery. Expert advisory services for property investment in Puglia, Italy.',
  openGraph: {
    title: 'Advisory Services | InvestInPuglia.eu',
    description:
      'Expert advisory services for property investment in Puglia. Strategic engagement, project structuring, and optional delivery coordination.',
    type: 'website'
  }
}

export default function AdvisoryPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 mb-6 leading-tight">
              Project Development & Advisory
              <span className="block text-stone-600 text-3xl sm:text-4xl lg:text-5xl mt-2">
                (Puglia)
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-stone-600 mb-8 leading-relaxed">
              From opportunity to funded project — strategy, structuring, delivery.
              <span className="block mt-2">
                Expert guidance through every phase of your Puglia investment.
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:g.funaro@capitalimprese.it?subject=Advisory%20Services%20Inquiry"
                className="inline-flex items-center gap-3 px-8 py-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-stone-400 focus:ring-offset-2 group"
              >
                <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                Book a Call
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-stone-50 text-stone-900 font-semibold rounded-xl shadow-md hover:shadow-lg border-2 border-stone-300 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-stone-400 focus:ring-offset-2 group"
              >
                <Download className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Two-Column Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Advisory Flow - Circular Interactive Diagram */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-3 text-center">
            InvestInPuglia Working Model for Foreign Investors
          </h2>
          <p className="text-lg text-stone-600 mb-8 text-center">
            Hover over each phase to see detailed deliverables, components, and payment terms
          </p>
          <AdvisoryFlow variant="circle" />
        </div>

        {/* Traditional Flow View */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-3 text-center">
            Process Timeline
          </h2>
          <AdvisoryFlow variant="graph" />
        </div>

        {/* Savings Calculator */}
        <div className="mb-16">
          <SavingsCalculator />
        </div>
      </section>

      {/* How It Works Section (Alternative Card View) */}
      <section className="bg-gradient-to-br from-stone-100 to-stone-50 py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
              Full Process Overview
            </h2>
            <p className="text-lg text-stone-600">
              View all phases in detail with expandable cards
            </p>
          </div>
          <AdvisoryFlow variant="cards" />
        </div>
      </section>

      {/* Third-Party Professionals Note */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-md border border-stone-200 p-6 sm:p-8">
          <h3 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-stone-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Notes on Third-Party Professionals
          </h3>
          <div className="space-y-3 text-stone-700">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-stone-400 rounded-full mt-2 flex-shrink-0" aria-hidden="true" />
              <p>
                <strong className="font-semibold">Chartered Accountant:</strong>{' '}
                Approximately 1.5% of the financed portion. This fee is{' '}
                <span className="text-green-700 font-semibold">grant-eligible</span>.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-stone-400 rounded-full mt-2 flex-shrink-0" aria-hidden="true" />
              <p>
                <strong className="font-semibold">Engineer/Architect:</strong>{' '}
                Approximately 6% of the renovation value. This fee is{' '}
                <span className="text-green-700 font-semibold">grant-eligible</span>.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-stone-400 rounded-full mt-2 flex-shrink-0" aria-hidden="true" />
              <p>
                These are <strong className="font-semibold">separate contracts</strong>,
                payable by the client. Normally, 50% of these fees are eligible under
                applicable grants (Mini PIA, PIA Turismo, ZES Unica).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gradient-to-br from-stone-900 to-stone-800 text-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-stone-300 mb-8 leading-relaxed">
            Get in touch to discuss your investment opportunity in Puglia.
            Professional guidance from initial assessment to project delivery.
          </p>

          {/* Contact Information */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
            <a
              href="mailto:g.funaro@capitalimprese.it"
              className="inline-flex items-center gap-3 text-white hover:text-stone-200 transition-colors group"
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span className="font-semibold">g.funaro@capitalimprese.it</span>
            </a>
            <span className="hidden sm:inline text-stone-500" aria-hidden="true">
              •
            </span>
            <a
              href="https://investinpuglia.eu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-white hover:text-stone-200 transition-colors group"
            >
              <Globe className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span className="font-semibold">investinpuglia.eu</span>
            </a>
          </div>

          {/* Contact Person */}
          <div className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <p className="text-sm text-stone-300">
              Contact{' '}
              <span className="font-bold text-white">Giuseppe Funaro</span>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <p>© {new Date().getFullYear()} InvestInPuglia.eu. All rights reserved.</p>
            <p className="flex items-center gap-2">
              Professional advisory services for Puglia investment projects
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
