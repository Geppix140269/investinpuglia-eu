'use client'

import { useEffect, useRef } from 'react'

interface VideoSectionProps {
  videoUrl: string
  title: string
  description: string
  stats?: { label: string; value: string }[]
  ctaText?: string
  ctaLink?: string
  overlay?: 'light' | 'dark' | 'gradient'
  position?: 'left' | 'center' | 'right'
}

export default function VideoSection({
  videoUrl,
  title,
  description,
  stats,
  ctaText,
  ctaLink,
  overlay = 'gradient',
  position = 'center'
}: VideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  
  useEffect(() => {
    // Ensure video plays on mobile devices
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Auto-play prevented, video will play on user interaction
      })
    }
  }, [])
  
  const overlayClasses = {
    light: 'bg-white/70',
    dark: 'bg-black/60',
    gradient: 'bg-gradient-to-r from-black/70 via-black/50 to-transparent'
  }
  
  const positionClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right'
  }
  
  return (
    <section className="relative h-[600px] overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      
      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayClasses[overlay]}`} />
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className={`container mx-auto px-4 flex flex-col ${positionClasses[position]}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl">
            {title}
          </h2>
          
          <p className="text-xl text-gray-200 mb-8 max-w-2xl">
            {description}
          </p>
          
          {stats && (
            <div className="flex flex-wrap gap-8 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-white">
                  <div className="text-3xl font-bold text-yellow-400">{stat.value}</div>
                  <div className="text-sm uppercase tracking-wider opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
          
          {ctaText && ctaLink && (
            <a
              href={ctaLink}
              className="inline-block bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-yellow-400 transition-all duration-300 hover:shadow-2xl"
            >
              {ctaText}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}