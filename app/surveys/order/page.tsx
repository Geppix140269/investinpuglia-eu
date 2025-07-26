// app/surveys/order/page.tsx
'use client'

import { useState } from 'react'

export default function SurveyOrderPage() {
  const [selectedServices, setSelectedServices] = useState<any[]>([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [termsAccepted, setTermsAccepted] = useState(false)

  const services = [
    { id: 'basic-survey', name: 'Basic Property Survey', price: 499, description: 'Structural assessment, legal status, utilities, and market positioning' },
    { id: 'renovation-estimate', name: 'Renovation Cost Estimate', price: 349, description: 'Detailed breakdown with local contractor quotes' },
    { id: 'mini-pia', name: 'Mini PIA Grant Assessment', price: 249, description: 'Eligibility analysis and application strategy' },
    { id: 'eu-grants', name: 'EU Grants Analysis', price: 199, description: 'Complete overview of available EU funding' },
    { id: 'legal-review', name: 'Legal Documentation Review', price: 199, description: 'Ownership verification and compliance check' },
    { id: 'market-analysis', name: 'Market Analysis', price: 149, description: 'Local trends and investment potential' }
  ]

  const bundles = [
    { id: 'essential-pack', name: 'Essential Investment Pack', price: 849, description: 'Basic Survey + Legal Review + Market Analysis', savings: 198, badge: 'POPULAR' },
    { id: 'mini-pia-pack', name: 'Mini PIA Readiness Pack', price: 999, description: 'Basic Survey + Renovation Estimate + Mini PIA Assessment', savings: 98, badge: 'GRANTS' },
    { id: 'complete-pack', name: 'Full Due Diligence Pack', price: 1499, description: 'All 6 services + 30min consultation + Priority processing', savings: 446, badge: 'COMPLETE' }
  ]

  const handleServiceToggle = (service: any, isBundle = false) => {
    let newSelectedServices = [...selectedServices]
    
    const existingIndex = newSelectedServices.findIndex(s => s.id === service.id)
    
    if (existingIndex > -1) {
      // Deselect
      newSelectedServices.splice(existingIndex, 1)
    } else {
      // Select
      if (isBundle) {
        // Clear individual services when selecting bundle
        newSelectedServices = newSelectedServices.filter(s => !s.bundle)
        newSelectedServices.push({ ...service, bundle: true })
      } else {
        // Clear bundles when selecting individual service
        newSelectedServices = newSelectedServices.filter(s => !s.bundle)
        newSelectedServices.push({ ...service, individual: true })
      }
    }
    
    setSelectedServices(newSelectedServices)
    const total = newSelectedServices.reduce((sum, s) => sum + s.price, 0)
    setTotalPrice(total)
  }

  const isServiceSelected = (serviceId: string) => {
    return selectedServices.some(s => s.id === serviceId)
  }

  const proceedToCheckout = (e: React.FormEvent) => {
    e.preventDefault()
    
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    
    if (!termsAccepted) {
      alert('Please agree to the Terms & Conditions before proceeding.')
      return
    }
    
    if (selectedServices.length === 0) {
      alert('Please select at least one service.')
      return
    }
    
    // Create PayPal payment URL
    const paypalUrl = `https://paypal.me/marietrulliint/${totalPrice}EUR?country.x=ES&locale.x=en_US`
    
    // Get order details
    const customerName = formData.get('fullName')
    const customerEmail = formData.get('email')
    const servicesDescription = selectedServices.map(s => s.name).join(', ')
    
    // Show confirmation
    alert(`Redirecting to PayPal for payment of €${totalPrice}\n\nOrder Details:\nCustomer: ${customerName}\nEmail: ${customerEmail}\nServices: ${servicesDescription}\n\nPlease complete payment on PayPal.`)
    
    // Redirect to PayPal
    window.open(paypalUrl, '_blank')
  }

  return (
    <>
      {/* Header */}
      <section className="min-h-[60vh] flex items-center py-20 px-5 relative overflow-hidden bg-gradient-to-br from-[#667eea] via-[#764ba2] via-[#059669] to-[#047857] bg-[length:400%_400%] animate-gradient">
        <div className="absolute -top-1/2 -right-1/2 w-[200%] h-[200%] opacity-10" 
             style={{
               background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
               animation: 'shimmer 15s linear infinite'
             }} />
        
        <div className="max-w-4xl mx-auto w-full relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Property Survey Order Form
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Professional property assessment for smart investment decisions in Puglia
          </p>
        </div>
      </section>

      {/* Order Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-5">
          <form onSubmit={proceedToCheckout} className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            
            {/* Customer Info */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                👤 Your Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block font-semibold mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-semibold mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="phone" className="block font-semibold mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Property Info */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                🏠 Property Details
              </h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="propertyUrl" className="block font-semibold mb-2">
                    Property Listing URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    id="propertyUrl"
                    name="propertyUrl"
                    placeholder="https://www.idealista.it/immobile/..."
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  />
                  <p className="text-sm text-purple-600 mt-2">📱 Copy from Idealista, Immobiliare.it, Casa.it, etc.</p>
                </div>
                <div>
                  <label htmlFor="intendedUse" className="block font-semibold mb-2">
                    Intended Use <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="intendedUse"
                    name="intendedUse"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  >
                    <option value="">Select intended use</option>
                    <option value="residence">Primary Residence</option>
                    <option value="vacation">Vacation Home</option>
                    <option value="rental">Rental Property</option>
                    <option value="bnb">Bed & Breakfast</option>
                    <option value="commercial">Commercial</option>
                    <option value="investment">Investment</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="specialNotes" className="block font-semibold mb-2">
                    Special Requirements (Optional)
                  </label>
                  <textarea
                    id="specialNotes"
                    name="specialNotes"
                    rows={4}
                    placeholder="Any specific renovation plans, grant interests, or other details..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                📋 Select Services
              </h2>
              
              {/* Individual Services */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {services.map(service => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceToggle(service)}
                    className={`border-2 rounded-2xl p-6 cursor-pointer transition-all ${
                      isServiceSelected(service.id)
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-lg">{service.name}</h4>
                      <span className="text-2xl font-bold text-purple-600">€{service.price}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </div>
                ))}
              </div>

              {/* Bundle Packages */}
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                📦 Bundle Packages (Save Money!)
              </h3>
              <div className="grid gap-4">
                {bundles.map(bundle => (
                  <div
                    key={bundle.id}
                    onClick={() => handleServiceToggle(bundle, true)}
                    className={`relative border-3 rounded-2xl p-6 cursor-pointer transition-all ${
                      isServiceSelected(bundle.id)
                        ? 'border-purple-600 bg-gradient-to-r from-purple-50 to-pink-50'
                        : 'border-purple-400 hover:border-purple-500 bg-gradient-to-r from-purple-50/50 to-pink-50/50'
                    }`}
                  >
                    <div className="absolute -top-3 left-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                      {bundle.badge}
                    </div>
                    <div className="flex justify-between items-start mb-3 pt-2">
                      <h4 className="font-bold text-xl">{bundle.name}</h4>
                      <span className="text-3xl font-bold text-purple-600">€{bundle.price}</span>
                    </div>
                    <p className="text-gray-700 mb-2">{bundle.description}</p>
                    <p className="text-green-600 font-semibold">💰 Save €{bundle.savings}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hidden inputs */}
            <input type="hidden" name="selectedServices" value={JSON.stringify(selectedServices)} />
            <input type="hidden" name="totalAmount" value={totalPrice} />
          </form>

          {/* Order Summary */}
          <div className="mt-8 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-3xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">📊 Order Summary</h3>
            <div className="mb-4 text-lg opacity-90">
              {selectedServices.length === 0
                ? 'No services selected'
                : selectedServices.map(s => s.name).join(', ')
              }
            </div>
            <div className="text-5xl font-bold mb-6">€{totalPrice}</div>
            
            {/* Terms & Conditions */}
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-6 text-left">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 w-5 h-5 cursor-pointer"
                />
                <span className="text-sm">
                  I agree to the{' '}
                  <a
                    href="https://www.marietrulli.com/property-survey-services/property-survey-terms-conditions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-semibold"
                  >
                    Terms & Conditions
                  </a>
                </span>
              </label>
            </div>
            
            <button
              onClick={(e) => {
                const form = document.querySelector('form')
                if (form) {
                  form.requestSubmit()
                }
              }}
              disabled={selectedServices.length === 0 || !termsAccepted}
              className={`px-10 py-4 rounded-full font-bold text-lg transition-all ${
                selectedServices.length > 0 && termsAccepted
                  ? 'bg-green-500 hover:bg-green-600 text-white hover:scale-105 cursor-pointer'
                  : 'bg-gray-400 text-gray-200 cursor-not-allowed'
              }`}
            >
              🔒 Proceed to Secure Checkout
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
