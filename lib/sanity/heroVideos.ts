import { sanity } from '../sanity'

export interface HeroVideo {
  _id: string
  title: string
  name: string
  video: {
    asset: {
      url: string
      metadata?: {
        dimensions?: {
          width: number
          height: number
        }
      }
    }
  }
  poster: {
    asset: {
      url: string
    }
  }
  order: number
  isActive: boolean
  description?: string
}

export async function getHeroVideos(): Promise<HeroVideo[]> {
  const query = `*[_type == "heroVideo" && isActive == true] | order(order asc) {
    _id,
    title,
    name,
    "video": video.asset->{
      url,
      metadata
    },
    "poster": poster.asset->{
      url
    },
    order,
    isActive,
    description
  }`

  try {
    const videos = await sanity.fetch<HeroVideo[]>(query)
    return videos || []
  } catch (error) {
    console.error('Error fetching hero videos:', error)
    return []
  }
}

export async function getHeroVideoById(id: string): Promise<HeroVideo | null> {
  const query = `*[_type == "heroVideo" && _id == $id][0] {
    _id,
    title,
    name,
    "video": video.asset->{
      url,
      metadata
    },
    "poster": poster.asset->{
      url
    },
    order,
    isActive,
    description
  }`

  try {
    const video = await sanity.fetch<HeroVideo>(query, { id })
    return video || null
  } catch (error) {
    console.error('Error fetching hero video by id:', error)
    return null
  }
}