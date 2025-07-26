'use client'

import React, { useState, useEffect } from 'react'
import { ChevronRight, ChevronLeft, CheckCircle, Send, Download, X } from 'lucide-react'

// Google Login Button Component
const GoogleLoginButton = () => {
  const handleGoogleLogin = async () => {
    if (typeof window !== 'undefined' && window.supabase) {
      const { error } = await window.supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) console.error('Error:', error)
    }
  }

  return (
    <button
      onClick={handleGoogleLogin}
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
  )
}

const BuyerProfilePage = () => {
  // Auth state
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  
  // Form state
  const [currentStep, setCurrentStep] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [recipientType, setRecipientType] = useState('agency')
  const [customRecipients, setCustomRecipients] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  
  const recipientOptions = {
    agency: {
      label: 'Partner Agencies',
      emails: ['agencies@investinpuglia.eu', 'partners@investinpuglia.eu']
    },
    internal: {
      label: 'Internal Team',
      emails: ['team@investinpuglia.eu', 'sales@investinpuglia.eu']
    },
    custom: {
      label: 'Custom Recipients',
      emails: []
    }
  }
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    nationality: '',
    residency: '',
    investmentPurpose: '',
    propertyType: '',
    budget: '',
    timeline: '',
    location: [],
    propertySize: '',
    bedrooms: '',
    amenities: [],
    financingMethod: '',
    downPaymentPercentage: '',
    preApproved: '',
    monthlyBudget: '',
    previousInvestments: '',
    italianPropertyExperience: '',
    languageSkills: '',
    needsAssistance: [],
    taxId: '',
    needsTaxId: '',
    legalRepresentation: '',
    powerOfAttorney: '',
    propertyManagement: '',
    rentalStrategy: '',
    maintenanceBudget: '',
    localContacts: '',
    propertyInspection: '',
    legalReview: '',
    surveyRequired: '',
    insuranceNeeds: [],
    businessPlan: '',
    employmentCreation: '',
    sustainabilityFeatures: [],
    grantInterest: '',
    additionalServices: [],
    urgency: '',
    specialRequests: '',
    howHeard: ''
  })

  // Initialize EmailJS and check auth
  useEffect(() => {
    if (typeof window !== 'undefined' && window.emailjs) {
      window.emailjs.init('wKn1_xMCtZssdZzpb')
    }
    checkUser()
  }, [])

  async function checkUser() {
    if (typeof window !== 'undefined' && window.supabase) {
      const { data: { user } } = await window.supabase.auth.getUser()
      setUser(user)
      if (user) {
        setFormData(prev => ({ ...prev, email: user.email || '' }))
      }
    }
    setAuthLoading(false)
  }

  // Show login if not authenticated
  if (!authLoading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-amber-50 to-white">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In Required</h1>
            <p className="text-gray-600">Please sign in to create your buyer profile</p>
          </div>
          <GoogleLoginButton />
        </div>
      </div>
    )
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const totalSteps = 10

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleCheckboxChange = (field, value, checked) => {
    const currentValues = formData[field]
    if (checked) {
      updateFormData(field, [...currentValues, value])
    } else {
      updateFormData(field, currentValues.filter(item => item !== value))
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowModal(true)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const formatValue = (value) => {
    if (!value) return 'Not specified'
    return value.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  const handleSendEmail = async () => {
    setIsProcessing(true)
    try {
      // Save to database if user is logged in
      if (user && window.supabase) {
        await window.supabase
          .from('buyer_profiles')
          .upsert({
            user_id: user.id,
            ...formData,
            profile_completed: true,
            updated_at: new Date().toISOString(),
          })
      }

      // Determine recipients
      let recipients = []
      if (recipientType === 'custom') {
        recipients = customRecipients.split(',').map(email => email.trim()).filter(email => email.includes('@'))
      } else {
        recipients = recipientOptions[recipientType].emails
      }

      if (recipients.length === 0) {
        alert('Please select or enter at least one recipient email address')
        setIsProcessing(false)
        return
      }

      // Send email
      if (window.emailjs) {
        const templateParams = {
          to_email: recipients[0],
          cc_email: recipients.slice(1).join(','),
          reply_to: formData.email,
          buyer_name: formData.fullName,
          buyer_email: formData.email,
          buyer_phone: formData.phone,
          property_type: formData.propertyType,
          budget: formData.budget,
          timeline: formData.timeline,
          locations: formData.location.join(', ')
        }
        
        await window.emailjs.send('service_w6tghqr', 'template_buyer_profile', templateParams)
      }
      
      setEmailSent(true)
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to send email. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownloadPDF = () => {
    const content = `BUYER PROFILE - INVEST IN PUGLIA
Generated: ${new Date().toLocaleDateString()}

PERSONAL INFORMATION
Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Nationality: ${formData.nationality}
Residency: ${formData.residency}

INVESTMENT DETAILS
Purpose: ${formatValue(formData.investmentPurpose)}
Property Type: ${formatValue(formData.propertyType)}
Budget: ${formData.budget}
Timeline: ${formData.timeline}

PROPERTY PREFERENCES
Locations: ${formData.location.join(', ') || 'Not specified'}
Size: ${formData.propertySize || 'Not specified'}
Bedrooms: ${formData.bedrooms || 'Not specified'}
Amenities: ${formData.amenities.join(', ') || 'None'}

FINANCIAL INFORMATION
Financing: ${formatValue(formData.financingMethod)}
Down Payment: ${formData.downPaymentPercentage || 'Not specified'}
Pre-approved: ${formatValue(formData.preApproved)}
Monthly Budget: ${formData.monthlyBudget || 'Not specified'}`

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `buyer-profile-${formData.fullName.replace(/\s+/g, '-')}-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-900">Personal Information</h2>
            <p className="text-gray-600">Let's start with some basic information about you.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => updateFormData('fullName', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="john@example.com"
                  disabled={!!user}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="+1 234 567 8900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nationality *</label>
                <input
                  type="text"
                  value={formData.nationality}
                  onChange={(e) => updateFormData('nationality', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., American, British, Canadian"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country of Residency *</label>
                <input
                  type="text"
                  value={formData.residency}
                  onChange={(e) => updateFormData('residency', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., United States, United Kingdom"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-900">Investment Goals</h2>
            <p className="text-gray-600">Help us understand your investment objectives.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Purpose *</label>
                <select
                  value={formData.investmentPurpose}
                  onChange={(e) => updateFormData('investmentPurpose', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select purpose</option>
                  <option value="vacation-home">Vacation Home</option>
                  <option value="rental-income">Rental Income</option>
                  <option value="retirement">Retirement Home</option>
                  <option value="business">Business/Tourism</option>
                  <option value="mixed-use">Mixed Use</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Type *</label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => updateFormData('propertyType', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select type</option>
                  <option value="trullo">Trullo</option>
                  <option value="masseria">Masseria</option>
                  <option value="villa">Villa</option>
                  <option value="apartment">Apartment</option>
                  <option value="palazzo">Palazzo</option>
                  <option value="land">Land/Development</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget *</label>
                <select
                  value={formData.budget}
                  onChange={(e) => updateFormData('budget', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select budget</option>
                  <option value="0-250k">€0 - €250,000</option>
                  <option value="250k-500k">€250,000 - €500,000</option>
                  <option value="500k-1m">€500,000 - €1,000,000</option>
                  <option value="1m-2m">€1,000,000 - €2,000,000</option>
                  <option value="2m+">€2,000,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Timeline *</label>
                <select
                  value={formData.timeline}
                  onChange={(e) => updateFormData('timeline', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select timeline</option>
                  <option value="0-3">0-3 months</option>
                  <option value="3-6">3-6 months</option>
                  <option value="6-12">6-12 months</option>
                  <option value="12+">12+ months</option>
                </select>
              </div>
            </div>
          </div>
        )

      // Steps 3-10 continue with similar pattern...
      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">Step {currentStep} content - Coming soon!</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-amber-50 to-white">
      {/* Header */}
      <header className="fixed w-full top-0 z-20 bg-white/70 backdrop-blur-md border-b border-gray-200/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-2xl">🇮🇹</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">investinpuglia.eu</h1>
                <p className="text-sm text-gray-600">Your Profile</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-gray-500 text-sm">{user?.email}</p>
              {user && (
                <button
                  onClick={() => window.supabase?.auth.signOut()}
                  className="text-sm text-red-600 hover:underline"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-20">
        {/* Progress Bar */}
        <div className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-20 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-gray-600">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>

              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
              >
                {currentStep === totalSteps ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Generate Email & PDF
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Email Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-blue-900">Email & PDF Preview</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              {!emailSent ? (
                <>
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-4">Select Recipients</h4>
                    
                    <div className="space-y-4">
                      {Object.entries(recipientOptions).map(([key, value]) => (
                        <label key={key} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-blue-50">
                          <input
                            type="radio"
                            name="recipientType"
                            value={key}
                            checked={recipientType === key}
                            onChange={(e) => setRecipientType(e.target.value)}
                            className="mr-3"
                          />
                          <div>
                            <p className="font-medium">{value.label}</p>
                            {key === 'custom' && recipientType === 'custom' && (
                              <input
                                type="text"
                                value={customRecipients}
                                onChange={(e) => setCustomRecipients(e.target.value)}
                                placeholder="email1@example.com, email2@example.com"
                                className="mt-2 w-full px-3 py-2 border rounded-md text-sm"
                                onClick={(e) => e.stopPropagation()}
                              />
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      onClick={handleSendEmail}
                      disabled={isProcessing}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-medium"
                    >
                      <Send className="w-5 h-5" />
                      {isProcessing ? 'Sending...' : 'Send Email'}
                    </button>
                    <button
                      onClick={handleDownloadPDF}
                      className="flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-full font-medium"
                    >
                      <Download className="w-5 h-5" />
                      Download PDF
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-700 mb-2">Profile Sent Successfully!</h3>
                  <p className="text-gray-600">
                    The buyer profile has been sent to the selected recipients.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BuyerProfilePage
