# Metadata Management System Documentation

## Overview
The metadata management system allows you to dynamically control SEO metadata, Open Graph tags, and social sharing images for all pages on investinpuglia.eu through an admin interface.

## Features
- ✅ Dynamic metadata management via Firebase
- ✅ Custom OG images for each page
- ✅ Admin UI for easy editing
- ✅ Real-time updates without code changes
- ✅ Support for Cloudinary and Firebase Storage images
- ✅ Fallback to default metadata when custom isn't available

## How It Works

### 1. Admin Interface
Access the metadata manager at `/admin/metadata` to:
- View all page metadata
- Edit titles, descriptions, keywords
- Upload custom OG images
- Set Twitter card information
- Configure canonical URLs
- Manage robots/indexing settings

### 2. Image Management
Two options for OG images:
- **Upload to Firebase**: Direct upload through the admin UI
- **Cloudinary Integration**: Use existing Cloudinary image IDs

### 3. Page Integration

#### For New Pages
```typescript
// app/your-page/page.tsx
import { generatePageMetadata } from '@/lib/metadata-utils'

export async function generateMetadata() {
  return await generatePageMetadata('/your-page')
}
```

#### For Dynamic Pages (Blog, Properties, etc.)
```typescript
// app/blog/[slug]/page.tsx
import { generateBlogMetadata } from '@/lib/metadata-utils'

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug)
  return await generateBlogMetadata(params.slug, post)
}
```

## Admin Usage Guide

### Adding New Page Metadata
1. Go to `/admin/metadata`
2. Click "Add Page Metadata"
3. Enter the page path (e.g., `/services/consulting`)
4. Fill in the metadata fields
5. Upload or specify an OG image
6. Save changes

### Editing Existing Metadata
1. Find the page in the list
2. Click the edit icon
3. Modify the fields as needed
4. Preview the OG image
5. Save changes

### OG Image Best Practices
- **Dimensions**: 1200x630px (recommended)
- **File Size**: Under 5MB
- **Format**: JPG, PNG, or WebP
- **Content**: Include page title and branding

## Firebase Structure

### Collection: `page_metadata`
```typescript
{
  path: string           // URL path
  title: string         // Page title
  description: string   // Meta description
  keywords: string[]    // SEO keywords
  ogImage: string      // OG image URL
  ogImageId: string    // Cloudinary ID
  ogTitle: string      // Open Graph title
  ogDescription: string // Open Graph description
  twitterTitle: string // Twitter card title
  twitterDescription: string // Twitter description
  canonical: string    // Canonical URL
  published: boolean   // Published status
  lastModified: Date   // Last update time
  updatedBy: string    // User who updated
}
```

## Testing Metadata

### Social Media Debuggers
Test your metadata on these platforms:
- **Facebook**: https://developers.facebook.com/tools/debug/
- **Twitter**: https://cards-dev.twitter.com/validator
- **LinkedIn**: https://www.linkedin.com/post-inspector/

### Quick Test
1. Update metadata in admin
2. Share the URL on social media
3. Check if the correct image and text appear

## API Functions

### Core Functions
- `upsertPageMetadata()` - Create or update metadata
- `getPageMetadata()` - Fetch metadata for a path
- `getAllPageMetadata()` - List all metadata
- `deletePageMetadata()` - Remove metadata
- `uploadOGImage()` - Upload image to Firebase
- `generateNextMetadata()` - Convert to Next.js format

### Utility Functions
- `generatePageMetadata()` - Server-side metadata generation
- `generateBlogMetadata()` - Blog-specific metadata
- `generatePropertyMetadata()` - Property-specific metadata
- `generateLocationMetadata()` - Location-specific metadata

## Initialize Default Metadata

Run this command to populate initial metadata for all main pages:
```bash
npx tsx scripts/init-metadata.ts
```

## Troubleshooting

### Metadata Not Updating
1. Clear browser cache
2. Check Firebase console for data
3. Verify the path matches exactly
4. Ensure metadata is published

### OG Image Not Showing
1. Verify image URL is accessible
2. Check image dimensions (1200x630)
3. Test with social media debuggers
4. Clear social media cache

### Performance Optimization
- Metadata is cached in Next.js
- Client-side updates via MetadataProvider
- Real-time sync with Firebase
- Cloudinary CDN for images

## Security Notes
- Admin authentication required
- Firebase security rules protect data
- Image uploads validated for type/size
- XSS protection on all inputs

## Future Enhancements
- A/B testing for titles/descriptions
- Automated OG image generation
- Multi-language metadata support
- SEO performance tracking
- Schema.org structured data editor