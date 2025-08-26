'use client'

import { useState, useMemo } from 'react'
import PropertyCard from '@/components/properties/PropertyCard'
import PropertyFilterComponent from '@/components/properties/PropertyFilter'
import { mockProperties } from '@/lib/properties/data'
import { PropertyFilter } from '@/lib/properties/types'
import { Building2, TrendingUp } from 'lucide-react'

export default function PropertiesPage() {
  const [filters, setFilters] = useState<PropertyFilter>({})
  const [sortBy, setSortBy] = useState<string>('featured')

  const locations = useMemo(() => {
    const uniqueLocations = new Set(mockProperties.map(p => p.location.city))
    return Array.from(uniqueLocations).sort()
  }, [])

  const filteredAndSortedProperties = useMemo(() => {
    let filtered = [...mockProperties]

    // Apply filters
    if (filters.type?.length) {
      filtered = filtered.filter(p => filters.type?.includes(p.type))
    }
    if (filters.priceMin) {
      filtered = filtered.filter(p => p.price >= filters.priceMin!)
    }
    if (filters.priceMax) {
      filtered = filtered.filter(p => p.price <= filters.priceMax!)
    }
    if (filters.squareMetersMin) {
      filtered = filtered.filter(p => p.details.squareMeters >= filters.squareMetersMin!)
    }
    if (filters.squareMetersMax) {
      filtered = filtered.filter(p => p.details.squareMeters <= filters.squareMetersMax!)
    }
    if (filters.location?.length) {
      filtered = filtered.filter(p => filters.location?.includes(p.location.city))
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        break
      case 'featured':
      default:
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return 0
        })
    }

    return filtered
  }, [filters, sortBy])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Premium Investment Properties in Puglia
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Discover exclusive real estate opportunities in Southern Italy's most sought-after region. 
              From historic palazzos to seafront villas, find your perfect investment.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/20 backdrop-blur-md rounded-lg px-6 py-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-6 w-6" />
                  <span className="text-3xl font-bold">{mockProperties.length}</span>
                </div>
                <p className="text-sm text-purple-100">Available Properties</p>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-lg px-6 py-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6" />
                  <span className="text-3xl font-bold">15-20%</span>
                </div>
                <p className="text-sm text-purple-100">Average ROI</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <PropertyFilterComponent
              onFilterChange={setFilters}
              locations={locations}
            />
          </div>

          {/* Properties Grid */}
          <div className="lg:w-3/4">
            {/* Sort Options */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredAndSortedProperties.length} Properties Found
              </h2>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            {/* Properties Grid */}
            {filteredAndSortedProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredAndSortedProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more results</p>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-emerald-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Looking for Something Specific?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Our team has access to exclusive off-market properties and can help you find 
            the perfect investment opportunity in Puglia.
          </p>
          <a 
            href="/contact"
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105"
          >
            Contact Our Investment Team →
          </a>
        </div>
      </div>
    </div>
  )
}