require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Configure Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-07-09',
  token: process.env.SANITY_API_WRITE_TOKEN,
});

async function uploadFile(filePath, type = 'file') {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const filename = path.basename(filePath);
    
    console.log(`📤 Uploading: ${filename}...`);
    
    const asset = await client.assets.upload(type, fileBuffer, {
      filename: filename
    });
    
    console.log(`✅ Uploaded: ${filename}`);
    return asset;
  } catch (error) {
    console.error(`❌ Failed to upload ${filePath}:`, error.message);
    return null;
  }
}

async function createVideoDocument(videoFile, posterFile, metadata) {
  console.log(`\n🎬 Creating: ${metadata.name}`);
  
  // Upload video file
  const videoAsset = await uploadFile(videoFile, 'file');
  if (!videoAsset) return null;
  
  // Upload poster image
  const posterAsset = await uploadFile(posterFile, 'image');
  if (!posterAsset) return null;
  
  // Create document
  const doc = {
    _type: 'heroVideo',
    title: metadata.title,
    name: metadata.name,
    section: metadata.section,
    order: metadata.order,
    isActive: true,
    description: metadata.description || '',
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

  try {
    const result = await client.create(doc);
    console.log(`✅ Created: ${result.title}`);
    return result;
  } catch (error) {
    console.error(`❌ Failed to create document:`, error.message);
    return null;
  }
}

async function bulkUploadFromFolder() {
  console.log('🚀 Starting bulk upload from videos folder...\n');
  
  const videosFolder = path.join(__dirname, '..', 'videos');
  
  if (!fs.existsSync(videosFolder)) {
    console.log('📁 Creating videos folder...');
    fs.mkdirSync(videosFolder, { recursive: true });
    console.log(`❗ Please add your video files to: ${videosFolder}`);
    console.log('   Format: video-name.mp4 and video-name-poster.jpg');
    return;
  }
  
  const files = fs.readdirSync(videosFolder);
  const videoFiles = files.filter(f => f.endsWith('.mp4'));
  
  if (videoFiles.length === 0) {
    console.log(`❗ No .mp4 files found in ${videosFolder}`);
    console.log('   Add your videos and posters, then run this script again.');
    return;
  }
  
  console.log(`📹 Found ${videoFiles.length} video files`);
  
  let order = 10; // Start from 10 to avoid conflicts with existing videos
  
  for (const videoFile of videoFiles) {
    const videoName = path.parse(videoFile).name;
    const videoPath = path.join(videosFolder, videoFile);
    
    // Look for poster image
    const possiblePosters = [
      `${videoName}-poster.jpg`,
      `${videoName}-poster.png`,
      `${videoName}.jpg`,
      `${videoName}.png`
    ];
    
    let posterPath = null;
    for (const posterName of possiblePosters) {
      const fullPosterPath = path.join(videosFolder, posterName);
      if (fs.existsSync(fullPosterPath)) {
        posterPath = fullPosterPath;
        break;
      }
    }
    
    if (!posterPath) {
      console.log(`⚠️  No poster found for ${videoFile} (looking for ${possiblePosters.join(', ')})`);
      continue;
    }
    
    // Create metadata from filename
    const displayName = videoName
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
    
    const metadata = {
      title: `${displayName} Video`,
      name: displayName,
      section: 'hero', // You can change this to 'portfolio', 'about', etc.
      order: order++,
      description: `Generated from ${videoFile}`
    };
    
    await createVideoDocument(videoPath, posterPath, metadata);
    
    // Small delay to avoid overwhelming Sanity
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n🎉 Bulk upload completed!');
  console.log('🌐 Check your videos at: http://localhost:3003/studio');
}

// Run the script
if (require.main === module) {
  bulkUploadFromFolder().catch(console.error);
}

module.exports = { bulkUploadFromFolder };