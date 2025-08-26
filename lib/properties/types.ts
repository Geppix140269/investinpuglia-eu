export interface Property {
  id: string
  title: string
  slug: string
  type: 'residential' | 'commercial' | 'land' | 'hotel' | 'historic'
  price: number
  currency: string
  location: {
    city: string
    province: string
    region: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  details: {
    squareMeters: number
    landSquareMeters?: number
    bedrooms?: number
    bathrooms?: number
    floors?: number
    yearBuilt?: number
    condition?: 'new' | 'renovated' | 'to-renovate' | 'historic'
  }
  description: {
    short: string
    full: string
    features?: string[]
    investmentPotential?: string
  }
  images: {
    url: string
    alt: string
    isPrimary?: boolean
  }[]
  investment: {
    potentialReturn?: string
    suggestedUse?: string[]
    grants?: string[]
    zoning?: string
  }
  amenities?: string[]
  distanceToSea?: number
  distanceToAirport?: number
  createdAt: Date
  updatedAt: Date
  featured?: boolean
  status: 'available' | 'under-offer' | 'sold'
}

export interface PropertyFilter {
  type?: Property['type'][]
  priceMin?: number
  priceMax?: number
  location?: string[]
  squareMetersMin?: number
  squareMetersMax?: number
  features?: string[]
}

export interface PropertySearchParams {
  filters?: PropertyFilter
  sort?: 'price-asc' | 'price-desc' | 'newest' | 'featured'
  page?: number
  limit?: number
}