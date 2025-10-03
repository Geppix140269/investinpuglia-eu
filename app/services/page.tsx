'use client'

import Link from 'next/link'
import { Building2, FileText, Briefcase, TrendingUp, Shield, Users, CheckCircle, ArrowRight, Star, Award, Clock } from 'lucide-react'

export default function ServicesPage() {
  const serviceTiers = [
    {
      tier: "TIER 0",
      badge: "ENTRY LEVEL SERVICE",
      title: "Property Snapshot",
      price: "€500",
      duration: "7-10 days",
      description: "Test my expertise with a detailed analysis of a specific property - hidden costs, grant eligibility, red flags. Expert validation before you commit.",
      features: [
        "Analysis of the specific property you're considering - not just generic advice, but detailed assessment of THIS property",
        "Grant eligibility assessment (€250k-€2.25M potential)",
        "7-Day turnaround",
        "'Should you proceed or walk away?' recommendation"
      ],
      idealFor: [
        "You've identified a property",
        "Need expert validation",
        "Want to avoid costly mistakes"
      ],
      stripeLink: "https://buy.stripe.com/28E14p94w0lq81Ucx408g0a",
      highlight: false
    },
    {
      tier: "TIER 1",
      badge: "MOST POPULAR",
      title: "Investment Foundation",
      price: "Contact for Pricing",
      duration: "30-45 days",
      description: "Comprehensive market research, property options, local setup, and complete grant mapping. Your strategic foundation for a successful Puglia investment.",
      features: [
        "Custom property research (5-8 properties)",
        "Grant mapping (all applicable programs)",
        "Comparative market analysis",
        "Local bank account setup support",
        "Grant eligibility matrix",
        "Investment decision framework"
      ],
      idealFor: [
        "Serious investors ready to commit",
        "Seeking grant opportunities",
        "Need structured decision-making"
      ],
      stripeLink: "https://buy.stripe.com/28E14p94w0lq81Ucx408g0a",
      highlight: true
    },
    {
      tier: "TIER 2",
      badge: "",
      title: "Full Orchestration",
      price: "Contact for Pricing",
      duration: "6-14 months",
      description: "Complete investment orchestration - property acquisition, grant maximization, project execution, and expert coordination from start to finish.",
      features: [
        "Property negotiation & acquisition",
        "Complete PIA grant application",
        "Architect & contractor vetting",
        "All permits & approvals",
        "Weekly status with clarity",
        "Construction quality assurance"
      ],
      idealFor: [
        "Buyers ready to execute property within 3-6 months",
        "Need full-service orchestration"
      ],
      stripeLink: null,
      highlight: false
    },
    {
      tier: "TIER 3",
      badge: "",
      title: "Project Oversight",
      price: "Contact for Pricing",
      duration: "12+ months",
      description: "Ongoing construction management with weekly site visits, contractor oversight, quality control, and detailed reporting throughout your project.",
      features: [
        "Weekly site visits with reporting",
        "Contractor performance assessment",
        "Budget tracking & reporting",
        "Monthly financial reporting",
        "Grant compliance monitoring"
      ],
      idealFor: [
        "Managing ongoing construction",
        "Need local oversight",
        "Require quality accountability"
      ],
      stripeLink: null,
      highlight: false
    }
  ]

  return (
    <>
      {/* Hero Section - Property Snapshot Analysis */}
      <section className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 text-white py-24 overflow-hidden mt-16">
        <div className="absolute inset-0 bg-black opacity-20"></div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-yellow-400 text-purple-900 px-6 py-2 rounded-full text-sm font-bold mb-6">
              TIER 0 - Entry Level Service
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Property Snapshot Analysis
            </h1>

            <p className="text-2xl md:text-3xl font-bold text-yellow-400 mb-4">
              Test My Expertise for Just €500
            </p>

            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Have a specific property in mind? I'll analyze it thoroughly in 7 days - hidden costs, grant eligibility, red flags. If I save you from one bad decision, this pays for itself 100X.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href="https://buy.stripe.com/28E14p94w0lq81Ucx408g0a"
                className="inline-block bg-yellow-400 text-purple-900 py-4 px-8 rounded-lg font-bold hover:bg-yellow-300 transition-all text-lg shadow-xl"
              >
                Pay Now - €500 →
              </a>
              <Link
                href="/contact"
                className="inline-block bg-transparent border-2 border-white text-white py-4 px-8 rounded-lg font-semibold hover:bg-white hover:text-purple-900 transition-all text-lg"
              >
                Ask a Question First
              </Link>
            </div>

            {/* What You Get */}
            <div className="grid md:grid-cols-2 gap-8 mt-16 text-left">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <FileText className="h-8 w-8 text-yellow-400 mr-3" />
                  <h3 className="text-xl font-bold">Comprehensive Property Analysis</h3>
                </div>
                <ul className="space-y-2 text-purple-100">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Key assumptions (renovation, permits, legal, title, utilities)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Grant eligibility assessment (€250k-€2.25M potential)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Red flags report (structural, legal, market concerns)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span>"Should you proceed or walk away?" recommendation</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Clock className="h-8 w-8 text-yellow-400 mr-3" />
                  <h3 className="text-xl font-bold">Fast Turnaround</h3>
                </div>
                <ul className="space-y-2 text-purple-100">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Within 7-10 days, you'll receive a detailed written report covering all aspects of the property</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Timeline and permit complexity</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Fair market value analysis</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span>10% rating and detailed compliance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Tiers */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Start Small, Scale Smart - Proven Value at Every Step</h2>
            <p className="text-xl text-gray-600">
              Four service tiers designed to meet you where you are in your investment journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {serviceTiers.map((tier, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 ${
                  tier.highlight ? 'ring-2 ring-purple-500 relative transform scale-105' : ''
                }`}
              >
                {tier.badge && (
                  <div className="mb-4">
                    <span className={`${
                      tier.highlight
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600'
                        : 'bg-gray-800'
                    } text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                      {tier.badge}
                    </span>
                  </div>
                )}

                <div className="text-sm font-bold text-purple-600 mb-2">{tier.tier}</div>
                <h3 className="text-2xl font-bold mb-2">{tier.title}</h3>
                <p className="text-3xl font-bold text-gray-900 mb-1">{tier.price}</p>
                <p className="text-sm text-gray-500 mb-4">{tier.duration}</p>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">{tier.description}</p>

                <div className="mb-6">
                  <h4 className="font-bold text-sm mb-3">What You Get:</h4>
                  <ul className="space-y-2">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold text-sm mb-2">Ideal For:</h4>
                  <ul className="space-y-1">
                    {tier.idealFor.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-600">• {item}</li>
                    ))}
                  </ul>
                </div>

                {tier.stripeLink ? (
                  <a
                    href={tier.stripeLink}
                    className={`block text-center py-3 px-6 rounded-lg font-semibold transition-all ${
                      tier.highlight
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    Learn More <ArrowRight className="inline-block ml-2 h-4 w-4" />
                  </a>
                ) : (
                  <Link
                    href="/contact"
                    className="block text-center py-3 px-6 rounded-lg font-semibold transition-all bg-gray-900 text-white hover:bg-gray-800"
                  >
                    Learn More <ArrowRight className="inline-block ml-2 h-4 w-4" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Clients Choose an Orchestrator Over DIY */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Why Clients Choose an Orchestrator Over DIY</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-red-900 mb-4">❌ DIY Risks</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span className="text-gray-700">Miss €250k-€2.25M in available grants</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span className="text-gray-700">Overpay 15-30% without market knowledge</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span className="text-gray-700">Hire wrong contractors (30% cost overrun average)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span className="text-gray-700">Permit delays: 4-18 months vs. 2-4 months</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span className="text-gray-700">Legal/structural issues discovered too late</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-900 mb-4">✅ Orchestrated Benefits</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Average €400k in grants secured (95% success rate)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Negotiation saves 8-15% on purchase price</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Pre-vetted contractors (3x quality assurance)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Fast-tracked permits with authority relationships</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Issues identified early, resolved proactively</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Average ROI: 3-4x Your Investment</h3>
              <p className="text-lg text-gray-700 mb-6">
                Clients typically save €50k-€300k through negotiation, avoid €30k-€100k in mistakes,
                and secure €250k-€2.25M in grants. Total value: €330k-€2.65M on average.
              </p>
              <p className="text-xl font-bold text-purple-900">
                Our fees represent just 2-5% of the total value we create.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Proven Track Record</h2>
              <p className="text-xl text-gray-600">
                Leading foreign investment facilitation in Puglia since 1995
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">€20M+</div>
                <div className="text-gray-600">Grants Secured</div>
              </div>

              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">95%</div>
                <div className="text-gray-600">Grant Success Rate</div>
              </div>

              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">29+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>

              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <Users className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">200+</div>
                <div className="text-gray-600">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Puglia Investment?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Whether you need a quick property analysis or full investment orchestration, we're here to help.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://buy.stripe.com/28E14p94w0lq81Ucx408g0a"
              className="inline-block bg-yellow-400 text-purple-900 py-4 px-8 rounded-lg font-bold hover:bg-yellow-300 transition-all text-lg shadow-xl"
            >
              Property Snapshot - €500
            </a>
            <Link
              href="/contact"
              className="inline-block bg-transparent border-2 border-white text-white py-4 px-8 rounded-lg font-semibold hover:bg-white hover:text-purple-900 transition-all text-lg"
            >
              Schedule Free Consultation
            </Link>
          </div>

          <p className="mt-8 text-purple-200">
            Or call/WhatsApp: +39 351 400 1402
          </p>
        </div>
      </section>
    </>
  )
}
