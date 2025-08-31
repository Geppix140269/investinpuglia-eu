const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dusubfxgo',
  api_key: process.env.CLOUDINARY_API_KEY || '329226786183531',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'your_api_secret'
});

// Upload Hotel Shantiland image
async function uploadHotelShantiland() {
  try {
    // For now, using a placeholder since we need the actual image file
    // You need to save the actual Hotel Shantiland image to this path
    const imagePath = path.join(__dirname, '../public/hotel-shantiland.jpg');
    
    const result = await cloudinary.uploader.upload(imagePath, {
      public_id: 'hotel-shantiland',
      folder: 'investinpuglia',
      transformation: [
        { width: 1200, height: 400, crop: 'fill' },
        { quality: 'auto', fetch_format: 'auto' }
      ]
    });
    
    console.log('Upload successful!');
    console.log('URL:', result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.error('Upload failed:', error);
  }
}

uploadHotelShantiland();