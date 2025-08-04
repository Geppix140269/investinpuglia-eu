import React from 'react';
import { ArrowRight, TrendingUp, Globe2, CheckCircle, BarChart3, MapPin } from 'lucide-react';

export default function WhyPugliaSection() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-purple-50/20 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,.02) 35px, rgba(0,0,0,.02) 70px)`
        }}/>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <TrendingUp className="w-4 h-4" />
            <span>2024 MARKET INTELLIGENCE</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why Puglia Outperforms
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-emerald-600 mt-2">
              Every Other Italian Market
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            While Milan struggles with 3% returns and Rome faces oversaturation, 
            Puglia delivers 18.7% ROI with 74% foreign demand growth in just 4 years.
          </p>
        </div>

        {/* Live Market Dashboard */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-16 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-purple-600" />
            2024 Performance Metrics
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-6">
              <div className="text-4xl font-bold text-purple-700 mb-2">€9.9B</div>
              <div className="text-sm font-semibold text-purple-600 mb-1">Total Investment Volume</div>
              <div className="text-xs text-gray-600">+66% YoY Growth</div>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-6">
              <div className="text-4xl font-bold text-emerald-700 mb-2">62%</div>
              <div className="text-sm font-semibold text-emerald-600 mb-1">Foreign Capital Share</div>
              <div className="text-xs text-gray-600">Highest in Italy</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-6">
              <div className="text-4xl font-bold text-purple-700 mb-2">+350%</div>
              <div className="text-sm font-semibold text-purple-600 mb-1">US Investor Growth</div>
              <div className="text-xs text-gray-600">In Puglia specifically</div>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-6">
              <div className="text-4xl font-bold text-emerald-700 mb-2">4th</div>
              <div className="text-sm font-semibold text-emerald-600 mb-1">Most Requested Region</div>
              <div className="text-xs text-gray-600">By international buyers</div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Market Intelligence */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Globe2 className="w-6 h-6 text-purple-600" />
              Who's Buying & Why
            </h3>
            
            <div className="space-y-4 mb-8">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-lg font-semibold text-gray-900">🇺🇸 Americans</span>
                  <span className="text-sm font-bold text-purple-600">29.9% of market</span>
                </div>
                <p className="text-sm text-gray-600">Now #1 foreign buyers, up from 5% in 2023</p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-lg font-semibold text-gray-900">🇬🇧 British</span>
                  <span className="text-sm font-bold text-purple-600">9.8% of market</span>
                </div>
                <p className="text-sm text-gray-600">Returning post-Brexit for value opportunities</p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-lg font-semibold text-gray-900">🇩🇪 Germans</span>
                  <span className="text-sm font-bold text-purple-600">9.6% of market</span>
                </div>
                <p className="text-sm text-gray-600">+250% growth, seeking coastal properties</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-emerald-100 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Investment Sweet Spot</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>60% seek properties under €250k</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Average search budget: €423k</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Prefer 120+ sqm restored properties</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hot Zones */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <MapPin className="w-6 h-6 text-emerald-600" />
              2024-2025 Investment Hotspots
            </h3>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl p-5">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-bold">Bari Province</h4>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">+63.5%</span>
                </div>
                <p className="text-sm opacity-90">Capital access, international airport, business hub</p>
              </div>
              
              <div className="bg-white border-2 border-purple-200 rounded-xl p-5">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-bold text-gray-900">Ostuni</h4>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">+250%</span>
                </div>
                <p className="text-sm text-gray-600">From €200k • "White City" premium brand</p>
              </div>
              
              <div className="bg-white border-2 border-emerald-200 rounded-xl p-5">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-bold text-gray-900">Monopoli</h4>
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">Premium</span>
                </div>
                <p className="text-sm text-gray-600">€400k-1M+ • Luxury coastal market</p>
              </div>
              
              <div className="bg-white border-2 border-purple-200 rounded-xl p-5">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-bold text-gray-900">Valle d'Itria</h4>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">Trulli</span>
                </div>
                <p className="text-sm text-gray-600">Unique properties • International appeal</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-purple-50 to-emerald-50 rounded-3xl p-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            The Window Is Open Now
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            With supply constraints and increasing demand, Puglia's premium properties 
            are appreciating rapidly. Smart money is moving fast.
          </p>
          <button 
            onClick={() => window.location.href = 'https://buy.stripe.com/test_14A00l87i6NLaCC3M90x202'}
            className="group px-10 py-5 bg-gradient-to-r from-purple-600 to-emerald-600 text-white font-semibold text-lg rounded-full hover:shadow-2xl transition-all inline-flex items-center gap-3"
          >
            Get Your Market Analysis
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
