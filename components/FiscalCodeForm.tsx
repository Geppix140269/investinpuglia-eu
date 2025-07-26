// components/FiscalCodeForm.tsx
'use client'

import { useState } from 'react'
import { Calendar, MapPin, User, Mail, Phone, FileText, Globe, AlertCircle, Send } from 'lucide-react'

// TypeScript interfaces
interface FormData {
  name: string
  surname: string
  birth_date: string
  birth_place: string
  birth_country: string
  gender: string
  email: string
  phone: string
  passport_number: string
  current_address: string
  purpose: string
  urgency: string
}

interface FormErrors {
  [key: string]: string
}

interface SubmitStatus {
  type: 'success' | 'error'
  message: string
}

declare global {
  interface Window {
    emailjs: any
  }
}

export default function FiscalCodeForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    surname: '',
    birth_date: '',
    birth_place: '',
    birth_country: '',
    gender: '',
    email: '',
    phone: '',
    passport_number: '',
    current_address: '',
    purpose: '',
    urgency: 'standard'
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'First name is required'
    if (!formData.surname.trim()) newErrors.surname = 'Last name is required'
    if (!formData.birth_date) newErrors.birth_date = 'Date of birth is required'
    if (!formData.birth_place.trim()) newErrors.birth_place = 'Place of birth is required'
    if (!formData.birth_country.trim()) newErrors.birth_country = 'Country of birth is required'
    if (!formData.gender) newErrors.gender = 'Gender is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.passport_number.trim()) newErrors.passport_number = 'Passport number is required'
    if (!formData.purpose.trim()) newErrors.purpose = 'Purpose is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Send to your existing API endpoint
      const response = await fetch('/api/fiscal-code-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          status: 'pending',
          created_at: new Date().toISOString()
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Server error: ${response.status}`)
      }

      const data = await response.json()
      
      // Initialize EmailJS if available
      if (typeof window !== 'undefined' && window.emailjs) {
        window.emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)
        
        // Send user confirmation email using YOUR template ID
        try {
          await window.emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            process.env.NEXT_PUBLIC_EMAILJS_FISCAL_USER_TEMPLATE_ID,
            {
              to_name: formData.name,
              to_email: formData.email,
              application_id: data.reference || data.id,
              urgency: formData.urgency === 'urgent' ? '24 hours' : 
                      formData.urgency === 'express' ? '2-3 business days' : 
                      '5-7 business days'
            }
          )
        } catch (emailError) {
          console.error('Email error:', emailError)
        }

        // Send agency notification
        try {
          await window.emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            process.env.NEXT_PUBLIC_EMAILJS_FISCAL_AGENCY_TEMPLATE_ID,
            {
              applicant_name: `${formData.name} ${formData.surname}`,
              applicant_email: formData.email,
              birth_date: formData.birth_date,
              birth_place: formData.birth_place,
              passport: formData.passport_number,
              purpose: formData.purpose,
              urgency: formData.urgency,
              all_data: JSON.stringify(formData, null, 2)
            }
          )
        } catch (emailError) {
          console.error('Agency email error:', emailError)
        }
      }

      setSubmitStatus({
        type: 'success',
        message: 'Application submitted successfully! Check your email for confirmation.'
      })

      // Reset form
      setFormData({
        name: '',
        surname: '',
        birth_date: '',
        birth_place: '',
        birth_country: '',
        gender: '',
        email: '',
        phone: '',
        passport_number: '',
        current_address: '',
        purpose: '',
        urgency: 'standard'
      })
    } catch (error) {
      console.error('Submission error:', error)
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to submit application. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-red-600 p-6 sm:p-10">
            <h1 className="text-3xl font-bold text-white text-center">
              Italian Fiscal Code Application
            </h1>
            <p className="mt-2 text-center text-white/90">
              Professional Service for Foreign Investors
            </p>
          </div>

          <div className="p-6 sm:p-10 space-y-6">
            {submitStatus && (
              <div className={`p-4 rounded-md ${
                submitStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}>
                <div className="flex">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <p>{submitStatus.message}</p>
                </div>
              </div>
            )}

            {/* Personal Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <User className="inline h-4 w-4 mr-1" />
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    } focus:border-green-500 focus:ring-green-500`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <User className="inline h-4 w-4 mr-1" />
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
                      errors.surname ? 'border-red-300' : 'border-gray-300'
                    } focus:border-green-500 focus:ring-green-500`}
                  />
                  {errors.surname && <p className="mt-1 text-sm text-red-600">{errors.surname}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="birth_date"
                    value={formData.birth_date}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
                      errors.birth_date ? 'border-red-300' : 'border-gray-300'
                    } focus:border-green-500 focus:ring-green-500`}
                  />
                  {errors.birth_date && <p className="mt-1 text-sm text-red-600">{errors.birth_date}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
                      errors.gender ? 'border-red-300' : 'border-gray-300'
                    } focus:border-green-500 focus:ring-green-500`}
                  >
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                  {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    Place of Birth *
                  </label>
                  <input
                    type="text"
                    name="birth_place"
                    value={formData.birth_place}
                    onChange={handleChange}
                    placeholder="City/Town"
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
                      errors.birth_place ? 'border-red-300' : 'border-gray-300'
                    } focus:border-green-500 focus:ring-green-500`}
                  />
                  {errors.birth_place && <p className="mt-1 text-sm text-red-600">{errors.birth_place}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <Globe className="inline h-4 w-4 mr-1" />
                    Country of Birth *
                  </label>
                  <input
                    type="text"
                    name="birth_country"
                    value={formData.birth_country}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
                      errors.birth_country ? 'border-red-300' : 'border-gray-300'
                    } focus:border-green-500 focus:ring-green-500`}
                  />
                  {errors.birth_country && <p className="mt-1 text-sm text-red-600">{errors.birth_country}</p>}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <Mail className="inline h-4 w-4 mr-1" />
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    } focus:border-green-500 focus:ring-green-500`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <Phone className="inline h-4 w-4 mr-1" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
                      errors.phone ? 'border-red-300' : 'border-gray-300'
                    } focus:border-green-500 focus:ring-green-500`}
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Document Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Document Information</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <FileText className="inline h-4 w-4 mr-1" />
                    Passport Number *
                  </label>
                  <input
                    type="text"
                    name="passport_number"
                    value={formData.passport_number}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
                      errors.passport_number ? 'border-red-300' : 'border-gray-300'
                    } focus:border-green-500 focus:ring-green-500`}
                  />
                  {errors.passport_number && <p className="mt-1 text-sm text-red-600">{errors.passport_number}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Current Address
                  </label>
                  <textarea
                    name="current_address"
                    value={formData.current_address}
                    onChange={handleChange}
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>

            {/* Purpose and Processing */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Application Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Purpose of Fiscal Code *
                  </label>
                  <select
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
                      errors.purpose ? 'border-red-300' : 'border-gray-300'
                    } focus:border-green-500 focus:ring-green-500`}
                  >
                    <option value="">Select Purpose</option>
                    <option value="property_purchase">Property Purchase</option>
                    <option value="business">Business Registration</option>
                    <option value="employment">Employment</option>
                    <option value="investment">Investment</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.purpose && <p className="mt-1 text-sm text-red-600">{errors.purpose}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Processing Speed
                  </label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="standard">Standard (5-7 business days)</option>
                    <option value="express">Express (2-3 business days)</option>
                    <option value="urgent">Urgent (24 hours)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-5">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                }`}
              >
                {isSubmitting ? (
                  'Processing...'
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Application
                  </>
                )}
              </button>
            </div>

            <div className="mt-4 text-center text-sm text-gray-600">
              <p>We'll process your application and send the official fiscal code certificate via email.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
