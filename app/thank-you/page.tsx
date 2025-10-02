'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Mail, Phone } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ThankYouPage() {
  const searchParams = useSearchParams()
  const service = searchParams.get('service')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getServiceDetails = () => {
    switch (service) {
      case 'property-snapshot':
        return {
          title: 'Property Snapshot Analysis',
          price: '€500',
          duration: '7-10 days',
          nextSteps: [
            'Check your email for payment confirmation',
            'Reply to the confirmation email with your property details (address, listing link)',
            'I\'ll schedule a kick-off call within 24 hours',
            'Receive your comprehensive analysis report in 7-10 days'
          ]
        }
      case 'foundation-package':
        return {
          title: 'Investment Foundation Package',
          price: '€2,500',
          duration: '30-45 days',
          nextSteps: [
            'Check your email for payment confirmation',
            'I\'ll contact you within 24 hours to schedule our initial consultation',
            'We\'ll discuss your investment criteria and goals',
            'Start receiving property options and market intelligence within 7 days'
          ]
        }
      default:
        return {
          title: 'Your Service',
          price: '',
          duration: '',
          nextSteps: [
            'Check your email for payment confirmation',
            'I\'ll contact you within 24 hours',
            'We\'ll discuss next steps for your project'
          ]
        }
    }
  }

  const details = getServiceDetails()

  if (!mounted) {
    return null
  }

  return (
    <>
      <Navbar />

      {/* Success Hero */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500 rounded-full animate-bounce">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Payment Successful!
          </h1>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h2 className="text-3xl font-bold text-indigo-600 mb-2">
                {details.title}
              </h2>
              {details.price && (
                <p className="text-2xl text-gray-600">
                  {details.price} • {details.duration}
                </p>
              )}
            </div>

            {/* Next Steps */}
            <div className="text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What Happens Next?</h3>
              <ul className="space-y-4">
                {details.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-600 font-bold">{index + 1}</span>
                    </div>
                    <p className="text-gray-700 text-lg pt-1">{step}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-indigo-50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Questions? I'm Here to Help</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@investinpuglia.eu"
                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold"
              >
                <Mail className="w-5 h-5" />
                info@investinpuglia.eu
              </a>
              <a
                href="tel:+393514001402"
                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold"
              >
                <Phone className="w-5 h-5" />
                +39 351 400 1402
              </a>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white py-4 px-8 rounded-lg font-bold hover:bg-indigo-700 transition-all text-lg shadow-lg"
            >
              Return to Homepage <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 border-2 border-indigo-600 py-4 px-8 rounded-lg font-bold hover:bg-indigo-50 transition-all text-lg"
            >
              View All Services
            </Link>
          </div>

          {/* Additional Message */}
          <div className="mt-8 text-gray-600">
            <p className="text-sm">
              A confirmation email has been sent to your inbox. Please check your spam folder if you don't see it within a few minutes.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
