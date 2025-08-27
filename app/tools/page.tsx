import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Investment Tools & Mini PIA Calculators | Grant Analysis Tools Puglia',
  description: 'Free Mini PIA grant calculators and investment analysis tools. InvestiScope Classic & Light calculators for detailed grant projections. Professional ROI analysis for Puglia investments.',
  keywords: [
    'mini PIA calculator',
    'investment calculator puglia',
    'grant calculator italy',
    'ROI calculator puglia',
    'investiscope classic',
    'investiscope light',
    'PIA grant analysis tools',
    'property investment calculator',
    'EU grant calculator',
    'puglia investment analysis'
  ],
  openGraph: {
    title: 'Mini PIA Grant Calculators & Investment Analysis Tools | InvestInPuglia',
    description: 'Free professional-grade calculators for Mini PIA grants and Puglia property investments. Instant ROI analysis and grant projections.',
    type: 'website',
    locale: 'en_US',
    url: 'https://investinpuglia.eu/tools',
    siteName: 'InvestInPuglia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Investment Tools & Calculators | InvestInPuglia',
    description: 'Free Mini PIA grant calculators. Professional investment analysis tools for Puglia properties.',
  },
  alternates: {
    canonical: 'https://investinpuglia.eu/tools'
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function ToolsPage() {
  return (
    <main className="pt-20 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            🛠️ INVESTMENT TOOLS
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Investment <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Tools</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Professional-grade calculators, analysis tools, and resources for Italian property investments
          </p>
        </div>
      </section>

      {/* Calculator Tools Section - Featured */}
      <section className="pb-10">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Grant Calculators</h2>
            <p className="text-lg text-gray-600">Calculate Mini PIA grants, tax credits, and financial projections</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {/* InvestiScope Classic */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🧮</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">InvestiScope Classic</h3>
                  <p className="text-green-700 font-medium">Advanced Calculator</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6 text-lg">
                Comprehensive Mini PIA grant calculator with detailed financial projections, ROI analysis, and professional PDF reports.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>€100K - €3M range</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Detailed projections</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>PDF reports</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>ROI analysis</span>
                </div>
              </div>
              <a 
                href="https://classic.investinpuglia.eu" 
                className="inline-flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-green-700 transition-colors w-full justify-center"
              >
                Launch Classic Calculator
                <span className="text-xl">→</span>
              </a>
            </div>

            {/* InvestiScope Light */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">InvestiScope Light</h3>
                  <p className="text-blue-700 font-medium">Quick Calculator</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6 text-lg">
                Fast and simple grant calculator for quick estimates. Perfect for initial property evaluation and screening.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Quick estimates</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Simple interface</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Mobile optimized</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Instant results</span>
                </div>
              </div>
              <a 
                href="https://investiscopeeasy.netlify.app/" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-700 transition-colors w-full justify-center"
              >
                Launch Light Calculator
                <span className="text-xl">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-12 text-white shadow-xl">
            <h2 className="text-3xl font-bold mb-4">Need Custom Analysis?</h2>
            <p className="text-lg mb-8 opacity-90">
              Our experts can provide personalized investment analysis and grant optimization strategies
            </p>
            <a 
              href="https://calendly.com/investinpuglia/30min" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all"
            >
              Schedule Expert Consultation →
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Investment Analysis?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Choose the right tool for your investment needs and get professional insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="https://classic.investinpuglia.eu" 
              className="inline-flex items-center gap-3 bg-white text-green-700 px-10 py-5 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Start Advanced Calculator
            </a>
            <a 
              href="https://calendly.com/investinpuglia/30min" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border-2 border-white text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-white hover:text-blue-700 transition-colors"
            >
              Book Expert Consultation
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}