const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN, // You'll need to set this
  useCdn: false,
  apiVersion: '2023-08-25'
});

async function uploadBlogPosts() {
  const formattedDir = path.join(__dirname, '../content/sanity-formatted');

  if (!fs.existsSync(formattedDir)) {
    console.error('❌ Formatted posts directory not found. Run "npm run convert-blog-posts" first.');
    return;
  }

  // First, create the author if it doesn't exist
  try {
    console.log('👤 Creating/checking author...');
    const authorDoc = {
      _id: 'giuseppe-funaro',
      _type: 'author',
      name: 'Giuseppe Funaro',
      slug: { current: 'giuseppe-funaro' },
      bio: 'Investment expert with 30+ years experience in EU grants and Italian property development. Business Development Director at Capitalimprese and member of the International Trade Council.'
    };

    await client.createOrReplace(authorDoc);
    console.log('✅ Author created/updated');
  } catch (error) {
    console.error('⚠️ Could not create author:', error.message);
  }

  // Create categories
  const categories = [
    {
      _id: 'eu-grants',
      _type: 'category',
      title: 'EU Grants',
      slug: { current: 'eu-grants' },
      description: 'European Union funding opportunities and grant strategies'
    },
    {
      _id: 'investment-analysis',
      _type: 'category',
      title: 'Investment Analysis',
      slug: { current: 'investment-analysis' },
      description: 'Market analysis and investment opportunity assessments'
    },
    {
      _id: 'property-development',
      _type: 'category',
      title: 'Property Development',
      slug: { current: 'property-development' },
      description: 'Real estate development and property investment insights'
    },
    {
      _id: 'success-stories',
      _type: 'category',
      title: 'Success Stories',
      slug: { current: 'success-stories' },
      description: 'Real case studies and investor success stories'
    }
  ];

  try {
    console.log('📂 Creating/checking categories...');
    for (const category of categories) {
      await client.createOrReplace(category);
      console.log(`✅ Category created/updated: ${category.title}`);
    }
  } catch (error) {
    console.error('⚠️ Could not create categories:', error.message);
  }

  // Upload blog posts
  const files = fs.readdirSync(formattedDir).filter(file => file.endsWith('.json'));

  console.log(`\n📝 Uploading ${files.length} blog posts...\n`);

  for (const file of files) {
    try {
      console.log(`🔄 Uploading ${file}...`);

      const jsonContent = fs.readFileSync(path.join(formattedDir, file), 'utf8');
      let postDoc = JSON.parse(jsonContent);

      // Assign appropriate categories based on file name
      if (file.includes('grants') || file.includes('tourism')) {
        postDoc.categories = [{ _type: 'reference', _ref: 'eu-grants' }];
      } else if (file.includes('industrial') || file.includes('why-international')) {
        postDoc.categories = [{ _type: 'reference', _ref: 'investment-analysis' }];
      } else if (file.includes('property') || file.includes('bureaucracy')) {
        postDoc.categories = [{ _type: 'reference', _ref: 'property-development' }];
      } else if (file.includes('success-stories')) {
        postDoc.categories = [{ _type: 'reference', _ref: 'success-stories' }];
      }

      // Set author reference
      postDoc.author = { _type: 'reference', _ref: 'giuseppe-funaro' };

      // Create the document
      const result = await client.create(postDoc);
      console.log(`✅ Uploaded: ${postDoc.title}`);
      console.log(`   ID: ${result._id}`);
      console.log(`   Slug: ${postDoc.slug.current}\n`);

    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log(`⚠️ Post already exists: ${file}`);
      } else {
        console.error(`❌ Failed to upload ${file}:`, error.message);
      }
    }
  }

  console.log('🎉 Blog post upload complete!');
  console.log('🌐 Check your Sanity Studio to see the uploaded posts.');
  console.log('📷 Don\'t forget to add featured images to each post in Sanity Studio!');
}

// Check for required environment variables
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.error('❌ NEXT_PUBLIC_SANITY_PROJECT_ID environment variable is required');
  process.exit(1);
}

if (!process.env.SANITY_API_TOKEN) {
  console.error('❌ SANITY_API_TOKEN environment variable is required');
  console.log('💡 Get your token from: https://sanity.io/manage');
  console.log('   1. Go to your project settings');
  console.log('   2. Go to API section');
  console.log('   3. Create a new token with write permissions');
  console.log('   4. Add it to your .env.local file: SANITY_API_TOKEN=your_token_here');
  process.exit(1);
}

uploadBlogPosts().catch(error => {
  console.error('❌ Upload failed:', error);
  process.exit(1);
});