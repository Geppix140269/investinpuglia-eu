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

// Remaining images to upload
const remainingImages = [
  'public/images/industries/trulli-alberobello.jpg',
  'public/images/locations/brindisi-thumb.jpg',
  'public/images/locations/bari-thumb.jpg',
  'public/images/locations/lecce-thumb.jpg',
  'public/images/locations/polignano-a-mare-thumb.jpg',
  'public/images/locations/taranto-thumb.jpg',
  'public/images/locations/ostuni-thumb.jpg',
  'public/images/locations/trulli-alberobello.jpg'
];

// Complete URL mapping
const urlMapping = {
  "/projects/bb-blue-otranto-view.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/projects/bb-blue-otranto-view",
  "/projects/bb-blue-otranto-pool.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/projects/bb-blue-otranto-pool",
  "/projects/donna-menga-exterior.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/projects/donna-menga-exterior",
  "/projects/riva-marina-bar.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/projects/riva-marina-bar",
  "/projects/riva-marina-exterior.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/projects/riva-marina-exterior",
  "/projects/santa-lucia-pool.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/projects/santa-lucia-pool",
  "/projects/santa-lucia-wedding.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/projects/santa-lucia-wedding",
  "/projects/baglioni-pool.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/projects/baglioni-pool",
  "/projects/baglioni-room.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/projects/baglioni-room",
  "/EN_co_fundedvertical_RGB_POS.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/en_co_fundedvertical_rgb_pos",
  "/CAPITALIMPRESE-min.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/capitalimprese-min",
  "/Giuseppe Funaro 062025.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/giuseppe-funaro-062025",
  "/Hero_BG.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/hero_bg",
  "/LOGO-REGIONE-PUGLIA-PNG.webp": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/logo-regione-puglia-png",
  "/ITC-min.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/itc-min",
  "/Logo_InvestInPuglia_Black.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/logo_investinpuglia_black",
  "/Logo_InvestInPuglia_Morph.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/logo_investinpuglia_morph",
  "/Logo_InvestInPuglia_Teal.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/logo_investinpuglia_teal",
  "/Logo_InvestInPuglia_White.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/logo_investinpuglia_white",
  "/giuseppe-photo.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/giuseppe-photo",
  "/quarta-photo.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/quarta-photo",
  "/russo-photo.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/russo-photo",
  "/regione_puglia-Photoroom.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/regione_puglia-photoroom",
  "/capitalimprese_text.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/capitalimprese_text",
  "/og-image.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/og-image",
  "/icon/Bell.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/icon/bell",
  "/icon/Gavel.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/icon/gavel",
  "/icon/Euro.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/icon/euro",
  "/icon/HouseArrowUP.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/icon/housearrowup",
  "/icon/Hammer.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/icon/hammer",
  "/icon/Gear.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/icon/gear",
  "/icon/MapPin.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/icon/mappin",
  "/icon/MagnifyingGlass.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/icon/magnifyingglass",
  "/icon/LockKeyhole.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/icon/lockkeyhole",
  "/icon/SpeechBubble.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/icon/speechbubble",
  "/icon/Shield.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/icon/shield",
  "/icon/User.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/icon/user",
  "/icon/UpwardArrow.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/icon/upwardarrow",
  "/icon/TrulloHouse.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/icon/trullohouse",
  "/icon/Speedometer.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/icon/speedometer",
  "/icon/Villa.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/icon/villa",
  "/icon/alert.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/icon/alert",
  "/icon/calendar.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/icon/calendar",
  "/icon/calculator.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/icon/calculator",
  "/icon/check.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/icon/check",
  "/icon/chart.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/icon/chart",
  "/icon/crown.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/icon/crown",
  "/icon/globe.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/icon/globe",
  "/icon/document.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/icon/document",
  "/icon/mail.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/icon/mail",
  "/icon/smartphone.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/icon/smartphone",
  "/icon/whatsapp.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/icon/whatsapp",
  "/icon/triangularFlag.png": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/icon/triangularflag",
  "/images/industries/hotels-puglia.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/images/industries/hotels-puglia",
  "/images/industries/manufacturing-puglia.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/images/industries/manufacturing-puglia",
  "/images/industries/restaurants-puglia.jpg": "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/investinpuglia/images/industries/restaurants-puglia"
};

async function uploadImage(localPath) {
  try {
    const absolutePath = path.join(process.cwd(), localPath);
    
    if (!fs.existsSync(absolutePath)) {
      console.log(`File not found: ${localPath}`);
      return null;
    }
    
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
    
    // Add to mapping with f_auto,q_auto for optimization
    const publicPath = '/' + localPath.replace('public/', '');
    urlMapping[publicPath] = `https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto/investinpuglia/${result.public_id}`;
    
    return result.secure_url;
  } catch (error) {
    console.error(`Error uploading ${localPath}:`, error.message);
    return null;
  }
}

async function uploadRemaining() {
  console.log('Uploading remaining images...\n');
  
  for (const imagePath of remainingImages) {
    await uploadImage(imagePath);
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Save complete URL mapping
  const mappingPath = path.join(process.cwd(), 'cloudinary-urls.json');
  fs.writeFileSync(mappingPath, JSON.stringify(urlMapping, null, 2));
  
  console.log('\n✅ All uploads complete!');
  console.log(`URL mapping saved to: ${mappingPath}`);
}

uploadRemaining().catch(console.error);