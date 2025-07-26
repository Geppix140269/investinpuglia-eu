// app/blog/[slug]/page.tsx
import { sanity } from '@/lib/sanity'
import { PortableText } from '@/lib/PortableText'
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const revalidate = 60

// ✅ Dynamic metadata for social sharing (uses blog post image)
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const query = groq`*[_type == "post" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    "description": pt::text(body)[0...160],
    mainImage {
      asset->{url}
    }
  }`

  const post = await sanity.fetch(query, { slug: params.slug })
  if (!post) return {}

  const imageUrl = post.mainImage?.asset?.url || 'https://investiscope.net/default-og-image.jpg'

  return {
    title: post.title,
    description: post.description || 'Read insights on investing in Puglia real estate.',
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://investiscope.net/blog/${post.slug}`,
      siteName: 'InvestiScope',
      type: 'article',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [imageUrl],
    },
  }
}

// ⚙️ Static path generation
export async function generateStaticParams() {
  const query = groq`*[_type == "post"]{ "slug": slug.current }`
  const slugs = await sanity.fetch(query)
  return slugs.map((s: any) => ({ slug: s.slug }))
}

// ✨ Blog post rendering
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const query = groq`*[_type == "post" && slug.current == $slug][0]{
    title,
    body,
    publishedAt,
    mainImage {
      asset->{url},
      alt
    },
    author->{
      name,
      bio,
      image{
        asset->{url}
      }
    },
    categories[]->{
      title
    }
  }`

  const post = await sanity.fetch(query, { slug: params.slug })
  if (!post) notFound()

  const publishDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        <div className="relative z-10 max-w-5xl mx-auto px-5 py-20">
          {post.categories && post.categories.length > 0 && (
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium">
                📁 {post.categories[0].title}
              </span>
            </div>
          )}

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-white/80">
            {post.author && (
              <div className="flex items-center gap-3">
                {post.author.image?.asset?.url && (
                  <img
                    src={post.author.image.asset.url}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full border-2 border-white/30"
                  />
                )}
                <div>
                  <p className="font-medium">{post.author.name}</p>
                  {post.author.bio && (
                    <p className="text-sm text-white/60">{post.author.bio}</p>
                  )}
                </div>
              </div>
            )}
            <span className="text-sm">•</span>
            <time className="text-sm">{publishDate}</time>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="relative">
        {post.mainImage?.asset?.url && (
          <div className="relative h-[500px] -mt-20 mb-12">
            <div className="max-w-5xl mx-auto px-5">
              <img
                src={post.mainImage.asset.url}
                alt={post.mainImage.alt || post.title}
                className="w-full h-full object-cover rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto px-5 py-12">
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-8 md:p-12 border border-white/50">
            <div className="prose prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-li:text-gray-700 prose-li:mb-2 prose-strong:text-emerald-700 prose-strong:font-semibold prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600">
              <PortableText value={post.body} />
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 md:p-12 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Puglia Property Journey?
            </h3>
            <p className="text-lg mb-8 text-white/90">
              Get expert guidance and unlock up to €2.25M in EU grants for your investment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/classic" className="inline-flex items-center gap-2 bg-white text-emerald-700 px-8 py-4 rounded-full font-bold hover:bg-white/90 transition-all">
                Calculate Your Grant
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/30 transition-all">
                Book Free Consultation
              </Link>
            </div>
          </div>

          {/* Related Posts Placeholder */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-8">Related Articles</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-emerald-400 to-teal-500"></div>
                <div className="p-6">
                  <h4 className="font-bold mb-2">Loading related posts...</h4>
                  <Link href="/blog" className="text-emerald-600 font-medium">
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Back to Blog */}
      <div className="max-w-4xl mx-auto px-5 py-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium">
          ← Back to All Articles
        </Link>
      </div>
    </>
  )
}
