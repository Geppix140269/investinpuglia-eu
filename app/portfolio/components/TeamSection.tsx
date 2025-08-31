export default function TeamSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Expert Team</h2>
          <p className="text-xl text-gray-600">
            Complete project delivery from concept to operation
          </p>
        </div>
        
        {/* Cataldo Russo - Main Profile Only (removed extra boxes) */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="md:grid md:grid-cols-3 gap-8 p-8">
            {/* Photo */}
            <div className="md:col-span-1">
              <div className="relative">
                <img
                  src="/russo-photo.jpg"
                  alt="Dott. Ing. Cataldo Russo"
                  className="rounded-full w-48 h-48 mx-auto border-4 border-white shadow-xl object-cover"
                />
              </div>
            </div>
            
            {/* Cataldo's Info */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-2">Dott. Ing. Cataldo Russo</h3>
              <p className="text-indigo-600 font-semibold mb-3">Chief Technical Officer & Lead Engineer-Architect</p>
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Professional Certifications:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Ord. Ing. Lecce #1697
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    ITACA Protocol
                  </span>
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Fire Safety L.818/84
                  </span>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Safety Coord. D.Lgs 81/08
                  </span>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                With nearly three decades of experience, <strong>Ing. Cataldo Russo</strong> personally leads our technical team in delivering 
                world-class tourism developments. His direct expertise in grant funding and regulatory compliance 
                has secured over €20 million in funding for international investors.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-2xl font-bold text-indigo-600">50+</div>
                  <div className="text-sm text-gray-600">Projects Delivered</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">€20M+</div>
                  <div className="text-sm text-gray-600">Grants Secured</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">29 Years</div>
                  <div className="text-sm text-gray-600">Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}