import Image from 'next/image'
import { Home, Award, CheckCircle, MapPin, Euro, Calendar } from 'lucide-react'

export default function TorreMattaShowcase() {
  return (
    <section className="py-20 bg-gradient-to-br from-stone-100 to-amber-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://res.cloudinary.com/dusubfxgo/image/upload/v1756663589/investinpuglia/og-images/torre-matta.jpg"
                  alt="Torre Matta - Otranto Castle Underground"
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-amber-600 to-orange-600 text-white rounded-2xl p-6 shadow-xl max-w-xs">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5" />
                  <span className="font-semibold">Heritage Excellence</span>
                </div>
                <p className="text-sm">2017 National Heritage Restoration Award Winner</p>
              </div>
            </div>

            {/* Content Side */}
            <div>
              <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Home className="h-4 w-4" />
                Historic Preservation Masterpiece
              </span>
              
              <h2 className="text-4xl font-bold mb-4">Torre Matta</h2>
              <p className="text-xl text-gray-600 mb-6">Otranto Castle Underground Recovery</p>
              
              <p className="text-gray-700 mb-8">
                Exceptional restoration of Otranto Castle's underground chambers, transforming forgotten medieval spaces 
                into a cultural heritage site. This project showcases our expertise in preserving historical authenticity 
                while creating functional modern spaces.
              </p>
              
              {/* Key Achievements */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Project Achievements</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">UNESCO Heritage Standards Compliance</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Structural reinforcement of 15th-century vaults</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Advanced humidity control systems</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">LED lighting preserving original atmosphere</span>
                  </div>
                </div>
              </div>
              
              {/* Impact Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-lg font-semibold text-amber-600">50,000+</div>
                  <div className="text-xs text-gray-600">Annual Visitors</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-lg font-semibold text-amber-600">12 Jobs</div>
                  <div className="text-xs text-gray-600">Positions Created</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-lg font-semibold text-amber-600">€500K</div>
                  <div className="text-xs text-gray-600">Annual Revenue</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-lg font-semibold text-amber-600">2017</div>
                  <div className="text-xs text-gray-600">Award Winner</div>
                </div>
              </div>
              
              {/* Project Details */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>Otranto Historic Center</span>
                </div>
                <div className="flex items-center gap-2">
                  <Euro className="h-4 w-4 text-gray-400" />
                  <span className="font-semibold">€600,000</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>2016</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}