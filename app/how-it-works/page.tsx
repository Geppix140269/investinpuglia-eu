// PATH: app/how-it-works/page.tsx
import { Metadata } from 'next'
import { 
  Phone, 
  Search, 
  FileCheck, 
  Users,
  TrendingUp,
  Shield,
  CheckCircle,
  ArrowRight
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'How It Works | InvestInPuglia - Our Investment Advisory Process',
  description: 'Discover how InvestInPuglia guides you through property and business investments in Puglia. Our step-by-step process ensures successful investment outcomes.',
  keywords: 'investment process, how InvestInPuglia works, property investment steps, business advisory process, Puglia investment guide',
  openGraph: {
    title: 'How InvestInPuglia Works - Investment Advisory Process',
    description: 'Learn about our comprehensive investment advisory process for property and business opportunities in Puglia, Italy.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'it_IT',
    siteName: 'InvestInPuglia',
    images: [
      {
        url: '/og-how-it-works.jpg',
        width: 1200,
        height: 630,
        alt: 'InvestInPuglia Investment Process'
      }
    ]
  },
  alternates: {
    canonical: 'https://investinpuglia.eu/how-it-works',
    languages: {
      'en': 'https://investinpuglia.eu/en/how-it-works',
      'it': 'https://investinpuglia.eu/it/how-it-works',
    }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function HowItWorksPage() {
  const steps = [
    {
      number: '01',
      title: 'Initial Consultation',
      description: 'Free 30-minute call to understand your investment goals, budget, and timeline',
      icon: Phone,
      details: [
        'Discuss your investment objectives',
        'Assess your risk tolerance',
        'Identify preferred locations in Puglia',
        'Determine budget and financing needs'
      ]
    },
    {
      number: '02',
      title: 'Market Research & Analysis',
      description: 'We conduct thorough research to identify opportunities matching your criteria',
      icon: Search,
      details: [
        'Analyze current market conditions',
        'Identify suitable properties or businesses',
        'Prepare detailed investment reports',
        'Present shortlisted opportunities'
      ]
    },
    {
      number: '03',
      title: 'Due Diligence',
      description: 'Comprehensive evaluation of selected investment opportunities',
      icon: FileCheck,
      details: [
        'Legal and regulatory compliance check',
        'Financial analysis and projections',
        'Technical property inspections',
        'Risk assessment and mitigation'
      ]
    },
    {
      number: '04',
      title: 'Transaction Support',
      description: 'Expert guidance through the entire acquisition process',
      icon: Handshake,
      details: [
        'Negotiation strategy and support',
        'Coordination with legal professionals',
        'Document preparation and review',
        'Closing process management'
      ]
    },
    {
      number: '05',
      title: 'Post-Investment Management',
      description: 'Ongoing support to maximize your investment returns',
      icon: TrendingUp,
      details: [
        'Property management coordination',
        'Business development support',
        'Performance monitoring',
        'Exit strategy planning'
      ]
    }
  ]

  const services = [
    {
      title: 'Property Investment',
      features: [
        'Residential and commercial properties',
        'Historic restoration projects',
        'New development opportunities',
        'Rental income properties',
        'Agricultural estates'
      ]
    },
    {
      title: 'Business Investment',
      features: [
        'Tourism and hospitality ventures',
        'Agricultural businesses',
        'Technology startups',
        'Manufacturing opportunities',
        'Joint venture partnerships'
      ]
    },
    {
      title: 'Advisory Services',
      features: [
        'Market entry strategies',
        'Regulatory compliance',
        'Tax optimization',
        'Financing assistance',
        'Risk management'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sea to-sea-dark text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
            How It Works
          </h1>
          <p className="text-xl text-sea-light max-w-3xl mx-auto">
            From initial consultation to successful investment, we guide you through every step of your Puglia investment journey with expertise and dedication
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl font-bold text-stone-800 mb-4">
              Our Proven Investment Process
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              A systematic approach that ensures successful outcomes for every investment
            </p>
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-12 top-24 bottom-0 w-0.5 bg-stone-300 hidden md:block" />
                )}
                
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Step Number and Icon */}
                  <div className="flex items-center gap-4 md:w-1/4">
                    <div className="relative">
                      <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center">
                        <step.icon className="w-10 h-10 text-terracotta" />
                      </div>
                      <div className="absolute -top-2 -right-2 bg-terracotta text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">
                        {step.number}
                      </div>
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 bg-white rounded-xl shadow-sm p-8">
                    <h3 className="font-playfair text-2xl font-bold text-stone-800 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-lg text-stone-600 mb-6">
                      {step.description}
                    </p>
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-olive flex-shrink-0 mt-0.5" />
                          <span className="text-stone-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl font-bold text-stone-800 mb-4">
              Comprehensive Investment Services
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Whether you&apos;re interested in property, business ventures, or both, we provide tailored advisory services
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gradient-to-br from-stone-50 to-white rounded-xl p-8">
                <h3 className="font-playfair text-xl font-bold text-stone-800 mb-6">
                  {service.title}
                </h3>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <ArrowRight className="w-4 h-4 text-terracotta flex-shrink-0 mt-1" />
                      <span className="text-stone-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-terracotta/10 to-white rounded-2xl p-12">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-3xl font-bold text-stone-800 mb-4">
                Why Choose InvestInPuglia?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <Shield className="w-12 h-12 text-terracotta mx-auto mb-4" />
                <h3 className="font-semibold text-stone-800 mb-2">Risk Mitigation</h3>
                <p className="text-stone-600">
                  Comprehensive due diligence and expert analysis protect your investment
                </p>
              </div>
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-sea mx-auto mb-4" />
                <h3 className="font-semibold text-stone-800 mb-2">ROI Focus</h3>
                <p className="text-stone-600">
                  Data-driven strategies to maximize your investment returns
                </p>
              </div>
              <div className="text-center">
                <Handshake className="w-12 h-12 text-olive mx-auto mb-4" />
                <h3 className="font-semibold text-stone-800 mb-2">Local Expertise</h3>
                <p className="text-stone-600">
                  Deep knowledge of Puglia&apos;s market and regulatory landscape
                </p>
              </div>
              <div className="text-center">
                <Phone className="w-12 h-12 text-warm mx-auto mb-4" />
                <h3 className="font-semibold text-stone-800 mb-2">24/7 Support</h3>
                <p className="text-stone-600">
                  Always available to address your concerns and opportunities
                </p>
              </div>
              <div className="text-center">
                <FileCheck className="w-12 h-12 text-terracotta mx-auto mb-4" />
                <h3 className="font-semibold text-stone-800 mb-2">Full Service</h3>
                <p className="text-stone-600">
                  End-to-end support from research to post-investment management
                </p>
              </div>
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-sea mx-auto mb-4" />
                <h3 className="font-semibold text-stone-800 mb-2">Proven Track Record</h3>
                <p className="text-stone-600">
                  Successful investments across property and business sectors
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl font-bold text-stone-800 mb-4">
              Typical Investment Timeline
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              While every investment is unique, here&apos;s what you can typically expect
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-32 text-right font-semibold text-stone-800">Week 1-2</div>
                  <div className="flex-1 border-l-2 border-terracotta pl-6">
                    <h4 className="font-semibold text-stone-800 mb-2">Initial Consultation & Planning</h4>
                    <p className="text-stone-600">Understanding your goals and creating a customized investment strategy</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-32 text-right font-semibold text-stone-800">Week 3-6</div>
                  <div className="flex-1 border-l-2 border-sea pl-6">
                    <h4 className="font-semibold text-stone-800 mb-2">Market Research & Opportunity Identification</h4>
                    <p className="text-stone-600">Comprehensive analysis and shortlisting of investment options</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-32 text-right font-semibold text-stone-800">Week 7-10</div>
                  <div className="flex-1 border-l-2 border-olive pl-6">
                    <h4 className="font-semibold text-stone-800 mb-2">Due Diligence & Evaluation</h4>
                    <p className="text-stone-600">In-depth assessment of selected opportunities</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-32 text-right font-semibold text-stone-800">Week 11-16</div>
                  <div className="flex-1 border-l-2 border-warm pl-6">
                    <h4 className="font-semibold text-stone-800 mb-2">Negotiation & Transaction</h4>
                    <p className="text-stone-600">Finalizing terms and completing the investment</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-32 text-right font-semibold text-stone-800">Ongoing</div>
                  <div className="flex-1 border-l-2 border-terracotta pl-6">
                    <h4 className="font-semibold text-stone-800 mb-2">Post-Investment Support</h4>
                    <p className="text-stone-600">Continuous management and optimization of your investment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-stone-800 mb-4">
              Common Questions
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-stone-800 mb-2">
                Do I need to speak Italian to invest in Puglia?
              </h3>
              <p className="text-stone-600">
                No, you don&apos;t. We handle all communications with local authorities, professionals, and partners. Our bilingual team ensures nothing gets lost in translation.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-stone-800 mb-2">
                What is the minimum investment amount?
              </h3>
              <p className="text-stone-600">
                Investment minimums vary by opportunity type. Property investments typically start from €150,000, while business ventures can range from €50,000 to several million euros.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-stone-800 mb-2">
                Can you help with financing?
              </h3>
              <p className="text-stone-600">
                Yes, we work with Italian and international banks to help secure financing. We&apos;ll guide you through the mortgage process and help you find the best terms.
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <a href="/faq" className="text-terracotta hover:text-terracotta-dark font-medium">
              View All FAQs →
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-terracotta to-terracotta-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl font-bold mb-6">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-xl text-terracotta-light mb-8">
            Schedule a free consultation to discuss your investment goals and discover opportunities in Puglia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="bg-white text-terracotta px-8 py-4 rounded-lg font-medium hover:bg-stone-100 transition-colors"
            >
              Schedule Consultation
            </a>
            <a 
              href="/investment-guide" 
              className="bg-terracotta-dark text-white px-8 py-4 rounded-lg font-medium hover:bg-terracotta-darker transition-colors border border-terracotta-light"
            >
              Download Investment Guide
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

