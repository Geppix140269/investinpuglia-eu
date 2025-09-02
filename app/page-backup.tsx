// app/page.tsx
// app/page.tsx
'use client'

// Components
import ExitIntentPopup from '@/components/ExitIntentPopup'
import PageSEOSection from '@/components/PageSEOSection'
import PortfolioSlider from '@/components/PortfolioSlider'

// Sections
import HeroVisual from '@/components/sections/HeroVisual'
import GrantInstitutions from '@/components/sections/GrantInstitutions'
import WhyPuglia from '@/components/sections/WhyPuglia'
import AboutGiuseppe from '@/components/sections/AboutGiuseppe'
import MeetTheTeam from '@/components/sections/MeetTheTeam'
import Services from '@/components/sections/Services'
import AboutUsSummary from '@/components/sections/AboutUsSummary'
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
      
      {/* Portfolio Showcase - Prominent Section */}
      <PortfolioSlider />
      
      <WhyPuglia />
      <AboutGiuseppe />
      <MeetTheTeam />
      <FAQ />
      
      {/* SEO FAQ Section with Internal Links */}
      <PageSEOSection pageKey="home" />
    </>
  )
}
