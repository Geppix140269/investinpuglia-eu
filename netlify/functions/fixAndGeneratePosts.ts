import type { Handler } from '@netlify/functions'
import { createClient } from '@sanity/client'
import slugify from 'slugify'
import { nanoid } from 'nanoid'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: process.env.SANITY_API_VERSION || '2025-08-01',
  token: process.env.SANITY_TOKEN!,
  useCdn: false,
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
        children: [{ _type: 'span', text: `SEO-ready content for opportunity #${index + 1}. Replace or enrich later.` }]
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
  // Browser-friendly auth: allow secret via query string OR header
  const provided = event.queryStringParameters?.secret || (event.headers['x-generation-secret'] as string)
  if (!provided || provided !== process.env.GENERATION_SECRET) {
    return { statusCode: 401, body: 'Unauthorized' }
  }

  try {
    // 1) Fix posts with no body
    const emptyPosts = await client.fetch(`*[_type == "post" && (!defined(body) || count(body) == 0)]{_id,title}`)
    for (const p of emptyPosts) {
      await client.patch(p._id).set({
        body: [
          {
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text: `Updated SEO content for ${p.title}.` }]
          }
        ]
      }).commit()
    }

    // 2) Count total posts
    const totalPosts: number = await client.fetch(`count(*[_type == "post"])`)

    // 3) Create remaining to reach 100
    const toCreate = Math.max(0, 100 - totalPosts)
    if (toCreate > 0) {
      let tx = client.transaction()
      for (let i = 0; i < toCreate; i++) tx = tx.create(makeDoc(totalPosts + i))
      await tx.commit()
    }

    return { statusCode: 200, body: JSON.stringify({ fixed: emptyPosts.length, created: toCreate }) }
  } catch (err: any) {
    console.error(err)
    return { statusCode: 500, body: err.message || 'Unknown error' }
  }
}
