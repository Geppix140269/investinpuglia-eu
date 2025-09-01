const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dusubfxgo',
  api_key: process.env.CLOUDINARY_API_KEY || '715336939112685',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'VPmMVRHyIH7qNPiubKjePp-2h30'
});

// Path to Sabine's portrait
const imagePath = path.join(__dirname, '..', 'public', 'Sabine_portrait.jpg');

console.log('Uploading Sabine\'s portrait to Cloudinary...');
console.log('Image path:', imagePath);

// Check if file exists
if (!fs.existsSync(imagePath)) {
  console.error('Error: Image file not found at', imagePath);
  process.exit(1);
}

// Upload to Cloudinary
cloudinary.uploader.upload(imagePath, {
  public_id: 'investinpuglia/team/sabine-van-putten',
  folder: 'investinpuglia/team',
  overwrite: true,
  transformation: [
    { width: 800, height: 800, crop: 'fill', gravity: 'face' },
    { quality: 'auto:best', format: 'auto' }
  ]
}, (error, result) => {
  if (error) {
    console.error('Upload failed:', error);
    process.exit(1);
  } else {
    console.log('✅ Successfully uploaded!');
    console.log('Public ID:', result.public_id);
    console.log('URL:', result.secure_url);
    console.log('\nOptimized URL for use in components:');
    console.log(`https://res.cloudinary.com/dusubfxgo/image/upload/c_fill,f_auto,g_face,h_800,q_auto:best,w_800/v${result.version}/${result.public_id}.jpg`);
  }
});