'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Euro, TrendingUp, Building, Percent, ArrowRight, Shield, ChevronLeft, ChevronRight, Lock, Star, Crown } from 'lucide-react'
import CloudinaryImage from '@/components/properties/CloudinaryImage'

interface OpportunityData {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  price: string
  priceLabel: string
  grant?: string
  grantLabel?: string
  stats: Array<{
    icon: any
    value: string
    label: string
  }>
  highlights: string[]
  cta: {
    primary: {
      text: string
      href: string
    }
    secondary: {
      text: string
      href: string
    }
  }
  badges: Array<{
    text: string
    color: string
  }>
  isConfidential?: boolean
}

export default function ExclusiveOpportunitiesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const opportunities: OpportunityData[] = [
    {
      id: 'palazzo-palmariggi',
      title: 'Palazzo Palmariggi',
      subtitle: 'Historic Investment Deal',
      description: 'Magnificent early 20th century palazzo spanning 1,300 sqm with 5,000 sqm buildable land. Original Salento vaulted ceilings and elegant coffered details throughout.',
      image: 'https://res.cloudinary.com/dusubfxgo/image/upload/v1756236762/investinpuglia/properties/palazzo-palmariggi/palazzo-exterior.jpg',
      price: '€1,250,000',
      priceLabel: 'Purchase Price',
      grant: '€1,405,000',
      grantLabel: 'Mini PIA Grant (50%)',
      stats: [
        {
          icon: Building,
          value: '1,300',
          label: 'Sqm Interior'
        },
        {
          icon: Percent,
          value: '50%',
          label: 'Grant Available'
        },
        {
          icon: TrendingUp,
          value: '20-30',
          label: 'Hotel Rooms'
        }
      ],
      highlights: [
        'Eligible for 50% Mini PIA grant (up to €1.5M non-refundable)',
        'Total investment €2,810,000 (€1,250,000 purchase + €1,560,000 renovation)',
        'Save €200,000 on purchase price!',
        'Historic building in growing tourism market'
      ],
      cta: {
        primary: {
          text: 'View Full Details',
          href: '/properties/palazzo-palmariggi'
        },
        secondary: {
          text: 'Schedule Consultation',
          href: '/consultation'
        }
      },
      badges: [
        { text: 'Mini PIA Eligible', color: 'emerald' },
        { text: 'GREAT DEAL!', color: 'emerald' }
      ],
      isConfidential: false
    },
    {
      id: 'palazzo-robertini',
      title: 'Noble Historic Palazzo',
      subtitle: '16th Century Heritage',
      description: 'Magnificent historic palace built in the late 1400s, inhabited by the Robertini family since 1540. Enhanced in 1680 with baroque 17th-century features by Domenica Robertini.',
      image: 'https://res.cloudinary.com/dusubfxgo/image/upload/v1758822064/strada_vista_hhbya2.png',
      price: '€1,200,000',
      priceLabel: 'Purchase Price',
      stats: [
        {
          icon: Building,
          value: '1,100',
          label: 'Sqm Total'
        },
        {
          icon: Crown,
          value: '540',
          label: 'Sqm Piano Nobile'
        },
        {
          icon: TrendingUp,
          value: '15-20',
          label: 'Luxury Suites'
        }
      ],
      highlights: [
        'Original 1700s Salentine cement tile floors',
        'Imposing columns and built-in wardrobes',
        'Original wooden doors and baroque windows',
        'Located in historic town with UNESCO-level cultural significance'
      ],
      cta: {
        primary: {
          text: 'Verify & Access Details',
          href: '/exclusive/palazzo-robertini'
        },
        secondary: {
          text: 'Request Information',
          href: '/consultation'
        }
      },
      badges: [
        { text: '16th Century Heritage', color: 'amber' },
        { text: 'CONFIDENTIAL', color: 'red' }
      ],
      isConfidential: true
    },
    {
      id: 'salento-wellbeing-resort',
      title: 'Salento Wellbeing Resort',
      subtitle: 'Eco-Integrated Development',
      description: 'Pioneering eco-integrated wellbeing resort development. 169,000 sqm tourism-zoned land with approved buildable volume. Wellness center, beach club, and 470,000 sqm expansion land available.',
      image: 'https://res.cloudinary.com/dusubfxgo/image/upload/v1758822064/strada_vista_hhbya2.png',
      price: 'Confidential',
      priceLabel: 'Investment Opportunity',
      stats: [
        {
          icon: Building,
          value: '169,000',
          label: 'Sqm Tourism-Zoned'
        },
        {
          icon: TrendingUp,
          value: '26,000',
          label: 'Sqm GFA'
        },
        {
          icon: Star,
          value: '470,000',
          label: 'Sqm Expansion Land'
        }
      ],
      highlights: [
        'Strategic Salento location with approved zoning',
        'Eco-integrated sustainable design with ESG alignment',
        'Beach club access and destination wellness center',
        'Massive expansion potential with adjacent land bank'
      ],
      cta: {
        primary: {
          text: 'View Investment Brief',
          href: '/projects/salento-wellbeing-resort'
        },
        secondary: {
          text: 'Request Information',
          href: '/consultation'
        }
      },
      badges: [
        { text: 'Eco-Integrated', color: 'emerald' },
        { text: 'CONFIDENTIAL', color: 'red' }
      ],
      isConfidential: true
    },
    {
      id: 'villaggio-in-salento',
      title: 'Villaggio in Salento',
      subtitle: 'Turnkey Tourist Resort',
      description: 'Comprehensive tourist village resort featuring 100+ guest rooms, restaurant & bar, wellness center, conference facilities, swimming pools, and sports amenities. Fully operational with multiple revenue streams.',
      image: 'https://res.cloudinary.com/dusubfxgo/image/upload/v1758822064/strada_vista_hhbya2.png',
      price: 'Upon Request',
      priceLabel: 'Investment',
      stats: [
        {
          icon: Building,
          value: '25,100',
          label: 'Sqm Plot'
        },
        {
          icon: TrendingUp,
          value: '100+',
          label: 'Guest Rooms'
        },
        {
          icon: Euro,
          value: 'Multiple',
          label: 'Revenue Streams'
        }
      ],
      highlights: [
        'Turnkey operational resort in prime Salento location',
        'Energy-efficient infrastructure with solar panels',
        'Restaurant, wellness center, pools, and event facilities',
        'Fully compliant with all building permits'
      ],
      cta: {
        primary: {
          text: 'View Full Details',
          href: '/projects/villaggio-in-salento'
        },
        secondary: {
          text: 'Request Information',
          href: '/consultation'
        }
      },
      badges: [
        { text: 'Turnkey Resort', color: 'blue' },
        { text: 'OPERATIONAL', color: 'emerald' }
      ],
      isConfidential: false
    },
    {
      id: 'project-estate-19',
      title: 'Project Estate-19',
      subtitle: 'Exclusive Historic Estate',
      description: 'Confidential historic estate property in Puglia. A rare opportunity to acquire a significant heritage property with exceptional investment potential. Full property details available upon confidentiality agreement execution.',
      image: 'https://res.cloudinary.com/dusubfxgo/image/upload/v1758822064/strada_vista_hhbya2.png',
      price: 'Upon Request',
      priceLabel: 'Investment',
      stats: [
        {
          icon: Building,
          value: 'Disclosed',
          label: 'Upon NDA'
        },
        {
          icon: Shield,
          value: 'High',
          label: 'ROI Potential'
        },
        {
          icon: TrendingUp,
          value: 'Elite',
          label: 'Investment Class'
        }
      ],
      highlights: [
        'Exceptional heritage estate in prime location',
        'Perfect for luxury hospitality development',
        'Located in high-growth tourism area',
        'Full details available upon signed confidentiality agreement'
      ],
      cta: {
        primary: {
          text: 'Sign NDA & Access Details',
          href: '/consultation'
        },
        secondary: {
          text: 'Request Information',
          href: '/consultation'
        }
      },
      badges: [
        { text: 'Project Estate-19', color: 'purple' },
        { text: 'CONFIDENTIAL', color: 'red' }
      ],
      isConfidential: true
    }
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % opportunities.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + opportunities.length) % opportunities.length)
  }

  const currentOpportunity = opportunities[currentIndex]
  const IconComponent = currentOpportunity.stats[0].icon

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block bg-emerald-600 text-white px-6 py-2 rounded-full font-bold text-sm mb-6 uppercase tracking-wide">
            Featured Investment Opportunities
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Exclusive Properties Portfolio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-2">
            Carefully curated investment opportunities in Puglia's most prestigious properties
          </p>
        </div>

        {/* Carousel Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-6xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Side */}
            <div className="relative h-96 lg:h-[500px]">
              <CloudinaryImage
                src={currentOpportunity.image}
                alt={`${currentOpportunity.title} - ${currentOpportunity.subtitle}`}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  currentOpportunity.isConfidential ? 'blur-sm scale-105' : ''
                }`}
                width={800}
                height={600}
                quality="auto"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Confidential Overlay */}
              {currentOpportunity.isConfidential && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="bg-yellow-500 rounded-full p-6 mb-4 mx-auto w-fit">
                      <Lock className="w-8 h-8 text-black" />
                    </div>
                    <p className="text-lg font-semibold mb-2">EXCLUSIVE ACCESS</p>
                    <p className="text-sm text-gray-300">Verification required for full details</p>
                  </div>
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-6 left-6">
                <span className={`bg-${currentOpportunity.badges[0].color}-600 text-white px-4 py-2 rounded-full text-sm font-semibold`}>
                  {currentOpportunity.badges[0].text}
                </span>
              </div>
              <div className="absolute top-6 right-6">
                <span className={`bg-${currentOpportunity.badges[1].color}-600 text-white px-4 py-2 rounded-full text-sm font-semibold`}>
                  {currentOpportunity.badges[1].text}
                </span>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-10"
                aria-label="Previous opportunity"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-10"
                aria-label="Next opportunity"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Content Side */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {currentOpportunity.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {currentOpportunity.description}
                </p>
              </div>

              {/* Pricing */}
              <div className={`grid ${currentOpportunity.grant ? 'grid-cols-2' : 'grid-cols-1'} gap-4 mb-8`}>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-gray-900">{currentOpportunity.price}</div>
                  <div className="text-sm text-gray-600">{currentOpportunity.priceLabel}</div>
                </div>
                {currentOpportunity.grant && (
                  <div className="bg-emerald-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-emerald-600">{currentOpportunity.grant}</div>
                    <div className="text-sm text-gray-600">{currentOpportunity.grantLabel}</div>
                  </div>
                )}
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {currentOpportunity.stats.map((stat, index) => {
                  const StatIcon = stat.icon
                  const colors = ['purple', 'emerald', 'blue']
                  return (
                    <div key={index} className="text-center">
                      <StatIcon className={`h-8 w-8 text-${colors[index]}-600 mx-auto mb-2`} />
                      <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  )
                })}
              </div>

              {/* Highlights */}
              <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Euro className="h-5 w-5 text-yellow-600" />
                  <span className="font-semibold text-gray-900">Investment Highlights</span>
                </div>
                <div className="text-sm text-gray-700 space-y-1">
                  {currentOpportunity.highlights.map((highlight, index) => (
                    <div key={index}>• {highlight}</div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={currentOpportunity.cta.primary.href}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold text-center hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  {currentOpportunity.isConfidential && <Shield className="h-4 w-4" />}
                  {currentOpportunity.cta.primary.text}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={currentOpportunity.cta.secondary.href}
                  className="flex-1 bg-white text-purple-600 border-2 border-purple-600 px-6 py-3 rounded-lg font-semibold text-center hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
                >
                  {currentOpportunity.cta.secondary.text}
                </Link>
              </div>
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {opportunities.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-purple-600 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to opportunity ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            All properties verified and curated by our expert team
          </p>
        </div>
      </div>
    </section>
  )
}