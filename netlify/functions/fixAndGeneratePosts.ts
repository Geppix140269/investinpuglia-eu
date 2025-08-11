import type { Handler } from '@netlify/functions'
import { createClient } from '@sanity/client'
import slugify from 'slugify'
import { nanoid } from 'nanoid'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: process.env.SANITY_API_VERSION!,
  token: process.env.SANITY_TOKEN!,
  useCdn: false
})

function makeDoc(index: number) {
  const title = `Invest in Puglia — Opportunity #${index + 1}`
  const slug = slugify(`${title}-${nanoid(6)}`, { lower: true, strict: true })
  return {
    _type: 'post',
    title,
    slug: { _type: 'slug', current: slug },
    excerpt: `Discover opportunity #${index + 1} in Puglia — grants, incentives, and investment potential.`,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: `This is an SEO-ready post about Puglia opportunity #${index + 1}. Replace or enrich with full content.` }]
      }
    ],
    publishedAt: new Date().toISOString(),
    seo: {
      metaTitle: title,
      metaDescription: `Opportunity #${index + 1}: explore Mini PIA grants and incentives in Puglia.`,
      focusKeyword: 'Invest in Puglia'
    }
  }
}

export const handler: Handler = async (event) => {
  if ((event.headers['x-generation-secret'] || '') !== process.env.GENERATION_SECRET) {
    return { statusCode: 401, body: 'Unauthorized' }
  }

  try {
    // 1. Fix posts with no body
    const emptyPosts = await client.fetch(
      `*[_type == "post" && (!defined(body) || count(body) == 0)]{_id,title}`
    )
    for (const p of emptyPosts) {
      await client.patch(p._id).set({
        body: [
          {
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text: `This is updated SEO content for ${p.title}.` }]
          }
        ]
      }).commit()
    }

    // 2. Count existing posts
    const totalPosts = await client.fetch(`count(*[_type == "post"])`)

    // 3. Create missing to reach 100
    const toCreate = 100 - totalPosts
    if (toCreate > 0) {
      let tx = client.transaction()
      for (let i = 0; i < toCreate; i++) {
        tx = tx.create(makeDoc(totalPosts + i))
      }
      await tx.commit()
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ fixed: emptyPosts.length, created: Math.max(0, 100 - totalPosts) })
    }
  } catch (err: any) {
    console.error(err)
    return { statusCode: 500, body: err.message }
  }
}
