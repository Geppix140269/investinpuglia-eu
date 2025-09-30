'use client'

import { useState, useEffect } from 'react'
import OTPVerification from '@/components/auth/OTPVerification'
import SecureDocumentViewer from '@/components/documents/SecureDocumentViewer'

export default function InvestmentMemorandumPage() {
  const [isVerified, setIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [sendingEmail, setSendingEmail] = useState(false)

  const document = {
    id: 'investment-memorandum',
    title: 'Investment Memorandum',
    description: 'Confidential investment memorandum and opportunity overview',
    url: 'https://investment-memorandum-hovxs08.gamma.site/',
    contentType: 'gamma' as const
  }

  useEffect(() => {
    // Check if user has already verified (session storage)
    const hasAccess = sessionStorage.getItem(`document-access-${document.id}`)
    if (hasAccess) {
      const accessData = JSON.parse(hasAccess)
      if (accessData.expiresAt > Date.now()) {
        setIsVerified(true)
      } else {
        sessionStorage.removeItem(`document-access-${document.id}`)
      }
    }
    setIsLoading(false)
  }, [])

  const handleVerificationSuccess = async (userData?: { fullName: string; email: string; phoneNumber: string }) => {
    // Store access in session storage (24 hour expiry)
    const accessData = {
      verified: true,
      verifiedAt: Date.now(),
      expiresAt: Date.now() + (24 * 60 * 60 * 1000),
      documentId: document.id,
      userData
    }
    sessionStorage.setItem(`document-access-${document.id}`, JSON.stringify(accessData))

    // Send confirmation email if user data provided
    if (userData) {
      setSendingEmail(true)
      try {
        await fetch('/api/documents/confirm-access', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: userData.fullName,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
            documentTitle: document.title,
            documentId: document.id
          })
        })
      } catch (error) {
        console.error('Failed to send confirmation email:', error)
      } finally {
        setSendingEmail(false)
      }
    }

    setIsVerified(true)
  }

  // Show loading state
  if (isLoading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-700 rounded-lg w-64 mx-auto mb-4"></div>
            <div className="h-12 bg-slate-700 rounded-lg w-96 mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  // Show OTP verification if not verified
  if (!isVerified) {
    return (
      <OTPVerification
        onVerificationSuccess={handleVerificationSuccess}
        title="Access Investment Memorandum"
        subtitle="Verification required to view confidential investment information"
        requireUserInfo={true}
      />
    )
  }

  // Show loading state while sending email
  if (sendingEmail) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-lg">Sending confidentiality confirmation...</p>
        </div>
      </section>
    )
  }

  // Show secure document viewer
  return (
    <SecureDocumentViewer
      documentUrl={document.url}
      documentTitle={document.title}
      documentDescription={document.description}
      contentType={document.contentType}
    />
  )
}