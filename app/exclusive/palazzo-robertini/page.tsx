import { Metadata } from 'next'
import PalazzoRobertini from '@/components/sections/PalazzoRobertini'

export const metadata: Metadata = {
  title: 'Palazzo Robertini-Leuzzi - Exclusive Historic Investment | InvestInPuglia',
  description: 'Exclusive access to Palazzo Robertini-Leuzzi, a magnificent 16th-century noble residence in Galatina historic center. €1.2M investment opportunity for luxury boutique hotel conversion.',
  keywords: 'Palazzo Robertini, historic palace, Galatina investment, luxury hotel opportunity, 16th century architecture, Puglia real estate',
  robots: 'noindex, nofollow', // Keep this private - not indexed by search engines
  openGraph: {
    title: 'Palazzo Robertini-Leuzzi - Exclusive Historic Investment',
    description: 'Magnificent 16th-century palace in Galatina - exclusive investment opportunity',
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