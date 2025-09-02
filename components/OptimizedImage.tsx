// components/OptimizedImage.tsx
'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  fill = false,
  sizes,
  quality = 75,
  placeholder = 'blur',
  blurDataURL,
  loading = 'lazy',
  onLoad
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  // Generate blur placeholder if not provided
  const defaultBlurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=';

  // Handle Cloudinary URLs - optimize them
  const optimizeCloudinaryUrl = (url: string) => {
    if (url.includes('cloudinary.com')) {
      // Extract the base URL and image ID
      const parts = url.split('/upload/');
      if (parts.length === 2) {
        // Add optimization parameters
        const optimizations = [
          'f_auto', // Auto format (WebP where supported)
          'q_auto', // Auto quality
          'dpr_auto', // Auto DPR for retina
          'c_limit', // Limit to specified dimensions
          width ? `w_${width}` : '',
          height ? `h_${height}` : ''
        ].filter(Boolean).join(',');
        
        return `${parts[0]}/upload/${optimizations}/${parts[1]}`;
      }
    }
    return url;
  };

  // Handle local images
  const isLocalImage = src.startsWith('/');
  const optimizedSrc = isLocalImage ? src : optimizeCloudinaryUrl(src);

  // Generate srcSet for responsive images
  const generateSrcSet = () => {
    if (!width || !isLocalImage) return undefined;
    
    const widths = [320, 640, 768, 1024, 1280, 1536];
    return widths
      .filter(w => w <= (width || 1920))
      .map(w => `${optimizedSrc} ${w}w`)
      .join(', ');
  };

  // Handle image error
  const handleError = () => {
    // Fallback to original src or a placeholder
    setImgSrc('/images/placeholder.jpg');
  };

  if (fill) {
    return (
      <div className={`relative ${className}`}>
        <Image
          src={optimizedSrc}
          alt={alt}
          fill
          sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
          quality={quality}
          priority={priority}
          placeholder={placeholder}
          blurDataURL={blurDataURL || defaultBlurDataURL}
          loading={priority ? 'eager' : loading}
          onLoad={() => {
            setIsLoading(false);
            onLoad?.();
          }}
          onError={handleError}
          className={`object-cover ${isLoading ? 'animate-pulse bg-gray-200' : ''}`}
        />
      </div>
    );
  }

  return (
    <Image
      src={optimizedSrc}
      alt={alt}
      width={width || 800}
      height={height || 600}
      sizes={sizes}
      quality={quality}
      priority={priority}
      placeholder={placeholder}
      blurDataURL={blurDataURL || defaultBlurDataURL}
      loading={priority ? 'eager' : loading}
      onLoad={() => {
        setIsLoading(false);
        onLoad?.();
      }}
      onError={handleError}
      className={`${className} ${isLoading ? 'animate-pulse bg-gray-200' : ''}`}
    />
  );
}