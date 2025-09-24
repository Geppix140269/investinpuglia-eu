import { Metadata } from 'next'
import Link from 'next/link'
import { 
  CheckCircle, AlertCircle, Clock, Euro, FileText, Building, 
  Users, TrendingUp, Shield, Calculator, ChevronRight, Download,
  Globe, Briefcase, Home, Target, Calendar, Award
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mini PIA Turismo Guide for Foreign Investors | InvestInPuglia',
  description: 'Complete step-by-step guide for foreign investors to access Mini PIA Turismo grants in Puglia. 45-55% non-refundable grants for tourism investments.',
  keywords: 'Mini PIA Turismo, Puglia grants, tourism investment Italy, EU funding, foreign investor guide',
  
  // Open Graph for Facebook, LinkedIn, WhatsApp
  openGraph: {
    title: 'Mini PIA Turismo: Get 45-55% Grants for Tourism Investments in Puglia',
    description: '📘 Complete guide for foreign investors • Step-by-step process • Required documents • €2.5M max grant • Professional support available',
    url: 'https://investinpuglia.eu/mini-pia-guide',
    siteName: 'InvestInPuglia',
    images: [
      {
        url: 'https://investinpuglia.eu/og-mini-pia-guide.jpg',
        width: 1200,
        height: 630,
        alt: 'Mini PIA Turismo Guide - 45-55% Grants for Tourism in Puglia',
      }
    ],
    locale: 'en_US',
    type: 'article',
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Mini PIA Turismo Guide: 45-55% Grants for Tourism in Puglia',
    description: 'Complete foreign investor guide to access €2.5M in non-refundable grants. Step-by-step process included.',
    images: ['https://investinpuglia.eu/og-mini-pia-guide.jpg'],
  },
  
  // Additional SEO
  alternates: {
    canonical: 'https://investinpuglia.eu/mini-pia-guide',
  },
  
  // Robots and indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // For WhatsApp and other apps
  other: {
    'og:whatsapp:title': '💰 Mini PIA: Get 45-55% Grants for Tourism in Puglia',
    'og:whatsapp:description': 'Foreign investor? Access up to €2.5M in grants. Free guide here 👇',
  }
}

export default function MiniPIAGuidePage() {
  const phases = [
    {
      title: "Pre-Application Preparation",
      duration: "3-6 months",
      icon: <Briefcase className="h-6 w-6" />,
      steps: [
        "Establish Italian company (SRL/SPA)",
        "Register in Puglia Chamber of Commerce",
        "Secure property with preliminary agreement",
        "Develop technical project with architect",
        "Prepare 5-year business plan"
      ]
    },
    {
      title: "Application Submission",
      duration: "60-90 days window",
      icon: <FileText className="h-6 w-6" />,
      steps: [
        "Register on Sistema Puglia portal",
        "Obtain Italian digital signature",
        "Compile all required documentation",
        "Submit online application",
        "Receive protocol number"
      ]
    },
    {
      title: "Evaluation Period",
      duration: "60-90 days",
      icon: <Target className="h-6 w-6" />,
      steps: [
        "Technical evaluation by commission",
        "Possible site inspection",
        "Scoring based on criteria",
        "Additional documentation if requested",
        "Await approval decision"
      ]
    },
    {
      title: "Contract & Implementation",
      duration: "18-24 months",
      icon: <Building className="h-6 w-6" />,
      steps: [
        "Sign grant agreement within 30 days",
        "Start works within 6 months",
        "Submit quarterly progress reports",
        "Complete project on schedule",
        "Request final inspection"
      ]
    },
    {
      title: "Operation & Monitoring",
      duration: "5+ years",
      icon: <Shield className="h-6 w-6" />,
      steps: [
        "Begin operations within 3 months",
        "Maintain employment levels",
        "Submit annual reports",
        "Accept monitoring visits",
        "Display funding acknowledgments"
      ]
    }
  ]

  const eligibleCosts = [
    { category: "Property & Construction", percentage: "100%", items: ["Building purchase", "Renovations", "Systems installation"] },
    { category: "Equipment & Furnishing", percentage: "100%", items: ["Furniture", "Kitchen equipment", "IT systems"] },
    { category: "Professional Services", percentage: "Max 10%", items: ["Design", "Project management", "Technical studies"] },
    { category: "Innovation/Environmental", percentage: "Min 5%", items: ["Solar panels", "Smart systems", "Energy efficiency"] }
  ]

  const requirements = [
    { title: "Company Structure", desc: "Italian registered entity (SRL, SPA, SNC) with Puglia headquarters" },
    { title: "Minimum Investment", desc: "€50,000 in eligible costs" },
    { title: "Maximum Grant", desc: "€2,500,000 (50% of €5,000,000 eligible costs)" },
    { title: "Employment Creation", desc: "Minimum 3 ULA (full-time equivalent units)" },
    { title: "Project Duration", desc: "Complete within 18-24 months" },
    { title: "Operational Commitment", desc: "Maintain activity for minimum 5 years" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 to-emerald-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Award className="h-5 w-5" />
              <span className="text-sm font-semibold">OFFICIAL PROGRAM GUIDE</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Mini PIA Turismo: Complete Guide for Foreign Investors
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Step-by-step process to access 45-55% non-refundable grants for tourism investments in Puglia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tools" className="bg-white text-purple-900 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
                <Calculator className="h-5 w-5 inline mr-2" />
                Calculate Your Grant
              </Link>
              <Link href="/book-consultation" className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-900 transition-all">
                Get Expert Help
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Requirements */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Key Program Requirements</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requirements.map((req, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 to-emerald-50 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2 text-purple-900">{req.title}</h3>
                <p className="text-gray-700">{req.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">5-Phase Implementation Process</h2>
          <p className="text-center text-gray-600 mb-12">Total timeline: 24-36 months from preparation to operation</p>
          
          <div className="space-y-8">
            {phases.map((phase, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-emerald-600 text-white p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-white/20 p-3 rounded-lg">
                        {phase.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Phase {index + 1}: {phase.title}</h3>
                        <p className="text-purple-100">Duration: {phase.duration}</p>
                      </div>
                    </div>
                    <div className="text-3xl font-bold opacity-50">
                      {index + 1}/5
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {phase.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligible Costs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Eligible Investment Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eligibleCosts.map((cost, index) => (
              <div key={index} className="border-2 border-purple-200 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg text-purple-900">{cost.category}</h3>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
                    {cost.percentage}
                  </span>
                </div>
                <ul className="space-y-2">
                  {cost.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-gray-600 flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Properties */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Example: Mini PIA Eligible Property</h2>
          <p className="text-center text-gray-600 mb-12">Real investment opportunity showcasing Mini PIA grant potential</p>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src="https://res.cloudinary.com/dusubfxgo/image/upload/v1756236762/investinpuglia/properties/palazzo-palmariggi/palazzo-exterior.jpg"
                  alt="Palazzo Palmariggi exterior"
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Mini PIA Eligible
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Historic Property
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-3 text-gray-900">Palazzo Palmariggi</h3>
                <div className="flex items-center gap-2 mb-4 text-gray-600">
                  <Home className="h-4 w-4" />
                  <span>Palmariggi, Lecce - 8km from Adriatic Sea</span>
                </div>

                <p className="text-gray-700 mb-6">
                  Historic palazzo from the early 1900s featuring authentic Salento-style vaulted ceilings
                  and elegant coffered ceilings. Perfect for luxury hospitality conversion with significant
                  heritage value and tourism potential.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">€2,810,000</div>
                    <div className="text-sm text-gray-600">Total Investment Cost</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-lg font-bold text-green-800">€1,405,000</div>
                    <div className="text-sm text-gray-600">Potential Grant (50%)</div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Historical significance: Former noble family residence</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Authentic architectural details intact</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Prime location near Adriatic coastline</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Ideal for boutique hotel or luxury B&B</span>
                  </div>
                </div>

                <Link href="/properties/palazzo-palmariggi" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2">
                  View Full Details
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Critical Success Factors */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Critical Success Factors for Foreign Investors</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-6 text-green-800 flex items-center gap-2">
                <CheckCircle className="h-6 w-6" />
                Do's - Best Practices
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Establish Italian company 6 months before application</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Partner with local professionals (architect, accountant, lawyer)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Include 10%+ innovation/environmental components</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Get 3+ quotes for every expense category</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Maintain 40% liquidity for non-eligible costs</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Use specialized grant consultants</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-6 text-red-800 flex items-center gap-2">
                <AlertCircle className="h-6 w-6" />
                Don'ts - Common Pitfalls
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Submit incomplete documentation (automatic rejection)</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Use foreign company without Italian entity</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Underestimate bureaucratic timelines</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Ignore minimum innovation requirements (5%)</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Start work before grant approval</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Sell assets within 5-year monitoring period</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Required Documentation */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Required Documentation Checklist</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Building className="h-5 w-5 text-purple-600" />
                Company Documents
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Certificate of incorporation</li>
                <li>✓ Chamber of Commerce registration</li>
                <li>✓ Financial statements</li>
                <li>✓ Bank guarantee letter</li>
                <li>✓ Anti-mafia certification</li>
                <li>✓ Tax compliance certificates</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600" />
                Project Documents
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Technical project (architect signed)</li>
                <li>✓ Building permits</li>
                <li>✓ Property ownership/lease docs</li>
                <li>✓ Cost estimates (3 quotes each)</li>
                <li>✓ 5-year business plan</li>
                <li>✓ Environmental assessments</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5 text-purple-600" />
                Foreign Investor Extras
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Certified Italian translations</li>
                <li>✓ Apostille for non-EU docs</li>
                <li>✓ Italian digital signature</li>
                <li>✓ Local tax representative</li>
                <li>✓ Italian bank account</li>
                <li>✓ Power of attorney (if needed)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Calculator CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Calculate Your Grant?</h2>
          <p className="text-xl mb-8 text-purple-100">
            Use our advanced calculator to estimate your Mini PIA grant and ROI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools" className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all">
              <Calculator className="h-5 w-5 inline mr-2" />
              Launch InvestiScope Calculator
            </Link>
            <a href="/docs/mini-pia-process-guide.pdf" className="border-2 border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all">
              <Download className="h-5 w-5 inline mr-2" />
              Download PDF Guide
            </a>
          </div>
        </div>
      </section>

      {/* Professional Support */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-purple-50 to-emerald-50 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Need Professional Support?</h2>
                <p className="text-gray-700 mb-6">
                  Our team of experts specializes in helping foreign investors navigate the Mini PIA application process with a 95% success rate.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Complete application preparation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Italian company formation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Technical project development</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Post-approval management</span>
                  </li>
                </ul>
                <Link href="/book-consultation" className="bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all inline-block">
                  Book Free Consultation →
                </Link>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="font-bold text-lg mb-4">Typical Professional Fees</h3>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-gray-700">Grant Consultant</span>
                    <span className="font-semibold">€15,000-25,000</span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-gray-700">Technical Team</span>
                    <span className="font-semibold">€20,000-40,000</span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-gray-700">Legal Services</span>
                    <span className="font-semibold">€5,000-10,000</span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-gray-700">Accounting</span>
                    <span className="font-semibold">€3,000-5,000/year</span>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg mt-4">
                    <p className="text-sm text-green-800">
                      <strong>Success Fee Model Available:</strong> 5-8% of granted amount
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Typical Investment Timeline</h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">Month 1-6: Preparation</h3>
                      <p className="text-sm text-gray-600">Company setup, property acquisition, project development</p>
                    </div>
                    <span className="text-purple-600 font-semibold">Pre-Application</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">Month 7-9: Application Window</h3>
                      <p className="text-sm text-gray-600">Submit application during open period</p>
                    </div>
                    <span className="text-purple-600 font-semibold">Submission</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">Month 10-12: Evaluation</h3>
                      <p className="text-sm text-gray-600">Regional assessment and approval</p>
                    </div>
                    <span className="text-purple-600 font-semibold">Review</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Building className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">Month 13-30: Implementation</h3>
                      <p className="text-sm text-gray-600">Construction, renovation, equipment installation</p>
                    </div>
                    <span className="text-purple-600 font-semibold">Execution</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">Month 31-36: Launch</h3>
                      <p className="text-sm text-gray-600">Final inspection, grant payment, begin operations</p>
                    </div>
                    <span className="text-green-600 font-semibold">Operational</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-purple-900 to-emerald-900 text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Start Your Mini PIA Journey Today</h2>
            <p className="text-xl mb-8 text-purple-100">
              Get expert guidance from application to approval
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <div className="text-3xl font-bold text-yellow-400">95%</div>
                <div className="text-sm">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">€150M+</div>
                <div className="text-sm">Grants Secured</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">200+</div>
                <div className="text-sm">Projects Funded</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+393514001402" className="bg-white text-purple-900 px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all">
                📞 +39 351 400 1402
              </a>
              <a href="mailto:info@investinpuglia.eu" className="border-2 border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-purple-900 transition-all">
                ✉️ info@investinpuglia.eu
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}