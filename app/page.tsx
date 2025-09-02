// app/page-optimized.tsx
'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Critical above-the-fold component - lightweight version
import HeroVisualLite from '@/components/sections/HeroVisualLite'

// Lazy load all below-the-fold components
const ExitIntentPopup = dynamic(() => import('@/components/ExitIntentPopup'), { 
  ssr: false,
  loading: () => null 
})

const GrantInstitutions = dynamic(() => import('@/components/sections/GrantInstitutions'), {
  loading: () => <div className="h-32 bg-gray-50 animate-pulse" />
})

const PortfolioSlider = dynamic(() => import('@/components/PortfolioSlider'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
})

const WhyPuglia = dynamic(() => import('@/components/sections/WhyPuglia'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
})

const AboutGiuseppe = dynamic(() => import('@/components/sections/AboutGiuseppe'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
})

const MeetTheTeam = dynamic(() => import('@/components/sections/MeetTheTeam'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
})

const FAQ = dynamic(() => import('@/components/sections/FAQ'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
})

const PageSEOSection = dynamic(() => import('@/components/PageSEOSection'), {
  loading: () => null
})

export default function HomePage() {
  return (
    <>
      {/* Exit Intent - only load on desktop, non-critical */}
      <div className="hidden md:block">
        <Suspense fallback={null}>
          <ExitIntentPopup />
        </Suspense>
      </div>

      {/* Critical: Hero Section - lightweight version */}
      <HeroVisualLite />
      
      {/* Below the fold - lazy loaded */}
      <Suspense fallback={<div className="h-32 bg-gray-50 animate-pulse" />}>
        <GrantInstitutions />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <PortfolioSlider />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <WhyPuglia />
      </Suspense>

      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <AboutGiuseppe />
      </Suspense>

      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <MeetTheTeam />
      </Suspense>

      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <FAQ />
      </Suspense>
      
      {/* SEO Section - low priority, lazy loaded */}
      <Suspense fallback={null}>
        <PageSEOSection pageKey="home" />
      </Suspense>
    </>
  )
}