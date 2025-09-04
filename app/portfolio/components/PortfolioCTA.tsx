import React from 'react'
import Link from 'next/link'
import { ArrowRight, Crown, Star, Sparkles, Phone, Mail } from 'lucide-react'

export default function PortfolioCTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Luxury CTA Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-950" />
      
      {/* Premium Pattern Overlay */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.1'%3E%3Cpath d='M60 0L80 20L60 40L40 20z M60 60L80 80L60 100L40 80z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px'
        }} />
      </div>
      
      {/* Ambient Luxury Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-amber-500/15 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-radial from-emerald-500/15 to-transparent blur-3xl" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-gradient-radial from-teal-500/10 to-transparent blur-2xl" />
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-gradient-radial from-amber-500/10 to-transparent blur-3xl" />
      
      {/* Gradient Mesh Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/60" />
      
      <div className="relative container mx-auto px-6">
        <div className="max-w-6xl mx-auto text-center text-white">
          
          {/* Elite CTA Header */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 backdrop-blur-xl border border-amber-500/30 rounded-full px-8 py-4 mb-8 shadow-2xl">
              <Crown className="h-6 w-6 text-amber-400" />
              <span className="text-base font-bold text-amber-100 tracking-wide uppercase">Exclusive Partnership</span>
              <Star className="h-5 w-5 text-amber-400" />
            </div>
            
            <h2 className="text-6xl md:text-7xl font-bold mb-8 leading-[1.1] font-playfair">
              <span className="block bg-gradient-to-r from-white via-emerald-200 to-teal-200 bg-clip-text text-transparent mb-4">
                Ready to Transform
              </span>
              <span className="block bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Your Investment Vision?
              </span>
            </h2>
            
            <p className="text-2xl md:text-3xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light mb-6">
              Join 50+ distinguished investors who have transformed their properties into profitable luxury destinations
            </p>
            
            <p className="text-xl text-emerald-300 font-medium">
              Expert guidance • Grant funding mastery • Guaranteed excellence
            </p>
          </div>
          
          {/* Premium CTA Buttons */}
          <div className="flex flex-col lg:flex-row gap-8 justify-center items-center mb-20">
            <Link 
              href="/contact"
              className="group relative bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 hover:from-amber-400 hover:via-yellow-400 hover:to-orange-400 text-slate-900 px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 inline-flex items-center gap-4 shadow-2xl hover:shadow-amber-900/30 hover:scale-105 min-w-[350px]"
            >
              <Phone className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10">Schedule Executive Consultation</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-300 to-yellow-300 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </Link>
            
            <Link 
              href="/services"
              className="group relative border-2 border-emerald-400/40 hover:border-emerald-300/60 text-white hover:text-emerald-100 px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 inline-flex items-center gap-4 backdrop-blur-xl bg-emerald-500/10 hover:bg-emerald-500/20 min-w-[350px]"
            >
              <Sparkles className="h-6 w-6 group-hover:rotate-180 transition-transform duration-500" />
              <span>Explore Premium Services</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
          
          {/* Contact Information Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            
            {/* Direct Contact Card */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-white font-playfair">Direct Access</h3>
                  <p className="text-slate-300">Immediate consultation</p>
                </div>
              </div>
              <div className="text-left space-y-2">
                <div className="text-amber-400 text-xl font-semibold">+39 123 456 7890</div>
                <div className="text-slate-400 text-sm">Available 9:00-18:00 CET</div>
              </div>
            </div>
            
            {/* Email Contact Card */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-white font-playfair">Executive Email</h3>
                  <p className="text-slate-300">Detailed proposals</p>
                </div>
              </div>
              <div className="text-left space-y-2">
                <div className="text-emerald-400 text-xl font-semibold">info@investinpuglia.eu</div>
                <div className="text-slate-400 text-sm">Response within 24 hours</div>
              </div>
            </div>
          </div>
          
          {/* Trust Indicators */}
          <div className="text-center">
            <div className="inline-flex items-center gap-8 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-12 py-6 mb-8">
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-amber-400" />
                <span className="text-amber-300 font-semibold">50+ Luxury Projects</span>
              </div>
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-emerald-400" />
                <span className="text-emerald-300 font-semibold">95% Success Rate</span>
              </div>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-teal-400" />
                <span className="text-teal-300 font-semibold">€100M+ Portfolio</span>
              </div>
            </div>
            
            {/* Final Trust Message */}
            <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
              Confidential consultations available • NDA protection standard • International investors welcome
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}