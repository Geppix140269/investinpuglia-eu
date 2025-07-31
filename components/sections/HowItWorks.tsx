// components/sections/HowItWorks.tsx
import Icon from '@/lib/iconMappings'

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-emerald-900 text-white relative overflow-hidden" id="how-it-works">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.1)_0%,transparent_70%)]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-5 py-2 rounded-full text-sm font-semibold mb-6">
            <Icon name="RefreshCw" size={20} />
            YOUR SUCCESS PATH
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-white mb-4">
            From Vision to <strong className="font-bold">Profitable Reality</strong>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 hover:-translate-y-2 transition-all">
            <div className="mb-4">
              <Icon name="Shield" size={48} className="text-amber-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-amber-400">Due Diligence</h3>
            <p className="text-gray-300">
              Our experts uncover hidden issues before you buy, saving you from costly surprises
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 hover:-translate-y-2 transition-all">
            <div className="mb-4">
              <Icon name="Users" size={48} className="text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-cyan-400">Local Team</h3>
            <p className="text-gray-300">
              Work with architects, engineers, and contractors who have proven track records
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 hover:-translate-y-2 transition-all">
            <div className="mb-4">
              <Icon name="Banknote" size={48} className="text-orange-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-orange-400">Grant Success</h3>
            <p className="text-gray-300">
              95% approval rate because we know exactly what grant evaluators require
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 hover:-translate-y-2 transition-all">
            <div className="mb-4">
              <Icon name="TrendingUp" size={48} className="text-rose-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-rose-400">ROI Maximized</h3>
            <p className="text-gray-300">
              Avoid overpaying, secure maximum grants, achieve 25%+ annual returns
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
