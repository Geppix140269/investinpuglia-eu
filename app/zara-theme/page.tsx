// app/zara-theme/page.tsx
'use client'

import { useEffect, useState } from 'react'

// Disable SSR completely
export const dynamic = 'force-dynamic'

export default function ZaraThemePage() {
  const [Component, setComponent] = useState<any>(null)

  useEffect(() => {
    // Load component only on client side
    import('@/components/InvestmentTheme').then(mod => {
      setComponent(() => mod.default)
    })
  }, [])

  if (!Component) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #f8fafc, #ffffff, #fef3c7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ fontSize: '24px', color: '#1e3a8a', fontFamily: 'sans-serif' }}>
          Loading...
        </div>
      </div>
    )
  }

  return <Component />
}
