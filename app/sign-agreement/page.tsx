'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SignAgreementPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    propertyBudget: '',
    propertyType: '',
    location: '',
    acceptTerms: false,
    acceptPrivacy: false,
    powerOfAttorney: false,
    timestamp: ''
  })

  const [showAgreement, setShowAgreement] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.fullName) newErrors.fullName = 'Full name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.phone) newErrors.phone = 'Phone is required'
    if (!formData.address) newErrors.address = 'Address is required'
    if (!formData.city) newErrors.city = 'City is required'
    if (!formData.country) newErrors.country = 'Country is required'
    if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms'
    if (!formData.acceptPrivacy) newErrors.acceptPrivacy = 'You must accept the privacy policy'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      alert('Please fill in all required fields')
      return
    }

    setProcessing(true)
    
    // Add timestamp
    const submissionData = {
      ...formData,
      timestamp: new Date().toISOString(),
      agreementVersion: '1.0',
      ipAddress: 'captured-server-side',
      agreementUrl: window.location.href
    }

    try {
      // Step 1: Save agreement acceptance to database
      const response = await fetch('/api/agreements/accept', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      })

      if (response.ok) {
        const data = await response.json()
        
        // Step 2: Redirect to Stripe payment
        if (process.env.NEXT_PUBLIC_STRIPE_PHASE1_URL) {
          // Add client info to Stripe URL as parameters
          const stripeUrl = new URL(process.env.NEXT_PUBLIC_STRIPE_PHASE1_URL)
          stripeUrl.searchParams.append('client_email', formData.email)
          stripeUrl.searchParams.append('client_name', formData.fullName)
          stripeUrl.searchParams.append('agreement_id', data.agreementId)
          
          window.location.href = stripeUrl.toString()
        } else {
          // Fallback if no Stripe URL
          alert('Agreement accepted! We will contact you for payment arrangements.')
        }
      } else {
        throw new Error('Failed to save agreement')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('There was an error processing your agreement. Please try again or contact us.')
      setProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-20">
      {/* Header */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-light text-center text-white">
            Sign Project Management Agreement Online
          </h1>
          <p className="text-center text-emerald-100 mt-4">
            Complete the form below to accept terms and proceed with payment
          </p>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
            <span className="ml-3 text-sm font-medium">Your Details</span>
          </div>
          <div className="flex-1 mx-4 h-1 bg-gray-300"></div>
          <div className="flex items-center">
            <div className={`w-10 h-10 ${formData.acceptTerms ? 'bg-emerald-600' : 'bg-gray-300'} text-white rounded-full flex items-center justify-center font-bold`}>2</div>
            <span className="ml-3 text-sm font-medium">Accept Terms</span>
          </div>
          <div className="flex-1 mx-4 h-1 bg-gray-300"></div>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-300 text-white rounded-full flex items-center justify-center font-bold">3</div>
            <span className="ml-3 text-sm font-medium">Payment</span>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            
            {/* Company Info */}
            <div className="mb-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                This agreement is with <strong>1402 CELSIUS LTD</strong>, Company Registration No: 12475013, 
                VAT No: GB 343 1702 32, registered at 20-22 Wenlock Road, N1 7GU, London, United Kingdom.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Personal Information */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Your Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Country *</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">Full Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Street address"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Property Requirements */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Property Requirements (Optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Budget Range</label>
                    <select
                      name="propertyBudget"
                      value={formData.propertyBudget}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="">Select budget</option>
                      <option value="under-200k">Under €200,000</option>
                      <option value="200-500k">€200,000 - €500,000</option>
                      <option value="500k-1m">€500,000 - €1,000,000</option>
                      <option value="over-1m">Over €1,000,000</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Property Type</label>
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="">Select type</option>
                      <option value="trullo">Trullo</option>
                      <option value="masseria">Masseria</option>
                      <option value="villa">Villa</option>
                      <option value="apartment">Apartment</option>
                      <option value="commercial">Commercial</option>
                      <option value="land">Land</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Preferred Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., Ostuni, Monopoli"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Terms Acceptance */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Terms & Conditions</h3>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-4 max-h-60 overflow-y-auto text-sm">
                  <p className="font-semibold mb-2">Key Terms Summary:</p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Service Provider: 1402 CELSIUS LTD (UK Company)</li>
                    <li>Services: Project coordination for property search, negotiation, and grant applications</li>
                    <li>Phase 1.1 Fee: €1,500 (Property Search & Planning)</li>
                    <li>Total Project: €12,500 fixed + performance fees</li>
                    <li>Governing Law: England and Wales</li>
                    <li>Dispute Resolution: CEDR mediation, LCIA arbitration</li>
                    <li>Confidentiality: All information protected under UK GDPR</li>
                    <li>Service Provider acts as coordinator, not direct service performer</li>
                  </ul>
                  
                  <button
                    type="button"
                    onClick={() => setShowAgreement(!showAgreement)}
                    className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                  >
                    {showAgreement ? 'Hide' : 'View'} Full Agreement →
                  </button>
                </div>

                {showAgreement && (
                  <div className="bg-white border border-gray-300 rounded-lg p-4 mb-4 max-h-96 overflow-y-auto">
                    <iframe 
                      src="/project-agreement" 
                      className="w-full h-96 border-0"
                      title="Full Agreement"
                    />
                    <Link 
                      href="/project-agreement" 
                      target="_blank"
                      className="inline-block mt-4 text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                    >
                      Open in new tab →
                    </Link>
                  </div>
                )}

                <div className="space-y-4">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleInputChange}
                      className="mt-1 mr-3"
                      required
                    />
                    <span className="text-sm">
                      <span className="font-medium">I accept the Project Management Agreement terms and conditions *</span>
                      <br />
                      I understand and agree to all terms, including the fee structure, service scope, and that 1402 CELSIUS LTD 
                      acts as a project coordinator under English law.
                    </span>
                  </label>

                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="acceptPrivacy"
                      checked={formData.acceptPrivacy}
                      onChange={handleInputChange}
                      className="mt-1 mr-3"
                      required
                    />
                    <span className="text-sm">
                      <span className="font-medium">I accept the Privacy Policy and GDPR terms *</span>
                      <br />
                      I consent to the processing of my personal data in accordance with UK GDPR regulations.
                    </span>
                  </label>

                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="powerOfAttorney"
                      checked={formData.powerOfAttorney}
                      onChange={handleInputChange}
                      className="mt-1 mr-3"
                    />
                    <span className="text-sm">
                      <span className="font-medium">I may require Power of Attorney services</span>
                      <br />
                      I understand that POA may be needed for Italian transactions and can be arranged separately.
                    </span>
                  </label>
                </div>
              </div>

              {/* Digital Signature */}
              <div className="mb-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Digital Signature</h3>
                <p className="text-sm text-gray-700 mb-4">
                  By typing your name below and submitting this form, you are providing a digital signature 
                  that is legally binding under the Electronic Communications Act 2000 (UK).
                </p>
                <div>
                  <label className="block text-sm font-medium mb-1">Type your full name to sign *</label>
                  <input
                    type="text"
                    placeholder="Type exactly as entered above"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    onChange={(e) => {
                      if (e.target.value === formData.fullName) {
                        e.target.classList.add('bg-green-50', 'border-green-500')
                      } else {
                        e.target.classList.remove('bg-green-50', 'border-green-500')
                      }
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Signature date: {new Date().toLocaleDateString()} | IP will be recorded
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={processing}
                  className={`px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 ${
                    processing 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg'
                  }`}
                >
                  {processing ? (
                    <span>Processing...</span>
                  ) : (
                    <span>Accept Agreement & Proceed to Payment (€1,500) →</span>
                  )}
                </button>
                
                <p className="text-xs text-gray-500 mt-4">
                  You will be redirected to Stripe for secure payment processing
                </p>
              </div>
            </form>

            {/* Security Notice */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                </svg>
                <div className="text-xs text-gray-600">
                  <strong>Secure & Legal:</strong> This digital acceptance is legally binding. Your data is encrypted and processed 
                  in accordance with UK GDPR. Payment is processed securely through Stripe.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}