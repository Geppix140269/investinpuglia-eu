'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Edit, Eye, Plus, Search, FileText, Home, Info, Briefcase, Globe, Map, Building } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Page {
  id: string
  title: string
  slug: string
  category: string
  description: string
  lastUpdated: string
  status: 'published' | 'draft'
  icon: any
}

export default function AdminPagesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Define all editable pages
  const pages: Page[] = [
    {
      id: '1',
      title: 'Home Page',
      slug: '/',
      category: 'main',
      description: 'Main landing page with hero section and services overview',
      lastUpdated: '2025-01-15',
      status: 'published',
      icon: Home
    },
    {
      id: '2',
      title: 'About Us',
      slug: '/about',
      category: 'main',
      description: 'Company information and team details',
      lastUpdated: '2025-01-10',
      status: 'published',
      icon: Info
    },
    {
      id: '3',
      title: 'Services',
      slug: '/services',
      category: 'main',
      description: 'List of all services offered',
      lastUpdated: '2025-01-12',
      status: 'published',
      icon: Briefcase
    },
    {
      id: '4',
      title: 'Renovation Expertise',
      slug: '/renovation-expertise',
      category: 'portfolio',
      description: 'Cataldo Russo renovation and restructuring portfolio',
      lastUpdated: '2025-01-29',
      status: 'published',
      icon: Building
    },
    {
      id: '5',
      title: 'Properties',
      slug: '/properties',
      category: 'investment',
      description: 'Available properties for investment',
      lastUpdated: '2025-01-28',
      status: 'published',
      icon: Building
    },
    {
      id: '6',
      title: 'Portfolio',
      slug: '/portfolio',
      category: 'portfolio',
      description: 'Investment portfolio and case studies',
      lastUpdated: '2025-01-20',
      status: 'published',
      icon: Briefcase
    },
    {
      id: '7',
      title: 'How It Works',
      slug: '/how-it-works',
      category: 'info',
      description: 'Step-by-step investment process',
      lastUpdated: '2025-01-18',
      status: 'published',
      icon: Info
    },
    {
      id: '8',
      title: 'FAQ',
      slug: '/faq',
      category: 'info',
      description: 'Frequently asked questions',
      lastUpdated: '2025-01-14',
      status: 'published',
      icon: Info
    },
    {
      id: '9',
      title: 'Contact',
      slug: '/contact',
      category: 'main',
      description: 'Contact form and company details',
      lastUpdated: '2025-01-11',
      status: 'published',
      icon: Globe
    },
    {
      id: '10',
      title: 'Locations',
      slug: '/locations',
      category: 'investment',
      description: 'Investment locations across Puglia',
      lastUpdated: '2025-01-25',
      status: 'published',
      icon: Map
    },
    {
      id: '11',
      title: 'Industries',
      slug: '/industries',
      category: 'investment',
      description: 'Industry sectors for investment',
      lastUpdated: '2025-01-22',
      status: 'published',
      icon: Building
    },
    {
      id: '12',
      title: 'Investment Process',
      slug: '/investment-process',
      category: 'investment',
      description: 'Detailed investment process and timeline',
      lastUpdated: '2025-01-19',
      status: 'published',
      icon: Briefcase
    }
  ]

  const categories = [
    { value: 'all', label: 'All Pages' },
    { value: 'main', label: 'Main Pages' },
    { value: 'portfolio', label: 'Portfolio' },
    { value: 'investment', label: 'Investment' },
    { value: 'info', label: 'Information' }
  ]

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          page.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || page.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Page Management</h1>
              <p className="text-gray-600">Edit and manage all website pages</p>
            </div>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2"
              onClick={() => alert('Page builder coming soon!')}
            >
              <Plus className="h-4 w-4" />
              Create New Page
            </button>
          </div>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search pages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Pages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPages.map((page) => {
            const IconComponent = page.icon
            return (
              <div key={page.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <IconComponent className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{page.title}</h3>
                        <p className="text-sm text-gray-500">{page.slug}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      page.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {page.status}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{page.description}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-xs text-gray-500">
                      Updated: {new Date(page.lastUpdated).toLocaleDateString()}
                    </span>
                    <div className="flex items-center gap-2">
                      <a
                        href={page.slug}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View page"
                      >
                        <Eye className="h-4 w-4" />
                      </a>
                      <Link
                        href={`/admin/pages/edit?slug=${encodeURIComponent(page.slug)}`}
                        className="p-2 text-purple-600 hover:text-purple-900 hover:bg-purple-100 rounded-lg transition-colors"
                        title="Edit page"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        {filteredPages.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No pages found</p>
          </div>
        )}
      </div>
    </div>
  )
}