import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Download, MapPin, Building2, Users, Euro, Calendar, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Villaggio in Salento - Tourist Resort Investment | Invest in Puglia',
  description: 'Turnkey tourist village resort in Salento featuring accommodations, restaurant, wellness center, pools, and event facilities. Prime investment opportunity in Puglia.',
  openGraph: {
    title: 'Villaggio in Salento - Tourist Resort Investment',
    description: 'Comprehensive tourist resort in Salento with full amenities. Turnkey investment opportunity.',
    type: 'website',
    url: 'https://investinpuglia.eu/projects/villaggio-in-salento',
    images: [
      {
        url: 'https://investinpuglia.eu/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Villaggio in Salento'
      }
    ]
  }
}

export default function VillaggioInSalentoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white">
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Villaggio in Salento
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Premium Tourist Resort Complex
              </p>
              <div className="flex items-center space-x-2 text-purple-200 mb-4">
                <MapPin className="w-5 h-5" />
                <span className="text-lg">Salento, Puglia, Italy</span>
              </div>
              <a
                href="/projects/villaggio-in-salento.pdf"
                download
                className="inline-flex items-center px-8 py-4 bg-white text-purple-900 rounded-lg hover:bg-purple-50 transition-all shadow-lg hover:shadow-xl font-semibold"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Investment Memorandum
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Building2 className="w-8 h-8 mb-3 text-purple-200" />
                <div className="text-2xl font-bold mb-1">25,100</div>
                <div className="text-sm text-purple-200">sqm Plot</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mb-3 text-purple-200" />
                <div className="text-2xl font-bold mb-1">100+</div>
                <div className="text-sm text-purple-200">Guest Rooms</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Calendar className="w-8 h-8 mb-3 text-purple-200" />
                <div className="text-2xl font-bold mb-1">Year-Round</div>
                <div className="text-sm text-purple-200">Operation</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <TrendingUp className="w-8 h-8 mb-3 text-purple-200" />
                <div className="text-2xl font-bold mb-1">Turnkey</div>
                <div className="text-sm text-purple-200">Ready to Operate</div>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Property Overview</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                  Villaggio in Salento is a comprehensive tourist village resort located in the heart of Salento,
                  Puglia&apos;s most sought-after coastal region. This turnkey investment opportunity features
                  fully operational facilities designed to meet the highest standards of modern hospitality.
                </p>
                <p>
                  The property comprises two-story accommodation buildings with independent access, ensuring
                  privacy and convenience for guests. All structures feature energy-efficient design with
                  solar panels, modern insulation, and autonomous climate control systems in each room.
                </p>
              </div>
            </section>

            {/* Accommodation */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Accommodation Facilities</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Classic Rooms (500-600)</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Ground floor with covered veranda</li>
                    <li>• First floor with large balconies</li>
                    <li>• Autonomous air conditioning</li>
                    <li>• Modern furnishings</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Superior Rooms (700)</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Enhanced interior design</li>
                    <li>• Premium amenities</li>
                    <li>• Spacious layouts</li>
                    <li>• Modern bathroom facilities</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Deluxe Rooms (800)</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Luxury finishes</li>
                    <li>• Premium furniture</li>
                    <li>• Enhanced comfort features</li>
                    <li>• Superior views</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-lg p-6 border border-purple-100">
                  <h3 className="text-xl font-semibold text-purple-900 mb-3">Energy Efficient</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Solar panel coverage</li>
                    <li>• Advanced insulation</li>
                    <li>• Heat pump systems</li>
                    <li>• Sustainable design</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Core Facilities */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Core Facilities</h2>
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Restaurant & Bar (1,150 sqm)</h3>
                      <p className="text-gray-700">
                        Main dining hall and restaurant with self-service buffet area and table service section.
                        High-efficiency climate control with heat pump. Professional kitchen facilities meeting
                        all sanitary requirements.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Conference Center (500 sqm)</h3>
                      <p className="text-gray-700">
                        Multi-purpose hall for conferences, meetings, and events. Circular structure with
                        independent climate control. Capacity for corporate events and celebrations.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Wellness Center (200 sqm)</h3>
                      <p className="text-gray-700">
                        Massage treatment rooms, Turkish bath, relax room, and reception area.
                        Professional spa facilities with modern amenities.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Entertainment Theater (300 sqm)</h3>
                      <p className="text-gray-700">
                        Indoor theater for shows with tent-style roof structure. Complete entertainment
                        venue for guest activities and performances.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Recreational Amenities */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Recreational Amenities</h2>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-100">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Swimming Facilities</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Two adult swimming pools (700 sqm total)</li>
                      <li>• One children&apos;s pool</li>
                      <li>• Relax pool near conference center</li>
                      <li>• Professional lifeguard stations</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Sports & Activities</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Tennis court</li>
                      <li>• Football field</li>
                      <li>• Health and fitness paths (7,000 sqm)</li>
                      <li>• Children&apos;s play area</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Infrastructure */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Technical Infrastructure</h2>
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Areas</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Professional laundry facility</li>
                      <li>• Food storage and deposits</li>
                      <li>• Staff locker rooms with accommodations</li>
                      <li>• Multiple commercial kitchens</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Parking & Access</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Covered parking: 2,400 sqm</li>
                      <li>• Additional parking: 500 sqm</li>
                      <li>• Direct resort access</li>
                      <li>• Well-maintained grounds</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Key Features Card */}
              <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-xl shadow-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Key Features</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Turnkey operational resort</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Energy-efficient infrastructure</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Multiple revenue streams</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Prime Salento location</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Fully compliant permits</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Comprehensive amenities</span>
                  </li>
                </ul>
              </div>

              {/* Contact Card */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Interested in This Project?</h3>
                <p className="text-gray-700 mb-6">
                  Contact us to receive detailed information and schedule a site visit.
                </p>
                <Link
                  href="/contact"
                  className="block w-full text-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                >
                  Contact Us
                </Link>
              </div>

              {/* Download Card */}
              <div className="bg-gray-50 rounded-xl shadow-lg p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Investment Documents</h3>
                <a
                  href="/projects/villaggio-in-salento.pdf"
                  download
                  className="flex items-center justify-between w-full px-6 py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-semibold"
                >
                  <span>Full Memorandum</span>
                  <Download className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Advantages */}
        <section className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Investment Advantages</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Established Business</h3>
              <p className="text-gray-700">
                Fully operational facility with proven track record and established clientele
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Prime Location</h3>
              <p className="text-gray-700">
                Located in Salento, one of Italy&apos;s most desirable coastal tourism destinations
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Euro className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Multiple Revenue Streams</h3>
              <p className="text-gray-700">
                Accommodations, dining, wellness services, events, and recreational facilities
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
