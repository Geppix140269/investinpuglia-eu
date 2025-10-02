'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle, Euro, Clock, TrendingUp } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function PricingPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-indigo-900 to-purple-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Transparent Pricing, No Hidden Fees
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Four clear tiers designed to protect your investment at every stage. Pay for what you need, when you need it.
            </p>
          </div>
        </div>
      </section>

      {/* 4-Tier Pricing Table */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Choose Your Service Level</h2>

            <div className="grid md:grid-cols-4 gap-6">
              {/* Tier 0 */}
              <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                <div className="text-center mb-6">
                  <div className="inline-block bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-bold mb-4">
                    TIER 0
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Property Snapshot</h3>
                  <div className="text-4xl font-bold text-indigo-600 mb-2">€500</div>
                  <p className="text-sm text-gray-600">7-10 Days</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Property analysis report</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Grant eligibility check</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Hidden costs breakdown</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Red flags assessment</span>
                  </li>
                </ul>
                <div className="space-y-2">
                  <a
                    href="https://buy.stripe.com/aFa9AV4Og9W0eqi40y08g09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all"
                  >
                    Pay Now - €500
                  </a>
                  <Link
                    href="/property-snapshot"
                    className="block w-full text-center text-gray-600 hover:text-gray-900 py-2 text-sm font-medium"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>

              {/* Tier 1 - Most Popular */}
              <div className="bg-indigo-50 rounded-xl p-6 border-2 border-indigo-500 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </span>
                </div>
                <div className="text-center mb-6 mt-2">
                  <div className="inline-block bg-indigo-200 text-indigo-800 px-3 py-1 rounded-full text-sm font-bold mb-4">
                    TIER 1
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Foundation Package</h3>
                  <div className="text-4xl font-bold text-indigo-600 mb-2">€2,500</div>
                  <p className="text-sm text-gray-600">30-45 Days</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">5-8 property options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Market intelligence report</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Fiscal setup coordination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Bank account opening</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Decision framework</span>
                  </li>
                </ul>
                <div className="space-y-2">
                  <a
                    href="https://buy.stripe.com/28E14p94w0lq81Ucx408g0a"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow-lg"
                  >
                    Pay Now - €2,500
                  </a>
                  <Link
                    href="/foundation-package"
                    className="block w-full text-center text-gray-600 hover:text-gray-900 py-2 text-sm font-medium"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>

              {/* Tier 2 */}
              <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
                <div className="text-center mb-6">
                  <div className="inline-block bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-bold mb-4">
                    TIER 2
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Full Orchestration</h3>
                  <div className="text-4xl font-bold text-purple-600 mb-2">2.5-3.5%</div>
                  <p className="text-sm text-gray-600">6-9 Months</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Property acquisition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Grant application & approval</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Team assembly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Building permit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">5 milestone payments</span>
                  </li>
                </ul>
                <div className="space-y-2">
                  <Link
                    href="/contact"
                    className="block w-full text-center bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all"
                  >
                    Contact for Quote
                  </Link>
                  <Link
                    href="/full-orchestration"
                    className="block w-full text-center text-gray-600 hover:text-gray-900 py-2 text-sm font-medium"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>

              {/* Tier 3 */}
              <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
                <div className="text-center mb-6">
                  <div className="inline-block bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold mb-4">
                    TIER 3
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Project Oversight</h3>
                  <div className="text-4xl font-bold text-yellow-600 mb-2">€3K</div>
                  <p className="text-sm text-gray-600">Per Month</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Weekly site visits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Contractor oversight</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Quality control</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Monthly financial reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Grant compliance</span>
                  </li>
                </ul>
                <div className="space-y-2">
                  <Link
                    href="/contact"
                    className="block w-full text-center bg-yellow-600 text-white py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-all"
                  >
                    Contact for Quote
                  </Link>
                  <Link
                    href="/project-oversight"
                    className="block w-full text-center text-gray-600 hover:text-gray-900 py-2 text-sm font-medium"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Example Calculations */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Real Investment Examples</h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* €500K Investment */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-indigo-600">€500K Investment</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-700">Property Purchase</span>
                    <span className="font-semibold">€300K</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-700">Renovation</span>
                    <span className="font-semibold">€200K</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-700 font-bold">Total Investment</span>
                    <span className="font-bold text-lg">€500K</span>
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-lg p-4 mb-4">
                  <h4 className="font-bold mb-2">Tier 2 Fee (3%)</h4>
                  <p className="text-3xl font-bold text-indigo-600">€15,000</p>
                  <p className="text-sm text-gray-600 mt-2">Paid over 5 milestones</p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-bold mb-2">Potential Grant (35%)</h4>
                  <p className="text-3xl font-bold text-green-600">€175K</p>
                  <p className="text-sm text-gray-600 mt-2">Net cost: €340K</p>
                </div>
              </div>

              {/* €1M Investment */}
              <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-indigo-500">
                <div className="text-center mb-4">
                  <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    MOST COMMON
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-6 text-indigo-600">€1M Investment</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-700">Property Purchase</span>
                    <span className="font-semibold">€600K</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-700">Renovation</span>
                    <span className="font-semibold">€400K</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-700 font-bold">Total Investment</span>
                    <span className="font-bold text-lg">€1M</span>
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-lg p-4 mb-4">
                  <h4 className="font-bold mb-2">Tier 2 Fee (2.5%)</h4>
                  <p className="text-3xl font-bold text-indigo-600">€25,000</p>
                  <p className="text-sm text-gray-600 mt-2">Paid over 5 milestones</p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-bold mb-2">Potential Grant (45%)</h4>
                  <p className="text-3xl font-bold text-green-600">€450K</p>
                  <p className="text-sm text-gray-600 mt-2">Net cost: €575K</p>
                </div>
              </div>

              {/* €2M Investment */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-indigo-600">€2M Investment</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-700">Property Purchase</span>
                    <span className="font-semibold">€1.2M</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-700">Renovation</span>
                    <span className="font-semibold">€800K</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-700 font-bold">Total Investment</span>
                    <span className="font-bold text-lg">€2M</span>
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-lg p-4 mb-4">
                  <h4 className="font-bold mb-2">Tier 2 Fee (2.5%)</h4>
                  <p className="text-3xl font-bold text-indigo-600">€50,000</p>
                  <p className="text-sm text-gray-600 mt-2">Paid over 5 milestones</p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-bold mb-2">Potential Grant (55%)</h4>
                  <p className="text-3xl font-bold text-green-600">€1.1M</p>
                  <p className="text-sm text-gray-600 mt-2">Net cost: €950K</p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-yellow-50 border-l-4 border-yellow-500 p-6">
              <h3 className="text-xl font-bold mb-4">Why This Pricing Model Works</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Aligned incentives:</strong> I only succeed when you succeed</span>
                </li>
                <li className="flex items-start gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Zero commission conflicts:</strong> I represent you, not the seller or agent</span>
                </li>
                <li className="flex items-start gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Milestone-based payments:</strong> You pay as the project progresses, not upfront</span>
                </li>
                <li className="flex items-start gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Grant-adjusted ROI:</strong> My fee is a fraction of the grants I help you secure</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Terms */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Payment Terms & Conditions</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Euro className="h-8 w-8 text-indigo-600" />
                  <h3 className="text-xl font-bold">Payment Structure</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Tier 0:</strong> Full payment upfront (€500)
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Tier 1:</strong> 50% upfront, 50% on delivery (€2,500)
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Tier 2:</strong> 5 milestone payments (30% / 20% / 20% / 20% / 10%)
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Tier 3:</strong> Monthly invoice, payable within 15 days
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-8 w-8 text-indigo-600" />
                  <h3 className="text-xl font-bold">Cancellation Policy</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Tier 0:</strong> No refund after report delivery
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Tier 1:</strong> Pro-rata refund before final deliverable
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Tier 2:</strong> You only pay for completed milestones
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Tier 3:</strong> 30-day notice required for cancellation
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-indigo-50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">What's NOT Included</h3>
              <p className="text-gray-700 mb-4">
                To maintain transparency, these costs are separate and paid directly by you:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Business consultant/accountant fees (typically 1.5% of project value for grant applications)</li>
                <li>• Notary fees (typically €2K-€5K)</li>
                <li>• Legal fees for contract review (typically €1.5K-€3K)</li>
                <li>• Architect fees (typically 8-12% of renovation budget)</li>
                <li>• Contractor payments (paid directly to contractors)</li>
                <li>• Building permits and municipality fees (varies by location)</li>
                <li>• Property taxes and utilities</li>
              </ul>
              <div className="mt-6 bg-white rounded-lg p-4 border-l-4 border-indigo-500">
                <p className="text-sm font-semibold text-gray-900 mb-2">Want to calculate your total costs?</p>
                <a
                  href="/tools/mini-pia-calculator"
                  className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold"
                >
                  Use the Mini PIA Calculator <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Pricing FAQ</h2>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-3">Can I start with Tier 0 and upgrade later?</h3>
                <p className="text-gray-700">
                  Yes! If you proceed to Tier 1 or Tier 2 within 60 days, the €500 from Tier 0 is fully credited towards the higher tier fee.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-3">What if the grant is rejected?</h3>
                <p className="text-gray-700">
                  With a 95% approval rate, rejection is rare. If it happens, you only pay for work completed up to that milestone. No penalty for grant rejection beyond my control.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-3">Do you take commission from property sellers?</h3>
                <p className="text-gray-700">
                  <strong>Never.</strong> I represent you exclusively. I negotiate on your behalf to get the best price, not to inflate it for commission. This is a core principle of my zero-conflict model.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-3">Can I use Tier 2 for property acquisition only (no grant)?</h3>
                <p className="text-gray-700">
                  Yes, but most clients use grants to offset costs. If you choose not to pursue grants, the same 2.5-3.5% fee applies for property acquisition and team assembly.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-3">Is Tier 3 required if I use Tier 2?</h3>
                <p className="text-gray-700">
                  No, Tier 3 is optional. However, 90% of clients who complete Tier 2 continue with Tier 3 for peace of mind during construction. You can decide after grant approval.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-3">What payment methods do you accept?</h3>
                <p className="text-gray-700">
                  Bank transfer (SEPA or international wire), PayPal for Tier 0, and structured payment plans for Tier 2. I provide Italian tax receipts (fattura) for all payments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Schedule a free 30-minute consultation to discuss which tier is right for your investment goals.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-yellow-400 text-slate-900 py-4 px-8 rounded-lg font-bold hover:bg-yellow-300 transition-all text-lg"
          >
            Schedule Free Consultation <ArrowRight className="inline-block ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
