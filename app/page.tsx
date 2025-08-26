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

      <HeroVisual />
      <SignAgreementBanner />
      <GrantInstitutions />
      <WhyPuglia />
      <OpportunitySection />
      <HowItWorks />
      <AboutGiuseppe />
      <Services />
      <ApulinkShowcase />
      <TrulloSection />
      <SuccessStories />
      <FAQ />
      <CTASection />
    </>
  )
}
