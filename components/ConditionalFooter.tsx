'use client'

import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'

const Footer = dynamic(
  () => import('@/components/Footer'),
  {
    ssr: false,
    loading: () => null
  }
)

export default function ConditionalFooter() {
  const pathname = usePathname()

  // Don't render footer on zara-theme route (it has its own)
  const isZaraTheme = pathname?.startsWith('/zara-theme') ?? false

  if (isZaraTheme) {
    return null
  }

  return <Footer />
}
