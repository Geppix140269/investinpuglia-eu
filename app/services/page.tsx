// Path: app/services/page.tsx
'use client'

import Link from 'next/link'

export default function ServicesPage() {
  const services = [
    {
      title: "Discovery Session",
      icon: "🔍",
      price: "€497",
      description: "Perfect for investors exploring opportunities in Puglia",
      features: [
        "60-minute strategic consultation",
        "Initial grant eligibility assessment",
        "Investment structure recommendations",
        "Preliminary roadmap and next steps"
      ],
      cta: "Book Discovery Session",
      link: "https://buy.stripe.com/test_6oUfZj9bm1trdOOgyV0x200",
      highlight: false,
      premium: false
    },
    {
      title: "Strategy Consultation",
      icon: "📊",
      price: "€997",
      description: "Comprehensive analysis for serious investors ready to move forward",
      features: [
        "90-minute deep-dive consultation",
        "All available grant programs analysis",
        "Tax optimization strategies (7% flat tax)",
        "Detailed action plan with timelines",
        "30-day follow-up support via email"
      ],
      cta: "Book Strategy Session",
      link: "https://buy.stripe.com/test_5kQ8wR5Za5JHaCCgyV0x201",
      highlight: true,
      premium: false
    },
    {
      title: "Implementation Partnership",
      icon: "🚀",
      price: "€4,997 + 5% success fee",
      description: "Full-service support from application to approval",
      features: [
        "Complete grant application management",
        "Direct liaison with Italian authorities",
        "Document preparation and review",
        "Business plan optimization",
        "Ongoing support until approval",
        "Success fee only on grants secured"
      ],
      cta: "Apply for Partnership",
      link: "/contact",
      highlight: false,
      premium: true
    }
  ]

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-light mb-6">
              Investment Advisory Services
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Leverage 30 years of executive experience and €200M+ in managed operations 
              to navigate Puglia&apos;s €2.25M grant opportunities
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ${
                  service.highlight ? 'ring-2 ring-emerald-600 transform scale-105' : ''
                } ${service.premium ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' : ''}`}
              >
                {service.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="p-8">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                  <p className={`text-3xl font-light mb-4 ${service.premium ? 'text-gray-300' : 'text-gray-900'}`}>
                    {service.price}
                  </p>
                  <p className={`mb-6 ${service.premium ? 'text-gray-400' : 'text-gray-600'}`}>
                    {service.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className={`w-5 h-5 mr-2 flex-shrink-0 mt-0.5 ${service.premium ? 'text-emerald-400' : 'text-emerald-600'}`} 
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className={service.premium ? 'text-gray-300' : 'text-gray-700'}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    href={service.link}
                    className={`block w-full text-center py-3 px-6 rounded font-semibold transition-all duration-300 ${
                      service.premium 
                        ? 'bg-white text-gray-900 hover:bg-gray-100' 
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    {service.cta} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-12">Why Choose Giuseppe Funaro</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-5xl font-light text-emerald-600 mb-4">30+</div>
              <div className="text-lg text-gray-600">Years C-Level Experience</div>
            </div>
            <div>
              <div className="text-5xl font-light text-emerald-600 mb-4">€200M+</div>
              <div className="text-lg text-gray-600">Operations Managed</div>
            </div>
            <div>
              <div className="text-5xl font-light text-emerald-600 mb-4">70,000+</div>
              <div className="text-lg text-gray-600">Business Network (CapitalImprese)</div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-6">
              All consultations include access to my exclusive network of pre-vetted Italian professionals 
              and direct connections through CapitalImprese
            </p>
            <div className="flex justify-center items-center gap-6 text-sm text-gray-500">
              <span>Trilingual Support</span>
              <span>•</span>
              <span>International Trade Council Member</span>
              <span>•</span>
              <span>Mari e Trulli Founder</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-700 py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
            Ready to Unlock Your Puglia Investment Opportunity?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Don&apos;t navigate Italian bureaucracy alone. Let three decades of experience guide you.
          </p>
          <a 
            href="https://calendly.com/investinpuglia/30min"
            className="inline-block bg-white text-emerald-700 py-4 px-8 rounded font-semibold hover:shadow-xl transition-all duration-300"
          >
            Schedule Your Initial Consultation →
          </a>
        </div>
      </section>
    </div>
  )
}
