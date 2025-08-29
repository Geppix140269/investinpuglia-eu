import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  updateDoc, 
  deleteDoc,
  serverTimestamp,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface InvestorContact {
  id?: string;
  email: string;
  name?: string;
  status: 'interested' | 'active' | 'unsubscribed' | 'bounced';
  tags: string[];
  source: string;
  subscribed: boolean;
  eventRegistrations?: string[];
  createdAt?: any;
  updatedAt?: any;
  lastEmailSent?: any;
  emailsSent?: number;
  notes?: string;
  // Name review fields
  extractedName?: string;
  confidence?: 'high' | 'medium' | 'low' | 'none';
  isReviewed?: boolean;
  lastModified?: any;
}

const COLLECTION_NAME = 'investor_mailing_list';

// Add a single investor contact
export async function addInvestorContact(contact: Omit<InvestorContact, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    // Check if email already exists
    const existingContact = await getInvestorByEmail(contact.email);
    if (existingContact) {
      console.log(`Email ${contact.email} already exists in the mailing list`);
      return existingContact.id!;
    }

    const docRef = doc(collection(db, COLLECTION_NAME));
    await setDoc(docRef, {
      ...contact,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      emailsSent: 0
    });
    
    console.log(`Added investor contact: ${contact.email}`);
    return docRef.id;
  } catch (error) {
    console.error('Error adding investor contact:', error);
    throw error;
  }
}

// Bulk import investor contacts
export async function bulkImportInvestors(contacts: Omit<InvestorContact, 'id' | 'createdAt' | 'updatedAt'>[]): Promise<{
  success: number;
  failed: number;
  duplicates: number;
}> {
  const results = {
    success: 0,
    failed: 0,
    duplicates: 0
  };

  for (const contact of contacts) {
    try {
      // Check if email already exists
      const existing = await getInvestorByEmail(contact.email);
      if (existing) {
        results.duplicates++;
        continue;
      }

      await addInvestorContact(contact);
      results.success++;
    } catch (error) {
      console.error(`Failed to import ${contact.email}:`, error);
      results.failed++;
    }
  }

  return results;
}

// Get investor by email
export async function getInvestorByEmail(email: string): Promise<InvestorContact | null> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('email', '==', email.toLowerCase())
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      } as InvestorContact;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting investor by email:', error);
    return null;
  }
}

// Get all investors
export async function getAllInvestors(
  filterStatus?: InvestorContact['status'],
  filterTags?: string[]
): Promise<InvestorContact[]> {
  try {
    let q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    
    if (filterStatus) {
      q = query(q, where('status', '==', filterStatus));
    }
    
    if (filterTags && filterTags.length > 0) {
      q = query(q, where('tags', 'array-contains-any', filterTags));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as InvestorContact));
  } catch (error) {
    console.error('Error getting all investors:', error);
    return [];
  }
}

// Get subscribed investors for email campaigns
export async function getSubscribedInvestors(): Promise<InvestorContact[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('subscribed', '==', true),
      where('status', 'in', ['interested', 'active']),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as InvestorContact));
  } catch (error) {
    console.error('Error getting subscribed investors:', error);
    return [];
  }
}

// Update investor contact
export async function updateInvestorContact(
  id: string, 
  updates: Partial<InvestorContact>
): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    console.log(`Updated investor contact: ${id}`);
  } catch (error) {
    console.error('Error updating investor contact:', error);
    throw error;
  }
}

// Unsubscribe investor
export async function unsubscribeInvestor(email: string): Promise<void> {
  try {
    const investor = await getInvestorByEmail(email);
    if (investor && investor.id) {
      await updateInvestorContact(investor.id, {
        subscribed: false,
        status: 'unsubscribed'
      });
      console.log(`Unsubscribed investor: ${email}`);
    }
  } catch (error) {
    console.error('Error unsubscribing investor:', error);
    throw error;
  }
}

// Record email sent
export async function recordEmailSent(investorId: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, investorId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const currentData = docSnap.data();
      await updateDoc(docRef, {
        lastEmailSent: serverTimestamp(),
        emailsSent: (currentData.emailsSent || 0) + 1,
        updatedAt: serverTimestamp()
      });
    }
  } catch (error) {
    console.error('Error recording email sent:', error);
  }
}

// Add tag to investor
export async function addTagToInvestor(investorId: string, tag: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, investorId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const currentTags = docSnap.data().tags || [];
      if (!currentTags.includes(tag)) {
        await updateDoc(docRef, {
          tags: [...currentTags, tag],
          updatedAt: serverTimestamp()
        });
        console.log(`Added tag "${tag}" to investor ${investorId}`);
      }
    }
  } catch (error) {
    console.error('Error adding tag to investor:', error);
    throw error;
  }
}

// Update investor name
export async function updateInvestorName(investorId: string, name: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, investorId);
    await updateDoc(docRef, {
      name: name,
      updatedAt: serverTimestamp()
    });
    console.log(`Updated name for investor ${investorId}: ${name}`);
  } catch (error) {
    console.error('Error updating investor name:', error);
    throw error;
  }
}

// Name extraction and confidence utilities
export function extractNameFromEmail(email: string): string {
  const localPart = email.split('@')[0];
  
  // Remove common prefixes/suffixes
  let cleanName = localPart
    .replace(/^(info|admin|contact|hello|hi|support|sales|welcome|newsletter|no-reply|noreply)/i, '')
    .replace(/\d+/g, '') // Remove numbers
    .replace(/[._-]/g, ' ') // Replace separators with spaces
    .trim();
  
  // Capitalize first letter of each word
  if (cleanName) {
    return cleanName
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  
  return '';
}

export function getNameConfidence(name: string): 'high' | 'medium' | 'low' | 'none' {
  if (!name) return 'none';
  
  // High confidence: Looks like a real name
  if (/^[A-Z][a-z]+ [A-Z][a-z]+$/.test(name)) return 'high';
  if (/^[A-Z][a-z]+$/.test(name) && name.length > 2) return 'high';
  
  // Medium confidence: Could be a name
  if (/^[A-Za-z]+ [A-Za-z]+$/.test(name)) return 'medium';
  if (/^[A-Za-z]+$/.test(name) && name.length > 2) return 'medium';
  
  // Low confidence: Uncertain
  if (name.length > 1) return 'low';
  
  return 'none';
}

// Update investor with name review data
export async function updateInvestorWithNameReview(
  investorId: string,
  updates: {
    name?: string;
    extractedName?: string;
    confidence?: 'high' | 'medium' | 'low' | 'none';
    isReviewed?: boolean;
  }
): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, investorId);
    await updateDoc(docRef, {
      ...updates,
      lastModified: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    console.log(`Updated name review data for investor ${investorId}`);
  } catch (error) {
    console.error('Error updating investor name review data:', error);
    throw error;
  }
}

// Remove tag from investor
export async function removeTagFromInvestor(investorId: string, tag: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, investorId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const currentTags = docSnap.data().tags || [];
      const updatedTags = currentTags.filter((t: string) => t !== tag);
      await updateDoc(docRef, {
        tags: updatedTags,
        updatedAt: serverTimestamp()
      });
      console.log(`Removed tag "${tag}" from investor ${investorId}`);
    }
  } catch (error) {
    console.error('Error removing tag from investor:', error);
    throw error;
  }
}

// Get mailing list statistics
export async function getMailingListStats(): Promise<{
  total: number;
  subscribed: number;
  unsubscribed: number;
  active: number;
  interested: number;
  bounced: number;
}> {
  try {
    const allInvestors = await getAllInvestors();
    
    return {
      total: allInvestors.length,
      subscribed: allInvestors.filter(i => i.subscribed).length,
      unsubscribed: allInvestors.filter(i => !i.subscribed).length,
      active: allInvestors.filter(i => i.status === 'active').length,
      interested: allInvestors.filter(i => i.status === 'interested').length,
      bounced: allInvestors.filter(i => i.status === 'bounced').length
    };
  } catch (error) {
    console.error('Error getting mailing list stats:', error);
    return {
      total: 0,
      subscribed: 0,
      unsubscribed: 0,
      active: 0,
      interested: 0,
      bounced: 0
    };
  }
}

// Delete investor (GDPR compliance)
export async function deleteInvestor(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
    console.log(`Deleted investor: ${id}`);
  } catch (error) {
    console.error('Error deleting investor:', error);
    throw error;
  }
}