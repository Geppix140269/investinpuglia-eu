// components/sections/HeroVisualLite.tsx
'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight, Shield } from 'lucide-react';

// Lightweight Hero with minimal JavaScript and optimized video loading
const HeroVisualLite = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Simple mobile check
    setIsMobile(window.innerWidth < 768);
    
    // Load video after 2 seconds or on user interaction
    const loadVideo = () => {
      if (!videoLoaded) {
        setVideoLoaded(true);
      }
    };
    
    // Load video on user interaction
    const events = ['scroll', 'touchstart', 'mousemove'];
    const handleInteraction = () => {
      loadVideo();
      events.forEach(e => window.removeEventListener(e, handleInteraction));
    };
    
    events.forEach(e => window.addEventListener(e, handleInteraction, { once: true, passive: true }));
    
    // Or load after delay
    const timer = setTimeout(loadVideo, 2000);
    
    return () => {
      clearTimeout(timer);
      events.forEach(e => window.removeEventListener(e, handleInteraction));
    };
  }, [videoLoaded]);

  const stats = [
    { value: '€9.9B', label: 'Foreign Investment' },
    { value: '55%', label: 'Grant Funding' },
    { value: '+66%', label: 'YoY Growth' },
    { value: '95%', label: 'Success Rate' }
  ];

  // Mobile version - static image only, no video
  if (isMobile) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
        {/* Optimized Cloudinary background image */}
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto,w_768,c_limit,fl_progressive/v1754597045/trulli_puglia_hero.jpg"
            alt="Puglia Investment"
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
        </div>
        
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-white space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                <Shield className="w-4 h-4 text-yellow-400" />
                <span className="font-medium">EU & Regione Puglia Backed</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold">
                55% Grants
                <span className="block text-2xl md:text-3xl mt-2 text-purple-200">
                  Non-Refundable Funding
                </span>
              </h1>
              
              <p className="text-xl text-purple-100 max-w-lg">
                Access EU co-funded grants up to €2.75M for your Puglia investment
              </p>
              
              <div className="grid grid-cols-2 gap-4 max-w-lg">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-purple-200">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center gap-2 bg-white text-purple-900 px-6 py-3 rounded-full font-semibold hover:bg-purple-50 transition-colors"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/mini-pia-guide"
                  className="inline-flex items-center justify-center gap-2 bg-purple-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-600 transition-colors"
                >
                  Grant Guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Desktop version - with lazy-loaded video
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Placeholder image while video loads */}
      <div className="absolute inset-0">
        <Image
          src="https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_1,w_20,c_limit,e_blur:1000/v1754597045/trulli_puglia_hero.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
      </div>
      
      {/* Lazy loaded video */}
      {videoLoaded && (
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          autoPlay
          muted
          loop
          playsInline
        >
          <source 
            src="https://res.cloudinary.com/dusubfxgo/video/upload/q_auto:eco,vc_auto,w_1920/v1754597045/hero_video.mp4" 
            type="video/mp4" 
          />
        </video>
      )}
      
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Content */}
            <div className="text-white space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
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
              
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-purple-200">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-4">
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
            
            {/* Right Content - Simple list instead of complex components */}
            <div className="space-y-6">
              <h3 className="text-white text-lg font-semibold">Eligible Industries</h3>
              
              <div className="space-y-3">
                <Link href="/industries" className="block bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors">
                  <div className="flex justify-between items-center text-white">
                    <span className="font-medium">Trulli & Historic Properties</span>
                    <span className="text-yellow-400">55% funding</span>
                  </div>
                </Link>
                
                <Link href="/industries" className="block bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors">
                  <div className="flex justify-between items-center text-white">
                    <span className="font-medium">Hotels & Tourism</span>
                    <span className="text-yellow-400">45% funding</span>
                  </div>
                </Link>
                
                <Link href="/industries" className="block bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors">
                  <div className="flex justify-between items-center text-white">
                    <span className="font-medium">Restaurants & Food</span>
                    <span className="text-yellow-400">50% funding</span>
                  </div>
                </Link>
                
                <Link href="/industries" className="block bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors">
                  <div className="flex justify-between items-center text-white">
                    <span className="font-medium">Manufacturing & Tech</span>
                    <span className="text-yellow-400">45% funding</span>
                  </div>
                </Link>
              </div>
              
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Available in: Bari, Lecce, Brindisi, Taranto & more</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroVisualLite;