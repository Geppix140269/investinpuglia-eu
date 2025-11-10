import Link from 'next/link'
import Icon from '@/lib/iconMappings'

export default function AboutUsSummary() {
  return (
    <section id="about-summary" className="py-20 bg-gradient-to-br from-emerald-900 via-emerald-800 to-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white/90 px-5 py-2 rounded-full text-sm font-semibold mb-6">
            <Icon name="Users" size={20} />
            ABOUT US
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-white mb-4">
            Meet Your <strong className="font-bold">Investment Partners</strong>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            A dedicated team of professionals combining international business acumen 
            with deep local expertise to deliver exceptional property investment opportunities in Puglia.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-600 to-amber-500 flex items-center justify-center text-white text-3xl font-bold">
              GF
            </div>
            <h3 className="text-xl font-bold mb-2">Giuseppe Funaro</h3>
            <p className="text-emerald-300 font-semibold mb-3">Chief Executive Officer</p>
            <p className="text-white/80 text-sm">
              International property investor with 15+ years experience. 
              Direct access to €2.25M+ in EU grants and subsidized finance.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-600 to-amber-500 flex items-center justify-center text-white text-3xl font-bold">
              CR
            </div>
            <h3 className="text-xl font-bold mb-2">Ing. Arch. Cataldo Russo</h3>
            <p className="text-emerald-300 font-semibold mb-3">Chief Technical Officer</p>
            <p className="text-white/80 text-sm">
              €80M+ in completed projects. Specialized in luxury hotel 
              conversions and heritage restorations across Puglia.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-600 to-amber-500 flex items-center justify-center text-white text-3xl font-bold">
              AQ
            </div>
            <h3 className="text-xl font-bold mb-2">Dott. Antonio Quarta</h3>
            <p className="text-emerald-300 font-semibold mb-3">Chief Financial Officer</p>
            <p className="text-white/80 text-sm">
              Chartered accountant specializing in subsidized finance. 
              Expert in EU funding applications and tax optimization.
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <Link 
            href="/about"
            className="inline-flex items-center gap-2 bg-white text-emerald-900 px-8 py-4 rounded-full font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Learn More About Our Team
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}