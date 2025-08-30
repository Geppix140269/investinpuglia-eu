'use client'

import { useState } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react'

export default function VideoDemoPage() {
  const [currentVideo, setCurrentVideo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  
  // Using placeholder videos for demo - replace with your actual Cloudinary URLs
  // Based on your collection: https://collection.cloudinary.com/dusubfxgo/2dbb0d2b10b2b1cf96b85890886a0d31
  const videos = [
    {
      url: 'https://res.cloudinary.com/dusubfxgo/video/upload/v1706285427/samples/elephants.mp4', // Placeholder
      title: 'Historic Masseria Transformation',
      description: 'Traditional farmhouse to luxury boutique hotel'
    },
    {
      url: 'https://res.cloudinary.com/dusubfxgo/video/upload/v1706285427/samples/sea-turtle.mp4', // Placeholder
      title: 'Coastal Resort Development',
      description: '5-star eco-resort with sustainable architecture'
    },
    {
      url: 'https://res.cloudinary.com/dusubfxgo/video/upload/v1706285427/samples/elephants.mp4', // Placeholder
      title: 'Urban Hotel Renovation',
      description: 'Historic palazzo to modern business hotel'
    },
    {
      url: 'https://res.cloudinary.com/dusubfxgo/video/upload/v1706285427/samples/sea-turtle.mp4', // Placeholder
      title: 'Trulli Village Restoration',
      description: 'Traditional trulli to exclusive rental villas'
    }
  ]
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-center">Video Clips Preview</h1>
        <p className="text-gray-400 text-center mb-8">
          Demo page to preview your Midjourney video clips
        </p>
        
        {/* Main Video Player */}
        <div className="bg-black rounded-lg overflow-hidden mb-8">
          <div className="relative aspect-video">
            <video
              className="w-full h-full"
              src={videos[currentVideo].url}
              loop
              muted={isMuted}
              autoPlay
              playsInline
            />
            
            {/* Video Overlay Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h2 className="text-2xl font-bold mb-2">{videos[currentVideo].title}</h2>
              <p className="text-gray-300">{videos[currentVideo].description}</p>
            </div>
            
            {/* Controls */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="bg-black/50 backdrop-blur-sm p-2 rounded-full hover:bg-black/70 transition-all"
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Video Thumbnails */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {videos.map((video, index) => (
            <button
              key={index}
              onClick={() => setCurrentVideo(index)}
              className={`relative aspect-video bg-gray-800 rounded-lg overflow-hidden transition-all ${
                index === currentVideo ? 'ring-4 ring-purple-500 scale-105' : 'hover:scale-105'
              }`}
            >
              <video
                className="w-full h-full object-cover"
                src={video.url}
                muted
                playsInline
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Play className="h-8 w-8 text-white/80" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                <p className="text-xs font-semibold truncate">{video.title}</p>
              </div>
            </button>
          ))}
        </div>
        
        {/* How These Would Look Section */}
        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h3 className="text-2xl font-bold mb-6">How These Videos Would Look on Your Site:</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-700 rounded-lg p-4">
              <h4 className="font-bold mb-2 text-purple-400">Hero Background</h4>
              <p className="text-sm text-gray-300">
                Full-screen video background with your headline overlaid. Auto-rotating between all 4 clips.
              </p>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-4">
              <h4 className="font-bold mb-2 text-emerald-400">Portfolio Showcase</h4>
              <p className="text-sm text-gray-300">
                Interactive gallery where videos play on hover, showing project transformations.
              </p>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-4">
              <h4 className="font-bold mb-2 text-yellow-400">Section Backgrounds</h4>
              <p className="text-sm text-gray-300">
                Video backgrounds for specific sections like testimonials or call-to-action areas.
              </p>
            </div>
          </div>
        </div>
        
        {/* Implementation Options */}
        <div className="bg-gradient-to-r from-purple-900 to-emerald-900 rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">Ready to Add These to Your Site?</h3>
          <p className="text-gray-200 mb-6">
            These Midjourney videos can transform your site's visual impact. Here's what we can do:
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-bold mb-2">Option 1: Hero Section</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Replace static hero with video</li>
                <li>• Auto-rotate between clips</li>
                <li>• Mobile-optimized</li>
                <li>• 1 hour implementation</li>
              </ul>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-bold mb-2">Option 2: Full Integration</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Video hero + showcase page</li>
                <li>• Portfolio integration</li>
                <li>• Performance optimization</li>
                <li>• 3-4 hours implementation</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Instructions */}
        <div className="mt-8 text-center text-gray-400">
          <p className="mb-2">
            To use your actual videos, we need the direct URLs from your Cloudinary collection:
          </p>
          <code className="bg-gray-800 px-3 py-1 rounded text-sm">
            https://collection.cloudinary.com/dusubfxgo/2dbb0d2b10b2b1cf96b85890886a0d31
          </code>
          <p className="mt-4 text-sm">
            This is just a demo page at <span className="text-purple-400">/video-demo</span> - your main site is untouched!
          </p>
        </div>
      </div>
    </div>
  )
}