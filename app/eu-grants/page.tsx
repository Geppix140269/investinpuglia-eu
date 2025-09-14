'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function EuGrantsRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/mini-pia-guide')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting to Mini PIA Guide...</h1>
        <p>If you are not redirected automatically, <a href="/mini-pia-guide" className="text-blue-600 hover:text-blue-800">click here</a>.</p>
      </div>
    </div>
  )
}