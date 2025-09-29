const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'trdbxmjo',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2023-08-25'
});

async function checkPosts() {
  try {
    // Check the first few posts to see their body structure
    const posts = await client.fetch(`
      *[_type == "post"] | order(publishedAt desc)[0..5]{
        title,
        slug,
        body[0..1]
      }
    `);

    console.log('Recent posts structure:\n');
    posts.forEach((post, i) => {
      console.log(`${i+1}. ${post.title}`);
      console.log(`   Slug: ${post.slug?.current}`);

      if (post.body && post.body.length > 0) {
        const firstBlock = post.body[0];
        console.log(`   First block type: ${firstBlock._type}`);

        if (firstBlock._type === 'block') {
          console.log('   ✅ HAS PROPER BLOCKS');
          if (firstBlock.children && firstBlock.children[0]) {
            const sampleText = firstBlock.children[0].text?.substring(0, 60) || 'No text';
            console.log(`   Sample: "${sampleText}..."`);
          }
        } else {
          console.log(`   ❌ RAW CONTENT TYPE: ${firstBlock._type}`);
          console.log(`   Content: ${JSON.stringify(firstBlock).substring(0, 100)}...`);
        }
      } else {
        console.log('   ❌ NO BODY CONTENT');
      }
      console.log('');
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkPosts();