const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'trdbxmjo',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2023-08-25'
});

// Professional placeholder images that work with Sanity
const BLOG_IMAGES = [
  "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&h=800", // Italian architecture
  "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=1200&h=800", // Business/investment
  "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=800", // Italian cityscape
  "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=1200&h=800", // Mediterranean coast
  "https://images.unsplash.com/photo-1589980739130-5534b8f6e4a7?w=1200&h=800", // Industrial/business
  "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&h=800"  // European architecture
];

async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`📤 Uploading image: ${imageUrl}`);

    // Create image asset from URL
    const imageAsset = await client.assets.upload('image', imageUrl, {
      filename: `blog-image-${Date.now()}.png`
    });

    console.log(`✅ Image uploaded: ${imageAsset._id}`);
    return imageAsset._id;
  } catch (error) {
    console.error(`❌ Failed to upload image: ${error.message}`);
    return null;
  }
}

async function addImagesToAllPosts() {
  try {
    console.log('🔍 Finding posts without images...\n');

    // Get all posts without main images
    const postsWithoutImages = await client.fetch(`
      *[_type == "post" && !defined(mainImage)][0..20] {
        _id,
        title,
        slug
      }
    `);

    console.log(`📝 Found ${postsWithoutImages.length} posts without images\n`);

    if (postsWithoutImages.length === 0) {
      console.log('🎉 All posts already have images!');
      return;
    }

    console.log('📤 Uploading images to Sanity...\n');

    // Upload all images first
    const uploadedImages = [];
    for (const imageUrl of BLOG_IMAGES) {
      const imageId = await uploadImageToSanity(imageUrl);
      if (imageId) {
        uploadedImages.push(imageId);
      }
    }

    console.log(`\n✅ Uploaded ${uploadedImages.length} images successfully\n`);

    if (uploadedImages.length === 0) {
      console.error('❌ No images were uploaded successfully');
      return;
    }

    console.log('🖼️ Assigning images to posts...\n');

    // Assign images to posts
    for (let i = 0; i < postsWithoutImages.length; i++) {
      const post = postsWithoutImages[i];
      const imageIndex = i % uploadedImages.length; // Cycle through images
      const imageId = uploadedImages[imageIndex];

      try {
        await client
          .patch(post._id)
          .set({
            mainImage: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: imageId
              }
            }
          })
          .commit();

        console.log(`✅ Added image to: "${post.title}"`);
      } catch (error) {
        console.error(`❌ Failed to update ${post.title}: ${error.message}`);
      }
    }

    console.log('\n🎉 DONE! All posts now have images');
    console.log('🌐 Check your website - images should appear automatically');

  } catch (error) {
    console.error('❌ Script failed:', error.message);
  }
}

// Check for required environment variables
if (!process.env.SANITY_API_TOKEN) {
  console.error('❌ SANITY_API_TOKEN environment variable is required');
  console.log('💡 Add it to your .env.local file');
  process.exit(1);
}

console.log('🚀 AUTO-ADDING IMAGES TO ALL BLOG POSTS...\n');
addImagesToAllPosts();