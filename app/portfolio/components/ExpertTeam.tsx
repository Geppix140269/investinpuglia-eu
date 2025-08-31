import React from 'react'
import Image from 'next/image'
import { Award, Euro, Building2, Clock, Star, Target } from 'lucide-react'

export default function ExpertTeam() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Meet Your Expert Team
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Led by industry veterans with three decades of proven excellence in luxury hospitality development across Puglia
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left Column - Photo */}
              <div className="relative bg-gradient-to-br from-emerald-600 to-emerald-800 p-12 lg:p-16 flex items-center justify-center">
                <div className="relative">
                  <div className="w-80 h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                    <Image
                      src="https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/russo-photo"
                      alt="Dott. Ing. Cataldo Russo - Chief Technical Officer"
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Professional badge overlay */}
                  <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl">
                    <div className="flex items-center gap-2">
                      <Award className="h-6 w-6 text-emerald-600" />
                      <span className="text-sm font-bold text-slate-800">Licensed #1697</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Info */}
              <div className="p-12 lg:p-16">
                <div className="mb-8">
                  <h3 className="text-4xl font-bold mb-3 text-slate-800">Dott. Ing. Cataldo Russo</h3>
                  <p className="text-2xl text-emerald-600 font-semibold mb-2">Chief Technical Officer</p>
                  <p className="text-lg text-slate-600">Engineer-Architect & Master Planner</p>
                </div>

                <div className="grid grid-cols-1 gap-4 mb-8">
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                    <div className="bg-emerald-100 p-3 rounded-lg">
                      <Clock className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-800">30+ Years Experience</span>
                      <p className="text-sm text-slate-600">Luxury tourism & heritage development</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                    <div className="bg-emerald-100 p-3 rounded-lg">
                      <Euro className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-800">€20M+ Grants Secured</span>
                      <p className="text-sm text-slate-600">PIA Turismo, Titolo II, PSR expertise</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                    <div className="bg-emerald-100 p-3 rounded-lg">
                      <Building2 className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-800">50+ Premium Properties</span>
                      <p className="text-sm text-slate-600">Hotels, resorts, heritage restorations</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                    <div className="bg-emerald-100 p-3 rounded-lg">
                      <Target className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-800">95% Project Success Rate</span>
                      <p className="text-sm text-slate-600">Consistently delivered on time & budget</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-slate-50 p-6 rounded-2xl border-l-4 border-emerald-600">
                  <p className="text-slate-700 leading-relaxed italic text-lg">
                    "Each project represents a unique opportunity to honor Puglia's extraordinary heritage while creating world-class hospitality destinations. Our deep expertise in grant navigation and architectural excellence ensures exceptional returns for our investment partners."
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <Star className="h-5 w-5 text-amber-500" />
                    <Star className="h-5 w-5 text-amber-500" />
                    <Star className="h-5 w-5 text-amber-500" />
                    <Star className="h-5 w-5 text-amber-500" />
                    <Star className="h-5 w-5 text-amber-500" />
                    <span className="ml-2 text-sm text-slate-600 font-medium">Consistently 5-star results</span>
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