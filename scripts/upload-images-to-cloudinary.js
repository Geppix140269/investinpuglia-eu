require('dotenv').config({ path: '.env.local' })
const cloudinary = require('cloudinary').v2
const fs = require('fs')
const path = require('path')

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dusubfxgo',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// Property images to upload
const propertyImages = [
  {
    folder: 'palazzo-palmariggi',
    images: [
      { file: 'IMG_6766_compressed.jpg', name: 'palazzo-exterior' },
      { file: 'IMG_5834_compressed.jpg', name: 'interior-vaulted-ceilings' },
      { file: 'IMG_5318_compressed.jpg', name: 'garden-view' },
      { file: 'IMG_5304_compressed.jpg', name: 'interior-room-1' },
      { file: 'IMG_5310_compressed.jpg', name: 'interior-room-2' },
      { file: 'IMG_5314_compressed.jpg', name: 'interior-room-3' },
      { file: 'IMG_5316_compressed.jpg', name: 'interior-room-4' },
      { file: 'IMG_5844_compressed.jpg', name: 'exterior-detail' }
    ]
  }
]

// Generic property images (for demo properties)
const genericImages = [
  { 
    url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
    publicId: 'villa-polignano',
    tags: ['villa', 'seafront', 'polignano']
  },
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    publicId: 'trulli-alberobello',
    tags: ['trulli', 'historic', 'alberobello']
  }
]

async function uploadLocalImages() {
  console.log('Starting upload of local property images...')
  
  for (const property of propertyImages) {
    console.log(`\nUploading images for: ${property.folder}`)
    
    for (const image of property.images) {
      const imagePath = path.join(__dirname, '..', 'public', 'palazzo-palmariggi-images', image.file)
      
      if (fs.existsSync(imagePath)) {
        try {
          const result = await cloudinary.uploader.upload(imagePath, {
            folder: `investinpuglia/properties/${property.folder}`,
            public_id: image.name,
            overwrite: true,
            resource_type: 'image',
            quality: 'auto:best',
            fetch_format: 'auto',
            tags: [property.folder, 'property', 'puglia']
          })
          
          console.log(`✓ Uploaded: ${image.name} - URL: ${result.secure_url}`)
        } catch (error) {
          console.error(`✗ Failed to upload ${image.name}:`, error.message)
        }
      } else {
        console.log(`✗ File not found: ${imagePath}`)
      }
    }
  }
}

async function uploadGenericImages() {
  console.log('\nUploading generic property images from URLs...')
  
  for (const image of genericImages) {
    try {
      const result = await cloudinary.uploader.upload(image.url, {
        folder: 'investinpuglia/properties/generic',
        public_id: image.publicId,
        overwrite: true,
        resource_type: 'image',
        quality: 'auto:best',
        fetch_format: 'auto',
        tags: image.tags
      })
      
      console.log(`✓ Uploaded: ${image.publicId} - URL: ${result.secure_url}`)
    } catch (error) {
      console.error(`✗ Failed to upload ${image.publicId}:`, error.message)
    }
  }
}

// Main upload function
async function main() {
  console.log('=================================')
  console.log('Cloudinary Image Upload Script')
  console.log('=================================')
  
  if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error('Error: Please set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in your .env file')
    process.exit(1)
  }
  
  try {
    await uploadLocalImages()
    await uploadGenericImages()
    
    console.log('\n=================================')
    console.log('Upload complete!')
    console.log('=================================')
  } catch (error) {
    console.error('Upload failed:', error)
    process.exit(1)
  }
}

// Run the script
main()