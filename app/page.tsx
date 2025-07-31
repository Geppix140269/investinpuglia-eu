// app/page.tsx
'use client'

// Components
import ExitIntentPopup from '@/components/ExitIntentPopup'

// Sections
import HeroSection from '@/components/sections/HeroSection'
import GrantInstitutions from '@/components/sections/GrantInstitutions'
import OpportunitySection from '@/components/sections/OpportunitySection'
import HowItWorks from '@/components/sections/HowItWorks'
import AboutGiuseppe from '@/components/sections/AboutGiuseppe'
import Services from '@/components/sections/Services'
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

      <HeroSection />
      <GrantInstitutions />
      <OpportunitySection />
      <HowItWorks />
      <AboutGiuseppe />
      <Services />
      <SuccessStories />
      <FAQ />
      <CTASection />
    </>
  )
}
