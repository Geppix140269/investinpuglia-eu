'use client'

import Link from 'next/link'

export default function ServicesPage() {
  const phases = [
    {
      phase: 1,
      title: "Property Search & Planning",
      icon: "🔍",
      price: "€1,500",
      duration: "2-4 weeks",
      description: "Property evaluation, search, and initial project planning",
      features: [
        "Property evaluation based on client's criteria",
        "Search properties by budget, location, and requirements",
        "Market analysis and investment opportunity assessment",
        "Basic business and project plan development",
        "Timeline and milestone planning",
        "Preparation for offer to seller",
        "Full access to Apulink.com platform",
        "Initial grant eligibility verification"
      ],
      stripeUrl: process.env.NEXT_PUBLIC_STRIPE_PHASE1_URL,
      cta: "Start Property Search",
      highlight: false
    },
    {
      phase: 2,
      title: "Negotiation & Due Diligence",
      icon: "📊",
      price: "€3,500",
      duration: "4-6 weeks",
      description: "Property negotiation and comprehensive legal/technical support",
      features: [
        "Property price negotiation with sellers",
        "Legal assistance for property assessment",
        "Administrative support for all requirements",
        "Virtual team of technical professionals",
        "Architectural and structural evaluations",
        "Due diligence coordination",
        "Document preparation and review",
        "Preliminary agreement preparation"
      ],
      stripeUrl: process.env.NEXT_PUBLIC_STRIPE_PHASE2_URL,
      cta: "Begin Negotiation Support",
      highlight: false
    },
    {
      phase: 3,
      title: "Preliminary Agreement",
      icon: "✍️",
      price: "€2,500",
      duration: "2-3 weeks",
      description: "Signing of preliminary agreement with milestone-based approach",
      features: [
        "Preliminary agreement finalization",
        "Legal review and notary coordination",
        "Milestone planning agreed with client",
        "Deposit and payment structuring",
        "Risk assessment and mitigation",
        "Contract registration support",
        "Next phase planning and preparation"
      ],
      stripeUrl: process.env.NEXT_PUBLIC_STRIPE_PHASE3_URL,
      cta: "Secure Preliminary Agreement",
      highlight: false
    }
  ]

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-700 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-tight">
              Project Coordination Services
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100 max-w-4xl mx-auto font-light">
              Structured, phased approach to your Puglia investment journey with transparent pricing and success-based partnership options
            </p>
            <div className="mt-8">
              <Link 
                href="/project-agreement"
                className="inline-flex items-center text-emerald-200 hover:text-white transition-colors duration-200 font-medium"
              >
                View Project Management Agreement
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-light text-emerald-600 mb-2">€2.25M+</div>
              <div className="text-sm text-gray-600">Available Grant Funding</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-light text-emerald-600 mb-2">7%</div>
              <div className="text-sm text-gray-600">Flat Tax Rate for Foreign Investors</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-light text-emerald-600 mb-2">100%</div>
              <div className="text-sm text-gray-600">Dashboard Access via InvestInPuglia.eu</div>
            </div>
          </div>
        </div>
      </section>

      {/* Phases Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Phase 1: From Search to Preliminary Agreement
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              €7,500 total investment to secure your property with professional support at every step
            </p>
            <p className="text-sm text-emerald-600 mt-2">
              Phase 1 (€1,500) → Phase 2 (€3,500) → Phase 3 (€2,500)
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {phases.map((service, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                  service.highlight ? 'ring-2 ring-emerald-500 transform lg:scale-105' : ''
                }`}
              >
                {service.highlight && (
                  <div className="absolute -top-px left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400"></div>
                )}
                {service.highlight && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-sm text-gray-500 font-medium">Phase {service.phase}</span>
                      <h3 className="text-2xl font-semibold text-gray-900 mt-1">{service.title}</h3>
                    </div>
                    <div className="text-4xl">{service.icon}</div>
                  </div>

                  <div className="mb-6">
                    {service.isSuccessBased ? (
                      <div>
                        <p className="text-2xl font-light text-gray-900">{service.price}</p>
                        <p className="text-sm text-emerald-600 mt-1">5% of secured grants</p>
                      </div>
                    ) : (
                      <p className="text-3xl font-light text-gray-900">{service.price}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-2">Duration: {service.duration}</p>
                  </div>

                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {index === 0 ? (
                    <Link 
                      href="/sign-agreement"
                      className="block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all duration-300 bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg animate-pulse"
                    >
                      Sign & Start Now →
                    </Link>
                  ) : service.stripeUrl ? (
                    <a 
                      href={service.stripeUrl}
                      className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                        service.highlight 
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg' 
                          : 'bg-gray-900 text-white hover:bg-gray-800'
                      }`}
                    >
                      {service.cta} →
                    </a>
                  ) : (
                    <Link 
                      href="/contact"
                      className="block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all duration-300 bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 hover:shadow-lg"
                    >
                      {service.cta} →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Phase 2: Grant & Completion Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Phase 2: Grant Approval to Final Deed
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-2">
              Performance-based milestones aligned with your project success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* CUP Milestone */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">📋</span>
                <h3 className="text-xl font-semibold text-gray-900">CUP Approval Milestone</h3>
              </div>
              <div className="mb-4">
                <p className="text-2xl font-light text-emerald-600">€2,500</p>
                <p className="text-sm text-gray-500 mt-1">Upon obtaining CUP from Regione Puglia</p>
              </div>
              <p className="text-gray-600 mb-4">
                Securing the Codice Unico Progetto (CUP) - official grant approval from Regione Puglia
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Complete grant application preparation
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Business plan finalization
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Technical documentation submission
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Regional authority liaison
                </li>
              </ul>
            </div>

            {/* Final Deed Milestone */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">🏡</span>
                <h3 className="text-xl font-semibold text-gray-900">Final Deed & Negotiation Bonus</h3>
              </div>
              <div className="mb-4">
                <p className="text-2xl font-light text-emerald-600">€2,500</p>
                <p className="text-sm text-gray-500 mt-1">Upon final deed signature</p>
                <p className="text-sm text-emerald-600 mt-2 font-medium">
                  + 5% of savings negotiated (if any)
                </p>
              </div>
              <p className="text-gray-600 mb-4">
                Completion of property purchase with performance bonus for price negotiation
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Final deed preparation
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Notary coordination
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Property registration
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Ownership transfer completion
                </li>
              </ul>
              <div className="bg-emerald-50 p-3 rounded mt-4">
                <p className="text-xs text-gray-700">
                  <strong>Example:</strong> Property asking €500,000, negotiated to €450,000 = 
                  €50,000 saved × 5% = €2,500 bonus
                </p>
              </div>
            </div>
          </div>

          {/* Success Fee Section */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-xl p-8 text-white">
            <div className="text-center">
              <span className="text-5xl mb-4 block">🎯</span>
              <h3 className="text-2xl font-semibold mb-3">Success Fee on Grant Funding</h3>
              <p className="text-4xl font-light mb-3">2.5%</p>
              <p className="text-purple-100 mb-6">
                Of the total grant amount received (up to €2.25M available)
              </p>
              <div className="bg-white/10 rounded-lg p-4 max-w-2xl mx-auto">
                <p className="text-sm">
                  <strong>Example:</strong> On a €500,000 grant approval, the success fee would be €12,500, 
                  payable only after funds are received from Regione Puglia. This performance-based model 
                  ensures our interests are fully aligned with your project success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-gray-900 text-center mb-12">
            Your Investment Partner in Puglia
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-light text-emerald-600 mb-3">30+</div>
              <div className="text-sm text-gray-600">Years Executive Experience</div>
            </div>
            <div>
              <div className="text-4xl font-light text-emerald-600 mb-3">€200M+</div>
              <div className="text-sm text-gray-600">Operations Managed</div>
            </div>
            <div>
              <div className="text-4xl font-light text-emerald-600 mb-3">ITC</div>
              <div className="text-sm text-gray-600">Trade Council Member</div>
            </div>
            <div>
              <div className="text-4xl font-light text-emerald-600 mb-3">100%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* International Clients Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-8">
            🌍 International Clients Welcome
          </h2>
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="text-center">
                <span className="text-3xl mb-3 block">📱</span>
                <p className="font-semibold mb-1">Digital Process</p>
                <p className="text-sm text-gray-600">Sign from anywhere, no travel needed</p>
              </div>
              <div className="text-center">
                <span className="text-3xl mb-3 block">⚖️</span>
                <p className="font-semibold mb-1">English Law</p>
                <p className="text-sm text-gray-600">UK company, English jurisdiction</p>
              </div>
              <div className="text-center">
                <span className="text-3xl mb-3 block">💳</span>
                <p className="font-semibold mb-1">Easy Payment</p>
                <p className="text-sm text-gray-600">Stripe, cards, or bank transfer</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-gray-700 mb-4">
                <strong>To get started:</strong> Email us your requirements, receive personalized agreement in 24h, sign digitally, pay €1,500 to begin
              </p>
              <a 
                href="mailto:info@investinpuglia.eu?subject=International%20Client%20Inquiry"
                className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Contact us to begin
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Access Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-6">
            Full Dashboard Access Included
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            All service packages include complete access to the InvestInPuglia.eu platform, 
            providing you with real-time project tracking, document management, and direct 
            communication channels throughout your investment journey.
          </p>
          <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-200">
            <p className="text-gray-700">
              <strong>Platform Features:</strong> Project timeline tracking • Document repository • 
              Secure messaging • Grant application status • Financial projections • 
              Compliance monitoring • Network access
            </p>
          </div>
        </div>
      </section>

      {/* Total Investment Summary */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-gray-900 text-center mb-12">
            Complete Investment Structure
          </h2>
          <div className="bg-gray-50 rounded-xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4 text-gray-900">Initial Investment (Phase 1)</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-700">Property Search & Planning</span>
                    <span className="font-semibold">€1,500</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">Negotiation & Due Diligence</span>
                    <span className="font-semibold">€3,500</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">Preliminary Agreement</span>
                    <span className="font-semibold">€2,500</span>
                  </li>
                  <li className="flex justify-between pt-3 border-t">
                    <span className="text-gray-900 font-semibold">Total to Preliminary</span>
                    <span className="font-bold text-emerald-600">€7,500</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-4 text-gray-900">Grant & Completion (Phase 2)</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-700">CUP Approval (Grant OK)</span>
                    <span className="font-semibold">€2,500</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">Final Deed Signature</span>
                    <span className="font-semibold">€2,500</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">Negotiation Bonus (5% of savings)</span>
                    <span className="font-semibold">Variable</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">Success Fee (2.5% of grant)</span>
                    <span className="font-semibold">Variable</span>
                  </li>
                  <li className="flex justify-between pt-3 border-t">
                    <span className="text-gray-900 font-semibold">Total Phase 2</span>
                    <span className="font-bold text-emerald-600">€5,000 + Variables</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t text-center">
              <p className="text-lg font-light text-gray-700">
                <span className="font-semibold text-2xl text-gray-900">€12,500</span> fixed fees + 
                <span className="font-semibold text-2xl text-emerald-600"> 5%</span> negotiation bonus + 
                <span className="font-semibold text-2xl text-purple-600"> 2.5%</span> grant success fee
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Example: €450,000 property (saved €50,000) + €500,000 grant = €2,500 negotiation bonus + €12,500 grant fee
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
            Ready to Start Your Puglia Investment Journey?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Begin with Phase 1 and discover the perfect property investment opportunity in Southern Italy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/sign-agreement"
              className="inline-block bg-white text-emerald-700 py-4 px-8 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 animate-pulse"
            >
              Sign Agreement Online →
            </Link>
            <Link 
              href="/project-agreement"
              className="inline-block bg-emerald-700 text-white py-4 px-8 rounded-lg font-semibold hover:bg-emerald-800 transition-all duration-300"
            >
              Review Full Terms First
            </Link>
          </div>
        </div>
      </section>

      {/* Stripe Setup Instructions (Hidden in production) */}
      {process.env.NODE_ENV === 'development' && (
        <section className="bg-gray-900 text-white py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">📝 Stripe Payment Links Setup Instructions (Dev Only)</h3>
            <div className="bg-gray-800 rounded-lg p-6 font-mono text-sm">
              <p className="mb-4 text-green-400">To create payment links in Stripe:</p>
              
              <ol className="space-y-4 text-gray-300">
                <li>
                  <strong className="text-white">1. Go to Stripe Dashboard → Payment Links</strong>
                  <br />Navigate to: stripe.com/dashboard/payment-links
                </li>
                
                <li>
                  <strong className="text-white">2. Create Phase 1 Link (€1,500):</strong>
                  <br />• Click "New payment link"
                  <br />• Add product: "Phase 1: Property Search & Planning"
                  <br />• Set price: €1,500 (one-time)
                  <br />• Add description from agreement
                  <br />• Enable "Collect billing address"
                  <br />• Enable "Collect phone number"
                </li>
                
                <li>
                  <strong className="text-white">3. Create Phase 2 Link (€3,500):</strong>
                  <br />• Product: "Phase 2: Negotiation & Due Diligence"
                  <br />• Price: €3,500 (one-time)
                </li>
                
                <li>
                  <strong className="text-white">4. Create Phase 3 Link (€2,500):</strong>
                  <br />• Product: "Phase 3: Preliminary Agreement"
                  <br />• Price: €2,500 (one-time)
                </li>
                
                <li>
                  <strong className="text-white">5. Update .env.local:</strong>
                  <pre className="bg-black p-2 rounded mt-2 overflow-x-auto">
{`NEXT_PUBLIC_STRIPE_PHASE1_URL=https://buy.stripe.com/[your_link_1]
NEXT_PUBLIC_STRIPE_PHASE2_URL=https://buy.stripe.com/[your_link_2]
NEXT_PUBLIC_STRIPE_PHASE3_URL=https://buy.stripe.com/[your_link_3]`}
                  </pre>
                </li>
                
                <li>
                  <strong className="text-white">6. Optional: Add metadata to each link:</strong>
                  <br />• phase: "1.1" / "1.2" / "1.3"
                  <br />• service: "property_search" / "negotiation" / "preliminary"
                  <br />• company: "1402_celsius_ltd"
                </li>
                
                <li>
                  <strong className="text-white">7. Configure success URL:</strong>
                  <br />• Success: {process.env.NEXT_PUBLIC_BASE_URL}/dashboard
                  <br />• Cancel: {process.env.NEXT_PUBLIC_BASE_URL}/services
                </li>
              </ol>
              
              <div className="mt-6 p-4 bg-yellow-900 rounded">
                <p className="text-yellow-300">
                  <strong>Note:</strong> For milestone payments (CUP/Final Deed), use Stripe Invoicing or manual bank transfers as these are triggered by specific events.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}