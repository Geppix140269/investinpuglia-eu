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
import { InvestorContact } from '@/lib/firebase-mailing-list';
import { trackEmailEvent, getCampaignAnalytics } from './analytics';

export interface ABTestConfiguration {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'running' | 'completed' | 'paused';
  
  // Test setup
  testType: 'subject_line' | 'sender_name' | 'content' | 'send_time' | 'template_design';
  trafficSplit: number; // Percentage for variant A (remaining goes to B)
  winnerSelection: 'manual' | 'automatic';
  
  // Variants
  variantA: {
    name: string;
    campaignId?: string;
    configuration: {
      subject?: string;
      senderName?: string;
      senderEmail?: string;
      templateId?: string;
      sendTime?: string;
      previewText?: string;
    };
  };
  
  variantB: {
    name: string;
    campaignId?: string;
    configuration: {
      subject?: string;
      senderName?: string;
      senderEmail?: string;
      templateId?: string;
      sendTime?: string;
      previewText?: string;
    };
  };
  
  // Test parameters
  sampleSize: number;
  minimumRunTime: number; // hours
  maximumRunTime: number; // hours
  significanceLevel: number; // 0.95 for 95% confidence
  primaryMetric: 'open_rate' | 'click_rate' | 'conversion_rate' | 'revenue';
  
  // Target audience
  segmentRules: {
    includeSegments?: string[];
    excludeSegments?: string[];
    customRules?: any[];
  };
  
  // Results
  results?: ABTestResults;
  winner?: 'A' | 'B' | 'inconclusive';
  winnerDeclaredAt?: Timestamp;
  
  // Timestamps
  scheduledStartAt?: Timestamp;
  startedAt?: Timestamp;
  completedAt?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ABTestResults {
  variantA: {
    participants: number;
    metrics: {
      sent: number;
      opened: number;
      clicked: number;
      conversions: number;
      revenue: number;
    };
    rates: {
      openRate: number;
      clickRate: number;
      conversionRate: number;
      revenuePerRecipient: number;
    };
  };
  
  variantB: {
    participants: number;
    metrics: {
      sent: number;
      opened: number;
      clicked: number;
      conversions: number;
      revenue: number;
    };
    rates: {
      openRate: number;
      clickRate: number;
      conversionRate: number;
      revenuePerRecipient: number;
    };
  };
  
  statistical: {
    confidenceLevel: number;
    pValue: number;
    isSignificant: boolean;
    improvement: number; // percentage improvement of winner over loser
    winnerDetermined: boolean;
  };
  
  recommendations: string[];
}

export interface ABTestParticipant {
  id: string;
  testId: string;
  investorId: string;
  variant: 'A' | 'B';
  assignedAt: Timestamp;
  campaignId?: string;
}

const AB_TESTS_COLLECTION = 'ab_tests';
const AB_PARTICIPANTS_COLLECTION = 'ab_test_participants';

// Test Management
export async function createABTest(test: Omit<ABTestConfiguration, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const testWithTimestamps = {
      ...test,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, AB_TESTS_COLLECTION), testWithTimestamps);
    
    console.log('Created A/B test:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error creating A/B test:', error);
    throw error;
  }
}

export async function getABTest(testId: string): Promise<ABTestConfiguration | null> {
  try {
    const docRef = doc(db, AB_TESTS_COLLECTION, testId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as ABTestConfiguration;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting A/B test:', error);
    return null;
  }
}

export async function getAllABTests(status?: ABTestConfiguration['status']): Promise<ABTestConfiguration[]> {
  try {
    let q = query(collection(db, AB_TESTS_COLLECTION), orderBy('createdAt', 'desc'));
    
    if (status) {
      q = query(q, where('status', '==', status));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ABTestConfiguration));
  } catch (error) {
    console.error('Error getting A/B tests:', error);
    return [];
  }
}

export async function updateABTest(testId: string, updates: Partial<ABTestConfiguration>): Promise<void> {
  try {
    const docRef = doc(db, AB_TESTS_COLLECTION, testId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    
    console.log('Updated A/B test:', testId);
  } catch (error) {
    console.error('Error updating A/B test:', error);
    throw error;
  }
}

export async function deleteABTest(testId: string): Promise<void> {
  try {
    // Remove all participants
    const participantsQuery = query(
      collection(db, AB_PARTICIPANTS_COLLECTION),
      where('testId', '==', testId)
    );
    const participants = await getDocs(participantsQuery);
    
    const deletePromises = participants.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    
    // Delete the test
    await deleteDoc(doc(db, AB_TESTS_COLLECTION, testId));
    
    console.log('Deleted A/B test and participants:', testId);
  } catch (error) {
    console.error('Error deleting A/B test:', error);
    throw error;
  }
}

// Participant Assignment
export async function assignParticipants(
  testId: string,
  investors: InvestorContact[]
): Promise<{ variantA: string[]; variantB: string[] }> {
  try {
    const test = await getABTest(testId);
    if (!test) {
      throw new Error('Test not found');
    }
    
    // Shuffle investors for random assignment
    const shuffledInvestors = [...investors].sort(() => Math.random() - 0.5);
    const splitIndex = Math.floor((shuffledInvestors.length * test.trafficSplit) / 100);
    
    const variantAInvestors = shuffledInvestors.slice(0, splitIndex);
    const variantBInvestors = shuffledInvestors.slice(splitIndex);
    
    // Create participant records
    const participantPromises = [
      ...variantAInvestors.map(investor => 
        addDoc(collection(db, AB_PARTICIPANTS_COLLECTION), {
          testId,
          investorId: investor.id!,
          variant: 'A',
          assignedAt: serverTimestamp()
        })
      ),
      ...variantBInvestors.map(investor => 
        addDoc(collection(db, AB_PARTICIPANTS_COLLECTION), {
          testId,
          investorId: investor.id!,
          variant: 'B',
          assignedAt: serverTimestamp()
        })
      )
    ];
    
    await Promise.all(participantPromises);
    
    const result = {
      variantA: variantAInvestors.map(i => i.id!),
      variantB: variantBInvestors.map(i => i.id!)
    };
    
    console.log(`Assigned participants: ${result.variantA.length} to A, ${result.variantB.length} to B`);
    return result;
  } catch (error) {
    console.error('Error assigning participants:', error);
    throw error;
  }
}

export async function getParticipantVariant(testId: string, investorId: string): Promise<'A' | 'B' | null> {
  try {
    const q = query(
      collection(db, AB_PARTICIPANTS_COLLECTION),
      where('testId', '==', testId),
      where('investorId', '==', investorId)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const participant = querySnapshot.docs[0].data() as ABTestParticipant;
      return participant.variant;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting participant variant:', error);
    return null;
  }
}

export async function getTestParticipants(testId: string, variant?: 'A' | 'B'): Promise<ABTestParticipant[]> {
  try {
    let q = query(
      collection(db, AB_PARTICIPANTS_COLLECTION),
      where('testId', '==', testId)
    );
    
    if (variant) {
      q = query(q, where('variant', '==', variant));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ABTestParticipant));
  } catch (error) {
    console.error('Error getting test participants:', error);
    return [];
  }
}

// Test Execution
export async function startABTest(testId: string): Promise<void> {
  try {
    const test = await getABTest(testId);
    if (!test) {
      throw new Error('Test not found');
    }
    
    if (test.status !== 'draft') {
      throw new Error('Test must be in draft status to start');
    }
    
    await updateABTest(testId, {
      status: 'running',
      startedAt: Timestamp.now()
    });
    
    // Schedule automatic completion if configured
    if (test.winnerSelection === 'automatic') {
      scheduleTestCompletion(testId, test.maximumRunTime);
    }
    
    console.log('Started A/B test:', testId);
  } catch (error) {
    console.error('Error starting A/B test:', error);
    throw error;
  }
}

export async function pauseABTest(testId: string): Promise<void> {
  try {
    await updateABTest(testId, {
      status: 'paused'
    });
    
    console.log('Paused A/B test:', testId);
  } catch (error) {
    console.error('Error pausing A/B test:', error);
    throw error;
  }
}

export async function resumeABTest(testId: string): Promise<void> {
  try {
    await updateABTest(testId, {
      status: 'running'
    });
    
    console.log('Resumed A/B test:', testId);
  } catch (error) {
    console.error('Error resuming A/B test:', error);
    throw error;
  }
}

export async function completeABTest(testId: string, forceComplete: boolean = false): Promise<ABTestResults> {
  try {
    const test = await getABTest(testId);
    if (!test) {
      throw new Error('Test not found');
    }
    
    // Check if minimum run time has passed
    if (!forceComplete && test.startedAt) {
      const runTimeHours = (Date.now() - test.startedAt.toMillis()) / (1000 * 60 * 60);
      if (runTimeHours < test.minimumRunTime) {
        throw new Error(`Test must run for at least ${test.minimumRunTime} hours`);
      }
    }
    
    // Calculate results
    const results = await calculateABTestResults(testId);
    
    // Determine winner
    const winner = determineWinner(results, test.primaryMetric, test.significanceLevel);
    
    // Update test status
    await updateABTest(testId, {
      status: 'completed',
      results,
      winner,
      winnerDeclaredAt: Timestamp.now(),
      completedAt: Timestamp.now()
    });
    
    console.log(`Completed A/B test: ${testId}, Winner: ${winner}`);
    return results;
  } catch (error) {
    console.error('Error completing A/B test:', error);
    throw error;
  }
}

async function calculateABTestResults(testId: string): Promise<ABTestResults> {
  try {
    const test = await getABTest(testId);
    if (!test) {
      throw new Error('Test not found');
    }
    
    const participants = await getTestParticipants(testId);
    const variantAParticipants = participants.filter(p => p.variant === 'A');
    const variantBParticipants = participants.filter(p => p.variant === 'B');
    
    // Get analytics for both variants if campaign IDs are available
    let variantAAnalytics, variantBAnalytics;
    
    if (test.variantA.campaignId) {
      variantAAnalytics = await getCampaignAnalytics(test.variantA.campaignId);
    }
    
    if (test.variantB.campaignId) {
      variantBAnalytics = await getCampaignAnalytics(test.variantB.campaignId);
    }
    
    // Calculate metrics for variant A
    const variantAMetrics = variantAAnalytics ? variantAAnalytics.metrics : {
      sent: variantAParticipants.length,
      opened: 0,
      clicked: 0,
      conversions: 0,
      revenue: 0
    };
    
    const variantARates = {
      openRate: variantAMetrics.sent > 0 ? (variantAMetrics.opened / variantAMetrics.sent) * 100 : 0,
      clickRate: variantAMetrics.sent > 0 ? (variantAMetrics.clicked / variantAMetrics.sent) * 100 : 0,
      conversionRate: variantAMetrics.sent > 0 ? (variantAMetrics.conversions / variantAMetrics.sent) * 100 : 0,
      revenuePerRecipient: variantAMetrics.sent > 0 ? variantAMetrics.revenue / variantAMetrics.sent : 0
    };
    
    // Calculate metrics for variant B
    const variantBMetrics = variantBAnalytics ? variantBAnalytics.metrics : {
      sent: variantBParticipants.length,
      opened: 0,
      clicked: 0,
      conversions: 0,
      revenue: 0
    };
    
    const variantBRates = {
      openRate: variantBMetrics.sent > 0 ? (variantBMetrics.opened / variantBMetrics.sent) * 100 : 0,
      clickRate: variantBMetrics.sent > 0 ? (variantBMetrics.clicked / variantBMetrics.sent) * 100 : 0,
      conversionRate: variantBMetrics.sent > 0 ? (variantBMetrics.conversions / variantBMetrics.sent) * 100 : 0,
      revenuePerRecipient: variantBMetrics.sent > 0 ? variantBMetrics.revenue / variantBMetrics.sent : 0
    };
    
    // Calculate statistical significance
    const statistical = calculateStatisticalSignificance(
      variantAMetrics,
      variantBMetrics,
      test.primaryMetric,
      test.significanceLevel
    );
    
    // Generate recommendations
    const recommendations = generateABTestRecommendations(
      test,
      { metrics: variantAMetrics, rates: variantARates },
      { metrics: variantBMetrics, rates: variantBRates },
      statistical
    );
    
    return {
      variantA: {
        participants: variantAParticipants.length,
        metrics: variantAMetrics,
        rates: variantARates
      },
      variantB: {
        participants: variantBParticipants.length,
        metrics: variantBMetrics,
        rates: variantBRates
      },
      statistical,
      recommendations
    };
  } catch (error) {
    console.error('Error calculating A/B test results:', error);
    throw error;
  }
}

function calculateStatisticalSignificance(
  variantAMetrics: any,
  variantBMetrics: any,
  primaryMetric: ABTestConfiguration['primaryMetric'],
  significanceLevel: number
): ABTestResults['statistical'] {
  // Get the primary metric values
  let valueA: number, valueB: number, sampleA: number, sampleB: number;
  
  switch (primaryMetric) {
    case 'open_rate':
      valueA = variantAMetrics.opened;
      valueB = variantBMetrics.opened;
      sampleA = variantAMetrics.sent;
      sampleB = variantBMetrics.sent;
      break;
    case 'click_rate':
      valueA = variantAMetrics.clicked;
      valueB = variantBMetrics.clicked;
      sampleA = variantAMetrics.sent;
      sampleB = variantBMetrics.sent;
      break;
    case 'conversion_rate':
      valueA = variantAMetrics.conversions;
      valueB = variantBMetrics.conversions;
      sampleA = variantAMetrics.sent;
      sampleB = variantBMetrics.sent;
      break;
    case 'revenue':
      valueA = variantAMetrics.revenue;
      valueB = variantBMetrics.revenue;
      sampleA = variantAMetrics.sent;
      sampleB = variantBMetrics.sent;
      break;
    default:
      valueA = variantAMetrics.conversions;
      valueB = variantBMetrics.conversions;
      sampleA = variantAMetrics.sent;
      sampleB = variantBMetrics.sent;
  }
  
  // Calculate proportions
  const pA = sampleA > 0 ? valueA / sampleA : 0;
  const pB = sampleB > 0 ? valueB / sampleB : 0;
  
  // Pooled proportion for z-test
  const pooledP = (valueA + valueB) / (sampleA + sampleB);
  const standardError = Math.sqrt(pooledP * (1 - pooledP) * (1/sampleA + 1/sampleB));
  
  // Z-score calculation
  const zScore = standardError > 0 ? (pA - pB) / standardError : 0;
  
  // Calculate p-value (two-tailed test)
  const pValue = 2 * (1 - normalCDF(Math.abs(zScore)));
  
  // Check significance
  const isSignificant = pValue < (1 - significanceLevel);
  
  // Calculate improvement
  const improvement = pB > 0 ? ((Math.max(pA, pB) - Math.min(pA, pB)) / Math.min(pA, pB)) * 100 : 0;
  
  // Calculate confidence level
  const confidenceLevel = (1 - pValue) * 100;
  
  return {
    confidenceLevel: Math.min(99.9, Math.max(0, confidenceLevel)),
    pValue,
    isSignificant,
    improvement,
    winnerDetermined: isSignificant && (sampleA >= 100 && sampleB >= 100)
  };
}

// Normal cumulative distribution function approximation
function normalCDF(x: number): number {
  return 0.5 * (1 + erf(x / Math.sqrt(2)));
}

// Error function approximation
function erf(x: number): number {
  const a1 =  0.254829592;
  const a2 = -0.284496736;
  const a3 =  1.421413741;
  const a4 = -1.453152027;
  const a5 =  1.061405429;
  const p  =  0.3275911;
  
  const sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);
  
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  
  return sign * y;
}

function determineWinner(
  results: ABTestResults,
  primaryMetric: ABTestConfiguration['primaryMetric'],
  significanceLevel: number
): 'A' | 'B' | 'inconclusive' {
  if (!results.statistical.winnerDetermined) {
    return 'inconclusive';
  }
  
  let metricA: number, metricB: number;
  
  switch (primaryMetric) {
    case 'open_rate':
      metricA = results.variantA.rates.openRate;
      metricB = results.variantB.rates.openRate;
      break;
    case 'click_rate':
      metricA = results.variantA.rates.clickRate;
      metricB = results.variantB.rates.clickRate;
      break;
    case 'conversion_rate':
      metricA = results.variantA.rates.conversionRate;
      metricB = results.variantB.rates.conversionRate;
      break;
    case 'revenue':
      metricA = results.variantA.rates.revenuePerRecipient;
      metricB = results.variantB.rates.revenuePerRecipient;
      break;
    default:
      metricA = results.variantA.rates.conversionRate;
      metricB = results.variantB.rates.conversionRate;
  }
  
  if (metricA > metricB) {
    return 'A';
  } else if (metricB > metricA) {
    return 'B';
  } else {
    return 'inconclusive';
  }
}

function generateABTestRecommendations(
  test: ABTestConfiguration,
  variantA: any,
  variantB: any,
  statistical: ABTestResults['statistical']
): string[] {
  const recommendations: string[] = [];
  
  if (statistical.winnerDetermined) {
    const winner = variantA.rates[test.primaryMetric.replace('_rate', 'Rate')] > 
                  variantB.rates[test.primaryMetric.replace('_rate', 'Rate')] ? 'A' : 'B';
    
    recommendations.push(`Variant ${winner} is the clear winner with ${statistical.improvement.toFixed(1)}% improvement in ${test.primaryMetric.replace('_', ' ')}.`);
    
    if (test.testType === 'subject_line') {
      recommendations.push(`The winning subject line approach should be applied to future campaigns targeting similar audiences.`);
    }
    
    if (test.testType === 'send_time') {
      recommendations.push(`The optimal send time identified should be used as the default for this audience segment.`);
    }
    
    if (statistical.improvement > 20) {
      recommendations.push(`This represents a significant improvement. Consider implementing immediately and testing similar variations.`);
    }
  } else {
    recommendations.push(`Results are not statistically significant. Consider running the test longer or increasing the sample size.`);
    
    if (test.sampleSize < 1000) {
      recommendations.push(`Sample size may be too small for reliable results. Consider targeting a larger audience.`);
    }
    
    const runTimeHours = test.startedAt ? (Date.now() - test.startedAt.toMillis()) / (1000 * 60 * 60) : 0;
    if (runTimeHours < 72) {
      recommendations.push(`Test may need more time to gather sufficient data for statistical significance.`);
    }
  }
  
  // Performance-based recommendations
  const avgOpenRate = (variantA.rates.openRate + variantB.rates.openRate) / 2;
  if (avgOpenRate < 15) {
    recommendations.push(`Overall open rates are low. Consider testing more compelling subject lines or sender names.`);
  }
  
  const avgClickRate = (variantA.rates.clickRate + variantB.rates.clickRate) / 2;
  if (avgClickRate < 2) {
    recommendations.push(`Click rates are below average. Test different content approaches, CTA placement, or email design.`);
  }
  
  return recommendations;
}

async function scheduleTestCompletion(testId: string, hoursFromNow: number): Promise<void> {
  // In a production environment, you would use a scheduling service like:
  // - Firebase Functions with scheduled triggers
  // - AWS EventBridge
  // - Queue systems with delayed messages
  
  console.log(`Test ${testId} scheduled to complete in ${hoursFromNow} hours`);
  
  // For this example, we'll just log the scheduled completion
  // In practice, you'd implement proper job scheduling
}

// Helper functions for creating common test types
export async function createSubjectLineTest(
  testName: string,
  subjectA: string,
  subjectB: string,
  templateId: string,
  segmentRules: ABTestConfiguration['segmentRules'],
  sampleSize: number = 1000
): Promise<string> {
  return await createABTest({
    name: testName,
    description: `Testing subject line variants: "${subjectA}" vs "${subjectB}"`,
    status: 'draft',
    testType: 'subject_line',
    trafficSplit: 50,
    winnerSelection: 'automatic',
    variantA: {
      name: 'Subject A',
      configuration: {
        subject: subjectA,
        templateId
      }
    },
    variantB: {
      name: 'Subject B',
      configuration: {
        subject: subjectB,
        templateId
      }
    },
    sampleSize,
    minimumRunTime: 24,
    maximumRunTime: 168, // 7 days
    significanceLevel: 0.95,
    primaryMetric: 'open_rate',
    segmentRules
  });
}

export async function createSendTimeTest(
  testName: string,
  sendTimeA: string,
  sendTimeB: string,
  templateId: string,
  segmentRules: ABTestConfiguration['segmentRules'],
  sampleSize: number = 1000
): Promise<string> {
  return await createABTest({
    name: testName,
    description: `Testing send times: ${sendTimeA} vs ${sendTimeB}`,
    status: 'draft',
    testType: 'send_time',
    trafficSplit: 50,
    winnerSelection: 'automatic',
    variantA: {
      name: 'Send Time A',
      configuration: {
        sendTime: sendTimeA,
        templateId
      }
    },
    variantB: {
      name: 'Send Time B',
      configuration: {
        sendTime: sendTimeB,
        templateId
      }
    },
    sampleSize,
    minimumRunTime: 48,
    maximumRunTime: 168,
    significanceLevel: 0.95,
    primaryMetric: 'open_rate',
    segmentRules
  });
}

export async function createContentTest(
  testName: string,
  templateIdA: string,
  templateIdB: string,
  segmentRules: ABTestConfiguration['segmentRules'],
  sampleSize: number = 1000
): Promise<string> {
  return await createABTest({
    name: testName,
    description: `Testing email content variants`,
    status: 'draft',
    testType: 'content',
    trafficSplit: 50,
    winnerSelection: 'automatic',
    variantA: {
      name: 'Content A',
      configuration: {
        templateId: templateIdA
      }
    },
    variantB: {
      name: 'Content B',
      configuration: {
        templateId: templateIdB
      }
    },
    sampleSize,
    minimumRunTime: 48,
    maximumRunTime: 168,
    significanceLevel: 0.95,
    primaryMetric: 'click_rate',
    segmentRules
  });
}