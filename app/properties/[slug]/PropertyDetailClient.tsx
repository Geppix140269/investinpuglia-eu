'use client'

import { useState } from 'react'
import { MapPin, Euro, Maximize, Home, Calendar, Shield, TrendingUp, Plane, Waves, Check, ArrowLeft, Expand, Edit } from 'lucide-react'
import Link from 'next/link'
import CloudinaryImage from '@/components/properties/CloudinaryImage'
import ImageModal from '@/components/properties/ImageModal'
import { Property } from '@/lib/properties/types'
import { useAdmin } from '@/hooks/useAdmin'

export default function PropertyDetailClient({ property }: { property: Property }) {
  const [activeImage, setActiveImage] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [modalIndex, setModalIndex] = useState(0)
  const { isAdmin } = useAdmin()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button and Admin Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4">
        <div className="flex items-center justify-between">
          <Link href="/properties" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Properties
          </Link>
          {isAdmin && (
            <Link 
              href={`/admin/properties/${property.slug}/edit`}
              className="inline-flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Property
            </Link>
          )}
        </div>
      </div>

      {/* Property Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Image Gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
            <div 
              className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => {
                setModalIndex(activeImage)
                setShowModal(true)
              }}
            >
              <CloudinaryImage
                src={property.images[activeImage]?.url || 'https://res.cloudinary.com/dusubfxgo/image/upload/v1756236779/investinpuglia/properties/generic/trulli-alberobello.jpg'}
                alt={property.images[activeImage]?.alt || property.title}
                className="w-full h-full object-cover"
                width={1200}
                height={800}
                quality="auto"
                priority
                sizes="(max-width: 768px) 100vw, 80vw"
              />
              {property.featured && (
                <span className="absolute top-4 left-4 bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Featured Property
                </span>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <Expand className="text-white opacity-0 group-hover:opacity-100 transition-opacity h-10 w-10" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 max-h-[500px] overflow-y-auto">
              {property.images.map((image, index) => (
                <div
                  key={index}
                  className={`relative h-[115px] rounded-lg overflow-hidden cursor-pointer group ${
                    activeImage === index ? 'ring-4 ring-purple-600' : ''
                  }`}
                >
                  <div
                    onClick={() => setActiveImage(index)}
                    className="relative h-full"
                  >
                    <CloudinaryImage
                      src={image.url || 'https://res.cloudinary.com/dusubfxgo/image/upload/v1756236779/investinpuglia/properties/generic/trulli-alberobello.jpg'}
                      alt={image.alt}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      width={400}
                      height={300}
                      quality="auto"
                      sizes="(max-width: 768px) 25vw, 10vw"
                    />
                  </div>
                  <div 
                    onClick={(e) => {
                      e.stopPropagation()
                      setModalIndex(index)
                      setShowModal(true)
                    }}
                    className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center"
                  >
                    <Expand className="text-white opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Property Info */}
          <div className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {property.title}
                </h1>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="text-lg">{property.location.city}, {property.location.province}, {property.location.region}</span>
                </div>
                <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold capitalize">
                  {property.type}
                </span>
              </div>
              <div className="mt-6 lg:mt-0 text-right">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {formatPrice(property.price)}
                </div>
                <p className="text-gray-600">€{(property.price / property.details.squareMeters).toFixed(0)} per m²</p>
              </div>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-gray-200 mb-8">
              <div className="text-center">
                <Maximize className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{property.details.squareMeters}</p>
                <p className="text-sm text-gray-600">Square Meters</p>
              </div>
              {property.details.landSquareMeters && (
                <div className="text-center">
                  <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{property.details.landSquareMeters}</p>
                  <p className="text-sm text-gray-600">Land (m²)</p>
                </div>
              )}
              {property.details.bedrooms && (
                <div className="text-center">
                  <Home className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{property.details.bedrooms}</p>
                  <p className="text-sm text-gray-600">Bedrooms</p>
                </div>
              )}
              {property.details.yearBuilt && (
                <div className="text-center">
                  <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{property.details.yearBuilt}</p>
                  <p className="text-sm text-gray-600">Year Built</p>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Description</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {property.description.full}
                </p>

                {property.description.features && (
                  <>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                      {property.description.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-emerald-600 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {property.amenities && (
                  <>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Amenities</h3>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {property.amenities.map((amenity, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </>
                )}

                {/* Location Info */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.distanceToSea !== undefined && (
                    <div className="flex items-center">
                      <Waves className="h-5 w-5 text-blue-600 mr-3" />
                      <span className="text-gray-700">{property.distanceToSea} km to sea</span>
                    </div>
                  )}
                  {property.distanceToAirport !== undefined && (
                    <div className="flex items-center">
                      <Plane className="h-5 w-5 text-blue-600 mr-3" />
                      <span className="text-gray-700">{property.distanceToAirport} km to airport</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Investment Info Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-purple-50 to-emerald-50 rounded-xl p-6 sticky top-24">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <TrendingUp className="h-6 w-6 text-emerald-600 mr-2" />
                    Investment Potential
                  </h3>
                  
                  {property.investment.potentialReturn && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-1">Potential Return</p>
                      <p className="text-lg font-bold text-emerald-600">{property.investment.potentialReturn}</p>
                    </div>
                  )}

                  {property.description.investmentPotential && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-1">Investment Analysis</p>
                      <p className="text-gray-700">{property.description.investmentPotential}</p>
                    </div>
                  )}

                  {property.investment.suggestedUse && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Suggested Use</p>
                      <div className="space-y-1">
                        {property.investment.suggestedUse.map((use, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <Check className="h-4 w-4 text-emerald-600 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">{use}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {property.investment.grants && (
                    <div className="mb-6">
                      <p className="text-sm text-gray-600 mb-2">Available Grants</p>
                      <div className="flex flex-wrap gap-2">
                        {property.investment.grants.map((grant, index) => (
                          <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
                            {grant}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <a
                    href="/contact"
                    className="block w-full bg-gradient-to-r from-purple-600 to-emerald-600 text-white text-center py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                  >
                    Request Information
                  </a>
                  <p className="text-xs text-gray-600 text-center mt-3">
                    Get detailed investment analysis and ROI projections
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Modal */}
        {showModal && (
          <ImageModal
            images={property.images}
            initialIndex={modalIndex}
            onClose={() => setShowModal(false)}
          />
        )}

        {/* Contact CTA */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-emerald-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Interested in This Property?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Schedule a consultation with our investment team to discuss this opportunity 
            and explore financing options, including available EU grants.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/consultation"
              className="inline-block bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105"
            >
              FREE Expert Consultation →
            </Link>
            <a 
              href="/contact"
              className="inline-block bg-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-400 transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}