import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Download, MapPin, Building2, Waves, TrendingUp, Euro, Shield, Leaf, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Salento Wellbeing Resort - Eco-Integrated Development | Invest in Puglia',
  description: 'Pioneering eco-integrated wellbeing resort development in Salento. 169,000 sqm tourism-zoned land with approved buildable volume. Premium wellness tourism investment opportunity.',
  openGraph: {
    title: 'Salento Wellbeing Resort - Eco-Integrated Development',
    description: 'Exceptional opportunity to develop a pioneering eco-integrated wellbeing resort in Italy\'s fastest-growing tourism destination.',
    type: 'website',
    url: 'https://investinpuglia.eu/projects/salento-wellbeing-resort',
    images: [
      {
        url: 'https://investinpuglia.eu/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Salento Wellbeing Resort'
      }
    ]
  }
}

export default function SalentoWellbeingResortPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-emerald-900 via-teal-800 to-cyan-900 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Link
            href="/"
            className="inline-flex items-center text-white/90 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-red-600 rounded-full text-sm font-semibold mb-4">
                CONFIDENTIAL INVESTMENT BRIEF
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Salento Wellbeing Resort
              </h1>
              <p className="text-xl text-emerald-100 mb-8">
                Eco-Integrated Wellness Development
              </p>
              <div className="flex items-center space-x-2 text-emerald-200 mb-4">
                <MapPin className="w-5 h-5" />
                <span className="text-lg">Salento Peninsula, Puglia, Italy</span>
              </div>
              <a
                href="/projects/salento-wellbeing-resort.pdf"
                download
                className="inline-flex items-center px-8 py-4 bg-white text-emerald-900 rounded-lg hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl font-semibold"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Investment Brief
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Building2 className="w-8 h-8 mb-3 text-emerald-200" />
                <div className="text-2xl font-bold mb-1">169,000</div>
                <div className="text-sm text-emerald-200">sqm Tourism-Zoned</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Waves className="w-8 h-8 mb-3 text-emerald-200" />
                <div className="text-2xl font-bold mb-1">26,000</div>
                <div className="text-sm text-emerald-200">sqm GFA</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Leaf className="w-8 h-8 mb-3 text-emerald-200" />
                <div className="text-2xl font-bold mb-1">Eco</div>
                <div className="text-sm text-emerald-200">Integrated Design</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <TrendingUp className="w-8 h-8 mb-3 text-emerald-200" />
                <div className="text-2xl font-bold mb-1">470,000</div>
                <div className="text-sm text-emerald-200">sqm Expansion Land</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="md:col-span-2">
            {/* Overview */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Investment Overview</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                  An exceptional opportunity to develop a pioneering eco-integrated wellbeing resort in Italy&apos;s
                  most sought-after emerging destination. This confidential investment brief presents a strategically
                  positioned hospitality development in Salento, Puglia—designed for the discerning investor seeking
                  sustainable returns in Europe&apos;s fastest-growing wellness tourism market.
                </p>
                <p>
                  Located in the heart of Salento—between the historic coastal towns of Nardò, Porto Cesareo, and
                  Gallipoli—the development offers unparalleled access to the region&apos;s cultural and natural assets.
                  Positioned just 20 minutes from Lecce, the &quot;Florence of the South,&quot; and within comfortable reach
                  of both Brindisi and Bari international airports.
                </p>
              </div>
            </section>

            {/* Market Context */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Puglia: Europe&apos;s Fastest-Growing Tourism Destination</h2>
              <div className="grid sm:grid-cols-3 gap-6 mb-6">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                  <div className="text-4xl font-bold text-emerald-900 mb-2">15M</div>
                  <div className="text-gray-700 font-semibold">Annual Tourist Stays</div>
                  <p className="text-sm text-gray-600 mt-2">Puglia&apos;s total regional accommodation nights</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                  <div className="text-4xl font-bold text-emerald-900 mb-2">60%</div>
                  <div className="text-gray-700 font-semibold">Foreign Growth</div>
                  <p className="text-sm text-gray-600 mt-2">International arrivals increase (2015-2019)</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                  <div className="text-4xl font-bold text-emerald-900 mb-2">31%</div>
                  <div className="text-gray-700 font-semibold">Lecce Province Share</div>
                  <p className="text-sm text-gray-600 mt-2">Proportion of regional tourism captured locally</p>
                </div>
              </div>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                  Lecce province alone attracts 31% of all regional arrivals, positioning this development at the
                  epicentre of demand. International recognition from National Geographic and Lonely Planet as one of
                  Europe&apos;s top sustainable destinations has further amplified visibility amongst high-value traveller
                  segments.
                </p>
              </div>
            </section>

            {/* Development Scale */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Development Scale & Configuration</h2>
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 mb-6">
                <table className="w-full">
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-4 text-gray-600 font-medium">Land Area (Tourism-Zoned)</td>
                      <td className="py-4 text-right text-emerald-900 font-bold">~169,000 m²</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-600 font-medium">Buildable Volume</td>
                      <td className="py-4 text-right text-emerald-900 font-bold">~95,000 m³</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-600 font-medium">Gross Floor Area (GFA)</td>
                      <td className="py-4 text-right text-emerald-900 font-bold">≈26,000 m²</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-600 font-medium">Beach Club Deck</td>
                      <td className="py-4 text-right text-emerald-900 font-bold">~1,000 m²</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-600 font-medium">Expansion Land Available</td>
                      <td className="py-4 text-right text-emerald-900 font-bold">~470,000 m²</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                  The site&apos;s zoning status and approved buildable volume significantly de-risk the development timeline,
                  eliminating the planning uncertainty that typically constrains Italian hospitality projects.
                </p>
              </div>
            </section>

            {/* Functional Mix */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Diversified Revenue Architecture</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Hotel Suites</h3>
                  <p className="text-gray-700">Premium accommodation forms the core revenue driver, designed to capture extended-stay wellness guests and shoulder-season demand.</p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Wellness Centre</h3>
                  <p className="text-gray-700">Destination-calibre spa facilities including thermal experiences, treatment rooms, and holistic programming generate high-margin ancillary revenues.</p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Restaurant & F&B</h3>
                  <p className="text-gray-700">Multiple dining venues showcase regional cuisine, driving per-guest spend whilst attracting local and day-visitor traffic.</p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Beach Club</h3>
                  <p className="text-gray-700">Direct sea access with ~1,000 m² deck provides a high-yield amenity, particularly valuable for summer season optimisation.</p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Cultural Programming</h3>
                  <p className="text-gray-700">Edutainment spaces and religious area differentiate the offer, supporting extended stays and community integration.</p>
                </div>
              </div>
            </section>

            {/* Investment Rationale */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Investment Rationale</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                  <Shield className="w-10 h-10 text-emerald-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Prime Coastal Positioning</h3>
                  <p className="text-gray-700 text-sm">Irreplaceable beachfront location in a supply-constrained, high-growth destination with direct sea access.</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                  <Building2 className="w-10 h-10 text-emerald-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Approved Zoning & Entitlements</h3>
                  <p className="text-gray-700 text-sm">Tourism-zoned land with confirmed buildable volume eliminates planning risk.</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                  <TrendingUp className="w-10 h-10 text-emerald-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Robust Tourism Fundamentals</h3>
                  <p className="text-gray-700 text-sm">Puglia&apos;s 60% foreign growth rate demonstrates sustained, structural demand.</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                  <Users className="w-10 h-10 text-emerald-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Wellness Tourism Tailwinds</h3>
                  <p className="text-gray-700 text-sm">Global wellness tourism forecasted to grow at 16.6% CAGR through 2027.</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                  <Leaf className="w-10 h-10 text-emerald-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">ESG & Green Finance Alignment</h3>
                  <p className="text-gray-700 text-sm">Eco-integrated design positions the asset to access EU green investment incentives.</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                  <Waves className="w-10 h-10 text-emerald-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Expansion Optionality</h3>
                  <p className="text-gray-700 text-sm">Adjacent 470,000 m² land bank provides phased development upside.</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Key Highlights Card */}
              <div className="bg-gradient-to-br from-emerald-900 to-teal-900 rounded-xl shadow-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Key Highlights</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Strategic Salento location</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Tourism-zoned with approved buildable volume</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>26,000 m² GFA development potential</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Direct beach club access</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>470,000 m² expansion land available</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Eco-integrated sustainable design</span>
                  </li>
                </ul>
              </div>

              {/* Confidential Notice */}
              <div className="bg-red-50 rounded-xl shadow-lg p-6 border-2 border-red-200">
                <div className="flex items-center mb-3">
                  <Shield className="w-6 h-6 text-red-600 mr-2" />
                  <h3 className="text-lg font-bold text-red-900">Confidential Brief</h3>
                </div>
                <p className="text-red-800 text-sm mb-4">
                  This is a confidential investment opportunity. Detailed financial modelling and operational strategies available under NDA.
                </p>
              </div>

              {/* Contact Card */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Qualified Investors</h3>
                <p className="text-gray-700 mb-6">
                  Expressions of interest invited from parties with demonstrable hospitality development experience.
                </p>
                <Link
                  href="/consultation"
                  className="block w-full text-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
                >
                  Request Information
                </Link>
              </div>

              {/* Download Card */}
              <div className="bg-gray-50 rounded-xl shadow-lg p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Investment Documents</h3>
                <a
                  href="/projects/salento-wellbeing-resort.pdf"
                  download
                  className="flex items-center justify-between w-full px-6 py-3 bg-white border-2 border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors font-semibold"
                >
                  <span>Full Investment Brief</span>
                  <Download className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <section className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Investment Opportunity</h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-8">
            A unique opportunity to develop a sustainable, high-margin hospitality asset in Europe&apos;s fastest-growing
            coastal destination—combining strategic positioning, approved zoning, and alignment with EU green-investment
            and wellness-tourism mega-trends.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/consultation"
              className="px-8 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
            >
              Schedule Consultation
            </Link>
            <a
              href="/projects/salento-wellbeing-resort.pdf"
              download
              className="px-8 py-4 bg-white border-2 border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors font-semibold inline-flex items-center justify-center"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Brief
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
