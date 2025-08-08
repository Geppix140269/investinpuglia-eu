// components/sections/HeroVisual.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { MapPin, Factory, ArrowRight, Shield } from 'lucide-react';

const HeroVisual = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Trulli/Property videos for hero
  const heroVideos = [
    'https://res.cloudinary.com/dusubfxgo/video/upload/v1754597045/social_geppix1402_81420_Luxurious_renovated_trulli_houses_in_Puglia__f6f51651-9ca0-4e21-a004-ae288528045f_0_ofth8z.mp4',
    'https://res.cloudinary.com/dusubfxgo/video/upload/v1754597042/social_geppix1402_81420_Luxurious_renovated_trulli_houses_in_Puglia__8e712bde-425d-423c-91d8-a9ad1d9ca973_1_g7aad3.mp4',
    'https://res.cloudinary.com/dusubfxgo/video/upload/v1753030861/TrulloClip_sqv4cl.mp4'
  ];
  
  // Business videos
  const businessVideo = 'https://res.cloudinary.com/dusubfxgo/video/upload/v1753030831/geppix1402_81420_Homepage_concept_for_Apulink.com_a_modern_di_02fb68c3-5806-40b5-984f-f47e14c23456_1_vkjhc8.mp4';
  
  useEffect(() => {
    setIsVisible(true);
    
    // Check if mobile
    const checkMobile = () => {
      const mobile = typeof window !== 'undefined' && (
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || 
        window.innerWidth < 768
      );
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Rotate videos every 10 seconds
    const videoInterval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % heroVideos.length);
    }, 10000);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearInterval(videoInterval);
    };
  }, []);

  const projectTypes = [
    {
      name: 'Trulli & Historic',
      grant: '55%',
      max: 'up to €2.25M',
      image: '/images/locations/trulli-alberobello.jpg',
      fallback: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"%3E%3Crect fill="%23f3e8ff" width="800" height="400"/%3E%3Ctext x="400" y="200" text-anchor="middle" font-size="24" fill="%239333ea"%3ETrulli Properties%3C/text%3E%3C/svg%3E',
      link: '/industries'
    },
    {
      name: 'Hotels & Tourism',
      grant: '45%',
      max: 'up to €5M',
      image: '/images/industries/hotels-puglia.jpg',
      fallback: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"%3E%3Crect fill="%23dbeafe" width="800" height="400"/%3E%3Ctext x="400" y="200" text-anchor="middle" font-size="24" fill="%233b82f6"%3EHotels %26 Resorts%3C/text%3E%3C/svg%3E',
      link: '/industries'
    },
    {
      name: 'Restaurants',
      grant: '50%',
      max: 'up to €2M',
      image: '/images/industries/restaurants-puglia.jpg',
      fallback: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"%3E%3Crect fill="%23fef3c7" width="800" height="400"/%3E%3Ctext x="400" y="200" text-anchor="middle" font-size="24" fill="%23f59e0b"%3ERestaurants%3C/text%3E%3C/svg%3E',
      link: '/industries'
    },
    {
      name: 'Manufacturing',
      grant: '45%',
      max: 'up to €5M',
      image: '/images/industries/manufacturing-puglia.jpg',
      fallback: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"%3E%3Crect fill="%23dcfce7" width="800" height="400"/%3E%3Ctext x="400" y="200" text-anchor="middle" font-size="24" fill="%2310b981"%3EManufacturing%3C/text%3E%3C/svg%3E',
      link: '/industries'
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

  // ADAPTIVE MOBILE DESIGN - COMPLETELY DIFFERENT LAYOUT
  if (isMobile) {
    return (
      <section className="relative min-h-screen bg-white">
        {/* Full Screen Video Hero */}
        <div className="relative h-[100vh]">
          {/* Background Video */}
          <video 
            key={currentVideoIndex}
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={heroVideos[currentVideoIndex]} type="video/mp4" />
          </video>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />
          
          {/* Content Overlay */}
          <div className="relative z-10 h-full flex flex-col justify-between p-6 text-white">
            {/* Top Section */}
            <div style={{ paddingTop: '20px' }}>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-3 py-1.5 text-xs">
                <Shield className="w-3 h-3 text-yellow-400" />
                <span className="font-medium">Government Backed</span>
              </div>
            </div>
            
            {/* Middle Section - Main Content */}
            <div className="flex-1 flex flex-col justify-center -mt-20">
              {/* Giant ROI Number */}
              <div className="mb-6">
                <div className="text-7xl font-bold text-white mb-2">
                  344%
                </div>
                <div className="text-xl text-white/90">
                  Return on Investment
                </div>
              </div>
              
              {/* Transform Text */}
              <div className="mb-6">
                <div className="text-2xl font-light text-white/90">Transform</div>
                <div className="text-3xl font-bold text-white">
                  €2.25M → €10M
                </div>
              </div>
              
              {/* Grant Badge */}
              <div className="inline-block bg-gradient-to-r from-purple-600 to-emerald-600 rounded-full px-4 py-2 mb-6">
                <span className="text-sm font-bold">55% Grant • Until 2027</span>
              </div>
            </div>
            
            {/* Bottom Section */}
            <div style={{ paddingBottom: '20px' }}>
              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">€5M</div>
                  <div className="text-xs opacity-80">Max Project</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-xs opacity-80">Success</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">3yrs</div>
                  <div className="text-xs opacity-80">Exit</div>
                </div>
              </div>
              
              {/* CTA Button */}
              <a 
                href="https://calendly.com/investinpuglia/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-white text-black py-4 rounded-2xl font-bold text-center text-lg shadow-2xl"
              >
                Book Free Consultation →
              </a>
            </div>
          </div>
        </div>
        
        {/* Second Section - Details */}
        <div className="bg-white px-6 py-12">
          {/* Alert */}
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded">
            <p className="text-sm font-bold text-red-900">
              ⏰ LIMITED TIME - Funds allocated "a sportello" until 2027!
            </p>
          </div>
          
          {/* About */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Puglia Investment Program
            </h2>
            <p className="text-gray-600 leading-relaxed">
              The Mini PIA program provides 55% non-repayable grants on investments up to €5M. 
              Your €2.25M contribution, combined with €2.75M in grant funding, creates a €5M 
              project with full ownership retained by you.
            </p>
          </div>
          
          {/* Investment Categories Grid */}
          <div className="mb-10">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Investment Categories
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {projectTypes.map((type, i) => (
                <a
                  key={i}
                  href={type.link}
                  className="relative rounded-xl overflow-hidden shadow-lg"
                >
                  <img 
                    src={type.image} 
                    alt={type.name}
                    className="w-full h-28 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = type.fallback;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <div className="text-xs font-semibold">{type.name}</div>
                    <div className="text-lg font-bold">{type.grant}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          {/* Secondary CTAs */}
          <div className="space-y-3">
            <a 
              href="/locations"
              className="block w-full bg-gradient-to-r from-purple-600 to-emerald-600 text-white py-3 rounded-xl font-semibold text-center"
            >
              View All Locations
            </a>
            <a 
              href="/industries"
              className="block w-full bg-white text-purple-600 py-3 rounded-xl font-semibold text-center border-2 border-purple-200"
            >
              Explore Industries
            </a>
          </div>
          
          {/* Locations - Added for Mobile */}
          <div className="mt-10">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Top Investment Locations
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {locations.slice(0, 6).map((location, i) => (
                <a
                  key={i}
                  href={location.link}
                  className="bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-center text-sm font-medium text-gray-700 hover:bg-purple-50 hover:border-purple-300 transition-all"
                >
                  {location.name}
                </a>
              ))}
            </div>
            <a 
              href="/locations"
              className="block mt-3 text-center text-purple-600 font-semibold text-sm"
            >
              View All Locations →
            </a>
          </div>
          
          {/* Trust Bar */}
          <div className="mt-10 pt-8 border-t border-gray-200">
            <div className="flex justify-center items-center gap-4 text-xs text-gray-500">
              <span>Est. 2019</span>
              <span>•</span>
              <span>€9.9B Invested</span>
              <span>•</span>
              <span>30+ Years</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // DESKTOP VERSION - Your existing layout
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
          <div className="inline-flex items-center gap-2 backdrop-blur-xl bg-red-50 border border-red-300 px-6 py-3 rounded-full">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-red-700">
              ⚠️ Mini PIA Program • 55% Grants
            </span>
            <span className="text-xs text-red-600 font-bold">
              Until 2027 • First Come First Served!
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
            <div className="text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent leading-tight mb-4">
              With Puglia's 55%
              <span className="block">Grant Program</span>
            </div>
            <div className="text-lg sm:text-xl text-gray-600 font-medium mb-6">
              344% ROI Through Government-Backed Funding
            </div>
            
            {/* URGENCY MESSAGE */}
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded">
              <p className="text-sm font-bold text-gray-900">
                ⏰ LIMITED TIME - Funds allocated "a sportello" until 2027
              </p>
            </div>
            
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-8">
              The Mini PIA program provides 55% non-repayable grants on investments up to €5M. 
              Your €2.25M contribution, combined with €2.75M in grant funding, creates a €5M project 
              with full ownership retained by you. Recent market valuations show successful projects 
              achieving 2x multiples within 3 years.
            </p>

            {/* Quick Stats */}
            <div className="flex gap-8 mb-8">
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

          {/* Right Content - Circular VIDEO */}
          <div className={`relative flex justify-center items-center transition-all duration-1000 delay-[400ms] ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative w-[500px] h-[500px]">
              {/* Main Circular Video */}
              <div className="w-full h-full rounded-full overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
                <video 
                  key={currentVideoIndex}
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  className="w-full h-full object-cover scale-110"
                >
                  <source src={heroVideos[currentVideoIndex]} type="video/mp4" />
                  <img 
                    src="/Hero_BG.jpg" 
                    alt="Puglia Investment Opportunities" 
                    className="w-full h-full object-cover"
                  />
                </video>
              </div>
              
              {/* Floating Info Cards */}
              <div className="absolute -top-5 -left-20 bg-white/95 px-6 py-4 rounded-[20px] shadow-lg animate-float z-10">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">55%</div>
                <div className="text-xs text-gray-600">Grant Coverage</div>
              </div>
              <div className="absolute -top-5 -right-20 bg-white/95 px-6 py-4 rounded-[20px] shadow-lg animate-float-delayed-1 z-10">
                <div className="text-2xl font-bold text-red-600">2027</div>
                <div className="text-xs text-gray-600">Deadline</div>
              </div>
              <div className="absolute -bottom-10 -left-16 bg-white/95 px-6 py-4 rounded-[20px] shadow-lg animate-float-delayed-2 z-10">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">344%</div>
                <div className="text-xs text-gray-600">Typical ROI</div>
              </div>
              <div className="absolute -bottom-10 -right-16 bg-white/95 px-6 py-4 rounded-[20px] shadow-lg animate-float-delayed-3 z-10">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">€5M</div>
                <div className="text-xs text-gray-600">Max Project</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrolling Photo Strip */}
        <div className={`my-12 py-8 bg-gradient-to-r from-purple-50/50 to-emerald-50/50 -mx-6 px-6 overflow-hidden transition-all duration-1000 delay-[600ms] ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex gap-4 animate-scroll">
            {[...locations, ...locations].map((location, i) => (
              <a key={i} href={location.link} className="flex-shrink-0 w-[250px] h-[150px] rounded-2xl overflow-hidden hover:scale-105 transition-transform">
                <img src={`/images/locations/${location.name.toLowerCase().replace(/ /g, '-')}-thumb.jpg`} alt={location.name} className="w-full h-full object-cover" />
              </a>
            ))}
          </div>
        </div>

        {/* Project Types */}
        <div className={`mb-12 transition-all duration-1000 delay-[600ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-center text-lg font-semibold uppercase tracking-wider text-gray-600 mb-8">
            Select Your Investment Type
          </h3>
          <div className="grid grid-cols-4 gap-4 max-w-6xl mx-auto">
            {projectTypes.map((project, index) => (
              <a
                key={index}
                href={project.link}
                className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105 ${
                  selectedProject === index ? 'ring-2 ring-purple-600 scale-105' : ''
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedProject(index);
                  window.location.href = project.link;
                }}
              >
                <div className="h-[120px] relative overflow-hidden">
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
                <div className="p-6 bg-white">
                  <div className="text-sm font-semibold text-gray-700 mb-2">{project.name}</div>
                  <div className="text-3xl font-bold text-gray-900">{project.grant}</div>
                  <div className="text-xs text-gray-500">{project.max}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className={`flex gap-6 items-center justify-center mb-12 transition-all duration-1000 delay-[800ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a 
            href="/locations"
            className="bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-10 py-5 rounded-full font-semibold text-lg hover:shadow-2xl transition-all flex items-center gap-3"
          >
            Investment Locations
            <MapPin className="w-5 h-5" />
          </a>
          <a 
            href="/industries"
            className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-10 py-5 rounded-full font-semibold text-lg hover:shadow-2xl transition-all flex items-center gap-3"
          >
            Investment Industries
            <Factory className="w-5 h-5" />
          </a>
          <a 
            href="https://calendly.com/investinpuglia/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-gray-900 border-2 border-gray-200 px-10 py-5 rounded-full font-semibold text-lg hover:border-purple-400 hover:shadow-xl transition-all flex items-center gap-3"
          >
            Book Free Consultation
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        {/* Stats Grid */}
        <div className={`grid grid-cols-4 gap-4 max-w-5xl mx-auto mb-12 transition-all duration-1000 delay-[1000ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {stats.map((stat, index) => (
            <a
              key={index}
              href={stat.link}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all hover:scale-105 hover:-translate-y-1 border border-white/50"
            >
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </a>
          ))}
        </div>

        {/* Location Quick Links */}
        <div className={`text-center transition-all duration-1000 delay-[1200ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-base uppercase tracking-wider text-gray-600 mb-6 font-semibold">
            Top Investment Destinations in Puglia
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
            {locations.map((location, index) => (
              <a
                key={index}
                href={location.link}
                className="px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-700 text-sm hover:border-purple-400 hover:bg-gradient-to-r hover:from-purple-50 hover:to-emerald-50 transition-all hover:scale-105"
              >
                {location.name}
              </a>
            ))}
            <a
              href="/locations"
              className="px-6 py-3 bg-gradient-to-r from-purple-100 to-emerald-100 border border-purple-400 rounded-full text-purple-700 text-sm font-semibold hover:shadow-lg transition-all hover:scale-105"
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
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroVisual;
