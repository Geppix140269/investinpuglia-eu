// app/dashboard/page.tsx
'use client'
import { useEffect } from 'react'

export default function DashboardPage() {
  useEffect(() => {
    // Forza il redirect al calculator
    const timer = setTimeout(() => {
      window.open('https://classic.investinpuglia.eu', '_self')
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 mb-4">Redirecting to calculator...</p>
        <a 
          href="https://classic.investinpuglia.eu" 
          className="text-blue-600 underline"
        >
          Click here if not redirected
        </a>
      </div>
    </div>
  )
}
