// components/sections/InvestmentProtectionFee.tsx
import Icon from '@/lib/iconMappings'

export default function InvestmentProtectionFee() {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50" id="investment-protection">
      <div className="max-w-7xl mx-auto px-5">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-full mb-6">
            <Icon name="Shield" size={16} className="text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">Investment Protection</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            The €2,500 That <span className="font-bold text-emerald-600">Saves You €50,000</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            This isn't a fee for a conversation. It's insurance against the €100,000 mistake 
            that 95% of foreign investors make.
          </p>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Left: What You Get Immediately */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              What You Receive Within 48 Hours:
            </h3>
            
            <div className="space-y-4">
              {/* Item 1 */}
              <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="FileText" size={20} className="text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Personal Investment Risk Report</h4>
                    <p className="text-sm text-gray-600">10-point analysis of threats specific to your situation</p>
                    <p className="text-xs text-emerald-600 mt-1">Value: €5,000</p>
                  </div>
                </div>
              </div>
              
              {/* Item 2 */}
              <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Users" size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Vetted Professional Directory</h4>
                    <p className="text-sm text-gray-600">Instant access to my 35-year network (5 professionals)</p>
                    <p className="text-xs text-emerald-600 mt-1">6 months of vetting: Priceless</p>
                  </div>
                </div>
              </div>
              
              {/* Item 3 */}
              <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Calculator" size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">True Cost Calculator</h4>
                    <p className="text-sm text-gray-600">Reveals the 23 hidden costs others don't tell you</p>
                    <p className="text-xs text-emerald-600 mt-1">Prevents €30,000+ in surprises</p>
                  </div>
                </div>
              </div>
              
              {/* Item 4 */}
              <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPin" size={20} className="text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Market Intelligence Report</h4>
                    <p className="text-sm text-gray-600">Real pricing data for your target area (not listings)</p>
                    <p className="text-xs text-emerald-600 mt-1">Based on actual transactions</p>
                  </div>
                </div>
              </div>
              
              {/* Item 5 */}
              <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="MessageCircle" size={20} className="text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Direct WhatsApp Access</h4>
                    <p className="text-sm text-gray-600">Questions answered within 24 hours by Giuseppe</p>
                    <p className="text-xs text-emerald-600 mt-1">No assistants, no delays</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right: Why This Works */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Why Smart Investors Pay This First:
            </h3>
            
            {/* The Math */}
            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <h4 className="font-bold text-lg text-gray-900 mb-4">The Simple Math:</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-600">Average overpayment without help:</span>
                  <span className="font-semibold text-red-600">€47,000</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-600">Contractor deposit losses:</span>
                  <span className="font-semibold text-red-600">€15,000</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-600">Hidden legal issues:</span>
                  <span className="font-semibold text-red-600">€25,000</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-600">Grant opportunity losses:</span>
                  <span className="font-semibold text-red-600">€200,000</span>
                </div>
                <div className="flex justify-between items-center pt-3 text-lg">
                  <span className="font-bold text-gray-900">Total Risk Exposure:</span>
                  <span className="font-bold text-red-600">€287,000</span>
                </div>
                <div className="flex justify-between items-center pt-3 bg-emerald-50 -mx-6 px-6 py-3 -mb-6 rounded-b-xl">
                  <span className="font-bold text-emerald-900">Your Protection Cost:</span>
                  <span className="font-bold text-emerald-600">€2,500</span>
                </div>
              </div>
            </div>
            
            {/* Trust Elements */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white">
              <h4 className="font-bold text-lg mb-4">This Fee Also:</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Icon name="Filter" size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Filters out time-wasters (protects my time for serious clients)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Zap" size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Demonstrates you're serious about protecting your investment</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Clock" size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Allows me to dedicate immediate resources to your project</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Award" size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Guarantees priority attention from vetted professionals</span>
                </li>
              </ul>
            </div>
            
            {/* Testimonial */}
            <div className="mt-6 bg-blue-50 rounded-xl p-6 border border-blue-200">
              <p className="text-gray-700 italic mb-3">
                "I was skeptical about the fee, but the Risk Report alone saved me from 
                a €75,000 mistake. Giuseppe identified issues with a property that two 
                other advisors missed."
              </p>
              <p className="text-sm font-semibold text-gray-900">— Michael R., German Investor</p>
              <p className="text-xs text-gray-600">Saved €75,000 on first property</p>
            </div>
          </div>
        </div>
        
        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 md:p-12 text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Think Of It As Hiring Me To Prevent Your First Expensive Mistake
          </h3>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Most clients save 10x this amount from what they learn in the first week. 
            If you're not serious about protecting your investment, this isn't for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-emerald-600 rounded-full font-semibold text-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
              Start With Your Risk Report
            </button>
            <button className="px-8 py-4 bg-transparent text-white rounded-full font-semibold text-lg border-2 border-white/50 hover:bg-white/10 transition-all duration-200">
              See Client Success Stories
            </button>
          </div>
        </div>
        
      </div>
    </section>
  )
}