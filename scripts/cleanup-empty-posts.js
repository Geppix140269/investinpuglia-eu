// Script to identify and unpublish/delete empty blog posts in Sanity
// Run with: node scripts/cleanup-empty-posts.js

const { createClient } = require('next-sanity')

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // You'll need a write token for this
})

async function findEmptyPosts() {
  console.log('🔍 Searching for blog posts with no content...\n')

  try {
    // Query for all posts
    const query = `*[_type == "post"] {
      _id,
      title,
      slug,
      excerpt,
      body,
      publishedAt,
      _updatedAt
    }`

    const posts = await client.fetch(query)
    console.log(`📊 Total posts found: ${posts.length}\n`)

    // Identify empty posts (no body content)
    const emptyPosts = posts.filter(post => {
      const hasNoBody = !post.body || post.body.length === 0
      const hasNoExcerpt = !post.excerpt || post.excerpt.trim() === ''
      return hasNoBody && hasNoExcerpt
    })

    console.log(`❌ Empty posts found: ${emptyPosts.length}\n`)

    if (emptyPosts.length > 0) {
      console.log('📝 List of empty posts:\n')
      emptyPosts.forEach((post, index) => {
        console.log(`${index + 1}. "${post.title}"`)
        console.log(`   ID: ${post._id}`)
        console.log(`   Slug: ${post.slug?.current || 'No slug'}`)
        console.log(`   Published: ${post.publishedAt || 'Not published'}`)
        console.log(`   Last updated: ${post._updatedAt}`)
        console.log('')
      })

      console.log('\n💡 To delete these posts, run this script with the --delete flag:')
      console.log('   node scripts/cleanup-empty-posts.js --delete')
      console.log('\n💡 Or go to Sanity Studio to manually review and delete:')
      console.log('   http://localhost:3000/studio')
      console.log('   (Start dev server with: npm run dev)')
    } else {
      console.log('✅ No empty posts found! Your blog is clean.')
    }

    return emptyPosts
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

async function deleteEmptyPosts(posts) {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('\n❌ Error: SANITY_API_TOKEN environment variable not set.')
    console.error('   You need a write token to delete posts.')
    console.error('   Get one from: https://www.sanity.io/manage')
    process.exit(1)
  }

  console.log(`\n🗑️  Deleting ${posts.length} empty posts...\n`)

  for (const post of posts) {
    try {
      await client.delete(post._id)
      console.log(`✅ Deleted: "${post.title}" (${post._id})`)
    } catch (error) {
      console.error(`❌ Failed to delete "${post.title}": ${error.message}`)
    }
  }

  console.log('\n✅ Cleanup complete!')
}

// Main execution
async function main() {
  const shouldDelete = process.argv.includes('--delete')

  const emptyPosts = await findEmptyPosts()

  if (shouldDelete && emptyPosts.length > 0) {
    console.log('\n⚠️  WARNING: This will permanently delete the posts listed above!')
    console.log('Press Ctrl+C to cancel, or wait 5 seconds to proceed...')

    await new Promise(resolve => setTimeout(resolve, 5000))
    await deleteEmptyPosts(emptyPosts)
  }
}

main()
