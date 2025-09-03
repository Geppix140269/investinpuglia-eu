// components/sections/GrantInstitutions.tsx
import Image from 'next/image'

export default function GrantInstitutions() {
  return (
    <section id="grants" className="py-20 bg-gradient-to-br from-purple-50 via-white to-emerald-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
              OUR GRANT EXPERTISE
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Beyond Mini PIA <strong className="font-bold">Full Spectrum Funding</strong>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              With 100+ years of combined project financing expertise, we secure grants beyond Mini PIA. 
              Our established relationships with funding authorities ensure your applications succeed where others fail.
            </p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/50">
            <p className="text-center text-sm text-gray-600 mb-8 font-medium">
              We navigate ALL EU and regional funding programs, including but not limited to Mini PIA:
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center mb-10">
              {/* European Union */}
              <div className="flex flex-col items-center">
                <img 
                  src="https://res.cloudinary.com/dusubfxgo/image/upload/v1756560841/png-clipart-member-state-of-the-european-union-germany-flag-of-europe-european-commission-european-union-energy-label-text-symmetry_ouit5f.png" 
                  alt="European Union" 
                  className="h-20 w-auto object-contain mb-3"
                />
                <p className="text-xs text-gray-600 text-center font-medium">European Union</p>
                <p className="text-xs text-gray-500">Structural Funds</p>
              </div>
              
              {/* Italian Republic */}
              <div className="flex flex-col items-center">
                <img 
                  src="https://res.cloudinary.com/dusubfxgo/image/upload/v1756560841/Emblem_of_Italy.svg_pcuswm.png" 
                  alt="Repubblica Italiana" 
                  className="h-20 w-auto object-contain mb-3"
                />
                <p className="text-xs text-gray-600 text-center font-medium">Repubblica Italiana</p>
                <p className="text-xs text-gray-500">National Co-funding</p>
              </div>
              
              {/* Coesione Italia */}
              <div className="flex flex-col items-center">
                <img 
                  src="https://res.cloudinary.com/dusubfxgo/image/upload/v1756560841/coesione-italia_tmsc2c.png" 
                  alt="Coesione Italia" 
                  className="h-20 w-auto object-contain mb-3"
                />
                <p className="text-xs text-gray-600 text-center font-medium">Coesione Italia</p>
                <p className="text-xs text-gray-500">2021-2027</p>
              </div>
              
              {/* Regione Puglia */}
              <div className="flex flex-col items-center">
                <img 
                  src="https://res.cloudinary.com/dusubfxgo/image/upload/v1756561192/regione_puglia-Photoroom_h2h5fb.png" 
                  alt="Regione Puglia" 
                  className="h-20 w-auto object-contain mb-3"
                />
                <p className="text-xs text-gray-600 text-center font-medium">Regione Puglia</p>
                <p className="text-xs text-gray-500">POR Puglia</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-xs text-gray-700 text-center">
                  <strong className="text-gray-900">PROFESSIONAL DISTINCTION:</strong> InvestInPuglia.eu is an elite advisory firm with demonstrable expertise. 
                  Our team's 30+ years of international experience and LOCAL Italian network gives us unmatched access to funding opportunities. 
                  We work with projects above €1M only - it's a privilege to have us orchestrate your investment journey. 
                  All institutional logos shown indicate the funding sources we expertly navigate for our clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
