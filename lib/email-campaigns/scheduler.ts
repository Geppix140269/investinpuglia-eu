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
  Timestamp,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { InvestorContact, getSubscribedInvestors } from '@/lib/firebase-mailing-list';
import { getSegmentInvestors } from './segmentation';

export interface ScheduledCampaign {
  id: string;
  name: string;
  description?: string;
  type: 'one-time' | 'recurring' | 'trigger-based';
  status: 'scheduled' | 'running' | 'paused' | 'completed' | 'failed';
  
  // Campaign configuration
  templateId: string;
  subject: string;
  senderName: string;
  senderEmail: string;
  previewText?: string;
  
  // Targeting
  targetSegments: string[];
  excludeSegments?: string[];
  recipientCount?: number;
  
  // Scheduling
  scheduledAt: Timestamp;
  timezone: string;
  
  // Recurring settings (for recurring campaigns)
  recurrence?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number; // every N days/weeks/months
    daysOfWeek?: number[]; // for weekly recurrence (0-6, Sunday = 0)
    dayOfMonth?: number; // for monthly recurrence (1-31)
    endDate?: Timestamp;
    maxOccurrences?: number;
  };
  
  // Trigger settings (for trigger-based campaigns)
  trigger?: {
    type: 'tag_added' | 'status_changed' | 'date_field' | 'custom_event';
    conditions: any;
    delay?: {
      amount: number;
      unit: 'minutes' | 'hours' | 'days';
    };
  };
  
  // Send settings
  sendSettings: {
    respectUnsubscribe: boolean;
    respectGlobalOptOut: boolean;
    sendTimeWindow?: {
      start: string; // HH:mm format
      end: string;   // HH:mm format
    };
    daysOfWeek?: number[]; // Days to send on
    throttleRate?: number; // emails per hour
    testModeEmail?: string; // for testing
  };
  
  // Execution tracking
  executions: ScheduledExecution[];
  nextRunAt?: Timestamp;
  lastRunAt?: Timestamp;
  totalSent: number;
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy?: string;
}

export interface ScheduledExecution {
  id: string;
  campaignId: string;
  scheduledFor: Timestamp;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
  startedAt?: Timestamp;
  completedAt?: Timestamp;
  recipientCount: number;
  sentCount: number;
  failedCount: number;
  error?: string;
  logs: ExecutionLog[];
}

export interface ExecutionLog {
  timestamp: Timestamp;
  level: 'info' | 'warn' | 'error';
  message: string;
  metadata?: any;
}

export interface CampaignTrigger {
  id: string;
  campaignId: string;
  investorId: string;
  triggerType: string;
  triggerData: any;
  triggeredAt: Timestamp;
  scheduledFor: Timestamp;
  processed: boolean;
  processedAt?: Timestamp;
}

const SCHEDULED_CAMPAIGNS_COLLECTION = 'scheduled_campaigns';
const EXECUTIONS_COLLECTION = 'campaign_executions';
const TRIGGERS_COLLECTION = 'campaign_triggers';

// Campaign Scheduling
export async function scheduleOneTimeCampaign(
  campaign: Omit<ScheduledCampaign, 'id' | 'type' | 'executions' | 'totalSent' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  try {
    const scheduledCampaign: Omit<ScheduledCampaign, 'id'> = {
      ...campaign,
      type: 'one-time',
      executions: [],
      totalSent: 0,
      nextRunAt: campaign.scheduledAt,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    const docRef = await addDoc(collection(db, SCHEDULED_CAMPAIGNS_COLLECTION), scheduledCampaign);
    
    console.log('Scheduled one-time campaign:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error scheduling one-time campaign:', error);
    throw error;
  }
}

export async function scheduleRecurringCampaign(
  campaign: Omit<ScheduledCampaign, 'id' | 'type' | 'executions' | 'totalSent' | 'nextRunAt' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  try {
    if (!campaign.recurrence) {
      throw new Error('Recurrence settings are required for recurring campaigns');
    }
    
    const nextRun = calculateNextRecurrence(campaign.scheduledAt, campaign.recurrence);
    
    const scheduledCampaign: Omit<ScheduledCampaign, 'id'> = {
      ...campaign,
      type: 'recurring',
      executions: [],
      totalSent: 0,
      nextRunAt: nextRun,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    const docRef = await addDoc(collection(db, SCHEDULED_CAMPAIGNS_COLLECTION), scheduledCampaign);
    
    console.log('Scheduled recurring campaign:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error scheduling recurring campaign:', error);
    throw error;
  }
}

export async function scheduleTriggerBasedCampaign(
  campaign: Omit<ScheduledCampaign, 'id' | 'type' | 'executions' | 'totalSent' | 'nextRunAt' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  try {
    if (!campaign.trigger) {
      throw new Error('Trigger settings are required for trigger-based campaigns');
    }
    
    const scheduledCampaign: Omit<ScheduledCampaign, 'id'> = {
      ...campaign,
      type: 'trigger-based',
      executions: [],
      totalSent: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    const docRef = await addDoc(collection(db, SCHEDULED_CAMPAIGNS_COLLECTION), scheduledCampaign);
    
    console.log('Scheduled trigger-based campaign:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error scheduling trigger-based campaign:', error);
    throw error;
  }
}

// Campaign Management
export async function getScheduledCampaign(campaignId: string): Promise<ScheduledCampaign | null> {
  try {
    const docRef = doc(db, SCHEDULED_CAMPAIGNS_COLLECTION, campaignId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as ScheduledCampaign;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting scheduled campaign:', error);
    return null;
  }
}

export async function getAllScheduledCampaigns(
  status?: ScheduledCampaign['status']
): Promise<ScheduledCampaign[]> {
  try {
    let q = query(
      collection(db, SCHEDULED_CAMPAIGNS_COLLECTION), 
      orderBy('createdAt', 'desc')
    );
    
    if (status) {
      q = query(q, where('status', '==', status));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ScheduledCampaign));
  } catch (error) {
    console.error('Error getting scheduled campaigns:', error);
    return [];
  }
}

export async function updateScheduledCampaign(
  campaignId: string, 
  updates: Partial<ScheduledCampaign>
): Promise<void> {
  try {
    const docRef = doc(db, SCHEDULED_CAMPAIGNS_COLLECTION, campaignId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
    
    console.log('Updated scheduled campaign:', campaignId);
  } catch (error) {
    console.error('Error updating scheduled campaign:', error);
    throw error;
  }
}

export async function pauseScheduledCampaign(campaignId: string): Promise<void> {
  await updateScheduledCampaign(campaignId, { status: 'paused' });
}

export async function resumeScheduledCampaign(campaignId: string): Promise<void> {
  const campaign = await getScheduledCampaign(campaignId);
  if (!campaign) return;
  
  let nextRunAt = campaign.nextRunAt;
  
  // If it's a recurring campaign and next run has passed, calculate new next run
  if (campaign.type === 'recurring' && campaign.recurrence && 
      (!nextRunAt || nextRunAt.toMillis() < Date.now())) {
    nextRunAt = calculateNextRecurrence(Timestamp.now(), campaign.recurrence);
  }
  
  await updateScheduledCampaign(campaignId, { 
    status: 'scheduled',
    nextRunAt
  });
}

export async function deleteScheduledCampaign(campaignId: string): Promise<void> {
  try {
    // Delete executions
    const executionsQuery = query(
      collection(db, EXECUTIONS_COLLECTION),
      where('campaignId', '==', campaignId)
    );
    const executions = await getDocs(executionsQuery);
    
    const deleteExecutionPromises = executions.docs.map(doc => deleteDoc(doc.ref));
    
    // Delete triggers
    const triggersQuery = query(
      collection(db, TRIGGERS_COLLECTION),
      where('campaignId', '==', campaignId)
    );
    const triggers = await getDocs(triggersQuery);
    
    const deleteTriggerPromises = triggers.docs.map(doc => deleteDoc(doc.ref));
    
    // Delete campaign
    const deleteCampaignPromise = deleteDoc(doc(db, SCHEDULED_CAMPAIGNS_COLLECTION, campaignId));
    
    await Promise.all([
      ...deleteExecutionPromises,
      ...deleteTriggerPromises,
      deleteCampaignPromise
    ]);
    
    console.log('Deleted scheduled campaign and related data:', campaignId);
  } catch (error) {
    console.error('Error deleting scheduled campaign:', error);
    throw error;
  }
}

// Campaign Execution Engine
export async function processScheduledCampaigns(): Promise<void> {
  try {
    console.log('Processing scheduled campaigns...');
    
    const now = Timestamp.now();
    
    // Get campaigns ready to run
    const readyCampaigns = await getDocs(query(
      collection(db, SCHEDULED_CAMPAIGNS_COLLECTION),
      where('status', '==', 'scheduled'),
      where('nextRunAt', '<=', now)
    ));
    
    for (const campaignDoc of readyCampaigns.docs) {
      const campaign = {
        id: campaignDoc.id,
        ...campaignDoc.data()
      } as ScheduledCampaign;
      
      await executeCampaign(campaign);
    }
    
    // Process trigger-based campaigns
    await processTriggerBasedCampaigns();
    
    console.log(`Processed ${readyCampaigns.docs.length} scheduled campaigns`);
  } catch (error) {
    console.error('Error processing scheduled campaigns:', error);
    throw error;
  }
}

async function executeCampaign(campaign: ScheduledCampaign): Promise<void> {
  try {
    // Create execution record
    const execution: Omit<ScheduledExecution, 'id'> = {
      campaignId: campaign.id,
      scheduledFor: campaign.nextRunAt!,
      status: 'running',
      startedAt: Timestamp.now(),
      recipientCount: 0,
      sentCount: 0,
      failedCount: 0,
      logs: [{
        timestamp: Timestamp.now(),
        level: 'info',
        message: 'Campaign execution started'
      }]
    };
    
    const executionRef = await addDoc(collection(db, EXECUTIONS_COLLECTION), execution);
    const executionId = executionRef.id;
    
    // Update campaign status
    await updateScheduledCampaign(campaign.id, {
      status: 'running',
      lastRunAt: Timestamp.now()
    });
    
    try {
      // Check send time window
      if (!isWithinSendTimeWindow(campaign.sendSettings)) {
        await logExecution(executionId, 'warn', 'Campaign skipped - outside send time window');
        await updateExecution(executionId, { 
          status: 'skipped',
          completedAt: Timestamp.now()
        });
        
        // Reschedule for next valid time
        const nextValidTime = getNextValidSendTime(campaign);
        await updateScheduledCampaign(campaign.id, {
          status: 'scheduled',
          nextRunAt: nextValidTime
        });
        return;
      }
      
      // Get target recipients
      const recipients = await getTargetRecipients(campaign);
      
      await updateExecution(executionId, { recipientCount: recipients.length });
      await logExecution(executionId, 'info', `Found ${recipients.length} target recipients`);
      
      // Send emails with throttling
      const sendResults = await sendCampaignEmails(campaign, recipients, executionId);
      
      // Update execution results
      await updateExecution(executionId, {
        status: 'completed',
        completedAt: Timestamp.now(),
        sentCount: sendResults.sent,
        failedCount: sendResults.failed
      });
      
      // Update campaign totals
      await updateScheduledCampaign(campaign.id, {
        totalSent: campaign.totalSent + sendResults.sent
      });
      
      await logExecution(executionId, 'info', 
        `Campaign completed: ${sendResults.sent} sent, ${sendResults.failed} failed`);
      
      // Handle post-execution logic
      await handlePostExecution(campaign);
      
    } catch (executionError) {
      await updateExecution(executionId, {
        status: 'failed',
        completedAt: Timestamp.now(),
        error: executionError.toString()
      });
      
      await logExecution(executionId, 'error', `Campaign execution failed: ${executionError}`);
      
      await updateScheduledCampaign(campaign.id, { status: 'failed' });
    }
    
  } catch (error) {
    console.error('Error executing campaign:', error);
    await updateScheduledCampaign(campaign.id, { status: 'failed' });
  }
}

async function getTargetRecipients(campaign: ScheduledCampaign): Promise<InvestorContact[]> {
  let recipients: InvestorContact[] = [];
  
  // Get recipients from target segments
  for (const segmentId of campaign.targetSegments) {
    const segmentRecipients = await getSegmentInvestors(segmentId);
    recipients.push(...segmentRecipients);
  }
  
  // If no segments specified, get all subscribed investors
  if (campaign.targetSegments.length === 0) {
    recipients = await getSubscribedInvestors();
  }
  
  // Remove duplicates
  const uniqueRecipients = recipients.reduce((acc, recipient) => {
    if (!acc.find(r => r.id === recipient.id)) {
      acc.push(recipient);
    }
    return acc;
  }, [] as InvestorContact[]);
  
  // Apply exclusion segments
  if (campaign.excludeSegments && campaign.excludeSegments.length > 0) {
    const excludedRecipients = new Set<string>();
    
    for (const excludeSegmentId of campaign.excludeSegments) {
      const excludeList = await getSegmentInvestors(excludeSegmentId);
      excludeList.forEach(recipient => excludedRecipients.add(recipient.id!));
    }
    
    return uniqueRecipients.filter(recipient => !excludedRecipients.has(recipient.id!));
  }
  
  // Filter based on campaign settings
  return uniqueRecipients.filter(recipient => {
    if (campaign.sendSettings.respectUnsubscribe && !recipient.subscribed) {
      return false;
    }
    
    if (campaign.sendSettings.respectGlobalOptOut && recipient.status === 'unsubscribed') {
      return false;
    }
    
    return true;
  });
}

async function sendCampaignEmails(
  campaign: ScheduledCampaign,
  recipients: InvestorContact[],
  executionId: string
): Promise<{ sent: number; failed: number }> {
  let sent = 0;
  let failed = 0;
  
  const throttleRate = campaign.sendSettings.throttleRate || 100; // emails per hour
  const delayBetweenEmails = (60 * 60 * 1000) / throttleRate; // ms between emails
  
  for (let i = 0; i < recipients.length; i++) {
    const recipient = recipients[i];
    
    try {
      // If in test mode, only send to test email
      if (campaign.sendSettings.testModeEmail) {
        if (recipient.email !== campaign.sendSettings.testModeEmail) {
          continue;
        }
      }
      
      // Send email (integrate with your email service here)
      await sendSingleEmail(campaign, recipient);
      sent++;
      
      // Log every 100 sends
      if (sent % 100 === 0) {
        await logExecution(executionId, 'info', `Sent ${sent} emails so far`);
      }
      
    } catch (error) {
      failed++;
      console.error(`Failed to send to ${recipient.email}:`, error);
    }
    
    // Throttle sending
    if (i < recipients.length - 1) {
      await new Promise(resolve => setTimeout(resolve, delayBetweenEmails));
    }
  }
  
  return { sent, failed };
}

async function sendSingleEmail(
  campaign: ScheduledCampaign,
  recipient: InvestorContact
): Promise<void> {
  // This is where you would integrate with your email service
  // Examples: SendGrid, Mailgun, AWS SES, etc.
  
  console.log(`Sending email to ${recipient.email} using template ${campaign.templateId}`);
  
  // Mock implementation
  // In real implementation, you would:
  // 1. Fetch the email template
  // 2. Personalize the content for the recipient
  // 3. Send via your email service
  // 4. Track the send event
  
  // Example integration with SendGrid:
  // const msg = {
  //   to: recipient.email,
  //   from: campaign.senderEmail,
  //   subject: personalizeSubject(campaign.subject, recipient),
  //   html: await renderTemplate(campaign.templateId, recipient),
  // };
  // await sgMail.send(msg);
}

// Utility Functions
function isWithinSendTimeWindow(sendSettings: ScheduledCampaign['sendSettings']): boolean {
  if (!sendSettings.sendTimeWindow) {
    return true;
  }
  
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTime = currentHour * 60 + currentMinutes;
  
  const [startHour, startMin] = sendSettings.sendTimeWindow.start.split(':').map(Number);
  const [endHour, endMin] = sendSettings.sendTimeWindow.end.split(':').map(Number);
  const startTime = startHour * 60 + startMin;
  const endTime = endHour * 60 + endMin;
  
  // Check day of week restriction
  if (sendSettings.daysOfWeek && sendSettings.daysOfWeek.length > 0) {
    const currentDay = now.getDay();
    if (!sendSettings.daysOfWeek.includes(currentDay)) {
      return false;
    }
  }
  
  return currentTime >= startTime && currentTime <= endTime;
}

function getNextValidSendTime(campaign: ScheduledCampaign): Timestamp {
  const now = new Date();
  let nextSendTime = new Date(now);
  
  if (campaign.sendSettings.sendTimeWindow) {
    const [startHour, startMin] = campaign.sendSettings.sendTimeWindow.start.split(':').map(Number);
    nextSendTime.setHours(startHour, startMin, 0, 0);
    
    // If time has passed today, move to tomorrow
    if (nextSendTime <= now) {
      nextSendTime.setDate(nextSendTime.getDate() + 1);
    }
    
    // Check day of week restrictions
    if (campaign.sendSettings.daysOfWeek && campaign.sendSettings.daysOfWeek.length > 0) {
      while (!campaign.sendSettings.daysOfWeek.includes(nextSendTime.getDay())) {
        nextSendTime.setDate(nextSendTime.getDate() + 1);
      }
    }
  }
  
  return Timestamp.fromDate(nextSendTime);
}

function calculateNextRecurrence(lastRun: Timestamp, recurrence: NonNullable<ScheduledCampaign['recurrence']>): Timestamp {
  const lastDate = lastRun.toDate();
  const nextDate = new Date(lastDate);
  
  switch (recurrence.frequency) {
    case 'daily':
      nextDate.setDate(nextDate.getDate() + recurrence.interval);
      break;
      
    case 'weekly':
      nextDate.setDate(nextDate.getDate() + (recurrence.interval * 7));
      break;
      
    case 'monthly':
      nextDate.setMonth(nextDate.getMonth() + recurrence.interval);
      
      // Handle day of month for monthly recurrence
      if (recurrence.dayOfMonth) {
        nextDate.setDate(recurrence.dayOfMonth);
      }
      break;
      
    case 'yearly':
      nextDate.setFullYear(nextDate.getFullYear() + recurrence.interval);
      break;
  }
  
  // Handle days of week for weekly recurrence
  if (recurrence.frequency === 'weekly' && recurrence.daysOfWeek && recurrence.daysOfWeek.length > 0) {
    const targetDay = recurrence.daysOfWeek[0]; // Use first specified day
    const currentDay = nextDate.getDay();
    const daysToAdd = (targetDay - currentDay + 7) % 7;
    nextDate.setDate(nextDate.getDate() + daysToAdd);
  }
  
  return Timestamp.fromDate(nextDate);
}

async function handlePostExecution(campaign: ScheduledCampaign): Promise<void> {
  if (campaign.type === 'one-time') {
    // Mark one-time campaign as completed
    await updateScheduledCampaign(campaign.id, { status: 'completed' });
    
  } else if (campaign.type === 'recurring' && campaign.recurrence) {
    // Schedule next recurrence
    const nextRun = calculateNextRecurrence(Timestamp.now(), campaign.recurrence);
    
    // Check if we should stop recurring
    let shouldStop = false;
    
    if (campaign.recurrence.endDate && nextRun.toMillis() > campaign.recurrence.endDate.toMillis()) {
      shouldStop = true;
    }
    
    if (campaign.recurrence.maxOccurrences && campaign.executions.length >= campaign.recurrence.maxOccurrences) {
      shouldStop = true;
    }
    
    if (shouldStop) {
      await updateScheduledCampaign(campaign.id, { status: 'completed' });
    } else {
      await updateScheduledCampaign(campaign.id, { 
        status: 'scheduled',
        nextRunAt: nextRun
      });
    }
  }
}

// Trigger Processing
async function processTriggerBasedCampaigns(): Promise<void> {
  try {
    const pendingTriggers = await getDocs(query(
      collection(db, TRIGGERS_COLLECTION),
      where('processed', '==', false),
      where('scheduledFor', '<=', Timestamp.now()),
      limit(100)
    ));
    
    for (const triggerDoc of pendingTriggers.docs) {
      const trigger = {
        id: triggerDoc.id,
        ...triggerDoc.data()
      } as CampaignTrigger;
      
      await processCampaignTrigger(trigger);
    }
    
  } catch (error) {
    console.error('Error processing trigger-based campaigns:', error);
  }
}

async function processCampaignTrigger(trigger: CampaignTrigger): Promise<void> {
  try {
    const campaign = await getScheduledCampaign(trigger.campaignId);
    if (!campaign || campaign.status !== 'scheduled') {
      return;
    }
    
    // Get the specific investor
    const allInvestors = await getSubscribedInvestors();
    const investor = allInvestors.find(inv => inv.id === trigger.investorId);
    
    if (!investor) {
      return;
    }
    
    // Send triggered email
    await sendSingleEmail(campaign, investor);
    
    // Mark trigger as processed
    await updateDoc(doc(db, TRIGGERS_COLLECTION, trigger.id), {
      processed: true,
      processedAt: Timestamp.now()
    });
    
    console.log(`Processed trigger for campaign ${campaign.name} and investor ${investor.email}`);
    
  } catch (error) {
    console.error('Error processing campaign trigger:', error);
  }
}

// Helper functions for execution tracking
async function updateExecution(executionId: string, updates: Partial<ScheduledExecution>): Promise<void> {
  try {
    await updateDoc(doc(db, EXECUTIONS_COLLECTION, executionId), updates);
  } catch (error) {
    console.error('Error updating execution:', error);
  }
}

async function logExecution(
  executionId: string, 
  level: ExecutionLog['level'], 
  message: string, 
  metadata?: any
): Promise<void> {
  try {
    const execution = await getDoc(doc(db, EXECUTIONS_COLLECTION, executionId));
    if (execution.exists()) {
      const currentLogs = execution.data().logs || [];
      const newLog: ExecutionLog = {
        timestamp: Timestamp.now(),
        level,
        message,
        metadata
      };
      
      await updateDoc(doc(db, EXECUTIONS_COLLECTION, executionId), {
        logs: [...currentLogs, newLog]
      });
    }
  } catch (error) {
    console.error('Error logging execution:', error);
  }
}

// Public API for trigger creation
export async function createCampaignTrigger(
  campaignId: string,
  investorId: string,
  triggerType: string,
  triggerData: any,
  delay?: { amount: number; unit: 'minutes' | 'hours' | 'days' }
): Promise<string> {
  try {
    const scheduledFor = delay
      ? calculateDelayedTime(delay)
      : Timestamp.now();
    
    const trigger: Omit<CampaignTrigger, 'id'> = {
      campaignId,
      investorId,
      triggerType,
      triggerData,
      triggeredAt: Timestamp.now(),
      scheduledFor,
      processed: false
    };
    
    const docRef = await addDoc(collection(db, TRIGGERS_COLLECTION), trigger);
    
    console.log(`Created campaign trigger: ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error('Error creating campaign trigger:', error);
    throw error;
  }
}

function calculateDelayedTime(delay: { amount: number; unit: 'minutes' | 'hours' | 'days' }): Timestamp {
  const now = new Date();
  
  switch (delay.unit) {
    case 'minutes':
      now.setMinutes(now.getMinutes() + delay.amount);
      break;
    case 'hours':
      now.setHours(now.getHours() + delay.amount);
      break;
    case 'days':
      now.setDate(now.getDate() + delay.amount);
      break;
  }
  
  return Timestamp.fromDate(now);
}

// Campaign Templates for Quick Setup
export const CAMPAIGN_TEMPLATES = {
  WEEKLY_NEWSLETTER: {
    name: 'Weekly Puglia Investment Newsletter',
    description: 'Weekly newsletter with market updates and new opportunities',
    recurrence: {
      frequency: 'weekly' as const,
      interval: 1,
      daysOfWeek: [1] // Monday
    },
    sendSettings: {
      respectUnsubscribe: true,
      respectGlobalOptOut: true,
      sendTimeWindow: {
        start: '09:00',
        end: '11:00'
      },
      daysOfWeek: [1, 2, 3, 4, 5], // Weekdays only
      throttleRate: 200
    }
  },
  
  MONTHLY_MARKET_REPORT: {
    name: 'Monthly Puglia Market Report',
    description: 'Comprehensive monthly market analysis and trends',
    recurrence: {
      frequency: 'monthly' as const,
      interval: 1,
      dayOfMonth: 1 // First day of month
    },
    sendSettings: {
      respectUnsubscribe: true,
      respectGlobalOptOut: true,
      sendTimeWindow: {
        start: '08:00',
        end: '10:00'
      },
      throttleRate: 150
    }
  }
};