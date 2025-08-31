/**
 * Script to upload OG images to Cloudinary
 * This will upload all the necessary images for social media sharing
 */

const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dusubfxgo',
  api_key: process.env.CLOUDINARY_API_KEY || '715336939112685',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'VPmMVRHyIH7qNPiubKjePp-2h30'
});

// Define the images to upload for each page
const ogImages = [
  {
    page: 'home',
    localPath: "public/Cataldo's projects/masseria montelauro.jpeg",
    publicId: 'investinpuglia/og-images/masseria-montelauro',
    description: 'Masseria Montelauro - Home OG Image'
  },
  {
    page: 'portfolio',
    localPath: "public/Cataldo's projects/baglioni_masseria_muzza.jpg",
    publicId: 'investinpuglia/og-images/baglioni-masseria-muzza',
    description: 'Baglioni Masseria Muzza - Portfolio OG Image'
  },
  {
    page: 'services',
    localPath: "public/Cataldo's projects/Donna-Menga.webp",
    publicId: 'investinpuglia/og-images/donna-menga',
    description: 'Donna Menga Resort - Services OG Image'
  },
  {
    page: 'grants',
    localPath: "public/Cataldo's projects/nohasi palace hotel and spa.jpg",
    publicId: 'investinpuglia/og-images/nohasi-palace',
    description: 'Nohasi Palace Hotel & Spa - Grants OG Image'
  },
  {
    page: 'properties',
    localPath: "public/Cataldo's projects/Le Cale d'Otranto Beach Resort.jpg",
    publicId: 'investinpuglia/og-images/le-cale-dotranto',
    description: "Le Cale d'Otranto Beach Resort - Properties OG Image"
  },
  {
    page: 'about',
    localPath: "public/Cataldo's projects/dimora san giuseppe.jpg",
    publicId: 'investinpuglia/og-images/dimora-san-giuseppe',
    description: 'Dimora San Giuseppe - About OG Image'
  },
  {
    page: 'contact',
    localPath: "public/Cataldo's projects/Hotel-Bellavista.webp",
    publicId: 'investinpuglia/og-images/hotel-bellavista',
    description: 'Hotel Bellavista - Contact OG Image'
  },
  {
    page: 'puglia',
    localPath: "public/Cataldo's projects/Torre Matta.jpg",
    publicId: 'investinpuglia/og-images/torre-matta',
    description: 'Torre Matta - Puglia OG Image'
  },
  {
    page: 'legal',
    localPath: "public/Cataldo's projects/hotel haethey otranto.jpg",
    publicId: 'investinpuglia/og-images/hotel-haethey',
    description: 'Hotel Haethey Otranto - Legal OG Image'
  },
  {
    page: 'trullo',
    localPath: "public/Cataldo's projects/shantiland.jpg",
    publicId: 'investinpuglia/og-images/shantiland',
    description: 'Shantiland - Trullo AI OG Image'
  }
];

// Function to upload a single image
async function uploadImage(imageConfig) {
  const { page, localPath, publicId, description } = imageConfig;
  const fullPath = path.join(process.cwd(), localPath);
  
  try {
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      console.error(`❌ File not found for ${page}: ${fullPath}`);
      return null;
    }
    
    console.log(`📤 Uploading ${page} OG image...`);
    
    // Upload to Cloudinary with optimizations for OG images
    const result = await cloudinary.uploader.upload(fullPath, {
      public_id: publicId,
      folder: '', // Public ID already includes folder
      overwrite: true,
      resource_type: 'image',
      tags: ['og-image', 'investinpuglia', page],
      context: {
        caption: description,
        alt: description
      },
      transformation: [
        {
          width: 1200,
          height: 630,
          crop: 'fill',
          gravity: 'auto',
          quality: 'auto:best',
          fetch_format: 'auto'
        }
      ]
    });
    
    console.log(`✅ ${page} uploaded successfully!`);
    console.log(`   URL: ${result.secure_url}`);
    console.log(`   Public ID: ${result.public_id}`);
    
    return {
      page,
      url: result.secure_url,
      publicId: result.public_id,
      version: result.version
    };
  } catch (error) {
    console.error(`❌ Error uploading ${page}:`, error.message);
    return null;
  }
}

// Main function to upload all images
async function uploadAllImages() {
  console.log('🚀 Starting OG images upload to Cloudinary...\n');
  console.log(`📁 Cloud Name: ${cloudinary.config().cloud_name}\n`);
  
  const results = [];
  
  for (const imageConfig of ogImages) {
    const result = await uploadImage(imageConfig);
    if (result) {
      results.push(result);
    }
    // Add a small delay between uploads to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n📊 Upload Summary:');
  console.log(`✅ Successfully uploaded: ${results.length}/${ogImages.length} images\n`);
  
  if (results.length > 0) {
    console.log('📝 New Cloudinary Image IDs for og-images.ts:\n');
    console.log('Update your /lib/og-images.ts file with these IDs:\n');
    
    results.forEach(result => {
      // Extract the image ID from the URL (format: v{version}/{publicId})
      const imageId = `v${result.version}/${result.publicId}`;
      console.log(`${result.page}: '${imageId}',`);
    });
    
    // Create a configuration file with the results
    const configContent = `// Generated Cloudinary OG Image Configuration
// Created: ${new Date().toISOString()}

export const CLOUDINARY_OG_IMAGES = {
${results.map(r => `  ${r.page}: {
    imageId: 'v${r.version}/${r.publicId}',
    url: '${r.url}',
    publicId: '${r.publicId}'
  }`).join(',\n')}
};
`;
    
    fs.writeFileSync(
      path.join(process.cwd(), 'cloudinary-og-config.js'),
      configContent
    );
    
    console.log('\n✅ Configuration saved to cloudinary-og-config.js');
  }
}

// Run the upload
uploadAllImages().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});