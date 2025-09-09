// components/sections/HowItWorks_ClientJourney.tsx
import Icon from '@/lib/iconMappings'

export default function HowItWorksClientJourney() {
  return (
    <section className="py-20 bg-white" id="how-it-works">
      <div className="max-w-7xl mx-auto px-5">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 px-4 py-2 rounded-full mb-6">
            <Icon name="Shield" size={16} className="text-blue-600" />
            <span className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Your Protection Journey</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            How I <span className="font-bold text-emerald-600">Protect Your Investment</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No video calls, no sales pressure. Just immediate value and protection from day one.
          </p>
        </div>
        
        {/* The Journey Steps */}
        <div className="max-w-5xl mx-auto">
          
          {/* Step 1 */}
          <div className="flex gap-8 mb-12">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                1
              </div>
            </div>
            <div className="flex-grow">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Immediate Risk Assessment</h3>
              <p className="text-gray-600 mb-4">
                Within 48 hours of first contact, you receive your personalized Investment Risk Report - 
                identifying the specific threats to your capital based on your situation.
              </p>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-emerald-900 mb-2">You Receive:</p>
                <ul className="text-sm text-emerald-700 space-y-1">
                  <li>• 10-point risk assessment specific to your goals</li>
                  <li>• Red flags to watch for in your target area</li>
                  <li>• Estimated savings from risk prevention</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="flex gap-8 mb-12">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                2
              </div>
            </div>
            <div className="flex-grow">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Investment Protection Activation</h3>
              <p className="text-gray-600 mb-4">
                Your €2,500 Investment Protection Fee immediately saves you €10,000+ by preventing 
                the first three mistakes every foreign investor makes. Think of it as insurance.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-blue-900 mb-2">Instant Access To:</p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• My vetted professional network (saves 3-6 months)</li>
                  <li>• True Cost Calculator for accurate budgeting</li>
                  <li>• Direct WhatsApp access to Giuseppe</li>
                  <li>• Preliminary market analysis for your target area</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="flex gap-8 mb-12">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                3
              </div>
            </div>
            <div className="flex-grow">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Due Diligence & Negotiation</h3>
              <p className="text-gray-600 mb-4">
                Before you commit a single euro to property, my team performs forensic due diligence. 
                I negotiate prices before sellers know you're foreign - typically saving 30-40%.
              </p>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-purple-900 mb-2">Protection Includes:</p>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Legal title verification</li>
                  <li>• Structural assessment by trusted engineers</li>
                  <li>• Anonymous price negotiation</li>
                  <li>• Hidden cost identification</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Step 4 */}
          <div className="flex gap-8 mb-12">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                4
              </div>
            </div>
            <div className="flex-grow">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Execution with Guaranteed Professionals</h3>
              <p className="text-gray-600 mb-4">
                Work only with contractors and professionals I've personally vetted through 10+ successful projects. 
                If they disappoint, they lose access to my entire network - that's your protection.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-amber-900 mb-2">Your Guarantees:</p>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• Fixed prices with no surprises</li>
                  <li>• Milestone-based payments</li>
                  <li>• Direct accountability to Giuseppe</li>
                  <li>• Problem resolution within 48 hours</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Step 5 */}
          <div className="flex gap-8">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                5
              </div>
            </div>
            <div className="flex-grow">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Ongoing Protection & Optimization</h3>
              <p className="text-gray-600 mb-4">
                Your investment doesn't end at purchase. I ensure you capture every grant opportunity, 
                optimize tax structures, and maximize returns through strategic improvements.
              </p>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-emerald-900 mb-2">Continuous Support:</p>
                <ul className="text-sm text-emerald-700 space-y-1">
                  <li>• Grant application management (€200K-€2.75M available)</li>
                  <li>• Tax optimization strategies</li>
                  <li>• Property management vetting</li>
                  <li>• Exit strategy planning</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* The Different Approach */}
        <div className="mt-20 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Why This Works Better Than Video Calls
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h4 className="font-semibold text-emerald-400 mb-3">Instead of "Getting to Know You":</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>You receive immediate value</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>I do my homework first</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>No sales pressure</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-emerald-400 mb-3">You Stay in Control:</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Review everything at your pace</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Ask questions via WhatsApp</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Video only when YOU'RE ready</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  )
}