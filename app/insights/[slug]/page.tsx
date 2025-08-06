import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import ShareButtons from '@/components/ShareButtons'

// Query to get a specific insight by slug - CHANGED FROM "article" TO "insight"
const ARTICLE_QUERY = `*[_type == "insight" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  body,
  publishedAt,
  mainImage,
  "author": author->name,
  "categories": categories[]->title
}`

// Query to get all insight slugs for static generation - CHANGED FROM "article" TO "insight"
const ARTICLES_SLUGS_QUERY = `*[_type == "insight" && defined(slug.current)][].slug.current`

interface ArticlePageProps {
  params: {
    slug: string
  }
}

// Generate metadata for each article
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await client.fetch(ARTICLE_QUERY, { slug: params.slug })
  
  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  const imageUrl = article.mainImage 
    ? urlFor(article.mainImage).width(1200).height(630).url()
    : '/og-image.png'

  return {
    title: article.title,
    description: article.excerpt || 'Read more insights about investment opportunities in Puglia',
    openGraph: {
      title: article.title,
      description: article.excerpt || 'Read more insights about investment opportunities in Puglia',
      type: 'article',
      publishedTime: article.publishedAt,
      authors: article.author ? [article.author] : [],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt || 'Read more insights about investment opportunities in Puglia',
      images: [imageUrl],
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await client.fetch(ARTICLE_QUERY, { slug: params.slug })

  if (!article) {
    notFound()
  }

  // Format the published date
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  // Generate the full URL for this article
  const articleUrl = `https://investinpuglia.eu/insights/${article.slug.current}`

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        
        <div className="text-gray-600 mb-4">
          <time dateTime={article.publishedAt}>{formattedDate}</time>
          {article.author && (
            <span> • By {article.author}</span>
          )}
        </div>

        {article.categories && article.categories.length > 0 && (
          <div className="flex gap-2 mb-6">
            {article.categories.map((category: string, index: number) => (
              <span 
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {category}
              </span>
            ))}
          </div>
        )}

        {/* Main Image */}
        {article.mainImage && (
          <div className="mb-8">
            <img
              src={urlFor(article.mainImage).width(800).height(400).url()}
              alt={article.title}
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}
      </header>

      {/* Share Buttons Component */}
      <ShareButtons 
        url={articleUrl}
        title={article.title}
        description={article.excerpt}
      />

      {/* Article Body */}
      <div className="prose prose-lg max-w-none">
        {article.body && (
          <PortableText 
            value={article.body}
            components={{
              // You can customize how different elements are rendered
              block: {
                h2: ({children}) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
                h3: ({children}) => <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>,
                normal: ({children}) => <p className="mb-4">{children}</p>,
              },
              marks: {
                link: ({children, value}) => {
                  const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
                  return (
                    <a 
                      href={value.href} 
                      rel={rel}
                      className="text-blue-600 hover:underline"
                    >
                      {children}
                    </a>
                  )
                },
              },
            }}
          />
        )}
      </div>

      {/* Share Buttons at the bottom too */}
      <div className="mt-12 pt-8 border-t">
        <ShareButtons 
          url={articleUrl}
          title={article.title}
          description={article.excerpt}
        />
      </div>
    </article>
  )
}

// Generate static params for all articles
export async function generateStaticParams() {
  const slugs = await client.fetch(ARTICLES_SLUGS_QUERY)
  
  return slugs.map((slug: string) => ({
    slug: slug,
  }))
}
