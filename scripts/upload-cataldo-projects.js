const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dusubfxgo',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const PROJECTS_DIR = path.join(__dirname, '../public/Cataldo\'s projects');
const UPLOAD_FOLDER = 'investinpuglia/portfolio';

// Map of file names to public IDs
const fileMapping = {
  'Balcone-vista-mare-Bellavista-800x400.jpg.webp': 'bellavista-balcony',
  'Basiliani.jpg': 'hotel-basiliani',
  'Blue_Otranto.jpg': 'bb-blue-otranto',
  'Donna Menga Before.webp': 'donna-menga-before',
  'Donna-Menga.webp': 'donna-menga-after',
  'Hotel-Bellavista.webp': 'hotel-bellavista',
  'Le Cale d\'Otranto Beach Resort.jpg': 'le-cale-otranto',
  'Palazzo Spinola Gallipoli.jpg': 'palazzo-spinola',
  'Residence Bellaria giurdignano.jpg': 'residence-bellaria',
  'Torre Matta.jpg': 'torre-matta',
  'VOI Alimini Resort.jpg': 'voi-alimini-resort',
  'baglioni_masseria_muzza.jpg': 'baglioni-masseria-muzza',
  'bellaria_giurdignano.jpg': 'bellaria-giurdignano',
  'camping mulino d\'acqua otranto.jpg': 'camping-mulino',
  'country club alimini.jpg': 'country-club-alimini',
  'dimora san giuseppe.jpg': 'dimora-san-giuseppe',
  'don gerolamo.jpg': 'don-girolamo',
  'hotel haethey otranto.jpg': 'hotel-haethey',
  'hotel petraria cannole.jpg': 'hotel-petraria',
  'hotel torcito resort cannole.jpeg': 'hotel-torcito',
  'masseria montelauro.jpeg': 'masseria-montelauro',
  'masseria muzza.jpg': 'masseria-muzza',
  'masseria-furca.jpg': 'masseria-furca',
  'nohasi palace hotel and spa.jpg': 'nohasi-palace-spa',
  'nohasi palace.jpg': 'nohasi-palace',
  'petraria-hotel-resort1.jpg': 'petraria-hotel',
  'voi-alimini-resort1.webp': 'voi-alimini'
};

async function uploadImage(filePath, publicId) {
  try {
    console.log(`Uploading ${path.basename(filePath)} as ${publicId}...`);
    
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      folder: UPLOAD_FOLDER,
      resource_type: 'auto',
      overwrite: true,
      invalidate: true,
      transformation: [
        { quality: 'auto:best' },
        { fetch_format: 'auto' }
      ],
      eager: [
        { width: 400, height: 300, crop: 'fill', quality: 'auto:good' },
        { width: 800, height: 600, crop: 'fill', quality: 'auto:best' },
        { width: 1200, height: 900, crop: 'fill', quality: 'auto:best' }
      ],
      eager_async: true
    });
    
    console.log(`✅ Uploaded successfully: ${result.secure_url}`);
    return result;
  } catch (error) {
    console.error(`❌ Error uploading ${path.basename(filePath)}:`, error.message);
    return null;
  }
}

async function uploadAllProjects() {
  console.log('🚀 Starting Cloudinary upload for Cataldo\'s projects...\n');
  
  // Check if API credentials are set
  if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error('❌ Error: Cloudinary API credentials not found in environment variables');
    console.log('Please set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in your .env.local file');
    return;
  }
  
  // Read all files from the projects directory
  const files = fs.readdirSync(PROJECTS_DIR);
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
  });
  
  console.log(`Found ${imageFiles.length} images to upload\n`);
  
  const results = [];
  const uploadedUrls = {};
  
  for (const file of imageFiles) {
    const filePath = path.join(PROJECTS_DIR, file);
    const publicId = fileMapping[file] || file.replace(/\.[^.]+$/, '').toLowerCase().replace(/\s+/g, '-');
    
    const result = await uploadImage(filePath, publicId);
    if (result) {
      results.push(result);
      uploadedUrls[file] = result.secure_url;
    }
    
    // Add a small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log(`\n✅ Upload complete! ${results.length}/${imageFiles.length} images uploaded successfully\n`);
  
  // Save the URLs mapping to a file
  const outputPath = path.join(__dirname, 'cloudinary-urls.json');
  fs.writeFileSync(outputPath, JSON.stringify(uploadedUrls, null, 2));
  console.log(`📁 URL mappings saved to: ${outputPath}\n`);
  
  // Display the URLs for reference
  console.log('Cloudinary URLs for your projects:\n');
  Object.entries(uploadedUrls).forEach(([file, url]) => {
    console.log(`${file}:\n  ${url}\n`);
  });
}

// Run the upload
uploadAllProjects().catch(console.error);