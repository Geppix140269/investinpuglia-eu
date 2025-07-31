// components/sections/SuccessStories.tsx
import Icon from '@/lib/iconMappings'

export default function SuccessStories() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-emerald-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white/90 px-5 py-2 rounded-full text-sm font-semibold mb-6">
            <Icon name="Star" size={20} />
            PROVEN RESULTS
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-white mb-4">
            Success Stories That <strong className="font-bold">Inspire</strong>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 hover:-translate-y-2 transition-all">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Icon key={i} name="Star" size={20} className="text-yellow-400" />
              ))}
            </div>
            <p className="text-lg mb-4 text-white/90">
              "We saved €180k by avoiding a property with hidden structural issues that Giuseppe's 
              team discovered. His network is worth their weight in gold."
            </p>
            <div className="pt-4 border-t border-white/20">
              <p className="font-semibold">Mark Thompson</p>
              <p className="text-sm text-white/70">UK Investor • Lecce Project</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 hover:-translate-y-2 transition-all">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Icon key={i} name="Star" size={20} className="text-yellow-400" />
              ))}
            </div>
            <p className="text-lg mb-4 text-white/90">
              "The architect Giuseppe recommended completed our project 2 months early and 
              €50k under budget. Real professionals make all the difference!"
            </p>
            <div className="pt-4 border-t border-white/20">
              <p className="font-semibold">Sophie Laurent</p>
              <p className="text-sm text-white/70">French Investor • Ostuni Villa</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 hover:-translate-y-2 transition-all">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Icon key={i} name="Star" size={20} className="text-yellow-400" />
              ))}
            </div>
            <p className="text-lg mb-4 text-white/90">
              "Other investors we know spent 3x more and still have problems. Giuseppe's 
              team handled everything perfectly - grants approved, project profitable!"
            </p>
            <div className="pt-4 border-t border-white/20">
              <p className="font-semibold">James Mitchell</p>
              <p className="text-sm text-white/70">US Investor • Gallipoli Resort</p>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-8 text-white/90 bg-white/10 backdrop-blur-md px-8 py-4 rounded-full">
            <div>
              <p className="text-4xl font-bold">€50M+</p>
              <p className="text-sm">Grants Secured by Network</p>
            </div>
            <div className="w-px h-12 bg-white/30"></div>
            <div>
              <p className="text-4xl font-bold">€100k+</p>
              <p className="text-sm">Average Savings Per Client</p>
            </div>
            <div className="w-px h-12 bg-white/30"></div>
            <div>
              <p className="text-4xl font-bold">Zero</p>
              <p className="text-sm">Project Failures</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
