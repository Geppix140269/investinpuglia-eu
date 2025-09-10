# Bulk Video Upload Guide for Sanity

## Quick Answer: Yes, you can bulk upload Midjourney clips!

You have 3 options for uploading multiple videos to Sanity:

## Option 1: Manual Upload (Simple)
- Go to `http://localhost:3003/studio`
- Click "Create new Hero Video" for each video
- Upload videos one by one through the UI
- **Time**: ~2-3 minutes per video

## Option 2: Migrate Existing Videos (Recommended)
I've created a script that automatically downloads your current 3 videos and uploads them to Sanity.

### Setup Steps:

1. **Get Sanity Write Token**:
   - Go to https://sanity.io/manage
   - Select your project
   - Go to "API" tab
   - Click "Add API token"
   - Name: "Bulk Upload"
   - Permissions: "Editor" or "Administrator"
   - Copy the token

2. **Add Token to Environment**:
   Add this line to your `.env.local` file:
   ```
   SANITY_WRITE_TOKEN=your_token_here
   ```

3. **Run Migration Script**:
   ```bash
   node scripts/migrate-existing-videos.js
   ```

This will automatically:
- Download your 3 existing videos from Cloudinary
- Upload them to Sanity with proper metadata
- Create Hero Video documents
- Set them as "hero" section with proper order

## Option 3: Bulk Upload New Videos
For uploading many new Midjourney videos:

1. **Prepare your videos**:
   ```
   /videos/
   ├── video1.mp4
   ├── video1-poster.jpg
   ├── video2.mp4
   ├── video2-poster.jpg
   └── ...
   ```

2. **Edit the bulk upload script** (`scripts/bulk-upload-videos.js`):
   ```javascript
   const videosToUpload = [
     {
       filePath: './videos/luxury-pool.mp4',
       posterPath: './videos/luxury-pool-poster.jpg',
       title: 'Luxury Pool Video',
       name: 'Infinity Pool',
       section: 'portfolio', // or 'hero', 'about', etc.
       order: 0,
       description: 'Stunning infinity pool with ocean views'
     },
     // Add more videos...
   ];
   ```

3. **Run the script**:
   ```bash
   node scripts/bulk-upload-videos.js
   ```

## What Happens After Upload

Once videos are in Sanity:

### Hero Section
- Videos automatically appear in the hero rotation
- No code changes needed
- Manage through Sanity Studio

### Other Sections
Use the VideoSection component:
```tsx
// Portfolio background
<VideoSection 
  section="portfolio" 
  className="relative w-full min-h-screen"
  showIndicators={true}
  rotationInterval={10000}
>
  <YourContent />
</VideoSection>

// About section
<VideoSection 
  section="about" 
  className="relative w-full h-96"
  loop={true}
/>
```

## Benefits of Sanity Upload

### Performance
- ✅ Automatic optimization through Sanity + Cloudinary
- ✅ Adaptive streaming
- ✅ CDN delivery
- ✅ Image transformations

### Management
- ✅ Easy reordering through drag & drop
- ✅ Activate/deactivate without code changes
- ✅ A/B testing capabilities
- ✅ Version control

### Scalability
- ✅ Add unlimited videos
- ✅ Organize by sections
- ✅ Bulk operations through API
- ✅ Analytics and insights

## File Size Recommendations

For optimal performance:
- **Video files**: 5-15MB each (Sanity will optimize)
- **Poster images**: 200-500KB each
- **Resolution**: 1920x1080 or 3840x2160 for 4K
- **Format**: MP4 with H.264 encoding

## Next Steps

1. **Get your Sanity write token** (5 minutes)
2. **Run the migration script** to move existing videos (5 minutes)
3. **Upload new Midjourney videos** through Studio UI or bulk script
4. **Use VideoSection component** to add videos to other pages

Ready to bulk upload your Midjourney clips? Start with the migration script to move your existing 3 videos, then use the Studio for new uploads!