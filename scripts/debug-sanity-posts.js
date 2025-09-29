const { createClient } = require('@sanity/client');

// Initialize Sanity client
const client = createClient({
  projectId: 'trdbxmjo',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2023-08-25'
});

async function debugPosts() {
  try {
    console.log('🔍 Checking all posts in Sanity...\n');

    // Get all posts (no date filter)
    const allPosts = await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        _createdAt,
        _updatedAt
      }
    `);

    console.log(`📝 Found ${allPosts.length} posts total:\n`);

    allPosts.forEach((post, index) => {
      console.log(`${index + 1}. "${post.title}"`);
      console.log(`   ID: ${post._id}`);
      console.log(`   Slug: ${post.slug?.current || 'NO SLUG'}`);
      console.log(`   Published: ${post.publishedAt}`);
      console.log(`   Created: ${post._createdAt}`);
      console.log('');
    });

    // Test the exact query used by the website
    console.log('🌐 Testing website query: *[_type == "post" && publishedAt < now()]...\n');

    const websitePosts = await client.fetch(`
      *[_type == "post" && publishedAt < now()] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt
      }
    `);

    console.log(`📱 Website would show ${websitePosts.length} posts:\n`);

    websitePosts.forEach((post, index) => {
      console.log(`${index + 1}. "${post.title}" (${post.slug?.current})`);
    });

    if (websitePosts.length === 0 && allPosts.length > 0) {
      console.log('⚠️  ISSUE FOUND: Posts exist but publishedAt dates are in the future!');
      console.log('🔧 Fix: Update publishedAt dates to be in the past...\n');

      // Fix the dates
      for (const post of allPosts) {
        if (post.publishedAt) {
          const pastDate = new Date();
          pastDate.setHours(pastDate.getHours() - 1); // 1 hour ago

          await client.patch(post._id)
            .set({ publishedAt: pastDate.toISOString() })
            .commit();

          console.log(`✅ Fixed publishedAt for: ${post.title}`);
        }
      }

      console.log('\n🎉 All post dates fixed! Check your website now.');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

debugPosts();