import React from 'react';
import { Award, Building2, Globe2, Languages, ArrowRight, TrendingUp, Euro, Users, MapPin, Shield } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-purple-50/40 to-emerald-50/40">
      {/* Enhanced gradient orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-300/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-200/10 to-emerald-200/10 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 pt-20 sm:pt-24 md:pt-28 text-center">
        {/* Professional Affiliations - Clear & Prominent */}
        <div className="mb-12">
          <p className="text-center text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">
            Trusted by Leading Organizations
          </p>
          <div className="flex justify-center items-center gap-12">
            <a 
              href="https://capitalimprese.it" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-105">
                <img 
                  src="/CAPITALIMPRESE-min.png" 
                  alt="CapitalImprese" 
                  className="h-16 w-auto object-contain mb-3" 
                />
                <div className="text-center">
                  <p className="font-semibold text-gray-900">CapitalImprese</p>
                  <p className="text-xs text-gray-600">International Relations Department</p>
                  <p className="text-xs text-purple-600 font-medium">70,000 Members</p>
                </div>
              </div>
            </a>
            
            <a 
              href="https://tradecouncil.org" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-105">
                <img 
                  src="/ITC-min.png" 
                  alt="International Trade Council" 
                  className="h-16 w-auto object-contain mb-3" 
                />
                <div className="text-center">
                  <p className="font-semibold text-gray-900">ITC Member</p>
                  <p className="text-xs text-gray-600">International Trade Council</p>
                  <p className="text-xs text-emerald-600 font-medium">Global Network</p>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Premium badge with credentials */}
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold mb-8 shadow-xl">
          <Award size={20} />
          <span>30 YEARS C-LEVEL EXPERIENCE • €200M+ MANAGED</span>
        </div>

        {/* Professional Photo */}
        <div className="mb-8">
          <img 
            src="/Giuseppe Funaro 062025.png" 
            alt="Giuseppe Funaro"
            className="w-40 h-48 rounded-2xl object-cover shadow-xl mx-auto"
          />
        </div>

        {/* Main Title - Professional */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-gray-900 mb-6 md:mb-8 leading-tight">
          <span className="font-extralight">Strategic Advisory for</span>
          <span className="block font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-emerald-600 bg-clip-text text-transparent">
            International Investors
          </span>
          <span className="block text-2xl sm:text-3xl md:text-4xl font-light text-gray-700 mt-4">
            Puglia Real Estate & EU Funding
          </span>
        </h1>

        {/* Executive positioning - replacing service categories */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-gray-700 mb-10 text-sm sm:text-base">
          <span className="bg-white/80 backdrop-blur-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
            <Building2 size={16} className="inline mr-2 text-purple-600" />
            International Relations Dept. • CapitalImprese
          </span>
          <span className="bg-white/80 backdrop-blur-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-emerald-200 shadow-lg hover:shadow-xl transition-shadow">
            <Globe2 size={16} className="inline mr-2 text-emerald-600" />
            70,000 Business Network
          </span>
          <span className="bg-white/80 backdrop-blur-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
            <Languages size={16} className="inline mr-2 text-purple-600" />
            EN • IT • ES
          </span>
        </div>

        {/* Value proposition - stronger */}
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-light max-w-4xl mx-auto mb-10 md:mb-12 px-4 sm:px-0 leading-relaxed">
          From managing <span className="font-semibold text-purple-600">€200M operations</span> to maximizing 
          <span className="font-semibold text-emerald-600"> your Puglia investment</span>
        </p>

        {/* CTA Buttons - More prominent */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center mb-16 px-4 sm:px-0">
          <button 
            onClick={() => window.location.href = 'https://calendly.com/investinpuglia/30min'}
            className="group bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-semibold hover:shadow-2xl transition-all text-lg hover:scale-105 w-full sm:w-auto inline-flex items-center justify-center gap-3"
          >
            Book Executive Consultation
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => window.location.href = 'https://classic.investinpuglia.eu'}
            className="bg-white/80 backdrop-blur-sm text-gray-900 border-2 border-gray-200 px-8 sm:px-10 py-4 sm:py-5 rounded-full font-semibold hover:shadow-xl hover:border-purple-300 transition-all text-lg hover:scale-105 w-full sm:w-auto text-center"
          >
            Calculate Your Grant →
          </button>
        </div>

        {/* Trust indicators - More executive focused */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 max-w-6xl mx-auto px-4 sm:px-0">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-shadow">
            <TrendingUp size={36} className="mx-auto mb-3 text-purple-600" />
            <div className="text-2xl font-bold text-gray-900 mb-1">€200M+</div>
            <div className="text-sm text-gray-600">Managed Operations</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-shadow">
            <Award size={36} className="mx-auto mb-3 text-emerald-600" />
            <div className="text-2xl font-bold text-gray-900 mb-1">30 Years</div>
            <div className="text-sm text-gray-600">C-Level Experience</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-shadow">
            <Euro size={36} className="mx-auto mb-3 text-purple-600" />
            <div className="text-2xl font-bold text-gray-900 mb-1">€2.25M</div>
            <div className="text-sm text-gray-600">Grant Access</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-shadow">
            <Users size={36} className="mx-auto mb-3 text-emerald-600" />
            <div className="text-2xl font-bold text-gray-900 mb-1">70,000</div>
            <div className="text-sm text-gray-600">Business Network</div>
          </div>
        </div>

        {/* Executive quote */}
        <div className="mt-12 max-w-3xl mx-auto">
          <p className="text-lg text-gray-700 italic font-light border-l-4 border-purple-600 pl-6">
            "I don't just understand grants - I understand business."
          </p>
        </div>

        {/* Contact information */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
          <a 
            href="https://www.linkedin.com/in/giuseppe-funaro/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn Profile
          </a>
          <a 
            href="mailto:g.funaro@capitalimprese.it"
            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            g.funaro@capitalimprese.it
          </a>
        </div>
      </div>
    </section>
  );
}
