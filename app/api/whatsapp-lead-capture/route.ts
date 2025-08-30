// WhatsApp Lead Capture & CRM Integration
import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';
import { db } from '@/lib/firebase';
import { collection, addDoc, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

// Lead scoring based on message content
function analyzeLeadQuality(messages: string[]): {
  score: number;
  budget?: string;
  timeline?: string;
  propertyType?: string;
  interests: string[];
} {
  let score = 0;
  let budget = undefined;
  let timeline = undefined;
  let propertyType = undefined;
  const interests: string[] = [];
  
  const allMessages = messages.join(' ').toLowerCase();
  
  // Budget detection (high value = high score)
  if (allMessages.match(/[2-9]\d{2}k|[1-9]m|\d+\s*million/)) {
    const match = allMessages.match(/(\d+)\s*(k|m|million)/);
    if (match) {
      const amount = parseInt(match[1]);
      const multiplier = match[2] === 'm' || match[2] === 'million' ? 1000000 : 1000;
      const total = amount * multiplier;
      
      if (total >= 2000000) {
        score += 50;
        budget = '€2M+';
      } else if (total >= 1000000) {
        score += 40;
        budget = '€1M-2M';
      } else if (total >= 500000) {
        score += 30;
        budget = '€500K-1M';
      } else {
        score += 20;
        budget = '€200K-500K';
      }
    }
  }
  
  // Timeline detection (urgent = high score)
  if (allMessages.includes('now') || allMessages.includes('immediate') || allMessages.includes('urgent')) {
    score += 20;
    timeline = 'Immediate';
  } else if (allMessages.includes('month') || allMessages.includes('soon')) {
    score += 15;
    timeline = '1-3 months';
  } else if (allMessages.includes('year')) {
    score += 10;
    timeline = '6-12 months';
  }
  
  // Property type detection
  if (allMessages.includes('hotel')) {
    propertyType = 'Hotel';
    interests.push('Hotel Investment');
    score += 15;
  }
  if (allMessages.includes('b&b') || allMessages.includes('bed')) {
    propertyType = 'B&B';
    interests.push('B&B Investment');
    score += 10;
  }
  if (allMessages.includes('restaurant')) {
    propertyType = 'Restaurant';
    interests.push('Restaurant Investment');
    score += 10;
  }
  if (allMessages.includes('villa') || allMessages.includes('trulli')) {
    propertyType = 'Residential';
    interests.push('Residential Property');
    score += 10;
  }
  
  // Grant interest (very high value)
  if (allMessages.includes('grant') || allMessages.includes('fund') || allMessages.includes('subsid')) {
    interests.push('EU Grants');
    score += 25;
  }
  
  // Location mentions
  if (allMessages.match(/ostuni|lecce|bari|polignano|alberobello|brindisi/)) {
    interests.push('Specific Location Interest');
    score += 10;
  }
  
  // Consultation interest
  if (allMessages.includes('consult') || allMessages.includes('meeting') || allMessages.includes('call')) {
    interests.push('Consultation Ready');
    score += 20;
  }
  
  return { score, budget, timeline, propertyType, interests };
}

// Extract contact information from messages
function extractContactInfo(messages: string[]): {
  email?: string;
  name?: string;
  company?: string;
} {
  let email = undefined;
  let name = undefined;
  let company = undefined;
  
  for (const msg of messages) {
    // Email extraction
    const emailMatch = msg.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
    if (emailMatch) {
      email = emailMatch[1];
    }
    
    // Name extraction (common patterns)
    const namePatterns = [
      /my name is ([A-Z][a-z]+ ?[A-Z]?[a-z]*)/i,
      /i'?m ([A-Z][a-z]+ ?[A-Z]?[a-z]*)/i,
      /this is ([A-Z][a-z]+ ?[A-Z]?[a-z]*)/i,
      /^([A-Z][a-z]+ ?[A-Z]?[a-z]*) here/i
    ];
    
    for (const pattern of namePatterns) {
      const match = msg.match(pattern);
      if (match) {
        name = match[1];
        break;
      }
    }
    
    // Company extraction
    const companyPatterns = [
      /from ([A-Z][a-zA-Z\s&]+(?:Ltd|LLC|Inc|GmbH|SRL|Company))/i,
      /work at ([A-Z][a-zA-Z\s&]+)/i,
      /represent(?:ing)? ([A-Z][a-zA-Z\s&]+)/i
    ];
    
    for (const pattern of companyPatterns) {
      const match = msg.match(pattern);
      if (match) {
        company = match[1];
        break;
      }
    }
  }
  
  return { email, name, company };
}

// Main lead capture and storage
async function captureAndStoreLead(
  phoneNumber: string,
  profileName: string,
  messages: string[],
  language: string
) {
  // Analyze lead quality
  const analysis = analyzeLeadQuality(messages);
  const contactInfo = extractContactInfo(messages);
  
  // Check if lead exists
  const leadRef = doc(db, 'whatsapp_leads', phoneNumber);
  const leadDoc = await getDoc(leadRef);
  
  const leadData = {
    phone_number: phoneNumber,
    whatsapp_name: profileName,
    ...contactInfo, // email, name, company if extracted
    language,
    lead_score: analysis.score,
    budget_range: analysis.budget,
    timeline: analysis.timeline,
    property_type: analysis.propertyType,
    interests: analysis.interests,
    message_count: messages.length,
    last_interaction: new Date().toISOString(),
    status: analysis.score >= 60 ? 'hot' : analysis.score >= 30 ? 'warm' : 'cold',
    tags: [
      ...analysis.interests,
      analysis.score >= 60 ? 'high-value' : 'standard',
      language !== 'en' ? 'international' : 'english-speaker'
    ]
  };
  
  if (leadDoc.exists()) {
    // Update existing lead
    await updateDoc(leadRef, {
      ...leadData,
      updated_at: new Date().toISOString(),
      total_interactions: (leadDoc.data().total_interactions || 0) + 1
    });
  } else {
    // Create new lead
    await setDoc(leadRef, {
      ...leadData,
      created_at: new Date().toISOString(),
      source: 'whatsapp',
      total_interactions: 1,
      follow_up_scheduled: false,
      consultation_booked: false,
      notes: []
    });
    
    // If high-value lead, add to priority queue
    if (analysis.score >= 60) {
      await addDoc(collection(db, 'priority_leads'), {
        phone_number: phoneNumber,
        lead_score: analysis.score,
        created_at: new Date().toISOString(),
        assigned_to: 'giuseppe',
        status: 'new'
      });
    }
  }
  
  return { leadData, isHighValue: analysis.score >= 60 };
}

// Create follow-up tasks
async function scheduleFollowUps(phoneNumber: string, leadScore: number) {
  const followUpSchedule = leadScore >= 60 
    ? [1, 3, 7] // High value: Day 1, 3, 7
    : [3, 7, 14]; // Standard: Day 3, 7, 14
    
  for (const days of followUpSchedule) {
    const followUpDate = new Date();
    followUpDate.setDate(followUpDate.getDate() + days);
    
    await addDoc(collection(db, 'whatsapp_follow_ups'), {
      phone_number: phoneNumber,
      scheduled_for: followUpDate.toISOString(),
      day_number: days,
      status: 'pending',
      template: days === 1 ? 'quick_follow_up' : days === 3 ? 'value_add' : 'consultation_offer'
    });
  }
}

// Main webhook handler
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const body = Object.fromEntries(formData.entries());
    
    const from = body.From as string;
    const messageBody = body.Body as string;
    const profileName = body.ProfileName as string || 'User';
    const phoneNumber = from.replace('whatsapp:', '');
    
    // Store conversation
    await addDoc(collection(db, 'whatsapp_conversations'), {
      phone_number: phoneNumber,
      message: messageBody,
      sender: 'user',
      profile_name: profileName,
      created_at: new Date().toISOString()
    });
    
    // Get all messages from this user for context
    const conversationsRef = collection(db, 'whatsapp_conversations');
    const q = query(
      conversationsRef,
      where('phone_number', '==', phoneNumber),
      where('sender', '==', 'user')
    );
    const snapshot = await getDocs(q);
    const userMessages = snapshot.docs.map(doc => doc.data().message);
    
    // Detect language
    const language = detectLanguage(messageBody);
    
    // Capture and analyze lead
    const { leadData, isHighValue } = await captureAndStoreLead(
      phoneNumber,
      profileName,
      userMessages,
      language
    );
    
    // Schedule follow-ups
    if (userMessages.length === 1) { // First interaction
      await scheduleFollowUps(phoneNumber, leadData.lead_score);
    }
    
    // Get AI response (your existing Trullo integration)
    const aiResponse = await getTrulloResponse(messageBody, phoneNumber, profileName);
    
    // If email not captured yet, ask for it subtly
    if (!leadData.email && userMessages.length > 3) {
      aiResponse += '\n\n📧 By the way, if you'd like me to send you detailed information, just share your email address!';
    }
    
    // Store bot response
    await addDoc(collection(db, 'whatsapp_conversations'), {
      phone_number: phoneNumber,
      message: aiResponse,
      sender: 'bot',
      created_at: new Date().toISOString()
    });
    
    // Send response
    await twilioClient.messages.create({
      from: body.To as string,
      to: from,
      body: aiResponse
    });
    
    // Notify Giuseppe for high-value leads
    if (isHighValue) {
      await notifyGiuseppeWithFullContext(phoneNumber, profileName, leadData);
    }
    
    // Track analytics
    await addDoc(collection(db, 'whatsapp_analytics'), {
      phone_number: phoneNumber,
      action: 'message_received',
      lead_score: leadData.lead_score,
      timestamp: new Date().toISOString()
    });
    
    return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><Response></Response>', {
      status: 200,
      headers: { 'Content-Type': 'text/xml' }
    });
    
  } catch (error) {
    console.error('WhatsApp webhook error:', error);
    return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><Response></Response>', {
      status: 200,
      headers: { 'Content-Type': 'text/xml' }
    });
  }
}

// Helper functions (add your existing ones here)
function detectLanguage(text: string): string {
  // Your existing language detection
  return 'en';
}

async function getTrulloResponse(message: string, phone: string, name: string): Promise<string> {
  // Your existing Trullo integration
  return 'Response from Trullo';
}

async function notifyGiuseppeWithFullContext(phone: string, name: string, leadData: any) {
  const emailContent = `
    <h2>🔥 HIGH-VALUE WHATSAPP LEAD (Score: ${leadData.lead_score}/100)</h2>
    
    <h3>Contact Information:</h3>
    <ul>
      <li><strong>Name:</strong> ${leadData.name || name}</li>
      <li><strong>Phone:</strong> ${phone}</li>
      <li><strong>Email:</strong> ${leadData.email || 'Not captured yet'}</li>
      <li><strong>Company:</strong> ${leadData.company || 'Not identified'}</li>
      <li><strong>Language:</strong> ${leadData.language}</li>
    </ul>
    
    <h3>Investment Profile:</h3>
    <ul>
      <li><strong>Budget:</strong> ${leadData.budget_range || 'Not specified'}</li>
      <li><strong>Timeline:</strong> ${leadData.timeline || 'Not specified'}</li>
      <li><strong>Property Type:</strong> ${leadData.property_type || 'Not specified'}</li>
      <li><strong>Interests:</strong> ${leadData.interests.join(', ')}</li>
    </ul>
    
    <h3>Engagement:</h3>
    <ul>
      <li><strong>Messages:</strong> ${leadData.message_count}</li>
      <li><strong>Status:</strong> ${leadData.status.toUpperCase()}</li>
      <li><strong>Tags:</strong> ${leadData.tags.join(', ')}</li>
    </ul>
    
    <div style="margin-top: 20px;">
      <a href="https://wa.me/${phone.replace('+', '')}" 
         style="background: #25D366; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
        Reply on WhatsApp Now
      </a>
    </div>
  `;
  
  // Send email notification
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: 'g.funaro@investinpuglia.eu',
      subject: `🔥 HOT Lead - Score ${leadData.lead_score} - ${leadData.name || name}`,
      html: emailContent
    })
  });
}