import React from 'react'
import Link from 'next/link'
import { ArrowRight, Award, Crown, Shield, Star } from 'lucide-react'

export default function PortfolioHero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-950" />
      
      {/* Luxury Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.15'%3E%3Cpath d='M60 0l30 30-30 30-30-30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px'
        }} />
      </div>
      
      {/* Radial Gradients for Depth */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-emerald-600/20 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-radial from-teal-600/20 to-transparent blur-3xl" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-gradient-radial from-amber-600/10 to-transparent blur-2xl" />
      
      {/* Premium Mesh Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40" />
      
      <div className="relative container mx-auto px-6 pt-40 pb-24 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto text-center text-white">
          
          {/* Prestige Badge */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 backdrop-blur-xl border border-amber-500/30 rounded-full px-8 py-4 mb-12 shadow-2xl">
            <Crown className="h-6 w-6 text-amber-400" />
            <span className="text-base font-semibold text-amber-100 tracking-wide">HERITAGE EXCELLENCE SINCE 1995</span>
            <Star className="h-5 w-5 text-amber-300" />
          </div>
          
          {/* Luxury Headlines */}
          <h1 className="text-5xl md:text-8xl font-bold mb-8 leading-[1.1] font-playfair">
            <span className="block bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent mb-4">
              Three Decades of
            </span>
            <span className="block bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
              Architectural Mastery
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl mb-6 text-slate-300 max-w-5xl mx-auto leading-relaxed font-light">
            Transforming Puglia's Historic Properties into World-Class Luxury Destinations
          </p>
          
          <p className="text-xl md:text-2xl mb-16 font-medium">
            <span className="text-amber-400">€100M+ Portfolio Value</span>
            <span className="text-slate-400 mx-4">•</span>
            <span className="text-emerald-400">50+ Premium Properties</span>
            <span className="text-slate-400 mx-4">•</span>
            <span className="text-teal-400">95% Success Rate</span>
          </p>
          
          {/* Premium CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20">
            <Link 
              href="/contact"
              className="group relative bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-500 hover:via-emerald-600 hover:to-teal-600 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 inline-flex items-center gap-4 shadow-2xl hover:shadow-emerald-900/50 hover:scale-105 min-w-[320px]"
            >
              <span className="relative z-10">Begin Your Investment Journey</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </Link>
            
            <Link 
              href="#portfolio"
              className="group relative border-2 border-amber-500/40 hover:border-amber-400/60 text-white hover:text-amber-100 px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 inline-flex items-center gap-4 backdrop-blur-xl bg-white/5 hover:bg-amber-500/10 min-w-[320px]"
            >
              <span>Explore Our Portfolio</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
          
          {/* Luxury Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { number: "30+", label: "Years of Excellence", icon: Shield, gradient: "from-amber-400 to-yellow-500" },
              { number: "€100M+", label: "Portfolio Value", icon: Crown, gradient: "from-emerald-400 to-teal-500" },
              { number: "50+", label: "Luxury Properties", icon: Star, gradient: "from-purple-400 to-pink-500" },
              { number: "95%", label: "Success Rate", icon: Award, gradient: "from-blue-400 to-cyan-500" }
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="group text-center">
                  <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:bg-white/15">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.gradient} mb-6 shadow-lg`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className={`text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                      {stat.number}
                    </div>
                    <div className="text-slate-300 text-sm font-medium tracking-wide uppercase">
                      {stat.label}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-20 text-center">
            <p className="text-slate-400 text-lg font-medium mb-4">
              Trusted by International Investors & Premium Hotel Chains
            </p>
            <div className="flex justify-center items-center gap-8 text-slate-500">
              <span className="text-sm">Baglioni Hotels</span>
              <span className="text-xs">•</span>
              <span className="text-sm">VOI Hotels</span>
              <span className="text-xs">•</span>
              <span className="text-sm">Italia Turismo</span>
              <span className="text-xs">•</span>
              <span className="text-sm">Alpitour</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}