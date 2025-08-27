// app/page.tsx
// app/page.tsx
'use client'

// Components
import ExitIntentPopup from '@/components/ExitIntentPopup'

// Sections
import HeroVisual from '@/components/sections/HeroVisual'
import SignAgreementBanner from '@/components/sections/SignAgreementBanner'
import GrantInstitutions from '@/components/sections/GrantInstitutions'
import WhyPuglia from '@/components/sections/WhyPuglia'
import OpportunitySection from '@/components/sections/OpportunitySection'
import HowItWorks from '@/components/sections/HowItWorks'
import AboutGiuseppe from '@/components/sections/AboutGiuseppe'
import Services from '@/components/sections/Services'
import ApulinkShowcase from '@/components/sections/ApulinkShowcase'
import TrulloSection from '@/components/sections/TrulloSection'
import SuccessStories from '@/components/sections/OurCommitment'
import FAQ from '@/components/sections/FAQ'
import CTASection from '@/components/sections/CTASection'

export default function HomePage() {
  return (
    <>
      <div className="hidden md:block">
        <ExitIntentPopup />
      </div>

      {/* STREAMLINED MOBILE-FIRST HOMEPAGE FOR CONVERSION */}
      <HeroVisual />
      <SignAgreementBanner />
      <OpportunitySection />
      <HowItWorks />
      <AboutGiuseppe />
      <FAQ />
      <CTASection />

      {/* MOVED TO SEPARATE PAGES FOR BETTER SEO & LESS CLUTTER */}
      {/* <GrantInstitutions /> - Move to /about or /how-it-works */}
      {/* <WhyPuglia /> - Move to /about or dedicated landing page */}
      {/* <Services /> - Already has /services page */}
      {/* <ApulinkShowcase /> - Move to /tools or /services */}
      {/* <TrulloSection /> - Move to /tools or separate page */}
      {/* <SuccessStories /> - Move to /about or testimonials page */}
    </>
  )
}
