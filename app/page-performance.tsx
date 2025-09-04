// app/page-performance.tsx
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Script from 'next/script'

// Only load critical above-the-fold content immediately
import HeroVideoRotatorOptimized from '@/components/sections/HeroVideoRotatorOptimized'

// Loading skeleton component
const LoadingSkeleton = () => (
  <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
)

// Lazy load ALL other components with loading states
const PortfolioSlider = dynamic(() => import('@/components/PortfolioSlider'), {
  loading: () => <LoadingSkeleton />,
  ssr: true
})

const AboutGiuseppe = dynamic(() => import('@/components/sections/AboutGiuseppe'), {
  loading: () => <LoadingSkeleton />,
  ssr: false // Client-side only for non-critical content
})

const MeetTheTeam = dynamic(() => import('@/components/sections/MeetTheTeam'), {
  loading: () => <LoadingSkeleton />,
  ssr: false
})

const WhyPuglia = dynamic(() => import('@/components/sections/WhyPuglia'), {
  loading: () => <LoadingSkeleton />,
  ssr: false
})

const GrantInstitutions = dynamic(() => import('@/components/sections/GrantInstitutions'), {
  loading: () => <LoadingSkeleton />,
  ssr: false
})

const FAQ = dynamic(() => import('@/components/sections/FAQ'), {
  loading: () => <LoadingSkeleton />,
  ssr: false
})

const LocationsIndustries = dynamic(() => import('@/components/sections/LocationsIndustries'), {
  loading: () => <LoadingSkeleton />,
  ssr: false
})

const ExitIntentPopup = dynamic(() => import('@/components/ExitIntentPopup'), { 
  ssr: false,
  loading: () => null 
})

const PageSEOSection = dynamic(() => import('@/components/PageSEOSection'), {
  loading: () => null,
  ssr: false
})

export const metadata: Metadata = {
  title: 'Italian Property Investment with EU Grants | InvestInPuglia.eu',
  description: 'Transform Puglia properties into EU grant-funded gold. Access €200K-€2.75M in Mini PIA grants with expert guidance.',
  keywords: 'Italian property investment, EU grants Italy, Mini PIA grant, Puglia real estate, foreign investment Italy',
  openGraph: {
    title: 'Italian Property Investment with EU Grants | InvestInPuglia.eu',
    description: 'Transform Puglia properties into EU grant-funded gold. Access €200K-€2.75M in Mini PIA grants.',
    images: ['https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/v1756888562/investinpuglia/og-image.jpg'],
  }
}

export default function PerformantHomePage() {
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
      
      {/* Critical: Hero Section - Optimized */}
      <HeroVideoRotatorOptimized />
      
      {/* Portfolio Slider - High priority but lazy */}
      <Suspense fallback={<LoadingSkeleton />}>
        <PortfolioSlider />
      </Suspense>
      
      {/* About Section - Medium priority */}
      <Suspense fallback={<LoadingSkeleton />}>
        <AboutGiuseppe />
      </Suspense>

      {/* Team Section - Medium priority */}
      <Suspense fallback={<LoadingSkeleton />}>
        <MeetTheTeam />
      </Suspense>
      
      {/* Why Puglia - Low priority */}
      <Suspense fallback={<LoadingSkeleton />}>
        <WhyPuglia />
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