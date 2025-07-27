import type { Metadata } from 'next'
import Icon from '@/lib/iconMappings'
import { Building2, FileSearch, Handshake, Home, Percent, Users, ChevronRight, CheckCircle2, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How It Works - Investment Process | InvestInPuglia',
  description: 'Discover our step-by-step investment process in Puglia. From initial consultation to property acquisition and ongoing management.',
  keywords: 'investment process, how to invest, Puglia property investment, investment steps, property consultation',
  openGraph: {
    title: 'How Our Investment Process Works | InvestInPuglia',
    description: 'Simple, transparent process for investing in Puglia properties and businesses.',
    type: 'website',
    locale: 'en_US',
    url: 'https://investinpuglia.eu/how-it-works',
    siteName: 'InvestInPuglia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How It Works | InvestInPuglia',
    description: 'Your journey to successful investment in Puglia starts here.',
  },
  alternates: {
    canonical: 'https://investinpuglia.eu/how-it-works'
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How It Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your journey to successful investment in Puglia in 6 simple steps
          </p>
        </div>

        {/* Main Process Steps */}
        <div className="grid gap-8 mb-16">
          {/* Step 1 */}
          <div className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 text-8xl font-bold text-blue-50">1</div>
            <div className="relative z-10">
              <div className="flex items-start gap-6">
                <div className="bg-blue-100 p-4 rounded-lg">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Initial Consultation</h2>
                  <p className="text-gray-600 mb-4">
                    Schedule a free consultation with our investment advisors. We'll discuss your goals, 
                    budget, and investment preferences to understand your unique requirements.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span>Personalized investment strategy</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span>Market analysis and opportunities</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span>Risk assessment and mitigation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 text-8xl font-bold text-purple-50">2</div>
            <div className="relative z-10">
              <div className="flex items-start gap-6">
                <div className="bg-purple-100 p-4 rounded-lg">
                  <FileSearch className="w-8 h-8 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Opportunity Identification</h2>
                  <p className="text-gray-600 mb-4">
                    Our team searches for investment opportunities that match your criteria. We leverage 
                    our local network and market expertise to find the best options.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span>Curated property and business listings</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span>Off-market opportunities</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span>Detailed investment analysis</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 text-8xl font-bold text-green-50">3</div>
            <div className="relative z-10">
              <div className="flex items-start gap-6">
                <div className="bg-green-100 p-4 rounded-lg">
                  <Building2 className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Due Diligence</h2>
                  <p className="text-gray-600 mb-4">
                    Comprehensive evaluation of selected opportunities including legal, financial, and 
                    technical assessments to ensure informed decision-making.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span>Property inspections and valuations</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span>Legal documentation review</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span>Financial projections and ROI analysis</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 text-8xl font-bold text-orange-50">4</div>
            <div className="relative z-10">
              <div className="flex items-start gap-6">
                <div className="bg-orange-100 p-4 rounded-lg">
                  <Percent className="w-8 h-8 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Financing & Incentives</h2>
                  <p className="text-gray-600 mb-4">
                    We help you access financing options and government incentives, including EU grants 
                    and regional subsidies for qualified investments.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span>Bank financing arrangements</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span>EU grant applications (up to €50M+)</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span>Tax optimization strategies</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 text-8xl font-bold text-red-50">5</div>
            <div className="relative z-10">
              <div className="flex items-start gap-6">
                <div className="bg-red-100 p-4 rounded-lg">
                  <Handshake className="w-8 h-8 text-red-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Transaction Execution</h2>
                  <p className="text-gray-600 mb-4">
                    We manage the entire acquisition process, coordinating with notaries, lawyers, and 
                    authorities to ensure smooth and compliant transactions.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span>Contract negotiation and finalization</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span>Legal registration and compliance</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span>Ownership transfer coordination</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Step 6 */}
          <div className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 text-8xl font-bold text-indigo-50">6</div>
            <div className="relative z-10">
              <div className="flex items-start gap-6">
                <div className="bg-indigo-100 p-4 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Ongoing Management</h2>
                  <p className="text-gray-600 mb-4">
                    Post-acquisition support including property management, renovation oversight, and 
                    investment performance monitoring to maximize returns.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span>Property management services</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span>Renovation and development support</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span>Regular performance reporting</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Investment Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of successful investors who have chosen Puglia for their portfolio
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Schedule Consultation
              <ChevronRight className="ml-2 w-5 h-5" />
            </a>
            <a 
              href="/about" 
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Learn More About Us
            </a>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Hidden Fees</h3>
            <p className="text-gray-600">Transparent pricing with no surprises. All costs clearly outlined upfront.</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Local Expertise</h3>
            <p className="text-gray-600">Deep knowledge of Puglia''s market and established local connections.</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
            <p className="text-gray-600">Track record of successful investments with strong ROI for our clients.</p>
          </div>
        </div>
      </div>
    </div>
  )
}





