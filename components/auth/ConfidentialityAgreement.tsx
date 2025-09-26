'use client'

import { useState } from 'react'
import { FileText, Shield, Phone, CheckCircle, AlertTriangle, Scroll, Lock } from 'lucide-react'

interface ConfidentialityAgreementProps {
  phoneNumber: string
  onAgreementSigned: (signatureData: SignatureData) => void
  onBack: () => void
}

interface SignatureData {
  phoneNumber: string
  ipAddress?: string
  timestamp: string
  userAgent?: string
  consentGiven: boolean
  agreementVersion: string
}

export default function ConfidentialityAgreement({
  phoneNumber,
  onAgreementSigned,
  onBack
}: ConfidentialityAgreementProps) {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [loading, setLoading] = useState(false)

  const agreementText = `
CONFIDENTIALITY AND NON-DISCLOSURE AGREEMENT
For Exclusive Historic Property Information

EFFECTIVE DATE: ${new Date().toLocaleDateString('en-GB')}
AGREEMENT VERSION: 1.0
DIGITAL SIGNATURE: ${phoneNumber}

PARTIES:
This Confidentiality Agreement ("Agreement") is entered into between:

DISCLOSER: InvestInPuglia.eu, a company operating under Italian law, with registered office in Italy ("Company")

RECIPIENT: The individual accessing this information via mobile number ${phoneNumber} ("Recipient")

RECITALS:
WHEREAS, Company owns exclusive marketing rights and detailed information regarding a historic 16th-century noble palazzo located in Southern Italy ("Property");

WHEREAS, the Property information includes but is not limited to: pricing, architectural details, investment projections, renovation plans, historical documentation, financial models, and strategic positioning ("Confidential Information");

WHEREAS, Recipient desires to access such Confidential Information for potential investment purposes;

NOW, THEREFORE, in consideration of the mutual covenants contained herein, the parties agree as follows:

1. CONFIDENTIAL INFORMATION DEFINITION
Confidential Information includes all data, documents, specifications, know-how, processes, designs, sketches, photographs, plans, drawings, and other information disclosed by Company, whether orally, visually, or in written or electronic form, concerning the Property.

2. NON-DISCLOSURE OBLIGATIONS
Recipient agrees to:
a) Hold all Confidential Information in strict confidence
b) Not disclose, reveal, or make accessible any Confidential Information to third parties
c) Not use Confidential Information for any purpose other than evaluating potential investment
d) Not reproduce, copy, or create derivative works from the Confidential Information
e) Not share property details on social media, professional networks, or public forums

3. DIGITAL SIGNATURE VALIDITY
By providing mobile number ${phoneNumber} and confirming receipt of SMS verification code, Recipient acknowledges:
a) This constitutes a legally binding digital signature under EU eIDAS Regulation
b) The mobile number serves as unique identifier for this Agreement
c) SMS verification confirms identity and intent to be bound by these terms
d) This method of signature has same legal effect as handwritten signature

4. LEGAL COMPLIANCE
This Agreement complies with:
a) EU eIDAS Regulation (EU) No 910/2014 on electronic signatures
b) Italian Digital Code (CAD) - Legislative Decree 82/2005
c) EU General Data Protection Regulation (GDPR)
d) Italian Privacy Code (Legislative Decree 196/2003)

5. DURATION AND TERMINATION
This Agreement remains in effect for 5 (five) years from the date of digital signature, unless terminated earlier by written notice from Company.

6. REMEDIES
Recipient acknowledges that breach of this Agreement would cause irreparable harm to Company. Company shall be entitled to:
a) Injunctive relief to prevent disclosure
b) Monetary damages including lost profits
c) Legal fees and costs of enforcement
d) Any other remedies available at law or equity

7. RETURN OF MATERIALS
Upon termination or upon Company's request, Recipient shall immediately return or destroy all materials containing Confidential Information.

8. GOVERNING LAW
This Agreement shall be governed by the laws of Italy. Any disputes shall be resolved in the courts of Lecce, Italy.

9. SEVERABILITY
If any provision is deemed unenforceable, the remainder of the Agreement shall remain in full force and effect.

10. ENTIRE AGREEMENT
This Agreement constitutes the entire agreement between the parties regarding confidentiality of the Property information.

BY DIGITALLY SIGNING BELOW VIA SMS VERIFICATION, RECIPIENT ACKNOWLEDGES HAVING READ, UNDERSTOOD, AND AGREED TO BE BOUND BY ALL TERMS OF THIS AGREEMENT.

DIGITAL SIGNATURE CONFIRMATION:
- Mobile Number: ${phoneNumber}
- IP Address: [To be recorded upon signature]
- Timestamp: [To be recorded upon signature]
- Browser/Device: [To be recorded upon signature]
- Agreement Version: 1.0
- Consent Method: SMS-verified digital signature

LEGAL NOTICE: This is a legally binding agreement. Your mobile number ${phoneNumber} serves as your digital signature. SMS verification confirms your identity and intention to be legally bound by these confidentiality terms.
  `

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    const scrolledPercentage = (scrollTop + clientHeight) / scrollHeight

    if (scrolledPercentage >= 0.95 && !hasScrolledToBottom) {
      setHasScrolledToBottom(true)
    }
  }

  const handleSignAgreement = async () => {
    if (!acceptedTerms || !hasScrolledToBottom) return

    setLoading(true)

    try {
      // Get client information for legal compliance
      const clientInfo = {
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language
      }

      // Get IP address (you'd need to implement this API endpoint)
      let ipAddress = ''
      try {
        const ipResponse = await fetch('/api/get-client-ip')
        const ipData = await ipResponse.json()
        ipAddress = ipData.ip || ''
      } catch (err) {
        console.warn('Could not retrieve IP address')
      }

      const signatureData: SignatureData = {
        phoneNumber,
        ipAddress,
        timestamp: clientInfo.timestamp,
        userAgent: clientInfo.userAgent,
        consentGiven: true,
        agreementVersion: '1.0'
      }

      // Store the signed agreement
      const response = await fetch('/api/palazzo-robertini/sign-agreement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...signatureData,
          ...clientInfo,
          agreementText,
          fullConsent: {
            termsAccepted: acceptedTerms,
            documentRead: hasScrolledToBottom,
            signatureMethod: 'SMS-verified mobile number',
            legalBasis: 'EU eIDAS Regulation compliance'
          }
        })
      })

      if (response.ok) {
        onAgreementSigned(signatureData)
      } else {
        throw new Error('Failed to record agreement')
      }

    } catch (error) {
      console.error('Error signing agreement:', error)
      alert('Error recording agreement. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">Confidentiality Agreement</h2>
            <p className="text-gray-600">Required for exclusive property access</p>
          </div>
          <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
            <Phone className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">{phoneNumber}</span>
          </div>
        </div>

        {/* Agreement Content */}
        <div
          className="flex-1 p-6 overflow-y-auto text-sm leading-relaxed"
          onScroll={handleScroll}
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className="prose prose-sm max-w-none">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold text-yellow-800">Legal Notice</span>
              </div>
              <p className="text-yellow-700">
                This is a legally binding confidentiality agreement. Your mobile number will serve as your digital signature under EU eIDAS regulation.
              </p>
            </div>

            <div className="whitespace-pre-line font-mono text-xs leading-6 bg-gray-50 p-6 rounded-lg border">
              {agreementText}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        {!hasScrolledToBottom && (
          <div className="px-6 py-2 bg-yellow-50 border-t border-yellow-200">
            <div className="flex items-center gap-2 text-yellow-700">
              <Scroll className="w-4 h-4" />
              <span className="text-sm">Please scroll down to read the complete agreement</span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="mb-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                disabled={!hasScrolledToBottom}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className={`text-sm ${!hasScrolledToBottom ? 'text-gray-400' : 'text-gray-700'}`}>
                I have read and understood the complete confidentiality agreement above.
                I agree to be legally bound by these terms and acknowledge that my mobile number
                <strong className="text-blue-600"> {phoneNumber} </strong>
                serves as my digital signature under EU eIDAS regulation.
              </span>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onBack}
              disabled={loading}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50"
            >
              ← Back to verification
            </button>

            <button
              onClick={handleSignAgreement}
              disabled={!acceptedTerms || !hasScrolledToBottom || loading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing Agreement...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Sign Agreement Digitally
                </>
              )}
            </button>
          </div>

          <div className="mt-4 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <Shield className="w-3 h-3" />
              <span>Compliant with EU eIDAS Regulation & Italian Digital Code</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}