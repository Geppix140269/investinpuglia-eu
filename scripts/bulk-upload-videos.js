const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Configure your Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-07-09',
  token: process.env.SANITY_WRITE_TOKEN, // You'll need to create this
});

// Define your videos with metadata
const videosToUpload = [
  {
    filePath: './videos/beach-club.mp4',
    posterPath: './videos/beach-club-poster.jpg',
    title: 'Beach Club Aperitivo Video',
    name: 'Beach Club Aperitivo',
    section: 'hero',
    order: 0,
    description: 'Luxury beach club setting with aperitivo atmosphere'
  },
  {
    filePath: './videos/rooftop-bar.mp4',
    posterPath: './videos/rooftop-bar-poster.jpg',
    title: 'Rooftop Bar View Video',
    name: 'Rooftop Bar View',
    section: 'hero',
    order: 1,
    description: 'Stunning rooftop bar with panoramic views'
  },
  {
    filePath: './videos/helicopter-pov.mp4',
    posterPath: './videos/helicopter-pov-poster.jpg',
    title: 'Helicopter Arrival Video',
    name: 'Helicopter Arrival',
    section: 'hero',
    order: 2,
    description: 'Dramatic helicopter point of view arrival'
  },
  // Add more videos here...
];

async function uploadAsset(filePath, type = 'file') {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const filename = path.basename(filePath);
    
    console.log(`Uploading ${type}: ${filename}...`);
    
    const asset = await client.assets.upload(type, fileBuffer, {
      filename: filename
    });
    
    console.log(`✅ Uploaded ${filename}: ${asset._id}`);
    return asset;
  } catch (error) {
    console.error(`❌ Failed to upload ${filePath}:`, error.message);
    return null;
  }
}

async function createVideoDocument(videoData, videoAsset, posterAsset) {
  try {
    const doc = {
      _type: 'heroVideo',
      title: videoData.title,
      name: videoData.name,
      section: videoData.section,
      order: videoData.order,
      isActive: true,
      description: videoData.description,
      video: {
        _type: 'file',
        asset: {
          _type: 'reference',
          _ref: videoAsset._id
        }
      },
      poster: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: posterAsset._id
        }
      }
    };

    const result = await client.create(doc);
    console.log(`✅ Created document: ${result.title} (${result._id})`);
    return result;
  } catch (error) {
    console.error(`❌ Failed to create document for ${videoData.title}:`, error.message);
    return null;
  }
}

async function bulkUploadVideos() {
  console.log('🚀 Starting bulk video upload...\n');
  
  for (const videoData of videosToUpload) {
    console.log(`\n📹 Processing: ${videoData.title}`);
    
    // Check if files exist
    if (!fs.existsSync(videoData.filePath)) {
      console.log(`❌ Video file not found: ${videoData.filePath}`);
      continue;
    }
    
    if (!fs.existsSync(videoData.posterPath)) {
      console.log(`❌ Poster file not found: ${videoData.posterPath}`);
      continue;
    }
    
    // Upload video file
    const videoAsset = await uploadAsset(videoData.filePath, 'file');
    if (!videoAsset) continue;
    
    // Upload poster image
    const posterAsset = await uploadAsset(videoData.posterPath, 'image');
    if (!posterAsset) continue;
    
    // Create Sanity document
    await createVideoDocument(videoData, videoAsset, posterAsset);
    
    console.log(`✅ Completed: ${videoData.title}\n`);
    
    // Add small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('🎉 Bulk upload completed!');
}

// Run the script
if (require.main === module) {
  bulkUploadVideos().catch(console.error);
}

module.exports = { bulkUploadVideos };