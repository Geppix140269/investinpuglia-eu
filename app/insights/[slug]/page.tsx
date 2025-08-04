// Path: app/insights/[slug]/page.tsx
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'

async function getPost(slug: string) {
  const post = await client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      author->{name},
      mainImage,
      categories[]->{title},
      publishedAt,
      body
    }
  `, { slug })
  
  return post
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    return (
      <main className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="text-2xl text-gray-600">Post not found</h1>
          <Link href="/insights" className="text-emerald-600 hover:underline mt-4 inline-block">
            Back to Insights
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-20 min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-6 py-16">
        <Link href="/insights" className="text-emerald-600 hover:underline mb-8 inline-block">
          Back to Insights
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-6 text-gray-500">
            <span>{post.author?.name || 'Giuseppe Funaro'}</span>
            <span>•</span>
            <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
          </div>
          
          {post.categories && (
            <div className="flex gap-2 mt-4">
              {post.categories.map((category: any) => (
                <span key={category.title} className="text-xs text-emerald-600 uppercase tracking-wider">
                  {category.title}
                </span>
              ))}
            </div>
          )}
        </header>

        {post.mainImage && (
          <img
            src={urlFor(post.mainImage).width(1200).url()}
            alt={post.title}
            className="w-full rounded-lg mb-12"
          />
        )}

        <div className="prose prose-lg max-w-none">
          <PortableText value={post.body} />
        </div>
      </article>
    </main>
  )
}