import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary - using environment variables
cloudinary.config({
  cloud_name: 'dusubfxgo',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

export default cloudinary

// Helper function to upload images
export async function uploadImage(imagePath: string, folder: string = 'properties') {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: `investinpuglia/${folder}`,
      resource_type: 'auto',
      quality: 'auto:best',
      fetch_format: 'auto'
    })
    return result
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error)
    throw error
  }
}

// Helper function to get optimized URL
export function getOptimizedUrl(publicId: string, options: {
  width?: number
  height?: number
  quality?: string | number
  format?: string
} = {}) {
  const defaultOptions = {
    quality: 'auto:best',
    format: 'auto',
    ...options
  }
  
  return cloudinary.url(publicId, {
    transformation: [defaultOptions]
  })
}