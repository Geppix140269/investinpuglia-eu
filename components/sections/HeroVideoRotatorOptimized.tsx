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
  const [videoError, setVideoError] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Optimized video URLs with adaptive quality based on connection speed
  const getVideoQuality = () => {
    if (typeof window !== 'undefined' && 'connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection?.effectiveType === '4g' && !connection?.saveData) {
        return 'q_auto:good';
      }
    }
    return 'q_auto:eco'; // Lower quality for better performance
  };

  const videos = [
    {
      url: `https://res.cloudinary.com/dusubfxgo/video/upload/${getVideoQuality()},f_auto,so_0,eo_10/v1756888562/investinpuglia/hero-videos/beach-club.mp4`,
      poster: 'https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto:low,w_1920,h_1080,c_limit/v1756888562/investinpuglia/hero-videos/beach-club.jpg',
      placeholderImage: 'https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto:low,w_20,h_12,c_limit,e_blur:1000/v1756888562/investinpuglia/hero-videos/beach-club.jpg',
      name: 'Beach Club Aperitivo'
    },
    {
      url: `https://res.cloudinary.com/dusubfxgo/video/upload/${getVideoQuality()},f_auto,so_0,eo_10/v1756888546/investinpuglia/hero-videos/rooftop-bar.mp4`,
      poster: 'https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto:low,w_1920,h_1080,c_limit/v1756888546/investinpuglia/hero-videos/rooftop-bar.jpg',
      placeholderImage: 'https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto:low,w_20,h_12,c_limit,e_blur:1000/v1756888546/investinpuglia/hero-videos/rooftop-bar.jpg',
      name: 'Rooftop Bar View'
    },
    {
      url: `https://res.cloudinary.com/dusubfxgo/video/upload/${getVideoQuality()},f_auto,so_0,eo_10/v1756888555/investinpuglia/hero-videos/helicopter-pov.mp4`,
      poster: 'https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto:low,w_1920,h_1080,c_limit/v1756888555/investinpuglia/hero-videos/helicopter-pov.jpg',
      placeholderImage: 'https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto:low,w_20,h_12,c_limit,e_blur:1000/v1756888555/investinpuglia/hero-videos/helicopter-pov.jpg',
      name: 'Helicopter Arrival'
    }
  ];

  // Initialize mobile and motion preference states
  useEffect(() => {
    const checkMobile = () => window.innerWidth < 768;
    const checkMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    setIsMobile(checkMobile());
    setIsReducedMotion(checkMotion());
    
    const handleResize = () => setIsMobile(checkMobile());
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Intersection Observer for lazy loading video
  useEffect(() => {
    if (!sectionRef.current || isMobile || isReducedMotion) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !showVideo) {
            setShowVideo(true);
            setVideoLoaded(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: '50px'
      }
    );
    
    observer.observe(sectionRef.current);
    
    return () => observer.disconnect();
  }, [isMobile, isReducedMotion, showVideo]);

  // Preload next video for smoother transitions
  const preloadNextVideo = useCallback(() => {
    if (!showVideo || videoError) return;
    
    const nextIndex = (currentVideoIndex + 1) % videos.length;
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = videos[nextIndex].url;
    link.as = 'video';
    document.head.appendChild(link);
  }, [currentVideoIndex, showVideo, videoError]);

  // Rotate videos every 15 seconds (increased for better performance)
  useEffect(() => {
    if (!videoLoaded || videoError || isReducedMotion) return;
    
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
      preloadNextVideo();
    }, 15000);
    
    return () => clearInterval(interval);
  }, [videoLoaded, videos.length, videoError, isReducedMotion, preloadNextVideo]);

  // Handle video errors gracefully
  const handleVideoError = () => {
    console.warn('Video failed to load, falling back to image');
    setVideoError(true);
    setShowVideo(false);
  };

  const stats = [
    { value: '100+', label: 'Years Combined Expertise' },
    { value: '€150M+', label: 'Projects Managed' },
    { value: '€1M+', label: 'Minimum Investment' },
    { value: '30+', label: 'Years International Experience' }
  ];

  // Optimized placeholder with blur-up effect
  const renderPlaceholder = () => (
    <div className="absolute inset-0 w-full h-full">
      <Image
        src={videos[currentVideoIndex].poster}
        alt="Puglia Investment Opportunity"
        fill
        className="object-cover"
        priority
        quality={isMobile ? 60 : 75}
        sizes="100vw"
        placeholder="blur"
        blurDataURL={videos[currentVideoIndex].placeholderImage}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/70 to-indigo-900/70" />
    </div>
  );

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[600px] md:min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '100vw 100vh' }}
    >
      {/* Background Video/Image with error handling */}
      {!isMobile && !isReducedMotion && showVideo && !videoError ? (
        <video
          ref={videoRef}
          key={currentVideoIndex}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster={videos[currentVideoIndex].poster}
          onError={handleVideoError}
        >
          <source src={videos[currentVideoIndex].url} type="video/mp4" />
        </video>
      ) : (
        renderPlaceholder()
      )}

      {/* Content Overlay with optimized animations */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-[600px] md:min-h-screen px-4 sm:px-6 lg:px-8 py-20 md:py-0">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Heading with reduced animation */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in">
            Transform Puglia Properties into
            <span className="block text-yellow-400 mt-2">EU Grant-Funded Gold</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto animate-fade-in-delay">
            Unlock €200K-€2.75M in Mini PIA Grants for Your Italian Investment.
            Expert Guidance from Application to Profit.
          </p>

          {/* Optimized CTA Buttons - Reduced to 2 primary actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/consultation"
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-xl transition-shadow transform flex items-center justify-center gap-2 will-change-transform"
              prefetch={true}
            >
              Book FREE Consultation
              <ArrowRight className="w-6 h-6" />
            </Link>
            <Link
              href="/mini-pia-guide"
              className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-lg text-lg font-bold hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
              prefetch={true}
            >
              <Shield className="w-5 h-5" />
              Mini PIA Guide
            </Link>
          </div>

          {/* Stats Grid with lazy rendering */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-2xl md:text-3xl font-bold text-yellow-400">{stat.value}</div>
                <div className="text-xs md:text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Name Indicator - Only show when video is playing */}
      {showVideo && !isMobile && !isReducedMotion && !videoError && (
        <div className="absolute bottom-8 left-8 z-20">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
            <p className="text-white text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {videos[currentVideoIndex].name}
            </p>
          </div>
        </div>
      )}

      {/* Performance monitoring for dev */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 right-4 z-30 bg-black/50 text-white text-xs p-2 rounded">
          Video: {showVideo ? 'Active' : 'Inactive'} | 
          Mobile: {isMobile ? 'Yes' : 'No'} |
          Motion: {isReducedMotion ? 'Reduced' : 'Normal'}
        </div>
      )}
    </section>
  );
};

export default HeroVideoRotatorOptimized;