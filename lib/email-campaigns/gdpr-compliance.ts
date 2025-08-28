import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  Timestamp,
  addDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { unsubscribeInvestor, updateInvestorContact } from '@/lib/firebase-mailing-list';

export interface ConsentRecord {
  id: string;
  investorId: string;
  email: string;
  consentType: 'marketing' | 'transactional' | 'newsletter' | 'promotional';
  consentGiven: boolean;
  consentDate: Timestamp;
  consentMethod: 'explicit_opt_in' | 'implied_consent' | 'legitimate_interest' | 'withdrawn';
  consentSource: string; // e.g., 'website_signup', 'consultation_form', 'manual_import'
  ipAddress?: string;
  userAgent?: string;
  doubleOptInConfirmed?: boolean;
  doubleOptInDate?: Timestamp;
  withdrawnDate?: Timestamp;
  withdrawnReason?: string;
  legalBasis: 'consent' | 'legitimate_interest' | 'contract' | 'legal_obligation';
  dataProcessingPurposes: string[];
  retentionPeriod: number; // months
  metadata?: {
    campaignId?: string;
    formId?: string;
    notes?: string;
  };
}

export interface DataSubjectRequest {
  id: string;
  email: string;
  investorId?: string;
  requestType: 'access' | 'rectification' | 'erasure' | 'portability' | 'restriction' | 'objection';
  requestDate: Timestamp;
  requestSource: 'email' | 'website' | 'phone' | 'mail';
  status: 'received' | 'verified' | 'processing' | 'completed' | 'rejected';
  verificationMethod?: 'email_confirmation' | 'identity_documents' | 'security_questions';
  verifiedDate?: Timestamp;
  completedDate?: Timestamp;
  responseMethod: 'email' | 'secure_portal' | 'mail';
  processingNotes?: string;
  dataExported?: boolean;
  dataDeleted?: boolean;
  rejectionReason?: string;
  
  // Required response timeframes
  acknowledgeByDate: Timestamp; // 72 hours
  respondByDate: Timestamp; // 30 days
  
  assignedTo?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface UnsubscribeRecord {
  id: string;
  email: string;
  investorId?: string;
  unsubscribeDate: Timestamp;
  unsubscribeMethod: 'email_link' | 'preference_center' | 'reply' | 'complaint' | 'manual';
  unsubscribeScope: 'all_marketing' | 'specific_campaign' | 'specific_category' | 'frequency_only';
  campaignId?: string;
  categories?: string[];
  reason?: 'too_frequent' | 'not_relevant' | 'privacy_concerns' | 'changed_email' | 'other';
  feedback?: string;
  ipAddress?: string;
  userAgent?: string;
  resubscribeToken?: string; // For easy resubscribe if desired
  
  // GDPR right to withdraw consent
  isGdprWithdrawal: boolean;
  withdrawalAcknowledged: boolean;
  withdrawalAcknowledgedDate?: Timestamp;
}

export interface EmailPreferenceCenter {
  investorId: string;
  email: string;
  preferences: {
    marketingEmails: boolean;
    newsletters: boolean;
    propertyAlerts: boolean;
    eventInvitations: boolean;
    marketReports: boolean;
    promotionalOffers: boolean;
  };
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  interests: string[]; // e.g., ['luxury-properties', 'pia-grants', 'investment-tips']
  preferredLanguage: 'en' | 'it' | 'de' | 'fr';
  lastUpdated: Timestamp;
  updateToken: string; // Secure token for accessing preference center
}

const CONSENT_COLLECTION = 'consent_records';
const DATA_REQUESTS_COLLECTION = 'data_subject_requests';
const UNSUBSCRIBE_COLLECTION = 'unsubscribe_records';
const PREFERENCES_COLLECTION = 'email_preferences';

// Consent Management
export async function recordConsent(
  investorId: string,
  email: string,
  consentDetails: {
    consentType: ConsentRecord['consentType'];
    consentMethod: ConsentRecord['consentMethod'];
    consentSource: string;
    legalBasis: ConsentRecord['legalBasis'];
    dataProcessingPurposes: string[];
    retentionPeriod: number;
    ipAddress?: string;
    userAgent?: string;
    metadata?: ConsentRecord['metadata'];
  }
): Promise<string> {
  try {
    const consentRecord: Omit<ConsentRecord, 'id'> = {
      investorId,
      email,
      consentGiven: true,
      consentDate: Timestamp.now(),
      doubleOptInConfirmed: false,
      ...consentDetails
    };
    
    const docRef = await addDoc(collection(db, CONSENT_COLLECTION), consentRecord);
    
    console.log('Recorded consent:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error recording consent:', error);
    throw error;
  }
}

export async function sendDoubleOptInEmail(
  investorId: string,
  email: string,
  confirmationToken: string
): Promise<void> {
  // This would integrate with your email service to send double opt-in confirmation
  console.log(`Sending double opt-in email to ${email} with token ${confirmationToken}`);
  
  // Mock implementation - in production, you'd send actual email
  const confirmationUrl = `https://investinpuglia.com/confirm-subscription?token=${confirmationToken}`;
  
  // Email template for double opt-in would go here
}

export async function confirmDoubleOptIn(confirmationToken: string): Promise<boolean> {
  try {
    // Find consent record by confirmation token (would need to store token in consent record)
    // For now, we'll simulate this
    
    // In production, you'd:
    // 1. Find the consent record by token
    // 2. Update doubleOptInConfirmed to true
    // 3. Set doubleOptInDate
    // 4. Activate the subscriber
    
    console.log(`Double opt-in confirmed for token: ${confirmationToken}`);
    return true;
  } catch (error) {
    console.error('Error confirming double opt-in:', error);
    return false;
  }
}

export async function withdrawConsent(
  investorId: string,
  consentType: ConsentRecord['consentType'],
  withdrawnReason?: string
): Promise<void> {
  try {
    // Find active consent records for this investor and type
    const consentQuery = query(
      collection(db, CONSENT_COLLECTION),
      where('investorId', '==', investorId),
      where('consentType', '==', consentType),
      where('consentGiven', '==', true)
    );
    
    const consentSnapshot = await getDocs(consentQuery);
    
    // Update all matching consent records
    const updatePromises = consentSnapshot.docs.map(doc =>
      updateDoc(doc.ref, {
        consentGiven: false,
        consentMethod: 'withdrawn',
        withdrawnDate: Timestamp.now(),
        withdrawnReason
      })
    );
    
    await Promise.all(updatePromises);
    
    // If withdrawing marketing consent, unsubscribe from marketing emails
    if (consentType === 'marketing') {
      const consentData = consentSnapshot.docs[0]?.data();
      if (consentData?.email) {
        await unsubscribeInvestor(consentData.email);
      }
    }
    
    console.log(`Withdrew consent for investor ${investorId}, type: ${consentType}`);
  } catch (error) {
    console.error('Error withdrawing consent:', error);
    throw error;
  }
}

export async function getConsentHistory(investorId: string): Promise<ConsentRecord[]> {
  try {
    const q = query(
      collection(db, CONSENT_COLLECTION),
      where('investorId', '==', investorId),
      orderBy('consentDate', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ConsentRecord));
  } catch (error) {
    console.error('Error getting consent history:', error);
    return [];
  }
}

// Unsubscribe Management
export async function processUnsubscribe(
  email: string,
  unsubscribeDetails: {
    method: UnsubscribeRecord['unsubscribeMethod'];
    scope: UnsubscribeRecord['unsubscribeScope'];
    campaignId?: string;
    categories?: string[];
    reason?: UnsubscribeRecord['reason'];
    feedback?: string;
    ipAddress?: string;
    userAgent?: string;
    isGdprWithdrawal?: boolean;
  }
): Promise<string> {
  try {
    // Create unsubscribe record
    const unsubscribeRecord: Omit<UnsubscribeRecord, 'id'> = {
      email,
      unsubscribeDate: Timestamp.now(),
      isGdprWithdrawal: unsubscribeDetails.isGdprWithdrawal || false,
      withdrawalAcknowledged: false,
      resubscribeToken: generateSecureToken(),
      ...unsubscribeDetails
    };
    
    const docRef = await addDoc(collection(db, UNSUBSCRIBE_COLLECTION), unsubscribeRecord);
    
    // Process the unsubscribe based on scope
    if (unsubscribeDetails.scope === 'all_marketing') {
      await unsubscribeInvestor(email);
      
      // If GDPR withdrawal, also withdraw consent
      if (unsubscribeDetails.isGdprWithdrawal) {
        // Find investor ID from email and withdraw marketing consent
        const investors = await getDocs(query(
          collection(db, 'investor_mailing_list'),
          where('email', '==', email.toLowerCase())
        ));
        
        if (!investors.empty) {
          const investorId = investors.docs[0].id;
          await withdrawConsent(investorId, 'marketing', 'Unsubscribed via email link');
        }
      }
    }
    
    // Send unsubscribe confirmation if required by GDPR
    if (unsubscribeDetails.isGdprWithdrawal) {
      await sendGdprWithdrawalConfirmation(email, docRef.id);
    }
    
    console.log('Processed unsubscribe:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error processing unsubscribe:', error);
    throw error;
  }
}

export async function createUnsubscribeLink(
  email: string,
  campaignId?: string,
  categories?: string[]
): Promise<string> {
  const token = generateSecureToken();
  const params = new URLSearchParams({
    email: encodeURIComponent(email),
    token,
    ...(campaignId && { campaign: campaignId }),
    ...(categories && { categories: categories.join(',') })
  });
  
  return `https://investinpuglia.com/unsubscribe?${params.toString()}`;
}

export async function validateUnsubscribeToken(token: string, email: string): Promise<boolean> {
  // In production, you'd validate the token against a secure store
  // For now, we'll return true for any non-empty token
  return token && email ? true : false;
}

// Data Subject Requests (GDPR Article 15-22)
export async function createDataSubjectRequest(
  email: string,
  requestType: DataSubjectRequest['requestType'],
  requestSource: DataSubjectRequest['requestSource'] = 'email'
): Promise<string> {
  try {
    const now = Timestamp.now();
    const acknowledgeBy = Timestamp.fromMillis(now.toMillis() + (72 * 60 * 60 * 1000)); // 72 hours
    const respondBy = Timestamp.fromMillis(now.toMillis() + (30 * 24 * 60 * 60 * 1000)); // 30 days
    
    const request: Omit<DataSubjectRequest, 'id'> = {
      email,
      requestType,
      requestDate: now,
      requestSource,
      status: 'received',
      responseMethod: 'email',
      acknowledgeByDate: acknowledgeBy,
      respondByDate: respondBy,
      priority: requestType === 'erasure' ? 'high' : 'medium'
    };
    
    const docRef = await addDoc(collection(db, DATA_REQUESTS_COLLECTION), request);
    
    // Send acknowledgment email
    await sendRequestAcknowledgment(email, requestType, docRef.id);
    
    console.log('Created data subject request:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error creating data subject request:', error);
    throw error;
  }
}

export async function processDataAccessRequest(requestId: string): Promise<any> {
  try {
    const requestDoc = await getDoc(doc(db, DATA_REQUESTS_COLLECTION, requestId));
    if (!requestDoc.exists()) {
      throw new Error('Request not found');
    }
    
    const request = requestDoc.data() as DataSubjectRequest;
    const email = request.email;
    
    // Gather all data for this email
    const personalData = {
      basicInfo: {},
      consentRecords: [],
      emailHistory: [],
      preferences: {},
      unsubscribeHistory: []
    };
    
    // Get investor data
    const investorQuery = query(
      collection(db, 'investor_mailing_list'),
      where('email', '==', email.toLowerCase())
    );
    const investorSnapshot = await getDocs(investorQuery);
    
    if (!investorSnapshot.empty) {
      const investorData = investorSnapshot.docs[0].data();
      personalData.basicInfo = {
        email: investorData.email,
        name: investorData.name,
        status: investorData.status,
        tags: investorData.tags,
        subscribed: investorData.subscribed,
        createdAt: investorData.createdAt,
        lastEmailSent: investorData.lastEmailSent,
        emailsSent: investorData.emailsSent
      };
      
      const investorId = investorSnapshot.docs[0].id;
      
      // Get consent records
      personalData.consentRecords = await getConsentHistory(investorId);
      
      // Get email preferences
      const preferencesDoc = await getDoc(doc(db, PREFERENCES_COLLECTION, investorId));
      if (preferencesDoc.exists()) {
        personalData.preferences = preferencesDoc.data();
      }
    }
    
    // Get unsubscribe history
    const unsubscribeQuery = query(
      collection(db, UNSUBSCRIBE_COLLECTION),
      where('email', '==', email)
    );
    const unsubscribeSnapshot = await getDocs(unsubscribeQuery);
    personalData.unsubscribeHistory = unsubscribeSnapshot.docs.map(doc => doc.data());
    
    // Update request status
    await updateDoc(doc(db, DATA_REQUESTS_COLLECTION, requestId), {
      status: 'completed',
      completedDate: Timestamp.now(),
      dataExported: true
    });
    
    return personalData;
  } catch (error) {
    console.error('Error processing data access request:', error);
    throw error;
  }
}

export async function processDataErasureRequest(requestId: string): Promise<void> {
  try {
    const requestDoc = await getDoc(doc(db, DATA_REQUESTS_COLLECTION, requestId));
    if (!requestDoc.exists()) {
      throw new Error('Request not found');
    }
    
    const request = requestDoc.data() as DataSubjectRequest;
    const email = request.email;
    
    // Find and delete investor data
    const investorQuery = query(
      collection(db, 'investor_mailing_list'),
      where('email', '==', email.toLowerCase())
    );
    const investorSnapshot = await getDocs(investorQuery);
    
    if (!investorSnapshot.empty) {
      const investorId = investorSnapshot.docs[0].id;
      
      // Delete from all collections
      const deletionPromises = [
        // Delete investor record
        deleteDoc(investorSnapshot.docs[0].ref),
        
        // Delete consent records
        ...await getDocs(query(collection(db, CONSENT_COLLECTION), where('investorId', '==', investorId)))
          .then(snapshot => snapshot.docs.map(doc => deleteDoc(doc.ref))),
        
        // Delete preferences
        deleteDoc(doc(db, PREFERENCES_COLLECTION, investorId))
      ];
      
      await Promise.all(deletionPromises);
    }
    
    // Update request status
    await updateDoc(doc(db, DATA_REQUESTS_COLLECTION, requestId), {
      status: 'completed',
      completedDate: Timestamp.now(),
      dataDeleted: true
    });
    
    console.log(`Completed data erasure for ${email}`);
  } catch (error) {
    console.error('Error processing data erasure request:', error);
    throw error;
  }
}

// Email Preference Center
export async function createPreferenceCenter(
  investorId: string,
  email: string,
  initialPreferences?: Partial<EmailPreferenceCenter['preferences']>
): Promise<string> {
  try {
    const preferences: EmailPreferenceCenter = {
      investorId,
      email,
      preferences: {
        marketingEmails: true,
        newsletters: true,
        propertyAlerts: true,
        eventInvitations: true,
        marketReports: true,
        promotionalOffers: false,
        ...initialPreferences
      },
      frequency: 'weekly',
      interests: [],
      preferredLanguage: 'en',
      lastUpdated: Timestamp.now(),
      updateToken: generateSecureToken()
    };
    
    await setDoc(doc(db, PREFERENCES_COLLECTION, investorId), preferences);
    
    console.log('Created preference center for:', investorId);
    return preferences.updateToken;
  } catch (error) {
    console.error('Error creating preference center:', error);
    throw error;
  }
}

export async function updateEmailPreferences(
  investorId: string,
  updates: Partial<EmailPreferenceCenter>
): Promise<void> {
  try {
    await updateDoc(doc(db, PREFERENCES_COLLECTION, investorId), {
      ...updates,
      lastUpdated: Timestamp.now()
    });
    
    // Update main investor record if marketing preferences changed
    if (updates.preferences?.marketingEmails !== undefined) {
      await updateInvestorContact(investorId, {
        subscribed: updates.preferences.marketingEmails
      });
    }
    
    console.log('Updated email preferences for:', investorId);
  } catch (error) {
    console.error('Error updating email preferences:', error);
    throw error;
  }
}

export async function getPreferenceCenterData(token: string): Promise<EmailPreferenceCenter | null> {
  try {
    const preferencesQuery = query(
      collection(db, PREFERENCES_COLLECTION),
      where('updateToken', '==', token)
    );
    
    const preferencesSnapshot = await getDocs(preferencesQuery);
    
    if (!preferencesSnapshot.empty) {
      return preferencesSnapshot.docs[0].data() as EmailPreferenceCenter;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting preference center data:', error);
    return null;
  }
}

// Utility Functions
function generateSecureToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

async function sendRequestAcknowledgment(
  email: string,
  requestType: DataSubjectRequest['requestType'],
  requestId: string
): Promise<void> {
  console.log(`Sending ${requestType} request acknowledgment to ${email} for request ${requestId}`);
  
  // In production, you'd send an actual acknowledgment email
  // Template would include:
  // - Confirmation that request was received
  // - Expected timeline for response
  // - Request reference number
  // - Contact information for questions
}

async function sendGdprWithdrawalConfirmation(email: string, unsubscribeId: string): Promise<void> {
  console.log(`Sending GDPR withdrawal confirmation to ${email} for unsubscribe ${unsubscribeId}`);
  
  // In production, you'd send confirmation that:
  // - Consent has been withdrawn
  // - No more marketing emails will be sent
  // - Data processing has been stopped
  // - Right to data portability/erasure options
}

// Compliance Monitoring
export async function generateGdprComplianceReport(
  startDate: Date,
  endDate: Date
): Promise<{
  consentRecords: number;
  withdrawals: number;
  dataRequests: number;
  responseTimeCompliance: number;
  unsubscribeRequests: number;
  doubleOptInRate: number;
}> {
  try {
    const start = Timestamp.fromDate(startDate);
    const end = Timestamp.fromDate(endDate);
    
    // Get consent records
    const consentQuery = query(
      collection(db, CONSENT_COLLECTION),
      where('consentDate', '>=', start),
      where('consentDate', '<=', end)
    );
    const consentSnapshot = await getDocs(consentQuery);
    const consentRecords = consentSnapshot.docs.length;
    
    // Count withdrawals
    const withdrawals = consentSnapshot.docs.filter(doc => 
      doc.data().withdrawnDate !== undefined
    ).length;
    
    // Get data subject requests
    const requestsQuery = query(
      collection(db, DATA_REQUESTS_COLLECTION),
      where('requestDate', '>=', start),
      where('requestDate', '<=', end)
    );
    const requestsSnapshot = await getDocs(requestsQuery);
    const dataRequests = requestsSnapshot.docs.length;
    
    // Calculate response time compliance
    const completedRequests = requestsSnapshot.docs.filter(doc => 
      doc.data().status === 'completed'
    );
    const compliantRequests = completedRequests.filter(doc => {
      const data = doc.data();
      return data.completedDate && data.respondByDate && 
             data.completedDate.toMillis() <= data.respondByDate.toMillis();
    });
    const responseTimeCompliance = completedRequests.length > 0 ? 
      (compliantRequests.length / completedRequests.length) * 100 : 100;
    
    // Get unsubscribe requests
    const unsubscribeQuery = query(
      collection(db, UNSUBSCRIBE_COLLECTION),
      where('unsubscribeDate', '>=', start),
      where('unsubscribeDate', '<=', end)
    );
    const unsubscribeSnapshot = await getDocs(unsubscribeQuery);
    const unsubscribeRequests = unsubscribeSnapshot.docs.length;
    
    // Calculate double opt-in rate
    const doubleOptInConfirmed = consentSnapshot.docs.filter(doc => 
      doc.data().doubleOptInConfirmed === true
    ).length;
    const doubleOptInRate = consentRecords > 0 ? 
      (doubleOptInConfirmed / consentRecords) * 100 : 0;
    
    return {
      consentRecords,
      withdrawals,
      dataRequests,
      responseTimeCompliance,
      unsubscribeRequests,
      doubleOptInRate
    };
  } catch (error) {
    console.error('Error generating GDPR compliance report:', error);
    throw error;
  }
}

// Export all data for an investor (for data portability requests)
export async function exportInvestorData(investorId: string): Promise<any> {
  try {
    const investorDoc = await getDoc(doc(db, 'investor_mailing_list', investorId));
    if (!investorDoc.exists()) {
      throw new Error('Investor not found');
    }
    
    const [
      consentHistory,
      preferencesDoc,
      unsubscribeHistory
    ] = await Promise.all([
      getConsentHistory(investorId),
      getDoc(doc(db, PREFERENCES_COLLECTION, investorId)),
      getDocs(query(
        collection(db, UNSUBSCRIBE_COLLECTION),
        where('email', '==', investorDoc.data().email)
      ))
    ]);
    
    return {
      personalData: investorDoc.data(),
      consentHistory,
      emailPreferences: preferencesDoc.exists() ? preferencesDoc.data() : null,
      unsubscribeHistory: unsubscribeHistory.docs.map(doc => doc.data())
    };
  } catch (error) {
    console.error('Error exporting investor data:', error);
    throw error;
  }
}