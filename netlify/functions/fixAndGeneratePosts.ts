// netlify/functions/fixAndGeneratePosts.js
const { createClient } = require('@sanity/client')

// Fallbacks to NEXT_PUBLIC_* if needed
const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_TOKEN
const apiVersion = process.env.SANITY_API_VERSION || '2025-08-01'

const client = createClient({ projectId, dataset, token, apiVersion, useCdn: false })

// No external deps: tiny slug + id helpers
const tinyId = () => Math.random().toString(36).slice(2, 8)
const slugify = (s) =>
  s.toLowerCase()
    .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

function makeDoc(index) {
  const title = `Invest in Puglia — Opportunity #${index + 1}`
  const slug = `${slugify(title)}-${tinyId()}`
  return {
    _type: 'post',
    title,
    slug: { _type: 'slug', current: slug },
    excerpt: `Discover opportunity #${index + 1} in Puglia — grants, incentives, and investment potential.`,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: `SEO-ready content for opportunity #${index + 1}.` }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Mini PIA eligibility, due diligence, and next steps.' }]
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

exports.handler = async (event) => {
  // Simple browser-friendly auth using a NON‑Sanity secret
  const provided = (event.queryStringParameters && event.queryStringParameters.secret) || event.headers['x-generation-secret']
  if (!provided || provided !== process.env.GENERATION_SECRET) {
    return { statusCode: 401, body: 'Unauthorized' }
  }

  try {
    // 1) Patch posts with missing/empty body
    const emptyPosts = await client.fetch(`*[_type=="post" && (!defined(body) || count(body)==0)]{_id,title}`)
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
    const total = await client.fetch(`count(*[_type=="post"])`)

    // 3) Create up to 100
    const toCreate = Math.max(0, 100 - total)
    if (toCreate > 0) {
      let tx = client.transaction()
      for (let i = 0; i < toCreate; i++) tx = tx.create(makeDoc(total + i))
      await tx.commit()
    }

    return { statusCode: 200, body: JSON.stringify({ fixed: emptyPosts.length, created: toCreate }) }
  } catch (e) {
    console.error(e)
    return { statusCode: 500, body: e.message || 'Unknown error' }
  }
}
