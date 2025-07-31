// app/page.tsx
'use client'

// Components
import ExitIntentPopup from '@/components/ExitIntentPopup'

// Sections
import HeroSection from '@/components/sections/HeroSection'
import GrantInstitutions from '@/components/sections/GrantInstitutions'
import OpportunitySection from '@/components/sections/OpportunitySection'
import HowItWorks from '@/components/sections/HowItWorks'
import BuyerProfile from '@/components/sections/BuyerProfile'
import AboutGiuseppe from '@/components/sections/AboutGiuseppe'
import Services from '@/components/sections/Services'
import SuccessStories from '@/components/sections/SuccessStories'
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
      <BuyerProfile />
      <AboutGiuseppe />
      <Services />
      <SuccessStories />
      <FAQ />
      <CTASection />
    </>
  )
}
