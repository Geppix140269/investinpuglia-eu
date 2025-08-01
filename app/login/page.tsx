// app/login/page.tsx
'use client'

import { useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle, ArrowLeft } from 'lucide-react'

export default function LoginPage() {
  const { user, loading, signInWithGoogle, error } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If already logged in, redirect to intended destination or dashboard
    if (user && !loading) {
      const redirectTo = sessionStorage.getItem('redirectAfterLogin') || '/dashboard'
      sessionStorage.removeItem('redirectAfterLogin')
      router.push(redirectTo)
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-amber-50 to-white flex flex-col">
      {/* Header */}
      <header className="w-full p-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Logo/Brand */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="text-4xl">🇮🇹</span>
                <h1 className="text-3xl font-bold text-gray-900">InvestinPuglia</h1>
              </div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to access your account and exclusive features</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            {/* Login Options */}
            <div className="space-y-4">
              <button
                onClick={signInWithGoogle}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              {/* Future login methods can be added here */}
              {/* <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Continue with Email
              </button> */}
            </div>

            {/* Benefits */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Why create an account?</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Save and manage your property searches
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Create detailed buyer profiles
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Access investment calculators
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Connect with local partners and agencies
                </li>
              </ul>
            </div>

            {/* Privacy Note */}
            <p className="mt-6 text-xs text-center text-gray-500">
              By signing in, you agree to our{' '}
              <Link href="/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
