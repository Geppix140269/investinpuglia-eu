# Videos Folder - For Bulk Upload

## How to Use This Folder

1. **Add your Midjourney video clips here**
2. **Follow this naming pattern:**
   - `video-name.mp4` (your video file)
   - `video-name-poster.jpg` (thumbnail/poster image)

## Example Structure:
```
videos/
├── luxury-villa.mp4
├── luxury-villa-poster.jpg
├── yacht-sunset.mp4
├── yacht-sunset-poster.jpg
├── pool-party.mp4
├── pool-party-poster.jpg
└── README.md (this file)
```

## Run Bulk Upload:
```bash
node scripts/simple-bulk-upload.js
```

This will automatically:
- Upload all .mp4 files to Sanity
- Upload matching poster images  
- Create Hero Video documents
- Make them available in Sanity Studio

## After Upload:
Go to `http://localhost:3003/studio` to manage your videos (change sections, order, names, etc.)