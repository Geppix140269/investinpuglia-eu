const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);

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

// Supported file extensions
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
const VIDEO_EXTENSIONS = ['.mp4', '.avi', '.mov', '.webm'];

// Function to get all files recursively
async function getFiles(dir, fileList = []) {
  const files = await readdir(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const fileStat = await stat(filePath);
    
    if (fileStat.isDirectory()) {
      await getFiles(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (IMAGE_EXTENSIONS.includes(ext) || VIDEO_EXTENSIONS.includes(ext)) {
        fileList.push({
          path: filePath,
          name: file,
          type: IMAGE_EXTENSIONS.includes(ext) ? 'image' : 'video',
          size: fileStat.size
        });
      }
    }
  }
  
  return fileList;
}

// Function to upload a single asset to Sanity
async function uploadAsset(file) {
  try {
    console.log(`Uploading ${file.name}...`);
    
    const fileBuffer = await readFile(file.path);
    
    // Upload the asset
    const asset = await client.assets.upload(file.type, fileBuffer, {
      filename: file.name,
      title: file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '),
      description: `MIDJOURNEY asset - ${file.name}`,
      source: {
        name: 'midjourney-upload',
        id: file.name
      }
    });
    
    console.log(`✓ Successfully uploaded: ${file.name}`);
    console.log(`  Asset ID: ${asset._id}`);
    console.log(`  URL: ${asset.url}`);
    
    return {
      success: true,
      file: file.name,
      assetId: asset._id,
      url: asset.url
    };
  } catch (error) {
    console.error(`✗ Failed to upload ${file.name}:`, error.message);
    return {
      success: false,
      file: file.name,
      error: error.message
    };
  }
}

// Function to create a document to track uploaded assets
async function createAssetDocument(uploadResult) {
  if (!uploadResult.success) return;
  
  try {
    const doc = {
      _type: 'midjourneyAsset',
      title: uploadResult.file.replace(/\.[^/.]+$/, '').replace(/_/g, ' '),
      filename: uploadResult.file,
      asset: {
        _type: 'reference',
        _ref: uploadResult.assetId
      },
      uploadedAt: new Date().toISOString()
    };
    
    await client.create(doc);
    console.log(`  Document created for ${uploadResult.file}`);
  } catch (error) {
    // If document type doesn't exist, that's okay - assets are still uploaded
    if (error.message.includes('Invalid type')) {
      console.log(`  Note: Document type 'midjourneyAsset' not found - asset uploaded without document`);
    } else {
      console.error(`  Warning: Could not create document for ${uploadResult.file}:`, error.message);
    }
  }
}

// Main function
async function main() {
  console.log('========================================');
  console.log('MIDJOURNEY to Sanity Asset Uploader');
  console.log('========================================\n');
  
  console.log(`Assets directory: ${ASSETS_PATH}\n`);
  
  // Check if directory exists
  if (!fs.existsSync(ASSETS_PATH)) {
    console.error('Error: Assets directory not found!');
    process.exit(1);
  }
  
  // Get all files
  console.log('Scanning for media files...');
  const files = await getFiles(ASSETS_PATH);
  
  console.log(`Found ${files.length} media files:\n`);
  console.log(`- Images: ${files.filter(f => f.type === 'image').length}`);
  console.log(`- Videos: ${files.filter(f => f.type === 'video').length}\n`);
  
  // Ask for confirmation
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  const answer = await new Promise(resolve => {
    readline.question('Do you want to proceed with the upload? (yes/no): ', resolve);
  });
  
  readline.close();
  
  if (answer.toLowerCase() !== 'yes' && answer.toLowerCase() !== 'y') {
    console.log('Upload cancelled.');
    process.exit(0);
  }
  
  console.log('\nStarting upload process...\n');
  
  // Upload files with batch processing
  const results = [];
  const BATCH_SIZE = 5; // Upload 5 files at a time
  
  for (let i = 0; i < files.length; i += BATCH_SIZE) {
    const batch = files.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.all(batch.map(uploadAsset));
    
    // Create documents for successful uploads
    await Promise.all(batchResults.map(createAssetDocument));
    
    results.push(...batchResults);
    
    // Small delay between batches to avoid rate limiting
    if (i + BATCH_SIZE < files.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  // Summary
  console.log('\n========================================');
  console.log('Upload Summary');
  console.log('========================================\n');
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`Total files processed: ${results.length}`);
  console.log(`Successfully uploaded: ${successful.length}`);
  console.log(`Failed uploads: ${failed.length}`);
  
  if (failed.length > 0) {
    console.log('\nFailed uploads:');
    failed.forEach(f => {
      console.log(`  - ${f.file}: ${f.error}`);
    });
  }
  
  // Save results to JSON file
  const reportPath = path.join(process.cwd(), `sanity-upload-report-${new Date().toISOString().split('T')[0]}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\nDetailed report saved to: ${reportPath}`);
  
  console.log('\nUpload process completed!');
}

// Run the script
main().catch(error => {
  console.error('Script error:', error);
  process.exit(1);
});