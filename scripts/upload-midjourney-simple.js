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

// Path to MIDJOURNEY assets
const ASSETS_PATH = 'C:\\Users\\gfuna\\Dropbox\\PC\\Desktop\\BUSINESS\\INVEST IN PUGLIA\\Marketing\\Assets\\MIDJOURNEY';

// Function to get all media files
function getMediaFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getMediaFiles(fullPath));
    } else {
      const ext = path.extname(item).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.gif', '.webp', '.mp4', '.mov', '.webm'].includes(ext)) {
        files.push({
          path: fullPath,
          name: item,
          type: ['.mp4', '.mov', '.webm'].includes(ext) ? 'video' : 'image'
        });
      }
    }
  });
  
  return files;
}

// Main upload function
async function uploadFiles() {
  console.log('MIDJOURNEY Asset Uploader for Sanity\n');
  console.log('Scanning for files...\n');
  
  const files = getMediaFiles(ASSETS_PATH);
  console.log(`Found ${files.length} media files\n`);
  
  const results = [];
  
  for (const file of files) {
    try {
      console.log(`Uploading: ${file.name}`);
      
      const fileBuffer = fs.readFileSync(file.path);
      // Sanity uses 'file' for videos, not 'video'
      const assetType = file.type === 'video' ? 'file' : file.type;
      const asset = await client.assets.upload(assetType, fileBuffer, {
        filename: file.name
      });
      
      console.log(`✓ Success - ID: ${asset._id}\n`);
      
      results.push({
        file: file.name,
        assetId: asset._id,
        url: asset.url,
        success: true
      });
    } catch (error) {
      console.log(`✗ Failed: ${error.message}\n`);
      results.push({
        file: file.name,
        error: error.message,
        success: false
      });
    }
  }
  
  // Summary
  console.log('\n========== SUMMARY ==========');
  console.log(`Uploaded: ${results.filter(r => r.success).length}/${files.length}`);
  
  // Save report
  const reportFile = `upload-report-${Date.now()}.json`;
  fs.writeFileSync(reportFile, JSON.stringify(results, null, 2));
  console.log(`\nReport saved: ${reportFile}`);
}

// Run
uploadFiles().catch(console.error);