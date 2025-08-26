'use client'

import { CldImage } from 'next-cloudinary'

interface CloudinaryImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  quality?: number | 'auto'
}

export default function CloudinaryImage({ 
  src, 
  alt, 
  width = 800, 
  height = 600,
  className = '',
  priority = false,
  fill = false,
  sizes,
  quality = 'auto'
}: CloudinaryImageProps) {
  // Extract public ID from Cloudinary URL if full URL is provided
  const getPublicId = (url: string) => {
    if (url.includes('cloudinary.com')) {
      const parts = url.split('/upload/')
      if (parts[1]) {
        // Remove version and file extension
        const publicIdWithExt = parts[1].replace(/v\d+\//, '')
        return publicIdWithExt.replace(/\.[^/.]+$/, '')
      }
    }
    // If not a Cloudinary URL, return as is (for local development)
    return url
  }

  const publicId = getPublicId(src)

  // For non-Cloudinary images (fallback)
  if (!src.includes('cloudinary') && !publicId.includes('investinpuglia')) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        loading={priority ? 'eager' : 'lazy'}
      />
    )
  }

  if (fill) {
    return (
      <CldImage
        src={publicId}
        alt={alt}
        fill
        sizes={sizes || '100vw'}
        className={className}
        priority={priority}
        quality={quality}
        format="auto"
        loading={priority ? 'eager' : 'lazy'}
      />
    )
  }

  return (
    <CldImage
      src={publicId}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      quality={quality}
      format="auto"
      loading={priority ? 'eager' : 'lazy'}
      crop="fill"
      gravity="auto"
    />
  )
}