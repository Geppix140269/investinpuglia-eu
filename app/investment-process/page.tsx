'use client'

import PropertyInvestmentTimeline from '@/components/PropertyInvestmentTimeline'


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
            <a href="https://calendly.com/investinpuglia/30min" target="_blank" rel="noopener noreferrer" className="w-full justify-center inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-xl hover:-translate-y-1 transition-all duration-300">Book Strategy Call</a>
            <div className="mt-4">
              <a href="https://wa.me/393514001402?text=Hi%2C%20I%27m%20interested%20in%20Puglia%20property%20investment%20and%20grants" target="_blank" rel="noopener noreferrer" className="w-full justify-center inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-xl hover:-translate-y-1 transition-all duration-300">WhatsApp Support</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

