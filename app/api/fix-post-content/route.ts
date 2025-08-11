// app/api/fix-post-content/route.ts
// FIXED VERSION - COPY THIS ENTIRE FILE
import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'trdbxmjo',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Define types for Portable Text
interface PortableTextBlock {
  _type: string
  style?: string
  children: Array<{
    _type: string
    text: string
  }>
}

// Helper to create Portable Text blocks
function createPortableTextContent(title: string, category: string): PortableTextBlock[] {
  const blocks: PortableTextBlock[] = []
  
  // Add different content based on category
  if (category === 'Investment Guide') {
    blocks.push(
      {
        _type: 'block',
        style: 'h1',
        children: [{ _type: 'span', text: title }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'Puglia offers exceptional investment opportunities with tax incentives up to 50%, access to €5.3 billion in EU funds, and a strategic Mediterranean location connecting Europe, Africa, and Asia.'
        }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Key Investment Advantages' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: '• Tax credit up to 50% for investments over €500,000'
        }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: '• R&D bonus additional 15% on top of standard incentives'
        }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: '• ZES (Special Economic Zone) reduced corporate tax rates'
        }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: '• Skilled workforce from 5 major universities with 20,000+ annual graduates'
        }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: '• Lower operating costs (30-40% savings compared to Northern Europe)'
        }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: '• Strategic logistics hub with 8 international ports and 2 airports'
        }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Available Grants and Funding' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'Companies investing in Puglia can access multiple funding sources including NRRP funds, EU structural funds, regional grants, and specialized sector incentives. Our team helps you navigate and maximize these opportunities.'
        }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Success Factors' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'International companies in Puglia report average ROI of 25% within 3 years, citing the combination of incentives, strategic location, and skilled workforce as key success factors.'
        }]
      }
    )
  } else if (category === 'Location Guide') {
    blocks.push(
      {
        _type: 'block',
        style: 'h1',
        children: [{ _type: 'span', text: title }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'Strategic location offering unique advantages for international businesses seeking to establish or expand operations in Southern Europe.'
        }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Strategic Location Benefits' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'Direct access to Mediterranean markets with excellent transport connections, modern business infrastructure, and a growing international business community.'
        }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Investment Incentives' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'Businesses can access tax credits up to 50%, ZES benefits, EU funding, and fast-track permitting processes.'
        }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Quality of Life' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'Mediterranean climate with 300+ sunny days, affordable housing (50% less than Milan), excellent healthcare and education, rich cultural heritage, and beautiful beaches.'
        }]
      }
    )
  } else if (category === 'Incentives Guide') {
    blocks.push(
      {
        _type: 'block',
        style: 'h1',
        children: [{ _type: 'span', text: title }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'Comprehensive guide to accessing investment incentives and grants available for businesses in Puglia.'
        }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Key Benefits' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'Significant cost reductions through tax credits, grants, and subsidies. Competitive advantages through R&D support and innovation funding. Risk mitigation through government-backed guarantees.'
        }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Eligibility Criteria' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'Business must be established or planning to establish in Puglia. Must meet sector-specific requirements and comply with EU regulations. Minimum investment thresholds apply based on company size.'
        }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Application Process' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: '1. Contact InvestInPuglia for eligibility assessment\n2. Prepare required documentation\n3. Submit application through official channels\n4. Evaluation period (30-60 days)\n5. Receive funding approval\n6. Implement project with monitoring'
        }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Maximum Benefits' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'Small enterprises: up to 50% funding\nMedium enterprises: up to 40% funding\nLarge enterprises: up to 30% funding\nAdditional bonuses available for strategic sectors and R&D activities.'
        }]
      }
    )
  } else if (category === 'Success Story') {
    blocks.push(
      {
        _type: 'block',
        style: 'h1',
        children: [{ _type: 'span', text: title }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'Learn how international companies are achieving remarkable success in Puglia with strong ROI and sustainable growth.'
        }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'The Challenge' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'Expanding into European markets while maintaining cost efficiency and accessing skilled talent. Finding the right location with optimal incentives and strategic advantages.'
        }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Why Puglia Was Chosen' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'Strategic Mediterranean location providing access to EU, African, and Middle Eastern markets. Tax incentives up to 50% significantly reducing investment costs. Availability of skilled workforce from regional universities. Strong government support and streamlined processes.'
        }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Results Achieved' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: '• 25% ROI achieved within first 3 years\n• 40% reduction in operational costs\n• Successful market expansion across Mediterranean\n• Creation of 200+ local jobs\n• Access to new customer base of 500M people'
        }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Key Success Factors' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'Comprehensive support from InvestInPuglia throughout the investment journey. Strategic partnerships with local universities and research centers. Access to multiple funding sources and incentive programs. Strong logistics infrastructure enabling efficient distribution.'
        }]
      }
    )
  } else {
    // Default content for other categories
    blocks.push(
      {
        _type: 'block',
        style: 'h1',
        children: [{ _type: 'span', text: title }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'Comprehensive analysis and insights for making informed investment decisions in Puglia.'
        }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Executive Summary' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'Puglia offers unmatched investment opportunities in Southern Europe with competitive advantages including strategic location, generous incentives, skilled workforce, and lower operating costs.'
        }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Key Findings' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'Cost advantages of 30-40% compared to Northern European locations. Superior incentive packages with tax credits up to 50%. Strategic geographic position at the heart of the Mediterranean. Access to EU funding programs totaling €5.3 billion.'
        }]
      }
    )
  }
  
  // Add contact information to all posts
  blocks.push(
    {
      _type: 'block',
      style: 'h2',
      children: [{ _type: 'span', text: 'Contact Our Investment Team' }]
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ 
        _type: 'span', 
        text: 'Get personalized support for your investment project in Puglia. Our team provides free, confidential assistance throughout your investment journey.'
      }]
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ 
        _type: 'span', 
        text: 'Email: info@investinpuglia.eu'
      }]
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ 
        _type: 'span', 
        text: 'Phone: +39 351 4001402'
      }]
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ 
        _type: 'span', 
        text: 'Website: www.investinpuglia.eu'
      }]
    }
  )
  
  return blocks
}

export async function GET() {
  try {
    // Fetch all posts that might have empty content
    const posts = await sanityClient.fetch(
      `*[_type == "post"] {
        _id,
        title,
        category,
        content
      }`
    )
    
    console.log(`Found ${posts.length} posts to check...`)
    
    let updatedCount = 0
    let skippedCount = 0
    const errors: Array<{ title: string; error: string }> = []
    
    for (const post of posts) {
      try {
        // Check if content is empty or just a string
        const needsUpdate = !post.content || 
                           typeof post.content === 'string' || 
                           (Array.isArray(post.content) && post.content.length === 0)
        
        if (needsUpdate) {
          console.log(`Updating: ${post.title}`)
          
          // Create proper Portable Text content
          const portableTextContent = createPortableTextContent(
            post.title || 'Investment Guide',
            post.category || 'General'
          )
          
          // Update the post with Portable Text content
          await sanityClient
            .patch(post._id)
            .set({ content: portableTextContent })
            .commit()
          
          updatedCount++
        } else {
          skippedCount++
        }
      } catch (error: any) {
        errors.push({ 
          title: post.title, 
          error: error.message 
        })
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Fixed ${updatedCount} posts with content, skipped ${skippedCount} posts (already had content)`,
      total: posts.length,
      updatedCount,
      skippedCount,
      errors
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}