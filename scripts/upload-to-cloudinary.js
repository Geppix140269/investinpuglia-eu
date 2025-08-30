const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '.env.local' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Images to upload (excluding node_modules and dist)
const imagesToUpload = [
  // Project images
  'public/projects/bb-blue-otranto-view.jpg',
  'public/projects/bb-blue-otranto-pool.jpg',
  'public/projects/donna-menga-exterior.jpg',
  'public/projects/riva-marina-bar.jpg',
  'public/projects/riva-marina-exterior.jpg',
  'public/projects/santa-lucia-pool.jpg',
  'public/projects/santa-lucia-wedding.jpg',
  'public/projects/baglioni-pool.jpg',
  'public/projects/baglioni-room.jpg',
  
  // Public root images
  'public/EN_co_fundedvertical_RGB_POS.png',
  'public/CAPITALIMPRESE-min.png',
  'public/Giuseppe Funaro 062025.png',
  'public/Hero_BG.jpg',
  'public/LOGO-REGIONE-PUGLIA-PNG.webp',
  'public/ITC-min.png',
  'public/Logo_InvestInPuglia_Black.png',
  'public/Logo_InvestInPuglia_Morph.png',
  'public/Logo_InvestInPuglia_Teal.png',
  'public/Logo_InvestInPuglia_White.png',
  'public/giuseppe-photo.jpg',
  'public/quarta-photo.jpg',
  'public/russo-photo.jpg',
  'public/regione_puglia-Photoroom.png',
  'public/capitalimprese_text.png',
  'public/og-image.png',
  
  // Icons
  'public/icon/Bell.png',
  'public/icon/Gavel.png',
  'public/icon/Euro.png',
  'public/icon/HouseArrowUP.png',
  'public/icon/Hammer.png',
  'public/icon/Gear.png',
  'public/icon/MapPin.png',
  'public/icon/MagnifyingGlass.png',
  'public/icon/LockKeyhole.png',
  'public/icon/SpeechBubble.png',
  'public/icon/Shield.png',
  'public/icon/User.png',
  'public/icon/UpwardArrow.png',
  'public/icon/TrulloHouse.png',
  'public/icon/Speedometer.png',
  'public/icon/Villa.png',
  'public/icon/alert.png',
  'public/icon/calendar.png',
  'public/icon/calculator.png',
  'public/icon/check.png',
  'public/icon/chart.png',
  'public/icon/crown.png',
  'public/icon/globe.png',
  'public/icon/document.png',
  'public/icon/mail.png',
  'public/icon/smartphone.png',
  'public/icon/whatsapp.png',
  'public/icon/triangularFlag.png',
  
  // Industry images
  'public/images/industries/hotels-puglia.jpg',
  'public/images/industries/manufacturing-puglia.jpg',
  'public/images/industries/restaurants-puglia.jpg',
  'public/images/industries/trulli-alberobello.jpg',
  
  // Location images
  'public/images/locations/brindisi-thumb.jpg',
  'public/images/locations/bari-thumb.jpg',
  'public/images/locations/lecce-thumb.jpg',
  'public/images/locations/polignano-a-mare-thumb.jpg',
  'public/images/locations/taranto-thumb.jpg',
  'public/images/locations/ostuni-thumb.jpg',
  'public/images/locations/trulli-alberobello.jpg'
];

// Store mapping of local paths to Cloudinary URLs
const urlMapping = {};

async function uploadImage(localPath) {
  try {
    const absolutePath = path.join(process.cwd(), localPath);
    
    // Check if file exists
    if (!fs.existsSync(absolutePath)) {
      console.log(`File not found: ${localPath}`);
      return null;
    }
    
    // Generate public_id from path (removing public/ and extension)
    const publicId = localPath
      .replace('public/', '')
      .replace(/\.(jpg|jpeg|png|webp|svg|gif)$/i, '')
      .replace(/\s+/g, '-')
      .toLowerCase();
    
    console.log(`Uploading ${localPath} as ${publicId}...`);
    
    const result = await cloudinary.uploader.upload(absolutePath, {
      public_id: `investinpuglia/${publicId}`,
      folder: 'investinpuglia',
      overwrite: true,
      resource_type: 'auto',
      transformation: [
        { quality: 'auto:best' },
        { fetch_format: 'auto' }
      ]
    });
    
    console.log(`✓ Uploaded: ${result.secure_url}`);
    
    // Store mapping
    urlMapping[localPath] = result.secure_url;
    
    return result.secure_url;
  } catch (error) {
    console.error(`Error uploading ${localPath}:`, error.message);
    return null;
  }
}

async function uploadAllImages() {
  console.log('Starting Cloudinary upload...\n');
  
  for (const imagePath of imagesToUpload) {
    await uploadImage(imagePath);
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Save URL mapping to file
  const mappingPath = path.join(process.cwd(), 'cloudinary-urls.json');
  fs.writeFileSync(mappingPath, JSON.stringify(urlMapping, null, 2));
  
  console.log('\n✅ Upload complete!');
  console.log(`URL mapping saved to: ${mappingPath}`);
}

// Run the upload
uploadAllImages().catch(console.error);