import React from 'react'
import Image from 'next/image'
import { Award, Euro, Building2, Clock, CheckCircle, Star, Crown, Shield, Sparkles } from 'lucide-react'

export default function ExpertTeamPremium() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Luxury Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-emerald-50/50 to-teal-50/80" />
      
      {/* Premium Pattern Overlay */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.05'%3E%3Cpath d='M50 0L75 25L50 50L25 25z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }} />
      </div>
      
      {/* Radial Gradients for Depth */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-emerald-200/30 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-radial from-teal-200/40 to-transparent blur-3xl" />
      
      <div className="relative container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Elite Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500/20 via-yellow-500/15 to-orange-500/20 backdrop-blur-2xl border border-amber-400/30 rounded-full px-8 py-4 mb-8 shadow-2xl">
              <Crown className="h-6 w-6 text-amber-600" />
              <span className="text-base font-bold text-amber-800 tracking-wide uppercase">Executive Leadership</span>
              <Star className="h-5 w-5 text-amber-600" />
            </div>
            
            <h2 className="text-6xl md:text-7xl font-bold mb-6 font-playfair">
              <span className="bg-gradient-to-r from-slate-800 via-emerald-700 to-teal-800 bg-clip-text text-transparent">
                Your Distinguished
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Investment Advisor
              </span>
            </h2>
            
            <p className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
              Three decades of architectural mastery transforming Puglia's heritage into world-class luxury destinations
            </p>
          </div>

          {/* Premium Glass Morphism Card */}
          <div className="relative bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-emerald-50/30 pointer-events-none" />
            
            <div className="relative grid lg:grid-cols-5 gap-0">
              
              {/* Left: Executive Portrait */}
              <div className="lg:col-span-2 relative bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 p-12 lg:p-16">
                <div className="relative z-10">
                  
                  {/* Portrait with Luxury Frame */}
                  <div className="relative w-80 h-80 mx-auto mb-8 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-amber-400/50">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-transparent z-10" />
                    <Image
                      src="/Cataldo's projects/Donna-Menga.webp"
                      alt="Dott. Ing. Cataldo Russo - Chief Executive Advisor"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  
                  <div className="text-center text-white">
                    <h3 className="text-4xl font-bold mb-3 font-playfair">Dott. Ing. Cataldo Russo</h3>
                    <p className="text-2xl text-amber-200 mb-3 font-medium">Chief Executive Advisor</p>
                    <p className="text-emerald-300 mb-8 font-semibold">Licensed Engineer-Architect #1697 | Lecce Order</p>
                    
                    {/* Elite Achievement Badges */}
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-amber-500/30 to-yellow-500/30 backdrop-blur-xl border border-amber-400/40 rounded-2xl px-6 py-4">
                        <div className="text-3xl font-bold text-amber-300 mb-1">€100M+</div>
                        <div className="text-amber-100 text-sm font-medium">Portfolio Value</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-emerald-500/30 to-teal-500/30 backdrop-blur-xl border border-emerald-400/40 rounded-xl px-4 py-3">
                          <div className="text-2xl font-bold text-emerald-300">50+</div>
                          <div className="text-emerald-100 text-xs">Premium Hotels</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-500/30 to-cyan-500/30 backdrop-blur-xl border border-blue-400/40 rounded-xl px-4 py-3">
                          <div className="text-2xl font-bold text-blue-300">30+</div>
                          <div className="text-blue-100 text-xs">Years Excellence</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Luxury Ambient Effects */}
                <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-radial from-amber-500/20 to-transparent blur-3xl" />
                <div className="absolute bottom-0 right-0 w-60 h-60 bg-gradient-radial from-emerald-500/15 to-transparent blur-3xl" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-radial from-teal-500/10 to-transparent blur-2xl" />
              </div>

              {/* Right: Executive Details */}
              <div className="lg:col-span-3 p-12 lg:p-16 bg-gradient-to-br from-white/80 to-slate-50/90 backdrop-blur-xl">
                
                {/* Professional Excellence Section */}
                <div className="mb-12">
                  <h4 className="text-3xl font-bold text-slate-900 mb-8 font-playfair flex items-center gap-3">
                    <Sparkles className="h-8 w-8 text-amber-600" />
                    Distinguished Expertise
                  </h4>
                  
                  <div className="space-y-6">
                    {[
                      {
                        icon: Shield,
                        title: "ITACA Protocol Master Certification",
                        desc: "Elite sustainable construction & energy efficiency specialist since 2016",
                        gradient: "from-emerald-500 to-teal-600",
                        bg: "from-emerald-50 to-teal-50"
                      },
                      {
                        icon: Euro,
                        title: "€20M+ Grant Funding Mastery",
                        desc: "Unparalleled expertise in PIA Turismo, PSR, POIN, L.488 funding programs",
                        gradient: "from-amber-500 to-yellow-600",
                        bg: "from-amber-50 to-yellow-50"
                      },
                      {
                        icon: Building2,
                        title: "International Resort Authority",
                        desc: "Trusted advisor to Baglioni, VOI Hotels, Italia Turismo, Alpitour",
                        gradient: "from-purple-500 to-pink-600",
                        bg: "from-purple-50 to-pink-50"
                      }
                    ].map((item, index) => {
                      const Icon = item.icon
                      return (
                        <div key={index} className={`flex items-start gap-6 p-6 rounded-2xl bg-gradient-to-br ${item.bg} border border-white/60 hover:scale-105 transition-all duration-300`}>
                          <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <h5 className="font-bold text-xl text-slate-900 mb-2">{item.title}</h5>
                            <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Executive Performance Metrics */}
                <div className="grid grid-cols-2 gap-6 mb-12">
                  {[
                    { value: "95%", label: "Grant Success Rate", color: "emerald", icon: CheckCircle },
                    { value: "35%", label: "Average ROI", color: "amber", icon: Award },
                    { value: "5★", label: "Hotel Standards", color: "purple", icon: Star },
                    { value: "500+", label: "Jobs Created", color: "blue", icon: Building2 }
                  ].map((metric, index) => (
                    <div key={index} className={`bg-gradient-to-br from-${metric.color}-50 to-${metric.color}-100/80 backdrop-blur-xl rounded-2xl p-6 text-center border border-${metric.color}-200/50 hover:scale-105 transition-all duration-300 shadow-lg`}>
                      <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-600 rounded-xl mb-4 shadow-lg`}>
                        <metric.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className={`text-4xl font-bold text-${metric.color}-700 mb-2`}>{metric.value}</div>
                      <div className="text-sm text-slate-600 font-medium">{metric.label}</div>
                    </div>
                  ))}
                </div>

                {/* Executive Testimonial */}
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-white">
                  <div className="absolute -top-3 -left-3 text-8xl text-amber-400/30 font-serif">"</div>
                  <blockquote className="relative z-10 pl-6">
                    <p className="text-xl italic leading-relaxed mb-6 text-slate-100">
                      Each investment represents a unique opportunity to honor Puglia's extraordinary heritage while creating world-class luxury destinations. My three decades of architectural mastery and grant expertise ensure exceptional returns for our distinguished partners.
                    </p>
                    <footer className="font-bold text-amber-400 text-lg">
                      — Cataldo Russo, Chief Executive Advisor
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}