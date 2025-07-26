// final-enhanced-blog-upload.js
require('dotenv').config()
const { createClient } = require('@sanity/client')
const { v4: uuidv4 } = require('uuid')

const client = createClient({
  projectId: 'trdbxmjo',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
  apiVersion: '2025-01-01',
  useCdn: false
})

// Helper: upload image to Sanity CDN
async function uploadImage(url) {
  try {
    const res = await client.assets.upload('image', url, {
      filename: `main-image-${Date.now()}.jpg`
    })
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: res._id
      }
    }
  } catch (err) {
    console.error('Image upload failed:', err.message)
    return null
  }
}

// Helper: create Portable Text blocks
function createContentBlocks(sections) {
  const blocks = []

  sections.forEach(section => {
    const style = section.style || (section.level || 'normal')
    blocks.push({
      _key: uuidv4(),
      _type: 'block',
      style,
      ...(section.listItem ? { listItem: section.listItem } : {}),
      children: [
        {
          _key: uuidv4(),
          _type: 'span',
          marks: [],
          text: section.text
        }
      ]
    })
  })

  return blocks
}

// Utility to slugify title
function createSlug(title) {
  return title.toLowerCase().replace(/[^ -ÿ\w ]+/g, '').replace(/ +/g, '-')
}

// Sample blog post input (mocked here)
const enhancedBlogPosts = [
  // Your blog post objects here
]

async function transformAndUploadPost(post, index) {
  const slug = createSlug(post.title)
  const imageObj = await uploadImage(post.mainImage)
  const excerpt = post.sections.find(s => s.type === 'paragraph')?.text.slice(0, 160) + '...'

  const doc = {
    _id: `puglia-blog-${slug}`,
    _type: 'post',
    title: post.title,
    slug: { _type: 'slug', current: slug },
    author: { _type: 'reference', _ref: `author-${createSlug(post.author)}` },
    categories: [{ _type: 'reference', _ref: `category-${createSlug(post.category)}` }],
    mainImage: imageObj,
    body: createContentBlocks(post.sections),
    excerpt,
    publishedAt: new Date(Date.now() - index * 86400000).toISOString()
  }

  try {
    await client.createOrReplace(doc)
    console.log(`✅ Uploaded: ${post.title}`)
  } catch (err) {
    console.error(`❌ Failed to upload '${post.title}':`, err.message)
  }
}

async function run() {
  console.log('📤 Uploading enhanced blog posts to Sanity...')

  for (let i = 0; i < enhancedBlogPosts.length; i++) {
    await transformAndUploadPost(enhancedBlogPosts[i], i)
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  console.log('\n✅ Upload process complete.')
}

if (!process.env.SANITY_TOKEN) {
  console.error('❌ Missing SANITY_TOKEN in .env')
  process.exit(1)
}

run()
