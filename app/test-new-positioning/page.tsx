// app/test-new-positioning/page.tsx
import HeroSectionTrustCentered from '@/components/sections/HeroSection_TrustCentered'
import OpportunitySectionProtection from '@/components/sections/OpportunitySection_Protection'
import HowItWorksClientJourney from '@/components/sections/HowItWorks_ClientJourney'
import InvestmentProtectionFee from '@/components/sections/InvestmentProtectionFee'
import OurCommitment from '@/components/sections/OurCommitment'
import FAQ from '@/components/sections/FAQ'
import CTASection from '@/components/sections/CTASection'

export default function TestNewPositioning() {
  return (
    <main className="min-h-screen">
      {/* New Trust-Centered Hero */}
      <HeroSectionTrustCentered />
      
      {/* Investment Protection Focus */}
      <OpportunitySectionProtection />
      
      {/* Client Journey (No Video Calls) */}
      <HowItWorksClientJourney />
      
      {/* Investment Protection Fee Explanation */}
      <InvestmentProtectionFee />
      
      {/* Keep existing commitment section for now */}
      <OurCommitment />
      
      {/* Keep existing FAQ */}
      <FAQ />
      
      {/* Keep existing CTA */}
      <CTASection />
    </main>
  )
}