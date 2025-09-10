'use client'

import React, { useState, useEffect, useRef } from 'react'
import { getSectionVideos, type SectionVideo, type SectionType } from '@/lib/sanity/sectionVideos'

interface VideoBackgroundProps {
  section: SectionType
  className?: string
  overlay?: boolean
  overlayOpacity?: number
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  controls?: boolean
  showIndicator?: boolean
  rotationInterval?: number // in milliseconds
  children?: React.ReactNode
}

export default function VideoBackground({
  section,
  className = "absolute inset-0",
  overlay = true,
  overlayOpacity = 0.5,
  autoplay = true,
  muted = true,
  loop = true,
  controls = false,
  showIndicator = false,
  rotationInterval = 8000,
  children
}: VideoBackgroundProps) {
  const [videos, setVideos] = useState<SectionVideo[]>([])
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const intervalRef = useRef<NodeJS.Timeout>()

  // Fetch videos for the section
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const sectionVideos = await getSectionVideos(section)
        if (sectionVideos && sectionVideos.length > 0) {
          setVideos(sectionVideos)
          setIsLoaded(true)
        } else {
          console.warn(`No videos found for section: ${section}`)
          setHasError(true)
        }
      } catch (error) {
        console.error(`Error fetching videos for section ${section}:`, error)
        setHasError(true)
      }
    }

    fetchVideos()
  }, [section])

  // Auto-rotate videos if multiple exist
  useEffect(() => {
    if (videos.length > 1 && rotationInterval > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentVideoIndex((prev) => (prev + 1) % videos.length)
      }, rotationInterval)

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }
  }, [videos.length, rotationInterval])

  // Handle video end to rotate to next
  const handleVideoEnd = () => {
    if (videos.length > 1) {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length)
    }
  }

  if (hasError || !isLoaded || videos.length === 0) {
    return (
      <div className={className}>
        {overlay && (
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" 
            style={{ opacity: overlayOpacity }}
          />
        )}
        {children}
      </div>
    )
  }

  const currentVideo = videos[currentVideoIndex]

  return (
    <div className={`relative ${className}`}>
      {/* Video Background */}
      <video
        ref={videoRef}
        key={currentVideo._id}
        autoPlay={autoplay}
        muted={muted}
        loop={videos.length === 1 ? loop : false}
        controls={controls}
        playsInline
        onEnded={handleVideoEnd}
        className="absolute inset-0 w-full h-full object-cover"
        poster={currentVideo.poster.asset.url}
      >
        <source src={currentVideo.video.asset.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      {overlay && (
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" 
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Video Indicator */}
      {showIndicator && videos.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 mb-2 text-white text-sm">
            Now Playing: {currentVideo.name}
          </div>
          <div className="flex gap-2 justify-center">
            {videos.map((video, index) => (
              <button
                key={video._id}
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

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}