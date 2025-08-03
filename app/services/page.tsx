const services = [
    {
      title: "EU Grant Advisory",
      icon: "💶",
      price: "Success-based fee",
      description: "Expert guidance through Mini PIA Turismo grants up to €2.25M",
      features: [
        "Complete application strategy",
        "Business plan consultation",
        "Technical documentation guidance",
        "Post-approval advisory"
      ],
      highlight: true
    },
    {
      title: "Investment Strategy Consulting",
      icon: "📊",
      price: "From €999",
      description: "Comprehensive investment evaluation and strategic planning",
      features: [
        "Market opportunity analysis",
        "Investment strategy development",
        "Risk assessment and mitigation",
        "ROI optimization planning"
      ]
    },
    {
      title: "Due Diligence Advisory",
      icon: "🔍",
      price: "From €1,499",
      description: "Strategic guidance for property evaluation and verification",
      features: [
        "Investment risk analysis",
        "Legal compliance review",
        "Strategic recommendations",
        "Negotiation support"
      ]
    },
    {
      title: "Acquisition Strategy",
      icon: "🎯",
      price: "Custom pricing",
      description: "Strategic advisory for property acquisition in Puglia",
      features: [
        "Market positioning strategy",
        "Acquisition planning",
        "Network introductions",
        "Deal structuring advice"
      ]
    },
    {
      title: "Project Development Consulting",
      icon: "🏗️",
      price: "Monthly retainer",
      description: "Strategic oversight for property development projects",
      features: [
        "Development strategy",
        "Vendor selection guidance",
        "Risk management",
        "Progress monitoring"
      ]
    },
    {
      title: "VIP Concierge Advisory",
      icon: "⭐",
      price: "Premium service",
      description: "Exclusive end-to-end investment advisory service",
      features: [
        "Personal investment strategy",
        "Direct access to Giuseppe",
        "Priority support",
        "Comprehensive oversight"
      ]
    }
  ]
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Strategic Advisory Services
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto">
              Expert consulting for successful property investment in Puglia
            </p>
          </div>
        </div>
        
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                  service.highlight ? 'ring-2 ring-emerald-500' : ''
                }`}
              >
                {service.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="p-8">
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-emerald-600 font-semibold text-lg mb-4">{service.price}</p>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="w-5 h-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Italian Investment Journey?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Book a free consultation with our expert team today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-emerald-600 py-4 px-8 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Schedule Consultation
            </button>
            <button className="bg-emerald-700 text-white py-4 px-8 rounded-lg font-semibold hover:bg-emerald-800 transition-all duration-300">
              Download Service Guide
            </button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-emerald-600">250+</div>
              <div className="text-gray-600 mt-2">Properties Analyzed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-600">â‚¬18M+</div>
              <div className="text-gray-600 mt-2">Grants Secured</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-600">47</div>
              <div className="text-gray-600 mt-2">Happy Investors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-600">100%</div>
              <div className="text-gray-600 mt-2">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


