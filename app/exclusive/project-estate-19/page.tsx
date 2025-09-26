import { Metadata } from 'next'
import VillaGrassi from '@/components/sections/VillaGrassi'

export const metadata: Metadata = {
  title: 'Project Estate 19 - Confidential Investment | InvestInPuglia',
  description: 'Exclusive access to a magnificent 19th-century estate complex in Southern Italy near Lecce. Historic noble residence with film location heritage - luxury resort conversion opportunity.',
  keywords: 'historic estate, luxury investment, 19th century architecture, Puglia real estate, exclusive opportunity, film location',
  robots: 'noindex, nofollow', // Keep this private - not indexed by search engines
  openGraph: {
    title: 'Project Estate 19 - Confidential Investment',
    description: 'Magnificent 19th-century noble estate in Southern Italy - exclusive investment opportunity',
    type: 'website',
    locale: 'en_US',
  }
}

export default function ProjectEstate19Page() {
  return (
    <main className="min-h-screen bg-white">
      {/* Private page - no public navigation */}
      <VillaGrassi />
    </main>
  )
}