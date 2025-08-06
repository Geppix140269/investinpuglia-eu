import React, { useState, useEffect } from 'react';
import { TrendingUp, Euro, Users, MapPin, ArrowRight, CheckCircle, Globe, Building, Shield, Award, Clock, Zap, ChevronRight, Hotel, Home, Utensils, Factory } from 'lucide-react';

const HeroExecutive = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState('trulli');
 const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  // Project types with real Mini PIA data
  const projectTypes = {
    trulli: {
      icon: Home,
      name: "Trulli & Historic Properties",
      grant: "55%",
      max: "€2.25M",
      description: "Boutique hotels, luxury rentals, unique accommodations"
    },
    hotels: {
      icon: Hotel,
      name: "Hotels & Tourism",
      grant: "45%",
      max: "€5M",
      description: "Beach resorts, spa hotels, hospitality ventures"
    },
    restaurants: {
      icon: Utensils,
      name: "Restaurants & Agriturismo",
      grant: "50%",
      max: "€2M",
      description: "Dining, wine estates, farm-to-table concepts"
    },
    manufacturing: {
      icon: Factory,
      name: "Manufacturing & Tech",
      grant: "45%",
      max: "€5M",
      description: "Innovation hubs, production facilities, green tech"
    }
  };
  
  const currentProject = projectTypes[selectedProject];
  
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Elegant gradient background - keeping your style */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/40 via-white to-emerald-50/40" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-emerald-100/20 rounded-full blur-3xl" />
      </div>
      
      {/* Main Content */}
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        
        {/* Top Alert - CORRECTED Mini PIA Info */}
        <div className={`text-center mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 backdrop-blur-xl bg-white/70 border border-purple-200 px-6 py-3 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-gray-700">
              Mini PIA Sportello Aperto - Fondi Disponibili Senza Scadenza
            </span>
            <span className="text-xs text-gray-500">(Continuous funding, no deadline)</span>
          </div>
        </div>
        
        {/* Professional Positioning */}
        <div className={`text-center mb-8 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
            International Investment Advisory • Est. 1994
          </p>
        </div>
        
        {/* Main Value Proposition */}
        <div className={`text-center mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl lg:text-6xl xl:text-7xl font-light text-gray-900 mb-6 leading-tight">
            Access Puglia's
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-emerald-600 font-bold text-5xl lg:text-7xl xl:text-8xl mt-2">
           Up to 55% FREE Funding
           On €5M Total Investment
            </span>
          </h1>
          <p className="text-xl lg:text-2xl font-light text-gray-600 max-w-3xl mx-auto">
            Non-repayable funding for international investors • 45-55% project coverage
          </p>
        </div>

        {/* Interactive Grant Selector - IMMEDIATELY VISIBLE */}
        <div className={`mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-700 uppercase tracking-wider">Select Your Investment Type</h3>
          </div>
          
          {/* Project Type Grid - All Visible */}
          <div className="grid md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-8">
            {Object.entries(projectTypes).map(([key, project]) => {
              const Icon = project.icon;
              const isSelected = selectedProject === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedProject(key)}
                  className={`relative p-6 rounded-2xl backdrop-blur-xl transition-all duration-300 ${
                    isSelected 
                      ? 'bg-gradient-to-br from-purple-100 to-emerald-100 border-2 border-purple-400 shadow-xl scale-105' 
                      : 'bg-white/60 border border-gray-200 hover:border-purple-300 hover:shadow-lg'
                  }`}
                >
                  <Icon className={`w-8 h-8 mx-auto mb-3 ${isSelected ? 'text-purple-600' : 'text-gray-500'}`} />
                  <div className={`text-sm font-semibold mb-2 ${isSelected ? 'text-purple-900' : 'text-gray-700'}`}>
                    {project.name}
                  </div>
                  <div className="space-y-1">
                    <div className={`text-2xl font-bold ${isSelected ? 'text-purple-600' : 'text-gray-900'}`}>
                      {project.grant}
                    </div>
                    <div className={`text-xs ${isSelected ? 'text-purple-700' : 'text-gray-500'}`}>
                      up to {project.max}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 bg-purple-600 text-white rounded-full p-1">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected Project Details */}
          <div className="max-w-3xl mx-auto">
            <div className="backdrop-blur-xl bg-white/70 rounded-3xl shadow-2xl p-8 border border-white/50">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">{currentProject.name}</h3>
                  <p className="text-gray-600">{currentProject.description}</p>
                </div>
                <Zap className="w-8 h-8 text-purple-500" />
              </div>
              
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{currentProject.grant}</div>
                  <div className="text-sm text-gray-500">Grant Coverage</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600">{currentProject.max}</div>
                  <div className="text-sm text-gray-500">Maximum Funding</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">95%</div>
                  <div className="text-sm text-gray-500">Approval Rate</div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Fondo perduto (non-repayable grant)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>No application deadline - sportello continuo</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Professional support throughout process</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics - ALL VISIBLE (No Carousel) */}
        <div className={`grid md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div 
            className="backdrop-blur-xl bg-white/60 rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all cursor-pointer"
            onMouseEnter={() => setHoveredMetric('funding')}
            onMouseLeave={() => setHoveredMetric(null)}
          >
            <Euro className="w-8 h-8 text-purple-600 mb-3" />
            <div className="text-2xl font-bold text-gray-900">€2.25M</div>
            <div className="text-sm text-gray-600">Max Grant Available</div>
            {hoveredMetric === 'funding' && (
              <div className="text-xs text-purple-600 mt-2">Mini PIA Tourism Fund</div>
            )}
          </div>
          
          <div 
            className="backdrop-blur-xl bg-white/60 rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all cursor-pointer"
            onMouseEnter={() => setHoveredMetric('roi')}
            onMouseLeave={() => setHoveredMetric(null)}
          >
            <TrendingUp className="w-8 h-8 text-emerald-600 mb-3" />
            <div className="text-2xl font-bold text-gray-900">18.7%</div>
            <div className="text-sm text-gray-600">Average ROI Puglia</div>
            {hoveredMetric === 'roi' && (
              <div className="text-xs text-emerald-600 mt-2">Highest in Italy</div>
            )}
          </div>
          
          <div 
            className="backdrop-blur-xl bg-white/60 rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all cursor-pointer"
            onMouseEnter={() => setHoveredMetric('volume')}
            onMouseLeave={() => setHoveredMetric(null)}
          >
            <Globe className="w-8 h-8 text-purple-600 mb-3" />
            <div className="text-2xl font-bold text-gray-900">€9.9B</div>
            <div className="text-sm text-gray-600">2024 Investment</div>
            {hoveredMetric === 'volume' && (
              <div className="text-xs text-purple-600 mt-2">+66% Year on Year</div>
            )}
          </div>
          
          <div 
            className="backdrop-blur-xl bg-white/60 rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all cursor-pointer"
            onMouseEnter={() => setHoveredMetric('success')}
            onMouseLeave={() => setHoveredMetric(null)}
          >
            <Award className="w-8 h-8 text-emerald-600 mb-3" />
            <div className="text-2xl font-bold text-gray-900">95%</div>
            <div className="text-sm text-gray-600">Approval Rate</div>
            {hoveredMetric === 'success' && (
              <div className="text-xs text-emerald-600 mt-2">With Our Guidance</div>
            )}
          </div>
        </div>

        {/* CTAs */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <button 
            onClick={() => window.location.href = 'https://classic.investinpuglia.eu'}
            className="group bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-10 py-5 rounded-full font-semibold text-lg hover:shadow-2xl transition-all flex items-center justify-center gap-3"
          >
            Calculate Your Grant Eligibility
            <Euro className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
          <button 
            onClick={() => window.location.href = '/consultation'}
            className="bg-white text-gray-900 border-2 border-gray-200 px-10 py-5 rounded-full font-semibold text-lg hover:border-purple-400 hover:shadow-xl transition-all"
          >
            Book Advisory Consultation
            <ArrowRight className="inline ml-2 w-5 h-5" />
          </button>
        </div>

        {/* Who's Investing - Social Proof */}
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="backdrop-blur-xl bg-gradient-to-r from-purple-50/70 to-emerald-50/70 rounded-3xl p-8 border border-white/50">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">International Investors Already in Puglia</h3>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl mb-1">🇺🇸</div>
                <div className="text-2xl font-bold text-purple-600">29.9%</div>
                <div className="text-xs text-gray-600">Americans</div>
                <div className="text-xs text-emerald-600 font-semibold">+350% growth</div>
              </div>
              <div>
                <div className="text-2xl mb-1">🇬🇧</div>
                <div className="text-2xl font-bold text-purple-600">9.8%</div>
                <div className="text-xs text-gray-600">British</div>
                <div className="text-xs text-emerald-600 font-semibold">Post-Brexit surge</div>
              </div>
              <div>
                <div className="text-2xl mb-1">🇩🇪</div>
                <div className="text-2xl font-bold text-purple-600">9.6%</div>
                <div className="text-xs text-gray-600">Germans</div>
                <div className="text-xs text-emerald-600 font-semibold">+250% coastal</div>
              </div>
            </div>
          </div>
        </div>

        {/* Credentials Bar */}
        <div className={`flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600 mt-8 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-600" />
            <span>30 Years Experience</span>
          </div>
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-emerald-600" />
            <span>CapitalImprese International Relations</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-purple-600" />
            <span>70,000 Business Network</span>
          </div>
        </div>

        {/* Bottom Alert - Correct Information */}
        <div className={`mt-12 max-w-2xl mx-auto transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="backdrop-blur-xl bg-amber-50/70 border border-amber-200 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-900 mb-2">
                  No deadline, but funds are allocated first-come, first-served
                </p>
                <p className="text-xs text-amber-800">
                  Mini PIA operates on a "sportello" basis - applications accepted continuously until funds are exhausted. 
                  Our team ensures your application meets all requirements for maximum approval chances.
                </p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default HeroExecutive;
