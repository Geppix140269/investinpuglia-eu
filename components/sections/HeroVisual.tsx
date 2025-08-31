// components/sections/HeroVisual.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { MapPin, Factory, ArrowRight, Shield } from 'lucide-react';
import { CloudinaryImage } from '@/components/CloudinaryImage';

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
      image: '/images/industries/trulli-alberobello.jpg',
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
    { value: '€9.9B', label: 'Foreign Investment', link: '/locations/invest-in-bari-bari' },
    { value: '62%', label: 'Market Share', link: '/industries' },
    { value: '+66%', label: 'YoY Growth', link: '/how-it-works' },
    { value: '#4', label: 'Puglia Ranking', link: '/about' }
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
              {/* Main Value Proposition */}
              <div className="mb-6">
                <div className="text-5xl font-bold text-white mb-2">
                  55% Grants
                </div>
                <div className="text-xl text-white/90">
                  Government Funded
                </div>
              </div>
              
              {/* Investment Example */}
              <div className="mb-6">
                <div className="text-xl font-light text-white/90">Your Investment</div>
                <div className="text-3xl font-bold text-white">
                  €2.25M
                </div>
                <div className="text-xl font-light text-white/90 mt-2">Total Project Value</div>
                <div className="text-3xl font-bold text-emerald-400">
                  €5M
                </div>
              </div>
              
              {/* Trust Badge */}
              <div className="inline-block bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-6">
                <span className="text-sm font-bold text-white">✓ EU Approved • Until 2027</span>
              </div>
            </div>
            
            {/* Bottom Section */}
            <div style={{ paddingBottom: '20px' }}>
              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">€9.9B</div>
                  <div className="text-xs opacity-80">Foreign Investment</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">62%</div>
                  <div className="text-xs opacity-80">Market Share</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">+66%</div>
                  <div className="text-xs opacity-80">Growth</div>
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
              Foreign investors represent 62% of Italy's €9.9B real estate market. The Mini PIA program 
              provides 55% non-repayable grants up to €2.75M. Your €2.25M investment creates a €5M 
              project. Puglia ranks #4 for foreign investment with +350% US buyer growth.
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
                  <CloudinaryImage 
                    src={type.image} 
                    alt={type.name}
                    width={400}
                    height={112}
                    className="w-full h-28 object-cover"
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
              <span>€9.9B Foreign Capital</span>
              <span>•</span>
              <span>62% Market Share</span>
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
        
        {/* Elegant Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
          <p className="text-sm uppercase tracking-[0.2em] text-gray-500 font-light">
            Puglia Investment Program
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-12">
          {/* Left Content */}
          <div className={`transition-all duration-1000 delay-[400ms] ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-light text-gray-900 mb-6 leading-tight">
              Transform Your Investment
              <span className="block text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent mt-3">
                With 55% EU Grants
              </span>
            </h1>
            <div className="text-xl lg:text-2xl text-gray-600 font-light mb-6">
              Puglia's Premium Investment Program
            </div>
            
            {/* Subtle Time Notice */}
            <div className="inline-flex items-center gap-2 text-sm text-gray-500 mb-6">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span>Program available until 2027</span>
            </div>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-8 font-light">
              Leverage government grants to double your investment power. 
              Transform €2.25M into a €5M project with full ownership.
            </p>

            {/* Elegant Stats */}
            <div className="flex gap-12 mb-8">
              <div>
                <div className="text-3xl font-light text-gray-900">€5M</div>
                <div className="text-sm text-gray-500">Project Value</div>
              </div>
              <div>
                <div className="text-3xl font-light text-gray-900">55%</div>
                <div className="text-sm text-gray-500">Grant Funding</div>
              </div>
              <div>
                <div className="text-3xl font-light text-gray-900">2027</div>
                <div className="text-sm text-gray-500">Program End</div>
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
                  <CloudinaryImage 
                    src="/Hero_BG.jpg" 
                    alt="Puglia Investment Opportunities" 
                    fill
                    priority
                    className="object-cover"
                  />
                </video>
              </div>
              
              {/* Minimal Floating Cards */}
              <div className="absolute -top-5 -left-20 bg-white/95 px-5 py-3 rounded-full shadow-lg animate-float z-10">
                <div className="text-lg font-light text-gray-700">55% Grants</div>
              </div>
              <div className="absolute -bottom-10 -right-16 bg-white/95 px-5 py-3 rounded-full shadow-lg animate-float-delayed-2 z-10">
                <div className="text-lg font-light text-gray-700">Until 2027</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrolling Photo Strip - Touch-scrollable on mobile */}
        <div className={`my-12 bg-gradient-to-r from-purple-50/50 to-emerald-50/50 transition-all duration-1000 delay-[600ms] ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="relative">
            <div className="overflow-x-auto lg:overflow-hidden scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-purple-100 py-8">
              <div className="flex gap-4 lg:animate-scroll w-max px-6">
                {[...locations, ...locations].map((location, i) => (
                  <a key={i} href={location.link} className="inline-block flex-shrink-0 w-[250px] h-[150px] rounded-2xl overflow-hidden hover:scale-105 transition-transform">
                    <CloudinaryImage src={`/images/locations/${location.name.toLowerCase().replace(/ /g, '-')}-thumb.jpg`} alt={location.name} width={250} height={150} className="w-full h-full object-cover" />
                  </a>
                ))}
              </div>
            </div>
            {/* Mobile scroll indicator */}
            <div className="lg:hidden text-center mt-2">
              <span className="text-xs text-gray-500">← Swipe to explore →</span>
            </div>
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
                  <CloudinaryImage 
                    src={project.image} 
                    alt={project.name}
                    width={400}
                    height={120}
                    className="w-full h-full object-cover"
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

        {/* Elegant CTA */}
        <div className={`flex gap-6 items-center justify-center mb-16 transition-all duration-1000 delay-[800ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a 
            href="https://calendly.com/investinpuglia/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 text-white px-12 py-4 rounded-full font-light text-lg hover:bg-gray-800 transition-all"
          >
            Schedule Consultation
          </a>
          <a 
            href="/locations"
            className="text-gray-700 px-8 py-4 rounded-full font-light text-lg hover:text-gray-900 transition-all"
          >
            Explore Locations →
          </a>
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
        
        @media (min-width: 1024px) {
          .lg\\:animate-scroll {
            animation: scroll 30s linear infinite;
          }
        }
        
        /* Touch scrolling improvements for mobile */
        .overflow-x-auto {
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
          scrollbar-width: thin;
          overscroll-behavior-x: contain;
        }
        
        .overflow-x-auto::-webkit-scrollbar {
          height: 6px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-track {
          background: rgba(147, 51, 234, 0.1);
          border-radius: 3px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb {
          background-color: rgba(147, 51, 234, 0.4);
          border-radius: 3px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
          background-color: rgba(147, 51, 234, 0.6);
        }
        
        /* Ensure width is set for scrolling */
        .w-max {
          width: max-content;
        }
      `}</style>
    </section>
  );
};

export default HeroVisual;
