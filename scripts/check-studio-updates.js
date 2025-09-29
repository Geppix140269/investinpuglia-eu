const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'trdbxmjo',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2023-08-25'
});

async function checkStudioUpdates() {
  try {
    console.log('🔍 Checking most recent post updates...\n');

    const posts = await client.fetch(`
      *[_type == "post"] | order(_updatedAt desc)[0..5]{
        title,
        slug,
        _updatedAt,
        _createdAt,
        publishedAt,
        mainImage,
        "hasImage": defined(mainImage)
      }
    `);

    console.log('📝 Recent posts and their update status:\n');

    posts.forEach((post, i) => {
      console.log(`${i+1}. ${post.title}`);
      console.log(`   Slug: ${post.slug?.current}`);
      console.log(`   Last Updated: ${new Date(post._updatedAt).toLocaleString()}`);
      console.log(`   Published Date: ${post.publishedAt ? new Date(post.publishedAt).toLocaleString() : 'NOT PUBLISHED'}`);
      console.log(`   Has Image: ${post.hasImage ? '✅ YES' : '❌ NO'}`);

      // Check if published date is in future (blocking from website)
      const publishedDate = new Date(post.publishedAt);
      const now = new Date();
      if (publishedDate > now) {
        console.log(`   ⚠️  PROBLEM: Published date is in FUTURE - won't show on website!`);
        console.log(`   🔧 FIX: Change published date to past date in Studio`);
      } else {
        console.log(`   ✅ Published date is valid for website`);
      }

      console.log('');
    });

    // Check website configuration
    console.log('🌐 Checking website configuration...\n');

    const websiteQuery = `*[_type == "post" && publishedAt < now()] | order(publishedAt desc)[0..3]{ title, slug }`;
    const websitePosts = await client.fetch(websiteQuery);

    console.log(`📱 Posts that SHOULD appear on website (${websitePosts.length} total):`);
    websitePosts.forEach((post, i) => {
      console.log(`${i+1}. ${post.title} (${post.slug?.current})`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkStudioUpdates();