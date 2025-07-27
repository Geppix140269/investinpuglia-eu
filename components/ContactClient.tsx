// PATH: components/ContactClient.tsx
'use client'
import { useState } from 'react'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare,
  Send,
  Building,
  Globe
} from 'lucide-react'

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    investmentType: 'property',
    budget: '',
    message: '',
    consent: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    try {
      // In production, replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        investmentType: 'property',
        budget: '',
        message: '',
        consent: false
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-terracotta to-terracotta-dark text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-terracotta-light max-w-2xl mx-auto">
            Ready to explore investment opportunities in Puglia? Our expert team is here to guide you every step of the way.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-sea/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-sea" />
              </div>
              <h3 className="font-semibold text-stone-800 mb-2">Phone</h3>
              <p className="text-stone-600">
                <a href="tel:+442079460958" className="hover:text-sea">+44 20 7946 0958</a>
              </p>
              <p className="text-sm text-stone-500 mt-1">Mon-Fri 9AM-6PM GMT</p>
            </div>
            <div className="text-center">
              <div className="bg-olive/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-olive" />
              </div>
              <h3 className="font-semibold text-stone-800 mb-2">Email</h3>
              <p className="text-stone-600">
                <a href="mailto:info@investinpuglia.com" className="hover:text-olive">info@investinpuglia.com</a>
              </p>
              <p className="text-sm text-stone-500 mt-1">Response within 24 hours</p>
            </div>
            <div className="text-center">
              <div className="bg-warm/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-warm" />
              </div>
              <h3 className="font-semibold text-stone-800 mb-2">WhatsApp</h3>
              <p className="text-stone-600">
                <a href="https://wa.me/442079460958" className="hover:text-warm">+44 20 7946 0958</a>
              </p>
              <p className="text-sm text-stone-500 mt-1">Quick questions welcome</p>
            </div>
            <div className="text-center">
              <div className="bg-terracotta/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-terracotta" />
              </div>
              <h3 className="font-semibold text-stone-800 mb-2">Video Call</h3>
              <p className="text-stone-600">
                Book a consultation
              </p>
              <p className="text-sm text-stone-500 mt-1">Zoom, Teams, or Skype</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Office Info */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="font-playfair text-2xl font-bold text-stone-800 mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-stone-700 mb-2">
                      Company (Optional)
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="investmentType" className="block text-sm font-medium text-stone-700 mb-2">
                      Investment Interest *
                    </label>
                    <select
                      id="investmentType"
                      name="investmentType"
                      required
                      value={formData.investmentType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                    >
                      <option value="property">Property Investment</option>
                      <option value="business">Business Development</option>
                      <option value="both">Both Property &amp; Business</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-stone-700 mb-2">
                      Investment Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-250k">Under €250,000</option>
                      <option value="250k-500k">€250,000 - €500,000</option>
                      <option value="500k-1m">€500,000 - €1,000,000</option>
                      <option value="over-1m">Over €1,000,000</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
                    How can we help you? *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                    placeholder="Tell us about your investment goals and how we can assist you..."
                  />
                </div>

                <div>
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      checked={formData.consent}
                      onChange={handleChange}
                      className="mt-1 rounded border-stone-300 text-terracotta focus:ring-terracotta"
                    />
                    <span className="text-sm text-stone-600">
                      I consent to InvestInPuglia storing my information to respond to my inquiry and send relevant investment information. 
                      I understand I can unsubscribe at any time. View our <a href="/privacy" className="text-terracotta hover:text-terracotta-dark">Privacy Policy</a>.
                    </span>
                  </label>
                </div>

                {submitStatus === 'success' && (
                  <div className="bg-green-50 border-l-4 border-green-500 p-4">
                    <p className="text-green-800">Thank you for your message! We&apos;ll get back to you within 24 hours.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4">
                    <p className="text-red-800">Something went wrong. Please try again or email us directly.</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-terracotta text-white py-3 px-6 rounded-lg font-medium hover:bg-terracotta-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Office Information */}
            <div className="space-y-8">
              {/* UK Office */}
              <div className="bg-white rounded-xl shadow-sm p-8">
                <div className="flex items-start gap-4 mb-4">
                  <Building className="w-6 h-6 text-terracotta flex-shrink-0" />
                  <div>
                    <h3 className="font-playfair text-xl font-bold text-stone-800 mb-2">
                      United Kingdom Office
                    </h3>
                    <address className="not-italic text-stone-600 space-y-1">
                      <p>1402 Celsius Ltd</p>
                      <p>20-22 Wenlock Road</p>
                      <p>London N1 7GU</p>
                      <p>United Kingdom</p>
                    </address>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4 text-sm text-stone-600">
                  <Clock className="w-4 h-4" />
                  <span>Monday - Friday: 9:00 AM - 6:00 PM GMT</span>
                </div>
              </div>

              {/* Italy Representative */}
              <div className="bg-white rounded-xl shadow-sm p-8">
                <div className="flex items-start gap-4 mb-4">
                  <MapPin className="w-6 h-6 text-sea flex-shrink-0" />
                  <div>
                    <h3 className="font-playfair text-xl font-bold text-stone-800 mb-2">
                      Puglia Representative Office
                    </h3>
                    <address className="not-italic text-stone-600 space-y-1">
                      <p>Corso Vittorio Emanuele II</p>
                      <p>70122 Bari BA</p>
                      <p>Puglia, Italy</p>
                    </address>
                    <p className="text-sm text-stone-500 mt-2">
                      By appointment only
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4 text-sm text-stone-600">
                  <Clock className="w-4 h-4" />
                  <span>Monday - Friday: 9:00 AM - 6:00 PM CET</span>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-gradient-to-br from-sea/5 to-white rounded-xl p-8">
                <h3 className="font-playfair text-xl font-bold text-stone-800 mb-4">
                  Helpful Resources
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a href="/faq" className="text-sea hover:text-sea-dark flex items-center gap-2">
                      <span>→</span> Frequently Asked Questions
                    </a>
                  </li>
                  <li>
                    <a href="/how-it-works" className="text-sea hover:text-sea-dark flex items-center gap-2">
                      <span>→</span> How Our Services Work
                    </a>
                  </li>
                  <li>
                    <a href="/investment-guide" className="text-sea hover:text-sea-dark flex items-center gap-2">
                      <span>→</span> Puglia Investment Guide
                    </a>
                  </li>
                  <li>
                    <a href="/schedule" className="text-sea hover:text-sea-dark flex items-center gap-2">
                      <span>→</span> Schedule a Consultation
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl font-bold text-stone-800 mb-8">
            Serving International Investors Globally
          </h2>
          <p className="text-lg text-stone-600 mb-8 max-w-3xl mx-auto">
            While our offices are in London and Puglia, we work with international investors from around the world. 
            Our digital-first approach means you can access our expertise regardless of your location.
          </p>
          <div className="bg-stone-100 rounded-xl h-96 flex items-center justify-center">
            {/* Placeholder for map integration */}
            <p className="text-stone-500">Interactive map coming soon</p>
          </div>
        </div>
      </section>
    </div>
  )
}
