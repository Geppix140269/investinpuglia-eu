// Client-safe Cloudinary utilities (no server-side dependencies)
'use client'

export const CLOUDINARY_CLOUD_NAME = 'dusubfxgo'
export const CLOUDINARY_FOLDER = 'investinpuglia'

// Advanced optimization options interface
export interface CloudinaryOptimizationOptions {
  width?: number
  height?: number
  quality?: 'auto' | 'auto:best' | 'auto:good' | 'auto:eco' | 'auto:low' | number
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png'
  dpr?: 'auto' | number
  responsive?: boolean
  lazy?: boolean
  placeholder?: 'blur' | 'pixelate' | 'vectorize' | 'predominant-color'
  aspectRatio?: string
  crop?: 'fill' | 'fit' | 'limit' | 'pad' | 'scale' | 'thumb'
  gravity?: 'auto' | 'face' | 'faces' | 'center' | 'north' | 'south' | 'east' | 'west'
  effect?: string
  overlay?: string
  fetchFormat?: 'auto'
  flags?: string[]
}

// Helper function to build Cloudinary URL manually (client-safe)
export function getOptimizedUrl(publicId: string, options: CloudinaryOptimizationOptions = {}) {
  const {
    width,
    height,
    quality = 'auto:best',
    format = 'auto',
    dpr = 'auto',
    crop = 'fill',
    gravity = 'auto',
    aspectRatio,
    effect,
    overlay,
    fetchFormat = 'auto',
    flags = ['progressive', 'immutable_cache']
  } = options

  // Build transformation string
  const transformations: string[] = []
  
  if (width) transformations.push(`w_${width}`)
  if (height) transformations.push(`h_${height}`)
  if (quality) transformations.push(`q_${quality}`)
  if (format) transformations.push(`f_${format}`)
  if (dpr) transformations.push(`dpr_${dpr}`)
  if (crop) transformations.push(`c_${crop}`)
  if (gravity) transformations.push(`g_${gravity}`)
  if (aspectRatio) transformations.push(`ar_${aspectRatio}`)
  if (effect) transformations.push(`e_${effect}`)
  if (overlay) transformations.push(`l_${overlay}`)
  if (fetchFormat) transformations.push(`fl_${fetchFormat}`)
  if (flags && flags.length > 0) transformations.push(`fl_${flags.join('.')}`)

  const transformation = transformations.join(',')
  
  // Build the URL
  const baseUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}`
  const resourceType = publicId.includes('.mp4') || publicId.includes('.webm') ? 'video' : 'image'
  const uploadType = 'upload'
  
  if (transformation) {
    return `${baseUrl}/${resourceType}/${uploadType}/${transformation}/${publicId}`
  }
  
  return `${baseUrl}/${resourceType}/${uploadType}/${publicId}`
}

// Generate responsive image URLs for different breakpoints
export function getResponsiveUrls(publicId: string, baseOptions: CloudinaryOptimizationOptions = {}) {
  const breakpoints = [640, 768, 1024, 1280, 1536, 1920]
  const urls: Record<string, string> = {}
  
  breakpoints.forEach(width => {
    urls[`${width}w`] = getOptimizedUrl(publicId, {
      ...baseOptions,
      width,
      quality: width <= 768 ? 'auto:eco' : 'auto:best'
    })
  })
  
  return urls
}

// Generate srcset string for responsive images
export function generateSrcSet(publicId: string, sizes: number[] = [640, 768, 1024, 1280, 1536, 1920]) {
  return sizes
    .map(size => {
      const url = getOptimizedUrl(publicId, {
        width: size,
        quality: 'auto:best',
        format: 'auto'
      })
      return `${url} ${size}w`
    })
    .join(', ')
}

// Get placeholder URL for lazy loading
export function getPlaceholderUrl(publicId: string) {
  return getOptimizedUrl(publicId, {
    width: 20,
    quality: 10,
    effect: 'blur:1000',
    format: 'auto'
  })
}

// Get video optimized URL
export function getVideoOptimizedUrl(publicId: string, options: {
  width?: number
  height?: number
  format?: 'mp4' | 'webm' | 'auto'
  quality?: 'auto' | number
  codec?: string
} = {}) {
  const {
    width,
    height,
    format = 'auto',
    quality = 'auto',
    codec = 'auto'
  } = options

  const transformations: string[] = []
  
  if (width) transformations.push(`w_${width}`)
  if (height) transformations.push(`h_${height}`)
  if (quality) transformations.push(`q_${quality}`)
  if (format) transformations.push(`f_${format}`)
  if (codec && codec !== 'auto') transformations.push(`vc_${codec}`)

  const transformation = transformations.join(',')
  const baseUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload`
  
  if (transformation) {
    return `${baseUrl}/${transformation}/${publicId}`
  }
  
  return `${baseUrl}/${publicId}`
}