'use client'

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  cloudinaryTransforms?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  sizes = '100vw',
  quality = 75,
  objectFit = 'cover',
  cloudinaryTransforms = 'f_auto,q_auto:eco'
}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  // Optimize Cloudinary URLs
  const getOptimizedUrl = (url: string) => {
    if (url.includes('cloudinary.com')) {
      const parts = url.split('/upload/');
      if (parts.length === 2) {
        // Add responsive transformations
        const responsiveTransforms = [
          cloudinaryTransforms,
          'c_limit',
          'dpr_auto',
          'w_auto'
        ].filter(Boolean).join(',');
        
        return `${parts[0]}/upload/${responsiveTransforms}/${parts[1]}`;
      }
    }
    return url;
  };

  // Generate blur placeholder
  const getBlurDataUrl = (url: string) => {
    if (url.includes('cloudinary.com')) {
      const parts = url.split('/upload/');
      if (parts.length === 2) {
        return `${parts[0]}/upload/w_20,h_20,c_limit,e_blur:1000,f_auto,q_auto:low/${parts[1]}`;
      }
    }
    // Default blur placeholder
    return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...';
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imageRef.current) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.01
      }
    );

    observer.observe(imageRef.current);

    return () => observer.disconnect();
  }, [priority]);

  const optimizedSrc = getOptimizedUrl(src);
  const blurDataURL = getBlurDataUrl(src);

  // Generate responsive sizes for Cloudinary
  const generateSrcSet = () => {
    if (!src.includes('cloudinary.com')) return undefined;
    
    const widths = [320, 640, 768, 1024, 1280, 1536, 1920];
    return widths.map(w => {
      const url = src.replace('/upload/', `/upload/w_${w},c_limit,f_auto,q_auto:eco/`);
      return `${url} ${w}w`;
    }).join(', ');
  };

  if (!isInView && !priority) {
    return (
      <div 
        ref={imageRef}
        className={`bg-gray-200 animate-pulse ${className}`}
        style={{ 
          width: width || '100%', 
          height: height || 'auto',
          aspectRatio: width && height ? `${width}/${height}` : undefined
        }}
        aria-label={`Loading ${alt}`}
      />
    );
  }

  return (
    <div ref={imageRef} className={`relative ${className}`}>
      {width && height ? (
        <Image
          src={optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          quality={quality}
          sizes={sizes}
          placeholder="blur"
          blurDataURL={blurDataURL}
          className={`${hasLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          onLoad={() => setHasLoaded(true)}
          style={{ objectFit }}
          srcSet={generateSrcSet()}
        />
      ) : (
        <Image
          src={optimizedSrc}
          alt={alt}
          fill
          priority={priority}
          quality={quality}
          sizes={sizes}
          placeholder="blur"
          blurDataURL={blurDataURL}
          className={`${hasLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          onLoad={() => setHasLoaded(true)}
          style={{ objectFit }}
          srcSet={generateSrcSet()}
        />
      )}
    </div>
  );
};

export default OptimizedImage;