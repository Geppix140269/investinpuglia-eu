import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  limit,
  and,
  or,
  Timestamp,
  addDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { InvestorContact, getAllInvestors } from '@/lib/firebase-mailing-list';

export interface SegmentRule {
  id: string;
  field: string; // e.g., 'tags', 'status', 'emailsSent', 'lastEmailSent', 'createdAt'
  operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than' | 'in' | 'not_in' | 'exists' | 'not_exists' | 'date_after' | 'date_before' | 'date_between';
  value: any;
  type: 'string' | 'number' | 'boolean' | 'date' | 'array';
}

export interface SegmentCondition {
  id: string;
  rules: SegmentRule[];
  logic: 'AND' | 'OR'; // How to combine rules within this condition
}

export interface UserSegment {
  id: string;
  name: string;
  description: string;
  conditions: SegmentCondition[];
  conditionLogic: 'AND' | 'OR'; // How to combine conditions
  isActive: boolean;
  isDynamic: boolean; // If true, segment updates automatically
  
  // Cached results for performance
  cachedCount?: number;
  lastCalculated?: Timestamp;
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy?: string;
  
  // Usage tracking
  usedInCampaigns: string[];
  usedInSequences: string[];
}

export interface SegmentMember {
  segmentId: string;
  investorId: string;
  addedAt: Timestamp;
  removedAt?: Timestamp;
  isActive: boolean;
}

const SEGMENTS_COLLECTION = 'user_segments';
const SEGMENT_MEMBERS_COLLECTION = 'segment_members';

// Segment Management
export async function createSegment(segment: Omit<UserSegment, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const segmentWithTimestamps = {
      ...segment,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    const docRef = await addDoc(collection(db, SEGMENTS_COLLECTION), segmentWithTimestamps);
    
    // Calculate initial segment members if dynamic
    if (segment.isDynamic) {
      await recalculateSegment(docRef.id);
    }
    
    console.log('Created user segment:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error creating user segment:', error);
    throw error;
  }
}

export async function getSegment(segmentId: string): Promise<UserSegment | null> {
  try {
    const docRef = doc(db, SEGMENTS_COLLECTION, segmentId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as UserSegment;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user segment:', error);
    return null;
  }
}

export async function getAllSegments(activeOnly: boolean = false): Promise<UserSegment[]> {
  try {
    let q = query(collection(db, SEGMENTS_COLLECTION), orderBy('createdAt', 'desc'));
    
    if (activeOnly) {
      q = query(q, where('isActive', '==', true));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as UserSegment));
  } catch (error) {
    console.error('Error getting user segments:', error);
    return [];
  }
}

export async function updateSegment(segmentId: string, updates: Partial<UserSegment>): Promise<void> {
  try {
    const docRef = doc(db, SEGMENTS_COLLECTION, segmentId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
    
    // Recalculate if conditions changed and segment is dynamic
    if ((updates.conditions || updates.conditionLogic) && updates.isDynamic !== false) {
      const segment = await getSegment(segmentId);
      if (segment?.isDynamic) {
        await recalculateSegment(segmentId);
      }
    }
    
    console.log('Updated user segment:', segmentId);
  } catch (error) {
    console.error('Error updating user segment:', error);
    throw error;
  }
}

export async function deleteSegment(segmentId: string): Promise<void> {
  try {
    // Remove all segment members
    const membersQuery = query(
      collection(db, SEGMENT_MEMBERS_COLLECTION),
      where('segmentId', '==', segmentId)
    );
    const members = await getDocs(membersQuery);
    
    const deletePromises = members.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    
    // Delete the segment
    await deleteDoc(doc(db, SEGMENTS_COLLECTION, segmentId));
    
    console.log('Deleted user segment and members:', segmentId);
  } catch (error) {
    console.error('Error deleting user segment:', error);
    throw error;
  }
}

// Segment Calculation
export async function recalculateSegment(segmentId: string): Promise<number> {
  try {
    const segment = await getSegment(segmentId);
    if (!segment) {
      throw new Error('Segment not found');
    }
    
    const allInvestors = await getAllInvestors();
    const matchingInvestors = await evaluateSegment(segment, allInvestors);
    
    // Update segment members
    await updateSegmentMembers(segmentId, matchingInvestors.map(inv => inv.id!));
    
    // Update cached count
    await updateDoc(doc(db, SEGMENTS_COLLECTION, segmentId), {
      cachedCount: matchingInvestors.length,
      lastCalculated: Timestamp.now()
    });
    
    console.log(`Recalculated segment ${segmentId}: ${matchingInvestors.length} members`);
    return matchingInvestors.length;
  } catch (error) {
    console.error('Error recalculating segment:', error);
    throw error;
  }
}

export async function evaluateSegment(segment: UserSegment, investors?: InvestorContact[]): Promise<InvestorContact[]> {
  try {
    if (!investors) {
      investors = await getAllInvestors();
    }
    
    const matchingInvestors = investors.filter(investor => {
      return evaluateInvestorAgainstSegment(investor, segment);
    });
    
    return matchingInvestors;
  } catch (error) {
    console.error('Error evaluating segment:', error);
    return [];
  }
}

function evaluateInvestorAgainstSegment(investor: InvestorContact, segment: UserSegment): boolean {
  if (!segment.conditions || segment.conditions.length === 0) {
    return true; // No conditions means all investors match
  }
  
  const conditionResults = segment.conditions.map(condition => {
    return evaluateCondition(investor, condition);
  });
  
  // Apply condition logic
  if (segment.conditionLogic === 'AND') {
    return conditionResults.every(result => result);
  } else {
    return conditionResults.some(result => result);
  }
}

function evaluateCondition(investor: InvestorContact, condition: SegmentCondition): boolean {
  const ruleResults = condition.rules.map(rule => {
    return evaluateRule(investor, rule);
  });
  
  // Apply rule logic within the condition
  if (condition.logic === 'AND') {
    return ruleResults.every(result => result);
  } else {
    return ruleResults.some(result => result);
  }
}

function evaluateRule(investor: InvestorContact, rule: SegmentRule): boolean {
  const fieldValue = getFieldValue(investor, rule.field);
  
  switch (rule.operator) {
    case 'equals':
      return fieldValue === rule.value;
      
    case 'not_equals':
      return fieldValue !== rule.value;
      
    case 'contains':
      if (Array.isArray(fieldValue)) {
        return fieldValue.includes(rule.value);
      }
      return String(fieldValue).toLowerCase().includes(String(rule.value).toLowerCase());
      
    case 'not_contains':
      if (Array.isArray(fieldValue)) {
        return !fieldValue.includes(rule.value);
      }
      return !String(fieldValue).toLowerCase().includes(String(rule.value).toLowerCase());
      
    case 'greater_than':
      return Number(fieldValue) > Number(rule.value);
      
    case 'less_than':
      return Number(fieldValue) < Number(rule.value);
      
    case 'in':
      return Array.isArray(rule.value) && rule.value.includes(fieldValue);
      
    case 'not_in':
      return Array.isArray(rule.value) && !rule.value.includes(fieldValue);
      
    case 'exists':
      return fieldValue !== undefined && fieldValue !== null;
      
    case 'not_exists':
      return fieldValue === undefined || fieldValue === null;
      
    case 'date_after':
      const afterDate = new Date(rule.value);
      const fieldDate = fieldValue?.toDate ? fieldValue.toDate() : new Date(fieldValue);
      return fieldDate > afterDate;
      
    case 'date_before':
      const beforeDate = new Date(rule.value);
      const fieldDateBefore = fieldValue?.toDate ? fieldValue.toDate() : new Date(fieldValue);
      return fieldDateBefore < beforeDate;
      
    case 'date_between':
      if (!Array.isArray(rule.value) || rule.value.length !== 2) return false;
      const startDate = new Date(rule.value[0]);
      const endDate = new Date(rule.value[1]);
      const betweenDate = fieldValue?.toDate ? fieldValue.toDate() : new Date(fieldValue);
      return betweenDate >= startDate && betweenDate <= endDate;
      
    default:
      return false;
  }
}

function getFieldValue(investor: InvestorContact, fieldPath: string): any {
  const keys = fieldPath.split('.');
  let value: any = investor;
  
  for (const key of keys) {
    if (value && typeof value === 'object') {
      value = value[key];
    } else {
      return undefined;
    }
  }
  
  return value;
}

// Segment Members Management
async function updateSegmentMembers(segmentId: string, investorIds: string[]): Promise<void> {
  try {
    // Get current members
    const currentMembersQuery = query(
      collection(db, SEGMENT_MEMBERS_COLLECTION),
      where('segmentId', '==', segmentId),
      where('isActive', '==', true)
    );
    const currentMembersSnapshot = await getDocs(currentMembersQuery);
    const currentMemberIds = currentMembersSnapshot.docs.map(doc => doc.data().investorId);
    
    // Find new members to add
    const newMemberIds = investorIds.filter(id => !currentMemberIds.includes(id));
    
    // Find members to remove
    const removedMemberIds = currentMemberIds.filter(id => !investorIds.includes(id));
    
    // Add new members
    const addPromises = newMemberIds.map(investorId =>
      addDoc(collection(db, SEGMENT_MEMBERS_COLLECTION), {
        segmentId,
        investorId,
        addedAt: Timestamp.now(),
        isActive: true
      })
    );
    
    // Remove old members (mark as inactive)
    const removePromises = currentMembersSnapshot.docs
      .filter(doc => removedMemberIds.includes(doc.data().investorId))
      .map(doc => updateDoc(doc.ref, {
        isActive: false,
        removedAt: Timestamp.now()
      }));
    
    await Promise.all([...addPromises, ...removePromises]);
    
    console.log(`Updated segment members: +${newMemberIds.length}, -${removedMemberIds.length}`);
  } catch (error) {
    console.error('Error updating segment members:', error);
    throw error;
  }
}

export async function getSegmentMembers(segmentId: string, activeOnly: boolean = true): Promise<SegmentMember[]> {
  try {
    let q = query(
      collection(db, SEGMENT_MEMBERS_COLLECTION),
      where('segmentId', '==', segmentId)
    );
    
    if (activeOnly) {
      q = query(q, where('isActive', '==', true));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as SegmentMember);
  } catch (error) {
    console.error('Error getting segment members:', error);
    return [];
  }
}

export async function getSegmentInvestors(segmentId: string): Promise<InvestorContact[]> {
  try {
    const members = await getSegmentMembers(segmentId);
    const investorIds = members.map(member => member.investorId);
    
    if (investorIds.length === 0) {
      return [];
    }
    
    // Get investors in batches due to Firestore's 'in' query limit of 10
    const batchSize = 10;
    const investors: InvestorContact[] = [];
    
    for (let i = 0; i < investorIds.length; i += batchSize) {
      const batchIds = investorIds.slice(i, i + batchSize);
      const allInvestors = await getAllInvestors();
      const batchInvestors = allInvestors.filter(inv => batchIds.includes(inv.id!));
      investors.push(...batchInvestors);
    }
    
    return investors;
  } catch (error) {
    console.error('Error getting segment investors:', error);
    return [];
  }
}

// Bulk Segment Operations
export async function recalculateAllDynamicSegments(): Promise<void> {
  try {
    const segments = await getAllSegments(true);
    const dynamicSegments = segments.filter(segment => segment.isDynamic);
    
    console.log(`Recalculating ${dynamicSegments.length} dynamic segments...`);
    
    // Process in batches to avoid overwhelming the system
    const batchSize = 5;
    for (let i = 0; i < dynamicSegments.length; i += batchSize) {
      const batch = dynamicSegments.slice(i, i + batchSize);
      await Promise.all(batch.map(segment => recalculateSegment(segment.id)));
    }
    
    console.log('Completed recalculating all dynamic segments');
  } catch (error) {
    console.error('Error recalculating dynamic segments:', error);
    throw error;
  }
}

// Pre-built Segment Templates
export const SEGMENT_TEMPLATES = {
  HIGH_VALUE_INVESTORS: {
    name: 'High-Value Investors',
    description: 'Investors who have shown strong engagement and investment potential',
    conditions: [{
      id: 'hv_condition_1',
      logic: 'AND' as const,
      rules: [
        {
          id: 'hv_rule_1',
          field: 'tags',
          operator: 'contains' as const,
          value: 'high-net-worth',
          type: 'array' as const
        },
        {
          id: 'hv_rule_2',
          field: 'status',
          operator: 'equals' as const,
          value: 'active',
          type: 'string' as const
        }
      ]
    }],
    conditionLogic: 'AND' as const,
    isActive: true,
    isDynamic: true,
    usedInCampaigns: [],
    usedInSequences: []
  },
  
  NEW_SUBSCRIBERS: {
    name: 'New Subscribers',
    description: 'Recently subscribed investors (last 30 days)',
    conditions: [{
      id: 'ns_condition_1',
      logic: 'AND' as const,
      rules: [
        {
          id: 'ns_rule_1',
          field: 'createdAt',
          operator: 'date_after' as const,
          value: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          type: 'date' as const
        },
        {
          id: 'ns_rule_2',
          field: 'subscribed',
          operator: 'equals' as const,
          value: true,
          type: 'boolean' as const
        }
      ]
    }],
    conditionLogic: 'AND' as const,
    isActive: true,
    isDynamic: true,
    usedInCampaigns: [],
    usedInSequences: []
  },
  
  ENGAGED_BUT_NO_CONVERSION: {
    name: 'Engaged But No Conversion',
    description: 'Investors with high engagement but no conversions yet',
    conditions: [{
      id: 'ebnc_condition_1',
      logic: 'AND' as const,
      rules: [
        {
          id: 'ebnc_rule_1',
          field: 'emailsSent',
          operator: 'greater_than' as const,
          value: 5,
          type: 'number' as const
        },
        {
          id: 'ebnc_rule_2',
          field: 'tags',
          operator: 'not_contains' as const,
          value: 'converted',
          type: 'array' as const
        },
        {
          id: 'ebnc_rule_3',
          field: 'status',
          operator: 'in' as const,
          value: ['active', 'interested'],
          type: 'string' as const
        }
      ]
    }],
    conditionLogic: 'AND' as const,
    isActive: true,
    isDynamic: true,
    usedInCampaigns: [],
    usedInSequences: []
  },
  
  PROPERTY_SPECIFIC_INTEREST: {
    name: 'Palazzo Palmariggi Interest',
    description: 'Investors who have shown interest in Palazzo Palmariggi',
    conditions: [{
      id: 'psi_condition_1',
      logic: 'OR' as const,
      rules: [
        {
          id: 'psi_rule_1',
          field: 'tags',
          operator: 'contains' as const,
          value: 'palazzo-palmariggi',
          type: 'array' as const
        },
        {
          id: 'psi_rule_2',
          field: 'tags',
          operator: 'contains' as const,
          value: 'luxury-properties',
          type: 'array' as const
        },
        {
          id: 'psi_rule_3',
          field: 'tags',
          operator: 'contains' as const,
          value: 'heritage-properties',
          type: 'array' as const
        }
      ]
    }],
    conditionLogic: 'AND' as const,
    isActive: true,
    isDynamic: true,
    usedInCampaigns: [],
    usedInSequences: []
  },
  
  PIA_GRANT_INTERESTED: {
    name: 'PIA Grant Interested',
    description: 'Investors specifically interested in PIA grant opportunities',
    conditions: [{
      id: 'pgi_condition_1',
      logic: 'OR' as const,
      rules: [
        {
          id: 'pgi_rule_1',
          field: 'tags',
          operator: 'contains' as const,
          value: 'pia-grants',
          type: 'array' as const
        },
        {
          id: 'pgi_rule_2',
          field: 'tags',
          operator: 'contains' as const,
          value: 'government-incentives',
          type: 'array' as const
        },
        {
          id: 'pgi_rule_3',
          field: 'source',
          operator: 'contains' as const,
          value: 'pia-calculator',
          type: 'string' as const
        }
      ]
    }],
    conditionLogic: 'AND' as const,
    isActive: true,
    isDynamic: true,
    usedInCampaigns: [],
    usedInSequences: []
  },
  
  AT_RISK_SUBSCRIBERS: {
    name: 'At-Risk Subscribers',
    description: 'Subscribers who haven\'t engaged recently and might unsubscribe',
    conditions: [{
      id: 'ars_condition_1',
      logic: 'AND' as const,
      rules: [
        {
          id: 'ars_rule_1',
          field: 'lastEmailSent',
          operator: 'date_before' as const,
          value: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
          type: 'date' as const
        },
        {
          id: 'ars_rule_2',
          field: 'emailsSent',
          operator: 'greater_than' as const,
          value: 3,
          type: 'number' as const
        },
        {
          id: 'ars_rule_3',
          field: 'subscribed',
          operator: 'equals' as const,
          value: true,
          type: 'boolean' as const
        }
      ]
    }],
    conditionLogic: 'AND' as const,
    isActive: true,
    isDynamic: true,
    usedInCampaigns: [],
    usedInSequences: []
  }
};

// Helper functions for easy segment creation
export async function createSegmentFromTemplate(templateKey: keyof typeof SEGMENT_TEMPLATES): Promise<string> {
  const template = SEGMENT_TEMPLATES[templateKey];
  return await createSegment(template);
}

export async function getInvestorSegments(investorId: string): Promise<UserSegment[]> {
  try {
    const membersQuery = query(
      collection(db, SEGMENT_MEMBERS_COLLECTION),
      where('investorId', '==', investorId),
      where('isActive', '==', true)
    );
    
    const membersSnapshot = await getDocs(membersQuery);
    const segmentIds = membersSnapshot.docs.map(doc => doc.data().segmentId);
    
    if (segmentIds.length === 0) {
      return [];
    }
    
    // Get segments in batches
    const batchSize = 10;
    const segments: UserSegment[] = [];
    
    for (let i = 0; i < segmentIds.length; i += batchSize) {
      const batchIds = segmentIds.slice(i, i + batchSize);
      const allSegments = await getAllSegments();
      const batchSegments = allSegments.filter(seg => batchIds.includes(seg.id));
      segments.push(...batchSegments);
    }
    
    return segments;
  } catch (error) {
    console.error('Error getting investor segments:', error);
    return [];
  }
}

export async function addInvestorToSegment(investorId: string, segmentId: string): Promise<void> {
  try {
    // Check if already a member
    const existingMember = query(
      collection(db, SEGMENT_MEMBERS_COLLECTION),
      where('segmentId', '==', segmentId),
      where('investorId', '==', investorId),
      where('isActive', '==', true)
    );
    
    const existingSnapshot = await getDocs(existingMember);
    if (!existingSnapshot.empty) {
      return; // Already a member
    }
    
    await addDoc(collection(db, SEGMENT_MEMBERS_COLLECTION), {
      segmentId,
      investorId,
      addedAt: Timestamp.now(),
      isActive: true
    });
    
    console.log(`Added investor ${investorId} to segment ${segmentId}`);
  } catch (error) {
    console.error('Error adding investor to segment:', error);
    throw error;
  }
}

export async function removeInvestorFromSegment(investorId: string, segmentId: string): Promise<void> {
  try {
    const memberQuery = query(
      collection(db, SEGMENT_MEMBERS_COLLECTION),
      where('segmentId', '==', segmentId),
      where('investorId', '==', investorId),
      where('isActive', '==', true)
    );
    
    const memberSnapshot = await getDocs(memberQuery);
    
    const updatePromises = memberSnapshot.docs.map(doc => 
      updateDoc(doc.ref, {
        isActive: false,
        removedAt: Timestamp.now()
      })
    );
    
    await Promise.all(updatePromises);
    
    console.log(`Removed investor ${investorId} from segment ${segmentId}`);
  } catch (error) {
    console.error('Error removing investor from segment:', error);
    throw error;
  }
}