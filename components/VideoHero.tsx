'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, Volume2, VolumeX } from 'lucide-react'

interface VideoHeroProps {
  title?: string
  subtitle?: string
  showCTA?: boolean
}

export default function VideoHero({ 
  title = "Transform Puglia's Historic Beauty", 
  subtitle = "Into Your Investment Success Story",
  showCTA = true 
}: VideoHeroProps) {
  const [currentVideo, setCurrentVideo] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  
  // Your 4 Midjourney video URLs - replace with actual Cloudinary URLs
  const videos = [
    'https://res.cloudinary.com/dusubfxgo/video/upload/v1234567890/puglia-development-1.mp4',
    'https://res.cloudinary.com/dusubfxgo/video/upload/v1234567890/puglia-development-2.mp4',
    'https://res.cloudinary.com/dusubfxgo/video/upload/v1234567890/puglia-development-3.mp4',
    'https://res.cloudinary.com/dusubfxgo/video/upload/v1234567890/puglia-development-4.mp4'
  ]
  
  // Descriptions for each video
  const videoDescriptions = [
    "Historic Masseria Transformation",
    "Luxury Resort Development",
    "Boutique Hotel Renovation",
    "Coastal Villa Restoration"
  ]
  
  // Rotate videos every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [videos.length])
  
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {videos.map((video, index) => (
          <video
            key={index}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentVideo ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src={video} type="video/mp4" />
          </video>
        ))}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        <div className="max-w-5xl mx-auto text-center">
          {/* Video indicator */}
          <div className="mb-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-sm font-medium">Now Showing:</span>
            <span className="text-sm font-bold text-yellow-400">
              {videoDescriptions[currentVideo]}
            </span>
          </div>
          
          {/* Main title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-up">
            {title}
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-gray-200 animate-fade-up animation-delay-200">
            {subtitle}
          </p>
          
          {/* Video controls */}
          <div className="flex justify-center gap-4 mb-8">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentVideo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentVideo 
                    ? 'w-8 bg-white' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>
          
          {showCTA && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up animation-delay-400">
              <a
                href="/mini-pia-guide"
                className="bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                Explore Investment Opportunities
              </a>
              <a
                href="/portfolio"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-black transition-all"
              >
                View Our Portfolio
              </a>
            </div>
          )}
        </div>
        
        {/* Mute/Unmute button */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-8 right-8 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-white/70" />
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-up {
          animation: fadeUp 0.8s ease forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
      `}</style>
    </section>
  )
}