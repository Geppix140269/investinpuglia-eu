'use client'

import { useEffect, useState, useRef } from 'react'

export default function VideoIntroModal() {
  const [isVisible, setIsVisible] = useState(false)
  const [showPlayButton, setShowPlayButton] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if user has already seen the video
    const hasSeenVideo = localStorage.getItem('hasSeenIntroVideo')

    if (!hasSeenVideo) {
      // Show modal after 1.5 seconds
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        closeModal()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isVisible])

  const handlePlayClick = () => {
    if (videoRef.current) {
      setShowPlayButton(false)
      videoRef.current.play()
    }
  }

  const closeModal = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
    setIsVisible(false)
    localStorage.setItem('hasSeenIntroVideo', 'true')
  }

  const handleVideoEnded = () => {
    // Wait 1 second then auto-close
    setTimeout(() => {
      closeModal()
    }, 1000)
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close if clicking the backdrop (not the video container)
    if (e.target === modalRef.current) {
      closeModal()
    }
  }

  if (!isVisible) return null

  return (
    <div
      ref={modalRef}
      className="video-modal-overlay"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div className="video-modal-container">
        {/* Close button */}
        <button
          onClick={closeModal}
          className="video-modal-close"
          aria-label="Close video"
        >
          ×
        </button>

        {/* Video container */}
        <div className="video-wrapper">
          <video
            ref={videoRef}
            className="video-element"
            preload="metadata"
            controls
            onEnded={handleVideoEnded}
            playsInline
          >
            <source
              src="https://res.cloudinary.com/dusubfxgo/video/upload/v1759471543/Invest_Puglia_Seamlessly_nbhzle.mp4"
              type="video/mp4"
            />
            <p>Video temporarily unavailable. Please visit our Services page to learn more.</p>
          </video>

          {/* Play button overlay */}
          {showPlayButton && (
            <button
              onClick={handlePlayClick}
              className="play-button-overlay"
              aria-label="Play video"
            >
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="40" cy="40" r="40" fill="white" />
                <path
                  d="M32 25L55 40L32 55V25Z"
                  fill="#c87941"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .video-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease;
          padding: 1rem;
          overflow-y: auto;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .video-modal-container {
          position: relative;
          width: 100%;
          max-width: 900px;
          max-height: 90vh;
          margin: auto;
        }

        .video-modal-close {
          position: absolute;
          top: -40px;
          right: 0;
          background: none;
          border: none;
          color: white;
          font-size: 40px;
          cursor: pointer;
          line-height: 1;
          padding: 0;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.2s ease;
          z-index: 10000;
        }

        .video-modal-close:hover {
          opacity: 0.7;
        }

        .video-wrapper {
          position: relative;
          width: 100%;
          border-radius: 8px;
          overflow: hidden;
          background: #000;
        }

        .video-element {
          width: 100%;
          height: auto;
          max-height: 90vh;
          display: block;
          border-radius: 8px;
          object-fit: contain;
        }

        .play-button-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: none;
          border: none;
          cursor: pointer;
          transition: transform 0.2s ease;
          z-index: 10;
          padding: 0;
        }

        .play-button-overlay:hover {
          transform: translate(-50%, -50%) scale(1.1);
        }

        .play-button-overlay svg {
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
        }

        /* Mobile responsive styles */
        @media (max-width: 768px) {
          .video-modal-overlay {
            padding: 0.5rem;
          }

          .video-modal-container {
            width: 95%;
          }

          .video-modal-close {
            top: -35px;
            font-size: 32px;
            width: 32px;
            height: 32px;
          }

          .play-button-overlay svg {
            width: 60px;
            height: 60px;
          }
        }

        @media (max-width: 375px) {
          .play-button-overlay svg {
            width: 50px;
            height: 50px;
          }
        }
      `}</style>
    </div>
  )
}
