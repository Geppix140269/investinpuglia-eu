// OG Image Generator for InvestInPuglia.eu
// Uses Cloudinary transformations to create optimized Open Graph images with watermarks

export interface OGImageConfig {
  title?: string
  description?: string
  imageId: string
  watermark?: boolean
  template?: 'default' | 'property' | 'blog' | 'service'
}

// Cloudinary base configuration
const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/dusubfxgo/image/upload'
const CLOUDINARY_FOLDER = 'cc7febbe920969393f9b9e667977771e11'

// OG Image dimensions (Facebook/LinkedIn recommended)
const OG_WIDTH = 1200
const OG_HEIGHT = 630

// Generate Cloudinary transformation URL for OG images
export function generateOGImageUrl(config: OGImageConfig): string {
  // For now, use simplified transformations without text overlays
  // to ensure images display correctly
  const transformations: string[] = []
  
  // Base transformations for OG image optimization
  transformations.push(`w_${OG_WIDTH}`)
  transformations.push(`h_${OG_HEIGHT}`)
  transformations.push('c_fill')
  transformations.push('g_auto')
  transformations.push('f_auto')
  transformations.push('q_auto')
  
  // Construct the final URL
  const transformation = transformations.join(',')
  return `${CLOUDINARY_BASE_URL}/${transformation}/${config.imageId}`
}

// Predefined OG images for main pages - Updated with working Cloudinary URLs
export const PAGE_OG_IMAGES = {
  home: {
    imageId: 'v1756663565/investinpuglia/og-images/masseria-montelauro.jpg',
    title: 'Invest in Puglia',
    description: 'Your Gateway to Italian Real Estate Investment'
  },
  portfolio: {
    imageId: 'v1756663567/investinpuglia/og-images/baglioni-masseria-muzza.jpg',
    title: '30 Years of Excellence',
    description: '€100M+ in Projects, €25M Grants Secured'
  },
  services: {
    imageId: 'v1756663570/investinpuglia/og-images/donna-menga.jpg',
    title: 'Our Services',
    description: 'Complete Investment Support from A to Z'
  },
  grants: {
    imageId: 'v1756663573/investinpuglia/og-images/nohasi-palace.jpg',
    title: 'Grant Funding',
    description: 'Up to 50% Co-financing Available'
  },
  properties: {
    imageId: 'v1756663576/investinpuglia/og-images/le-cale-dotranto.jpg',
    title: 'Properties',
    description: 'Luxury Investment Opportunities'
  },
  about: {
    imageId: 'v1756663578/investinpuglia/og-images/dimora-san-giuseppe.jpg',
    title: 'About InvestInPuglia',
    description: '29 Years of Excellence in Real Estate'
  },
  contact: {
    imageId: 'v1756663582/investinpuglia/og-images/hotel-bellavista.jpg',
    title: 'Contact Us',
    description: 'Start Your Investment Journey Today'
  },
  puglia: {
    imageId: 'v1756663589/investinpuglia/og-images/torre-matta.jpg',
    title: 'Discover Puglia',
    description: 'The Hidden Gem of Southern Italy'
  },
  legal: {
    imageId: 'v1756663591/investinpuglia/og-images/hotel-haethey.jpg',
    title: 'Legal Framework',
    description: 'Navigate Italian Property Law with Confidence'
  },
  trullo: {
    imageId: 'v1756663594/investinpuglia/og-images/shantiland.jpg',
    title: 'Meet Trullo AI',
    description: 'Your 24/7 Investment Assistant'
  }
}

// Property-specific OG image generator
export function generatePropertyOGImage(property: {
  name: string
  location: string
  price?: string
  imageUrl?: string
}): string {
  const imageId = property.imageUrl 
    ? property.imageUrl.replace('https://res.cloudinary.com/dusubfxgo/image/upload/', '')
    : 'v1756663565/investinpuglia/og-images/masseria-montelauro.jpg'
  
  return generateOGImageUrl({
    imageId,
    title: property.name,
    description: `${property.location}${property.price ? ` - ${property.price}` : ''}`,
    watermark: true,
    template: 'property'
  })
}

// Blog post OG image generator
export function generateBlogOGImage(post: {
  title: string
  excerpt?: string
  featuredImage?: string
}): string {
  const imageId = post.featuredImage 
    ? post.featuredImage.replace('https://res.cloudinary.com/dusubfxgo/image/upload/', '')
    : 'v1756663567/investinpuglia/og-images/baglioni-masseria-muzza.jpg'
  
  return generateOGImageUrl({
    imageId,
    title: post.title,
    description: post.excerpt,
    watermark: true,
    template: 'blog'
  })
}

// Service page OG image generator
export function generateServiceOGImage(service: {
  name: string
  description?: string
  imageId?: string
}): string {
  return generateOGImageUrl({
    imageId: service.imageId || 'v1756631635/donna_menga_after_aolqht.jpg',
    title: service.name,
    description: service.description,
    watermark: true,
    template: 'service'
  })
}

// Helper to get OG image for any page
export function getPageOGImage(pathname: string): string {
  // Remove leading slash and get first segment
  const segment = pathname.replace(/^\//, '').split('/')[0] || 'home'
  
  // Check if we have a predefined image for this page
  const pageConfig = PAGE_OG_IMAGES[segment as keyof typeof PAGE_OG_IMAGES]
  
  if (pageConfig) {
    return generateOGImageUrl({
      ...pageConfig,
      watermark: true
    })
  }
  
  // Default fallback
  return generateOGImageUrl({
    imageId: 'v1756631635/masseria_montelauro_brpq0h.jpg',
    title: 'InvestInPuglia.eu',
    description: 'Your Gateway to Italian Real Estate Investment',
    watermark: true
  })
}