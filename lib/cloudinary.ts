import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary - using environment variables
cloudinary.config({
  cloud_name: 'dusubfxgo',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

export default cloudinary

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

// Helper function to upload images with advanced optimization
export async function uploadImage(imagePath: string, folder: string = 'properties', options: any = {}) {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: `${CLOUDINARY_FOLDER}/${folder}`,
      resource_type: 'auto',
      quality: 'auto:best',
      fetch_format: 'auto',
      eager: [
        { width: 640, crop: 'scale', quality: 'auto:good', fetch_format: 'auto' },
        { width: 768, crop: 'scale', quality: 'auto:good', fetch_format: 'auto' },
        { width: 1024, crop: 'scale', quality: 'auto:good', fetch_format: 'auto' },
        { width: 1280, crop: 'scale', quality: 'auto:best', fetch_format: 'auto' },
        { width: 1920, crop: 'scale', quality: 'auto:best', fetch_format: 'auto' }
      ],
      eager_async: true,
      ...options
    })
    return result
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error)
    throw error
  }
}

// Helper function to get optimized URL with advanced features
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

  const transformations: any = {
    quality,
    format,
    fetch_format: fetchFormat,
    flags: flags.join('.')
  }

  if (width) transformations.width = width
  if (height) transformations.height = height
  if (dpr) transformations.dpr = dpr
  if (crop) transformations.crop = crop
  if (gravity) transformations.gravity = gravity
  if (aspectRatio) transformations.aspect_ratio = aspectRatio
  if (effect) transformations.effect = effect
  if (overlay) transformations.overlay = overlay
  
  return cloudinary.url(publicId, {
    transformation: [transformations],
    secure: true
  })
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

  const transformations: any = {
    quality,
    format,
    video_codec: codec
  }

  if (width) transformations.width = width
  if (height) transformations.height = height

  return cloudinary.url(publicId, {
    resource_type: 'video',
    transformation: [transformations],
    secure: true
  })
}