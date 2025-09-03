// Script to upload Midjourney images to Cloudinary
// Run with: node scripts/upload-midjourney-to-cloudinary.js

const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dusubfxgo',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Midjourney assets folder path
const MIDJOURNEY_FOLDER = 'C:/Users/gfuna/Dropbox/PC/Desktop/BUSINESS/INVEST IN PUGLIA/Marketing/Assets/MIDJOURNEY';
const CLOUDINARY_FOLDER = 'investinpuglia/midjourney';

// List of images to upload (from page-metadata.ts)
const REQUIRED_IMAGES = [
  'geppix1402_81420_Aerial_orbit_around_cliff_beach_club_in_Poli_904a364f-6015-495e-992c-c36f28188b82_1.png',
  'geppix1402_81420_Aerial_orbit_around_cliff_beach_club_in_Poli_904a364f-6015-495e-992c-c36f28188b82_2.png',
  'geppix1402_81420_Meeting_room_with_Italian_business_people_an_a57c7e77-afff-4d4f-86e7-5e5a1f8e0406_2.png',
  'geppix1402_81420_Luxury_resort_spa_treatment_room_with_natura_9c9038e0-dc6f-4fc3-808c-5c12bbef3e66_0.png',
  'geppix1402_81420_Before_and_after_split_screen_of_trullo_reno_e5e45c87-85d9-4bfb-aa2b-5d5f9cf5e5f8_3.png',
  'geppix1402_81420_Giuseppe_Funaro_profile_professional_Italian_0e88a8f0-77d1-4e96-9a85-fa892e656fb5_0.png',
  'geppix1402_81420_EU_and_Italian_flags_with_grant_money_visual_d6f9f8ea-e31f-4cab-8e1f-23cc86ab67e7_0.png',
  'geppix1402_81420_Digital_calculator_interface_showing_investm_8e3e4aff-d2a5-4c09-9dc0-c0e3e2c0e632_1.png',
  'geppix1402_81420_Map_of_Puglia_with_investment_hotspots_marke_f8c9a5f0-d4e5-4e09-9d6f-2e4e3a2c0e63_0.png',
  'geppix1402_81420_Ostuni_white_city_panoramic_view_at_golden_h_7e3f4d5a-8c9f-4e09-9d6f-3e5e4a3c0e71_0.png',
  'geppix1402_81420_Lecce_baroque_architecture_cathedral_square__2e5f6c8a-9d3f-4e09-9d6f-4e3e4a2c0e72_0.png',
  'geppix1402_81420_Monopoli_old_port_with_traditional_boats_and_8e4f5d6a-3c5f-4e09-9d6f-5e3e4a3c0e73_0.png',
  'geppix1402_81420_Split_screen_showing_different_investment_ty_9e5f6d7a-4c5f-4e09-9d6f-6e4e5a4c0e74_0.png',
  'geppix1402_81420_Luxury_property_portfolio_showcase_grid_layo_5e6f7d8a-5c6f-4e09-9d6f-7e5e5a5c0e75_0.png',
  'geppix1402_81420_Modern_office_meeting_with_Italian_coast_vie_6e7f8d9a-6c7f-4e09-9d6f-8e6e6a6c0e76_0.png',
  'geppix1402_81420_Timeline_infographic_showing_investment_step_7e8f9e0a-7c8f-4e09-9d6f-9e7e7a7c0e77_0.png',
  'geppix1402_81420_Modern_digital_dashboard_interface_for_prope_8e9f0f1a-8c9f-4e09-9d6f-0e8e8a8c0e78_0.png',
  'geppix1402_81420_Legal_documents_and_Italian_property_contrac_9f0f1f2a-9c0f-4e09-9d6f-1f9e9a9c0e79_0.png',
  'geppix1402_81420_Data_security_and_privacy_protection_visuali_0f1f2f3a-0c1f-4e09-9d6f-2f0f0b0c0e80_0.png',
  'geppix1402_81420_Business_partnership_handshake_with_Italian__1f2f3f4a-1c2f-4e09-9d6f-3f1f1c1c0e81_0.png',
  'geppix1402_81420_Digital_blog_layout_with_Puglia_property_art_2f3f4f5a-2c3f-4e09-9d6f-4f2f2c0e82_0.png'
];

// Additional images from the folder that exist
const EXISTING_IMAGES = [
  'geppix1402_81420_Aerial_view_of_modern_beach_resort_on_Puglia_1e033058-96de-4e55-a742-32e53bf63f47_0.png',
  'geppix1402_81420_Aerial_view_of_long_table_dinner_in_olive_gr_bc53e248-6881-440b-98ae-6dc8ca73eb25_1.png',
  'geppix1402_81420_Camera_circling_outdoor_cooking_class_in_mas_7948c831-b95c-4df0-a1b7-3c8ec026ac97_0.png',
  'geppix1402_81420_Camera_gliding_along_infinity_pool_edge_over_63235c90-8037-46fd-aaba-c877c98364a4_0.png',
  'geppix1402_81420_Camera_rising_to_reveal_rooftop_bar_overlook_3f241707-7104-400b-ab12-f30e7290effe_0.png'
];

async function uploadImage(imagePath, publicId) {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      public_id: publicId,
      folder: CLOUDINARY_FOLDER,
      overwrite: true,
      resource_type: 'image',
      transformation: [
        { width: 1200, height: 630, crop: 'fill', gravity: 'auto' },
        { quality: 'auto', fetch_format: 'auto' }
      ],
      tags: ['midjourney', 'og-image', 'investinpuglia']
    });
    
    console.log(`✅ Uploaded: ${publicId}`);
    console.log(`   URL: ${result.secure_url}`);
    return result;
  } catch (error) {
    console.error(`❌ Failed to upload ${publicId}:`, error.message);
    return null;
  }
}

async function uploadMidjourneyImages() {
  console.log('🚀 Starting Midjourney images upload to Cloudinary...\n');
  
  const results = {
    successful: [],
    failed: [],
    notFound: []
  };
  
  // Combine required and existing images
  const allImages = [...new Set([...REQUIRED_IMAGES, ...EXISTING_IMAGES])];
  
  for (const imageName of allImages) {
    const imagePath = path.join(MIDJOURNEY_FOLDER, imageName);
    
    // Check if file exists
    if (fs.existsSync(imagePath)) {
      // Remove extension for public_id
      const publicId = imageName.replace('.png', '');
      const result = await uploadImage(imagePath, publicId);
      
      if (result) {
        results.successful.push({
          name: imageName,
          url: result.secure_url
        });
      } else {
        results.failed.push(imageName);
      }
    } else {
      console.log(`⚠️ Image not found: ${imageName}`);
      results.notFound.push(imageName);
    }
  }
  
  // Print summary
  console.log('\n📊 Upload Summary:');
  console.log(`✅ Successful: ${results.successful.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log(`⚠️ Not Found: ${results.notFound.length}`);
  
  // Save results to file
  const outputPath = path.join(process.cwd(), 'cloudinary-midjourney-urls.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\n💾 Results saved to: ${outputPath}`);
  
  // Generate update script for missing images
  if (results.notFound.length > 0) {
    console.log('\n📝 Note: Some images referenced in page-metadata.ts don\'t exist.');
    console.log('You may need to:');
    console.log('1. Generate these images in Midjourney');
    console.log('2. Or update page-metadata.ts with existing image names');
    console.log('\nExisting images in folder that can be used:');
    
    // List some available images
    try {
      const files = fs.readdirSync(MIDJOURNEY_FOLDER)
        .filter(f => f.endsWith('.png'))
        .slice(0, 10);
      files.forEach(f => console.log(`  - ${f}`));
    } catch (error) {
      console.error('Could not list folder contents');
    }
  }
}

// Run the upload
uploadMidjourneyImages().catch(console.error);