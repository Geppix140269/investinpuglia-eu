'use client'

import { useState } from 'react'
import { Phone, MessageSquare, Lock, Check, AlertCircle, Loader2 } from 'lucide-react'
import ConfidentialityAgreement from './ConfidentialityAgreement'

interface OTPVerificationProps {
  onVerificationSuccess: (userData?: { fullName: string; email: string; phoneNumber: string }) => void
  title?: string
  subtitle?: string
  requireUserInfo?: boolean
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
  subtitle = "Enter your phone number to receive confidential access code via SMS",
  requireUserInfo = false
}: OTPVerificationProps) {
  const [step, setStep] = useState<'userInfo' | 'phone' | 'agreement' | 'otp'>(requireUserInfo ? 'userInfo' : 'phone')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
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
          if (requireUserInfo) {
            onVerificationSuccess({ fullName, email, phoneNumber: phoneNumber.replace(/\s/g, '') })
          } else {
            onVerificationSuccess()
          }
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

  const handleUserInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName.trim() || !email.trim()) {
      setError('Please fill in all required fields')
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    setError('')
    setStep('phone')
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

        {step === 'userInfo' && (
          <form onSubmit={handleUserInfoSubmit}>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                You'll receive a confidentiality confirmation at this email
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={!fullName.trim() || !email.trim()}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Continue to Verification
              <Check className="w-4 h-4" />
            </button>
          </form>
        )}

        {step === 'phone' && (
          <form onSubmit={handlePhoneSubmit}>
            <div className="mb-6">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="flex gap-2">
                <select
                  value={phoneNumber.startsWith('+') ? phoneNumber.split(' ')[0] : '+39'}
                  onChange={(e) => {
                    const newCode = e.target.value
                    const numberWithoutCode = phoneNumber.replace(/^\+\d+\s*/, '')
                    setPhoneNumber(newCode + (numberWithoutCode ? ' ' + numberWithoutCode : ''))
                  }}
                  className="w-32 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="+39">🇮🇹 +39</option>
                  <option value="+31">🇳🇱 +31</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+49">🇩🇪 +49</option>
                  <option value="+33">🇫🇷 +33</option>
                  <option value="+34">🇪🇸 +34</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+41">🇨🇭 +41</option>
                  <option value="+43">🇦🇹 +43</option>
                  <option value="+32">🇧🇪 +32</option>
                  <option value="+45">🇩🇰 +45</option>
                  <option value="+46">🇸🇪 +46</option>
                  <option value="+47">🇳🇴 +47</option>
                  <option value="+351">🇵🇹 +351</option>
                  <option value="+30">🇬🇷 +30</option>
                  <option value="+971">🇦🇪 +971</option>
                  <option value="+966">🇸🇦 +966</option>
                  <option value="+86">🇨🇳 +86</option>
                  <option value="+81">🇯🇵 +81</option>
                  <option value="+61">🇦🇺 +61</option>
                </select>
                <div className="relative flex-1">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    value={phoneNumber.replace(/^\+\d+\s*/, '')}
                    onChange={(e) => {
                      const code = phoneNumber.startsWith('+') ? phoneNumber.split(' ')[0] : '+39'
                      const numbers = e.target.value.replace(/\D/g, '')
                      setPhoneNumber(code + (numbers ? ' ' + numbers : ''))
                    }}
                    placeholder="333 123 4567"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    required
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Select your country code and enter your phone number
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