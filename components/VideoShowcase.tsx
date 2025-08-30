'use client'

import { useState } from 'react'
import { Play, Pause, Maximize2, X } from 'lucide-react'
import Image from 'next/image'

interface Video {
  id: string
  url: string
  thumbnail: string
  title: string
  description: string
  location: string
  investmentType: string
  grantAmount?: string
}

export default function VideoShowcase() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [isPlaying, setIsPlaying] = useState<{ [key: string]: boolean }>({})
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  // Your Midjourney videos with metadata
  const videos: Video[] = [
    {
      id: '1',
      url: 'https://res.cloudinary.com/dusubfxgo/video/upload/your-video-1.mp4',
      thumbnail: '/projects/masseria-thumb.jpg',
      title: 'Historic Masseria Transformation',
      description: 'From abandoned farmhouse to luxury boutique hotel with 20 suites',
      location: 'Ostuni, Puglia',
      investmentType: 'Complete Renovation',
      grantAmount: '€1.2M Mini PIA Grant'
    },
    {
      id: '2',
      url: 'https://res.cloudinary.com/dusubfxgo/video/upload/your-video-2.mp4',
      thumbnail: '/projects/resort-thumb.jpg',
      title: 'Coastal Resort Development',
      description: '5-star eco-resort with sustainable architecture and solar energy',
      location: 'Polignano a Mare',
      investmentType: 'New Development',
      grantAmount: '€2.5M Mini PIA Grant'
    },
    {
      id: '3',
      url: 'https://res.cloudinary.com/dusubfxgo/video/upload/your-video-3.mp4',
      thumbnail: '/projects/hotel-thumb.jpg',
      title: 'Urban Hotel Renovation',
      description: 'Historic palazzo converted into modern business hotel',
      location: 'Bari City Center',
      investmentType: 'Urban Regeneration',
      grantAmount: '€800K Grant'
    },
    {
      id: '4',
      url: 'https://res.cloudinary.com/dusubfxgo/video/upload/your-video-4.mp4',
      thumbnail: '/projects/villa-thumb.jpg',
      title: 'Luxury Villa Complex',
      description: 'Traditional trulli transformed into exclusive rental villas',
      location: 'Alberobello',
      investmentType: 'Heritage Restoration',
      grantAmount: '€1.5M Mini PIA Grant'
    }
  ]
  
  const openFullscreen = (video: Video) => {
    setSelectedVideo(video)
    setIsFullscreen(true)
  }
  
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Project Transformation Showcase</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Watch how EU grants and expert renovation transform Puglia's properties into profitable investments
          </p>
        </div>
        
        {/* Video Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {videos.map((video) => (
            <div 
              key={video.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Video Container */}
              <div className="relative aspect-video bg-black">
                <video
                  id={`video-${video.id}`}
                  className="w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                  onMouseEnter={(e) => {
                    e.currentTarget.play()
                    setIsPlaying({ ...isPlaying, [video.id]: true })
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause()
                    setIsPlaying({ ...isPlaying, [video.id]: false })
                  }}
                >
                  <source src={video.url} type="video/mp4" />
                </video>
                
                {/* Overlay Controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div className="text-white">
                      <h3 className="font-bold text-lg">{video.title}</h3>
                      <p className="text-sm opacity-90">{video.location}</p>
                    </div>
                    <button
                      onClick={() => openFullscreen(video)}
                      className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all"
                    >
                      <Maximize2 className="h-5 w-5 text-white" />
                    </button>
                  </div>
                </div>
                
                {/* Play/Pause Indicator */}
                <div className="absolute top-4 right-4">
                  {isPlaying[video.id] ? (
                    <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      LIVE PREVIEW
                    </div>
                  ) : (
                    <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                      <Play className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Video Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="inline-block bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full font-semibold mb-2">
                      {video.investmentType}
                    </span>
                    <p className="text-gray-600">{video.description}</p>
                  </div>
                </div>
                
                {video.grantAmount && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-800 font-medium">Grant Secured:</span>
                      <span className="text-lg font-bold text-green-900">{video.grantAmount}</span>
                    </div>
                  </div>
                )}
                
                <button
                  onClick={() => openFullscreen(video)}
                  className="mt-4 w-full bg-gradient-to-r from-purple-600 to-emerald-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  View Full Transformation
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-xl p-8 shadow-lg">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600">4</div>
              <div className="text-gray-600">Showcase Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">€5.5M</div>
              <div className="text-gray-600">Total Grants Secured</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">100%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">18-24</div>
              <div className="text-gray-600">Months to Complete</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Fullscreen Modal */}
      {isFullscreen && selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X className="h-8 w-8" />
          </button>
          
          <div className="max-w-6xl w-full">
            <video
              className="w-full rounded-lg"
              controls
              autoPlay
              loop
            >
              <source src={selectedVideo.url} type="video/mp4" />
            </video>
            
            <div className="mt-4 text-white">
              <h3 className="text-2xl font-bold mb-2">{selectedVideo.title}</h3>
              <p className="text-gray-300 mb-2">{selectedVideo.description}</p>
              <div className="flex gap-4 text-sm">
                <span>📍 {selectedVideo.location}</span>
                {selectedVideo.grantAmount && <span>💰 {selectedVideo.grantAmount}</span>}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}