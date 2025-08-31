'use client';

import { CldImage } from 'next-cloudinary';
import { useState } from 'react';

interface CloudinaryOptimizedImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  crop?: 'fill' | 'fit' | 'limit' | 'pad' | 'scale' | 'thumb' | 'crop' | 'lfill' | 'lpad' | 'mfit' | 'mpad';
  gravity?: 'auto' | 'face' | 'faces' | 'face:center' | 'faces:center' | 'center' | 'north' | 'northeast' | 'east' | 'southeast' | 'south' | 'southwest' | 'west' | 'northwest';
  quality?: 'auto' | 'auto:best' | 'auto:good' | 'auto:eco' | 'auto:low' | number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png' | 'gif';
  effects?: Array<{
    effect: string;
    value?: string | number;
  }>;
  removeBackground?: boolean;
  restore?: boolean;
  improve?: boolean;
  upscale?: boolean;
  recolor?: Array<string>;
  background?: string;
  zoom?: number;
  aspectRatio?: string;
  overlays?: Array<{
    publicId?: string;
    text?: string;
    position?: string;
    effects?: any;
  }>;
}

export function CloudinaryOptimizedImage({
  src,
  alt,
  width = 'auto',
  height = 'auto',
  className = '',
  priority = false,
  fill = false,
  sizes,
  crop = 'fill',
  gravity = 'auto',
  quality = 'auto:best',
  format = 'auto',
  effects = [],
  removeBackground = false,
  restore = false,
  improve = false,
  upscale = false,
  recolor,
  background,
  zoom,
  aspectRatio,
  overlays = []
}: CloudinaryOptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Build transformations array
  const transformations: any[] = [];

  // AI-powered optimizations
  if (removeBackground) {
    transformations.push({ removeBackground: true });
  }
  
  if (restore) {
    transformations.push({ restore: true });
  }
  
  if (improve) {
    transformations.push({ improve: true });
  }
  
  if (upscale) {
    transformations.push({ upscale: true });
  }

  // Recolor effects
  if (recolor && recolor.length > 0) {
    transformations.push({
      recolor: recolor
    });
  }

  // Background replacement
  if (background) {
    transformations.push({
      background: background.startsWith('#') ? background : `#${background}`
    });
  }

  // Custom effects
  effects.forEach(effect => {
    transformations.push(effect);
  });

  // Overlays
  overlays.forEach(overlay => {
    if (overlay.text) {
      transformations.push({
        overlay: {
          text: {
            text: overlay.text,
            ...overlay.effects
          }
        }
      });
    } else if (overlay.publicId) {
      transformations.push({
        overlay: overlay.publicId,
        ...overlay.effects
      });
    }
  });

  const imageProps = {
    src,
    alt,
    width: fill ? undefined : width,
    height: fill ? undefined : height,
    className: `${className} ${isLoading ? 'animate-pulse' : ''}`,
    priority,
    fill,
    sizes: sizes || (fill ? '100vw' : undefined),
    crop,
    gravity,
    quality,
    format,
    zoom,
    aspectRatio,
    transformations,
    loading: priority ? undefined : 'lazy',
    placeholder: 'blur',
    onLoad: () => setIsLoading(false),
    deliveryType: 'fetch',
    // Enable responsive images
    responsive: true,
    // Enable automatic format selection
    rawTransformations: [
      'f_auto',
      'q_auto:best',
      'dpr_auto',
      'w_auto',
      'c_limit',
      'fl_progressive',
      'fl_immutable_cache',
      'fl_lossy',
      'fl_any_format',
      'fl_animated'
    ].join(',')
  };

  return (
    <div className={`relative ${fill ? 'w-full h-full' : ''}`}>
      <CldImage {...(imageProps as any)} />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
    </div>
  );
}

export default CloudinaryOptimizedImage;