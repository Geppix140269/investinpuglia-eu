'use client'

import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'

// Lazy load components
const TrulloEnhanced = dynamic(
  () => import('@/components/TrulloEnhanced').catch(() => {
    return { default: () => null }
  }),
  {
    ssr: false,
    loading: () => null
  }
)

const VisitorTracker = dynamic(
  () => import('@/components/VisitorTracker'),
  {
    ssr: false,
    loading: () => null
  }
)

const MetadataProvider = dynamic(
  () => import('@/components/MetadataProvider'),
  {
    ssr: false,
    loading: () => null
  }
)

const Navbar = dynamic(
  () => import('@/components/Navbar'),
  {
    ssr: false,
    loading: () => null
  }
)

export default function ConditionalLayoutComponents() {
  const pathname = usePathname()

  // Don't render these components on the zara-theme route
  const isZaraTheme = pathname?.startsWith('/zara-theme') ?? false

  if (isZaraTheme) {
    return (
      <>
        <MetadataProvider />
        <VisitorTracker />
      </>
    )
  }

  return (
    <>
      <MetadataProvider />
      <Navbar />
      <TrulloEnhanced />
      <VisitorTracker />
    </>
  )
}
