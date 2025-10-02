'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight, Shield } from 'lucide-react';
import { getHeroVideos, type HeroVideo } from '@/lib/sanity/heroVideos';

interface VideoData {
  url: string;
  poster: string;
  name: string;
}

const HeroVideoRotatorOptimized = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Fallback videos if Sanity fails
  const fallbackVideos: VideoData[] = [
    {
      url: 'https://res.cloudinary.com/dusubfxgo/video/upload/v1759170284/geppix1402_81420_Luxury_Masseria_Hotel_AFTER__Drone_footage_a_6ee2bd3a-89ac-4bfb-a632-da8fe2d1b53a_0_qioxeb.mp4',
      poster: 'https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto:low,w_1920,h_1080,c_limit/v1759170284/geppix1402_81420_Luxury_Masseria_Hotel_AFTER__Drone_footage_a_6ee2bd3a-89ac-4bfb-a632-da8fe2d1b53a_0_qioxeb.jpg',
      name: 'Luxury Masseria Hotel'
    },
    {
      url: 'https://res.cloudinary.com/dusubfxgo/video/upload/v1759170286/geppix1402_81420_Slow_drone_descent_towards_masseria_pool_at__43c0b5ca-59f3-43dd-82f1-5a9f498e6369_0_yuu5cw.mp4',
      poster: 'https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto:low,w_1920,h_1080,c_limit/v1759170286/geppix1402_81420_Slow_drone_descent_towards_masseria_pool_at__43c0b5ca-59f3-43dd-82f1-5a9f498e6369_0_yuu5cw.jpg',
      name: 'Masseria Pool Descent'
    },
    {
      url: 'https://res.cloudinary.com/dusubfxgo/video/upload/v1759170638/geppix1402_81420_A_small_industrial_plant_in_Puglia_converted_60942fcf-1f0a-4134-9b92-c536ca399b63_1_y0kruj.mp4',
      poster: 'https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto:low,w_1920,h_1080,c_limit/v1759170638/geppix1402_81420_A_small_industrial_plant_in_Puglia_converted_60942fcf-1f0a-4134-9b92-c536ca399b63_1_y0kruj.jpg',
      name: 'Industrial Conversion Project'
    },
    {
      url: 'https://res.cloudinary.com/dusubfxgo/video/upload/v1759170634/geppix1402_81420_A_small_industrial_plant_in_Puglia_converted_7ac04e16-2aa2-4e4c-9c6a-e88911a57e93_1_sjppvw.mp4',
      poster: 'https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto:low,w_1920,h_1080,c_limit/v1759170634/geppix1402_81420_A_small_industrial_plant_in_Puglia_converted_7ac04e16-2aa2-4e4c-9c6a-e88911a57e93_1_sjppvw.jpg',
      name: 'Industrial Development'
    },
    {
      url: 'https://res.cloudinary.com/dusubfxgo/video/upload/v1756888562/investinpuglia/hero-videos/beach-club.mp4',
      poster: 'https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto:low,w_1920,h_1080,c_limit/v1756888562/investinpuglia/hero-videos/beach-club.jpg',
      name: 'Beach Club Aperitivo'
    },
    {
      url: 'https://res.cloudinary.com/dusubfxgo/video/upload/v1756888546/investinpuglia/hero-videos/rooftop-bar.mp4',
      poster: 'https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto:low,w_1920,h_1080,c_limit/v1756888546/investinpuglia/hero-videos/rooftop-bar.jpg',
      name: 'Rooftop Bar View'
    },
    {
      url: 'https://res.cloudinary.com/dusubfxgo/video/upload/v1756888555/investinpuglia/hero-videos/helicopter-pov.mp4',
      poster: 'https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto:low,w_1920,h_1080,c_limit/v1756888555/investinpuglia/hero-videos/helicopter-pov.jpg',
      name: 'Helicopter Arrival'
    }
  ];

  // Fetch videos from Sanity
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const sanityVideos = await getHeroVideos();
        
        if (sanityVideos && sanityVideos.length > 0) {
          const formattedVideos: VideoData[] = sanityVideos.map((video: HeroVideo) => ({
            url: video.video.asset.url,
            poster: video.poster.asset.url,
            name: video.name
          }));
          setVideos(formattedVideos);
        } else {
          console.warn('No videos found in Sanity, using fallback videos');
          setVideos(fallbackVideos);
        }
      } catch (error) {
        console.error('Error fetching videos from Sanity:', error);
        setVideos(fallbackVideos);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

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

  // Rotate videos every 8 seconds on both desktop and mobile
  useEffect(() => {
    if (!videoLoaded || loading || videos.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [videoLoaded, videos.length, loading]);

  // Handle video end to switch to next
  const handleVideoEnd = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const stats = [
    { value: '€50M+', label: 'Grants Secured for Clients' },
    { value: '€100K+', label: 'Average Client Savings vs. DIY' },
    { value: '30+', label: 'Years International Experience' },
    { value: '0', label: 'Failed Projects' }
  ];

  // Show loading state or fallback if no videos
  if (loading || videos.length === 0) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
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
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-white text-center">
            {loading ? (
              <div className="animate-pulse">
                <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                <p>Loading videos...</p>
              </div>
            ) : (
              <p>No videos available</p>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Mobile version with proper messaging
  if (isMobile) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        {/* Video background for mobile */}
        <div className="absolute inset-0">
          <video
            key={currentVideoIndex}
            autoPlay
            muted
            playsInline
            loop
            className="absolute inset-0 w-full h-full object-cover opacity-70"
            poster="https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto,w_800/v1756236779/investinpuglia/properties/generic/trulli-alberobello.jpg"
          >
            <source src={videos[currentVideoIndex].url} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </div>
        
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-white space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="font-medium">EU Grants Available • Local Expertise</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-bold">
                <span className="block text-white drop-shadow-lg">
                  Your Puglia Investment, Professionally Orchestrated
                </span>
              </h1>

              <p className="text-lg text-gray-100 max-w-lg drop-shadow-lg">
                I'm your boots-on-the-ground coordinator in Puglia, orchestrating property acquisition, EU grant applications (€350K-€2.25M), and construction oversight. 30+ years international business experience, based permanently in Italy, zero commission conflicts - working exclusively for your success.
              </p>
              
              <div className="grid grid-cols-2 gap-3 max-w-lg">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-2xl font-bold text-yellow-400">{stat.value}</div>
                    <div className="text-xs text-gray-200">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#services"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-xl text-lg"
                >
                  See My Services
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/property-snapshot"
                  className="inline-flex items-center justify-center gap-2 bg-white text-indigo-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  Start with €500 Property Analysis
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
                <Shield className="w-4 h-4 text-green-400" />
                <span className="font-medium">55% EU Grant Funding Available</span>
              </div>
              
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold mb-4">
                  <span className="block text-white drop-shadow-lg">
                    Your Puglia Investment, Professionally Orchestrated
                  </span>
                </h1>
                <p className="text-xl text-gray-100 drop-shadow-lg">
                  I'm your boots-on-the-ground coordinator in Puglia, orchestrating property acquisition, EU grant applications (€350K-€2.25M), and construction oversight. 30+ years international business experience, based permanently in Italy, zero commission conflicts - working exclusively for your success.
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
                  href="#services"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-xl text-lg"
                >
                  See My Services
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/property-snapshot"
                  className="inline-flex items-center gap-2 bg-white text-indigo-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  Start with €500 Property Analysis
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

export default HeroVideoRotatorOptimized;