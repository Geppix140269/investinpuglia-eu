'use client';

import { useState, useEffect } from 'react';
import { 
  Building2, 
  Users, 
  Globe, 
  BarChart,
  Shield,
  Award,
  TrendingUp,
  MapPin,
  Key,
  UserPlus,
  LayoutDashboard,
  ArrowRight,
  Check,
  Star
} from 'lucide-react';

export default function AgencyPortal() {
  const [activeView, setActiveView] = useState('overview');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    {
      icon: Building2,
      value: '250+',
      label: 'Active Properties',
      color: 'from-blue-500 to-indigo-600',
      description: 'Premium Mini PIA properties across Puglia'
    },
    {
      icon: Users,
      value: '5,000+',
      label: 'Qualified Investors',
      color: 'from-emerald-500 to-teal-600',
      description: 'HNW individuals from USA, UK, Germany & Switzerland'
    },
    {
      icon: TrendingUp,
      value: '€2.5M',
      label: 'Average Deal Size',
      color: 'from-purple-500 to-pink-600',
      description: 'Optimal investment range for Mini PIA program'
    },
    {
      icon: Award,
      value: '95%',
      label: 'Success Rate',
      color: 'from-amber-500 to-orange-600',
      description: 'Grant approval and closing success'
    }
  ];

  const benefits = [
    {
      title: 'Exclusive Network',
      description: 'Access our curated database of pre-qualified international investors',
      icon: Globe
    },
    {
      title: 'Premium Positioning',
      description: 'Showcase properties to high-net-worth individuals and institutional buyers',
      icon: Star
    },
    {
      title: 'Full Service Support',
      description: 'End-to-end assistance from listing to closing, including grant applications',
      icon: Shield
    },
    {
      title: 'Market Intelligence',
      description: 'Real-time analytics on investor preferences and market trends',
      icon: BarChart
    }
  ];

  const provinces = [
    { name: 'Bari', properties: 85, trending: true },
    { name: 'Lecce', properties: 72, trending: true },
    { name: 'Brindisi', properties: 45, trending: false },
    { name: 'Taranto', properties: 38, trending: false },
    { name: 'BAT', properties: 28, trending: true },
    { name: 'Foggia', properties: 32, trending: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Premium Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`
            }}
          />
        </div>

        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Award className="w-4 h-4" />
              EXCLUSIVE AGENCY NETWORK
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              InvestInPuglia
              <span className="block text-3xl md:text-4xl mt-2 bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
                Agency Partner Portal
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Connect premium Mini PIA properties with qualified international investors. 
              Join Puglia&apos;s most sophisticated real estate investment network.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button
                onClick={() => setActiveView('login')}
                className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 hover:scale-105"
              >
                <Key className="w-5 h-5" />
                Agency Login
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => setActiveView('register')}
                className="group px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 hover:scale-105"
              >
                <UserPlus className="w-5 h-5" />
                Become a Partner
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => setActiveView('dashboard')}
                className="group px-8 py-4 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 hover:scale-105"
              >
                <LayoutDashboard className="w-5 h-5" />
                View Demo
              </button>
            </div>
          </div>

          {/* Live Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-20 rounded-xl blur-xl group-hover:opacity-30 transition-opacity`}></div>
                <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <stat.icon className="w-6 h-6 text-white mb-2 opacity-80" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 py-12">
        {activeView === 'overview' && (
          <div className="space-y-12">
            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:scale-102 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>

            {/* Province Overview */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-amber-500" />
                  Active Properties by Province
                </h2>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Live Data
                </span>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {provinces.map((province, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-amber-400 transition-all duration-300 hover:scale-102"
                  >
                    <div>
                      <h3 className="font-semibold text-slate-900">{province.name}</h3>
                      <p className="text-2xl font-bold text-amber-600">{province.properties}</p>
                      <p className="text-xs text-gray-500">active listings</p>
                    </div>
                    {province.trending && (
                      <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        <TrendingUp className="w-3 h-3" />
                        <span className="text-xs font-semibold">Hot</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-12 text-center">
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid2' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='20' cy='20' r='1' fill='white' fill-opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid2)'/%3E%3C/svg%3E")`
                }}
              />
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to Elevate Your Real Estate Business?
                </h2>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join the exclusive network of agencies connecting premium Puglia properties 
                  with qualified international investors.
                </p>
                <button
                  onClick={() => setActiveView('register')}
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-2 hover:scale-105"
                >
                  Apply for Partnership
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeView === 'login' && (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Key className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Agency Login</h2>
                <p className="text-gray-600">Access your partner dashboard</p>
              </div>
              
              <iframe 
                src="/agency-login.html" 
                className="w-full h-[400px] border-0 rounded-xl"
                title="Agency Login"
              />
              
              <div className="mt-6 text-center">
                <button
                  onClick={() => setActiveView('overview')}
                  className="text-gray-600 hover:text-amber-600 transition-colors"
                >
                  ← Back to Overview
                </button>
              </div>
            </div>
          </div>
        )}

        {activeView === 'register' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <UserPlus className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Become a Partner Agency</h2>
                <p className="text-gray-600">Join our exclusive network</p>
              </div>
              
              {/* Partnership Benefits */}
              <div className="mb-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                <h3 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Partnership Benefits Include:
                </h3>
                <ul className="space-y-2 text-sm text-amber-800">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-600" />
                    Access to 5,000+ qualified international investors
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-600" />
                    Premium listing placement and marketing
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-600" />
                    Full grant application support (up to 55% funding)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-600" />
                    Dedicated account management
                  </li>
                </ul>
              </div>
              
              <iframe 
                src="/agency-registration.html" 
                className="w-full h-[600px] border-0 rounded-xl"
                title="Agency Registration"
              />
              
              <div className="mt-6 text-center">
                <button
                  onClick={() => setActiveView('overview')}
                  className="text-gray-600 hover:text-amber-600 transition-colors"
                >
                  ← Back to Overview
                </button>
              </div>
            </div>
          </div>
        )}

        {activeView === 'dashboard' && (
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <LayoutDashboard className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Agency Dashboard Demo</h2>
                      <p className="text-gray-300 text-sm">Preview the partner experience</p>
                    </div>
                  </div>
                  <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    DEMO MODE
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <iframe 
                  src="/agency-dashboard.html" 
                  className="w-full h-[700px] border-0 rounded-xl"
                  title="Agency Dashboard"
                />
              </div>
              
              <div className="p-6 border-t border-gray-200 text-center">
                <button
                  onClick={() => setActiveView('overview')}
                  className="text-gray-600 hover:text-amber-600 transition-colors"
                >
                  ← Back to Overview
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}