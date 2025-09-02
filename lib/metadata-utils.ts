// lib/metadata-utils.ts
import { Metadata } from 'next';
import { getPageMetadata, generateNextMetadata, getDefaultMetadata } from '@/lib/metadata-manager';
import { PAGE_OG_IMAGES, generateOGImageUrl } from '@/lib/og-images';

// Server-side function to generate metadata for Next.js pages
export async function generatePageMetadata(path: string): Promise<Metadata> {
  try {
    // Try to fetch metadata from Firebase
    const customMetadata = await getPageMetadata(path);
    
    if (customMetadata) {
      return generateNextMetadata(customMetadata);
    }
    
    // Fallback to default metadata based on path
    return generateDefaultPageMetadata(path);
  } catch (error) {
    console.error('Error generating page metadata:', error);
    return generateDefaultPageMetadata(path);
  }
}

// Generate default metadata when custom metadata is not available
function generateDefaultPageMetadata(path: string): Metadata {
  const segments = path.split('/').filter(Boolean);
  const pageName = segments[segments.length - 1] || 'home';
  const formattedName = pageName.charAt(0).toUpperCase() + pageName.slice(1).replace(/-/g, ' ');
  
  // Try to find a matching OG image from predefined images
  const ogImageKey = pageName as keyof typeof PAGE_OG_IMAGES;
  const pageOGImage = PAGE_OG_IMAGES[ogImageKey];
  
  const ogImageUrl = pageOGImage 
    ? generateOGImageUrl({
        imageId: pageOGImage.imageId,
        title: pageOGImage.title,
        description: pageOGImage.description,
        watermark: true
      })
    : generateOGImageUrl({
        imageId: PAGE_OG_IMAGES.home.imageId,
        title: 'Invest in Puglia',
        description: 'Your Gateway to Italian Real Estate Investment',
        watermark: true
      });

  return {
    title: `${formattedName} | Invest in Puglia`,
    description: `Explore ${formattedName} - Expert PIA and Mini PIA grant advisory. EU co-funded Puglia Regional Development programmes.`,
    keywords: [
      'PIA grants puglia',
      'Mini PIA grants',
      'EU co-funded puglia',
      'non refundable grants italy',
      formattedName.toLowerCase()
    ],
    openGraph: {
      title: formattedName,
      description: `Discover ${formattedName} with Invest in Puglia - Your gateway to Italian investment opportunities`,
      url: `https://investinpuglia.eu${path}`,
      siteName: 'Invest in Puglia',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: formattedName,
        }
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: formattedName,
      description: `Discover ${formattedName} with Invest in Puglia`,
      images: [ogImageUrl],
      creator: '@investinpuglia'
    },
    alternates: {
      canonical: `https://investinpuglia.eu${path}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Helper to create dynamic metadata for blog posts
export async function generateBlogMetadata(slug: string, post: {
  title: string;
  excerpt?: string;
  featuredImage?: string;
  author?: string;
  publishedAt?: string;
}): Promise<Metadata> {
  const path = `/blog/${slug}`;
  
  // Check for custom metadata first
  const customMetadata = await getPageMetadata(path);
  if (customMetadata) {
    return generateNextMetadata(customMetadata);
  }
  
  // Generate metadata from post data
  const ogImageUrl = post.featuredImage || generateOGImageUrl({
    imageId: PAGE_OG_IMAGES.portfolio.imageId,
    title: post.title,
    description: post.excerpt || '',
    watermark: true
  });
  
  return {
    title: `${post.title} | Invest in Puglia Blog`,
    description: post.excerpt || `Read "${post.title}" on the Invest in Puglia blog`,
    openGraph: {
      title: post.title,
      description: post.excerpt || `Read "${post.title}" on the Invest in Puglia blog`,
      url: `https://investinpuglia.eu/blog/${slug}`,
      siteName: 'Invest in Puglia',
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author] : undefined,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || `Read "${post.title}" on the Invest in Puglia blog`,
      images: [ogImageUrl],
      creator: '@investinpuglia'
    },
    alternates: {
      canonical: `https://investinpuglia.eu/blog/${slug}`,
    },
  };
}

// Helper to create dynamic metadata for property pages
export async function generatePropertyMetadata(slug: string, property: {
  name: string;
  location: string;
  price?: string;
  description?: string;
  imageUrl?: string;
  type?: string;
  bedrooms?: number;
  bathrooms?: number;
  size?: number;
}): Promise<Metadata> {
  const path = `/properties/${slug}`;
  
  // Check for custom metadata first
  const customMetadata = await getPageMetadata(path);
  if (customMetadata) {
    return generateNextMetadata(customMetadata);
  }
  
  // Generate metadata from property data
  const ogImageUrl = property.imageUrl || generateOGImageUrl({
    imageId: PAGE_OG_IMAGES.properties.imageId,
    title: property.name,
    description: `${property.location}${property.price ? ` - ${property.price}` : ''}`,
    watermark: true
  });
  
  const description = property.description || 
    `${property.name} in ${property.location}. ${property.type || 'Property'} with ${property.bedrooms || 0} bedrooms, ${property.bathrooms || 0} bathrooms.`;
  
  return {
    title: `${property.name} - ${property.location} | Invest in Puglia Properties`,
    description,
    openGraph: {
      title: property.name,
      description,
      url: `https://investinpuglia.eu/properties/${slug}`,
      siteName: 'Invest in Puglia',
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: property.name,
        }
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: property.name,
      description,
      images: [ogImageUrl],
      creator: '@investinpuglia'
    },
    alternates: {
      canonical: `https://investinpuglia.eu/properties/${slug}`,
    },
  };
}

// Helper to create dynamic metadata for location pages
export async function generateLocationMetadata(slug: string, location: {
  name: string;
  description?: string;
  imageUrl?: string;
  region?: string;
  highlights?: string[];
}): Promise<Metadata> {
  const path = `/locations/${slug}`;
  
  // Check for custom metadata first
  const customMetadata = await getPageMetadata(path);
  if (customMetadata) {
    return generateNextMetadata(customMetadata);
  }
  
  // Generate metadata from location data
  const ogImageUrl = location.imageUrl || generateOGImageUrl({
    imageId: PAGE_OG_IMAGES.puglia.imageId,
    title: location.name,
    description: location.description || `Discover ${location.name} in Puglia`,
    watermark: true
  });
  
  const description = location.description || 
    `Explore investment opportunities in ${location.name}, ${location.region || 'Puglia'}. ${location.highlights ? location.highlights.join('. ') : ''}`;
  
  return {
    title: `${location.name} - Investment Opportunities | Invest in Puglia`,
    description,
    keywords: [
      location.name.toLowerCase(),
      'puglia investment',
      'italian real estate',
      `${location.name.toLowerCase()} properties`,
      'PIA grants',
      location.region?.toLowerCase() || 'puglia'
    ],
    openGraph: {
      title: `${location.name} - Investment Opportunities`,
      description,
      url: `https://investinpuglia.eu/locations/${slug}`,
      siteName: 'Invest in Puglia',
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: location.name,
        }
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${location.name} - Investment Opportunities`,
      description,
      images: [ogImageUrl],
      creator: '@investinpuglia'
    },
    alternates: {
      canonical: `https://investinpuglia.eu/locations/${slug}`,
    },
  };
}