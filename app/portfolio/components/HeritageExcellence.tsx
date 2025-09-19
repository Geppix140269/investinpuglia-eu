import React from 'react'
import Image from 'next/image'
import { Users, TrendingUp, Award, MapPin, Euro, Calendar, Crown, Shield, Gem, Castle } from 'lucide-react'

export default function HeritageExcellence() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Heritage Luxury Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-yellow-50/40 to-orange-50/60" />
      
      {/* Premium Heritage Pattern */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.08'%3E%3Cpath d='M40 0L56 16L40 32L24 16z M40 48L56 64L40 80L24 64z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px'
        }} />
      </div>
      
      {/* Ambient Heritage Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-amber-300/15 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-radial from-yellow-300/20 to-transparent blur-3xl" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-gradient-radial from-orange-300/10 to-transparent blur-2xl" />
      
      <div className="relative container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Heritage Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 backdrop-blur-xl border border-amber-400/40 rounded-full px-8 py-4 mb-8 shadow-xl">
              <Castle className="h-6 w-6 text-amber-700" />
              <span className="text-base font-bold text-amber-900 tracking-wide uppercase">Heritage Mastery</span>
            </div>
            
            <h2 className="text-6xl md:text-7xl font-bold mb-8 font-playfair">
              <span className="bg-gradient-to-r from-amber-800 to-yellow-800 bg-clip-text text-transparent">
                Cultural
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Excellence
              </span>
            </h2>
            
            <p className="text-2xl text-slate-700 max-w-4xl mx-auto leading-relaxed font-light">
              Torre Matta & Otranto Castle Underground Recovery - UNESCO Standard Restoration
            </p>
          </div>

          {/* Premium Heritage Showcase */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            
            {/* Heritage Image */}
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-transparent to-yellow-50/20 pointer-events-none" />
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-4 ring-amber-400/30">
                <Image
                  src="https://res.cloudinary.com/dusubfxgo/image/upload/v1756663589/investinpuglia/og-images/torre-matta.jpg"
                  alt="Torre Matta Heritage Restoration"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 via-amber-900/20 to-transparent" />
                <div className="absolute bottom-8 left-8 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Crown className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold font-playfair">Torre Matta</h3>
                      <p className="text-amber-200 font-medium">Historic Monument Restoration</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm bg-amber-600/30 backdrop-blur-sm rounded-full px-4 py-2 border border-amber-400/30">
                    <Shield className="h-4 w-4" />
                    <span>UNESCO Heritage Standards</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Heritage Impact Details */}
            <div className="bg-gradient-to-br from-white/95 to-amber-50/90 backdrop-blur-2xl rounded-3xl p-10 border border-white/70 shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-yellow-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Gem className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 font-playfair">Cultural Impact</h3>
              </div>
              
              <div className="space-y-6 mb-8">
                {[
                  { icon: Award, label: "UNESCO Heritage Standards", value: "Certified Excellence", gradient: "from-amber-500 to-yellow-600" },
                  { icon: Users, label: "Annual Visitors", value: "50,000+", gradient: "from-blue-500 to-cyan-600" },
                  { icon: TrendingUp, label: "Local Employment", value: "12 Jobs Created", gradient: "from-emerald-500 to-teal-600" },
                  { icon: Euro, label: "Annual Revenue", value: "€500K+", gradient: "from-purple-500 to-pink-600" }
                ].map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div key={index} className="flex items-center gap-6 p-6 rounded-2xl bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-sm border border-white/50 hover:scale-105 transition-all duration-300">
                      <div className={`flex-shrink-0 w-14 h-14 bg-gradient-to-r ${item.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">{item.label}</div>
                        <div className="text-xl font-bold text-slate-900">{item.value}</div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Project Metrics */}
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-amber-100 to-yellow-100 border border-amber-200/50 shadow-lg">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-600 to-yellow-700 rounded-xl mb-4 shadow-lg">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-amber-800 mb-2">2016</div>
                  <div className="text-sm text-amber-600 font-medium">Completed</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 border border-emerald-200/50 shadow-lg">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-xl mb-4 shadow-lg">
                    <Euro className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-emerald-800 mb-2">€600K</div>
                  <div className="text-sm text-emerald-600 font-medium">Investment</div>
                </div>
              </div>
            </div>
          </div>

          {/* Heritage Excellence Pillars */}
          <div className="relative bg-gradient-to-br from-slate-900 to-amber-900 rounded-3xl p-12 text-white shadow-2xl overflow-hidden">
            
            {/* Luxury Background Effects */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-radial from-amber-500/20 to-transparent blur-3xl" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-gradient-radial from-yellow-500/15 to-transparent blur-3xl" />
            
            <div className="relative grid md:grid-cols-3 gap-8 text-center">
              {[
                {
                  icon: Castle,
                  title: "Cultural Heritage",
                  description: "Preserving Puglia's historic treasures for future generations",
                  gradient: "from-amber-500 to-yellow-600"
                },
                {
                  icon: TrendingUp,
                  title: "Economic Growth",
                  description: "Driving sustainable tourism and economic development",
                  gradient: "from-emerald-500 to-teal-600"
                },
                {
                  icon: Users,
                  title: "Community Impact",
                  description: "Creating meaningful employment and cultural pride",
                  gradient: "from-blue-500 to-cyan-600"
                }
              ].map((pillar, index) => {
                const Icon = pillar.icon
                return (
                  <div key={index} className="group">
                    <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${pillar.gradient} rounded-2xl mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold mb-4 font-playfair group-hover:text-amber-300 transition-colors">
                      {pillar.title}
                    </h4>
                    <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors">
                      {pillar.description}
                    </p>
                  </div>
                )
              })}
            </div>
            
            {/* Heritage Quote */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-4 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 backdrop-blur-sm rounded-2xl px-8 py-6 border border-amber-400/30">
                <Award className="h-8 w-8 text-amber-400 flex-shrink-0" />
                <div className="text-lg font-medium text-amber-200">
                  "Honoring the past while building the future - this is the essence of our heritage restoration philosophy"
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}