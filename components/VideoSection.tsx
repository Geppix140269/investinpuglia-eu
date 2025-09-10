'use client'

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { getVideosBySection, type HeroVideo } from '@/lib/sanity/heroVideos';

interface VideoSectionProps {
  section: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  showIndicators?: boolean;
  rotationInterval?: number; // in milliseconds
  fallbackImage?: string;
  children?: React.ReactNode; // Content to overlay on video
}

interface VideoData {
  url: string;
  poster: string;
  name: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  section,
  className = "relative w-full h-96",
  autoPlay = true,
  loop = false,
  muted = true,
  controls = false,
  showIndicators = false,
  rotationInterval = 8000,
  fallbackImage = "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto,w_100,c_limit,e_blur:1000/v1756236779/investinpuglia/properties/generic/trulli-alberobello.jpg",
  children
}) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Fetch videos for the specified section
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const sanityVideos = await getVideosBySection(section);
        
        if (sanityVideos && sanityVideos.length > 0) {
          const formattedVideos: VideoData[] = sanityVideos.map((video: HeroVideo) => ({
            url: video.video.asset.url,
            poster: video.poster.asset.url,
            name: video.name
          }));
          setVideos(formattedVideos);
        }
      } catch (error) {
        console.error(`Error fetching videos for section ${section}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [section]);

  // Auto-rotate videos if multiple videos and rotation is enabled
  useEffect(() => {
    if (!videoLoaded || videos.length <= 1 || !rotationInterval) return;
    
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    }, rotationInterval);
    
    return () => clearInterval(interval);
  }, [videoLoaded, videos.length, rotationInterval]);

  // Handle video loading
  useEffect(() => {
    if (videos.length > 0) {
      setVideoLoaded(true);
    }
  }, [videos]);

  // Handle video end (for non-looping videos)
  const handleVideoEnd = () => {
    if (!loop && videos.length > 1) {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className={className}>
        <div className="absolute inset-0">
          <Image
            src={fallbackImage}
            alt=""
            fill
            className="object-cover opacity-50"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-white text-center">
            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // No videos available - show fallback image
  if (videos.length === 0) {
    return (
      <div className={className}>
        <div className="absolute inset-0">
          <Image
            src={fallbackImage}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        {children && (
          <div className="relative z-10 h-full">
            {children}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Video Background */}
      <div className="absolute inset-0">
        {videoLoaded && (
          <video
            ref={videoRef}
            key={currentVideoIndex}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            controls={controls}
            playsInline
            poster={videos[currentVideoIndex].poster}
            onEnded={handleVideoEnd}
          >
            <source src={videos[currentVideoIndex].url} type="video/mp4" />
          </video>
        )}
        
        {/* Fallback poster image */}
        {!videoLoaded && (
          <Image
            src={videos[currentVideoIndex]?.poster || fallbackImage}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        )}
      </div>

      {/* Video Indicators */}
      {showIndicators && videos.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 mb-2 text-white text-sm">
            {videos[currentVideoIndex].name}
          </div>
          <div className="flex gap-2 justify-center">
            {videos.map((video, index) => (
              <button
                key={index}
                onClick={() => setCurrentVideoIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentVideoIndex 
                    ? 'bg-white w-6' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                title={video.name}
                aria-label={`Switch to ${video.name}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Overlay Content */}
      {children && (
        <div className="relative z-10 h-full">
          {children}
        </div>
      )}
    </div>
  );
};

export default VideoSection;