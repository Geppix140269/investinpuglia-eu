// components/sections/GrantInstitutions.tsx
export default function GrantInstitutions() {
  return (
    <section id="grants" className="py-20 bg-gradient-to-br from-purple-50 via-white to-emerald-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
              FUNDING PROGRAM AFFILIATION
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Grant Source <strong className="font-bold">Institutions</strong>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Invest in Puglia™ is your trusted connection to verified local professionals who ensure 
              your grant applications succeed and your projects avoid the common pitfalls that cost time and money.
            </p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/50">
            <p className="text-center text-sm text-gray-600 mb-6 font-medium">
              This grant opportunity is co-financed by:
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-12 mb-8">
              <div className="flex flex-col items-center">
                <img 
                  src="/EN_co_fundedvertical_RGB_POS.png" 
                  alt="Co-funded by the European Union" 
                  className="h-24 w-auto mb-2"
                />
              </div>
              
              <div className="flex flex-col items-center">
                <img 
                  src="/regione_puglia-Photoroom.png" 
                  alt="Regione Puglia" 
                  className="h-20 w-auto mb-2"
                />
                <p className="text-sm text-gray-600">Regione Puglia</p>
                <p className="text-xs text-gray-500">POR Puglia 2014-2027</p>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <p className="text-xs text-gray-500 text-center italic">
                <strong>Disclaimer:</strong> Invest in Puglia™ is an independent private consultancy and is not 
                affiliated with or endorsed by Regione Puglia or the European Union.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
