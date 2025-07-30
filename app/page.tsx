// app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Components
import ExitIntentPopup from '@/components/ExitIntentPopup'
import TrulloPromptBanner from '@/components/TrulloPromptBanner'

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
  const [showTrulloPrompt, setShowTrulloPrompt] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTrulloPrompt(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div className="hidden md:block">
        <ExitIntentPopup />
      </div>

      {showTrulloPrompt && (
        <TrulloPromptBanner onClose={() => setShowTrulloPrompt(false)} />
      )}

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
