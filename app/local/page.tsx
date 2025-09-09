// app/local/page.tsx
// Local Expertise & Insider Access for inpuglia.eu / www.inpuglia.eu
'use client'

import { useState, useEffect } from 'react'
import Icon from '@/lib/iconMappings'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const LoadingSkeleton = () => (
  <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
)

const FAQ = dynamic(
  () => import('@/components/sections/FAQ'),
  { loading: () => <LoadingSkeleton />, ssr: false }
)

export default function LocalExpertisePage() {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])
  
  return (
    <main className="min-h-screen">
      {/* Hero Section - Local Expertise */}
      <section className="relative min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 text-white overflow-hidden">
        {/* Italian map pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-5 pt-32 pb-20">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
              <Icon name="MapPin" size={16} />
              <span className="text-sm font-medium">35 Years • 3 Offices • 1000+ Deals</span>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-light leading-tight mb-6">
              The Local Network<br />
              <span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Foreigners Can't Access
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-12">
              Three generations of relationships. Every mayor, notary, and master craftsman. 
              The connections that turn impossible into done.
            </p>
            
            {/* Network Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">127</div>
                <div className="text-sm text-gray-400">Vetted Professionals</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">23</div>
                <div className="text-sm text-gray-400">Municipality Contacts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-400">€80M+</div>
                <div className="text-sm text-gray-400">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">100%</div>
                <div className="text-sm text-gray-400">Success Rate</div>
              </div>
            </div>
            
            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200">
                Access the Inner Circle
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold text-lg border border-white/30 hover:bg-white/20 transition-all duration-200">
                See Our Network
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* The Power of Local */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              What "Knowing Everyone" <span className="font-bold text-emerald-600">Actually Means</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              In Puglia, relationships built over decades unlock doors that money alone never could
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8">
              <Icon name="Building" size={40} className="text-emerald-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Municipality Fast-Track</h3>
              <p className="text-gray-700 mb-4">
                Permits that take others 6 months? We get them in 6 weeks. 
                Direct lines to decision-makers cut through bureaucracy.
              </p>
              <p className="text-sm font-semibold text-emerald-600">Example: Building permit in Ostuni - 42 days</p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8">
              <Icon name="Hammer" size={40} className="text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Master Craftsmen Access</h3>
              <p className="text-gray-700 mb-4">
                The best stoneworkers and trullo specialists don't advertise. 
                They work only through trusted referrals - ours.
              </p>
              <p className="text-sm font-semibold text-blue-600">350+ completed restorations</p>
            </div>
            
            {/* Card 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
              <Icon name="Key" size={40} className="text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Off-Market Properties</h3>
              <p className="text-gray-700 mb-4">
                The best properties never hit the market. Families call us first 
                when they're ready to sell.
              </p>
              <p className="text-sm font-semibold text-purple-600">70% of our deals are private sales</p>
            </div>
            
            {/* Card 4 */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8">
              <Icon name="Scale" size={40} className="text-amber-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Legal Shortcuts</h3>
              <p className="text-gray-700 mb-4">
                Our notaries and lawyers know every nuance of local law. 
                Problems that stop others don't even slow us down.
              </p>
              <p className="text-sm font-semibold text-amber-600">Same-day notary appointments available</p>
            </div>
            
            {/* Card 5 */}
            <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-2xl p-8">
              <Icon name="Euro" size={40} className="text-rose-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Local Pricing</h3>
              <p className="text-gray-700 mb-4">
                Contractors quote us local rates, not "foreigner prices." 
                You save 30-50% just by using our name.
              </p>
              <p className="text-sm font-semibold text-rose-600">€2.3M saved for clients in 2024</p>
            </div>
            
            {/* Card 6 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
              <Icon name="Shield" size={40} className="text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Problem Resolution</h3>
              <p className="text-gray-700 mb-4">
                When issues arise, one phone call to the right person solves it. 
                Our reputation is your protection.
              </p>
              <p className="text-sm font-semibold text-green-600">24-hour problem resolution guarantee</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* The Network */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Your Exclusive Access to <span className="font-bold text-emerald-600">Puglia's Inner Circle</span>
            </h2>
          </div>
          
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Government Relations</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Icon name="CheckCircle" size={20} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Direct Mayor Access</p>
                      <p className="text-sm text-gray-600">23 municipalities across Puglia</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="CheckCircle" size={20} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Planning Department Contacts</p>
                      <p className="text-sm text-gray-600">Fast-track permit approvals</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="CheckCircle" size={20} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Regional Grant Officers</p>
                      <p className="text-sm text-gray-600">Inside track on funding opportunities</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="p-8 lg:p-12 bg-gradient-to-br from-emerald-50 to-teal-50">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Professional Network</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Icon name="CheckCircle" size={20} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">12 Trusted Notaries</p>
                      <p className="text-sm text-gray-600">Same-day appointments, fixed fees</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="CheckCircle" size={20} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">45+ Master Builders</p>
                      <p className="text-sm text-gray-600">Specialists in trulli, masseria, stone work</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="CheckCircle" size={20} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Banking Relationships</p>
                      <p className="text-sm text-gray-600">Mortgage pre-approvals, account setup</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Case Studies */}
      <section className="py-20 bg-gradient-to-br from-emerald-900 to-teal-900 text-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-4">
              When Connections <span className="font-bold">Make the Difference</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-3 text-emerald-400">The Impossible Permit</h3>
              <p className="text-gray-300 mb-4">
                Swiss client needed permits for a pool in a protected area. 
                Others said impossible. Our contact at the heritage office found a 
                precedent from 1987. Approved in 3 weeks.
              </p>
              <p className="text-sm font-semibold">Value Created: €200,000 property appreciation</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-3 text-cyan-400">The Private Sale</h3>
              <p className="text-gray-300 mb-4">
                American client wanted specific masseria. Owner wasn't selling. 
                Giuseppe's father knew the family for 40 years. One dinner later, 
                deal done at 30% below market.
              </p>
              <p className="text-sm font-semibold">Client Saved: €180,000</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-3 text-teal-400">The Emergency Fix</h3>
              <p className="text-gray-300 mb-4">
                Roof collapsed during renovation, contractor disappeared. 
                One call: new crew on site in 4 hours, project back on track, 
                original contractor's deposit recovered through legal network.
              </p>
              <p className="text-sm font-semibold">Crisis Resolved: Same day</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-3 text-green-400">The Grant Approval</h3>
              <p className="text-gray-300 mb-4">
                German client's grant application rejected twice. Our contact 
                reviewed, found technical error, resubmitted with regional officer's 
                guidance. Approved: €2.2M funding.
              </p>
              <p className="text-sm font-semibold">Funding Secured: €2.2 million</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            In Puglia, Who You Know Changes Everything
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            35 years of relationships. 3 generations of trust. One phone call away.
          </p>
          <button className="px-10 py-5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full font-semibold text-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200">
            Tap Into Our Network
          </button>
          <p className="text-gray-500 text-sm mt-4">
            Exclusive access • Direct introductions • Your success guaranteed
          </p>
        </div>
      </section>
      
      <Suspense fallback={<LoadingSkeleton />}>
        <FAQ />
      </Suspense>
    </main>
  )
}