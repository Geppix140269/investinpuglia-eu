'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CalculatorRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/property-calculator')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting to Property Calculator...</h1>
        <p>If you are not redirected automatically, <a href="/property-calculator" className="text-blue-600 hover:text-blue-800">click here</a>.</p>
      </div>
    </div>
  )
}