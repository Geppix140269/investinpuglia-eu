'use client'

import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'
import CloudinaryImage from './CloudinaryImage'

interface ImageModalProps {
  images: { url: string; alt: string }[]
  initialIndex: number
  onClose: () => void
}

export default function ImageModal({ images, initialIndex, onClose }: ImageModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isZoomed, setIsZoomed] = useState(false)
  const [showThumbnails, setShowThumbnails] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isZoomed) {
          setIsZoomed(false)
        } else {
          onClose()
        }
      }
      if (e.key === 'ArrowLeft') handlePrevious()
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === ' ') {
        e.preventDefault()
        setIsZoomed(!isZoomed)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [currentIndex, isZoomed, onClose])

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
    setIsZoomed(false)
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    setIsZoomed(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && images.length > 1) {
      handleNext()
    }
    if (isRightSwipe && images.length > 1) {
      handlePrevious()
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-[10000] bg-gradient-to-b from-black/70 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="text-white">
            <span className="text-lg font-medium">{currentIndex + 1} / {images.length}</span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Zoom controls */}
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="text-white hover:text-gray-300 transition-colors p-2 hover:bg-white/10 rounded"
              title={isZoomed ? "Zoom out" : "Zoom in"}
            >
              {isZoomed ? <ZoomOut className="h-6 w-6" /> : <ZoomIn className="h-6 w-6" />}
            </button>
            
            {/* Thumbnails toggle */}
            <button
              onClick={() => setShowThumbnails(!showThumbnails)}
              className="text-white hover:text-gray-300 transition-colors p-2 hover:bg-white/10 rounded"
              title="Toggle thumbnails"
            >
              <Maximize2 className="h-6 w-6" />
            </button>
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 transition-colors p-2 hover:bg-white/10 rounded"
              title="Close (ESC)"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Main image container */}
      <div 
        className="flex-1 flex items-center justify-center relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Previous button */}
        {images.length > 1 && (
          <button
            onClick={handlePrevious}
            className="absolute left-4 z-[10000] text-white hover:text-gray-300 bg-black/50 hover:bg-black/70 p-3 rounded-full transition-all transform hover:scale-110"
            title="Previous (←)"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
        )}

        {/* Image */}
        <div 
          className={`relative transition-all duration-300 ${
            isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <div className={`${isZoomed ? 'overflow-auto max-h-screen' : ''}`}>
            <CloudinaryImage
              src={images[currentIndex].url}
              alt={images[currentIndex].alt}
              width={isZoomed ? 2560 : 1920}
              height={isZoomed ? 1440 : 1080}
              className={`
                transition-all duration-300
                ${isZoomed 
                  ? 'w-auto h-auto min-w-[100vw] cursor-move' 
                  : 'w-auto h-auto max-w-[90vw] max-h-[80vh] object-contain'
                }
              `}
              quality="auto"
              priority
            />
          </div>
        </div>

        {/* Next button */}
        {images.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-4 z-[10000] text-white hover:text-gray-300 bg-black/50 hover:bg-black/70 p-3 rounded-full transition-all transform hover:scale-110"
            title="Next (→)"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        )}

        {/* Mobile swipe indicator */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full md:hidden">
          ← Swipe to navigate →
        </div>
      </div>

      {/* Thumbnail strip */}
      {showThumbnails && images.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-4 z-[10000]">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            <div className="flex gap-2 w-max mx-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index)
                    setIsZoomed(false)
                  }}
                  className={`
                    relative flex-shrink-0 overflow-hidden rounded transition-all
                    ${index === currentIndex 
                      ? 'ring-2 ring-white scale-105' 
                      : 'opacity-60 hover:opacity-100'
                    }
                  `}
                >
                  <CloudinaryImage
                    src={image.url}
                    alt={image.alt}
                    width={120}
                    height={80}
                    className="w-[120px] h-[80px] object-cover"
                    quality="auto"
                  />
                  {index === currentIndex && (
                    <div className="absolute inset-0 bg-white/20" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Instructions overlay (shows briefly) */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center pointer-events-none animate-pulse">
        <p className="text-sm opacity-50">Click image to zoom • Use arrows to navigate</p>
      </div>
    </div>
  )
}