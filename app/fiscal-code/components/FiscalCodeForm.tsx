// app/fiscal-code/components/FiscalCodeForm.tsx
'use client'

import { useState, useEffect } from 'react'
import { getCountries, getItalianProvinces } from '@/lib/locations'

interface Country {
  code: string
  name: string
  flag: string
}

interface Province {
  code: string
  name: string
}

export default function FiscalCodeForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: 'male',
    dateOfBirth: '',
    birthCountry: '',
    birthCity: '',
    birthProvince: '',
    country: 'Italy',
    address: '',
    streetNumber: '',
    city: '',
    province: '',
    postalCode: '',
    email: '',
    phone: '',
    purpose: 'property_investment',
    notes: ''
  })

  const [countries, setCountries] = useState<Country[]>([])
  const [provinces, setProvinces] = useState<Province[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Load countries on mount
  useEffect(() => {
    getCountries()
      .then((data) => setCountries(data))
      .catch(console.error)
    
    getItalianProvinces()
      .then((data) => setProvinces(data))
      .catch(console.error)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Map form data to match API expectations - THIS IS THE FIX!
      const submissionData = {
        // Map firstName -> name, lastName -> surname
        name: formData.firstName,
        surname: formData.lastName,
        email: formData.email,
        
        // Personal details
        requestType: 'attribution',
        sex: formData.gender === 'male' ? 'M' : 'F',
        birthDate: formData.dateOfBirth,
        birthMunicipality: formData.birthCity,
        birthProvince: formData.birthProvince,
        birthForeign: formData.birthCountry !== 'Italy',
        birthForeignCountry: formData.birthCountry !== 'Italy' ? formData.birthCountry : '',
        
        // Residence
        residenceAddress: formData.address,
        residenceNumber: formData.streetNumber,
        residenceMunicipality: formData.city,
        residenceProvince: formData.province,
        residenceCap: formData.postalCode,
        
        // Contact
        phone: formData.phone,
        
        // Foreign address (if not in Italy)
        foreignCountry: formData.country !== 'Italy' ? formData.country : '',
        foreignAddress: formData.country !== 'Italy' ? `${formData.address} ${formData.streetNumber}, ${formData.city} ${formData.postalCode}` : '',
        
        // Additional info
        purpose: formData.purpose,
        notes: formData.notes,
        
        // Default values
        termsAccepted: true,
        privacyAccepted: true,
        delegatorName: formData.firstName + ' ' + formData.lastName,
        delegatorEmail: formData.email,
        delegatorPhone: formData.phone
      }

      console.log('Submitting fiscal code application:', submissionData)

      const response = await fetch('/api/fiscal-code-applications', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(submissionData)
      })

      console.log('Response status:', response.status)

      const data = await response.json()
      console.log('Response data:', data)

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application')
      }

      setSuccess(true)
      
      // Store application ID for success page
      if (data.applicationId) {
        sessionStorage.setItem('applicationId', data.applicationId)
        sessionStorage.setItem('applicationData', JSON.stringify(submissionData))
      }
      
      // Redirect to success page
      setTimeout(() => {
        window.location.href = '/fiscal-code/success'
      }, 1000)
      
    } catch (err: any) {
      console.error('Form submission error:', err)
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      {/* Personal Information */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4">Personal Information</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">First Name *</label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Last Name *</label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Gender *</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({...formData, gender: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Date of Birth *</label>
            <input
              type="date"
              required
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Birth Place */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4">Place of Birth</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Country *</label>
            <select
              required
              value={formData.birthCountry}
              onChange={(e) => setFormData({...formData, birthCountry: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.flag} {country.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">City *</label>
            <input
              type="text"
              required
              value={formData.birthCity}
              onChange={(e) => setFormData({...formData, birthCity: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter city name"
            />
          </div>
          
          {formData.birthCountry === 'Italy' && (
            <div>
              <label className="block text-sm font-medium mb-2">Province</label>
              <select
                value={formData.birthProvince}
                onChange={(e) => setFormData({...formData, birthProvince: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Select Province</option>
                {provinces.map((prov) => (
                  <option key={prov.code} value={prov.code}>{prov.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Current Address */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4">Current Address</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Country *</label>
            <select
              required
              value={formData.country}
              onChange={(e) => setFormData({...formData, country: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.flag} {country.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Street Address *</label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Number</label>
              <input
                type="text"
                value={formData.streetNumber}
                onChange={(e) => setFormData({...formData, streetNumber: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">City *</label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            
            {formData.country === 'Italy' && (
              <div>
                <label className="block text-sm font-medium mb-2">Province</label>
                <select
                  value={formData.province}
                  onChange={(e) => setFormData({...formData, province: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Select</option>
                  {provinces.map((prov) => (
                    <option key={prov.code} value={prov.code}>{prov.name}</option>
                  ))}
                </select>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium mb-2">Postal Code *</label>
              <input
                type="text"
                required
                value={formData.postalCode}
                onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4">Contact Information</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Phone *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              placeholder="+39 xxx xxx xxxx"
            />
          </div>
        </div>
      </div>

      {/* Purpose */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4">Application Purpose</h3>
        
        <div>
          <label className="block text-sm font-medium mb-2">Purpose of Fiscal Code *</label>
          <select
            value={formData.purpose}
            onChange={(e) => setFormData({...formData, purpose: e.target.value})}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
          >
            <option value="property_investment">Property Investment</option>
            <option value="business">Starting a Business</option>
            <option value="employment">Employment</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">Additional Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
            rows={3}
            placeholder="Any additional information..."
          />
        </div>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 text-green-700 p-4 rounded-lg">
          Application submitted successfully! Redirecting...
        </div>
      )}

      {/* Submit Button */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="text-sm text-gray-600 mb-4">
          <p>✓ Processing fee: €99</p>
          <p>✓ AA4/8 form generated automatically</p>
          <p>✓ Support throughout the process</p>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-4 rounded-lg hover:shadow-xl transition-all disabled:opacity-50"
        >
          {isSubmitting ? 'Processing...' : 'Submit Application & Continue to Payment →'}
        </button>
      </div>
    </form>
  )
}
