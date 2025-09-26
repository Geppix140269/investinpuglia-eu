'use client'

import { useState } from 'react'
import { Phone, MessageSquare, Lock, Check, AlertCircle, Loader2 } from 'lucide-react'
import ConfidentialityAgreement from './ConfidentialityAgreement'

interface OTPVerificationProps {
  onVerificationSuccess: () => void
  title?: string
  subtitle?: string
}

interface SignatureData {
  phoneNumber: string
  ipAddress?: string
  timestamp: string
  userAgent?: string
  consentGiven: boolean
  agreementVersion: string
}

export default function OTPVerification({
  onVerificationSuccess,
  title = "Access Exclusive Historic Property",
  subtitle = "Enter your phone number to receive confidential access code via SMS"
}: OTPVerificationProps) {
  const [step, setStep] = useState<'phone' | 'agreement' | 'otp'>('phone')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [timeLeft, setTimeLeft] = useState(0)

  const formatPhoneNumber = (value: string) => {
    // Remove non-digits
    const cleaned = value.replace(/\D/g, '')

    // Format based on common patterns
    if (cleaned.startsWith('39')) {
      // Italian number
      return '+' + cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4')
    } else if (cleaned.startsWith('44')) {
      // UK number
      return '+' + cleaned.replace(/(\d{2})(\d{4})(\d{6})/, '$1 $2 $3')
    } else if (cleaned.startsWith('3')) {
      // Italian mobile without country code
      return '+39 ' + cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')
    } else if (cleaned.startsWith('7')) {
      // UK mobile without country code
      return '+44 ' + cleaned.replace(/(\d{4})(\d{6})/, '$1 $2')
    }

    return value
  }

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!phoneNumber.trim()) return

    setLoading(true)
    setError('')

    try {
      // First check if user already has a signed agreement
      const checkResponse = await fetch(
        `/api/palazzo-robertini/sign-agreement?phone=${encodeURIComponent(phoneNumber.replace(/\s/g, ''))}`
      )

      if (checkResponse.ok) {
        const agreementData = await checkResponse.json()
        if (agreementData.signed && agreementData.legallyBinding && !agreementData.expired) {
          // User already has valid agreement, skip to OTP
          setStep('otp')
          await sendOTP()
          return
        }
      }

      // User needs to sign agreement first
      setStep('agreement')

    } catch (err) {
      // If check fails, proceed to agreement step
      setStep('agreement')
    } finally {
      setLoading(false)
    }
  }

  const sendOTP = async () => {
    try {
      const response = await fetch('/api/palazzo-robertini/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: phoneNumber.replace(/\s/g, '') })
      })

      const result = await response.json()

      if (response.ok) {
        setSuccess('OTP sent successfully!')
        // Start countdown
        setTimeLeft(300) // 5 minutes
        const timer = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              clearInterval(timer)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      } else {
        setError(result.message || 'Failed to send OTP')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    }
  }

  const handleAgreementSigned = async (signatureData: SignatureData) => {
    // Agreement is signed, now proceed to OTP step
    setStep('otp')
    setSuccess('Agreement signed! Sending verification code...')
    await sendOTP()
  }

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp.trim() || otp.length !== 6) {
      setError('Please enter a valid 6-digit code')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/palazzo-robertini/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: phoneNumber.replace(/\s/g, ''),
          otp: otp.trim()
        })
      })

      const result = await response.json()

      if (response.ok) {
        setSuccess('Access granted!')
        setTimeout(() => {
          onVerificationSuccess()
        }, 1000)
      } else {
        setError(result.message || 'Invalid or expired OTP')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleResendOTP = async () => {
    if (timeLeft > 240) return // Only allow resend after 1 minute

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/palazzo-robertini/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: phoneNumber.replace(/\s/g, '') })
      })

      const result = await response.json()

      if (response.ok) {
        setSuccess('New OTP sent!')
        setTimeLeft(300)
      } else {
        setError(result.message || 'Failed to send OTP')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Show confidentiality agreement if on that step
  if (step === 'agreement') {
    return (
      <ConfidentialityAgreement
        phoneNumber={phoneNumber}
        onAgreementSigned={handleAgreementSigned}
        onBack={() => setStep('phone')}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
            <Lock className="w-8 h-8 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600">{subtitle}</p>
        </div>

        {step === 'phone' && (
          <form onSubmit={handlePhoneSubmit}>
            <div className="mb-6">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                  placeholder="+39 333 123 4567"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Enter your phone number with country code
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-sm text-green-700">{success}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !phoneNumber.trim()}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <MessageSquare className="w-4 h-4" />
                  Send Access Code
                </>
              )}
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleOTPSubmit}>
            <div className="mb-6">
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                6-Digit Access Code
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="123456"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-center text-2xl font-mono tracking-widest"
                maxLength={6}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Sent to {phoneNumber}
                {timeLeft > 0 && (
                  <span className="ml-2 text-amber-600">
                    Expires in {formatTime(timeLeft)}
                  </span>
                )}
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-sm text-green-700">{success}</span>
              </div>
            )}

            <div className="space-y-3">
              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Verify Access Code
                  </>
                )}
              </button>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  ← Change phone number
                </button>

                {timeLeft < 240 && (
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={loading}
                    className="text-sm text-amber-600 hover:text-amber-700 disabled:opacity-50"
                  >
                    Resend code
                  </button>
                )}
              </div>
            </div>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-xs text-center text-gray-500">
            <Lock className="w-3 h-3 inline mx-1" />
            This exclusive property requires verification for access
          </div>
        </div>
      </div>
    </div>
  )
}