import React from 'react'
import { Award, Shield, FileCheck, Briefcase, User, Crown, Star, Gem, Target, CheckCircle } from 'lucide-react'

const executiveCredentials = [
  {
    icon: Crown,
    title: "Licensed Engineer-Architect",
    description: "Registered with Lecce Order of Engineers (#1697) since 1995 - Highest Honors",
    highlight: "110/110 Summa Cum Laude",
    gradient: "from-amber-500 to-yellow-600",
    bgGradient: "from-amber-50/90 to-yellow-50/90",
    borderColor: "border-amber-200/60"
  },
  {
    icon: Shield,
    title: "ITACA Protocol Master Certified",
    description: "Elite sustainable construction & energy efficiency specialist certification",
    highlight: "Since 2016",
    gradient: "from-emerald-500 to-teal-600",
    bgGradient: "from-emerald-50/90 to-teal-50/90",
    borderColor: "border-emerald-200/60"
  },
  {
    icon: FileCheck,
    title: "Fire Safety Authority",
    description: "Ministry of Interior certified for advanced fire prevention systems design",
    highlight: "Law 818/84 Certified",
    gradient: "from-red-500 to-orange-600",
    bgGradient: "from-red-50/90 to-orange-50/90",
    borderColor: "border-red-200/60"
  },
  {
    icon: Briefcase,
    title: "Grant Funding Mastery",
    description: "€20M+ secured through PIA Turismo, PSR, POIN, L.488 programs",
    highlight: "95% Success Rate",
    gradient: "from-purple-500 to-violet-600",
    bgGradient: "from-purple-50/90 to-violet-50/90",
    borderColor: "border-purple-200/60"
  }
]

export default function PortfolioCredentials() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Executive Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-gray-50 to-slate-100" />
      
      {/* Premium Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23475569' fill-opacity='0.4'%3E%3Cpath d='M50 0L70 20L50 40L30 20z M50 60L70 80L50 100L30 80z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }} />
      </div>
      
      {/* Ambient Effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-radial from-amber-200/20 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-radial from-slate-300/25 to-transparent blur-3xl" />
      
      <div className="relative container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Executive Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-slate-800/10 to-gray-800/10 backdrop-blur-xl border border-slate-300/40 rounded-full px-8 py-4 mb-8 shadow-xl">
              <Target className="h-6 w-6 text-slate-700" />
              <span className="text-base font-bold text-slate-800 tracking-wide uppercase">Executive Credentials</span>
            </div>
            
            <h2 className="text-6xl md:text-7xl font-bold mb-8 font-playfair">
              <span className="bg-gradient-to-r from-slate-800 to-gray-800 bg-clip-text text-transparent">
                Professional
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                Excellence
              </span>
            </h2>
            
            <p className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
              Led by Dott. Ing. Cataldo Russo - Three decades of architectural mastery in luxury hospitality development
            </p>
          </div>
          
          {/* Executive Credentials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {executiveCredentials.map((cred, index) => {
              const Icon = cred.icon
              return (
                <div 
                  key={index} 
                  className={`group bg-gradient-to-br ${cred.bgGradient} backdrop-blur-xl rounded-3xl p-8 border ${cred.borderColor} shadow-xl hover:scale-105 transition-all duration-500 hover:shadow-2xl`}
                >
                  <div className="text-center mb-6">
                    <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${cred.gradient} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-slate-800 transition-colors">
                      {cred.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed group-hover:text-slate-700 transition-colors">
                      {cred.description}
                    </p>
                    <div className={`inline-block bg-gradient-to-r ${cred.gradient} text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg`}>
                      {cred.highlight}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Executive Profile Showcase */}
          <div className="relative bg-gradient-to-br from-slate-900 to-gray-900 rounded-3xl shadow-2xl overflow-hidden">
            
            {/* Luxury Background Effects */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-radial from-amber-500/20 to-transparent blur-3xl" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-gradient-radial from-slate-600/15 to-transparent blur-3xl" />
            
            <div className="relative p-12 text-white">
              
              {/* Executive Header */}
              <div className="flex items-start gap-8 mb-10">
                <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <User className="h-12 w-12 text-white" />
                </div>
                <div>
                  <h3 className="text-4xl font-bold mb-3 font-playfair">Dott. Ing. Cataldo Russo</h3>
                  <p className="text-2xl text-amber-200 mb-2">Chief Executive Advisor & Founder</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-amber-400/30">
                      <Star className="h-4 w-4 text-amber-400" />
                      <span className="text-sm font-medium text-amber-200">30+ Years Excellence</span>
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-emerald-400/30">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      <span className="text-sm font-medium text-emerald-200">€100M+ Portfolio</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Executive Summary */}
              <div className="grid md:grid-cols-3 gap-8 mb-10">
                <div className="md:col-span-2">
                  <p className="text-xl leading-relaxed text-slate-200 mb-6">
                    With three decades of distinguished service in architectural excellence, Dott. Ing. Cataldo Russo has 
                    successfully orchestrated the transformation of Puglia's hospitality landscape through the delivery of over 
                    €100 million in luxury tourism projects.
                  </p>
                  <p className="text-lg text-slate-300 leading-relaxed">
                    His unparalleled expertise in securing government grants, managing complex heritage restorations, and 
                    navigating regulatory frameworks has established him as the trusted advisor for international hotel chains, 
                    private investors, and institutional partners seeking exceptional returns in the Italian hospitality sector.
                  </p>
                </div>
                
                {/* Achievement Highlights */}
                <div className="space-y-4">
                  {[
                    { label: "Projects Delivered", value: "50+" },
                    { label: "Success Rate", value: "95%" },
                    { label: "Grant Success", value: "€20M+" },
                    { label: "Average ROI", value: "35%" }
                  ].map((stat, index) => (
                    <div key={index} className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <div className="text-amber-400 text-2xl font-bold">{stat.value}</div>
                      <div className="text-slate-400 text-sm font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Executive Testimonial */}
              <div className="relative bg-gradient-to-r from-amber-500/20 to-yellow-500/20 backdrop-blur-sm rounded-2xl p-8 border border-amber-400/30">
                <div className="absolute -top-3 -left-3 text-7xl text-amber-400/30 font-serif">"</div>
                <blockquote className="relative z-10 pl-6">
                  <p className="text-xl italic leading-relaxed mb-6 text-slate-100">
                    Every project represents a unique opportunity to honor Italy's architectural heritage while creating 
                    world-class destinations that deliver exceptional returns. My commitment is to transform your vision 
                    into a profitable reality through three decades of proven expertise and uncompromising excellence.
                  </p>
                  <footer className="font-bold text-amber-400 text-lg">
                    — Dott. Ing. Cataldo Russo, Chief Executive Advisor
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}