import React from 'react'
import { TrendingUp, Building2, Euro, Users, Award, Clock, Crown, Gem, Target, Shield } from 'lucide-react'

const stats = {
  totalValue: 100000000,
  projectsCompleted: 50,
  grantsSecured: 20000000,
  yearsExperience: 30,
  successRate: 95,
  averageROI: 35
}

export default function PortfolioStats() {
  const premiumStats = [
    {
      icon: Crown,
      value: "€100M+",
      label: "Portfolio Value",
      description: "Total investment value managed",
      gradient: "from-amber-500 to-yellow-600",
      bgGradient: "from-amber-500/20 to-yellow-600/20",
      borderColor: "border-amber-400/40",
      glowColor: "shadow-amber-500/20"
    },
    {
      icon: Gem,
      value: "50+",
      label: "Luxury Properties",
      description: "Premium hotels & resorts delivered",
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-500/20 to-teal-600/20",
      borderColor: "border-emerald-400/40",
      glowColor: "shadow-emerald-500/20"
    },
    {
      icon: Euro,
      value: "€20M+",
      label: "Grant Funding",
      description: "Secured through expertise",
      gradient: "from-purple-500 to-violet-600",
      bgGradient: "from-purple-500/20 to-violet-600/20",
      borderColor: "border-purple-400/40",
      glowColor: "shadow-purple-500/20"
    },
    {
      icon: Shield,
      value: "30+",
      label: "Years of Excellence",
      description: "Proven track record",
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-500/20 to-cyan-600/20",
      borderColor: "border-blue-400/40",
      glowColor: "shadow-blue-500/20"
    },
    {
      icon: Award,
      value: "95%",
      label: "Success Rate",
      description: "Projects completed successfully",
      gradient: "from-rose-500 to-pink-600",
      bgGradient: "from-rose-500/20 to-pink-600/20",
      borderColor: "border-rose-400/40",
      glowColor: "shadow-rose-500/20"
    },
    {
      icon: TrendingUp,
      value: "35%+",
      label: "Average ROI",
      description: "Exceptional returns delivered",
      gradient: "from-orange-500 to-red-600",
      bgGradient: "from-orange-500/20 to-red-600/20",
      borderColor: "border-orange-400/40",
      glowColor: "shadow-orange-500/20"
    }
  ]

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Luxury Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-950" />
      
      {/* Premium Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.1'%3E%3Cpath d='M40 0L60 20L40 40L20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px'
        }} />
      </div>
      
      {/* Ambient Light Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-amber-500/15 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-radial from-emerald-500/15 to-transparent blur-3xl" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-gradient-radial from-teal-500/10 to-transparent blur-2xl" />
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-gradient-radial from-purple-500/10 to-transparent blur-3xl" />
      
      {/* Gradient Mesh Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-slate-900/60" />
      
      <div className="relative container mx-auto px-6">
        <div className="max-w-7xl mx-auto text-white">
          
          {/* Elite Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 backdrop-blur-xl border border-amber-500/30 rounded-full px-8 py-4 mb-8 shadow-2xl">
              <Target className="h-6 w-6 text-amber-400" />
              <span className="text-base font-bold text-amber-100 tracking-wide uppercase">Performance Excellence</span>
            </div>
            
            <h2 className="text-6xl md:text-7xl font-bold mb-6 font-playfair">
              <span className="bg-gradient-to-r from-white via-emerald-200 to-teal-200 bg-clip-text text-transparent">
                Excellence Measured
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                in Results
              </span>
            </h2>
            
            <p className="text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
              Three decades of consistent performance delivering exceptional returns for our distinguished investment partners
            </p>
          </div>
          
          {/* Premium Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {premiumStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div 
                  key={index}
                  className={`group relative bg-gradient-to-br ${stat.bgGradient} backdrop-blur-2xl border ${stat.borderColor} rounded-3xl p-8 hover:scale-105 transition-all duration-500 hover:bg-gradient-to-br hover:from-white/10 hover:to-white/5 shadow-2xl ${stat.glowColor} hover:shadow-3xl`}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {/* Luxury Icon Container */}
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${stat.gradient} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  
                  {/* Main Value */}
                  <div className={`text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  
                  {/* Primary Label */}
                  <div className="text-xl font-semibold text-white mb-2 group-hover:text-amber-100 transition-colors">
                    {stat.label}
                  </div>
                  
                  {/* Description */}
                  <div className="text-slate-400 text-sm font-medium group-hover:text-slate-300 transition-colors">
                    {stat.description}
                  </div>
                  
                  {/* Subtle Hover Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                </div>
              )
            })}
          </div>
          
          {/* Trust Indicators */}
          <div className="text-center">
            <div className="inline-flex items-center gap-6 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-12 py-6 mb-8">
              <div className="text-amber-400 text-lg font-semibold">
                Trusted by Elite Investors Worldwide
              </div>
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <div className="text-emerald-400 text-lg font-semibold">
                Specialized in Puglian Heritage Excellence
              </div>
            </div>
            
            {/* Prestigious Clients */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-slate-400">
              {['Baglioni Hotels', 'VOI Hotels', 'Italia Turismo', 'Alpitour', 'International Investors'].map((client, index) => (
                <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                  <Crown className="h-4 w-4 text-amber-400" />
                  <span className="text-sm font-medium">{client}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}