// app/page.tsx - REDESIGNED per GUIDELINE 2
'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, TrendingUp, Shield, Target, AlertTriangle } from 'lucide-react'
import StatsDisplay from '@/components/StatsDisplay'
import ServiceTierCards from '@/components/ServiceTierCards'
import { VideoErrorBoundary } from '@/components/ErrorBoundary'

// Preserve existing video hero component
import HeroVideoRotatorOptimized from '@/components/sections/HeroVideoRotatorOptimized'

const LoadingSkeleton = () => (
  <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
)

// Dynamic import for InvestmentInsights
const InvestmentInsights = dynamic(
  () => import('@/components/sections/InvestmentInsights'),
  {
    loading: () => <LoadingSkeleton />,
    ssr: false
  }
)

export default function HomePage() {
  return (
    <>
      {/* DNS Prefetch for external resources */}
      <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      <link rel="preconnect" href="https://res.cloudinary.com" />

      {/* Hero Section - VIDEO ROTATOR with NEW MESSAGING */}
      <VideoErrorBoundary>
        <HeroVideoRotatorOptimized />
      </VideoErrorBoundary>

      {/* Problem Section - NEW */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              Why Foreign Investors Struggle in Puglia
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-8 w-8 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">They Overpay by €50K-€150K</h3>
                    <p className="text-gray-700">
                      Real estate agents represent sellers and want the highest price. Foreigners pay 10-15% premium because nobody negotiates for them.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-8 w-8 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">They Lose €350K-€2.25M in Grants</h3>
                    <p className="text-gray-700">
                      One mistake in the Mini PIA application means rejection. Most foreigners don't even know these grants exist.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-8 w-8 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">They Hire Wrong Professionals</h3>
                    <p className="text-gray-700">
                      Googling "architect Puglia" and hiring randomly leads to €100K+ mistakes when work disappoints or costs spiral.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-8 w-8 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">They Waste 12+ Trips to Italy</h3>
                    <p className="text-gray-700">
                      Every decision requires flying to Puglia. €2K per trip × 12 trips = €24K wasted, plus months of stress.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section - NEW */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              I Orchestrate Your Entire Investment - You Stay Home
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Column 1: The Problem */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-red-500">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">The Problem</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span className="text-gray-700">Real estate agents work for sellers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span className="text-gray-700">Grant consultants handle only paperwork</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span className="text-gray-700">Architects focus only on design</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span className="text-gray-700">Project managers appear only during construction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span className="text-gray-700">Nobody coordinates everything</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span className="text-gray-700">You fly back and forth constantly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span className="text-gray-700">Commission conflicts everywhere</span>
                  </li>
                </ul>
              </div>

              {/* Column 2: My Solution */}
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-2xl p-6 border-t-4 border-yellow-400 transform scale-105">
                <h3 className="text-2xl font-bold mb-6 text-white">My Solution</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <span className="text-white">I coordinate property acquisition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <span className="text-white">I handle EU grant applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <span className="text-white">I assemble your professional team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <span className="text-white">I oversee construction to completion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <span className="text-white">I orchestrate ALL phases as one project</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <span className="text-white">You get updates, not stress</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <span className="text-white font-bold">ZERO commission conflicts - I work only for you</span>
                  </li>
                </ul>
              </div>

              {/* Column 3: Your Result */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Your Result</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Target className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Maximum grant funding secured (€350K-€2.25M)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Target className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Fair pricing (no foreigner premium)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Target className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Vetted professionals coordinated</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Target className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Project completed on time and budget</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Target className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">€100K-€500K in mistakes avoided</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Target className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Zero wasted trips to Italy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Target className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Peace of mind throughout</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Tier Service Preview */}
      <section id="services">
        <ServiceTierCards />
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              Why Clients Choose an Orchestrator Over DIY
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-8 w-8 text-indigo-600" />
                  <div className="flex text-yellow-400">
                    <span>★★★★★</span>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  "Giuseppe saved us from making a €200K mistake. We were ready to buy a property that looked perfect, but his €500 analysis revealed hidden structural issues and zero grant eligibility. Best €500 we ever spent."
                </p>
                <div className="font-semibold text-gray-900">— Sarah & John M.</div>
                <div className="text-sm text-gray-600">UK Investors, 2024</div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                  <div className="flex text-yellow-400">
                    <span>★★★★★</span>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  "We secured €800K in Mini PIA grants thanks to Giuseppe's expertise. His application was flawless - approved on first submission. Worth every euro of his fee."
                </p>
                <div className="font-semibold text-gray-900">— Thomas & Maria K.</div>
                <div className="text-sm text-gray-600">German Investors, 2023</div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="h-8 w-8 text-purple-600" />
                  <div className="flex text-yellow-400">
                    <span>★★★★★</span>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  "Managing construction from New York would have been impossible without Giuseppe. His weekly reports gave us complete confidence. Project finished on time and under budget."
                </p>
                <div className="font-semibold text-gray-900">— David & Lisa R.</div>
                <div className="text-sm text-gray-600">US Investors, 2024</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Giuseppe Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
              Your Investment Orchestrator
            </h2>

            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                After 30+ years in international business - from telecommunications to trading to real estate - I've learned one thing: complex projects succeed when someone coordinates everything with your interests as the only priority.
              </p>

              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                I've managed large-scale operations across Europe, navigated Byzantine bureaucracy, turned around underperforming businesses, and built supply chains during crises. But here's what matters for your Puglia investment:
              </p>

              <div className="bg-indigo-800/50 rounded-xl p-6 mb-6">
                <p className="text-lg text-white mb-2">
                  <strong>I know how to coordinate complex projects</strong> where multiple specialists must work together, bureaucracy is challenging, language barriers exist, costs can spiral, and timing is critical.
                </p>
              </div>

              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                In 2023, I started Mari e Trulli International to transform historic properties in Puglia. Through this work, I watched wealthy foreign investors make expensive mistakes - not because they lacked money, but because they lacked someone on the ground coordinating everything with their interests as the only priority.
              </p>

              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Real estate agents work for sellers. Grant consultants handle only paperwork. Architects focus on design. Contractors care about their margin. <strong className="text-white">Nobody orchestrates the entire investment for YOU.</strong>
              </p>

              <p className="text-xl text-white font-semibold mb-6">
                So I built this service to do exactly that.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-8">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="font-bold text-yellow-400 mb-2">✓ 30+ years international business experience</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="font-bold text-yellow-400 mb-2">✓ Zero commission conflicts (flat fees only)</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="font-bold text-yellow-400 mb-2">✓ Based permanently in Puglia, Italy</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="font-bold text-yellow-400 mb-2">✓ Fluent in English, Italian, and "bureaucratese"</div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                href="/about"
                className="inline-block bg-yellow-400 text-slate-900 py-4 px-8 rounded-lg font-semibold hover:bg-yellow-300 transition-all text-lg"
              >
                Learn More About Giuseppe
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mini PIA Calculator CTA */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Calculate Your Grant Eligibility in 5 Minutes
            </h2>
            <p className="text-xl mb-8 text-green-100">
              See exactly how much funding you could receive for your Puglia investment project
            </p>
            <Link
              href="/tools/mini-pia-calculator"
              className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              Launch Mini PIA Calculator <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Insights/Blog - Real data from Sanity */}
      <InvestmentInsights />

      {/* Infographic Section - Investment Process with Animations */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 animate-fade-in">
              Your Investment Journey
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12 animate-fade-in-delay">
              From discovery to completion - a clear path to your Puglia investment success
            </p>

            <div className="relative">
              {/* Animated Timeline connector */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-400 via-purple-400 to-green-400 transform -translate-x-1/2 animate-pulse-slow"></div>

              {/* Timeline steps */}
              <div className="space-y-12">
                {/* Step 1 */}
                <div className="flex flex-col md:flex-row items-center gap-8 group">
                  <div className="flex-1 md:text-right transform transition-all duration-500 hover:scale-105">
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
                      <h3 className="text-2xl font-bold mb-2 text-indigo-600 group-hover:text-indigo-700 transition-colors">1. Discovery</h3>
                      <p className="text-gray-700 mb-3">Foundation Package kicks off with understanding your goals and criteria</p>
                      <div className="text-sm font-semibold text-green-600">Week 1-2 | €2,500</div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold z-10 shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 animate-bounce-subtle">
                    1
                  </div>
                  <div className="flex-1 hidden md:block"></div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1 hidden md:block"></div>
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold z-10 shadow-lg">
                    2
                  </div>
                  <div className="flex-1">
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h3 className="text-2xl font-bold mb-2 text-indigo-600">2. Property Search</h3>
                      <p className="text-gray-700 mb-3">5-8 vetted property options matching your investment criteria</p>
                      <div className="text-sm font-semibold text-green-600">Week 3-4 | Included</div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1 md:text-right">
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h3 className="text-2xl font-bold mb-2 text-indigo-600">3. Acquisition & Grants</h3>
                      <p className="text-gray-700 mb-3">Full Orchestration: negotiation, purchase, and EU grant applications</p>
                      <div className="text-sm font-semibold text-green-600">Month 2-3 | 2.5-3.5%</div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold z-10 shadow-lg">
                    3
                  </div>
                  <div className="flex-1 hidden md:block"></div>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1 hidden md:block"></div>
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold z-10 shadow-lg">
                    4
                  </div>
                  <div className="flex-1">
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h3 className="text-2xl font-bold mb-2 text-indigo-600">4. Construction Oversight</h3>
                      <p className="text-gray-700 mb-3">Project Oversight: weekly visits, quality control, financial tracking</p>
                      <div className="text-sm font-semibold text-green-600">Month 4-12 | €3K/month</div>
                    </div>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1 md:text-right">
                    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-500">
                      <h3 className="text-2xl font-bold mb-2 text-green-600">5. Completion</h3>
                      <p className="text-gray-700 mb-3">Your investment property ready for operation or enjoyment</p>
                      <div className="text-sm font-semibold text-green-600">Month 12-18 | Success!</div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-white text-2xl font-bold z-10 shadow-lg">
                    ✓
                  </div>
                  <div className="flex-1 hidden md:block"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section (Bottom) */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start with Zero Risk
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Not sure if you need me? Start with a €500 property analysis. I'll prove my value in 7 days. If you don't see how I save you 100X that investment, you've only risked €500. If you do see it, you've found your orchestrator.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              href="/property-snapshot"
              className="inline-block bg-white text-indigo-900 py-4 px-8 rounded-lg font-semibold hover:shadow-2xl transition-all text-lg"
            >
              Get €500 Property Snapshot
            </Link>
            <Link
              href="/contact"
              className="inline-block bg-indigo-800 text-white py-4 px-8 rounded-lg font-semibold hover:bg-indigo-700 transition-all text-lg border-2 border-white"
            >
              Book Free 30-Min Discovery Call
            </Link>
          </div>

          <p className="text-indigo-200 text-sm">
            Or call: +39 351 400 1402 | +44 208 123 1402 | +34 696 332 144
          </p>
        </div>
      </section>
    </>
  )
}
