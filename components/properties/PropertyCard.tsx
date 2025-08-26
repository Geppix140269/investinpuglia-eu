'use client'

import Link from 'next/link'
import { Property } from '@/lib/properties/types'
import { MapPin, Home, Euro, Maximize } from 'lucide-react'
import CloudinaryImage from './CloudinaryImage'

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <Link href={`/properties/${property.slug}`}>
      <div className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        <div className="relative h-64 overflow-hidden">
          <CloudinaryImage
            src={property.images[0]?.url || 'https://res.cloudinary.com/dusubfxgo/image/upload/v1756236779/investinpuglia/properties/generic/trulli-alberobello.jpg'}
            alt={property.images[0]?.alt || property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            width={600}
            height={400}
            quality="auto"
          />
          {property.featured && (
            <span className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Featured
            </span>
          )}
          <span className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold capitalize">
            {property.type}
          </span>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
            {property.title}
          </h3>
          
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.location.city}, {property.location.province}</span>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {property.description.short}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div className="flex items-center text-gray-600">
              <Maximize className="h-4 w-4 mr-1" />
              <span>{property.details.squareMeters} m²</span>
            </div>
            {property.details.bedrooms && (
              <div className="flex items-center text-gray-600">
                <Home className="h-4 w-4 mr-1" />
                <span>{property.details.bedrooms} bedrooms</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-2xl font-bold text-purple-600">
              {formatPrice(property.price)}
            </div>
            {property.investment.potentialReturn && (
              <span className="text-sm text-emerald-600 font-semibold">
                {property.investment.potentialReturn.split(' ')[0]} ROI
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}