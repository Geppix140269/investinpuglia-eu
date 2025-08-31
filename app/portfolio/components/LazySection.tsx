'use client'

import { ReactNode, Suspense } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

interface LazySectionProps {
  children: ReactNode
  fallback?: ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
}

const DefaultLoader = ({ height = "h-64" }: { height?: string }) => (
  <div className={`${height} bg-gray-100 animate-pulse flex items-center justify-center`}>
    <div className="text-gray-500 text-lg">Loading...</div>
  </div>
)

export default function LazySection({
  children,
  fallback = <DefaultLoader />,
  className = '',
  threshold = 0.1,
  rootMargin = '100px'
}: LazySectionProps) {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold,
    rootMargin,
    freezeOnceVisible: true
  })

  return (
    <div ref={ref} className={className}>
      {isIntersecting ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  )
}