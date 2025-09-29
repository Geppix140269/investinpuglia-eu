const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'trdbxmjo',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2023-08-25'
});

async function removeDuplicatePosts() {
  try {
    console.log('🔍 Finding duplicate posts...\n');

    // Group posts by slug to find duplicates
    const allPosts = await client.fetch(`
      *[_type == "post" && defined(slug.current)] {
        _id,
        title,
        slug,
        _updatedAt,
        mainImage,
        "hasImage": defined(mainImage)
      }
    `);

    // Group by slug
    const postsBySlug = {};
    allPosts.forEach(post => {
      const slug = post.slug.current;
      if (!postsBySlug[slug]) {
        postsBySlug[slug] = [];
      }
      postsBySlug[slug].push(post);
    });

    // Find duplicates
    const duplicates = [];
    Object.entries(postsBySlug).forEach(([slug, posts]) => {
      if (posts.length > 1) {
        console.log(`🔄 Found ${posts.length} duplicates for: ${slug}`);

        // Keep the most recent one with an image, or just the most recent
        posts.sort((a, b) => {
          // Prioritize posts with images
          if (a.hasImage && !b.hasImage) return -1;
          if (!a.hasImage && b.hasImage) return 1;
          // Then by update date
          return new Date(b._updatedAt) - new Date(a._updatedAt);
        });

        const keepPost = posts[0];
        const deletesPosts = posts.slice(1);

        console.log(`   ✅ KEEPING: ${keepPost._id} (${keepPost.hasImage ? 'with image' : 'no image'}) - ${keepPost._updatedAt}`);

        deletesPosts.forEach(post => {
          console.log(`   ❌ DELETING: ${post._id} (${post.hasImage ? 'with image' : 'no image'}) - ${post._updatedAt}`);
          duplicates.push(post._id);
        });

        console.log('');
      }
    });

    if (duplicates.length === 0) {
      console.log('🎉 No duplicates found!');
      return;
    }

    console.log(`🗑️ Deleting ${duplicates.length} duplicate posts...\n`);

    // Delete duplicates
    for (const postId of duplicates) {
      try {
        await client.delete(postId);
        console.log(`✅ Deleted: ${postId}`);
      } catch (error) {
        console.error(`❌ Failed to delete ${postId}: ${error.message}`);
      }
    }

    console.log(`\n🎉 Cleanup complete! Deleted ${duplicates.length} duplicate posts.`);
    console.log('🌐 Your website should now show clean, unique posts!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

removeDuplicatePosts();