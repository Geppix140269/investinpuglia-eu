'use client'

import { useState } from 'react'
import { PropertyFilter } from '@/lib/properties/types'
import { Search, Filter, X } from 'lucide-react'

interface PropertyFilterProps {
  onFilterChange: (filters: PropertyFilter) => void
  locations: string[]
}

export default function PropertyFilterComponent({ onFilterChange, locations }: PropertyFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<PropertyFilter>({})

  const propertyTypes = [
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'land', label: 'Land' },
    { value: 'hotel', label: 'Hotel' },
    { value: 'historic', label: 'Historic' }
  ]

  const handleFilterChange = (newFilters: Partial<PropertyFilter>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFilterChange(updated)
  }

  const clearFilters = () => {
    setFilters({})
    onFilterChange({})
  }

  const activeFiltersCount = Object.values(filters).filter(v => 
    v !== undefined && v !== null && (Array.isArray(v) ? v.length > 0 : true)
  ).length

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Filter Properties</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center gap-2 text-purple-600 hover:text-purple-700"
        >
          <Filter className="h-5 w-5" />
          {activeFiltersCount > 0 && (
            <span className="bg-purple-600 text-white rounded-full px-2 py-1 text-xs">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      <div className={`space-y-4 ${!isOpen && 'hidden md:block'}`}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Type
          </label>
          <div className="flex flex-wrap gap-2">
            {propertyTypes.map(type => (
              <button
                key={type.value}
                onClick={() => {
                  const currentTypes = filters.type || []
                  const updated = currentTypes.includes(type.value as any)
                    ? currentTypes.filter(t => t !== type.value)
                    : [...currentTypes, type.value as any]
                  handleFilterChange({ type: updated.length ? updated : undefined })
                }}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filters.type?.includes(type.value as any)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Min Price (€)
            </label>
            <input
              type="number"
              placeholder="0"
              value={filters.priceMin || ''}
              onChange={(e) => handleFilterChange({ 
                priceMin: e.target.value ? Number(e.target.value) : undefined 
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Price (€)
            </label>
            <input
              type="number"
              placeholder="Any"
              value={filters.priceMax || ''}
              onChange={(e) => handleFilterChange({ 
                priceMax: e.target.value ? Number(e.target.value) : undefined 
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Min Size (m²)
            </label>
            <input
              type="number"
              placeholder="0"
              value={filters.squareMetersMin || ''}
              onChange={(e) => handleFilterChange({ 
                squareMetersMin: e.target.value ? Number(e.target.value) : undefined 
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Size (m²)
            </label>
            <input
              type="number"
              placeholder="Any"
              value={filters.squareMetersMax || ''}
              onChange={(e) => handleFilterChange({ 
                squareMetersMax: e.target.value ? Number(e.target.value) : undefined 
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <select
            value={filters.location?.[0] || ''}
            onChange={(e) => handleFilterChange({ 
              location: e.target.value ? [e.target.value] : undefined 
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="w-full md:w-auto px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <X className="h-4 w-4" />
            Clear Filters
          </button>
        )}
      </div>
    </div>
  )
}