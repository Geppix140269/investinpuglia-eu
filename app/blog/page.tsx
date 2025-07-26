import { sanity } from '@/lib/sanity'
import { getAllPosts } from '@/lib/queries'
import { groq } from 'next-sanity'
import Link from 'next/link'
import Image from 'next/image'

const query = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    mainImage {
      asset->{
        url
      }
    },
    excerpt
  }
`

export default async function BlogPage() {
  const posts = await sanity.fetch(query)

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold mb-10 text-center text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
        InvestiScope Blog
      </h1>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: any) => (
          <Link 
            href={`/blog/${post.slug.current}`} 
            key={post._id} 
            className="group block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            {post.mainImage?.asset?.url && (
              <Image
                src={post.mainImage.asset.url}
                alt={post.title}
                width={400}
                height={250}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}
            <div className="p-5 bg-white">
              <h2 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-green-600 transition-colors">
                {post.title}
              </h2>
              {post.publishedAt && (
                <p className="text-sm text-gray-500 mb-3">
                  {new Date(post.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              )}
              <p className="text-gray-700 line-clamp-3">{post.excerpt || 'No excerpt available.'}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
