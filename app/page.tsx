// app/page.tsx
// app/page.tsx
'use client'

// Components
import ExitIntentPopup from '@/components/ExitIntentPopup'
import PageSEOSection from '@/components/PageSEOSection'

// Sections
import HeroVisual from '@/components/sections/HeroVisual'
import SignAgreementBanner from '@/components/sections/SignAgreementBanner'
import GrantInstitutions from '@/components/sections/GrantInstitutions'
import WhyPuglia from '@/components/sections/WhyPuglia'
import AboutGiuseppe from '@/components/sections/AboutGiuseppe'
import Services from '@/components/sections/Services'
import ApulinkShowcase from '@/components/sections/ApulinkShowcase'
import TrulloSection from '@/components/sections/TrulloSection'
import SuccessStories from '@/components/sections/OurCommitment'
import FAQ from '@/components/sections/FAQ'

export default function HomePage() {
  return (
    <>
      <div className="hidden md:block">
        <ExitIntentPopup />
      </div>

      {/* Main Homepage Sections */}
      <HeroVisual />
      
      {/* IMPORTANT: Grant Institutions with EU and Regione Puglia logos */}
      <GrantInstitutions />
      
      <WhyPuglia />
      <AboutGiuseppe />
      <Services />
      <TrulloSection />
      <ApulinkShowcase />
      <SuccessStories />
      <FAQ />
      
      {/* SEO FAQ Section with Internal Links */}
      <PageSEOSection pageKey="home" />
      
      {/* Sign Agreement Banner moved to bottom */}
      <SignAgreementBanner />
    </>
  )
}
