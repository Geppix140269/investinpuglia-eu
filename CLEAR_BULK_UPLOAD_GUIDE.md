# CLEAR Bulk Upload Guide - Step by Step

## What You Have Now ✅
- Your existing 3 videos are in Sanity and working
- Hero section loads videos from Sanity instead of hardcoded URLs
- Sanity Studio is accessible at `http://localhost:3003/studio`

## To Add NEW Midjourney Videos in Bulk

### Step 1: Prepare Your Files
Create a folder structure like this:
```
C:\Development\investinpuglia\videos\
├── luxury-pool.mp4
├── luxury-pool-poster.jpg
├── yacht-sunset.mp4
├── yacht-sunset-poster.jpg
├── villa-exterior.mp4
├── villa-exterior-poster.jpg
└── ... (more videos)
```

**File naming rules:**
- Video: `anything.mp4`
- Poster: `anything-poster.jpg` or `anything-poster.png`

### Step 2: Run the Bulk Upload
```bash
node scripts/simple-bulk-upload.js
```

**What happens:**
1. Script finds all `.mp4` files in `/videos/` folder
2. Looks for matching poster images
3. Uploads both video and poster to Sanity
4. Creates Hero Video documents automatically
5. Names them based on filename (e.g., `luxury-pool.mp4` → "Luxury Pool")

### Step 3: Configure in Sanity Studio
After upload, go to `http://localhost:3003/studio`:
1. Find your new Hero Video documents
2. Edit each one to:
   - Change the **Section** (hero, portfolio, about, services, etc.)
   - Adjust the **Display Order** 
   - Modify the **Display Name** if needed
   - Add better **Description**

## Example Walkthrough

Let's say you have these Midjourney clips:
- `beach-villa.mp4` + `beach-villa-poster.jpg`
- `rooftop-dining.mp4` + `rooftop-dining-poster.jpg` 
- `infinity-pool.mp4` + `infinity-pool-poster.jpg`

**Step 1:** Put them in `/videos/` folder
**Step 2:** Run: `node scripts/simple-bulk-upload.js`
**Step 3:** You'll see in console:
```
🚀 Starting bulk upload from videos folder...
📹 Found 3 video files

🎬 Creating: Beach Villa
📤 Uploading: beach-villa.mp4...
✅ Uploaded: beach-villa.mp4
📤 Uploading: beach-villa-poster.jpg...
✅ Uploaded: beach-villa-poster.jpg
✅ Created: Beach Villa Video

🎬 Creating: Rooftop Dining
📤 Uploading: rooftop-dining.mp4...
✅ Uploaded: rooftop-dining.mp4
📤 Uploading: rooftop-dining-poster.jpg...
✅ Uploaded: rooftop-dining-poster.jpg
✅ Created: Rooftop Dining Video

🎉 Bulk upload completed!
```

**Step 4:** Go to Studio, see your 3 new videos, edit as needed

## Use Cases

### For Hero Section (rotating backgrounds)
- Leave **Section** as "hero"
- Set **Display Order**: 0, 1, 2, 3...
- Mark as **Active**

### For Portfolio Page Background
- Change **Section** to "portfolio"
- Add VideoSection component to portfolio page:
```tsx
<VideoSection section="portfolio" className="min-h-screen">
  <YourPortfolioContent />
</VideoSection>
```

### For About Page Background  
- Change **Section** to "about"
- Use in about page component

## Troubleshooting

### "No .mp4 files found"
- Make sure videos are in `/videos/` folder
- Check file extensions (must be `.mp4`)

### "No poster found"
- Make sure poster has same name as video
- `video.mp4` needs `video-poster.jpg` or `video-poster.png`

### Upload fails
- Check your internet connection
- Verify `SANITY_API_WRITE_TOKEN` is still valid
- Try uploading smaller batches (5-10 videos at a time)

## That's It!

This process lets you:
1. Drop videos in a folder
2. Run one command
3. Manage everything through Sanity Studio

Much simpler than manual uploading through the web interface!