const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Initialize Sanity client
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'trdbxmjo',
  dataset: process.env.SANITY_DATASET || 'production',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2025-01-01',
});

// Path to MIDJOURNEY CLIPS folder (videos only)
const CLIPS_PATH = 'C:\\Users\\gfuna\\Dropbox\\PC\\Desktop\\BUSINESS\\INVEST IN PUGLIA\\Marketing\\Assets\\MIDJOURNEY\\CLIPS';

async function uploadVideos() {
  console.log('Uploading video files from CLIPS folder...\n');
  
  const files = fs.readdirSync(CLIPS_PATH).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.mp4', '.mov', '.webm'].includes(ext);
  });
  
  console.log(`Found ${files.length} video files\n`);
  
  for (const filename of files) {
    try {
      console.log(`Uploading: ${filename}`);
      const filePath = path.join(CLIPS_PATH, filename);
      const fileBuffer = fs.readFileSync(filePath);
      
      // Upload as 'file' type for videos
      const asset = await client.assets.upload('file', fileBuffer, {
        filename: filename
      });
      
      console.log(`✓ Success - ID: ${asset._id}`);
      console.log(`  URL: ${asset.url}\n`);
    } catch (error) {
      console.log(`✗ Failed: ${error.message}\n`);
    }
  }
  
  console.log('Video upload complete!');
}

uploadVideos().catch(console.error);