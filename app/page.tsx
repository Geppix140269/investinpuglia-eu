// app/page.tsx
'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Script from 'next/script'

// Only load critical above-the-fold content immediately
import HeroVideoRotatorOptimized from '@/components/sections/HeroVideoRotatorOptimized'
import { VideoErrorBoundary } from '@/components/ErrorBoundary'

// Loading skeleton component
const LoadingSkeleton = () => (
  <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
)

// Lazy load ALL other components with loading states and optimized chunking
const PropertyCalculatorTeaser = dynamic(
  () => import(/* webpackChunkName: "calculator-teaser" */ '@/components/sections/PropertyCalculatorTeaser'),
  {
    loading: () => <LoadingSkeleton />,
    ssr: true
  }
)

const PortfolioSlider = dynamic(
  () => import(/* webpackChunkName: "portfolio" */ '@/components/PortfolioSlider'),
  {
    loading: () => <LoadingSkeleton />,
    ssr: true
  }
)

const PalazzoOpportunity = dynamic(
  () => import(/* webpackChunkName: "palazzo-opportunity" */ '@/components/sections/PalazzoOpportunity'),
  {
    loading: () => <LoadingSkeleton />,
    ssr: true
  }
)

const PalazzoRobertini = dynamic(
  () => import(/* webpackChunkName: "palazzo-robertini" */ '@/components/sections/PalazzoRobertini'),
  {
    loading: () => <LoadingSkeleton />,
    ssr: true
  }
)


const MeetTheTeam = dynamic(
  () => import(/* webpackChunkName: "team" */ '@/components/sections/MeetTheTeam'),
  {
    loading: () => <LoadingSkeleton />,
    ssr: false
  }
)

const WhyPuglia = dynamic(
  () => import(/* webpackChunkName: "why-puglia" */ '@/components/sections/WhyPuglia'),
  {
    loading: () => <LoadingSkeleton />,
    ssr: false
  }
)

const GrantInstitutions = dynamic(
  () => import(/* webpackChunkName: "grants" */ '@/components/sections/GrantInstitutions'),
  {
    loading: () => <LoadingSkeleton />,
    ssr: false
  }
)

const FAQ = dynamic(
  () => import(/* webpackChunkName: "faq" */ '@/components/sections/FAQ'),
  {
    loading: () => <LoadingSkeleton />,
    ssr: false
  }
)

const LocationsIndustries = dynamic(
  () => import(/* webpackChunkName: "locations" */ '@/components/sections/LocationsIndustries'),
  {
    loading: () => <LoadingSkeleton />,
    ssr: false
  }
)

const ExitIntentPopup = dynamic(
  () => import(/* webpackChunkName: "exit-intent" */ '@/components/ExitIntentPopup'),
  { 
    ssr: false,
    loading: () => null 
  }
)

const PageSEOSection = dynamic(
  () => import(/* webpackChunkName: "seo" */ '@/components/PageSEOSection'),
  {
    loading: () => null,
    ssr: false
  }
)

export default function HomePage() {
  return (
    <>
      {/* Preload critical fonts */}
      <link
        rel="preload"
        href="/fonts/inter-var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      
      {/* DNS Prefetch for external resources */}
      <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      <link rel="preconnect" href="https://res.cloudinary.com" />
      
      {/* Critical: Hero Section - Optimized with Error Boundary */}
      <VideoErrorBoundary>
        <HeroVideoRotatorOptimized />
      </VideoErrorBoundary>
      
      {/* Portfolio Slider - High priority but lazy */}
      <Suspense fallback={<LoadingSkeleton />}>
        <PortfolioSlider />
      </Suspense>

      {/* Palazzo Palmariggi Opportunity - Featured Deal */}
      <Suspense fallback={<LoadingSkeleton />}>
        <PalazzoOpportunity />
      </Suspense>

      {/* Palazzo Robertini - Historic 16th Century Investment */}
      <Suspense fallback={<LoadingSkeleton />}>
        <PalazzoRobertini />
      </Suspense>

      {/* Team Section - Medium priority */}
      <Suspense fallback={<LoadingSkeleton />}>
        <MeetTheTeam />
      </Suspense>

      {/* Why Puglia - Medium priority */}
      <Suspense fallback={<LoadingSkeleton />}>
        <WhyPuglia />
      </Suspense>

      {/* Property Calculator Teaser - After establishing credibility and opportunity */}
      <Suspense fallback={<LoadingSkeleton />}>
        <PropertyCalculatorTeaser />
      </Suspense>
      
      {/* Grant Institutions - Low priority */}
      <Suspense fallback={<LoadingSkeleton />}>
        <GrantInstitutions />
      </Suspense>

      {/* FAQ - Low priority */}
      <Suspense fallback={<LoadingSkeleton />}>
        <FAQ />
      </Suspense>
      
      {/* Locations - Very low priority */}
      <Suspense fallback={<LoadingSkeleton />}>
        <LocationsIndustries />
      </Suspense>
      
      {/* Exit Intent - Only on desktop, non-critical */}
      <div className="hidden md:block">
        <Suspense fallback={null}>
          <ExitIntentPopup />
        </Suspense>
      </div>
      
      {/* SEO Section - Lowest priority */}
      <Suspense fallback={null}>
        <PageSEOSection pageKey="home" />
      </Suspense>

      {/* Defer non-critical scripts */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
        strategy="afterInteractive"
      />
      
      {/* Web Vitals monitoring */}
      <Script id="web-vitals" strategy="afterInteractive">
        {`
          if (typeof window !== 'undefined') {
            window.addEventListener('load', () => {
              // Report Core Web Vitals
              if ('PerformanceObserver' in window) {
                try {
                  const po = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                      // Log to console or send to analytics
                      console.log('Web Vital:', entry.name, entry.value);
                    }
                  });
                  po.observe({ type: 'largest-contentful-paint', buffered: true });
                  po.observe({ type: 'first-input', buffered: true });
                  po.observe({ type: 'layout-shift', buffered: true });
                } catch (e) {
                  console.error('Web Vitals error:', e);
                }
              }
            });
          }
        `}
      </Script>
    </>
  )
}