{/* Scrolling Photo Strip */}
        <div className={`my-12 py-8 bg-gradient-to-r from-purple-50/50 to-emerald-50/50 -mx-6 px-6 overflow-hidden transition-all duration-1000 delay-[600ms] ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex gap-4 animate-scroll">
            <a href="/locations/invest-in-bari-bari" className="flex-shrink-0 w-[250px] h-[150px] rounded-2xl overflow-hidden hover:scale-105 transition-transform">
              <img src="/images/locations/bari-thumb.jpg" alt="Bari" className="w-full h-full object-cover" />
            </a>
            <a href="/locations/invest-in-lecce-lecce" className="flex-shrink-0 w-[250px] h-[150px] rounded-2xl overflow-hidden hover:scale-105 transition-transform">
              <img src="/images/locations/lecce-thumb.jpg" alt="Lecce" className="w-full h-full object-cover" />
            </a>
            <a href="/locations/invest-in-ostuni-brindisi" className="flex-shrink-0 w-[250px] h-[150px] rounded-2xl overflow-hidden hover:scale-105 transition-transform">
              <img src="/images/locations/ostuni-thumb.jpg" alt="Ostuni" className="w-full h-full object-cover" />
            </a>
            <a href="/locations/invest-in-polignano-a-mare-bari" className="flex-shrink-0 w-[250px] h-[150px] rounded-2xl overflow-hidden hover:scale-105 transition-transform">
              <img src="/images/locations/polignano-thumb.jpg" alt="Polignano a Mare" className="w-full h-full object-cover" />
            </a>
            <a href="/locations/invest-in-brindisi-brindisi" className="flex-shrink-0         {/* Scrolling Photo Strip */}
        <div className={`my-12 py-8 bg-gradient-to-r from-purple-50/50 to-emerald-50/50 -mx-6 px-6 overflow-hidden transition-all duration-1000 delay-[600ms] ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex gap-4 animate-scroll">
            <a href="/locations/invest-in-bari-bari" className="flex-shrink-0 w-[250px] h-[150px] rounded-2xl overflow-hidden hover:scale-105 transition-transform">
              <img src="/images/locations/bari-thumb.jpg" alt="Bari" className="w-full h-full object-cover" />
            </a>
            <a href="/locations/invest-in-lecce-lecce" className="flex-shrink-0 w-[250px] h-[150px] rounded-2xl overflow-hidden hover:scale-105 transition-transform">
              <img src="/images/locations/lecce-thumb.jpg" alt="Lecce" className="w-full h-full object-cover" />
            </a>
            <a href="/locations/invest-in-ostuni-brindisi" className="flex-shrink-0 w-[250px] h-[150px] rounded-2xl overflow-hidden hover:scale-105 transition-transform">
              <img src="/images/locations/ostuni-thumb.jpg" alt="Ostuni" className="w-full h-full object-cover" />
            </a>// components/sections/HeroVisual.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { MapPin, Factory, ArrowRight } from 'lucide-react';

const HeroVisual = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(0);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const projectTypes = [
    {
      name: 'Trulli & Historic',
      grant: '55%',
      max: 'up to €2.25M',
      image: '/images/locations/trulli-alberobello.jpg',
      fallback: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"%3E%3Crect fill="%23f3e8ff" width="800" height="400"/%3E%3Ctext x="400" y="200" text-anchor="middle" font-size="24" fill="%239333ea"%3ETrulli Properties%3C/text%3E%3C/svg%3E',
      link: '/industries/real-estate'
    },
    {
      name: 'Hotels & Tourism',
      grant: '45%',
      max: 'up to €5M',
      image: '/images/industries/hotels-puglia.jpg',
      fallback: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"%3E%3Crect fill="%23dbeafe" width="800" height="400"/%3E%3Ctext x="400" y="200" text-anchor="middle" font-size="24" fill="%233b82f6"%3EHotels %26 Resorts%3C/text%3E%3C/svg%3E',
      link: '/industries/hospitality'
    },
    {
      name: 'Restaurants',
      grant: '50%',
      max: 'up to €2M',
      image: '/images/industries/restaurants-puglia.jpg',
      fallback: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"%3E%3Crect fill="%23fef3c7" width="800" height="400"/%3E%3Ctext x="400" y="200" text-anchor="middle" font-size="24" fill="%23f59e0b"%3ERestaurants%3C/text%3E%3C/svg%3E',
      link: '/industries/restaurants'
    },
    {
      name: 'Manufacturing',
      grant: '45%',
      max: 'up to €5M',
      image: '/images/industries/manufacturing-puglia.jpg',
      fallback: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"%3E%3Crect fill="%23dcfce7" width="800" height="400"/%3E%3Ctext x="400" y="200" text-anchor="middle" font-size="24" fill="%2310b981"%3EManufacturing%3C/text%3E%3C/svg%3E',
      link: '/industries/manufacturing'
    }
  ];

  const locations = [
    { name: 'Bari', link: '/locations/invest-in-bari-bari' },
    { name: 'Lecce', link: '/locations/invest-in-lecce-lecce' },
    { name: 'Ostuni', link: '/locations/invest-in-ostuni-brindisi' },
    { name: 'Polignano a Mare', link: '/locations/invest-in-polignano-a-mare-bari' },
    { name: 'Brindisi', link: '/locations/invest-in-brindisi-brindisi' },
    { name: 'Taranto', link: '/locations/invest-in-taranto-taranto' }
  ];

  const stats = [
    { value: '€9.9B', label: '2024 Investment', link: '/locations/invest-in-bari-bari' },
    { value: '+66%', label: 'Year on Year', link: '/industries' },
    { value: '95%', label: 'Approval Rate', link: '/how-it-works' },
    { value: '30 Years', label: 'Experience', link: '/about' }
  ];

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/40 via-white to-emerald-50/40" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-100/20 rounded-full blur-[60px]" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-emerald-100/20 rounded-full blur-[60px]" />
      </div>

      {/* Floating Background Images */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-[10%] left-[5%] w-[200px] h-[200px] rounded-[20px] bg-gray-200 blur-[2px] animate-pulse" />
        <div className="absolute top-[60%] right-[10%] w-[200px] h-[200px] rounded-[20px] bg-purple-200 blur-[2px] animate-pulse" />
        <div className="absolute bottom-[20%] left-[15%] w-[200px] h-[200px] rounded-[20px] bg-emerald-200 blur-[2px] animate-pulse" />
      </div>

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        
        {/* Top Alert */}
        <div className={`text-center mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
          <div className="inline-flex items-center gap-2 backdrop-blur-xl bg-white/70 border border-purple-200 px-6 py-3 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-gray-700">
              Mini PIA Program • 55% Non-Repayable Grants Available
            </span>
            <span className="text-xs text-gray-500">
              Continuous funding, no application deadline
            </span>
          </div>
        </div>

        {/* Professional Positioning */}
        <div className={`text-center mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
            International Procurement & Investment Advisory • Est. 2019
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-12">
          {/* Left Content */}
          <div className={`transition-all duration-1000 delay-[400ms] ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <h1 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-light text-gray-900 mb-4 leading-tight">
              Transform €2.25M into €10M
            </h1>
            <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent leading-tight mb-4">
              With Puglia's 55%<br className="hidden sm:block" />
              Grant Program
            </div>
            <div className="text-lg sm:text-xl text-gray-600 font-medium mb-6">
              344% ROI Through Government-Backed Funding
            </div>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-8">
              The Mini PIA program provides 55% non-repayable grants on investments up to €5M. 
              Your €2.25M contribution, combined with €2.75M in grant funding, creates a €5M project 
              with full ownership retained by you. Recent market valuations show successful projects 
              achieving 2x multiples within 3 years.
            </p>

            {/* Quick Stats - Mobile Responsive */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-8">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-4 flex-1 hover:scale-105 transition-transform cursor-pointer">
                <div className="text-2xl font-bold text-purple-600">344%</div>
                <div className="text-sm text-gray-600">Projected ROI</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-4 flex-1 hover:scale-105 transition-transform cursor-pointer">
                <div className="text-2xl font-bold text-emerald-600">€2.75M</div>
                <div className="text-sm text-gray-600">Grant Funding</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-4 flex-1 hover:scale-105 transition-transform cursor-pointer">
                <div className="text-2xl font-bold text-purple-600">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Content - Circular Design - Mobile Responsive */}
          <div className={`relative flex justify-center items-center transition-all duration-1000 delay-[400ms] ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]">
              {/* Main Circular Image */}
              <img 
                src="/Hero_BG.jpg" 
                alt="Puglia Investment Opportunities - Lifestyle and Architecture" 
                className="w-full h-full rounded-full object-cover shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] hover:scale-105 transition-transform duration-500 cursor-pointer"
              />
              
              {/* Floating Info Cards - Hidden on mobile */}
              <div className="hidden md:block">
                <div className="absolute -top-5 -left-20 bg-white/95 px-4 py-3 lg:px-6 lg:py-4 rounded-[20px] shadow-lg animate-float z-10">
                  <div className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">55%</div>
                  <div className="text-xs text-gray-600">Grant Coverage</div>
                </div>
                <div className="absolute -top-5 -right-20 bg-white/95 px-4 py-3 lg:px-6 lg:py-4 rounded-[20px] shadow-lg animate-float-delayed-1 z-10">
                  <div className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">€5M</div>
                  <div className="text-xs text-gray-600">Max Project</div>
                </div>
                <div className="absolute -bottom-10 -left-16 bg-white/95 px-4 py-3 lg:px-6 lg:py-4 rounded-[20px] shadow-lg animate-float-delayed-2 z-10">
                  <div className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">344%</div>
                  <div className="text-xs text-gray-600">Typical ROI</div>
                </div>
                <div className="absolute -bottom-10 -right-16 bg-white/95 px-4 py-3 lg:px-6 lg:py-4 rounded-[20px] shadow-lg animate-float-delayed-3 z-10">
                  <div className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">3 Years</div>
                  <div className="text-xs text-gray-600">Exit Timeline</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrolling Photo Strip */}
        <div className={`my-12 py-8 bg-gradient-to-r from-purple-50/50 to-emerald-50/50 -mx-6 px-6 overflow-hidden transition-all duration-1000 delay-[600ms] ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex gap-4 animate-scroll">
            <a href="/locations/invest-in-bari-bari" className="flex-shrink-0 w-[250px] h-[150px] rounded-2xl overflow-hidden hover:scale-105 transition-transform">
              <img src="/images/locations/bari-thumb.jpg" alt="Bari" className="w-full h-full object-cover" />
            </a>
            <a href="/locations/invest-in-lecce-lecce" className="flex-shrink-0 w-[250px] h-[150px] rounded-2xl overflow-hidden hover:scale-105 transition-transform">
              <img src="/images/locations/lecce-thumb.jpg" alt="Lecce" className="w-full h-full object-cover" />
            </a>
            <a href="/locations/invest-in-ostuni-brindisi" className="flex-shrink-0 w-[250px] h-[150px] rounded-2xl overflow-hidden hover:scale-105 transition-transform">
              <img src="/images/locations/ostuni-thumb.jpg" alt="Ostuni" className="w-full h-full object-cover" />
            </a>
            <a href="/locations/invest-in-polignano-a-mare-bari" className="flex-shrink-0 w-[250px] h-[150px] rounded-2xl overflow-hidden hover:scale-105 transition-transform">
              <img src="/images/locations/polignano-thumb.jpg" alt="Polignano a Mare" className="w-full h-full object-cover" />
            </a>
            <a href="/locations/invest-in-brindisi-brindisi" className="flex-shrink-0 w-[250px] h-[150px] rounded-2xl overflow-hidden hover:scale-105 transition-transform">
              <img src="/images/locations/brindisi-thumb.jpg" alt="Brindisi" className="w-full h-full object-cover" />
            </a>
            <a href="/locations/invest-in-taranto-taranto" className="flex-shrink-0 w-[250px] h-[150px] rounded-2xl overflow-hidden hover:scale-105 transition-transform">
              <img src="/images/locations/taranto-thumb.jpg" alt="Taranto" className="w-full h-full object-cover" />
            </a>
            {/* Duplicate for continuous scroll */}
            <a href="/locations/invest-in-bari-bari" className="flex-shrink-0 w-[250px] h-[150px] rounded-2xl overflow-hidden hover:scale-105 transition-transform">
              <img src="/images/locations/bari-thumb.jpg" alt="Bari" className="w-full h-full object-cover" />
            </a>
            <a href="/locations/invest-in-lecce-lecce" className="flex-shrink-0 w-[250px] h-[150px] rounded-2xl overflow-hidden hover:scale-105 transition-transform">
              <img src="/images/locations/lecce-thumb.jpg" alt="Lecce" className="w-full h-full object-cover" />
            </a>
            <a href="/locations/invest-in-ostuni-brindisi" className="flex-shrink-0 w-[250px] h-[150px] rounded-2xl overflow-hidden hover:scale-105 transition-transform">
              <img src="/images/locations/ostuni-thumb.jpg" alt="Ostuni" className="w-full h-full object-cover" />
            </a>
            <a href="/locations/invest-in-polignano-a-mare-bari" className="flex-shrink-0 w-[250px] h-[150px] rounded-2xl overflow-hidden hover:scale-105 transition-transform">
              <img src="/images/locations/polignano-thumb.jpg" alt="Polignano a Mare" className="w-full h-full object-cover" />
            </a>
            <a href="/locations/invest-in-brindisi-brindisi" className="flex-shrink-0 w-[250px] h-[150px] rounded-2xl overflow-hidden hover:scale-105 transition-transform">
              <img src="/images/locations/brindisi-thumb.jpg" alt="Brindisi" className="w-full h-full object-cover" />
            </a>
            <a href="/locations/invest-in-taranto-taranto" className="flex-shrink-0 w-[250px] h-[150px] rounded-2xl overflow-hidden hover:scale-105 transition-transform">
              <img src="/images/locations/taranto-thumb.jpg" alt="Taranto" className="w-full h-full object-cover" />
            </a>
          </div>
        </div>

        {/* Project Types - Mobile Responsive */}
        <div className={`mb-12 transition-all duration-1000 delay-[600ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-center text-sm sm:text-base lg:text-lg font-semibold uppercase tracking-wider text-gray-600 mb-6 sm:mb-8">
            Select Your Investment Type
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto">
            {projectTypes.map((project, index) => (
              <a
                key={index}
                href={project.link}
                className={`group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105 ${
                  selectedProject === index ? 'ring-2 ring-purple-600 scale-105' : ''
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedProject(index);
                  window.location.href = project.link;
                }}
              >
                <div className="h-[80px] sm:h-[100px] md:h-[120px] relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = project.fallback;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-3 sm:p-4 md:p-6 bg-white">
                  <div className="text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">{project.name}</div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{project.grant}</div>
                  <div className="text-[10px] sm:text-xs text-gray-500">{project.max}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* CTA Buttons - Mobile Responsive */}
        <div className={`flex flex-col gap-4 sm:gap-6 items-center mb-12 transition-all duration-1000 delay-[800ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto">
            <a 
              href="/locations"
              className="group bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-6 sm:px-10 py-4 sm:py-5 rounded-full font-semibold text-base sm:text-lg hover:shadow-2xl transition-all flex items-center justify-center gap-3"
            >
              Investment Locations
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
            </a>
            <a 
              href="/industries"
              className="group bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 sm:px-10 py-4 sm:py-5 rounded-full font-semibold text-base sm:text-lg hover:shadow-2xl transition-all flex items-center justify-center gap-3"
            >
              Investment Industries
              <Factory className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
            </a>
          </div>
          <a 
            href="https://calendly.com/investinpuglia/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-gray-900 border-2 border-gray-200 px-6 sm:px-10 py-4 sm:py-5 rounded-full font-semibold text-base sm:text-lg hover:border-purple-400 hover:shadow-xl transition-all flex items-center justify-center gap-3 w-full sm:w-auto"
          >
            Book Free Consultation
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
        </div>

        {/* Stats Grid - Mobile Responsive */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto mb-12 transition-all duration-1000 delay-[1000ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {stats.map((stat, index) => (
            <a
              key={index}
              href={stat.link}
              className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-all hover:scale-105 hover:-translate-y-1 border border-white/50"
            >
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
            </a>
          ))}
        </div>

        {/* Location Quick Links - Mobile Responsive */}
        <div className={`text-center transition-all duration-1000 delay-[1200ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-xs sm:text-sm md:text-base uppercase tracking-wider text-gray-600 mb-4 sm:mb-6 font-semibold px-4">
            Top Investment Destinations in Puglia
          </h3>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-5xl mx-auto px-4">
            {locations.map((location, index) => (
              <a
                key={index}
                href={location.link}
                className="px-3 sm:px-6 py-2 sm:py-3 bg-white border border-gray-200 rounded-full text-gray-700 text-xs sm:text-sm hover:border-purple-400 hover:bg-gradient-to-r hover:from-purple-50 hover:to-emerald-50 transition-all hover:scale-105"
              >
                {location.name}
              </a>
            ))}
            <a
              href="/locations"
              className="px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-100 to-emerald-100 border border-purple-400 rounded-full text-purple-700 text-xs sm:text-sm font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              View All →
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-delayed-1 {
          animation: float 4s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-float-delayed-2 {
          animation: float 4s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-float-delayed-3 {
          animation: float 4s ease-in-out infinite;
          animation-delay: 1.5s;
        }
        
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroVisual;
