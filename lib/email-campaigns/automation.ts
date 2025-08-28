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
  addDoc,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { InvestorContact, getAllInvestors, getSubscribedInvestors, recordEmailSent, addTagToInvestor } from '@/lib/firebase-mailing-list';

export interface EmailSequenceStep {
  id: string;
  name: string;
  templateId: string;
  delayDays: number;
  delayHours?: number;
  conditions?: {
    tags?: string[];
    status?: string[];
    openedPrevious?: boolean;
    clickedPrevious?: boolean;
  };
  actions?: {
    addTags?: string[];
    removeTags?: string[];
    updateStatus?: string;
  };
}

export interface EmailSequence {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'paused' | 'archived';
  trigger: {
    type: 'manual' | 'tag_added' | 'status_change' | 'form_submission' | 'date_based';
    value?: string;
    conditions?: any;
  };
  steps: EmailSequenceStep[];
  segmentRules?: {
    includeSegments?: string[];
    excludeSegments?: string[];
    customRules?: any[];
  };
  settings: {
    respectUnsubscribe: boolean;
    respectGlobalOptOut: boolean;
    sendTimeWindow?: {
      start: string; // HH:mm format
      end: string;   // HH:mm format
      timezone: string;
    };
    daysOfWeek?: number[]; // 0-6, Sunday = 0
  };
  analytics: {
    totalEnrolled: number;
    totalCompleted: number;
    totalOptedOut: number;
    averageCompletionTime: number; // in days
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface SequenceEnrollment {
  id: string;
  sequenceId: string;
  investorId: string;
  currentStepIndex: number;
  nextActionAt: Timestamp;
  status: 'active' | 'completed' | 'paused' | 'opted_out';
  startedAt: Timestamp;
  completedAt?: Timestamp;
  stepHistory: {
    stepId: string;
    executedAt: Timestamp;
    emailSent: boolean;
    opened?: boolean;
    clicked?: boolean;
  }[];
}

const SEQUENCES_COLLECTION = 'email_sequences';
const ENROLLMENTS_COLLECTION = 'sequence_enrollments';

// Sequence Management
export async function createEmailSequence(sequence: Omit<EmailSequence, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, SEQUENCES_COLLECTION), {
      ...sequence,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    console.log('Created email sequence:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error creating email sequence:', error);
    throw error;
  }
}

export async function getEmailSequence(sequenceId: string): Promise<EmailSequence | null> {
  try {
    const docRef = doc(db, SEQUENCES_COLLECTION, sequenceId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as EmailSequence;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting email sequence:', error);
    return null;
  }
}

export async function getAllEmailSequences(status?: EmailSequence['status']): Promise<EmailSequence[]> {
  try {
    let q = query(collection(db, SEQUENCES_COLLECTION), orderBy('createdAt', 'desc'));
    
    if (status) {
      q = query(q, where('status', '==', status));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as EmailSequence));
  } catch (error) {
    console.error('Error getting email sequences:', error);
    return [];
  }
}

export async function updateEmailSequence(sequenceId: string, updates: Partial<EmailSequence>): Promise<void> {
  try {
    const docRef = doc(db, SEQUENCES_COLLECTION, sequenceId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    
    console.log('Updated email sequence:', sequenceId);
  } catch (error) {
    console.error('Error updating email sequence:', error);
    throw error;
  }
}

export async function deleteEmailSequence(sequenceId: string): Promise<void> {
  try {
    // First, remove all enrollments for this sequence
    const enrollmentsQuery = query(
      collection(db, ENROLLMENTS_COLLECTION),
      where('sequenceId', '==', sequenceId)
    );
    const enrollments = await getDocs(enrollmentsQuery);
    
    const deletePromises = enrollments.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    
    // Then delete the sequence
    await deleteDoc(doc(db, SEQUENCES_COLLECTION, sequenceId));
    
    console.log('Deleted email sequence and enrollments:', sequenceId);
  } catch (error) {
    console.error('Error deleting email sequence:', error);
    throw error;
  }
}

// Enrollment Management
export async function enrollInvestorInSequence(
  investorId: string, 
  sequenceId: string,
  startFromStep: number = 0
): Promise<string> {
  try {
    // Check if investor is already enrolled
    const existingEnrollment = await getInvestorSequenceEnrollment(investorId, sequenceId);
    if (existingEnrollment && existingEnrollment.status === 'active') {
      console.log('Investor already enrolled in sequence');
      return existingEnrollment.id;
    }
    
    const sequence = await getEmailSequence(sequenceId);
    if (!sequence || sequence.status !== 'active') {
      throw new Error('Sequence not found or not active');
    }
    
    const nextStep = sequence.steps[startFromStep];
    if (!nextStep) {
      throw new Error('Invalid starting step');
    }
    
    const nextActionAt = Timestamp.fromDate(
      new Date(Date.now() + (nextStep.delayDays * 24 * 60 * 60 * 1000) + ((nextStep.delayHours || 0) * 60 * 60 * 1000))
    );
    
    const enrollment: Omit<SequenceEnrollment, 'id'> = {
      sequenceId,
      investorId,
      currentStepIndex: startFromStep,
      nextActionAt,
      status: 'active',
      startedAt: Timestamp.now(),
      stepHistory: []
    };
    
    const docRef = await addDoc(collection(db, ENROLLMENTS_COLLECTION), enrollment);
    
    // Update sequence analytics
    await updateDoc(doc(db, SEQUENCES_COLLECTION, sequenceId), {
      'analytics.totalEnrolled': (sequence.analytics.totalEnrolled || 0) + 1,
      updatedAt: serverTimestamp()
    });
    
    console.log('Enrolled investor in sequence:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error enrolling investor in sequence:', error);
    throw error;
  }
}

export async function getInvestorSequenceEnrollment(
  investorId: string, 
  sequenceId: string
): Promise<SequenceEnrollment | null> {
  try {
    const q = query(
      collection(db, ENROLLMENTS_COLLECTION),
      where('investorId', '==', investorId),
      where('sequenceId', '==', sequenceId),
      where('status', 'in', ['active', 'paused'])
    );
    
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      } as SequenceEnrollment;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting investor sequence enrollment:', error);
    return null;
  }
}

export async function updateSequenceEnrollment(
  enrollmentId: string, 
  updates: Partial<SequenceEnrollment>
): Promise<void> {
  try {
    const docRef = doc(db, ENROLLMENTS_COLLECTION, enrollmentId);
    await updateDoc(docRef, updates);
    
    console.log('Updated sequence enrollment:', enrollmentId);
  } catch (error) {
    console.error('Error updating sequence enrollment:', error);
    throw error;
  }
}

export async function removeInvestorFromSequence(
  investorId: string, 
  sequenceId: string,
  reason: 'opted_out' | 'completed' | 'manual' = 'manual'
): Promise<void> {
  try {
    const enrollment = await getInvestorSequenceEnrollment(investorId, sequenceId);
    if (!enrollment) {
      return;
    }
    
    await updateSequenceEnrollment(enrollment.id, {
      status: reason === 'manual' ? 'opted_out' : reason,
      completedAt: reason === 'completed' ? Timestamp.now() : undefined
    });
    
    // Update sequence analytics
    const sequence = await getEmailSequence(sequenceId);
    if (sequence) {
      const updates: any = {
        updatedAt: serverTimestamp()
      };
      
      if (reason === 'completed') {
        updates['analytics.totalCompleted'] = (sequence.analytics.totalCompleted || 0) + 1;
      } else if (reason === 'opted_out') {
        updates['analytics.totalOptedOut'] = (sequence.analytics.totalOptedOut || 0) + 1;
      }
      
      await updateDoc(doc(db, SEQUENCES_COLLECTION, sequenceId), updates);
    }
    
    console.log(`Removed investor from sequence: ${reason}`);
  } catch (error) {
    console.error('Error removing investor from sequence:', error);
    throw error;
  }
}

// Sequence Execution
export async function processSequenceActions(): Promise<void> {
  try {
    console.log('Processing sequence actions...');
    
    const now = Timestamp.now();
    const q = query(
      collection(db, ENROLLMENTS_COLLECTION),
      where('status', '==', 'active'),
      where('nextActionAt', '<=', now)
    );
    
    const enrollmentsSnapshot = await getDocs(q);
    
    for (const enrollmentDoc of enrollmentsSnapshot.docs) {
      const enrollment = {
        id: enrollmentDoc.id,
        ...enrollmentDoc.data()
      } as SequenceEnrollment;
      
      await executeSequenceStep(enrollment);
    }
    
    console.log(`Processed ${enrollmentsSnapshot.docs.length} sequence actions`);
  } catch (error) {
    console.error('Error processing sequence actions:', error);
    throw error;
  }
}

async function executeSequenceStep(enrollment: SequenceEnrollment): Promise<void> {
  try {
    const sequence = await getEmailSequence(enrollment.sequenceId);
    if (!sequence || sequence.status !== 'active') {
      return;
    }
    
    const currentStep = sequence.steps[enrollment.currentStepIndex];
    if (!currentStep) {
      // Sequence completed
      await removeInvestorFromSequence(enrollment.investorId, enrollment.sequenceId, 'completed');
      return;
    }
    
    // Check if we should skip this step based on conditions
    if (currentStep.conditions) {
      const shouldSkip = await evaluateStepConditions(enrollment, currentStep.conditions);
      if (shouldSkip) {
        await moveToNextStep(enrollment, sequence);
        return;
      }
    }
    
    // Check send time window
    if (sequence.settings.sendTimeWindow) {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentTime = currentHour * 60 + currentMinutes;
      
      const [startHour, startMin] = sequence.settings.sendTimeWindow.start.split(':').map(Number);
      const [endHour, endMin] = sequence.settings.sendTimeWindow.end.split(':').map(Number);
      const startTime = startHour * 60 + startMin;
      const endTime = endHour * 60 + endMin;
      
      if (currentTime < startTime || currentTime > endTime) {
        // Reschedule for next send window
        const nextSendTime = new Date();
        nextSendTime.setHours(startHour, startMin, 0, 0);
        if (nextSendTime <= now) {
          nextSendTime.setDate(nextSendTime.getDate() + 1);
        }
        
        await updateSequenceEnrollment(enrollment.id, {
          nextActionAt: Timestamp.fromDate(nextSendTime)
        });
        return;
      }
    }
    
    // Check days of week restriction
    if (sequence.settings.daysOfWeek && sequence.settings.daysOfWeek.length > 0) {
      const today = new Date().getDay();
      if (!sequence.settings.daysOfWeek.includes(today)) {
        // Reschedule for next allowed day
        const nextAllowedDay = getNextAllowedDay(today, sequence.settings.daysOfWeek);
        const nextSendTime = new Date();
        nextSendTime.setDate(nextSendTime.getDate() + nextAllowedDay);
        
        await updateSequenceEnrollment(enrollment.id, {
          nextActionAt: Timestamp.fromDate(nextSendTime)
        });
        return;
      }
    }
    
    // Execute the step
    let emailSent = false;
    try {
      // Here you would integrate with your email sending service
      // For now, we'll simulate sending
      await sendSequenceEmail(enrollment.investorId, currentStep.templateId);
      emailSent = true;
      
      // Record email sent
      await recordEmailSent(enrollment.investorId);
    } catch (emailError) {
      console.error('Error sending sequence email:', emailError);
    }
    
    // Execute step actions
    if (currentStep.actions) {
      await executeStepActions(enrollment.investorId, currentStep.actions);
    }
    
    // Record step execution
    const stepHistory = [...enrollment.stepHistory, {
      stepId: currentStep.id,
      executedAt: Timestamp.now(),
      emailSent
    }];
    
    await updateSequenceEnrollment(enrollment.id, {
      stepHistory
    });
    
    // Move to next step
    await moveToNextStep(enrollment, sequence);
    
  } catch (error) {
    console.error('Error executing sequence step:', error);
  }
}

async function moveToNextStep(enrollment: SequenceEnrollment, sequence: EmailSequence): Promise<void> {
  const nextStepIndex = enrollment.currentStepIndex + 1;
  const nextStep = sequence.steps[nextStepIndex];
  
  if (!nextStep) {
    // Sequence completed
    await removeInvestorFromSequence(enrollment.investorId, enrollment.sequenceId, 'completed');
    return;
  }
  
  const nextActionAt = Timestamp.fromDate(
    new Date(Date.now() + (nextStep.delayDays * 24 * 60 * 60 * 1000) + ((nextStep.delayHours || 0) * 60 * 60 * 1000))
  );
  
  await updateSequenceEnrollment(enrollment.id, {
    currentStepIndex: nextStepIndex,
    nextActionAt
  });
}

async function evaluateStepConditions(
  enrollment: SequenceEnrollment, 
  conditions: EmailSequenceStep['conditions']
): Promise<boolean> {
  // This would contain logic to evaluate conditions
  // For now, return false (don't skip)
  return false;
}

async function executeStepActions(
  investorId: string, 
  actions: EmailSequenceStep['actions']
): Promise<void> {
  if (actions?.addTags) {
    for (const tag of actions.addTags) {
      await addTagToInvestor(investorId, tag);
    }
  }
  
  // Add more action types as needed
}

async function sendSequenceEmail(investorId: string, templateId: string): Promise<void> {
  // This would integrate with your email sending service
  // For now, we'll just simulate
  console.log(`Sending email to investor ${investorId} using template ${templateId}`);
  
  // You would implement actual email sending here
  // Example: await emailService.send({ to: investor.email, templateId });
}

function getNextAllowedDay(currentDay: number, allowedDays: number[]): number {
  const sortedDays = [...allowedDays].sort((a, b) => a - b);
  
  for (const day of sortedDays) {
    if (day > currentDay) {
      return day - currentDay;
    }
  }
  
  // Next allowed day is next week
  return (7 - currentDay) + sortedDays[0];
}

// Bulk Operations
export async function bulkEnrollInSequence(
  investorIds: string[], 
  sequenceId: string
): Promise<{ success: number; failed: number; errors: string[] }> {
  const results = { success: 0, failed: 0, errors: [] as string[] };
  
  for (const investorId of investorIds) {
    try {
      await enrollInvestorInSequence(investorId, sequenceId);
      results.success++;
    } catch (error) {
      results.failed++;
      results.errors.push(`Failed to enroll ${investorId}: ${error}`);
    }
  }
  
  return results;
}

export async function bulkEnrollBySegment(
  sequenceId: string,
  segmentRules: {
    includeSegments?: string[];
    excludeSegments?: string[];
    customRules?: any[];
  }
): Promise<{ success: number; failed: number; errors: string[] }> {
  try {
    const investors = await getSubscribedInvestors();
    const filteredInvestors = investors.filter(investor => {
      // Apply segment filtering logic
      if (segmentRules.includeSegments) {
        const hasIncludedTag = segmentRules.includeSegments.some(tag => 
          investor.tags.includes(tag)
        );
        if (!hasIncludedTag) return false;
      }
      
      if (segmentRules.excludeSegments) {
        const hasExcludedTag = segmentRules.excludeSegments.some(tag => 
          investor.tags.includes(tag)
        );
        if (hasExcludedTag) return false;
      }
      
      return true;
    });
    
    const investorIds = filteredInvestors.map(investor => investor.id!);
    return await bulkEnrollInSequence(investorIds, sequenceId);
  } catch (error) {
    console.error('Error bulk enrolling by segment:', error);
    return { success: 0, failed: 0, errors: [error.toString()] };
  }
}

// Pre-built Sequences
export const SEQUENCE_TEMPLATES = {
  WELCOME_SERIES: {
    name: 'Property Investment Welcome Series',
    description: 'Nurture new subscribers with educational content about Puglia property investment',
    steps: [
      {
        name: 'Welcome & Introduction',
        delayDays: 0,
        templateId: 'welcome_intro'
      },
      {
        name: 'Why Puglia Properties',
        delayDays: 2,
        templateId: 'why_puglia'
      },
      {
        name: 'PIA Grant Guide',
        delayDays: 5,
        templateId: 'pia_grant_guide'
      },
      {
        name: 'Success Stories',
        delayDays: 8,
        templateId: 'success_stories'
      },
      {
        name: 'Book Consultation',
        delayDays: 12,
        templateId: 'book_consultation'
      }
    ]
  },
  
  ABANDONED_CONSULTATION: {
    name: 'Abandoned Consultation Recovery',
    description: 'Re-engage users who started but didn\'t complete consultation booking',
    steps: [
      {
        name: 'Reminder - Complete Booking',
        delayDays: 1,
        templateId: 'booking_reminder_1'
      },
      {
        name: 'Alternative Contact Methods',
        delayDays: 3,
        templateId: 'alternative_contact'
      },
      {
        name: 'Limited Time Incentive',
        delayDays: 7,
        templateId: 'booking_incentive'
      }
    ]
  },
  
  POST_CONSULTATION: {
    name: 'Post-Consultation Follow-up',
    description: 'Follow up after consultation to move prospects to investment',
    steps: [
      {
        name: 'Thank You & Next Steps',
        delayDays: 0,
        templateId: 'consultation_thanks'
      },
      {
        name: 'Investment Proposal',
        delayDays: 2,
        templateId: 'investment_proposal'
      },
      {
        name: 'Address Concerns',
        delayDays: 5,
        templateId: 'address_concerns'
      },
      {
        name: 'Final Offer',
        delayDays: 10,
        templateId: 'final_offer'
      }
    ]
  }
};