'use client'

import { useState } from 'react'
import { CheckCircle, ArrowRight, Calendar, Phone, Mail, Building, Clock, DollarSign } from 'lucide-react'

interface QuestionnaireData {
  name: string
  email: string
  phone: string
  budget: string
  timeline: string
  propertyType: string
  location: string
  businessPlan: string
  experience: string
  referralSource: string
  referenceId?: string
}

interface PreBookingQuestionnaireProps {
  onComplete?: (data: QuestionnaireData) => void
  calendlyUrl?: string
}

export default function PreBookingQuestionnaire({ 
  onComplete,
  calendlyUrl = 'https://calendly.com/investinpuglia/30min'
}: PreBookingQuestionnaireProps) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<QuestionnaireData>({
    name: '',
    email: '',
    phone: '',
    budget: '',
    timeline: '',
    propertyType: '',
    location: '',
    businessPlan: '',
    experience: '',
    referralSource: ''
  })

  const handleInputChange = (field: keyof QuestionnaireData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      // Submit to API
      const response = await fetch('/api/consultation-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'pre-booking-questionnaire',
          timestamp: new Date().toISOString()
        })
      })
      
      const result = await response.json()
      
      // Store qualification data with reference ID
      localStorage.setItem('consultation-qualification', JSON.stringify({
        ...formData,
        referenceId: result.referenceId,
        submittedAt: new Date().toISOString()
      }))
      localStorage.setItem('consultation-qualified', 'true')
      
      // Build Calendly URL with pre-filled data
      // Note: Calendly has limited support for custom fields via URL
      // The main data is already sent via email to admin
      const calendlyUrlWithData = new URL(calendlyUrl)
      calendlyUrlWithData.searchParams.append('name', formData.name)
      calendlyUrlWithData.searchParams.append('email', formData.email)
      
      // Add reference ID so admin can match booking with questionnaire
      const questionText = `REF: ${result.referenceId} | Budget: ${formData.budget} | Timeline: ${formData.timeline} | Property: ${formData.propertyType}`
      calendlyUrlWithData.searchParams.append('a1', questionText)
      
      // Show success and redirect
      alert(`✅ Thank you! Your information has been received.\n\nReference ID: ${result.referenceId}\n\nYou'll now be redirected to schedule your FREE consultation.`)
      
      // Redirect to Calendly
      window.location.href = calendlyUrlWithData.toString()
      
      if (onComplete) {
        onComplete({...formData, referenceId: result.referenceId})
      }
    } catch (error) {
      console.error('Error submitting questionnaire:', error)
      alert('There was an error submitting your information, but you can still book your consultation.')
      // Still redirect to Calendly even if submission fails
      window.location.href = calendlyUrl
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Let's Get Started</h2>
            <p className="text-gray-600">Please provide your contact information for your FREE consultation</p>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="your@email.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="+1 234 567 8900"
              />
            </div>
            
            <button
              onClick={() => setStep(2)}
              disabled={!formData.name || !formData.email}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              Continue
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        )
      
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Investment Details</h2>
            <p className="text-gray-600">Help us understand your investment goals</p>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Investment Budget Range *
              </label>
              <select
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select budget range</option>
                <option value="Under €100K">Under €100,000</option>
                <option value="€100K-€250K">€100,000 - €250,000</option>
                <option value="€250K-€500K">€250,000 - €500,000</option>
                <option value="€500K-€1M">€500,000 - €1,000,000</option>
                <option value="Over €1M">Over €1,000,000</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Investment Timeline *
              </label>
              <select
                value={formData.timeline}
                onChange={(e) => handleInputChange('timeline', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select timeline</option>
                <option value="Immediate (0-3 months)">Immediate (0-3 months)</option>
                <option value="Short-term (3-6 months)">Short-term (3-6 months)</option>
                <option value="Medium-term (6-12 months)">Medium-term (6-12 months)</option>
                <option value="Long-term (12+ months)">Long-term (12+ months)</option>
                <option value="Just exploring">Just exploring options</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Type Interest *
              </label>
              <select
                value={formData.propertyType}
                onChange={(e) => handleInputChange('propertyType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select project type</option>
                <option value="Tourism/Hospitality (Hotel/B&B/Resort)">Tourism/Hospitality (Hotel/B&B/Resort)</option>
                <option value="Industrial/Manufacturing">Industrial/Manufacturing</option>
                <option value="Commercial/Retail">Commercial/Retail</option>
                <option value="Residential Development">Residential Development</option>
                <option value="Agricultural/Agritech">Agricultural/Agritech</option>
                <option value="Technology/Innovation Hub">Technology/Innovation Hub</option>
                <option value="Mixed-use Development">Mixed-use Development</option>
                <option value="Renewable Energy Project">Renewable Energy Project</option>
                <option value="Logistics/Distribution">Logistics/Distribution</option>
                <option value="Undecided">Undecided</option>
              </select>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!formData.budget || !formData.timeline || !formData.propertyType}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                Continue
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        )
      
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Additional Information</h2>
            <p className="text-gray-600">Final details to prepare for your consultation</p>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Location in Puglia
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Bari, Lecce, or No preference"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Do you have a business plan?
              </label>
              <select
                value={formData.businessPlan}
                onChange={(e) => handleInputChange('businessPlan', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select an option</option>
                <option value="Yes, detailed">Yes, I have a detailed plan</option>
                <option value="Yes, basic">Yes, I have a basic concept</option>
                <option value="No, need help">No, I need help developing one</option>
                <option value="Not applicable">Not applicable</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Previous investment experience?
              </label>
              <select
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select experience level</option>
                <option value="First-time">First-time investor</option>
                <option value="Some experience">Some investment experience</option>
                <option value="Experienced">Experienced investor</option>
                <option value="Professional">Professional/Institutional</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How did you hear about us?
              </label>
              <select
                value={formData.referralSource}
                onChange={(e) => handleInputChange('referralSource', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select source</option>
                <option value="Google Search">Google Search</option>
                <option value="Social Media">Social Media</option>
                <option value="Referral">Referral from friend/colleague</option>
                <option value="Email Campaign">Email Campaign</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  'Processing...'
                ) : (
                  <>
                    <Calendar className="mr-2 h-5 w-5" />
                    Book FREE Consultation
                  </>
                )}
              </button>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                step >= num 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step > num ? <CheckCircle className="h-6 w-6" /> : num}
            </div>
          ))}
        </div>
        <div className="relative">
          <div className="absolute inset-0 h-2 bg-gray-200 rounded-full" />
          <div 
            className="absolute h-2 bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />
        </div>
      </div>
      
      {/* Form Content */}
      {renderStep()}
      
      {/* Trust Indicators */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-center text-sm text-gray-500">
          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
          100% FREE - No payment required
        </div>
      </div>
    </div>
  )
}