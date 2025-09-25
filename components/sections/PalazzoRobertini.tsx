'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Euro, TrendingUp, Building, Percent, ArrowRight, Clock, Lock, Shield, ChevronLeft, ChevronRight } from 'lucide-react'
import CloudinaryImage from '@/components/properties/CloudinaryImage'
import OTPVerification from '@/components/auth/OTPVerification'

export default function PalazzoRobertini() {
  const [isVerified, setIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Property images array from updated collection
  const propertyImages = [
    {
      src: "https://res.cloudinary.com/dusubfxgo/image/upload/v1758822064/strada_vista_hhbya2.png",
      alt: "Palazzo Robertini - Street view perspective"
    },
    {
      src: "https://res.cloudinary.com/dusubfxgo/image/upload/v1758824497/BW_outside_2_payo1b.png",
      alt: "Palazzo Robertini - Exterior black and white architectural view"
    },
    {
      src: "https://res.cloudinary.com/dusubfxgo/image/upload/v1758823390/ingresso_dbsvgd.png",
      alt: "Palazzo Robertini - Historic entrance hall"
    },
    {
      src: "https://res.cloudinary.com/dusubfxgo/image/upload/v1758823392/salone_kekekh.png",
      alt: "Palazzo Robertini - Grand salon with historic features"
    },
    {
      src: "https://res.cloudinary.com/dusubfxgo/image/upload/v1758823393/salone_1_g5xkya.png",
      alt: "Palazzo Robertini - Noble salon interior view 1"
    },
    {
      src: "https://res.cloudinary.com/dusubfxgo/image/upload/v1758823393/salone_2_nu1u5c.png",
      alt: "Palazzo Robertini - Noble salon interior view 2"
    },
    {
      src: "https://res.cloudinary.com/dusubfxgo/image/upload/v1758823391/sala_ugraja.png",
      alt: "Palazzo Robertini - Historic reception hall"
    },
    {
      src: "https://res.cloudinary.com/dusubfxgo/image/upload/v1758823390/ceiling_rbk7vn.png",
      alt: "Palazzo Robertini - Ornate baroque ceiling details"
    },
    {
      src: "https://res.cloudinary.com/dusubfxgo/image/upload/v1758823390/finestra_dettaglio_wcxmxm.png",
      alt: "Palazzo Robertini - Historic window architectural detail"
    },
    {
      src: "https://res.cloudinary.com/dusubfxgo/image/upload/v1758821735/image1-08_ledtuk.png",
      alt: "Palazzo Robertini - Interior architectural elements"
    },
    {
      src: "https://res.cloudinary.com/dusubfxgo/image/upload/v1758821736/image1-51_ax0fia.png",
      alt: "Palazzo Robertini - Historic stone architectural details"
    },
    {
      src: "https://res.cloudinary.com/dusubfxgo/image/upload/v1758821736/image1-64_iwvwvz.png",
      alt: "Palazzo Robertini - Interior historic elements"
    },
    {
      src: "https://res.cloudinary.com/dusubfxgo/image/upload/v1758821735/image1-14_txntdz.png",
      alt: "Palazzo Robertini - Additional interior features"
    }
  ]

  // Floor plans (separate from main gallery)
  const floorPlans = [
    {
      src: "https://res.cloudinary.com/dusubfxgo/image/upload/v1758823390/Floorplan_Ground_floor_d4wvv7.png",
      alt: "Palazzo Robertini - Ground Floor Plan",
      title: "Ground Floor",
      description: "Historic entrance, reception areas, and service spaces"
    },
    {
      src: "https://res.cloudinary.com/dusubfxgo/image/upload/v1758823390/Floorplan_first_floor_on2zkt.png",
      alt: "Palazzo Robertini - First Floor Plan",
      title: "Piano Nobile (Noble Floor)",
      description: "540 sqm of historic noble halls, perfect for luxury suites"
    }
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % propertyImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + propertyImages.length) % propertyImages.length)
  }

  useEffect(() => {
    // Check if user has already verified (session storage for this demo)
    const hasAccess = sessionStorage.getItem('palazzo-robertini-access')
    if (hasAccess) {
      const accessData = JSON.parse(hasAccess)
      if (accessData.expiresAt > Date.now()) {
        setIsVerified(true)
      } else {
        sessionStorage.removeItem('palazzo-robertini-access')
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
    sessionStorage.setItem('palazzo-robertini-access', JSON.stringify(accessData))
    setIsVerified(true)
  }

  // Show loading state
  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-amber-200 rounded-lg w-64 mx-auto mb-4"></div>
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
        title="Access Palazzo Robertini"
        subtitle="This exclusive 16th century palace requires SMS verification to view details"
      />
    )
  }
  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="inline-block bg-orange-500 text-white px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wide animate-pulse">
              Historic Palace Investment
            </div>
            <div className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full font-semibold text-sm">
              <Shield className="w-4 h-4" />
              Verified Access
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Palazzo Robertini-Leuzzi - 16th Century Nobility
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-2">
            Late 15th Century Historic Palace in Galatina Historic Center
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Exceptional noble residence with 17th century baroque features - Perfect for luxury boutique hotel
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
                <span className="bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  16th Century Heritage
                </span>
              </div>
              <div className="absolute top-6 right-6">
                <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
                  NOBLE PALACE!
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
                  16th Century Noble Residence
                </h3>
                <p className="text-gray-600 mb-4">
                  Magnificent historic palace built in the late 1400s, inhabited by the Robertini family since 1540.
                  Enhanced in 1680 with baroque 17th-century features by Domenica Robertini, wife of Baron Giacinto Leuzzi.
                </p>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-1 gap-4 mb-8">
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-amber-600">€1,200,000</div>
                  <div className="text-sm text-gray-600">Purchase Price</div>
                </div>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <Building className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-gray-900">1,100</div>
                  <div className="text-sm text-gray-600">Sqm Total</div>
                </div>
                <div className="text-center">
                  <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-gray-900">540</div>
                  <div className="text-sm text-gray-600">Sqm Piano Nobile</div>
                </div>
                <div className="text-center">
                  <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-gray-900">15-20</div>
                  <div className="text-sm text-gray-600">Luxury Suites</div>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Euro className="h-5 w-5 text-amber-600" />
                  <span className="font-semibold text-gray-900">Historic Features</span>
                </div>
                <div className="text-sm text-gray-700">
                  • Original 1700s Salentine cement tile floors<br />
                  • Imposing columns and built-in wardrobes<br />
                  • Original wooden doors and baroque windows<br />
                  • Elegant sequence of noble halls with scenic staircase
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/properties/palazzo-robertini-leuzzi"
                  className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-center hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  View Full Details
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/consultation"
                  className="flex-1 bg-white text-amber-600 border-2 border-amber-600 px-6 py-3 rounded-lg font-semibold text-center hover:bg-amber-50 transition-all flex items-center justify-center gap-2"
                >
                  Schedule Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Galatina Tourism Context Section */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Investment Context: Galatina's Tourism Renaissance</h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover why Palazzo Robertini sits at the heart of Puglia's next major tourism destination
              </p>
            </div>

            {/* Basilica Hero Image */}
            <div className="mb-12">
              <div className="relative h-64 lg:h-80 rounded-xl overflow-hidden shadow-lg">
                <CloudinaryImage
                  src="https://res.cloudinary.com/dusubfxgo/image/upload/v1758825193/basilica_galatina_whe1fk.png"
                  alt="Basilica of Saint Catherine of Alexandria in Galatina - Gothic masterpiece"
                  className="w-full h-full object-cover"
                  width={1200}
                  height={600}
                  quality="auto"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      Basilica of Saint Catherine of Alexandria
                    </h4>
                    <p className="text-sm text-gray-600">
                      Gothic masterpiece (1369-1391) - Galatina's crown jewel driving cultural tourism growth
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Left Column - Basilica History */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                      <Building className="w-4 h-4 text-amber-600" />
                    </div>
                    The Basilica of Saint Catherine: A Gothic Masterpiece
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    Galatina, in Lecce province, is renowned for its <strong>Basilica of Saint Catherine of Alexandria</strong>,
                    a masterpiece of Gothic architecture whose layered history makes it a standout destination in southern Italy.
                    Commissioned by Raimondello Orsini del Balzo between 1369-1391, this Gothic marvel features ornate facades,
                    vibrant 15th and 17th-century frescoes, and a cloister with 1696 frescoes by Fra' Giuseppe da Gravina.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-blue-100">
                  <h5 className="font-semibold text-gray-900 mb-3">Historical Significance</h5>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• <strong>Late 14th Century Origins:</strong> Built 1369-1391 by Raimondello Orsini del Balzo</li>
                    <li>• <strong>Crusader Legend:</strong> Houses Saint Catherine's finger relic from the Crusades</li>
                    <li>• <strong>Artistic Heritage:</strong> Features the 'Madonna della Mela' fresco from late 13th century</li>
                    <li>• <strong>Gothic-Byzantine Fusion:</strong> Unique architectural synthesis attracts scholars worldwide</li>
                  </ul>
                </div>
              </div>

              {/* Right Column - Tourism Growth */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    Tourism Growth Potential
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    Galatina remains <strong>underappreciated compared to Lecce, Otranto, and Gallipoli</strong>, creating
                    exceptional investment opportunities. The town is clean, well-maintained, and offers enthusiastic tourist
                    services with guided tours, making it accessible and welcoming for the growing cultural tourism market.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-green-100">
                    <h6 className="font-semibold text-green-800 mb-2">Key Tourism Assets</h6>
                    <div className="text-sm text-gray-700 space-y-1">
                      <p>• <strong>Unique Gothic & Baroque architecture</strong></p>
                      <p>• <strong>Rich cultural festivals</strong> centered on historic sites</p>
                      <p>• <strong>Authentic local experiences</strong> with traditional cuisine</p>
                      <p>• <strong>Strategic proximity</strong> to coastal attractions and vineyards</p>
                    </div>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <h6 className="font-semibold text-amber-800 mb-2">Investment Opportunity</h6>
                    <p className="text-sm text-amber-700">
                      <strong>Sustainable cultural tourism hub</strong> - Galatina's basilica drives the city's cultural
                      identity and tourism prospects, offering visitors a memorable journey through southern Italy's
                      history while providing exceptional ROI potential for luxury hospitality investments.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                <Shield className="w-4 h-4" />
                Strategic Location for Heritage Tourism Investment
              </div>
            </div>
          </div>
        </div>

        {/* Floor Plans Section */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Floor Plans</h3>
            <p className="text-gray-600">Detailed architectural layouts of the historic palace</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {floorPlans.map((plan, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <div className="relative h-64 bg-gray-100">
                  <CloudinaryImage
                    src={plan.src}
                    alt={plan.alt}
                    className="w-full h-full object-contain p-4"
                    width={600}
                    height={400}
                    quality="auto"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Placeholder for missing floor plans */}
                  <div className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-dashed border-amber-300">
                    <div className="text-center p-6">
                      <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Building className="w-8 h-8 text-amber-600" />
                      </div>
                      <h4 className="text-lg font-semibold text-amber-800 mb-2">{plan.title}</h4>
                      <p className="text-sm text-amber-600 mb-4">{plan.description}</p>
                      <div className="text-xs text-amber-500">
                        Floor plan available upon request
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{plan.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{plan.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {index === 0 ? "560 sqm total" : "540 sqm noble spaces"}
                    </div>
                    <button className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center gap-1">
                      <ArrowRight className="w-4 h-4" />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}