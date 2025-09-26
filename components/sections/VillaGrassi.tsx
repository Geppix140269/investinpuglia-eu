'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Euro, TrendingUp, Building, Calendar, ArrowRight, Clock, Lock, Shield, ChevronLeft, ChevronRight, Users, MapPin, Film } from 'lucide-react'
import CloudinaryImage from '@/components/properties/CloudinaryImage'
import OTPVerification from '@/components/auth/OTPVerification'

export default function VillaGrassi() {
  const [isVerified, setIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Property images from the PDF and typical villa images
  const propertyImages = [
    {
      src: "https://res.cloudinary.com/dusubfxgo/image/upload/v1758822064/strada_vista_hhbya2.png",
      alt: "Historic Estate - Neoclassical facade view"
    },
    {
      src: "https://res.cloudinary.com/dusubfxgo/image/upload/v1758824497/BW_outside_2_payo1b.png",
      alt: "Estate complex - Aerial perspective view"
    },
    {
      src: "https://res.cloudinary.com/dusubfxgo/image/upload/v1758823390/ingresso_dbsvgd.png",
      alt: "Grand entrance hall with period features"
    },
    {
      src: "https://res.cloudinary.com/dusubfxgo/image/upload/v1758823392/salone_kekekh.png",
      alt: "Noble reception rooms with original details"
    },
    {
      src: "https://res.cloudinary.com/dusubfxgo/image/upload/v1758823393/salone_1_g5xkya.png",
      alt: "Historic interiors with vaulted ceilings"
    },
    {
      src: "https://res.cloudinary.com/dusubfxgo/image/upload/v1758823390/ceiling_rbk7vn.png",
      alt: "Period architectural ceiling details"
    }
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % propertyImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + propertyImages.length) % propertyImages.length)
  }

  useEffect(() => {
    // Check if user has already verified (session storage)
    const hasAccess = sessionStorage.getItem('villa-grassi-access')
    if (hasAccess) {
      const accessData = JSON.parse(hasAccess)
      if (accessData.expiresAt > Date.now()) {
        setIsVerified(true)
      } else {
        sessionStorage.removeItem('villa-grassi-access')
      }
    }
    setIsLoading(false)
  }, [])

  const handleVerificationSuccess = () => {
    // Store access in session storage (24 hour expiry)
    const accessData = {
      verified: true,
      verifiedAt: Date.now(),
      expiresAt: Date.now() + (24 * 60 * 60 * 1000)
    }
    sessionStorage.setItem('villa-grassi-access', JSON.stringify(accessData))
    setIsVerified(true)
  }

  // Show loading state
  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-blue-200 rounded-lg w-64 mx-auto mb-4"></div>
            <div className="h-12 bg-gray-200 rounded-lg w-96 mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  // Show OTP verification if not verified
  if (!isVerified) {
    return (
      <OTPVerification
        onVerificationSuccess={handleVerificationSuccess}
        title="Access Exclusive Estate Complex"
        subtitle="This confidential 19th century estate requires SMS verification to view details"
      />
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wide">
              Historic Estate Complex
            </div>
            <div className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full font-semibold text-sm">
              <Shield className="w-4 h-4" />
              Verified Access
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Noble Estate Complex - 19th Century Heritage
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-2">
            Historic Neoclassical Estate in Southern Italy near Lecce
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Exceptional noble estate with film location heritage - Perfect for luxury resort conversion
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Gallery Side */}
            <div className="relative h-96 lg:h-[500px] bg-gray-100">
              <CloudinaryImage
                src={propertyImages[currentImageIndex].src}
                alt={propertyImages[currentImageIndex].alt}
                className="w-full h-full object-cover transition-opacity duration-300"
                width={800}
                height={600}
                quality="auto"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Image Navigation */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Image Indicator Dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {propertyImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? 'bg-white scale-125'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>

              {/* Property Tags */}
              <div className="absolute top-6 left-6">
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  19th Century Estate
                </span>
              </div>
              <div className="absolute top-6 right-6">
                <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                  <Film className="w-4 h-4" />
                  FILM LOCATION!
                </span>
              </div>

              {/* Image Counter */}
              <div className="absolute top-20 right-6">
                <span className="bg-black/50 text-white px-3 py-1 rounded-full text-xs">
                  {currentImageIndex + 1} / {propertyImages.length}
                </span>
              </div>
            </div>

            {/* Content Side */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  19th Century Noble Estate Complex
                </h3>
                <p className="text-gray-600 mb-4">
                  Historic estate built in the second half of the 19th century, former residence of Prince Sebastiano
                  Apostolico Orsini Ducas. Featured in films by renowned director Ferzan Ozpetek. Complete with noble villa,
                  historic tower, and extensive estate buildings.
                </p>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-1 gap-4 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-600">Price on Request</div>
                  <div className="text-sm text-gray-600">Exclusive Estate Complex</div>
                </div>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <Building className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-gray-900">5,900</div>
                  <div className="text-sm text-gray-600">Sqm Covered</div>
                </div>
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-gray-900">47</div>
                  <div className="text-sm text-gray-600">Hectares Total</div>
                </div>
                <div className="text-center">
                  <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-gray-900">40</div>
                  <div className="text-sm text-gray-600">Planned Suites</div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Euro className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-gray-900">Historic Features & Development</span>
                </div>
                <div className="text-sm text-gray-700">
                  • Neoclassical villa with period architectural details<br />
                  • Historic tower and noble reception rooms<br />
                  • Hotel project approved for 40 luxury suites<br />
                  • Only 3km from Lecce, 40km from Brindisi Airport<br />
                  • Film location heritage adds unique marketing value
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/consultation"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold text-center hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  Request Information
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/consultation"
                  className="flex-1 bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg font-semibold text-center hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                >
                  Schedule Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Estate Development Context Section */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Development Opportunity: Luxury Resort Complex</h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover the exceptional potential of this historic estate for luxury hospitality development
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Left Column - Estate History */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Building className="w-4 h-4 text-blue-600" />
                    </div>
                    Royal Heritage & Film Location
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    This extraordinary estate served as the countryside residence of <strong>Prince Sebastiano Apostolico Orsini Ducas</strong>
                    (1853-1931) and gained international recognition as a filming location for acclaimed director <strong>Ferzan Ozpetek's "Mine Vaganti"</strong>.
                    During WWII, the villa hosted the Savoy royal family before their exile.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-blue-100">
                  <h5 className="font-semibold text-gray-900 mb-3">Historical Significance</h5>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• <strong>Royal Connection:</strong> Former residence of Italian nobility</li>
                    <li>• <strong>Film Heritage:</strong> Featured in internationally acclaimed cinema</li>
                    <li>• <strong>Political History:</strong> Connected to Giuseppe Grassi (Minister & Constituent Assembly)</li>
                    <li>• <strong>Architectural Value:</strong> Neoclassical design with period details</li>
                  </ul>
                </div>
              </div>

              {/* Right Column - Development Plans */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                    </div>
                    Approved Development Project
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    The estate includes <strong>approved hotel development plans</strong> transforming historic buildings into luxury
                    hospitality spaces: reception, wedding halls, wellness center, restaurant, and 40 premium suites.
                    Strategic location just 3km from Lecce provides excellent accessibility.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-purple-100">
                    <h6 className="font-semibold text-purple-800 mb-2">Development Features</h6>
                    <div className="text-sm text-gray-700 space-y-1">
                      <p>• <strong>Villa restoration</strong> with noble reception areas</p>
                      <p>• <strong>Wellness center</strong> in historic wine cellars</p>
                      <p>• <strong>Event spaces</strong> including wedding facilities</p>
                      <p>• <strong>40 luxury suites</strong> (40 sqm each) in new construction</p>
                    </div>
                  </div>

                  <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                    <h6 className="font-semibold text-indigo-800 mb-2">Investment Opportunity</h6>
                    <p className="text-sm text-indigo-700">
                      <strong>Luxury resort development</strong> - This historic estate offers unique positioning as both a
                      heritage luxury hotel and film tourism destination, providing exceptional ROI potential in Puglia's
                      growing luxury hospitality market.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                <Shield className="w-4 h-4" />
                Strategic Location for Luxury Resort Development
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}