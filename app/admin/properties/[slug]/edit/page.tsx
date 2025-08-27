'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { mockProperties } from '@/lib/properties/data'
import { Property } from '@/lib/properties/types'
import { ArrowLeft, Save, RotateCw, Upload, Trash2, Plus, Image } from 'lucide-react'
import CloudinaryImage from '@/components/properties/CloudinaryImage'

export default function EditPropertyPage() {
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string
  
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  useEffect(() => {
    // Find property by slug
    const found = mockProperties.find(p => p.slug === slug)
    if (found) {
      setProperty({ ...found })
    }
    setLoading(false)
  }, [slug])

  const handleSave = async () => {
    if (!property) return
    
    setSaving(true)
    try {
      const response = await fetch('/api/admin/properties/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(property)
      })
      
      if (response.ok) {
        alert('Property updated successfully!')
        router.push(`/properties/${property.slug}`)
      } else {
        alert('Failed to update property')
      }
    } catch (error) {
      console.error('Error saving property:', error)
      alert('Error saving property')
    } finally {
      setSaving(false)
    }
  }

  const handleImageRotate = (index: number) => {
    if (!property) return
    
    // For Cloudinary images, we can add transformation parameters
    const updatedImages = [...property.images]
    const currentUrl = updatedImages[index].url
    
    // Add or update rotation angle in URL
    let newUrl = currentUrl
    if (currentUrl.includes('cloudinary')) {
      // Check if already has transformations
      if (currentUrl.includes('/upload/')) {
        // Extract current transformations
        const parts = currentUrl.split('/upload/')
        const transformations = parts[1].split('/')[0]
        
        // Check if has angle transformation
        if (transformations.includes('a_')) {
          // Update existing angle
          const angleMatch = transformations.match(/a_(\d+)/)
          const currentAngle = angleMatch ? parseInt(angleMatch[1]) : 0
          const newAngle = (currentAngle + 90) % 360
          newUrl = currentUrl.replace(/a_\d+/, `a_${newAngle}`)
        } else {
          // Add angle transformation
          newUrl = currentUrl.replace('/upload/', `/upload/a_90/`)
        }
      } else {
        // No transformations yet
        newUrl = currentUrl.replace('/upload/', `/upload/a_90/`)
      }
    }
    
    updatedImages[index].url = newUrl
    setProperty({ ...property, images: updatedImages })
  }

  const handleImageDelete = (index: number) => {
    if (!property) return
    
    const updatedImages = property.images.filter((_, i) => i !== index)
    setProperty({ ...property, images: updatedImages })
  }

  const handleImageReplace = async (index: number) => {
    if (!property) return
    
    // Create file input and trigger click
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      
      // Here you would upload to Cloudinary
      // For now, we'll just show a placeholder
      const reader = new FileReader()
      reader.onload = (event) => {
        const updatedImages = [...property.images]
        updatedImages[index] = {
          ...updatedImages[index],
          url: event.target?.result as string
        }
        setProperty({ ...property, images: updatedImages })
      }
      reader.readAsDataURL(file)
    }
    input.click()
  }

  const handleAddImage = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.multiple = true
    input.onchange = async (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || [])
      
      for (const file of files) {
        const reader = new FileReader()
        reader.onload = (event) => {
          setProperty(prev => {
            if (!prev) return null
            return {
              ...prev,
              images: [
                ...prev.images,
                {
                  url: event.target?.result as string,
                  alt: file.name
                }
              ]
            }
          })
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading property...</div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Property not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Property</h1>
                <p className="text-gray-600">{property.title}</p>
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={property.title}
                    onChange={(e) => setProperty({ ...property, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price (€)
                    </label>
                    <input
                      type="number"
                      value={property.price}
                      onChange={(e) => setProperty({ ...property, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <select
                      value={property.type}
                      onChange={(e) => setProperty({ ...property, type: e.target.value as Property['type'] })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="land">Land</option>
                      <option value="hotel">Hotel</option>
                      <option value="historic">Historic</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={property.status}
                    onChange={(e) => setProperty({ ...property, status: e.target.value as Property['status'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="available">Available</option>
                    <option value="under-offer">Under Offer</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Location</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={property.location.city}
                    onChange={(e) => setProperty({
                      ...property,
                      location: { ...property.location, city: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Province
                  </label>
                  <input
                    type="text"
                    value={property.location.province}
                    onChange={(e) => setProperty({
                      ...property,
                      location: { ...property.location, province: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Property Details</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Interior Size (m²)
                  </label>
                  <input
                    type="number"
                    value={property.details.squareMeters}
                    onChange={(e) => setProperty({
                      ...property,
                      details: { ...property.details, squareMeters: Number(e.target.value) }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Land Size (m²)
                  </label>
                  <input
                    type="number"
                    value={property.details.landSquareMeters || ''}
                    onChange={(e) => setProperty({
                      ...property,
                      details: { ...property.details, landSquareMeters: e.target.value ? Number(e.target.value) : undefined }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    value={property.details.bedrooms || ''}
                    onChange={(e) => setProperty({
                      ...property,
                      details: { ...property.details, bedrooms: e.target.value ? Number(e.target.value) : undefined }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    value={property.details.bathrooms || ''}
                    onChange={(e) => setProperty({
                      ...property,
                      details: { ...property.details, bathrooms: e.target.value ? Number(e.target.value) : undefined }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Description</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Short Description
                  </label>
                  <textarea
                    value={property.description.short}
                    onChange={(e) => setProperty({
                      ...property,
                      description: { ...property.description, short: e.target.value }
                    })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Description
                  </label>
                  <textarea
                    value={property.description.full}
                    onChange={(e) => setProperty({
                      ...property,
                      description: { ...property.description, full: e.target.value }
                    })}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Images */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Images</h2>
                <button
                  onClick={handleAddImage}
                  className="text-purple-600 hover:text-purple-700 flex items-center gap-1 text-sm"
                >
                  <Plus className="h-4 w-4" />
                  Add Images
                </button>
              </div>
              
              <div className="space-y-3">
                {property.images.map((image, index) => (
                  <div
                    key={index}
                    className={`relative group border rounded-lg overflow-hidden ${
                      selectedImageIndex === index ? 'border-purple-500' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <div className="aspect-video relative">
                      {image.url.startsWith('data:') ? (
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <CloudinaryImage
                          src={image.url}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                          width={400}
                          height={300}
                        />
                      )}
                      
                      {image.isPrimary && (
                        <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                          Primary
                        </span>
                      )}
                    </div>
                    
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleImageRotate(index)
                          }}
                          className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                          title="Rotate"
                        >
                          <RotateCw className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleImageReplace(index)
                          }}
                          className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                          title="Replace"
                        >
                          <Upload className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            if (confirm('Delete this image?')) {
                              handleImageDelete(index)
                            }
                          }}
                          className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {property.images.length === 0 && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Image className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No images yet</p>
                    <button
                      onClick={handleAddImage}
                      className="mt-2 text-purple-600 hover:text-purple-700 text-sm font-medium"
                    >
                      Add Images
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}