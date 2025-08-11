// netlify/functions/generateRealPosts.js
const { createClient } = require('@sanity/client')
const https = require('https')

const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_TOKEN
const apiVersion = process.env.SANITY_API_VERSION || '2025-08-01'

const client = createClient({ projectId, dataset, token, apiVersion, useCdn: false })

// tiny helpers (no extra deps)
const tinyId = () => Math.random().toString(36).slice(2, 8)
const slugify = s => s.toLowerCase()
  .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

const CONTACT = {
  name: 'Giuseppe Funaro',
  email: 'g.funaro@investinpuglia.eu',
  phone: '+39 351 400 1402'
}

const makeBody = (i) => ([
  { _type: 'block', style: 'h2', children: [{ _type: 'span', text: `Invest in Puglia — Case #${i + 1}` }]},
  { _type: 'block', style: 'normal', children: [{ _type: 'span', text:
    `Practical, investor-ready insight on opportunities in Puglia: demand drivers, Mini PIA grant fit, and execution steps.` }]},
  { _type: 'block', style: 'h3', children: [{ _type: 'span', text: 'Why this opportunity works' }]},
  { _type: 'block', style: 'normal', children: [{ _type: 'span', text:
    `• Sector: Tourism & Hospitality • Location: Puglia • Angle: Revitalize a historic asset with grant leverage and premium positioning.` }]},
  { _type: 'block', style: 'h3', children: [{ _type: 'span', text: 'Grant fit (Mini PIA)' }]},
  { _type: 'block', style: 'normal', children: [{ _type: 'span', text:
    `Capex items typically eligible; timing and bank co-financing required. We handle due diligence, suppliers, and the full application workflow.` }]},
  { _type: 'block', style: 'h3', children: [{ _type: 'span', text: 'Execution checklist' }]},
  { _type: 'block', style: 'normal', children: [{ _type: 'span', text:
    `1) Technical survey  2) Business plan + cashflows  3) Quotes  4) SPV + bank  5) Grant submission  6) Project control.` }]},
  { _type: 'block', style: 'h3', children: [{ _type: 'span', text: 'Talk to a human (now)' }]},
  { _type: 'block', style: 'normal', children: [{ _type: 'span', text:
    `Contact ${CONTACT.name} — ${CONTACT.email} — ${CONTACT.phone}. We coordinate everything end-to-end for foreign buyers.` }]},
])

async function uploadPlaceholderImage(i) {
  // Plain placeholder PNG per post (unique text to avoid caching)
  const url = `https://placehold.co/1200x630/png?text=Invest+in+Puglia+%23${i+1}`
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const data = []
      res.on('data', chunk => data.push(chunk))
      res.on('end', async () => {
        try {
          const buffer = Buffer.concat(data)
          const asset = await client.assets.upload('image', buffer, { filename: `puglia-${i+1}.png` })
          resolve(asset)
        } catch (e) { reject(e) }
      })
    }).on('error', reject)
  })
}

function makeDoc(i, mainImageRef) {
  const title = `Invest in Puglia — Opportunity ${i + 1}`
  const slug = `${slugify(title)}-${tinyId()}`
  return {
    _type: 'post',
    title,
    slug: { _type: 'slug', current: slug },
    excerpt: `Actionable opportunity #${i + 1} in Puglia: grant leverage, roadmap, and contacts.`,
    body: makeBody(i),
    publishedAt: new Date().toISOString(),
    seo: {
      metaTitle: title,
      metaDescription: `Puglia opportunity ${i + 1}: Mini PIA eligibility, roadmap, and direct contact for execution.`,
      focusKeyword: 'Invest in Puglia'
    },
    // attach if provided
    ...(mainImageRef ? { mainImage: { _type: 'image', asset: { _type: 'reference', _ref: mainImageRef }}} : {}),
    // optional tags/categories if your schema supports them:
    // categories: [{_type:'reference', _ref:'<categoryId>'}],
    // tags: ['Puglia','Mini PIA','Tourism']
  }
}

exports.handler = async (event) => {
  const provided = (event.queryStringParameters && event.queryStringParameters.secret) || event.headers['x-generation-secret']
  if (!provided || provided !== process.env.GENERATION_SECRET) {
    return { statusCode: 401, body: 'Unauthorized' }
  }

  const count = Math.min(parseInt(event.queryStringParameters?.count || '100', 10), 500)
  const withImages = (event.queryStringParameters?.images || '1') !== '0' // default ON

  try {
    let created = 0
    const batchSize = 25
    const batches = Math.ceil(count / batchSize)

    for (let b = 0; b < batches; b++) {
      const start = b * batchSize
      const end = Math.min(start + batchSize, count)

      // Pre-upload images (if enabled)
      const imageAssets = []
      if (withImages) {
        for (let i = start; i < end; i++) {
          try {
            const asset = await uploadPlaceholderImage(i)
            imageAssets.push(asset?._id || null)
          } catch {
            imageAssets.push(null)
          }
        }
      }

      let tx = client.transaction()
      for (let i = start; i < end; i++) {
        const imgRef = withImages ? imageAssets[i - start] : null
        tx = tx.create(makeDoc(i, imgRef))
      }
      const res = await tx.commit()
      created += res.results?.length || (end - start)
    }

    return { statusCode: 200, body: JSON.stringify({ created, images: withImages }) }
  } catch (e) {
    console.error(e)
    return { statusCode: 500, body: e.message || 'Unknown error' }
  }
}
