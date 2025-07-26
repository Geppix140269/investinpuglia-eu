// components/LeadCaptureForm.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'

interface LeadCaptureFormProps {
  source?: string
  title?: string
  description?: string
  buttonText?: string
  onSuccess?: () => void
}

export default function LeadCaptureForm({
  source = 'general',
  title = 'Stay Updated',
  description = 'Get the latest insights on Puglia property investment',
  buttonText = 'Subscribe',
  onSuccess
}: LeadCaptureFormProps) {
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage({ type: '', text: '' })

    try {
      const supabase = createClient()
      
      // Insert lead into database
      const { error } = await supabase
        .from('leads')
        .insert([{
          name: formData.name,
          email: formData.email,
          source: source,
          created_at: new Date().toISOString()
        }])

      if (error) throw error

      // Send email notification via API
      try {
        await fetch('/api/lead-capture', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            source
          })
        })
      } catch (emailError) {
        console.error('Email notification failed:', emailError)
      }

      setMessage({ type: 'success', text: 'Thank you for subscribing!' })
      setFormData({ name: '', email: '' })
      
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error('Subscription error:', error)
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all"
          placeholder="John Smith"
          disabled={isSubmitting}
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all"
          placeholder="john@example.com"
          disabled={isSubmitting}
        />
      </div>
      
      {message.text && (
        <div className={`p-3 rounded-lg text-sm ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-700' 
            : 'bg-red-50 text-red-700'
        }`}>
          {message.text}
        </div>
      )}
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-4 px-8 rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Processing...' : buttonText}
      </button>
    </form>
  )
}
