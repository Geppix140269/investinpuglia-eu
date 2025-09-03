'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight, Shield } from 'lucide-react';

const HeroVideoRotator = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Your three MIDJOURNEY videos with names
  const videos = [
    {
      url: 'https://res.cloudinary.com/dusubfxgo/video/upload/v1756888562/investinpuglia/hero-videos/beach-club.mp4',
      name: 'Beach Club Aperitivo'
    },
    {
      url: 'https://res.cloudinary.com/dusubfxgo/video/upload/v1756888546/investinpuglia/hero-videos/rooftop-bar.mp4',
      name: 'Rooftop Bar View'
    },
    {
      url: 'https://res.cloudinary.com/dusubfxgo/video/upload/v1756888555/investinpuglia/hero-videos/helicopter-pov.mp4',
      name: 'Helicopter Arrival'
    }
  ];
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    
    const loadVideo = () => {
      if (!videoLoaded) {
        setVideoLoaded(true);
      }
    };
    
    const events = ['scroll', 'touchstart', 'mousemove'];
    const handleInteraction = () => {
      loadVideo();
      events.forEach(e => window.removeEventListener(e, handleInteraction));
    };
    
    events.forEach(e => window.addEventListener(e, handleInteraction, { once: true, passive: true }));
    const timer = setTimeout(loadVideo, 1000);
    
    return () => {
      clearTimeout(timer);
      events.forEach(e => window.removeEventListener(e, handleInteraction));
    };
  }, [videoLoaded]);

  // Rotate videos every 8 seconds for better demo
  useEffect(() => {
    if (!videoLoaded || isMobile) return;
    
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [videoLoaded, isMobile, videos.length]);

  // Handle video end to switch to next
  const handleVideoEnd = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const stats = [
    { value: '100+', label: 'Years Combined Expertise' },
    { value: '€150M+', label: 'Projects Managed' },
    { value: '€1M+', label: 'Minimum Investment' },
    { value: '30+', label: 'Years International Experience' }
  ];

  // Mobile version
  if (isMobile) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto,w_1200,c_limit,fl_progressive/v1756236779/investinpuglia/properties/generic/trulli-alberobello.jpg"
            alt="Puglia Investment"
            fill
            priority
            className="object-cover opacity-50"
            sizes="100vw"
          />
        </div>
        
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-white space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                <Shield className="w-4 h-4 text-yellow-400" />
                <span className="font-medium">Italian Excellence • International Experience</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold">
                Elite Advisory
                <span className="block text-2xl md:text-3xl mt-2 text-purple-200">
                  For Serious Investors Only
                </span>
              </h1>
              
              <p className="text-xl text-purple-100 max-w-lg">
                Holistic investment consulting from property assessment to grant financing. Projects above €1M only.
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
                  href="/consultation"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full font-bold hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-xl text-lg"
                >
                  FREE Expert Consultation
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center gap-2 bg-white text-purple-900 px-6 py-3 rounded-full font-semibold hover:bg-purple-50 transition-colors"
                >
                  Qualify Your Project
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Desktop with rotating videos
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Placeholder while loading */}
      <div className="absolute inset-0">
        <Image
          src="https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto,w_100,c_limit,e_blur:1000/v1756236779/investinpuglia/properties/generic/trulli-alberobello.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-50"
          sizes="100vw"
        />
      </div>
      
      {/* Single video element with changing source */}
      {videoLoaded && (
        <video
          key={currentVideoIndex}
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          autoPlay
          muted
          loop={false}
          playsInline
          onEnded={handleVideoEnd}
          src={videos[currentVideoIndex].url}
        >
          <source src={videos[currentVideoIndex].url} type="video/mp4" />
        </video>
      )}

      {/* Video indicator with names */}
      {videoLoaded && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 mb-2 text-white text-sm">
            Now Playing: {videos[currentVideoIndex].name}
          </div>
          <div className="flex gap-2 justify-center">
            {videos.map((video, index) => (
              <button
                key={index}
                onClick={() => setCurrentVideoIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentVideoIndex 
                    ? 'bg-white w-8' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                title={video.name}
                aria-label={`Switch to ${video.name}`}
              />
            ))}
          </div>
        </div>
      )}
      
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Content */}
            <div className="text-white space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Shield className="w-4 h-4 text-yellow-400" />
                <span className="font-medium">Italian Excellence • International Experience</span>
              </div>
              
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold mb-4">
                  Your Trusted Italian Partners
                  <span className="block text-3xl lg:text-4xl mt-2 text-purple-200">
                    From Vision to Success
                  </span>
                </h1>
                <p className="text-xl text-purple-100">
                  Exclusive holistic advisory for investments above €1M. We are NOT real estate agents - we orchestrate your entire investment journey.
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
                  href="/consultation"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full font-bold hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-xl text-lg"
                >
                  FREE Expert Consultation
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center gap-2 bg-white text-purple-900 px-6 py-3 rounded-full font-semibold hover:bg-purple-50 transition-colors"
                >
                  Qualify for Our Services
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
            
            {/* Right Content */}
            <div className="space-y-6">
              <h3 className="text-white text-lg font-semibold">Our Holistic Services</h3>
              
              <div className="space-y-3">
                <Link href="/industries" className="block bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors">
                  <div className="flex justify-between items-center text-white">
                    <span className="font-medium">Property Assessment & Due Diligence</span>
                    <span className="text-yellow-400">Expert Analysis</span>
                  </div>
                </Link>
                
                <Link href="/industries" className="block bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors">
                  <div className="flex justify-between items-center text-white">
                    <span className="font-medium">Grant Financing (Mini PIA & Beyond)</span>
                    <span className="text-yellow-400">Up to 55%</span>
                  </div>
                </Link>
                
                <Link href="/industries" className="block bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors">
                  <div className="flex justify-between items-center text-white">
                    <span className="font-medium">Project Management & Execution</span>
                    <span className="text-yellow-400">End-to-End</span>
                  </div>
                </Link>
                
                <Link href="/industries" className="block bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors">
                  <div className="flex justify-between items-center text-white">
                    <span className="font-medium">Local Network & Partnerships</span>
                    <span className="text-yellow-400">Exclusive Access</span>
                  </div>
                </Link>
              </div>
              
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Working with Puglia's most prestigious real estate agencies & developers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroVideoRotator;