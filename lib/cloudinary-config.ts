// Cloudinary Configuration and Optimization Settings

export const CLOUDINARY_CONFIG = {
  cloudName: 'dusubfxgo',
  apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
  uploadPreset: 'investinpuglia',
  folder: 'investinpuglia'
};

// Optimization presets for different use cases
export const OPTIMIZATION_PRESETS = {
  // Hero images - highest quality
  hero: {
    quality: 'auto:best',
    format: 'auto',
    dpr: 'auto',
    fetchFormat: 'auto',
    flags: ['progressive', 'immutable_cache', 'lossy'],
    responsive: true,
    sizes: [640, 768, 1024, 1280, 1536, 1920, 2560],
    eager: true
  },
  
  // Thumbnail images - balanced quality and size
  thumbnail: {
    quality: 'auto:good',
    format: 'auto',
    dpr: 'auto',
    crop: 'thumb',
    gravity: 'auto',
    width: 400,
    height: 300,
    fetchFormat: 'auto',
    flags: ['progressive', 'immutable_cache'],
    responsive: true
  },
  
  // Gallery images - good quality with optimization
  gallery: {
    quality: 'auto:good',
    format: 'auto',
    dpr: 'auto',
    fetchFormat: 'auto',
    flags: ['progressive', 'immutable_cache', 'lossy'],
    responsive: true,
    sizes: [400, 600, 800, 1000, 1200],
    lazy: true
  },
  
  // Icon/Logo images - preserve quality
  icon: {
    quality: 'auto:best',
    format: 'auto',
    dpr: 'auto',
    width: 64,
    fetchFormat: 'auto',
    flags: ['immutable_cache'],
    responsive: false
  },
  
  // Background images - optimize for performance
  background: {
    quality: 'auto:eco',
    format: 'auto',
    dpr: 'auto',
    fetchFormat: 'auto',
    flags: ['progressive', 'immutable_cache', 'lossy', 'any_format'],
    responsive: true,
    sizes: [640, 768, 1024, 1280, 1536, 1920, 2560, 3840],
    effect: 'blur:300'
  },
  
  // Product images - high quality with zoom
  product: {
    quality: 'auto:best',
    format: 'auto',
    dpr: 'auto',
    fetchFormat: 'auto',
    flags: ['progressive', 'immutable_cache'],
    responsive: true,
    sizes: [400, 600, 800, 1000, 1200, 1600],
    zoom: true
  },
  
  // Avatar images - small, optimized
  avatar: {
    quality: 'auto:good',
    format: 'auto',
    dpr: 'auto',
    crop: 'face',
    gravity: 'face',
    width: 150,
    height: 150,
    fetchFormat: 'auto',
    flags: ['immutable_cache'],
    responsive: false
  },
  
  // Social media optimized
  social: {
    quality: 'auto:good',
    format: 'jpg',
    width: 1200,
    height: 630,
    crop: 'fill',
    gravity: 'auto',
    fetchFormat: 'auto',
    flags: ['progressive', 'immutable_cache'],
    responsive: false
  }
};

// Device-specific optimization
export const DEVICE_OPTIMIZATIONS = {
  mobile: {
    maxWidth: 640,
    quality: 'auto:eco',
    dpr: 2
  },
  tablet: {
    maxWidth: 1024,
    quality: 'auto:good',
    dpr: 2
  },
  desktop: {
    maxWidth: 1920,
    quality: 'auto:best',
    dpr: 1
  },
  retina: {
    maxWidth: 2560,
    quality: 'auto:best',
    dpr: 2
  }
};

// Transformation chains for specific effects
export const TRANSFORMATION_CHAINS = {
  blur: [
    { effect: 'blur:1000' },
    { quality: 10 },
    { width: 20 }
  ],
  grayscale: [
    { effect: 'grayscale' }
  ],
  sepia: [
    { effect: 'sepia:80' }
  ],
  vintage: [
    { effect: 'sepia:50' },
    { effect: 'vignette:20' }
  ],
  sharpen: [
    { effect: 'sharpen:100' }
  ],
  brighten: [
    { effect: 'brightness:20' }
  ],
  darken: [
    { effect: 'brightness:-20' }
  ],
  contrast: [
    { effect: 'contrast:20' }
  ]
};

// Performance metrics tracking
export const PERFORMANCE_CONFIG = {
  enableLazyLoad: true,
  enableProgressiveLoading: true,
  enableCaching: true,
  cacheMaxAge: 31536000, // 1 year
  enableWebP: true,
  enableAVIF: true,
  enableAutoFormat: true,
  enableAutoQuality: true,
  enableResponsive: true,
  enableRetina: true
};

// SEO optimization settings
export const SEO_CONFIG = {
  enableAltText: true,
  enableStructuredData: true,
  enableOpenGraph: true,
  enableTwitterCard: true,
  defaultOGImageWidth: 1200,
  defaultOGImageHeight: 630
};

// Utility function to get device type
export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' | 'retina' {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  const dpr = window.devicePixelRatio || 1;
  
  if (width <= 640) return 'mobile';
  if (width <= 1024) return 'tablet';
  if (dpr > 1.5) return 'retina';
  return 'desktop';
}

// Utility function to select optimization preset based on context
export function selectOptimizationPreset(
  context: 'hero' | 'thumbnail' | 'gallery' | 'icon' | 'background' | 'product' | 'avatar' | 'social'
) {
  return OPTIMIZATION_PRESETS[context];
}

// Generate Cloudinary URL with automatic optimizations
export function generateOptimizedUrl(
  publicId: string,
  preset: keyof typeof OPTIMIZATION_PRESETS = 'gallery'
) {
  const config = OPTIMIZATION_PRESETS[preset];
  const device = getDeviceType();
  const deviceConfig = DEVICE_OPTIMIZATIONS[device];
  
  // Merge configurations
  const finalConfig = {
    ...config,
    ...deviceConfig,
    publicId
  };
  
  return finalConfig;
}