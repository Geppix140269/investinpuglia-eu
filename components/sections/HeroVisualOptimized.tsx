// components/sections/HeroVisualOptimized.tsx
'use client'

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowRight, Shield } from 'lucide-react';

const HeroVisualOptimized = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Defer video loading until component is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          // Load video only when visible
          if (videoRef.current) {
            videoRef.current.load();
          }
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('hero-section');
    if (element) observer.observe(element);

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      if (element) observer.unobserve(element);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const projectTypes = [
    {
      name: 'Trulli & Historic',
      grant: '55%',
      max: 'up to €2.25M',
      link: '/industries'
    },
    {
      name: 'Hotels & Tourism',
      grant: '45%',
      max: 'up to €5M',
      link: '/industries'
    },
    {
      name: 'Restaurants',
      grant: '50%',
      max: 'up to €2M',
      link: '/industries'
    },
    {
      name: 'Manufacturing',
      grant: '45%',
      max: 'up to €5M',
      link: '/industries'
    }
  ];

  const locations = [
    { name: 'Bari', link: '/locations/invest-in-bari-bari' },
    { name: 'Lecce', link: '/locations/invest-in-lecce-lecce' },
    { name: 'Ostuni', link: '/locations/invest-in-ostuni-brindisi' },
    { name: 'Polignano', link: '/locations/invest-in-polignano-a-mare-bari' },
    { name: 'Brindisi', link: '/locations/invest-in-brindisi-brindisi' },
    { name: 'Taranto', link: '/locations/invest-in-taranto-taranto' }
  ];

  const stats = [
    { value: '€9.9B', label: 'Foreign Investment', link: '/locations/invest-in-bari-bari' },
    { value: '62%', label: 'Market Share', link: '/industries' },
    { value: '+66%', label: 'YoY Growth', link: '/how-it-works' },
    { value: '#4', label: 'Puglia Ranking', link: '/about' }
  ];

  // MOBILE OPTIMIZED VERSION - LESS JAVASCRIPT
  if (isMobile) {
    return (
      <section id="hero-section" className="relative min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
        {/* Simple background image for mobile */}
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto,w_768/v1754597045/social_geppix1402_81420_Luxurious_renovated_trulli_houses_in_Puglia__f6f51651-9ca0-4e21-a004-ae288528045f_0_ofth8z.jpg"
            alt="Puglia Investment"
            fill
            priority
            className="object-cover opacity-30"
            sizes="100vw"
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 h-screen flex flex-col justify-center p-6 text-white">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-3 py-1.5 text-xs">
              <Shield className="w-3 h-3 text-yellow-400" />
              <span className="font-medium">Government Backed</span>
            </div>
            
            <div>
              <div className="text-5xl font-bold mb-2">55% Grants</div>
              <div className="text-xl opacity-90">Government Funded</div>
            </div>
            
            <div>
              <div className="text-xl font-light opacity-90">Your Investment</div>
              <div className="text-3xl font-bold">€2.25M</div>
              <div className="text-xl font-light opacity-90 mt-2">Total Project Value</div>
              <div className="text-3xl font-bold">€5M</div>
            </div>
            
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 bg-white text-purple-900 px-6 py-3 rounded-full font-semibold hover:bg-purple-50 transition-colors"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // DESKTOP VERSION - OPTIMIZED
  return (
    <section id="hero-section" className="relative min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 overflow-hidden">
      {/* Lazy loaded video background */}
      {isVisible && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          autoPlay
          muted
          loop
          playsInline
          poster="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
        >
          <source 
            src="https://res.cloudinary.com/dusubfxgo/video/upload/q_auto,vc_auto/v1754597045/social_geppix1402_81420_Luxurious_renovated_trulli_houses_in_Puglia__f6f51651-9ca0-4e21-a004-ae288528045f_0_ofth8z.mp4" 
            type="video/mp4" 
          />
        </video>
      )}
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2">
              <Shield className="w-4 h-4 text-yellow-400" />
              <span className="font-medium">EU & Regione Puglia Backed</span>
            </div>
            
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-4">
                Get 55% Grants
                <span className="block text-3xl lg:text-4xl mt-2 text-purple-200">
                  For Your Puglia Investment
                </span>
              </h1>
              <p className="text-xl text-purple-100">
                EU co-funded non-refundable grants up to €2.75M
              </p>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <Link key={idx} href={stat.link} className="bg-white/10 backdrop-blur-md rounded-lg p-4 hover:bg-white/20 transition-colors">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-purple-200">{stat.label}</div>
                </Link>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 bg-white text-purple-900 px-6 py-3 rounded-full font-semibold hover:bg-purple-50 transition-colors"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/mini-pia-guide"
                className="inline-flex items-center gap-2 bg-purple-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-600 transition-colors"
              >
                View Grant Guide
              </Link>
            </div>
          </div>
          
          {/* Right Content - Project Types */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold mb-4">Eligible Industries</h3>
            <div className="grid gap-3">
              {projectTypes.map((project, idx) => (
                <Link
                  key={idx}
                  href={project.link}
                  className="bg-white/10 backdrop-blur-md rounded-lg p-4 hover:bg-white/20 transition-all transform hover:scale-105"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-white font-semibold">{project.name}</div>
                      <div className="text-purple-200 text-sm">{project.grant} funding</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">{project.max}</div>
                      <ArrowRight className="w-4 h-4 text-purple-300 ml-auto" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Locations */}
            <div className="mt-6">
              <h4 className="text-white text-sm font-medium mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Prime Locations
              </h4>
              <div className="flex flex-wrap gap-2">
                {locations.map((location, idx) => (
                  <Link
                    key={idx}
                    href={location.link}
                    className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-sm text-white hover:bg-white/20 transition-colors"
                  >
                    {location.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroVisualOptimized;