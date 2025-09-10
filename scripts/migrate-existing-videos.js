require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');
const https = require('https');
const fs = require('fs');
const path = require('path');

// Configure your Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-07-09',
  token: process.env.SANITY_API_WRITE_TOKEN, // Using your existing token
});

// Your existing videos from the component
const existingVideos = [
  {
    videoUrl: 'https://res.cloudinary.com/dusubfxgo/video/upload/v1756888562/investinpuglia/hero-videos/beach-club.mp4',
    posterUrl: 'https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto:low,w_1920,h_1080,c_limit/v1756888562/investinpuglia/hero-videos/beach-club.jpg',
    title: 'Beach Club Aperitivo Video',
    name: 'Beach Club Aperitivo',
    section: 'hero',
    order: 0,
    description: 'Luxury beach club setting with aperitivo atmosphere'
  },
  {
    videoUrl: 'https://res.cloudinary.com/dusubfxgo/video/upload/v1756888546/investinpuglia/hero-videos/rooftop-bar.mp4',
    posterUrl: 'https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto:low,w_1920,h_1080,c_limit/v1756888546/investinpuglia/hero-videos/rooftop-bar.jpg',
    title: 'Rooftop Bar View Video',
    name: 'Rooftop Bar View',
    section: 'hero',
    order: 1,
    description: 'Stunning rooftop bar with panoramic views'
  },
  {
    videoUrl: 'https://res.cloudinary.com/dusubfxgo/video/upload/v1756888555/investinpuglia/hero-videos/helicopter-pov.mp4',
    posterUrl: 'https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto:low,w_1920,h_1080,c_limit/v1756888555/investinpuglia/hero-videos/helicopter-pov.jpg',
    title: 'Helicopter Arrival Video',
    name: 'Helicopter Arrival',
    section: 'hero',
    order: 2,
    description: 'Dramatic helicopter point of view arrival'
  }
];

function downloadFile(url, filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filename);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✅ Downloaded: ${filename}`);
        resolve(filename);
      });
      
      file.on('error', (err) => {
        fs.unlink(filename, () => {}); // Delete the file on error
        reject(err);
      });
    }).on('error', reject);
  });
}

async function uploadAssetFromBuffer(buffer, filename, type = 'file') {
  try {
    console.log(`Uploading ${type}: ${filename}...`);
    
    const asset = await client.assets.upload(type, buffer, {
      filename: filename
    });
    
    console.log(`✅ Uploaded ${filename} to Sanity: ${asset._id}`);
    return asset;
  } catch (error) {
    console.error(`❌ Failed to upload ${filename}:`, error.message);
    return null;
  }
}

async function downloadAndUpload(url, filename, type = 'file') {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      
      const chunks = [];
      response.on('data', chunk => chunks.push(chunk));
      response.on('end', async () => {
        try {
          const buffer = Buffer.concat(chunks);
          console.log(`✅ Downloaded ${filename} (${buffer.length} bytes)`);
          
          const asset = await uploadAssetFromBuffer(buffer, filename, type);
          resolve(asset);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
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

async function migrateExistingVideos() {
  console.log('🚀 Starting migration of existing videos to Sanity...\n');
  
  // Check if we have the write token
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('❌ Missing SANITY_API_WRITE_TOKEN in environment variables');
    console.log('   Add this to your .env.local file:');
    console.log('   SANITY_API_WRITE_TOKEN=your_token_here');
    return;
  }
  
  for (const videoData of existingVideos) {
    console.log(`\n📹 Processing: ${videoData.title}`);
    
    try {
      // Download and upload video
      const videoFilename = `${videoData.name.toLowerCase().replace(/\s+/g, '-')}.mp4`;
      const videoAsset = await downloadAndUpload(videoData.videoUrl, videoFilename, 'file');
      if (!videoAsset) continue;
      
      // Download and upload poster
      const posterFilename = `${videoData.name.toLowerCase().replace(/\s+/g, '-')}-poster.jpg`;
      const posterAsset = await downloadAndUpload(videoData.posterUrl, posterFilename, 'image');
      if (!posterAsset) continue;
      
      // Create Sanity document
      await createVideoDocument(videoData, videoAsset, posterAsset);
      
      console.log(`✅ Completed: ${videoData.title}\n`);
      
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`❌ Failed to process ${videoData.title}:`, error.message);
    }
  }
  
  console.log('🎉 Migration completed!');
  console.log('📝 Your videos are now managed through Sanity Studio');
  console.log('🌐 Access Studio at: http://localhost:3003/studio');
}

// Run the script
if (require.main === module) {
  migrateExistingVideos().catch(console.error);
}

module.exports = { migrateExistingVideos };