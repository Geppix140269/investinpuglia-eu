// Script to upload Cataldo's projects images to Cloudinary
// Run with: node scripts/upload-cataldo-projects-to-cloudinary.js

const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dusubfxgo',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Cataldo's projects folder path
const CATALDO_FOLDER = "public/Cataldo's projects";
const CLOUDINARY_FOLDER = 'investinpuglia/cataldos_projects';

async function uploadImage(filePath, publicId) {
  try {
    console.log(`Uploading ${filePath} as ${publicId}...`);
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      folder: CLOUDINARY_FOLDER,
      overwrite: true,
      resource_type: 'image',
      quality: 'auto',
      format: 'auto'
    });
    console.log(`✅ Uploaded: ${result.secure_url}`);
    return result.secure_url;
  } catch (error) {
    console.error(`❌ Failed to upload ${filePath}:`, error.message);
    return null;
  }
}

async function uploadAllImages() {
  if (!fs.existsSync(CATALDO_FOLDER)) {
    console.error(`❌ Folder not found: ${CATALDO_FOLDER}`);
    return;
  }

  const files = fs.readdirSync(CATALDO_FOLDER);
  const imageFiles = files.filter(file =>
    /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
  );

  console.log(`Found ${imageFiles.length} images to upload...`);

  const urlMappings = {};

  for (const file of imageFiles) {
    const filePath = path.join(CATALDO_FOLDER, file);

    // Convert filename to Cloudinary-friendly public ID
    const publicId = file
      .replace(/\.(jpg|jpeg|png|webp|gif)$/i, '')
      .toLowerCase()
      .replace(/[^\w\-]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '');

    const url = await uploadImage(filePath, publicId);
    if (url) {
      // Store mapping for both original filename and URL-encoded version
      const originalPath = `/Cataldo's projects/${file}`;
      const encodedPath = `/Cataldo%27s%20projects/${encodeURIComponent(file)}`;

      urlMappings[originalPath] = url;
      urlMappings[encodedPath] = url;
    }
  }

  // Update cloudinary-urls.json
  const urlsFile = 'cloudinary-urls.json';
  let existingMappings = {};

  if (fs.existsSync(urlsFile)) {
    existingMappings = JSON.parse(fs.readFileSync(urlsFile, 'utf8'));
  }

  const updatedMappings = { ...existingMappings, ...urlMappings };

  fs.writeFileSync(urlsFile, JSON.stringify(updatedMappings, null, 2));
  console.log(`📝 Updated ${urlsFile} with ${Object.keys(urlMappings).length} new mappings`);

  console.log('\n✅ Upload complete!');
  console.log('New Cloudinary URLs:');
  Object.entries(urlMappings).forEach(([path, url]) => {
    console.log(`${path} -> ${url}`);
  });
}

uploadAllImages().catch(console.error);