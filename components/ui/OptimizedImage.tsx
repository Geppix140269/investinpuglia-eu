import Image from 'next/image'
import { CldImage } from 'next-cloudinary'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  quality?: number | 'auto'
  loading?: 'lazy' | 'eager'
}

export default function OptimizedImage({ 
  src, 
  alt, 
  width = 800, 
  height = 600,
  className = '',
  priority = false,
  fill = false,
  sizes,
  quality = 'auto',
  loading = priority ? 'eager' : 'lazy'
}: OptimizedImageProps) {
  // Check if it's a Cloudinary image
  const isCloudinary = src.includes('cloudinary.com')
  
  if (isCloudinary) {
    // Extract public ID from Cloudinary URL
    const getPublicId = (url: string) => {
      const parts = url.split('/upload/')
      if (parts[1]) {
        // Remove version and file extension
        const publicIdWithExt = parts[1].replace(/v\d+\//, '')
        return publicIdWithExt.replace(/\.[^/.]+$/, '')
      }
      return url
    }

    const publicId = getPublicId(src)

    if (fill) {
      return (
        <CldImage
          src={publicId}
          alt={alt}
          fill
          sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
          className={className}
          priority={priority}
          quality={quality}
          format="auto"
          loading={loading}
          crop="fill"
          gravity="auto"
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
        loading={loading}
        crop="fill"
        gravity="auto"
        sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
      />
    )
  }

  // For local/external images, use Next.js Image component
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
        className={className}
        priority={priority}
        quality={typeof quality === 'number' ? quality : 75}
        loading={loading}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      quality={typeof quality === 'number' ? quality : 75}
      loading={loading}
      sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
    />
  )
}