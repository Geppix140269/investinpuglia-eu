// app/tools/page.tsx
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
                href="/classic" 
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

      {/* Other Tools Grid */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Analysis & Support Tools</h2>
            <p className="text-lg text-gray-600">Professional services and resources for investment success</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Property Analysis */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Property Surveys</h3>
              <p className="text-gray-600 mb-6">
                Professional property analysis, legal reviews, and market assessments for informed decisions.
              </p>
              <div className="space-y-3">
                <a href="/surveys" className="block text-orange-600 hover:underline font-medium">
                  → Survey Services
                </a>
                <a href="/surveys/order" className="block text-orange-600 hover:underline font-medium">
                  → Order Survey
                </a>
              </div>
            </div>

            {/* Investment Process */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Investment Guides</h3>
              <p className="text-gray-600 mb-6">
                Step-by-step guides and timelines for successful property investment in Italy.
              </p>
              <div className="space-y-3">
                <a href="/investment-process" className="block text-purple-600 hover:underline font-medium">
                  → Investment Process
                </a>
                <a href="/blog" className="block text-purple-600 hover:underline font-medium">
                  → Investment Blog
                </a>
              </div>
            </div>

            {/* Expert Support */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Expert Support</h3>
              <p className="text-gray-600 mb-6">
                Get personalized advice and professional consultation for your investment strategy.
              </p>
              <div className="space-y-3">
                <a href="/contact" className="block text-blue-600 hover:underline font-medium">
                  → Contact Us
                </a>
                <a href="https://calendly.com/investinpuglia/30min" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:underline font-medium">
                  → Book Consultation
                </a>
              </div>
            </div>

            {/* Resources */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Resources</h3>
              <p className="text-gray-600 mb-6">
                Comprehensive guides, templates, and resources for Italian property investment.
              </p>
              <div className="space-y-3">
                <a href="/blog" className="block text-yellow-600 hover:underline font-medium">
                  → Investment Blog
                </a>
                <a href="/contact" className="block text-yellow-600 hover:underline font-medium">
                  → Get Resources
                </a>
              </div>
            </div>

            {/* ROI Calculator - Coming Soon */}
            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg border-2 border-dashed border-gray-300">
              <div className="w-16 h-16 bg-gray-300 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-600">ROI Calculator</h3>
              <p className="text-gray-500 mb-6">
                Advanced ROI analysis with rental income projections, market trends, and exit strategies.
              </p>
              <div className="space-y-3">
                <span className="block text-gray-400 font-medium">→ Coming Soon</span>
                <span className="block text-gray-400 font-medium">→ Rental Analysis</span>
                <span className="block text-gray-400 font-medium">→ Market Trends</span>
              </div>
            </div>

            {/* Grant Assistant - Coming Soon */}
            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg border-2 border-dashed border-gray-300">
              <div className="w-16 h-16 bg-gray-300 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-600">Grant Assistant</h3>
              <p className="text-gray-500 mb-6">
                AI-powered grant application assistance and document preparation for Mini PIA applications.
              </p>
              <div className="space-y-3">
                <span className="block text-gray-400 font-medium">→ Coming Q2 2025</span>
                <span className="block text-gray-400 font-medium">→ Document Prep</span>
                <span className="block text-gray-400 font-medium">→ Application Help</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
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
              href="/classic" 
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
