import { Metadata } from 'next'
import PalazzoRobertini from '@/components/sections/PalazzoRobertini'

export const metadata: Metadata = {
  title: 'Exclusive Historic Palazzo - Confidential Investment | InvestInPuglia',
  description: 'Exclusive access to a magnificent 16th-century noble residence in Southern Italy historic center. €1.2M investment opportunity for luxury boutique hotel conversion.',
  keywords: 'historic palace, luxury investment, 16th century architecture, Puglia real estate, exclusive opportunity',
  robots: 'noindex, nofollow', // Keep this private - not indexed by search engines
  openGraph: {
    title: 'Exclusive Historic Palazzo - Confidential Investment',
    description: 'Magnificent 16th-century palace in Southern Italy - exclusive investment opportunity',
    type: 'website',
    locale: 'en_US',
  }
}

export default function PalazzoRobertiniPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Private page - no public navigation */}
      <PalazzoRobertini />
    </main>
  )
}