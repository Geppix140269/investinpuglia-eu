import { client } from '@/sanity/lib/client'

export interface SectionVideo {
  _id: string
  title: string
  name: string
  video: {
    asset: {
      _ref: string
      _type: 'reference'
      url: string
    }
  }
  poster: {
    asset: {
      _ref: string
      _type: 'reference'
      url: string
    }
  }
  section: string
  order: number
  isActive: boolean
  description?: string
}

export type SectionType = 
  | 'hero' 
  | 'about' 
  | 'portfolio' 
  | 'services' 
  | 'testimonials' 
  | 'footer'
  | 'why-puglia'
  | 'how-it-works'
  | 'opportunity'
  | 'trullo'
  | 'faq'
  | 'team'

export async function getSectionVideos(section: SectionType): Promise<SectionVideo[]> {
  try {
    const query = `
      *[_type == "heroVideo" && section == $section && isActive == true] | order(order asc) {
        _id,
        title,
        name,
        "video": {
          "asset": {
            "_ref": video.asset._ref,
            "_type": video.asset._type,
            "url": video.asset->url
          }
        },
        "poster": {
          "asset": {
            "_ref": poster.asset._ref,
            "_type": poster.asset._type,
            "url": poster.asset->url
          }
        },
        section,
        order,
        isActive,
        description
      }
    `
    
    const videos = await client.fetch<SectionVideo[]>(query, { section })
    return videos || []
  } catch (error) {
    console.error(`Error fetching videos for section ${section}:`, error)
    return []
  }
}

export async function getAllSectionVideos(): Promise<SectionVideo[]> {
  try {
    const query = `
      *[_type == "heroVideo" && isActive == true] | order(section asc, order asc) {
        _id,
        title,
        name,
        "video": {
          "asset": {
            "_ref": video.asset._ref,
            "_type": video.asset._type,
            "url": video.asset->url
          }
        },
        "poster": {
          "asset": {
            "_ref": poster.asset._ref,
            "_type": poster.asset._type,  
            "url": poster.asset->url
          }
        },
        section,
        order,
        isActive,
        description
      }
    `
    
    const videos = await client.fetch<SectionVideo[]>(query)
    return videos || []
  } catch (error) {
    console.error('Error fetching all section videos:', error)
    return []
  }
}

// Get videos grouped by section
export async function getVideosBySection(): Promise<Record<string, SectionVideo[]>> {
  try {
    const videos = await getAllSectionVideos()
    
    const grouped = videos.reduce((acc, video) => {
      if (!acc[video.section]) {
        acc[video.section] = []
      }
      acc[video.section].push(video)
      return acc
    }, {} as Record<string, SectionVideo[]>)
    
    return grouped
  } catch (error) {
    console.error('Error grouping videos by section:', error)
    return {}
  }
}

// Fallback video data for when Sanity is unavailable
export const fallbackVideos: Record<SectionType, SectionVideo[]> = {
  hero: [
    {
      _id: 'fallback-hero-1',
      title: 'Beach Club Aperitivo',
      name: 'Beach Club',
      video: {
        asset: {
          _ref: 'fallback',
          _type: 'reference',
          url: 'https://res.cloudinary.com/dusubfxgo/video/upload/v1756888562/investinpuglia/hero-videos/beach-club.mp4'
        }
      },
      poster: {
        asset: {
          _ref: 'fallback',
          _type: 'reference',
          url: 'https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto:low,w_1920,h_1080,c_limit/v1756888562/investinpuglia/hero-videos/beach-club.jpg'
        }
      },
      section: 'hero',
      order: 1,
      isActive: true
    }
  ],
  about: [],
  portfolio: [],
  services: [],
  testimonials: [],
  footer: [],
  'why-puglia': [],
  'how-it-works': [],
  opportunity: [],
  trullo: [],
  faq: [],
  team: []
}