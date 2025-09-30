import { sanity } from '../sanity'

export interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt?: string
  author?: {
    name: string
    image?: {
      asset: {
        url: string
      }
    }
  }
  mainImage?: {
    asset: {
      url: string
    }
    alt?: string
  }
  categories?: Array<{
    title: string
    slug: {
      current: string
    }
  }>
  publishedAt: string
  body: any[]
  _updatedAt: string
}

// Get all blog posts (for listing page)
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await sanity.fetch(`
      *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        author->{
          name,
          image
        },
        mainImage{
          asset->{
            url
          },
          alt
        },
        categories[]->{
          title,
          slug
        },
        publishedAt,
        _updatedAt
      }
    `)
    return posts || []
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

// Get latest blog posts (for homepage)
export async function getLatestBlogPosts(count: number = 3): Promise<BlogPost[]> {
  try {
    const posts = await sanity.fetch(`
      *[_type == "post" && defined(slug.current)] | order(publishedAt desc) [0...${count}] {
        _id,
        title,
        slug,
        excerpt,
        author->{
          name,
          image
        },
        mainImage{
          asset->{
            url
          },
          alt
        },
        categories[]->{
          title,
          slug
        },
        publishedAt,
        _updatedAt
      }
    `)
    return posts || []
  } catch (error) {
    console.error('Error fetching latest blog posts:', error)
    return []
  }
}

// Get single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const post = await sanity.fetch(`
      *[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        excerpt,
        author->{
          name,
          image
        },
        mainImage{
          asset->{
            url
          },
          alt
        },
        categories[]->{
          title,
          slug
        },
        publishedAt,
        body,
        _updatedAt
      }
    `, { slug })
    return post || null
  } catch (error) {
    console.error('Error fetching blog post by slug:', error)
    return null
  }
}

// Get related blog posts (by category)
export async function getRelatedBlogPosts(currentPostId: string, categoryIds: string[], count: number = 3): Promise<BlogPost[]> {
  try {
    if (!categoryIds || categoryIds.length === 0) {
      // If no categories, get latest posts excluding current
      const posts = await sanity.fetch(`
        *[_type == "post" && defined(slug.current) && _id != $currentPostId] | order(publishedAt desc) [0...${count}] {
          _id,
          title,
          slug,
          excerpt,
          author->{
            name,
            image
          },
          mainImage{
            asset->{
              url
            },
            alt
          },
          categories[]->{
            title,
            slug
          },
          publishedAt,
          _updatedAt
        }
      `, { currentPostId })
      return posts || []
    }

    const posts = await sanity.fetch(`
      *[_type == "post" && defined(slug.current) && _id != $currentPostId && count((categories[]._ref)[@ in $categoryIds]) > 0] | order(publishedAt desc) [0...${count}] {
        _id,
        title,
        slug,
        excerpt,
        author->{
          name,
          image
        },
        mainImage{
          asset->{
            url
          },
          alt
        },
        categories[]->{
          title,
          slug
        },
        publishedAt,
        _updatedAt
      }
    `, { currentPostId, categoryIds })
    return posts || []
  } catch (error) {
    console.error('Error fetching related blog posts:', error)
    return []
  }
}

// Get blog posts by category
export async function getBlogPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  try {
    const posts = await sanity.fetch(`
      *[_type == "post" && defined(slug.current) && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        author->{
          name,
          image
        },
        mainImage{
          asset->{
            url
          },
          alt
        },
        categories[]->{
          title,
          slug
        },
        publishedAt,
        _updatedAt
      }
    `, { categorySlug })
    return posts || []
  } catch (error) {
    console.error('Error fetching blog posts by category:', error)
    return []
  }
}

// Get all categories
export async function getAllCategories() {
  try {
    const categories = await sanity.fetch(`
      *[_type == "category"] | order(title asc) {
        _id,
        title,
        slug,
        description
      }
    `)
    return categories || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

// Helper function to format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Helper function to get estimated reading time
export function getReadingTime(body: any[]): number {
  if (!body || !Array.isArray(body)) return 1

  const text = body
    .filter(block => block._type === 'block')
    .map(block => block.children?.map((child: any) => child.text).join('') || '')
    .join(' ')

  const wordsPerMinute = 200
  const words = text.split(' ').length
  const readingTime = Math.ceil(words / wordsPerMinute)

  return readingTime < 1 ? 1 : readingTime
}