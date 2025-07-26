import Link from 'next/link'

export default function BuyerProfileSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-amber-50 to-white">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Profile Submitted Successfully!
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Thank you for completing your buyer profile. Our team will review your preferences and contact you within 24-48 hours with personalized property recommendations.
        </p>

        <div className="space-y-4">
          <Link
            href="/properties"
            className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Properties
          </Link>

          <Link
            href="/calculator"
            className="block w-full border border-blue-600 text-blue-600 py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Calculate Grants
          </Link>

          <a
            href="https://calendly.com/investinpuglia/consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Schedule Consultation
          </a>
        </div>
      </div>
    </div>
  )
}
