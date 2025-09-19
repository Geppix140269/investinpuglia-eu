import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Sparkles, Euro, Calendar, MapPin, ArrowRight, CheckCircle, Star, Crown, Gem, TrendingUp } from 'lucide-react'

export default function UpcomingProjects() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Luxury Investment Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50/40 to-pink-50/60" />
      
      {/* Premium Investment Pattern */}
      <div className="absolute inset-0 opacity-6">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c084fc' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='10'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>
      
      {/* Ambient Investment Effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-radial from-purple-300/15 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-radial from-indigo-300/20 to-transparent blur-3xl" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-radial from-pink-300/10 to-transparent blur-2xl" />
      
      <div className="relative container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Elite Investment Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 backdrop-blur-xl border border-purple-400/40 rounded-full px-8 py-4 mb-8 shadow-xl">
              <Star className="h-6 w-6 text-purple-600" />
              <span className="text-base font-bold text-purple-900 tracking-wide uppercase">Exclusive Investment Opportunity</span>
              <Gem className="h-5 w-5 text-purple-600" />
            </div>
            
            <h2 className="text-6xl md:text-7xl font-bold mb-8 font-playfair">
              <span className="bg-gradient-to-r from-purple-800 to-indigo-800 bg-clip-text text-transparent">
                Hotel
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Shantiland
              </span>
            </h2>
            
            <p className="text-2xl text-slate-700 max-w-4xl mx-auto leading-relaxed font-light">
              Next-Generation Wellness Resort - Fully Financed & Investment-Ready
            </p>
          </div>

          {/* Premium Investment Showcase */}
          <div className="max-w-6xl mx-auto">
            <div className="relative bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/60 overflow-hidden">
              
              {/* Luxury Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-purple-50/20 pointer-events-none" />
              
              {/* Premium Hero Image */}
              <div className="relative h-[600px] overflow-hidden rounded-t-3xl">
                <Image
                  src="/Cataldo%27s%20projects/shantiland.png"
                  alt="Hotel Shantiland - Luxury Wellness Resort"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/30 to-transparent" />
                
                {/* Floating Investment Badge */}
                <div className="absolute top-8 right-8 bg-gradient-to-r from-amber-500/90 to-yellow-500/90 backdrop-blur-xl border border-amber-400/40 rounded-2xl px-6 py-3">
                  <div className="flex items-center gap-2 text-white">
                    <Crown className="h-5 w-5" />
                    <span className="font-bold text-sm uppercase tracking-wide">Premium Investment</span>
                  </div>
                </div>
                
                {/* Elegant Project Title */}
                <div className="absolute bottom-0 left-0 right-0 p-12">
                  <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                    <h3 className="text-5xl font-bold mb-4 text-white font-playfair">Hotel Shantiland</h3>
                    <div className="flex items-center gap-6 text-xl text-purple-200">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-6 w-6" />
                        <span>Otranto, Puglia</span>
                      </div>
                      <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                      <div className="flex items-center gap-3">
                        <Sparkles className="h-6 w-6" />
                        <span>Wellness Resort</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Investment Details */}
              <div className="relative p-12">
                
                {/* Executive Summary */}
                <div className="mb-12">
                  <p className="text-2xl text-slate-700 leading-relaxed font-light text-center max-w-4xl mx-auto">
                    A revolutionary wellness resort concept combining ultra-luxury accommodation with holistic health facilities, 
                    strategically positioned to capitalize on the rapidly expanding wellness tourism market.
                  </p>
                </div>

                {/* Investment Highlights Grid */}
                <div className="grid lg:grid-cols-2 gap-12 mb-12">
                  
                  {/* Financial Details */}
                  <div className="bg-gradient-to-br from-emerald-50/80 to-teal-50/80 backdrop-blur-xl rounded-3xl p-10 border border-emerald-200/50 shadow-xl">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl flex items-center justify-center shadow-lg">
                        <Euro className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="text-3xl font-bold text-emerald-900 font-playfair">Investment Excellence</h4>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/40">
                        <div>
                          <div className="text-sm text-emerald-600 font-medium uppercase tracking-wide">Total Investment</div>
                          <div className="text-4xl font-bold text-emerald-800">€2,167,000</div>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                          <TrendingUp className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Grant Funding */}
                  <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 backdrop-blur-xl rounded-3xl p-10 border border-blue-200/50 shadow-xl">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
                        <CheckCircle className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="text-3xl font-bold text-blue-900 font-playfair">Grant Secured</h4>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/40">
                        <div>
                          <div className="text-sm text-blue-600 font-medium uppercase tracking-wide">PIA Turismo Grant</div>
                          <div className="text-4xl font-bold text-blue-800">€1,084,000</div>
                          <div className="text-blue-600 font-semibold">50% Funding Secured</div>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                          <Crown className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  {[
                    { value: "2025", label: "Launch Year", icon: Calendar, gradient: "from-purple-500 to-violet-600" },
                    { value: "24", label: "Luxury Suites", icon: Gem, gradient: "from-indigo-500 to-purple-600" },
                    { value: "40%", label: "Expected ROI", icon: TrendingUp, gradient: "from-emerald-500 to-teal-600" }
                  ].map((metric, index) => {
                    const Icon = metric.icon
                    return (
                      <div key={index} className="text-center p-8 rounded-2xl bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-sm border border-white/50 hover:scale-105 transition-all duration-300 shadow-xl">
                        <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${metric.gradient} rounded-2xl mb-6 shadow-lg`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <div className="text-4xl font-bold text-slate-900 mb-2">{metric.value}</div>
                        <div className="text-slate-600 font-medium">{metric.label}</div>
                      </div>
                    )
                  })}
                </div>

                {/* Premium CTA */}
                <div className="text-center">
                  <Link
                    href="/shantiland"
                    className="group inline-flex items-center gap-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 shadow-2xl hover:shadow-purple-900/30 hover:scale-105 min-w-[400px]"
                  >
                    <span className="relative z-10">View Exclusive Investment Details</span>
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Investment Opportunity Highlight */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-6 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 backdrop-blur-xl border border-amber-400/20 rounded-2xl px-12 py-6">
              <Star className="h-8 w-8 text-amber-600" />
              <div className="text-lg font-bold text-amber-800">
                Limited Partnership Opportunities Available - Contact for Exclusive Access
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}