// app/admin/metadata/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { 
  PageMetadata, 
  getAllPageMetadata, 
  upsertPageMetadata, 
  deletePageMetadata,
  uploadOGImage,
  deleteOGImage,
  getDefaultMetadata
} from '@/lib/metadata-manager';
import toast from 'react-hot-toast';
import { PencilIcon, TrashIcon, PlusIcon, PhotoIcon, EyeIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function MetadataAdminPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [metadata, setMetadata] = useState<PageMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<PageMetadata | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) return;
    
    if (!user) {
      router.push('/login');
      return;
    }
    fetchMetadata();
  }, [user, authLoading, router]);

  const fetchMetadata = async () => {
    try {
      setLoading(true);
      const data = await getAllPageMetadata();
      setMetadata(data);
    } catch (error) {
      console.error('Error fetching metadata:', error);
      toast.error('Failed to load metadata');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: PageMetadata) => {
    setEditingItem(item);
    setPreviewUrl(item.ogImage || null);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    const newPath = prompt('Enter the page path (e.g., /about, /services/consulting):');
    if (!newPath) return;
    
    const defaultMeta = getDefaultMetadata(newPath);
    setEditingItem(defaultMeta);
    setPreviewUrl(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (item: PageMetadata) => {
    if (!confirm(`Are you sure you want to delete metadata for ${item.path}?`)) return;
    
    try {
      if (item.id) {
        await deletePageMetadata(item.id);
        
        // Delete associated OG image if it's from Firebase Storage
        if (item.ogImage && item.ogImage.includes('firebasestorage')) {
          await deleteOGImage(item.ogImage);
        }
        
        toast.success('Metadata deleted successfully');
        fetchMetadata();
      }
    } catch (error) {
      console.error('Error deleting metadata:', error);
      toast.error('Failed to delete metadata');
    }
  };

  const handleSave = async () => {
    if (!editingItem) return;
    
    try {
      setLoading(true);
      await upsertPageMetadata({
        ...editingItem,
        updatedBy: user?.email || 'admin'
      });
      
      toast.success('Metadata saved successfully');
      setIsModalOpen(false);
      setEditingItem(null);
      setPreviewUrl(null);
      fetchMetadata();
    } catch (error) {
      console.error('Error saving metadata:', error);
      toast.error('Failed to save metadata');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !editingItem) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }
    
    try {
      setUploadingImage(true);
      
      // Delete old image if exists
      if (editingItem.ogImage && editingItem.ogImage.includes('firebasestorage')) {
        await deleteOGImage(editingItem.ogImage);
      }
      
      // Upload new image
      const imageUrl = await uploadOGImage(file, editingItem.path);
      
      setEditingItem({
        ...editingItem,
        ogImage: imageUrl
      });
      setPreviewUrl(imageUrl);
      
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCloudinaryId = (imageId: string) => {
    if (!editingItem) return;
    
    const cloudinaryUrl = `https://res.cloudinary.com/dusubfxgo/image/upload/w_1200,h_630,c_fill,g_auto,f_auto,q_auto/${imageId}`;
    
    setEditingItem({
      ...editingItem,
      ogImage: cloudinaryUrl,
      ogImageId: imageId
    });
    setPreviewUrl(cloudinaryUrl);
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Show loading while fetching metadata
  if (loading && !isModalOpen) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading metadata...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Page Metadata Manager</h1>
              <button
                onClick={handleCreate}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Page Metadata
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Path
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    OG Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {metadata.map((item) => (
                  <tr key={item.id || item.path}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.path}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="max-w-xs truncate">{item.title}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="max-w-xs truncate">{item.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.ogImage ? (
                        <a
                          href={item.ogImage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-900"
                        >
                          <PhotoIcon className="h-5 w-5" />
                        </a>
                      ) : (
                        <span className="text-gray-400">No image</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.published 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {item.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">
                  Edit Metadata: {editingItem.path}
                </h2>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingItem(null);
                    setPreviewUrl(null);
                  }}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="px-6 py-4 space-y-4">
              {/* Basic Info */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Keywords (comma-separated)</label>
                <input
                  type="text"
                  value={editingItem.keywords?.join(', ') || ''}
                  onChange={(e) => setEditingItem({ 
                    ...editingItem, 
                    keywords: e.target.value.split(',').map(k => k.trim()).filter(Boolean)
                  })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
              
              {/* Open Graph */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Open Graph</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">OG Title</label>
                    <input
                      type="text"
                      value={editingItem.ogTitle || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, ogTitle: e.target.value })}
                      placeholder="Leave empty to use main title"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">OG Description</label>
                    <textarea
                      value={editingItem.ogDescription || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, ogDescription: e.target.value })}
                      placeholder="Leave empty to use main description"
                      rows={2}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">OG Image</label>
                    
                    <div className="space-y-2">
                      {/* Upload New Image */}
                      <div className="flex items-center space-x-3">
                        <label className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                          <PhotoIcon className="h-5 w-5 mr-2" />
                          Upload Image
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={uploadingImage}
                            className="sr-only"
                          />
                        </label>
                        
                        {uploadingImage && (
                          <span className="text-sm text-gray-500">Uploading...</span>
                        )}
                      </div>
                      
                      {/* Or use Cloudinary ID */}
                      <div className="flex items-center space-x-3">
                        <input
                          type="text"
                          value={editingItem.ogImageId || ''}
                          onChange={(e) => handleCloudinaryId(e.target.value)}
                          placeholder="Or enter Cloudinary image ID"
                          className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        />
                      </div>
                      
                      {/* Image Preview */}
                      {previewUrl && (
                        <div className="mt-3">
                          <p className="text-sm text-gray-500 mb-2">Preview:</p>
                          <img
                            src={previewUrl}
                            alt="OG Image Preview"
                            className="max-w-full h-48 object-cover rounded-lg border border-gray-200"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Twitter */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Twitter Card</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Twitter Title</label>
                    <input
                      type="text"
                      value={editingItem.twitterTitle || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, twitterTitle: e.target.value })}
                      placeholder="Leave empty to use OG title"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Twitter Description</label>
                    <textarea
                      value={editingItem.twitterDescription || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, twitterDescription: e.target.value })}
                      placeholder="Leave empty to use OG description"
                      rows={2}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              
              {/* Advanced */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Advanced</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Canonical URL</label>
                    <input
                      type="url"
                      value={editingItem.canonical || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, canonical: e.target.value })}
                      placeholder="https://investinpuglia.eu/..."
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingItem.published !== false}
                      onChange={(e) => setEditingItem({ ...editingItem, published: e.target.checked })}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Published
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingItem(null);
                  setPreviewUrl(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}