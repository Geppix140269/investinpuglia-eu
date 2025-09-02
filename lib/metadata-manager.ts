// lib/metadata-manager.ts
import { db, storage } from '@/lib/firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  getDocs,
  addDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { Metadata } from 'next';

export interface PageMetadata {
  id?: string;
  path: string; // URL path of the page
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string; // URL to OG image
  ogImageId?: string; // Cloudinary image ID
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
  robots?: {
    index?: boolean;
    follow?: boolean;
    googleBot?: {
      index?: boolean;
      follow?: boolean;
      'max-video-preview'?: number;
      'max-image-preview'?: 'none' | 'standard' | 'large';
      'max-snippet'?: number;
    };
  };
  structuredData?: any; // JSON-LD structured data
  customHeaders?: Record<string, string>;
  lastModified?: Date;
  updatedBy?: string;
  published?: boolean;
}

const COLLECTION_NAME = 'page_metadata';

// Create or update page metadata
export async function upsertPageMetadata(metadata: PageMetadata): Promise<string> {
  try {
    // Check if metadata for this path already exists
    const q = query(collection(db, COLLECTION_NAME), where('path', '==', metadata.path));
    const querySnapshot = await getDocs(q);
    
    const data = {
      ...metadata,
      lastModified: new Date(),
      published: metadata.published !== false
    };
    
    if (!querySnapshot.empty) {
      // Update existing document
      const docId = querySnapshot.docs[0].id;
      await updateDoc(doc(db, COLLECTION_NAME, docId), data);
      return docId;
    } else {
      // Create new document
      const docRef = await addDoc(collection(db, COLLECTION_NAME), data);
      return docRef.id;
    }
  } catch (error) {
    console.error('Error upserting page metadata:', error);
    throw error;
  }
}

// Get metadata for a specific page
export async function getPageMetadata(path: string): Promise<PageMetadata | null> {
  try {
    const q = query(collection(db, COLLECTION_NAME), where('path', '==', path));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      } as PageMetadata;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching page metadata:', error);
    return null;
  }
}

// Get all page metadata
export async function getAllPageMetadata(): Promise<PageMetadata[]> {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as PageMetadata));
  } catch (error) {
    console.error('Error fetching all page metadata:', error);
    return [];
  }
}

// Delete page metadata
export async function deletePageMetadata(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error('Error deleting page metadata:', error);
    throw error;
  }
}

// Upload OG image to Firebase Storage
export async function uploadOGImage(file: File, pagePath: string): Promise<string> {
  try {
    const fileName = `og-images/${pagePath.replace(/\//g, '-')}-${Date.now()}.${file.name.split('.').pop()}`;
    const storageRef = ref(storage, fileName);
    
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading OG image:', error);
    throw error;
  }
}

// Delete OG image from Firebase Storage
export async function deleteOGImage(imageUrl: string): Promise<void> {
  try {
    // Extract file path from URL
    const urlParts = imageUrl.split('/');
    const fileName = urlParts[urlParts.length - 1].split('?')[0];
    const filePath = `og-images/${decodeURIComponent(fileName)}`;
    
    const storageRef = ref(storage, filePath);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting OG image:', error);
    throw error;
  }
}

// Generate Next.js Metadata object from PageMetadata
export function generateNextMetadata(pageMetadata: PageMetadata, baseUrl: string = 'https://investinpuglia.eu'): Metadata {
  const metadata: Metadata = {
    title: pageMetadata.title,
    description: pageMetadata.description,
    keywords: pageMetadata.keywords,
    openGraph: {
      title: pageMetadata.ogTitle || pageMetadata.title,
      description: pageMetadata.ogDescription || pageMetadata.description,
      url: `${baseUrl}${pageMetadata.path}`,
      siteName: 'Invest in Puglia',
      images: pageMetadata.ogImage ? [
        {
          url: pageMetadata.ogImage,
          width: 1200,
          height: 630,
          alt: pageMetadata.ogTitle || pageMetadata.title,
        }
      ] : undefined,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageMetadata.twitterTitle || pageMetadata.ogTitle || pageMetadata.title,
      description: pageMetadata.twitterDescription || pageMetadata.ogDescription || pageMetadata.description,
      images: pageMetadata.twitterImage ? [pageMetadata.twitterImage] : 
              pageMetadata.ogImage ? [pageMetadata.ogImage] : undefined,
      creator: '@investinpuglia'
    },
    alternates: {
      canonical: pageMetadata.canonical || `${baseUrl}${pageMetadata.path}`,
    },
    robots: pageMetadata.robots || {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
    },
  };
  
  return metadata;
}

// Subscribe to real-time updates for a specific page
export function subscribeToPageMetadata(
  path: string, 
  callback: (metadata: PageMetadata | null) => void
): () => void {
  const q = query(collection(db, COLLECTION_NAME), where('path', '==', path));
  
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      callback({
        id: doc.id,
        ...doc.data()
      } as PageMetadata);
    } else {
      callback(null);
    }
  }, (error) => {
    console.error('Error in metadata subscription:', error);
    callback(null);
  });
  
  return unsubscribe;
}

// Get default metadata for a new page
export function getDefaultMetadata(path: string): PageMetadata {
  const pageName = path.split('/').pop() || 'home';
  const formattedName = pageName.charAt(0).toUpperCase() + pageName.slice(1).replace(/-/g, ' ');
  
  return {
    path,
    title: `${formattedName} | Invest in Puglia`,
    description: `Explore ${formattedName} - Expert PIA and Mini PIA grant advisory. EU co-funded Puglia Regional Development programmes.`,
    keywords: [
      'PIA grants puglia',
      'Mini PIA grants',
      'EU co-funded puglia',
      'non refundable grants italy',
      formattedName.toLowerCase()
    ],
    ogTitle: formattedName,
    ogDescription: `Discover ${formattedName} with Invest in Puglia - Your gateway to Italian investment opportunities`,
    published: true,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      }
    }
  };
}

// Batch update multiple page metadata
export async function batchUpdateMetadata(updates: PageMetadata[]): Promise<void> {
  try {
    const promises = updates.map(metadata => upsertPageMetadata(metadata));
    await Promise.all(promises);
  } catch (error) {
    console.error('Error in batch metadata update:', error);
    throw error;
  }
}

// Search metadata by keywords
export async function searchMetadataByKeywords(keywords: string[]): Promise<PageMetadata[]> {
  try {
    const allMetadata = await getAllPageMetadata();
    
    return allMetadata.filter(meta => {
      const metaKeywords = meta.keywords || [];
      return keywords.some(keyword => 
        metaKeywords.some(mk => mk.toLowerCase().includes(keyword.toLowerCase()))
      );
    });
  } catch (error) {
    console.error('Error searching metadata:', error);
    return [];
  }
}