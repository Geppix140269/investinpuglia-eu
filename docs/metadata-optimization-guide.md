# Metadata Optimization Guide for InvestInPuglia.eu

## Why Metadata Matters

Proper metadata ensures:
1. **WhatsApp/Social Media**: Shows attractive preview with title, description, and image
2. **SEO**: Better Google rankings and rich snippets
3. **AI Bots**: ChatGPT, Claude, and other AI can understand your content
4. **Click-Through Rates**: Better previews = more clicks

## Complete Metadata Template for Next.js 14

```typescript
import { Metadata } from 'next'

export const metadata: Metadata = {
  // Basic SEO
  title: 'Page Title | Your Brand',  // 50-60 characters
  description: 'Compelling description with keywords', // 150-160 characters
  keywords: 'keyword1, keyword2, keyword3', // 5-10 relevant keywords
  
  // Open Graph (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    title: 'Engaging Social Media Title', // Can be different from page title
    description: 'Hook with emoji 🎯 • Benefit • Call to action', // 2-3 lines
    url: 'https://investinpuglia.eu/your-page',
    siteName: 'InvestInPuglia',
    images: [
      {
        url: 'https://investinpuglia.eu/images/og-image.jpg', // 1200x630px
        width: 1200,
        height: 630,
        alt: 'Descriptive alt text',
      }
    ],
    locale: 'en_US',
    type: 'website', // or 'article' for blog posts
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Twitter-optimized title', // Max 70 characters
    description: 'Concise Twitter description', // Max 200 characters
    images: ['https://investinpuglia.eu/images/twitter-card.jpg'],
    creator: '@yourtwitterhandle',
  },
  
  // Additional SEO
  alternates: {
    canonical: 'https://investinpuglia.eu/your-page',
    languages: {
      'en-US': 'https://investinpuglia.eu/your-page',
      'it-IT': 'https://investinpuglia.eu/it/your-page',
    }
  },
  
  // Robots and indexing
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
  
  // Structured Data for Rich Snippets
  other: {
    'schema:type': 'Service',
    'schema:name': 'Mini PIA Grant Consulting',
    'schema:provider': 'InvestInPuglia',
  }
}
```

## Platform-Specific Requirements

### WhatsApp
- **Title**: 65 characters max
- **Description**: 120 characters max (visible in preview)
- **Image**: 1200x630px (same as Facebook)
- **Tips**: Use emojis, clear value proposition

### Facebook
- **Title**: 60 characters
- **Description**: 2-3 lines (155 characters)
- **Image**: 1200x630px minimum
- **Tips**: Questions and numbers perform well

### LinkedIn
- **Title**: 70 characters
- **Description**: 155 characters
- **Image**: 1200x627px (slightly different)
- **Tips**: Professional tone, statistics

### Twitter/X
- **Title**: 70 characters
- **Description**: 200 characters
- **Image**: 1200x600px (2:1 ratio)
- **Tips**: Hashtags in description

### Google Search
- **Title**: 50-60 characters
- **Description**: 150-160 characters
- **Tips**: Include target keyword early

## Image Specifications

### Open Graph Image (og:image)
- **Size**: 1200x630px
- **Format**: JPG or PNG
- **File size**: Under 1MB
- **Content**: Logo, headline, visual elements

### Twitter Card Image
- **Size**: 1200x600px (2:1 ratio)
- **Format**: JPG or PNG
- **File size**: Under 1MB

## Examples for InvestInPuglia Pages

### Homepage
```typescript
export const metadata: Metadata = {
  title: 'InvestInPuglia | Tourism Investment Grants & Real Estate Opportunities',
  description: 'Access 45-55% grants for tourism investments in Puglia. Expert consulting for foreign investors. Mini PIA Turismo, property development, and EU funding.',
  openGraph: {
    title: '🇮🇹 Invest in Puglia: Get 45-55% Tourism Grants',
    description: '✅ Mini PIA Turismo Grants • ✅ Property Investment • ✅ Expert Consulting • ✅ €2M Max Grant • Foreign Investor Specialists',
  }
}
```

### Calculator Page
```typescript
export const metadata: Metadata = {
  title: 'Mini PIA Calculator | Calculate Your Tourism Grant | InvestInPuglia',
  description: 'Free calculator to estimate your Mini PIA Turismo grant. Input your investment and get instant 45-55% grant calculation. For foreign investors in Puglia.',
  openGraph: {
    title: '🧮 Calculate Your €2M Tourism Grant in 30 Seconds',
    description: 'FREE Mini PIA Calculator • See your grant amount instantly • 45-55% funding • Foreign investor friendly',
  }
}
```

### Portfolio Page
```typescript
export const metadata: Metadata = {
  title: 'Renovation Portfolio | Cataldo Russo Projects | InvestInPuglia',
  description: 'View successful renovation and restructuring projects by Engineer Architect Cataldo Russo. Luxury hotels, resorts, and tourism properties in Puglia.',
  openGraph: {
    title: '🏨 50+ Successful Tourism Projects in Puglia',
    description: 'Baglioni Hotels • Luxury Resorts • Historic Renovations • By Engineer Architect Cataldo Russo • View Portfolio',
  }
}
```

## Dynamic Metadata (for blog posts, properties)

```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  }
}
```

## Testing Your Metadata

### Tools to Test
1. **Facebook Debugger**: https://developers.facebook.com/tools/debug/
2. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
3. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/
4. **WhatsApp**: Send link to yourself to preview
5. **Google Rich Results Test**: https://search.google.com/test/rich-results

### Chrome Extensions
- **SEO Meta in 1 Click**: Check all meta tags
- **Open Graph Preview**: Preview social shares

## Common Mistakes to Avoid

1. **Missing Images**: Always include og:image
2. **Wrong Image Dimensions**: Use correct sizes for each platform
3. **Too Long Titles**: Keep within character limits
4. **No Canonical URL**: Always set canonical
5. **Generic Descriptions**: Make each page unique
6. **Missing Structured Data**: Add schema.org markup
7. **Not Testing**: Always test before deploying

## Quick Checklist for Each Page

- [ ] Unique, descriptive title (50-60 chars)
- [ ] Compelling description (150-160 chars)
- [ ] Open Graph tags with image
- [ ] Twitter Card tags
- [ ] Canonical URL
- [ ] Keywords (5-10 relevant)
- [ ] Robots directives
- [ ] Test on Facebook Debugger
- [ ] Test WhatsApp preview
- [ ] Check Google Search Console

## Implementation Priority

1. **High Priority Pages** (Do First)
   - Homepage
   - Mini PIA Guide
   - Calculator
   - Portfolio
   - Services

2. **Medium Priority**
   - Blog posts
   - Individual properties
   - About page
   - Contact

3. **Low Priority**
   - Legal pages
   - Privacy policy
   - Terms of service

## Monitoring and Maintenance

1. **Google Search Console**: Monitor how pages appear in search
2. **Social Media Analytics**: Track click-through rates
3. **Regular Updates**: Update metadata when content changes
4. **A/B Testing**: Test different titles/descriptions

## AI and Bot Optimization

For AI crawlers (ChatGPT, Claude, Perplexity):

```typescript
other: {
  'ai:title': 'Mini PIA Turismo Grants Program',
  'ai:description': 'Government grant program offering 45-55% funding',
  'ai:category': 'Financial Incentives',
  'ai:location': 'Puglia, Italy',
  'ai:target_audience': 'Foreign Investors',
  'ai:key_benefits': '45-55% grants, €2M max, tourism sector',
}
```

## Next Steps

1. Audit all existing pages for missing metadata
2. Create og:image templates in Canva/Figma
3. Implement metadata on high-priority pages
4. Test with debugging tools
5. Monitor performance in Google Search Console
6. A/B test different titles/descriptions

---

Remember: Good metadata = Better visibility = More traffic = More conversions