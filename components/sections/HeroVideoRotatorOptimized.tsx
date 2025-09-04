'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight, Shield } from 'lucide-react';

const HeroVideoRotatorOptimized = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Optimized video URLs with Cloudinary transformations for performance
  const videos = [
    {
      url: 'https://res.cloudinary.com/dusubfxgo/video/upload/q_auto:low,f_auto/v1756888562/investinpuglia/hero-videos/beach-club.mp4',
      poster: 'https://res.cloudinary.com/dusubfxgo/video/upload/so_0,f_jpg,q_auto:low/v1756888562/investinpuglia/hero-videos/beach-club.jpg',
      name: 'Beach Club Aperitivo'
    },
    {
      url: 'https://res.cloudinary.com/dusubfxgo/video/upload/q_auto:low,f_auto/v1756888546/investinpuglia/hero-videos/rooftop-bar.mp4',
      poster: 'https://res.cloudinary.com/dusubfxgo/video/upload/so_0,f_jpg,q_auto:low/v1756888546/investinpuglia/hero-videos/rooftop-bar.jpg',
      name: 'Rooftop Bar View'
    },
    {
      url: 'https://res.cloudinary.com/dusubfxgo/video/upload/q_auto:low,f_auto/v1756888555/investinpuglia/hero-videos/helicopter-pov.mp4',
      poster: 'https://res.cloudinary.com/dusubfxgo/video/upload/so_0,f_jpg,q_auto:low/v1756888555/investinpuglia/hero-videos/helicopter-pov.jpg',
      name: 'Helicopter Arrival'
    }
  ];

  // Initialize mobile state
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Lazy load video after page load
  useEffect(() => {
    // Only load video after initial render and interaction
    const loadVideo = () => {
      if (!showVideo) {
        setShowVideo(true);
        setVideoLoaded(true);
      }
    };

    // Load video after 2 seconds or on user interaction
    const timer = setTimeout(loadVideo, 2000);
    const handleInteraction = () => {
      loadVideo();
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };

    window.addEventListener('scroll', handleInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', handleInteraction, { once: true, passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [showVideo]);

  // Rotate videos every 10 seconds (longer for better performance)
  useEffect(() => {
    if (!videoLoaded) return;
    
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [videoLoaded, videos.length]);

  const stats = [
    { value: '100+', label: 'Years Combined Expertise' },
    { value: '€150M+', label: 'Projects Managed' },
    { value: '€1M+', label: 'Minimum Investment' },
    { value: '30+', label: 'Years International Experience' }
  ];

  // Render placeholder image for mobile or while loading
  const renderPlaceholder = () => (
    <div className="absolute inset-0 w-full h-full">
      <Image
        src={videos[0].poster}
        alt="Puglia Investment"
        fill
        className="object-cover"
        priority
        quality={75}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/70 to-indigo-900/70" />
    </div>
  );

  return (
    <section className="relative min-h-[600px] md:min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden">
      {/* Background Video/Image */}
      {!isMobile && showVideo ? (
        <video
          ref={videoRef}
          key={currentVideoIndex}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster={videos[currentVideoIndex].poster}
        >
          <source src={videos[currentVideoIndex].url} type="video/mp4" />
        </video>
      ) : (
        renderPlaceholder()
      )}

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-[600px] md:min-h-screen px-4 sm:px-6 lg:px-8 py-20 md:py-0">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Transform Puglia Properties into
            <span className="block text-yellow-400 mt-2">EU Grant-Funded Gold</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Unlock €200K-€2.75M in Mini PIA Grants for Your Italian Investment.
            Expert Guidance from Application to Profit.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/consultation"
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-xl transition-all transform flex items-center justify-center gap-2"
            >
              Book FREE Consultation
              <ArrowRight className="w-6 h-6" />
            </Link>
            <Link
              href="/mini-pia-guide"
              className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-lg text-lg font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Shield className="w-5 h-5" />
              Mini PIA Guide
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
              >
                <div className="text-2xl md:text-3xl font-bold text-yellow-400">{stat.value}</div>
                <div className="text-xs md:text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Name Indicator */}
      {showVideo && !isMobile && (
        <div className="absolute bottom-8 left-8 z-20">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
            <p className="text-white text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {videos[currentVideoIndex].name}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroVideoRotatorOptimized;