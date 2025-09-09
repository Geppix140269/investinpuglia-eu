// components/sections/OpportunitySection_Protection.tsx
import Icon from '@/lib/iconMappings'

export default function OpportunitySectionProtection() {
  return (
    <section id="opportunity" className="py-20 bg-gradient-to-br from-gray-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-5">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 px-4 py-2 rounded-full mb-6">
            <Icon name="Shield" size={16} className="text-amber-600" />
            <span className="text-sm font-semibold text-amber-700 uppercase tracking-wide">Investment Protection</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            Why Others Fail, <span className="font-bold text-emerald-600">How I Protect You</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            After 35 years and €80M+ in projects, I've seen every mistake. 
            Now I use that experience to protect your investment.
          </p>
        </div>
        
        {/* The Three Pillars */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          
          {/* Pillar 1: Risk Elimination */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="bg-gradient-to-br from-red-500 to-orange-500 p-6">
              <Icon name="Shield" size={40} className="text-white mb-3" />
              <h3 className="text-2xl font-bold text-white">Risk Elimination</h3>
              <p className="text-white/90 text-sm mt-2">Prevent the 7 deadly mistakes</p>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle" size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Pre-purchase property forensics</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle" size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Contractor verification & guarantees</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle" size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Legal structure optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle" size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Hidden cost identification</span>
                </li>
              </ul>
              <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                <p className="text-sm font-semibold text-amber-900">Average Client Saves: €47,000</p>
                <p className="text-xs text-amber-700 mt-1">In prevented mistakes and overcharges</p>
              </div>
            </div>
          </div>
          
          {/* Pillar 2: Return Maximization */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-6">
              <Icon name="TrendingUp" size={40} className="text-white mb-3" />
              <h3 className="text-2xl font-bold text-white">Return Maximization</h3>
              <p className="text-white/90 text-sm mt-2">Opportunities others miss</p>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle" size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Off-market deal access</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle" size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Expert price negotiation</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle" size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Grant & incentive stacking</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle" size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Exit strategy planning</span>
                </li>
              </ul>
              <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                <p className="text-sm font-semibold text-emerald-900">Typical ROI Increase: +35%</p>
                <p className="text-xs text-emerald-700 mt-1">Versus unassisted investments</p>
              </div>
            </div>
          </div>
          
          {/* Pillar 3: Complete Peace of Mind */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-6">
              <Icon name="Users" size={40} className="text-white mb-3" />
              <h3 className="text-2xl font-bold text-white">Personal Advocacy</h3>
              <p className="text-white/90 text-sm mt-2">Your interests first, always</p>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle" size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Direct access to Giuseppe</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle" size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Personally vetted professionals</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle" size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Cultural & language bridge</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle" size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Problem resolution guarantee</span>
                </li>
              </ul>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm font-semibold text-blue-900">Client Success Rate: 100%</p>
                <p className="text-xs text-blue-700 mt-1">Zero failures in vetted network</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Trust Statement */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            "I Negotiate As If It's My Own Money"
          </h3>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Every professional I recommend has been personally vetted through multiple successful projects. 
            If they disappoint you, they lose my entire network's business.
          </p>
          <button className="px-8 py-4 bg-white text-emerald-600 rounded-full font-semibold text-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
            See How I Vet Professionals
          </button>
        </div>
        
      </div>
    </section>
  )
}