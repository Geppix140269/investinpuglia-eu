import Image from 'next/image'
import { Building2, MapPin, CheckCircle, User, Clock, AlertCircle } from 'lucide-react'

export default function ShantilandSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-6 py-3 rounded-full mb-4">
            <Building2 className="h-5 w-5" />
            <span className="font-bold text-lg">Financed & Planned Development</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">Hotel Shantiland - New Construction Project</h2>
          <p className="text-xl text-gray-600">
            PIA Turismo approved project with building permit issued October 2024
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-blue-400">
            {/* Project Image Header */}
            <div className="relative h-[400px] overflow-hidden">
              <Image
                src="https://res.cloudinary.com/dusubfxgo/image/upload/v1756631635/shantiland_tacrma.jpg"
                alt="Hotel Shantiland Rendering"
                width={1200}
                height={400}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-4xl font-bold mb-2">Hotel Shantiland</h3>
                <div className="flex items-center gap-2 text-xl">
                  <MapPin className="h-6 w-6" />
                  <span>Otranto</span>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-blue-400 text-white px-4 py-2 rounded-full font-bold">
                PERMIT ISSUED - OCT 2024
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Project Details */}
                <div>
                  <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                    New luxury tourist accommodation development. Full PIA Turismo funding secured and approved. 
                    Building permit (Permesso di Costruire n. 27/2024) issued on October 18, 2024.
                  </p>
                  
                  <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-bold text-green-800">PIA Turismo - Fully Approved</span>
                    </div>
                    <div className="text-sm text-green-700">
                      Co-financed by Regione Puglia under Title II - Chapter 6 for tourism investments
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Building2 className="h-4 w-4" />
                      <span>Client: <strong>Shantiland srl</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="h-4 w-4" />
                      <span>Project Manager: <strong>Ing. Cataldo Russo</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Construction Start: <strong>2025</strong></span>
                    </div>
                  </div>
                </div>
                
                {/* Funding Breakdown */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                  <h4 className="font-bold text-xl mb-4 text-gray-800">Investment Structure</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-gray-600">Total Investment</span>
                      <span className="font-bold text-2xl text-gray-900">€2,167,400</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-gray-600">PIA Grant (50%)</span>
                      <span className="font-bold text-xl text-green-600">€1,084,000</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-gray-600">Private Equity</span>
                      <span className="font-bold text-xl text-blue-600">€1,083,400</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Approval Year</span>
                      <span className="font-bold text-gray-900">2022</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-yellow-100 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-700" />
                      <span className="text-sm font-semibold text-yellow-800">
                        Construction contractor: D'AMICO CARLO - Carpignano Salentino
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}