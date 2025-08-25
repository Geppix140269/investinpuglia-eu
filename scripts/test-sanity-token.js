// scripts/test-sanity-token.js
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'trdbxmjo',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false
});

async function testToken() {
  console.log('Testing Sanity token...');
  console.log('Project ID: trdbxmjo');
  console.log('Dataset: production');
  console.log('Token present:', !!process.env.SANITY_API_TOKEN || !!process.env.SANITY_API_WRITE_TOKEN);
  
  try {
    // First, try to fetch existing posts
    console.log('\n1. Testing READ permissions...');
    const posts = await client.fetch('*[_type == "post"][0..2]');
    console.log(`✅ READ works! Found ${posts.length} posts`);
    
    // Try to create a simple test document
    console.log('\n2. Testing CREATE permissions...');
    const testDoc = {
      _type: 'post',
      title: 'Test Post - ' + new Date().toISOString(),
      slug: { current: 'test-' + Date.now() },
      publishedAt: new Date().toISOString()
    };
    
    const result = await client.create(testDoc);
    console.log('✅ CREATE works! Document ID:', result._id);
    
    // Try to delete the test document
    console.log('\n3. Testing DELETE permissions...');
    await client.delete(result._id);
    console.log('✅ DELETE works!');
    
    console.log('\n✨ All permissions verified successfully!');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response.body);
    }
    console.error('\n🔧 To fix this:');
    console.error('1. Go to: https://www.sanity.io/manage/project/trdbxmjo/api');
    console.error('2. Click on your token');
    console.error('3. Ensure it has "Editor" role or higher');
    console.error('4. If using a custom token, ensure it has read+write+create permissions');
  }
}

testToken();