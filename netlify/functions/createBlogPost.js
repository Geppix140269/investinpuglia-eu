const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'trdbxmjo',
  dataset: 'production',
  apiVersion: '2023-07-25',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

exports.handler = async () => {
  try {
    const post = {
      _type: 'blogPost',
      title: {
        en: 'Why Puglia Is the Most Promising Property Market in Europe',
        ar: 'أصبحت بوليا واحدة من أكثر الأسواق العقارية الواعدة في أوروبا',
        zh: '为什么普利亚是欧洲最有前景的房地产市场',
        it: '',
        de: '',
        fr: ''
      },
      slug: { _type: 'slug', current: 'why-puglia-property-market' },
      language: 'en',
      status: 'published',
      body: {
        en: [
          {
            _type: 'block',
            style: 'normal',
            markDefs: [],
            children: [
              {
                _type: 'span',
                text: 'Puglia has emerged as one of the most promising real estate markets in Europe...',
                marks: []
              }
            ]
          }
        ],
        ar: [
          {
            _type: 'block',
            style: 'normal',
            markDefs: [],
            children: [
              {
                _type: 'span',
                text: 'أصبحت بوليا واحدة من أكثر الأسواق العقارية الواعدة في أوروبا...',
                marks: []
              }
            ]
          }
        ],
        zh: [
          {
            _type: 'block',
            style: 'normal',
            markDefs: [],
            children: [
              {
                _type: 'span',
                text: '普利亚已成为欧洲最具前景的房地产市场之一...',
                marks: []
              }
            ]
          }
        ],
        it: [],
        de: [],
        fr: []
      },
      seoTitle: 'Invest in Puglia: Real Estate 2025',
      metaDescription: 'Why Puglia is the hottest destination for real estate investors in 2025. Historic homes, low prices, and government grants.',
      tags: ['puglia', 'investment', 'real estate', 'foreign buyers', '2025', 'trulli', 'masseria'],
      geoFocus: 'Valle d’Itria',
      publishedAt: new Date().toISOString()
    };

    const created = await client.create(post);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `✅ Blog post created with ID: ${created._id}` }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `❌ Failed to create post: ${err.message}` }),
    };
  }
};
