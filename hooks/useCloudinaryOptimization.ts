'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  getOptimizedUrl, 
  generateSrcSet, 
  getPlaceholderUrl,
  CloudinaryOptimizationOptions 
} from '@/lib/cloudinary-client';
import { getDeviceType, DEVICE_OPTIMIZATIONS } from '@/lib/cloudinary-config';

interface UseCloudinaryOptimizationProps {
  publicId: string;
  options?: CloudinaryOptimizationOptions;
  responsive?: boolean;
  lazy?: boolean;
}

interface OptimizedImage {
  src: string;
  srcSet?: string;
  placeholder?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
}

export function useCloudinaryOptimization({
  publicId,
  options = {},
  responsive = true,
  lazy = true
}: UseCloudinaryOptimizationProps): OptimizedImage {
  const [optimizedImage, setOptimizedImage] = useState<OptimizedImage>({
    src: '',
    loading: lazy ? 'lazy' : 'eager'
  });

  const generateOptimizedImage = useCallback(() => {
    if (!publicId) return;

    // Get device-specific optimizations
    const deviceType = getDeviceType();
    const deviceConfig = DEVICE_OPTIMIZATIONS[deviceType];

    // Merge options with device config
    const finalOptions: CloudinaryOptimizationOptions = {
      quality: 'auto:best',
      format: 'auto',
      dpr: deviceConfig.dpr,
      ...options
    };

    // Generate main URL
    const src = getOptimizedUrl(publicId, finalOptions);

    // Generate responsive srcSet if needed
    let srcSet: string | undefined;
    if (responsive) {
      srcSet = generateSrcSet(publicId);
    }

    // Generate placeholder for lazy loading
    let placeholder: string | undefined;
    if (lazy) {
      placeholder = getPlaceholderUrl(publicId);
    }

    // Generate sizes attribute for responsive images
    const sizes = responsive 
      ? '(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 70vw'
      : undefined;

    setOptimizedImage({
      src,
      srcSet,
      placeholder,
      sizes,
      loading: lazy ? 'lazy' : 'eager'
    });
  }, [publicId, options, responsive, lazy]);

  useEffect(() => {
    generateOptimizedImage();

    // Re-generate on window resize for responsive images
    if (responsive) {
      const handleResize = () => {
        generateOptimizedImage();
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [generateOptimizedImage, responsive]);

  return optimizedImage;
}

// Hook for batch image optimization
export function useCloudinaryBatch(
  images: Array<{ publicId: string; options?: CloudinaryOptimizationOptions }>
): Map<string, OptimizedImage> {
  const [optimizedImages, setOptimizedImages] = useState<Map<string, OptimizedImage>>(new Map());

  useEffect(() => {
    const newOptimizedImages = new Map<string, OptimizedImage>();

    images.forEach(({ publicId, options = {} }) => {
      const deviceType = getDeviceType();
      const deviceConfig = DEVICE_OPTIMIZATIONS[deviceType];

      const finalOptions: CloudinaryOptimizationOptions = {
        quality: 'auto:best',
        format: 'auto',
        dpr: deviceConfig.dpr,
        ...options
      };

      const src = getOptimizedUrl(publicId, finalOptions);
      const srcSet = generateSrcSet(publicId);
      const placeholder = getPlaceholderUrl(publicId);

      newOptimizedImages.set(publicId, {
        src,
        srcSet,
        placeholder,
        sizes: '(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 70vw',
        loading: 'lazy'
      });
    });

    setOptimizedImages(newOptimizedImages);
  }, [images]);

  return optimizedImages;
}

// Hook for performance monitoring
export function useCloudinaryPerformance() {
  const [metrics, setMetrics] = useState({
    imagesLoaded: 0,
    totalLoadTime: 0,
    averageLoadTime: 0,
    failedLoads: 0,
    bandwidth: 0
  });

  const trackImageLoad = useCallback((startTime: number, imageSize: number) => {
    const loadTime = performance.now() - startTime;
    
    setMetrics(prev => ({
      imagesLoaded: prev.imagesLoaded + 1,
      totalLoadTime: prev.totalLoadTime + loadTime,
      averageLoadTime: (prev.totalLoadTime + loadTime) / (prev.imagesLoaded + 1),
      failedLoads: prev.failedLoads,
      bandwidth: prev.bandwidth + imageSize
    }));
  }, []);

  const trackImageError = useCallback(() => {
    setMetrics(prev => ({
      ...prev,
      failedLoads: prev.failedLoads + 1
    }));
  }, []);

  return {
    metrics,
    trackImageLoad,
    trackImageError
  };
}

export default useCloudinaryOptimization;