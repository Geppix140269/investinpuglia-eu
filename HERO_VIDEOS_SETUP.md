# Hero Videos Setup Guide

## Overview
The hero videos have been successfully moved from hardcoded URLs to Sanity CMS management. This provides better performance, easier content management, and centralized control.

## What's Been Done

### 1. Created Sanity Schema
- Added `heroVideo` schema in `/sanity/schemaTypes/heroVideo.ts`
- Supports video files, poster images, display names, and ordering
- Includes active/inactive status for easy management

### 2. Updated Hero Component
- Component now fetches videos from Sanity via `/lib/sanity/heroVideos.ts`
- Falls back to hardcoded videos if Sanity fails
- Includes loading states and error handling

### 3. Current Video Information
Your existing videos are currently hardcoded as fallbacks:

1. **Beach Club Aperitivo**
   - Video: `https://res.cloudinary.com/dusubfxgo/video/upload/v1756888562/investinpuglia/hero-videos/beach-club.mp4`
   - Poster: `https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto:low,w_1920,h_1080,c_limit/v1756888562/investinpuglia/hero-videos/beach-club.jpg`

2. **Rooftop Bar View**
   - Video: `https://res.cloudinary.com/dusubfxgo/video/upload/v1756888546/investinpuglia/hero-videos/rooftop-bar.mp4`
   - Poster: `https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto:low,w_1920,h_1080,c_limit/v1756888546/investinpuglia/hero-videos/rooftop-bar.jpg`

3. **Helicopter Arrival**
   - Video: `https://res.cloudinary.com/dusubfxgo/video/upload/v1756888555/investinpuglia/hero-videos/helicopter-pov.mp4`
   - Poster: `https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto:low,w_1920,h_1080,c_limit/v1756888555/investinpuglia/hero-videos/helicopter-pov.jpg`

## How to Add Videos to Sanity

### Step 1: Access Sanity Studio
1. Go to `http://localhost:3000/studio` (or your studio URL)
2. Log in to your Sanity account

### Step 2: Create Hero Video Documents
1. In Sanity Studio, look for "Hero Video" in the document types
2. Click "Create new Hero Video"
3. For each video, fill in:
   - **Video Title**: Internal title for management
   - **Display Name**: Name shown to users (e.g., "Beach Club Aperitivo")
   - **Video File**: Upload your video file from Cloudinary
   - **Poster Image**: Upload the poster image
   - **Display Order**: 0, 1, 2 (for order in rotation)
   - **Active**: Check to include in rotation
   - **Description**: Optional internal notes

### Step 3: Upload Process
Since your videos are already in Cloudinary, you can:

1. **Option A: Re-upload through Sanity**
   - Download videos from current Cloudinary URLs
   - Upload through Sanity (will automatically sync to Cloudinary)

2. **Option B: Reference existing Cloudinary assets**
   - Use Sanity's Cloudinary plugin if configured
   - Or manually reference existing URLs

### Step 4: Verify Setup
1. After adding videos to Sanity, refresh your homepage
2. Videos should now load from Sanity instead of fallbacks
3. Check browser console for any "No videos found in Sanity" warnings

## Benefits of This Setup

### Performance
- ✅ Centralized video management
- ✅ Optimized delivery through Sanity + Cloudinary
- ✅ Better caching and CDN utilization
- ✅ Automatic image optimization

### Management
- ✅ Easy to add/remove/reorder videos
- ✅ Can activate/deactivate videos without code changes
- ✅ Better content workflow for non-technical users
- ✅ Version control and publish/draft states

### Scalability
- ✅ No hardcoded URLs in components
- ✅ Easy to add multiple video sets for different pages
- ✅ A/B testing capabilities
- ✅ Analytics and usage tracking through Sanity

## Troubleshooting

### Videos Not Loading
1. Check Sanity Studio - are videos published?
2. Verify `isActive` is true for all videos
3. Check browser console for error messages
4. Ensure Sanity environment variables are set correctly

### Performance Issues
1. Ensure videos are properly optimized in Cloudinary
2. Check video file sizes (should be under 10MB each)
3. Verify Cloudinary transformations are applied
4. Consider adding video compression settings

## Using Videos in Other Sections

### Option 1: Reusable VideoSection Component
Use the new `VideoSection` component anywhere:

```tsx
import VideoSection from '@/components/VideoSection';

// Simple video background
<VideoSection 
  section="about" 
  className="relative w-full h-96"
>
  <div className="flex items-center justify-center h-full">
    <h2 className="text-white text-4xl font-bold">About Section</h2>
  </div>
</VideoSection>

// Portfolio background with rotation
<VideoSection 
  section="portfolio" 
  className="relative w-full h-screen"
  showIndicators={true}
  rotationInterval={10000}
  loop={true}
>
  <YourPortfolioContent />
</VideoSection>

// Services section with manual controls
<VideoSection 
  section="services" 
  className="relative w-full h-64"
  autoPlay={false}
  controls={true}
  showIndicators={false}
/>
```

### Option 2: Direct Query in Components
```tsx
import { getVideosBySection } from '@/lib/sanity/heroVideos';

const MyComponent = () => {
  const [videos, setVideos] = useState([]);
  
  useEffect(() => {
    const fetchVideos = async () => {
      const aboutVideos = await getVideosBySection('about');
      setVideos(aboutVideos);
    };
    fetchVideos();
  }, []);
  
  // Use videos however you want
};
```

### Available Sections
The schema now supports these predefined sections:
- `hero` (existing hero section)
- `about` (About section videos)
- `portfolio` (Portfolio background videos)
- `services` (Services section videos)
- `testimonials` (Testimonials background)
- `footer` (Footer area videos)

## Examples of Use Cases

### 1. Hero Section (Current)
- **3-4 rotating videos** showcasing luxury lifestyle
- **8-second intervals** with smooth transitions
- **Mobile optimization** with different layouts

### 2. Portfolio Section Background
```tsx
<VideoSection 
  section="portfolio" 
  className="relative w-full min-h-screen"
  showIndicators={true}
  rotationInterval={12000}
>
  <PortfolioGrid />
</VideoSection>
```

### 3. About Section with Single Loop Video
```tsx
<VideoSection 
  section="about" 
  className="relative w-full h-96"
  loop={true}
  rotationInterval={0} // No rotation
>
  <AboutContent />
</VideoSection>
```

### 4. Services Section with Manual Control
```tsx
<VideoSection 
  section="services" 
  className="relative w-full h-64"
  autoPlay={false}
  controls={true}
  muted={false}
/>
```

## Performance Benefits

### Before (Hardcoded URLs)
- ❌ Videos hardcoded in components
- ❌ No easy content management
- ❌ Requires developer to change videos
- ❌ No optimization control

### After (Sanity + Cloudinary)
- ✅ Dynamic video loading from Sanity
- ✅ Automatic Cloudinary optimization
- ✅ Easy content management through Studio
- ✅ A/B testing capabilities
- ✅ Performance monitoring
- ✅ Reusable across sections

## Next Steps

1. **Add current videos to Sanity Studio** (you'll need to do this manually)
2. **Set section = "hero"** for existing videos
3. **Add videos for other sections** as needed
4. **Use VideoSection component** in other parts of the site
5. **Remove fallback videos** once Sanity is fully populated

The system is now ready for Sanity-managed videos across your entire site!