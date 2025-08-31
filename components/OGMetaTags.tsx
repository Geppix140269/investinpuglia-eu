import Head from 'next/head'
import { usePathname } from 'next/navigation'
import { getPageOGImage, generatePropertyOGImage, generateBlogOGImage, generateServiceOGImage } from '@/lib/og-images'

interface OGMetaTagsProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  article?: {
    publishedTime?: string
    modifiedTime?: string
    author?: string
    tags?: string[]
  }
  property?: {
    name: string
    location: string
    price?: string
    imageUrl?: string
  }
  blog?: {
    title: string
    excerpt?: string
    featuredImage?: string
  }
  service?: {
    name: string
    description?: string
    imageId?: string
  }
}

export default function OGMetaTags({
  title = 'InvestInPuglia.eu - Your Gateway to Italian Real Estate Investment',
  description = 'Discover lucrative investment opportunities in Puglia, Italy. Expert guidance, grant funding up to 50%, and complete project management for international investors.',
  image,
  url,
  type = 'website',
  article,
  property,
  blog,
  service
}: OGMetaTagsProps) {
  const pathname = usePathname()
  const siteUrl = 'https://investinpuglia.eu'
  
  // Generate appropriate OG image based on content type
  let ogImage = image
  
  if (!ogImage) {
    if (property) {
      ogImage = generatePropertyOGImage(property)
    } else if (blog) {
      ogImage = generateBlogOGImage(blog)
    } else if (service) {
      ogImage = generateServiceOGImage(service)
    } else {
      ogImage = getPageOGImage(pathname || '/')
    }
  }
  
  const fullUrl = url || `${siteUrl}${pathname}`
  
  // Ensure image URL is absolute
  if (ogImage && !ogImage.startsWith('http')) {
    ogImage = `${siteUrl}${ogImage}`
  }
  
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="InvestInPuglia.eu" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      <meta property="twitter:site" content="@investinpuglia" />
      
      {/* LinkedIn specific (uses OG tags but good to be explicit) */}
      <meta property="linkedin:card" content="summary_large_image" />
      
      {/* Article specific meta tags */}
      {article && type === 'article' && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.author && (
            <meta property="article:author" content={article.author} />
          )}
          {article.tags && article.tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Product/Property specific meta tags */}
      {property && type === 'product' && (
        <>
          <meta property="product:price:amount" content={property.price?.replace(/[^\d]/g, '')} />
          <meta property="product:price:currency" content="EUR" />
          <meta property="og:availability" content="available" />
        </>
      )}
      
      {/* Additional SEO tags */}
      <link rel="canonical" href={fullUrl} />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Geo tags for local SEO */}
      <meta name="geo.region" content="IT-PU" />
      <meta name="geo.placename" content="Puglia" />
      <meta name="geo.position" content="40.6403;17.9439" />
      <meta name="ICBM" content="40.6403, 17.9439" />
      
      {/* Rich snippets / Schema.org for real estate */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": property ? "RealEstateListing" : "Organization",
            ...(property ? {
              "name": property.name,
              "description": description,
              "image": ogImage,
              "url": fullUrl,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": property.location,
                "addressRegion": "Puglia",
                "addressCountry": "IT"
              },
              "offers": {
                "@type": "Offer",
                "price": property.price?.replace(/[^\d]/g, ''),
                "priceCurrency": "EUR"
              }
            } : {
              "name": "InvestInPuglia.eu",
              "description": "Expert real estate investment services in Puglia, Italy",
              "url": siteUrl,
              "logo": `${siteUrl}/logo.png`,
              "sameAs": [
                "https://www.linkedin.com/company/investinpuglia",
                "https://www.facebook.com/investinpuglia",
                "https://www.instagram.com/investinpuglia"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Lecce",
                "addressRegion": "Puglia",
                "addressCountry": "IT"
              }
            })
          })
        }}
      />
    </Head>
  )
}