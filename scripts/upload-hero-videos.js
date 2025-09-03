const cloudinary = require('cloudinary').v2;
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dusubfxgo',
  api_key: '715336939112685',
  api_secret: 'VPmMVRHyIH7qNPiubKjePp-2h30'
});

const videos = [
  {
    path: 'C:\\Users\\gfuna\\Dropbox\\PC\\Desktop\\BUSINESS\\INVEST IN PUGLIA\\Marketing\\Assets\\MIDJOURNEY\\CLIPS\\geppix1402_81420_Camera_rising_to_reveal_rooftop_bar_overlook_5eaa6496-3496-402e-b808-3de7afe293bd_0.mp4',
    publicId: 'investinpuglia/hero-videos/rooftop-bar',
    name: 'Rooftop Bar'
  },
  {
    path: 'C:\\Users\\gfuna\\Dropbox\\PC\\Desktop\\BUSINESS\\INVEST IN PUGLIA\\Marketing\\Assets\\MIDJOURNEY\\CLIPS\\geppix1402_81420_Helicopter_POV_descending_towards_resort_hel_3f052e5a-66d3-4243-a860-b027faa91c09_3.mp4',
    publicId: 'investinpuglia/hero-videos/helicopter-pov',
    name: 'Helicopter POV'
  },
  {
    path: 'C:\\Users\\gfuna\\Dropbox\\PC\\Desktop\\BUSINESS\\INVEST IN PUGLIA\\Marketing\\Assets\\MIDJOURNEY\\CLIPS\\geppix1402_81420_Smooth_crane_shot_over_beach_club_aperitivo__63e554ff-9e8f-4bc0-8c47-6a260b046668_1.mp4',
    publicId: 'investinpuglia/hero-videos/beach-club',
    name: 'Beach Club'
  }
];

async function uploadVideos() {
  for (const video of videos) {
    try {
      console.log(`Uploading ${video.name}...`);
      
      const result = await cloudinary.uploader.upload(video.path, {
        public_id: video.publicId,
        resource_type: 'video',
        overwrite: true,
        transformation: [
          { quality: 'auto:good' },
          { fetch_format: 'auto' }
        ]
      });
      
      console.log(`✅ ${video.name} uploaded successfully!`);
      console.log(`URL: ${result.secure_url}`);
      console.log('---');
    } catch (error) {
      console.error(`❌ Error uploading ${video.name}:`, error.message);
    }
  }
}

uploadVideos();