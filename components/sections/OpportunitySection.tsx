// components/sections/OpportunitySection.tsx
import Icon from '@/lib/iconMappings'

export default function OpportunitySection() {
  return (
    <section id="opportunity" className="py-20 relative bg-gradient-to-br from-white to-purple-50 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-400/20 to-emerald-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-5 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <Icon name="Target" size={20} />
            THE SMART APPROACH
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
            Why Risk It? <strong className="font-bold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">Work with Proven Experts</strong>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-white/50">
            <div className="mb-4">
              <Icon name="AlertTriangle" size={48} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">Avoid €100k+ Mistakes</h3>
            <p className="text-gray-700">
              95% of foreign investors overpay or face legal issues. Our vetted network of 
              local architects, engineers, and lawyers protect your investment.
            </p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-white/50">
            <div className="mb-4">
              <Icon name="Check" size={48} className="text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">Real References</h3>
            <p className="text-gray-700">
              Every professional in our network has completed 10+ successful projects. 
              Check references, see real results, work with confidence.
            </p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-white/50">
            <div className="mb-4">
              <Icon name="Trophy" size={48} className="text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent">Guaranteed Success</h3>
            <p className="text-gray-700">
              Our network has secured €50M+ in grants with 95% approval rate. 
              We know exactly what works and what doesn't.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
