'use client'

import { useEffect } from 'react'

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Preload critical resources
    const criticalImages = [
      '/Cataldo\'s projects/Donna-Menga.webp',
      '/Cataldo\'s projects/Torre Matta.jpg'
    ]

    // Add preload hints for above-the-fold images
    criticalImages.forEach(src => {
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = src
      link.as = 'image'
      document.head.appendChild(link)
    })

    // Optimize viewport meta for better mobile performance
    const viewportMeta = document.querySelector('meta[name="viewport"]')
    if (viewportMeta) {
      viewportMeta.setAttribute(
        'content',
        'width=device-width, initial-scale=1, viewport-fit=cover'
      )
    }

    // Add performance observer for monitoring
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          // Log long tasks in development
          if (process.env.NODE_ENV === 'development' && entry.entryType === 'longtask') {
            console.warn('Long task detected:', entry.duration, 'ms')
          }
        })
      })
      
      observer.observe({ entryTypes: ['longtask', 'largest-contentful-paint', 'first-input'] })
    }
  }, [])

  return null
}