import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Completely disable SSR for this page
export const config = {
  unstable_runtimeJS: true,
}

const InvestmentTheme = dynamic(() => import('@/components/InvestmentTheme'), {
  ssr: false,
  loading: () => <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ fontSize: '24px', color: '#1e3a8a' }}>Loading Investment Theme...</div>
  </div>
})

const NavbarInvestmentTheme = dynamic(() => import('@/components/NavbarInvestmentTheme'), { ssr: false })
const FooterInvestmentTheme = dynamic(() => import('@/components/FooterInvestmentTheme'), { ssr: false })

export default function InvestmentThemePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div style={{ minHeight: '100vh', background: '#f8fafc' }} />
  }

  return (
    <>
      <NavbarInvestmentTheme />
      <InvestmentTheme />
      <FooterInvestmentTheme />
    </>
  )
}
