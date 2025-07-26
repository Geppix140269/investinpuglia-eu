'use client'

import PropertyInvestmentTimeline from '@/components/PropertyInvestmentTimeline'
import CTAButton from '@/components/CTAButton'

export default function InvestmentProcessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-5">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Your Property Investment Journey in{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Puglia, Italy
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A complete roadmap from initial consultation to property ownership, 
            including the critical steps of obtaining your Fiscal Code and Italian bank account
          </p>
        </div>
      </section>

      {/* Timeline Component */}
      <section className="pb-20 px-5">
        <PropertyInvestmentTimeline />
      </section>

      {/* Additional Info */}
      <section className="pb-20 px-5">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Why These Steps Matter</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600">✓</span>
                <span>We handle your Fiscal Code application remotely - no need to travel</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600">✓</span>
                <span>Italian bank account setup saves thousands in transfer fees</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600">✓</span>
                <span>Mini PIA grants can cover up to 65% of your investment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600">✓</span>
                <span>Complete legal compliance from day one</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Start?</h3>
            <p className="text-gray-700 mb-6">
              Get a personalized timeline for your property investment journey. 
              Our team will guide you through every step.
            </p>
            <CTAButton variant="bookCall" className="w-full justify-center" />
            <div className="mt-4">
              <CTAButton variant="whatsapp" className="w-full justify-center" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
