'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import OTPVerification from '@/components/auth/OTPVerification'
import SecureDocumentViewer from '@/components/documents/SecureDocumentViewer'
import { Shield, FileText, Lock } from 'lucide-react'

// Document configuration - Add your documents here
const DOCUMENTS: Record<string, {
  id: string
  title: string
  description: string
  url: string
  enabled: boolean
}> = {
  'investment-agreement-template': {
    id: 'investment-agreement-template',
    title: 'Investment Agreement Template',
    description: 'Standard investment agreement template for property investments in Puglia',
    url: 'https://res.cloudinary.com/dusubfxgo/raw/upload/v1/documents/investment-agreement.pdf',
    enabled: true
  },
  'mini-pia-guide': {
    id: 'mini-pia-guide',
    title: 'Mini PIA Complete Guide',
    description: 'Comprehensive guide to Mini PIA grants and application process',
    url: 'https://res.cloudinary.com/dusubfxgo/raw/upload/v1/documents/mini-pia-guide.pdf',
    enabled: true
  },
  'palazzo-robertini-full-report': {
    id: 'palazzo-robertini-full-report',
    title: 'Palazzo Robertini - Full Investment Report',
    description: 'Detailed investment analysis and property report for Palazzo Robertini',
    url: 'https://res.cloudinary.com/dusubfxgo/raw/upload/v1/documents/palazzo-robertini-report.pdf',
    enabled: true
  }
}

export default function ExclusiveDocumentPage() {
  const params = useParams()
  const documentId = params?.documentId as string
  const [isVerified, setIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const document = DOCUMENTS[documentId]

  useEffect(() => {
    // Check if user has already verified (session storage)
    const hasAccess = sessionStorage.getItem(`document-access-${documentId}`)
    if (hasAccess) {
      const accessData = JSON.parse(hasAccess)
      if (accessData.expiresAt > Date.now()) {
        setIsVerified(true)
      } else {
        sessionStorage.removeItem(`document-access-${documentId}`)
      }
    }
    setIsLoading(false)
  }, [documentId])

  const handleVerificationSuccess = () => {
    // Store access in session storage (24 hour expiry)
    const accessData = {
      verified: true,
      verifiedAt: Date.now(),
      expiresAt: Date.now() + (24 * 60 * 60 * 1000),
      documentId
    }
    sessionStorage.setItem(`document-access-${documentId}`, JSON.stringify(accessData))
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

  // Document not found or disabled
  if (!document || !document.enabled) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-red-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Document Not Found</h1>
            <p className="text-slate-300 mb-6">
              The document you're looking for is not available or has been removed.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-all"
            >
              Return to Homepage
            </a>
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
        title="Access Confidential Document"
        subtitle={`Verification required to view: ${document.title}`}
      />
    )
  }

  // Show secure document viewer
  return (
    <SecureDocumentViewer
      documentUrl={document.url}
      documentTitle={document.title}
      documentDescription={document.description}
    />
  )
}