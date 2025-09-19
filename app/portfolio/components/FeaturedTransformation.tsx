import React from 'react'
import BeforeAfterSlider from '@/components/BeforeAfterSlider'
import { Euro, Users, Star, TrendingUp, Calendar, MapPin, Crown, Award, Gem, Target } from 'lucide-react'

export default function FeaturedTransformation() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Luxury Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50" />
      
      {/* Premium Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.3'%3E%3Cpath d='M30 0L45 15L30 30L15 15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>
      
      {/* Ambient Effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-radial from-amber-200/20 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-radial from-emerald-200/25 to-transparent blur-3xl" />
      
      <div className="relative container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Elite Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500/15 to-yellow-500/15 backdrop-blur-xl border border-amber-400/30 rounded-full px-8 py-4 mb-8 shadow-xl">
              <Gem className="h-6 w-6 text-amber-600" />
              <span className="text-base font-bold text-amber-800 tracking-wide uppercase">Signature Transformation</span>
            </div>
            
            <h2 className="text-6xl md:text-7xl font-bold mb-8 font-playfair">
              <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Masterpiece
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Transformation
              </span>
            </h2>
            
            <p className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
              Masseria Donna Menga - From Abandoned Heritage to Ultra-Luxury 5-Star Resort
            </p>
          </div>

          {/* Premium Before/After Showcase */}
          <div className="mb-16">
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-emerald-50/20 pointer-events-none" />
              
              <BeforeAfterSlider
                beforeImage="/Cataldo%27s%20projects/Donna%20Menga%20Before.webp"
                afterImage="/Cataldo%27s%20projects/Donna-Menga.webp"
                beforeLabel="2018 - Abandoned Heritage"
                afterLabel="2024 - Ultra-Luxury Resort"
                height={600}
                className="rounded-2xl overflow-hidden shadow-2xl ring-4 ring-amber-400/20"
              />
            </div>
          </div>

          {/* Luxury Details Grid */}
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Investment Details */}
            <div className="bg-gradient-to-br from-white/90 to-slate-50/90 backdrop-blur-2xl rounded-3xl p-10 border border-white/60 shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 font-playfair">Investment Excellence</h3>
              </div>
              
              <div className="space-y-6">
                {[
                  { icon: MapPin, label: "Location", value: "Nardò, Puglia", gradient: "from-blue-500 to-cyan-600" },
                  { icon: Euro, label: "Total Investment", value: "€2.3M", gradient: "from-amber-500 to-yellow-600" },
                  { icon: Calendar, label: "Completed", value: "2024", gradient: "from-purple-500 to-pink-600" },
                  { icon: Users, label: "Luxury Suites", value: "15 Premium", gradient: "from-emerald-500 to-teal-600" },
                  { icon: Star, label: "Rating Achieved", value: "5-Star Excellence", gradient: "from-rose-500 to-orange-600" },
                  { icon: TrendingUp, label: "Expected ROI", value: "35% Premium", gradient: "from-indigo-500 to-purple-600" }
                ].map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div key={index} className="flex items-center gap-6 p-4 rounded-2xl bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm border border-white/40 hover:scale-105 transition-all duration-300">
                      <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${item.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">{item.label}</div>
                        <div className="text-xl font-bold text-slate-900">{item.value}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 text-white shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Crown className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold font-playfair">Performance Excellence</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { value: "92%", label: "Occupancy Rate", color: "emerald", icon: TrendingUp },
                  { value: "€450", label: "Avg Daily Rate", color: "amber", icon: Euro },
                  { value: "4.9★", label: "Guest Rating", color: "purple", icon: Star },
                  { value: "24", label: "Jobs Created", color: "blue", icon: Users }
                ].map((metric, index) => (
                  <div key={index} className={`text-center p-6 rounded-2xl bg-gradient-to-br from-${metric.color}-500/20 to-${metric.color}-600/20 border border-${metric.color}-400/30 backdrop-blur-sm hover:scale-105 transition-all duration-300`}>
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-600 rounded-xl mb-4 shadow-lg`}>
                      <metric.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className={`text-4xl font-bold text-${metric.color}-400 mb-2`}>{metric.value}</div>
                    <div className="text-sm text-slate-400 font-medium">{metric.label}</div>
                  </div>
                ))}
              </div>
              
              {/* Executive Quote */}
              <div className="relative bg-gradient-to-r from-amber-500/20 to-yellow-500/20 backdrop-blur-sm rounded-2xl p-6 border border-amber-400/30">
                <div className="absolute -top-2 -left-2 text-5xl text-amber-400/50 font-serif">"</div>
                <blockquote className="relative z-10 pl-6">
                  <p className="text-lg italic leading-relaxed mb-4 text-slate-200">
                    This transformation exemplifies our mastery in converting abandoned heritage properties into profitable ultra-luxury destinations while preserving their authentic Puglian character and cultural significance.
                  </p>
                  <footer className="font-bold text-amber-400">
                    — Executive Portfolio Review
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
          
          {/* Success Highlight Bar */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-6 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-xl border border-emerald-400/20 rounded-2xl px-12 py-6">
              <Award className="h-8 w-8 text-emerald-600" />
              <div className="text-lg font-bold text-emerald-800">
                Project completed 6 months ahead of schedule with 15% cost savings
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}