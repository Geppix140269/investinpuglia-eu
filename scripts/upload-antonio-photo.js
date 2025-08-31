const cloudinary = require('cloudinary').v2;
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dusubfxgo',
  api_key: '715336939112685',
  api_secret: 'VPmMVRHyIH7qNPiubKjePp-2h30'
});

async function uploadAntonioPhoto() {
  try {
    // Upload the image with optimization
    const result = await cloudinary.uploader.upload(
      path.join(__dirname, '../public/antonio_quarta.jpg'),
      {
        public_id: 'antonio-quarta-cfo',
        folder: 'investinpuglia/team',
        transformation: [
          {
            width: 800,
            height: 800,
            crop: 'fill',
            gravity: 'face',
            quality: 'auto:best',
            fetch_format: 'auto'
          }
        ],
        overwrite: true
      }
    );

    console.log('Image uploaded successfully!');
    console.log('Optimized URL:', result.secure_url);
    console.log('Public ID:', result.public_id);
    
    // Also create a smaller thumbnail version
    const thumbnailUrl = cloudinary.url(result.public_id, {
      width: 400,
      height: 400,
      crop: 'fill',
      gravity: 'face',
      quality: 'auto',
      fetch_format: 'auto'
    });
    
    console.log('Thumbnail URL:', thumbnailUrl);
    
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}

uploadAntonioPhoto();