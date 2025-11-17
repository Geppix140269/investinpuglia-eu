// app/zara-theme/layout.tsx
'use client'

import { useEffect, useState } from 'react'

// Disable SSR completely
export const dynamic = 'force-dynamic'

export default function ZaraThemeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [Navbar, setNavbar] = useState<any>(null)
  const [Footer, setFooter] = useState<any>(null)

  useEffect(() => {
    // Load components only on client side
    import('@/components/NavbarInvestmentTheme').then(mod => {
      setNavbar(() => mod.default)
    })
    import('@/components/FooterInvestmentTheme').then(mod => {
      setFooter(() => mod.default)
    })
  }, [])

  // Return just children during load
  if (!Navbar || !Footer) {
    return <>{children}</>
  }

  // Investment theme layout with custom navbar and footer
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
