'use client'

import { useState, useEffect, useRef } from 'react'
import { MapPin, Euro, Calendar, ExternalLink, Image as ImageIcon, Save, X, Upload, Edit2, Check, RotateCcw } from 'lucide-react'

// Projects directly from CV - Initial data
const INITIAL_CV_PROJECTS = {
  "hospitality": [
    {
      id: "pietra-verde",
      name: "Hotel Pietra Verde",
      location: "Otranto",
      budget: "~300M Lire",
      completion: "2002",
      description: "Architectural & structural renovation",
      website: "https://www.hotelpietraverde.com"
    },
    {
      id: "haethey",
      name: "Hotel degli Haethey",
      location: "Otranto", 
      budget: "€2.5M (total)",
      completion: "2003-2006",
      description: "1st Expansion (€1.5M, 2003) + Elevation (€1M, 2006)",
      website: "https://www.haetheyhotel.com"
    },
    {
      id: "mulino",
      name: "Camping Mulino d'Acqua",
      location: "Otranto",
      budget: "€1.2M (total)",
      completion: "2003-2017",
      description: "New accommodations (€700K, 2003) + SPA & quality upgrade (€500K, 2017)",
      website: "https://www.campingmulino.it"
    },
    {
      id: "montelauro",
      name: "Masseria Montelauro",
      location: "Otranto",
      budget: "€3.3M",
      completion: "2003-ongoing",
      description: "Conversion to hospitality (€1.8M, 2003) + Expansion (€1.5M, 2006-ongoing)",
      website: "https://www.masseriamontelauro.it"
    },
    {
      id: "koine",
      name: "Hotel Koinè",
      location: "Otranto",
      budget: "€3.5M",
      completion: "2006",
      description: "Recreational building → hotel conversion",
      website: "https://www.hotelkoine.com"
    },
    {
      id: "petraria",
      name: "Hotel Petraria",
      location: "Cannole",
      budget: "€5.5M",
      completion: "2008",
      description: "New tourist structure",
      website: "https://www.hotelpetraria.it"
    },
    {
      id: "san-giuseppe",
      name: "Masseria San Giuseppe",
      location: "Otranto",
      budget: "€1.8M",
      completion: "2008",
      description: "Restoration & hotel conversion (listed building)",
      website: "https://www.masseriasangiuseppe.it"
    },
    {
      id: "bellaria",
      name: "Hotel Bellaria",
      location: "Giurdignano",
      budget: "€2M",
      completion: "2007",
      description: "New hospitality structure",
      website: "https://www.hotelbellaria.com"
    },
    {
      id: "basiliani",
      name: "Hotel Basiliani",
      location: "Otranto",
      budget: "€2.5M",
      completion: "2009",
      description: "New room block",
      website: "https://www.basilianihotel.com"
    },
    {
      id: "montanari",
      name: "Hotel Montanari",
      location: "Carpignano Salentino",
      budget: "€3.5M",
      completion: "2009",
      description: "New tourist facility",
      website: "http://www.hotelmontanari.com"
    },
    {
      id: "masseria-muzza",
      name: "Hotel Masseria Muzza",
      location: "Otranto",
      budget: "€5.1M",
      completion: "2015-2023",
      description: "5-star conversion (€4.5M, 2015, PIA Turismo) + Expansion (€600K, 2023)",
      website: "https://www.masseriamuzza.it"
    },
    {
      id: "spinola",
      name: "Hotel Spinola",
      location: "Gallipoli",
      budget: "€1M",
      completion: "2014",
      description: "Renovation",
      website: "https://www.palazzospinola.com"
    },
    {
      id: "voi-alimini",
      name: "VOI Hotels (Alpitour World)",
      location: "Otranto",
      budget: "€650K",
      completion: "2015-2019",
      description: "Reception, restaurants, SPA, rooms",
      website: "https://www.voihotels.com"
    },
    {
      id: "le-cale",
      name: "Le Cale d'Otranto (Italia Turismo)",
      location: "Otranto",
      budget: "€1.6M",
      completion: "2015-2019",
      description: "Restoration & upgrades",
      website: "https://www.lecaledotranto.com"
    },
    {
      id: "bellavista",
      name: "Hotel Bellavista",
      location: "Otranto",
      budget: "€1M",
      completion: "2022",
      description: "Renovation (Titolo II Turismo)",
      website: "https://www.caroli-hotels.com/hotel-bellavista-club-otranto/"
    },
    {
      id: "country-club",
      name: "Country Club Alimini",
      location: "Otranto",
      budget: "€1.3M",
      completion: "2022-2024",
      description: "Sports & pools (€800K, 2022) + Pub & restaurant (€500K, 2024)"
    },
    {
      id: "nohasi",
      name: "Castello di Noha – Nohasi Resort",
      location: "Noha, Galatina",
      budget: "€1.3M",
      completion: "2022",
      description: "Restoration & hotel conversion",
      website: "https://www.nohasi.it"
    },
    {
      id: "shantiland",
      name: "Hotel Shantiland",
      location: "Otranto",
      budget: "€2.167M",
      completion: "2022",
      description: "New tourist structure (PIA Turismo funded)"
    },
    {
      id: "toricito",
      name: "Hotel Toricito Resort",
      location: "Cannole",
      budget: "€1M",
      completion: "2023",
      description: "Upgrade & expansion (Titolo II Turismo)"
    },
    {
      id: "don-girolamo",
      name: "Don Girolamo B&B",
      location: "Casamassella",
      budget: "€500K",
      completion: "2023",
      description: "Conversion of annexes to B&B"
    },
    {
      id: "donna-menga",
      name: "Masseria Donna Menga",
      location: "Nardò",
      budget: "€2.3M",
      completion: "2024",
      description: "Renovation & rural tourism hotel (PIA Turismo funded)"
    }
  ],
  "heritage": [
    {
      id: "madonna-alto",
      name: "Madonna dell'Alto Mare Church",
      location: "Otranto",
      budget: "€100K",
      completion: "2004",
      description: "Vincolato - Protected heritage restoration"
    },
    {
      id: "hypogeum-mill",
      name: "Hypogeum Oil Mill San Giovanni",
      location: "Otranto",
      budget: "€200K",
      completion: "2012",
      description: "Vincolato - Underground heritage site"
    },
    {
      id: "specchiulla",
      name: "Masseria Specchiulla",
      location: "Otranto",
      budget: "TBD",
      completion: "2023",
      description: "Rural heritage restoration (Torre & Hypogeum)"
    },
    {
      id: "torre-matta",
      name: "Torre Matta",
      location: "Otranto",
      budget: "€600K",
      completion: "2016",
      description: "Otranto castle underground recovery"
    }
  ],
}

// Available images in public folder
const AVAILABLE_IMAGES = [
  '/baglioni-pool.jpg',
  '/baglioni_masseria_muzza_gallery_601da4b9a3.jpg',
  '/blue-otranto.jpg',
  '/dimora-giuseppe.jpg',
  '/donna-menga.jpg',
  '/hotel-basiliani.jpg',
  '/hotel-bellaria.jpg',
  '/hotel-bellavista.webp',
  '/hotel-haethey.jpg',
  '/hotel-koine.jpg',
  '/hotel-petraria.jpg',
  '/hypogeum.jpg',
  '/masseria-furca.jpg',
  '/masseria-muzza.jpg',
  '/montelauro.jpg',
  '/nohasi-palace.jpg',
  '/pietra-verde.jpg',
  '/riva-marina.jpg',
  '/santa-lucia.jpg',
  '/torre-matta.jpg',
  '/voi-alimini.webp',
  '/drone-view.jpg'
]

interface Project {
  id: string
  name: string
  location: string
  budget: string
  completion: string
  description: string
  website?: string
}

interface ProjectCardProps {
  project: Project
  category: string
  imageUrl?: string
  isEditing: boolean
  editedProject: Project | null
  onImageClick: () => void
  onRemoveImage: () => void
  onEditStart: () => void
  onEditSave: (project: Project) => void
  onEditCancel: () => void
  onEditChange: (field: string, value: string) => void
}

function ProjectCard({
  project,
  category,
  imageUrl,
  isEditing,
  editedProject,
  onImageClick,
  onRemoveImage,
  onEditStart,
  onEditSave,
  onEditCancel,
  onEditChange
}: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all">
      {/* Image Section */}
      <div 
        className="relative h-48 bg-gray-200 cursor-pointer group"
        onClick={onImageClick}
      >
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt={project.name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={(e) => {
                e.stopPropagation()
                onRemoveImage()
              }}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Click to assign image</p>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {isEditing ? (
          <div className="space-y-2">
            <input
              type="text"
              value={editedProject?.name || ''}
              onChange={(e) => onEditChange('name', e.target.value)}
              className="w-full px-2 py-1 border rounded text-lg font-bold"
              placeholder="Project Name"
            />
            <input
              type="text"
              value={editedProject?.location || ''}
              onChange={(e) => onEditChange('location', e.target.value)}
              className="w-full px-2 py-1 border rounded text-sm"
              placeholder="Location"
            />
            <input
              type="text"
              value={editedProject?.budget || ''}
              onChange={(e) => onEditChange('budget', e.target.value)}
              className="w-full px-2 py-1 border rounded text-sm"
              placeholder="Budget"
            />
            <input
              type="text"
              value={editedProject?.completion || ''}
              onChange={(e) => onEditChange('completion', e.target.value)}
              className="w-full px-2 py-1 border rounded text-sm"
              placeholder="Completion"
            />
            <textarea
              value={editedProject?.description || ''}
              onChange={(e) => onEditChange('description', e.target.value)}
              className="w-full px-2 py-1 border rounded text-sm"
              rows={3}
              placeholder="Description"
            />
            <input
              type="text"
              value={editedProject?.website || ''}
              onChange={(e) => onEditChange('website', e.target.value)}
              className="w-full px-2 py-1 border rounded text-sm"
              placeholder="Website URL (optional)"
            />
            <div className="flex gap-2">
              <button
                onClick={() => editedProject && onEditSave(editedProject)}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 flex items-center gap-1"
              >
                <Check className="h-4 w-4" />
                Save
              </button>
              <button
                onClick={onEditCancel}
                className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 flex items-center gap-1"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-lg mb-2">{project.name}</h3>
              <button
                onClick={onEditStart}
                className="text-indigo-600 hover:text-indigo-800"
                title="Edit project details"
              >
                <Edit2 className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <p className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {project.location}
              </p>
              <p className="flex items-center gap-1">
                <Euro className="h-4 w-4" />
                {project.budget}
              </p>
              <p className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {project.completion}
              </p>
            </div>
            <p className="mt-2 text-sm">{project.description}</p>
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 text-sm mt-2"
              >
                <ExternalLink className="h-3 w-3" />
                Website
              </a>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default function PortfolioEditorV2() {
  const [imageAssignments, setImageAssignments] = useState<Record<string, string>>({})
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [showImagePicker, setShowImagePicker] = useState(false)
  const [savedMessage, setSavedMessage] = useState('')
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [cvProjects, setCvProjects] = useState(INITIAL_CV_PROJECTS)
  const [editingProject, setEditingProject] = useState<string | null>(null)
  const [editedProject, setEditedProject] = useState<Project | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load saved data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('portfolio-images')
    if (saved) setImageAssignments(JSON.parse(saved))
    
    const savedUploads = localStorage.getItem('portfolio-uploaded-images')
    if (savedUploads) setUploadedImages(JSON.parse(savedUploads))
    
    const savedProjects = localStorage.getItem('portfolio-projects')
    if (savedProjects) setCvProjects(JSON.parse(savedProjects))
    
    // Push Trullo widget to the side
    const style = document.createElement('style')
    style.innerHTML = `
      #trullo-container, #trullo-widget, .trullo-widget {
        right: 20px !important;
        bottom: 20px !important;
        z-index: 40 !important;
      }
    `
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  const assignImage = (projectId: string, imageUrl: string) => {
    const newAssignments = { ...imageAssignments, [projectId]: imageUrl }
    setImageAssignments(newAssignments)
    localStorage.setItem('portfolio-images', JSON.stringify(newAssignments))
    setShowImagePicker(false)
    setSelectedProject(null)
    showMessage('Image assigned successfully!')
  }

  const removeImage = (projectId: string) => {
    const newAssignments = { ...imageAssignments }
    delete newAssignments[projectId]
    setImageAssignments(newAssignments)
    localStorage.setItem('portfolio-images', JSON.stringify(newAssignments))
    showMessage('Image removed')
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        const newUploads = [...uploadedImages, result]
        setUploadedImages(newUploads)
        localStorage.setItem('portfolio-uploaded-images', JSON.stringify(newUploads))
        showMessage(`Uploaded ${file.name}`)
      }
      reader.readAsDataURL(file)
    })
  }

  const clearUploadedImages = () => {
    if (confirm('Clear all uploaded images?')) {
      setUploadedImages([])
      localStorage.removeItem('portfolio-uploaded-images')
      showMessage('Cleared all uploaded images')
    }
  }

  const startEditingProject = (category: string, projectId: string) => {
    const project = cvProjects[category as keyof typeof cvProjects].find((p: any) => p.id === projectId)
    if (project) {
      setEditingProject(projectId)
      setEditedProject({ ...project })
    }
  }

  const saveProjectEdit = (category: string) => {
    if (!editedProject || !editingProject) return
    
    const newProjects = { ...cvProjects }
    const categoryProjects = newProjects[category as keyof typeof newProjects]
    const projectIndex = categoryProjects.findIndex((p: any) => p.id === editingProject)
    
    if (projectIndex !== -1) {
      categoryProjects[projectIndex] = editedProject
      setCvProjects(newProjects)
      localStorage.setItem('portfolio-projects', JSON.stringify(newProjects))
      showMessage('Project updated successfully!')
    }
    
    setEditingProject(null)
    setEditedProject(null)
  }

  const cancelEdit = () => {
    setEditingProject(null)
    setEditedProject(null)
  }

  const resetAll = () => {
    if (confirm('Reset everything to original CV data? This will lose all edits and image assignments.')) {
      setCvProjects(INITIAL_CV_PROJECTS)
      setImageAssignments({})
      setUploadedImages([])
      localStorage.removeItem('portfolio-projects')
      localStorage.removeItem('portfolio-images')
      localStorage.removeItem('portfolio-uploaded-images')
      showMessage('Reset to original data')
    }
  }

  const exportData = () => {
    const exportData = {
      imageAssignments,
      projects: cvProjects,
      uploadedImagesCount: uploadedImages.length
    }
    const dataStr = JSON.stringify(exportData, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
    const link = document.createElement('a')
    link.setAttribute('href', dataUri)
    link.setAttribute('download', 'portfolio-data.json')
    link.click()
    showMessage('Data exported')
  }

  const showMessage = (msg: string) => {
    setSavedMessage(msg)
    setTimeout(() => setSavedMessage(''), 3000)
  }

  const renderProjectSection = (title: string, category: string, projects: Project[]) => (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-indigo-900">{title}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: Project) => (
          <ProjectCard
            key={project.id}
            project={project}
            category={category}
            imageUrl={imageAssignments[project.id]}
            isEditing={editingProject === project.id}
            editedProject={editingProject === project.id ? editedProject : null}
            onImageClick={() => {
              setSelectedProject(project.id)
              setShowImagePicker(true)
            }}
            onRemoveImage={() => removeImage(project.id)}
            onEditStart={() => startEditingProject(category, project.id)}
            onEditSave={() => saveProjectEdit(category)}
            onEditCancel={cancelEdit}
            onEditChange={(field, value) => {
              if (editedProject) {
                setEditedProject({ ...editedProject, [field]: value })
              }
            }}
          />
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold mb-4">Portfolio Editor</h1>
          <p className="text-gray-600 mb-6">
            Edit project details and assign images. All changes are saved automatically.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-4">
            <button
              onClick={exportData}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
            >
              <Save className="h-5 w-5" />
              Export Data
            </button>
            
            <label className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 cursor-pointer">
              <Upload className="h-5 w-5" />
              Upload Images
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            
            <button
              onClick={resetAll}
              className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 flex items-center gap-2"
            >
              <RotateCcw className="h-5 w-5" />
              Reset All
            </button>
            
            {uploadedImages.length > 0 && (
              <button
                onClick={clearUploadedImages}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
              >
                <X className="h-5 w-5" />
                Clear Uploads ({uploadedImages.length})
              </button>
            )}
          </div>

          {/* Status Message */}
          {savedMessage && (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg inline-block">
              {savedMessage}
            </div>
          )}
        </div>

        {/* Project Sections */}
        {renderProjectSection('Hospitality & Tourism Structures', 'hospitality', cvProjects.hospitality)}
        {cvProjects.heritage.length > 0 && renderProjectSection('Heritage & Historic Restoration', 'heritage', cvProjects.heritage)}

        {/* Image Picker Modal */}
        {showImagePicker && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                <h3 className="text-xl font-bold">Select an Image</h3>
                <button
                  onClick={() => {
                    setShowImagePicker(false)
                    setSelectedProject(null)
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-4">
                {/* Uploaded Images */}
                {uploadedImages.length > 0 && (
                  <>
                    <h4 className="font-semibold text-lg mb-3 text-indigo-600">Your Uploaded Images</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                      {uploadedImages.map((image, index) => (
                        <div
                          key={`upload-${index}`}
                          onClick={() => selectedProject && assignImage(selectedProject, image)}
                          className="cursor-pointer hover:opacity-80 transition-opacity border-2 border-indigo-300 rounded-lg overflow-hidden"
                        >
                          <img src={image} alt={`Upload ${index + 1}`} className="w-full h-32 object-cover" />
                          <div className="p-2 text-xs text-center bg-indigo-100 font-semibold">
                            Upload {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                    <hr className="my-6" />
                  </>
                )}
                
                {/* Available Images */}
                <h4 className="font-semibold text-lg mb-3">Available Images</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {AVAILABLE_IMAGES.map((image) => (
                    <div
                      key={image}
                      onClick={() => selectedProject && assignImage(selectedProject, image)}
                      className="cursor-pointer hover:opacity-80 transition-opacity border rounded-lg overflow-hidden"
                    >
                      <img src={image} alt={image} className="w-full h-32 object-cover" />
                      <div className="p-2 text-xs text-center bg-gray-50">
                        {image.split('/').pop()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}