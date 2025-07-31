// components/sections/FAQ.tsx
import Icon from '@/lib/iconMappings'

export default function FAQ() {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-purple-50 to-emerald-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto px-5 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-5 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <Icon name="HelpCircle" size={20} />
            COMMON QUESTIONS
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
            Everything You Need to <strong className="font-bold">Know</strong>
          </h2>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border border-white/50">
            <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">
              What are the biggest risks for foreign investors?
            </h3>
            <p className="text-gray-700">
              Language barriers, hiring unvetted contractors, missing grant deadlines, and 
              overpaying for properties. Most lose €100k+ to avoidable mistakes. Our verified 
              network eliminates these risks completely.
            </p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border border-white/50">
            <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">
              How do you protect my investment?
            </h3>
            <p className="text-gray-700">
              Every professional is pre-vetted with 10+ successful projects. You get references, 
              fixed-price contracts, and I personally oversee your project. We've never had a 
              failure because we only work with proven experts.
            </p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border border-white/50">
            <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">
              How much are Puglia property grants?
            </h3>
            <p className="text-gray-700">
              Foreign investors can secure up to €2.25M for property investment 
              in Puglia through Mini PIA grants, covering 35-65% of eligible costs.
            </p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border border-white/50">
            <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">
              Best areas for Puglia property investment?
            </h3>
            <p className="text-gray-700">
              Top investment zones: Lecce (cultural capital), coastal properties 
              in Gallipoli and Otranto, trulli properties in Valle d'Itria, 
              and emerging areas near Brindisi airport.
            </p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border border-white/50">
            <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">
              Can foreigners buy property in Puglia?
            </h3>
            <p className="text-gray-700">
              Yes, EU and non-EU citizens can freely purchase property in Puglia. 
              Our advisory services handle all legal requirements and maximize 
              available grants for foreign investors.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
