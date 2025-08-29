# WhatsApp Business API Integration Strategy for InvestInPuglia.eu

## Executive Summary

This document outlines a comprehensive strategy for integrating WhatsApp Business API with the existing Trullo AI chatbot system at InvestInPuglia.eu. The integration aims to provide seamless multi-channel customer engagement, automated lead qualification, and enhanced conversion rates through WhatsApp's 2+ billion user base.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Implementation Plan](#implementation-plan)
3. [Twilio Webhook Setup](#twilio-webhook-setup)
4. [Message Flow Architecture](#message-flow-architecture)
5. [Multi-Language Support](#multi-language-support)
6. [Lead Capture & CRM Integration](#lead-capture--crm-integration)
7. [Automated Follow-up Sequences](#automated-follow-up-sequences)
8. [Meta-Approved Message Templates](#meta-approved-message-templates)
9. [Rich Media Support](#rich-media-support)
10. [Calendly Integration](#calendly-integration)
11. [Analytics & Conversion Tracking](#analytics--conversion-tracking)
12. [GDPR Compliance](#gdpr-compliance)
13. [Cost Optimization](#cost-optimization)
14. [Technical Implementation](#technical-implementation)
15. [Testing & Deployment](#testing--deployment)

---

## Architecture Overview

### Current State Analysis
- **Existing Trullo Chatbot**: Multi-language AI assistant (EN, IT, DE, FR, ES, AR, ZH, RU)
- **Platform**: Next.js with TypeScript
- **Database**: Supabase
- **AI Provider**: OpenAI GPT
- **Email Service**: Resend
- **Authentication**: Supabase Auth

### Target Architecture
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   WhatsApp      │    │     Twilio       │    │   Next.js API   │
│   Business API  │◄───┤   Webhook API    │◄───┤    Routes       │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                        │
                                                        ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Meta Business │    │   Trullo Core    │    │   Supabase      │
│   Manager       │    │   Logic          │    │   Database      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │                       │
                                ▼                       ▼
                    ┌──────────────────┐    ┌─────────────────┐
                    │   OpenAI GPT     │    │   CRM Systems   │
                    │   Assistant      │    │   (Supabase)    │
                    └──────────────────┘    └─────────────────┘
```

---

## Implementation Plan

### Phase 1: Foundation Setup (Week 1-2)
1. **WhatsApp Business API Account Setup**
   - Create Meta Business Manager account
   - Apply for WhatsApp Business API access
   - Set up phone number verification
   - Configure business profile

2. **Twilio Integration**
   - Set up Twilio WhatsApp sandbox for development
   - Configure production WhatsApp Business API
   - Implement webhook endpoints
   - Test message sending/receiving

### Phase 2: Core Integration (Week 3-4)
1. **API Endpoint Development**
   - Create WhatsApp webhook handlers
   - Integrate with existing Trullo logic
   - Implement message routing
   - Add session management

2. **Database Schema Extension**
   ```sql
   -- WhatsApp-specific tables
   CREATE TABLE whatsapp_conversations (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     phone_number TEXT NOT NULL,
     conversation_id TEXT UNIQUE,
     language TEXT DEFAULT 'en',
     status TEXT DEFAULT 'active',
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );

   CREATE TABLE whatsapp_messages (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     conversation_id UUID REFERENCES whatsapp_conversations(id),
     message_id TEXT UNIQUE,
     direction TEXT CHECK (direction IN ('inbound', 'outbound')),
     message_type TEXT DEFAULT 'text',
     content TEXT,
     media_url TEXT,
     status TEXT DEFAULT 'sent',
     created_at TIMESTAMP DEFAULT NOW()
   );

   CREATE TABLE whatsapp_templates (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     template_name TEXT NOT NULL,
     language TEXT NOT NULL,
     category TEXT NOT NULL,
     content TEXT NOT NULL,
     status TEXT DEFAULT 'pending',
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

### Phase 3: Advanced Features (Week 5-6)
1. **Rich Media Implementation**
2. **Template Message System**
3. **Lead Scoring Integration**
4. **Automated Nurturing Sequences**

### Phase 4: Testing & Optimization (Week 7-8)
1. **End-to-end Testing**
2. **Performance Optimization**
3. **GDPR Compliance Audit**
4. **Production Deployment**

---

## Twilio Webhook Setup

### 1. Webhook Configuration

```typescript
// app/api/whatsapp/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-twilio-signature');
    
    // Verify webhook signature
    if (!verifyTwilioSignature(body, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const data = new URLSearchParams(body);
    const messageData = {
      from: data.get('From'),
      to: data.get('To'),
      body: data.get('Body'),
      messageId: data.get('MessageSid'),
      mediaUrl: data.get('MediaUrl0'),
      mediaType: data.get('MediaContentType0')
    };

    // Process WhatsApp message
    await handleWhatsAppMessage(messageData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('WhatsApp webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function verifyTwilioSignature(body: string, signature: string | null): boolean {
  if (!signature) return false;
  
  const expectedSignature = crypto
    .createHmac('sha1', process.env.TWILIO_AUTH_TOKEN!)
    .update(Buffer.from(process.env.TWILIO_WEBHOOK_URL + body, 'utf-8'))
    .digest('base64');
    
  return crypto.timingSafeEqual(
    Buffer.from(signature.replace('sha1=', '')),
    Buffer.from(expectedSignature)
  );
}

async function handleWhatsAppMessage(messageData: any) {
  const phoneNumber = messageData.from.replace('whatsapp:', '');
  
  // Get or create conversation
  let { data: conversation } = await supabase
    .from('whatsapp_conversations')
    .select('*')
    .eq('phone_number', phoneNumber)
    .single();

  if (!conversation) {
    const { data: newConversation } = await supabase
      .from('whatsapp_conversations')
      .insert({
        phone_number: phoneNumber,
        conversation_id: `wa_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      })
      .select()
      .single();
    
    conversation = newConversation;
  }

  // Store message
  await supabase
    .from('whatsapp_messages')
    .insert({
      conversation_id: conversation.id,
      message_id: messageData.messageId,
      direction: 'inbound',
      message_type: messageData.mediaType ? 'media' : 'text',
      content: messageData.body,
      media_url: messageData.mediaUrl
    });

  // Process with Trullo AI
  const response = await processTrulloResponse(messageData.body, conversation);
  
  // Send response back to WhatsApp
  await sendWhatsAppMessage(phoneNumber, response, conversation.language);
}
```

### 2. Message Sending Service

```typescript
// lib/whatsapp-service.ts
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function sendWhatsAppMessage(
  to: string,
  message: string,
  language: string = 'en',
  mediaUrl?: string
) {
  try {
    const messageOptions: any = {
      from: 'whatsapp:' + process.env.TWILIO_WHATSAPP_NUMBER,
      to: 'whatsapp:' + to,
      body: message
    };

    if (mediaUrl) {
      messageOptions.mediaUrl = [mediaUrl];
    }

    const result = await client.messages.create(messageOptions);
    
    // Log to Supabase
    await supabase
      .from('whatsapp_messages')
      .insert({
        message_id: result.sid,
        direction: 'outbound',
        message_type: mediaUrl ? 'media' : 'text',
        content: message,
        media_url: mediaUrl,
        status: result.status
      });

    return result;
  } catch (error) {
    console.error('Failed to send WhatsApp message:', error);
    throw error;
  }
}

export async function sendWhatsAppTemplate(
  to: string,
  templateName: string,
  language: string,
  parameters: string[]
) {
  try {
    const result = await client.messages.create({
      from: 'whatsapp:' + process.env.TWILIO_WHATSAPP_NUMBER,
      to: 'whatsapp:' + to,
      contentSid: templateName,
      contentVariables: JSON.stringify(parameters)
    });

    return result;
  } catch (error) {
    console.error('Failed to send WhatsApp template:', error);
    throw error;
  }
}
```

---

## Message Flow Architecture

### 1. Conversation States

```typescript
// types/whatsapp.ts
export type ConversationState = 
  | 'welcome'
  | 'language_selection'
  | 'qualifying'
  | 'information_gathering'
  | 'scheduling'
  | 'document_sharing'
  | 'follow_up'
  | 'completed';

export interface WhatsAppConversation {
  id: string;
  phoneNumber: string;
  state: ConversationState;
  language: Language;
  userProfile: {
    name?: string;
    email?: string;
    investmentGoals?: string[];
    budget?: string;
    timeline?: string;
    propertyType?: string;
  };
  metadata: {
    sessionStart: Date;
    lastActivity: Date;
    messageCount: number;
    qualificationScore: number;
  };
}
```

### 2. State Machine Implementation

```typescript
// lib/whatsapp-state-machine.ts
export class WhatsAppStateMachine {
  private conversation: WhatsAppConversation;

  constructor(conversation: WhatsAppConversation) {
    this.conversation = conversation;
  }

  async processMessage(message: string): Promise<string> {
    switch (this.conversation.state) {
      case 'welcome':
        return this.handleWelcome(message);
      
      case 'language_selection':
        return this.handleLanguageSelection(message);
      
      case 'qualifying':
        return this.handleQualifying(message);
      
      case 'information_gathering':
        return this.handleInformationGathering(message);
      
      case 'scheduling':
        return this.handleScheduling(message);
      
      case 'document_sharing':
        return this.handleDocumentSharing(message);
      
      default:
        return this.handleDefault(message);
    }
  }

  private async handleWelcome(message: string): Promise<string> {
    // Language detection logic
    const detectedLanguage = await this.detectLanguage(message);
    
    if (detectedLanguage) {
      this.conversation.language = detectedLanguage;
      this.conversation.state = 'qualifying';
      
      const welcomeMessages = {
        en: "Welcome! I'm Trullo, your EU grants and investment assistant for Puglia 🇪🇺\n\nI can help you discover funding opportunities up to 50% for your project. What brings you to Puglia investments today?",
        it: "Benvenuto! Sono Trullo, il tuo assistente per fondi UE e investimenti in Puglia 🇪🇺\n\nPosso aiutarti a scoprire opportunità di finanziamento fino al 50% per il tuo progetto. Cosa ti porta agli investimenti in Puglia oggi?",
        es: "¡Bienvenido! Soy Trullo, tu asistente de subvenciones europeas e inversiones en Puglia 🇪🇺\n\nPuedo ayudarte a descubrir oportunidades de financiación de hasta el 50% para tu proyecto. ¿Qué te trae a las inversiones en Puglia hoy?",
        de: "Willkommen! Ich bin Trullo, Ihr EU-Förderungs- und Investment-Assistent für Apulien 🇪🇺\n\nIch kann Ihnen helfen, Fördermöglichkeiten von bis zu 50% für Ihr Projekt zu entdecken. Was führt Sie heute zu Investitionen in Apulien?",
        fr: "Bienvenue ! Je suis Trullo, votre assistant pour les subventions européennes et les investissements dans les Pouilles 🇪🇺\n\nJe peux vous aider à découvrir des opportunités de financement jusqu'à 50% pour votre projet. Qu'est-ce qui vous amène aux investissements dans les Pouilles aujourd'hui ?",
        ar: "مرحباً! أنا ترولو، مساعدك للمنح الأوروبية والاستثمار في بوليا 🇪🇺\n\nيمكنني مساعدتك في اكتشاف فرص التمويل حتى 50% لمشروعك. ما الذي يجلبك إلى استثمارات بوليا اليوم؟",
        zh: "欢迎！我是Trullo，您的普利亚欧盟资助和投资助手 🇪🇺\n\n我可以帮助您发现高达50%的项目资助机会。今天是什么让您对普利亚投资感兴趣？",
        ru: "Добро пожаловать! Я Трулло, ваш помощник по грантам ЕС и инвестициям в Апулию 🇪🇺\n\nЯ могу помочь вам найти возможности финансирования до 50% для вашего проекта. Что привело вас к инвестициям в Апулию сегодня?"
      };

      return welcomeMessages[this.conversation.language] || welcomeMessages.en;
    }

    // Request language selection
    this.conversation.state = 'language_selection';
    return "Hello! 👋 Please select your preferred language:\n\n🇬🇧 English\n🇮🇹 Italiano\n🇪🇸 Español\n🇫🇷 Français\n🇩🇪 Deutsch\n🇸🇦 العربية\n🇨🇳 中文\n🇷🇺 Русский";
  }

  private async handleQualifying(message: string): Promise<string> {
    // Use Trullo's existing AI logic with WhatsApp context
    const aiResponse = await this.callTrulloAI(message);
    
    // Check for qualification triggers
    if (this.isReadyForScheduling(message, aiResponse)) {
      this.conversation.state = 'scheduling';
    }
    
    return aiResponse;
  }

  private async callTrulloAI(message: string): Promise<string> {
    const systemPrompt = this.getSystemPrompt(this.conversation.language);
    
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: message }],
        system: systemPrompt,
        language: this.conversation.language,
        context: 'whatsapp'
      })
    });

    const data = await response.json();
    return data.message;
  }
}
```

---

## Multi-Language Support

### 1. Enhanced Language Detection

```typescript
// lib/language-detection.ts
import { franc } from 'franc';

const LANGUAGE_MAPPING = {
  'eng': 'en',
  'ita': 'it',
  'spa': 'es',
  'fra': 'fr',
  'deu': 'de',
  'ara': 'ar',
  'cmn': 'zh',
  'rus': 'ru'
};

export async function detectLanguage(text: string): Promise<Language | null> {
  try {
    // Use franc for initial detection
    const detected = franc(text);
    const language = LANGUAGE_MAPPING[detected as keyof typeof LANGUAGE_MAPPING];
    
    if (language) {
      return language as Language;
    }

    // Fallback: keyword-based detection
    const keywordDetection = detectByKeywords(text);
    return keywordDetection;
  } catch (error) {
    console.error('Language detection failed:', error);
    return 'en'; // Default to English
  }
}

function detectByKeywords(text: string): Language {
  const lowerText = text.toLowerCase();
  
  const patterns = {
    it: ['ciao', 'salve', 'buongiorno', 'grazie', 'prego', 'cosa', 'quando', 'dove'],
    es: ['hola', 'gracias', 'por favor', 'qué', 'cuándo', 'dónde', 'cómo'],
    fr: ['bonjour', 'salut', 'merci', 'où', 'quand', 'comment', 'pourquoi'],
    de: ['hallo', 'guten tag', 'danke', 'bitte', 'wo', 'wann', 'wie', 'warum'],
    ar: ['مرحبا', 'شكرا', 'من فضلك', 'ماذا', 'متى', 'أين', 'كيف'],
    zh: ['你好', '谢谢', '请', '什么', '什么时候', '在哪里', '怎么样'],
    ru: ['привет', 'спасибо', 'пожалуйста', 'что', 'когда', 'где', 'как']
  };

  for (const [lang, keywords] of Object.entries(patterns)) {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      return lang as Language;
    }
  }

  return 'en';
}
```

### 2. Localized Response Templates

```typescript
// lib/whatsapp-templates.ts
export const WHATSAPP_TEMPLATES = {
  en: {
    welcome: "Welcome! I'm Trullo, your EU grants assistant 🇪🇺",
    qualification_intro: "To provide the best guidance, I'd like to understand your investment goals better.",
    budget_question: "What's your approximate investment budget? 💰",
    property_type_question: "What type of property interests you most? 🏘️",
    timeline_question: "What's your investment timeline? ⏰",
    schedule_meeting: "Based on our conversation, I'd recommend scheduling a consultation with Giuseppe. When would be convenient for you?",
    document_sharing: "I'm sending you our comprehensive investment guide. Please review it, and let me know if you have questions! 📋"
  },
  it: {
    welcome: "Benvenuto! Sono Trullo, il tuo assistente per fondi UE 🇪🇺",
    qualification_intro: "Per fornirti la migliore assistenza, vorrei capire meglio i tuoi obiettivi di investimento.",
    budget_question: "Qual è il tuo budget approssimativo per l'investimento? 💰",
    property_type_question: "Che tipo di proprietà ti interessa di più? 🏘️",
    timeline_question: "Quali sono i tempi per il tuo investimento? ⏰",
    schedule_meeting: "Basandomi sulla nostra conversazione, consiglierei di programmare una consulenza con Giuseppe. Quando sarebbe comodo per te?",
    document_sharing: "Ti sto inviando la nostra guida completa agli investimenti. Per favore leggila e fammi sapere se hai domande! 📋"
  },
  // ... additional languages
};
```

---

## Lead Capture & CRM Integration

### 1. Enhanced Lead Scoring

```typescript
// lib/lead-scoring.ts
export interface LeadScoringCriteria {
  budget: number;
  timeframe: number;
  propertyType: number;
  engagement: number;
  contactInfo: number;
}

export class LeadScorer {
  calculateScore(conversation: WhatsAppConversation): number {
    const criteria: LeadScoringCriteria = {
      budget: this.scoreBudget(conversation.userProfile.budget),
      timeframe: this.scoreTimeframe(conversation.userProfile.timeline),
      propertyType: this.scorePropertyType(conversation.userProfile.propertyType),
      engagement: this.scoreEngagement(conversation.metadata.messageCount),
      contactInfo: this.scoreContactInfo(conversation.userProfile)
    };

    const weights = {
      budget: 0.3,
      timeframe: 0.2,
      propertyType: 0.15,
      engagement: 0.2,
      contactInfo: 0.15
    };

    return Object.entries(criteria).reduce((total, [key, value]) => {
      return total + (value * weights[key as keyof LeadScoringCriteria]);
    }, 0);
  }

  private scoreBudget(budget?: string): number {
    if (!budget) return 0;
    
    const ranges = {
      '50000-100000': 60,
      '100000-250000': 80,
      '250000-500000': 90,
      '500000+': 100
    };
    
    return ranges[budget as keyof typeof ranges] || 40;
  }

  private scoreTimeframe(timeline?: string): number {
    if (!timeline) return 0;
    
    const timeframes = {
      'immediate': 100,
      '3-months': 90,
      '6-months': 70,
      '12-months': 50,
      'exploring': 30
    };
    
    return timeframes[timeline as keyof typeof timeframes] || 25;
  }

  private scoreEngagement(messageCount: number): number {
    if (messageCount < 3) return 20;
    if (messageCount < 6) return 50;
    if (messageCount < 10) return 70;
    if (messageCount < 15) return 85;
    return 100;
  }

  private scoreContactInfo(profile: any): number {
    let score = 0;
    if (profile.name) score += 40;
    if (profile.email) score += 60;
    return score;
  }
}
```

### 2. CRM Integration Service

```typescript
// lib/crm-integration.ts
export class CRMIntegration {
  async createLead(conversation: WhatsAppConversation) {
    const leadData = {
      source: 'whatsapp',
      phone_number: conversation.phoneNumber,
      language: conversation.language,
      conversation_state: conversation.state,
      user_profile: conversation.userProfile,
      qualification_score: new LeadScorer().calculateScore(conversation),
      first_contact: conversation.metadata.sessionStart,
      last_activity: conversation.metadata.lastActivity,
      message_count: conversation.metadata.messageCount,
      status: this.determineLeadStatus(conversation)
    };

    // Store in Supabase
    const { data, error } = await supabase
      .from('leads')
      .insert(leadData)
      .select()
      .single();

    if (error) throw error;

    // Trigger automation workflows
    await this.triggerAutomation(data);

    return data;
  }

  private determineLeadStatus(conversation: WhatsAppConversation): string {
    const score = new LeadScorer().calculateScore(conversation);
    
    if (score >= 80) return 'hot';
    if (score >= 60) return 'warm';
    if (score >= 40) return 'cold';
    return 'unqualified';
  }

  private async triggerAutomation(lead: any) {
    // Send to Telegram for immediate notification
    if (lead.qualification_score >= 70) {
      await this.notifyTelegram(lead);
    }

    // Schedule follow-up sequences
    await this.scheduleFollowUp(lead);

    // Update analytics
    await this.updateAnalytics(lead);
  }

  private async notifyTelegram(lead: any) {
    const message = `🚀 High-quality WhatsApp lead!\n\n` +
                   `📱 Phone: ${lead.phone_number}\n` +
                   `🌍 Language: ${lead.language}\n` +
                   `⭐ Score: ${lead.qualification_score}\n` +
                   `📊 Status: ${lead.status}\n\n` +
                   `💰 Budget: ${lead.user_profile?.budget || 'Not specified'}\n` +
                   `🏠 Property: ${lead.user_profile?.propertyType || 'Not specified'}`;

    await fetch('/api/telegram-reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        priority: 'high'
      })
    });
  }
}
```

---

## Automated Follow-up Sequences

### 1. Nurturing Campaign Engine

```typescript
// lib/nurturing-campaigns.ts
export class NurturingEngine {
  private sequences = {
    new_lead: [
      { delay: 0, type: 'welcome_package' },
      { delay: 24, type: 'investment_guide' },
      { delay: 72, type: 'success_stories' },
      { delay: 168, type: 'consultation_reminder' }
    ],
    
    qualified_investor: [
      { delay: 0, type: 'personal_intro' },
      { delay: 12, type: 'property_portfolio' },
      { delay: 48, type: 'grant_calculator' },
      { delay: 120, type: 'meeting_booking' }
    ],
    
    high_value_prospect: [
      { delay: 0, type: 'priority_notification' },
      { delay: 2, type: 'direct_contact' },
      { delay: 24, type: 'custom_proposal' }
    ]
  };

  async startSequence(lead: any, sequenceType: keyof typeof this.sequences) {
    const sequence = this.sequences[sequenceType];
    
    for (const step of sequence) {
      await this.scheduleMessage(lead, step, sequenceType);
    }
  }

  private async scheduleMessage(lead: any, step: any, sequenceType: string) {
    const executeAt = new Date();
    executeAt.setHours(executeAt.getHours() + step.delay);

    await supabase
      .from('scheduled_messages')
      .insert({
        lead_id: lead.id,
        phone_number: lead.phone_number,
        message_type: step.type,
        sequence_type: sequenceType,
        execute_at: executeAt.toISOString(),
        language: lead.language,
        status: 'scheduled'
      });
  }
}

// Scheduled message processor
export async function processScheduledMessages() {
  const { data: messages } = await supabase
    .from('scheduled_messages')
    .select('*')
    .eq('status', 'scheduled')
    .lte('execute_at', new Date().toISOString())
    .limit(50);

  for (const message of messages || []) {
    try {
      await sendScheduledMessage(message);
      
      await supabase
        .from('scheduled_messages')
        .update({ status: 'sent', sent_at: new Date().toISOString() })
        .eq('id', message.id);
    } catch (error) {
      console.error('Failed to send scheduled message:', error);
      
      await supabase
        .from('scheduled_messages')
        .update({ 
          status: 'failed', 
          error_message: error.message,
          retry_count: (message.retry_count || 0) + 1 
        })
        .eq('id', message.id);
    }
  }
}

async function sendScheduledMessage(message: any) {
  const templates = {
    welcome_package: {
      en: "🎯 Here's your complete Puglia investment starter pack!\n\n📋 Investment guide\n💰 Grant opportunities\n🏘️ Property showcase\n\nWhat interests you most?",
      it: "🎯 Ecco il tuo pacchetto completo per investimenti in Puglia!\n\n📋 Guida agli investimenti\n💰 Opportunità di finanziamento\n🏘️ Showcase immobiliare\n\nCosa ti interessa di più?"
    },
    
    investment_guide: {
      en: "📊 Your personalized investment analysis is ready!\n\nBased on our conversation, I've prepared specific recommendations for your budget and goals.\n\nWould you like to schedule a call to discuss details?",
      it: "📊 La tua analisi personalizzata degli investimenti è pronta!\n\nBasandomi sulla nostra conversazione, ho preparato raccomandazioni specifiche per il tuo budget e obiettivi.\n\nVorresti programmare una chiamata per discutere i dettagli?"
    }
  };

  const template = templates[message.message_type as keyof typeof templates];
  const content = template?.[message.language] || template?.en;

  if (content) {
    await sendWhatsAppMessage(
      message.phone_number,
      content,
      message.language
    );
  }
}
```

### 2. Behavioral Triggers

```typescript
// lib/behavioral-triggers.ts
export class BehaviorTriggers {
  async processTrigger(event: string, data: any) {
    switch (event) {
      case 'message_received':
        await this.handleMessageReceived(data);
        break;
        
      case 'link_clicked':
        await this.handleLinkClicked(data);
        break;
        
      case 'document_viewed':
        await this.handleDocumentViewed(data);
        break;
        
      case 'long_silence':
        await this.handleLongSilence(data);
        break;
    }
  }

  private async handleLongSilence(data: any) {
    const { conversation, daysSince } = data;
    
    if (daysSince === 3) {
      const reEngagementMessage = this.getReEngagementMessage(conversation.language, 'gentle');
      await sendWhatsAppMessage(conversation.phoneNumber, reEngagementMessage);
    } else if (daysSince === 7) {
      const reEngagementMessage = this.getReEngagementMessage(conversation.language, 'value_add');
      await sendWhatsAppMessage(conversation.phoneNumber, reEngagementMessage);
    } else if (daysSince === 14) {
      const reEngagementMessage = this.getReEngagementMessage(conversation.language, 'final');
      await sendWhatsAppMessage(conversation.phoneNumber, reEngagementMessage);
    }
  }

  private getReEngagementMessage(language: string, type: 'gentle' | 'value_add' | 'final'): string {
    const messages = {
      gentle: {
        en: "Hi! Just checking in. Do you have any questions about Puglia investments? I'm here to help! 😊",
        it: "Ciao! Solo per vedere come va. Hai domande sugli investimenti in Puglia? Sono qui per aiutarti! 😊"
      },
      value_add: {
        en: "🎯 New grant opportunity just announced!\n\nThe EU increased tourism grants to 55% for Q4 2025. This could be perfect for your investment plans!\n\nInterested in learning more?",
        it: "🎯 Nuova opportunità di finanziamento appena annunciata!\n\nL'UE ha aumentato i finanziamenti per il turismo al 55% per il Q4 2025. Potrebbe essere perfetto per i tuoi piani di investimento!\n\nInteressato a saperne di più?"
      },
      final: {
        en: "This will be my last message unless you'd like to continue our conversation.\n\nI've enjoyed helping you explore Puglia investment opportunities. If you ever want to reconnect, just send me a message!\n\nBest wishes,\nTrullo 🤖",
        it: "Questo sarà il mio ultimo messaggio a meno che tu non voglia continuare la nostra conversazione.\n\nMi è piaciuto aiutarti ad esplorare le opportunità di investimento in Puglia. Se mai vorrai riconnetterti, mandami un messaggio!\n\nI migliori auguri,\nTrullo 🤖"
      }
    };

    return messages[type][language as keyof typeof messages[typeof type]] || messages[type].en;
  }
}
```

---

## Meta-Approved Message Templates

### 1. Template Submission System

```typescript
// lib/template-management.ts
export class TemplateManager {
  private templates = {
    // UTILITY Templates (No 24-hour window required)
    welcome_message: {
      name: 'welcome_message',
      category: 'UTILITY',
      languages: {
        en: {
          header: { type: 'TEXT', text: 'Welcome to InvestInPuglia!' },
          body: { text: 'Hi {{1}}! I\'m Trullo, your EU grants assistant. I can help you discover investment opportunities with up to 50% funding in beautiful Puglia, Italy. How can I assist you today?' },
          footer: { text: 'Powered by InvestInPuglia.eu' }
        },
        it: {
          header: { type: 'TEXT', text: 'Benvenuto in InvestInPuglia!' },
          body: { text: 'Ciao {{1}}! Sono Trullo, il tuo assistente per fondi UE. Posso aiutarti a scoprire opportunità di investimento con finanziamenti fino al 50% nella bellissima Puglia. Come posso aiutarti oggi?' },
          footer: { text: 'Powered by InvestInPuglia.eu' }
        }
      }
    },

    // MARKETING Templates (Require 24-hour window)
    investment_guide: {
      name: 'investment_guide',
      category: 'MARKETING',
      languages: {
        en: {
          header: { type: 'MEDIA', example: 'https://investinpuglia.eu/images/puglia-guide.jpg' },
          body: { text: 'Hi {{1}}! Your personalized Puglia investment guide is ready. Discover properties with guaranteed EU grants up to 50%. Download your free guide now!' },
          footer: { text: 'InvestInPuglia.eu - Your gateway to EU-funded investments' },
          buttons: [
            { type: 'URL', text: 'Download Guide', url: 'https://investinpuglia.eu/guide/{{1}}' },
            { type: 'PHONE_NUMBER', text: 'Call Giuseppe', phone_number: '+393123456789' }
          ]
        }
      }
    },

    appointment_confirmation: {
      name: 'appointment_confirmation',
      category: 'UTILITY',
      languages: {
        en: {
          body: { text: 'Hi {{1}}! Your consultation with Giuseppe is confirmed for {{2}} at {{3}}. Meeting link: {{4}}. Looking forward to discussing your Puglia investment goals!' },
          buttons: [
            { type: 'URL', text: 'Join Meeting', url: '{{4}}' },
            { type: 'PHONE_NUMBER', text: 'Call Giuseppe', phone_number: '+393123456789' }
          ]
        }
      }
    },

    grant_alert: {
      name: 'grant_alert',
      category: 'MARKETING',
      languages: {
        en: {
          header: { type: 'TEXT', text: '🚨 New Grant Opportunity!' },
          body: { text: 'Hi {{1}}! A new {{2}} grant program just opened with {{3}}% funding for eligible projects. Application deadline: {{4}}. Interested in applying?' },
          buttons: [
            { type: 'URL', text: 'Learn More', url: 'https://investinpuglia.eu/grants/{{5}}' },
            { type: 'QUICK_REPLY', text: 'Yes, interested!' },
            { type: 'QUICK_REPLY', text: 'Tell me more' }
          ]
        }
      }
    }
  };

  async submitTemplate(templateName: string, language: string) {
    const template = this.templates[templateName as keyof typeof this.templates];
    if (!template) throw new Error('Template not found');

    const submission = {
      name: `${template.name}_${language}`,
      category: template.category,
      language: language,
      components: this.buildComponents(template.languages[language as keyof typeof template.languages])
    };

    // Submit to Meta via WhatsApp Business API
    const response = await fetch(`https://graph.facebook.com/v18.0/${process.env.WHATSAPP_BUSINESS_ACCOUNT_ID}/message_templates`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.META_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submission)
    });

    const result = await response.json();
    
    // Store submission in database
    await supabase
      .from('whatsapp_templates')
      .insert({
        template_name: submission.name,
        language: language,
        category: template.category,
        content: JSON.stringify(submission.components),
        status: 'pending',
        meta_template_id: result.id
      });

    return result;
  }

  private buildComponents(templateData: any) {
    const components = [];

    if (templateData.header) {
      components.push({
        type: 'HEADER',
        format: templateData.header.type,
        text: templateData.header.text,
        example: templateData.header.example ? {
          header_handle: [templateData.header.example]
        } : undefined
      });
    }

    if (templateData.body) {
      const bodyComponent: any = {
        type: 'BODY',
        text: templateData.body.text
      };

      // Add parameter examples
      const paramCount = (templateData.body.text.match(/\{\{\d+\}\}/g) || []).length;
      if (paramCount > 0) {
        bodyComponent.example = {
          body_text: [
            Array(paramCount).fill(0).map((_, i) => `Parameter${i + 1}`)
          ]
        };
      }

      components.push(bodyComponent);
    }

    if (templateData.footer) {
      components.push({
        type: 'FOOTER',
        text: templateData.footer.text
      });
    }

    if (templateData.buttons && templateData.buttons.length > 0) {
      components.push({
        type: 'BUTTONS',
        buttons: templateData.buttons.map((btn: any) => ({
          type: btn.type,
          text: btn.text,
          url: btn.url,
          phone_number: btn.phone_number
        }))
      });
    }

    return components;
  }

  async sendTemplate(phoneNumber: string, templateName: string, language: string, parameters: string[] = []) {
    const { data: template } = await supabase
      .from('whatsapp_templates')
      .select('*')
      .eq('template_name', `${templateName}_${language}`)
      .eq('status', 'approved')
      .single();

    if (!template) throw new Error('Template not approved or not found');

    const message = {
      to: phoneNumber,
      type: 'template',
      template: {
        name: template.template_name,
        language: { code: language },
        components: this.buildTemplateComponents(parameters)
      }
    };

    return await this.sendWhatsAppTemplateMessage(message);
  }

  private buildTemplateComponents(parameters: string[]) {
    const components = [];
    
    if (parameters.length > 0) {
      components.push({
        type: 'body',
        parameters: parameters.map((param, index) => ({
          type: 'text',
          text: param
        }))
      });
    }

    return components;
  }
}
```

### 2. Template Usage Examples

```typescript
// Usage examples for approved templates
export const templateUsageExamples = {
  // Welcome new users (UTILITY - can be sent anytime)
  async sendWelcome(phoneNumber: string, userName: string, language: string) {
    await templateManager.sendTemplate(
      phoneNumber,
      'welcome_message',
      language,
      [userName]
    );
  },

  // Send investment guide (MARKETING - requires opt-in)
  async sendInvestmentGuide(phoneNumber: string, userName: string, language: string) {
    await templateManager.sendTemplate(
      phoneNumber,
      'investment_guide',
      language,
      [userName]
    );
  },

  // Confirm appointments (UTILITY)
  async confirmAppointment(phoneNumber: string, userName: string, date: string, time: string, meetingLink: string, language: string) {
    await templateManager.sendTemplate(
      phoneNumber,
      'appointment_confirmation',
      language,
      [userName, date, time, meetingLink]
    );
  },

  // Alert about new grants (MARKETING)
  async sendGrantAlert(phoneNumber: string, userName: string, grantType: string, percentage: string, deadline: string, grantId: string, language: string) {
    await templateManager.sendTemplate(
      phoneNumber,
      'grant_alert',
      language,
      [userName, grantType, percentage, deadline, grantId]
    );
  }
};
```

---

## Rich Media Support

### 1. Media Handling Service

```typescript
// lib/media-handler.ts
export class MediaHandler {
  private allowedTypes = {
    image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    video: ['video/mp4', 'video/3gpp'],
    audio: ['audio/aac', 'audio/mp4', 'audio/mpeg', 'audio/amr', 'audio/ogg']
  };

  private maxSizes = {
    image: 5 * 1024 * 1024, // 5MB
    document: 100 * 1024 * 1024, // 100MB
    video: 16 * 1024 * 1024, // 16MB
    audio: 16 * 1024 * 1024 // 16MB
  };

  async handleIncomingMedia(mediaUrl: string, mediaType: string, conversationId: string) {
    try {
      // Download media from WhatsApp
      const mediaBuffer = await this.downloadMedia(mediaUrl);
      
      // Validate media
      const validation = this.validateMedia(mediaBuffer, mediaType);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      // Upload to Supabase Storage
      const uploadPath = await this.uploadToStorage(mediaBuffer, mediaType, conversationId);
      
      // Process based on media type
      const processedData = await this.processMedia(uploadPath, mediaType);
      
      return {
        url: uploadPath,
        type: mediaType,
        size: mediaBuffer.length,
        processedData
      };
    } catch (error) {
      console.error('Media handling error:', error);
      throw error;
    }
  }

  private async downloadMedia(mediaUrl: string): Promise<Buffer> {
    const response = await fetch(mediaUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.META_ACCESS_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to download media: ${response.statusText}`);
    }

    return Buffer.from(await response.arrayBuffer());
  }

  private validateMedia(buffer: Buffer, mediaType: string): { valid: boolean; error?: string } {
    const category = this.getMediaCategory(mediaType);
    
    if (!category) {
      return { valid: false, error: 'Unsupported media type' };
    }

    if (!this.allowedTypes[category].includes(mediaType)) {
      return { valid: false, error: `Media type ${mediaType} not allowed` };
    }

    if (buffer.length > this.maxSizes[category]) {
      return { valid: false, error: `Media size exceeds limit for ${category}` };
    }

    return { valid: true };
  }

  private getMediaCategory(mediaType: string): keyof typeof this.allowedTypes | null {
    if (mediaType.startsWith('image/')) return 'image';
    if (mediaType.startsWith('video/')) return 'video';
    if (mediaType.startsWith('audio/')) return 'audio';
    if (mediaType.includes('pdf') || mediaType.includes('document') || mediaType.includes('word')) return 'document';
    return null;
  }

  private async uploadToStorage(buffer: Buffer, mediaType: string, conversationId: string): Promise<string> {
    const fileName = `${conversationId}/${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const extension = this.getFileExtension(mediaType);
    const fullPath = `whatsapp-media/${fileName}.${extension}`;

    const { data, error } = await supabase.storage
      .from('media')
      .upload(fullPath, buffer, {
        contentType: mediaType,
        upsert: false
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(fullPath);

    return publicUrl;
  }

  private getFileExtension(mediaType: string): string {
    const extensions = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/gif': 'gif',
      'image/webp': 'webp',
      'application/pdf': 'pdf',
      'video/mp4': 'mp4',
      'video/3gpp': '3gp',
      'audio/mpeg': 'mp3',
      'audio/aac': 'aac',
      'audio/mp4': 'm4a',
      'audio/amr': 'amr',
      'audio/ogg': 'ogg'
    };

    return extensions[mediaType as keyof typeof extensions] || 'bin';
  }

  async sendMedia(phoneNumber: string, mediaType: 'image' | 'document' | 'video' | 'audio', mediaUrl: string, caption?: string) {
    const messageData: any = {
      from: 'whatsapp:' + process.env.TWILIO_WHATSAPP_NUMBER,
      to: 'whatsapp:' + phoneNumber,
      mediaUrl: [mediaUrl]
    };

    if (caption) {
      messageData.body = caption;
    }

    return await client.messages.create(messageData);
  }

  // Property showcase specific media handling
  async sendPropertyShowcase(phoneNumber: string, propertyId: string, language: string) {
    const property = await this.getPropertyData(propertyId);
    
    // Send property images
    for (const image of property.images.slice(0, 3)) {
      await this.sendMedia(phoneNumber, 'image', image.url, this.getImageCaption(image, language));
      await new Promise(resolve => setTimeout(resolve, 1000)); // Rate limiting
    }

    // Send property brochure
    if (property.brochureUrl) {
      await this.sendMedia(
        phoneNumber, 
        'document', 
        property.brochureUrl, 
        this.getBrochureCaption(property, language)
      );
    }

    // Send virtual tour video if available
    if (property.virtualTourUrl) {
      await this.sendMedia(
        phoneNumber,
        'video',
        property.virtualTourUrl,
        this.getVideoCaption(property, language)
      );
    }
  }

  private getImageCaption(image: any, language: string): string {
    const captions = {
      en: `🏘️ ${image.title}\n💰 Price: €${image.price?.toLocaleString()}\n📍 ${image.location}`,
      it: `🏘️ ${image.title}\n💰 Prezzo: €${image.price?.toLocaleString()}\n📍 ${image.location}`
    };

    return captions[language as keyof typeof captions] || captions.en;
  }

  private getBrochureCaption(property: any, language: string): string {
    const captions = {
      en: `📋 Complete property details for ${property.title}\n\nIncludes:\n• Investment analysis\n• Grant opportunities\n• Legal requirements\n• ROI projections`,
      it: `📋 Dettagli completi della proprietà per ${property.title}\n\nInclude:\n• Analisi dell'investimento\n• Opportunità di finanziamento\n• Requisiti legali\n• Proiezioni ROI`
    };

    return captions[language as keyof typeof captions] || captions.en;
  }
}
```

---

## Calendly Integration

### 1. Appointment Scheduling Service

```typescript
// lib/calendly-integration.ts
export class CalendlyIntegration {
  private baseUrl = 'https://api.calendly.com';
  
  async createSchedulingLink(phoneNumber: string, language: string, leadData: any): Promise<string> {
    try {
      // Create personalized scheduling link
      const schedulingLink = await this.generatePersonalizedLink(leadData, language);
      
      // Store scheduling attempt
      await supabase
        .from('scheduling_attempts')
        .insert({
          phone_number: phoneNumber,
          language: language,
          lead_data: leadData,
          calendly_link: schedulingLink,
          status: 'sent'
        });

      return schedulingLink;
    } catch (error) {
      console.error('Calendly integration error:', error);
      throw error;
    }
  }

  private async generatePersonalizedLink(leadData: any, language: string): Promise<string> {
    const baseLink = 'https://calendly.com/investinpuglia/30min';
    
    // Add UTM parameters and prefill data
    const params = new URLSearchParams({
      utm_source: 'whatsapp',
      utm_medium: 'chatbot',
      utm_campaign: 'trullo_integration',
      utm_content: leadData.qualification_score >= 70 ? 'high_value' : 'standard',
      prefill_name: leadData.name || '',
      prefill_email: leadData.email || '',
      prefill_phone: leadData.phoneNumber || '',
      prefill_a1: leadData.budget || '',
      prefill_a2: leadData.propertyType || '',
      prefill_a3: leadData.timeline || '',
      lang: language
    });

    return `${baseLink}?${params.toString()}`;
  }

  async handleWebhook(eventType: string, payload: any) {
    switch (eventType) {
      case 'invitee.created':
        await this.handleAppointmentBooked(payload);
        break;
        
      case 'invitee.canceled':
        await this.handleAppointmentCanceled(payload);
        break;
        
      case 'invitee_no_show.created':
        await this.handleNoShow(payload);
        break;
    }
  }

  private async handleAppointmentBooked(payload: any) {
    const { event, invitee } = payload;
    
    // Extract phone number from custom questions or notes
    const phoneNumber = this.extractPhoneFromCalendlyData(invitee);
    
    if (!phoneNumber) {
      console.warn('Could not extract phone number from Calendly booking');
      return;
    }

    // Update lead status
    await supabase
      .from('leads')
      .update({ 
        status: 'appointment_scheduled',
        appointment_date: event.start_time,
        calendly_event_id: event.uuid
      })
      .eq('phone_number', phoneNumber);

    // Send confirmation via WhatsApp
    await this.sendAppointmentConfirmation(phoneNumber, event, invitee);

    // Notify Giuseppe via Telegram
    await this.notifyAppointmentBooked(phoneNumber, event, invitee);
  }

  private async sendAppointmentConfirmation(phoneNumber: string, event: any, invitee: any) {
    const language = this.detectLanguageFromInvitee(invitee);
    const eventDate = new Date(event.start_time);
    
    const confirmationMessages = {
      en: `✅ Your consultation with Giuseppe is confirmed!\n\n📅 Date: ${eventDate.toLocaleDateString()}\n⏰ Time: ${eventDate.toLocaleTimeString()}\n🔗 Meeting: ${event.location?.join_url || 'Details in email'}\n\n🎯 We'll discuss your Puglia investment goals and available EU grants up to 50%!\n\nLooking forward to speaking with you!`,
      
      it: `✅ La tua consulenza con Giuseppe è confermata!\n\n📅 Data: ${eventDate.toLocaleDateString()}\n⏰ Ora: ${eventDate.toLocaleTimeString()}\n🔗 Meeting: ${event.location?.join_url || 'Dettagli nella email'}\n\n🎯 Discuteremo dei tuoi obiettivi di investimento in Puglia e dei finanziamenti UE disponibili fino al 50%!\n\nNon vedo l'ora di parlare con te!`
    };

    const message = confirmationMessages[language as keyof typeof confirmationMessages] || confirmationMessages.en;
    
    await sendWhatsAppMessage(phoneNumber.replace('whatsapp:', ''), message, language);
  }

  private async notifyAppointmentBooked(phoneNumber: string, event: any, invitee: any) {
    const eventDate = new Date(event.start_time);
    
    const telegramMessage = `📅 NEW APPOINTMENT BOOKED!\n\n` +
                           `👤 Name: ${invitee.name}\n` +
                           `📱 Phone: ${phoneNumber}\n` +
                           `📧 Email: ${invitee.email}\n` +
                           `📅 Date: ${eventDate.toLocaleDateString()}\n` +
                           `⏰ Time: ${eventDate.toLocaleTimeString()}\n` +
                           `🔗 Meeting: ${event.location?.join_url || 'No link'}\n\n` +
                           `💡 Source: WhatsApp Trullo Bot\n` +
                           `🎯 High-value prospect - prepare accordingly!`;

    await fetch('/api/telegram-reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: telegramMessage,
        priority: 'urgent'
      })
    });
  }

  // Reminder system
  async sendAppointmentReminders() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const { data: appointments } = await supabase
      .from('leads')
      .select('*')
      .eq('status', 'appointment_scheduled')
      .gte('appointment_date', tomorrow.toISOString().split('T')[0])
      .lt('appointment_date', new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]);

    for (const appointment of appointments || []) {
      await this.sendReminder(appointment);
    }
  }

  private async sendReminder(appointment: any) {
    const appointmentDate = new Date(appointment.appointment_date);
    const language = appointment.language || 'en';

    const reminderMessages = {
      en: `⏰ Reminder: Your consultation with Giuseppe is tomorrow!\n\n📅 ${appointmentDate.toLocaleDateString()}\n⏰ ${appointmentDate.toLocaleTimeString()}\n\n💼 Please prepare:\n• Your investment budget range\n• Preferred property types\n• Questions about EU grants\n\nSee you tomorrow!`,
      
      it: `⏰ Promemoria: La tua consulenza con Giuseppe è domani!\n\n📅 ${appointmentDate.toLocaleDateString()}\n⏰ ${appointmentDate.toLocaleTimeString()}\n\n💼 Prepara:\n• Il tuo budget di investimento\n• I tipi di proprietà preferiti\n• Domande sui finanziamenti UE\n\nA domani!`
    };

    const message = reminderMessages[language as keyof typeof reminderMessages] || reminderMessages.en;
    
    await sendWhatsAppMessage(appointment.phone_number, message, language);
  }
}
```

---

## Analytics & Conversion Tracking

### 1. Comprehensive Analytics System

```typescript
// lib/whatsapp-analytics.ts
export class WhatsAppAnalytics {
  async trackEvent(event: string, data: any) {
    const analyticsData = {
      event_type: event,
      phone_number: data.phoneNumber,
      conversation_id: data.conversationId,
      language: data.language,
      timestamp: new Date().toISOString(),
      data: data,
      session_id: data.sessionId
    };

    await supabase
      .from('whatsapp_analytics')
      .insert(analyticsData);

    // Real-time dashboard updates
    await this.updateRealTimeDashboard(event, data);
  }

  async generateDailyReport(): Promise<DailyAnalyticsReport> {
    const today = new Date().toISOString().split('T')[0];
    
    const [conversations, messages, conversions, mediaShared] = await Promise.all([
      this.getConversationMetrics(today),
      this.getMessageMetrics(today),
      this.getConversionMetrics(today),
      this.getMediaMetrics(today)
    ]);

    return {
      date: today,
      conversations,
      messages,
      conversions,
      mediaShared,
      generatedAt: new Date().toISOString()
    };
  }

  private async getConversationMetrics(date: string) {
    const { data } = await supabase
      .from('whatsapp_conversations')
      .select('*')
      .gte('created_at', `${date}T00:00:00`)
      .lt('created_at', `${date}T23:59:59`);

    const byLanguage = data?.reduce((acc, conv) => {
      acc[conv.language] = (acc[conv.language] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

    return {
      total: data?.length || 0,
      byLanguage,
      newConversations: data?.length || 0,
      averageSessionLength: await this.calculateAverageSessionLength(date)
    };
  }

  private async getMessageMetrics(date: string) {
    const { data } = await supabase
      .from('whatsapp_messages')
      .select('*')
      .gte('created_at', `${date}T00:00:00`)
      .lt('created_at', `${date}T23:59:59`);

    const inbound = data?.filter(m => m.direction === 'inbound').length || 0;
    const outbound = data?.filter(m => m.direction === 'outbound').length || 0;

    return {
      total: data?.length || 0,
      inbound,
      outbound,
      responseRate: inbound > 0 ? (outbound / inbound) : 0,
      averageResponseTime: await this.calculateAverageResponseTime(date)
    };
  }

  private async getConversionMetrics(date: string) {
    const { data: leads } = await supabase
      .from('leads')
      .select('*')
      .eq('source', 'whatsapp')
      .gte('created_at', `${date}T00:00:00`)
      .lt('created_at', `${date}T23:59:59`);

    const appointments = leads?.filter(l => l.status === 'appointment_scheduled').length || 0;
    const qualified = leads?.filter(l => l.qualification_score >= 60).length || 0;

    return {
      totalLeads: leads?.length || 0,
      qualifiedLeads: qualified,
      appointmentsBooked: appointments,
      conversionRate: (leads?.length || 0) > 0 ? (appointments / (leads?.length || 1)) : 0,
      averageQualificationScore: leads?.reduce((sum, l) => sum + (l.qualification_score || 0), 0) / (leads?.length || 1)
    };
  }

  private async getMediaMetrics(date: string) {
    const { data } = await supabase
      .from('whatsapp_messages')
      .select('*')
      .eq('message_type', 'media')
      .gte('created_at', `${date}T00:00:00`)
      .lt('created_at', `${date}T23:59:59`);

    const sent = data?.filter(m => m.direction === 'outbound').length || 0;
    const received = data?.filter(m => m.direction === 'inbound').length || 0;

    return {
      total: data?.length || 0,
      sent,
      received,
      propertyShowcases: await this.countPropertyShowcases(date),
      documentShares: await this.countDocumentShares(date)
    };
  }

  // Real-time conversion tracking
  async trackConversion(phoneNumber: string, conversionType: 'lead' | 'appointment' | 'qualification' | 'email_capture') {
    const conversion = {
      phone_number: phoneNumber,
      conversion_type: conversionType,
      timestamp: new Date().toISOString(),
      source: 'whatsapp'
    };

    await supabase
      .from('conversions')
      .insert(conversion);

    // Trigger real-time notifications for high-value conversions
    if (conversionType === 'appointment') {
      await this.notifyHighValueConversion(phoneNumber, conversionType);
    }
  }

  // Funnel analysis
  async generateFunnelAnalysis(dateRange: { start: string; end: string }) {
    const steps = [
      'conversation_started',
      'language_selected',
      'qualifying_questions_answered',
      'contact_information_provided',
      'appointment_scheduled',
      'appointment_completed'
    ];

    const funnelData = [];

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      const count = await this.getStepCount(step, dateRange);
      const dropoffRate = i > 0 ? ((funnelData[i - 1].count - count) / funnelData[i - 1].count) * 100 : 0;

      funnelData.push({
        step,
        count,
        dropoffRate: Math.round(dropoffRate * 100) / 100
      });
    }

    return funnelData;
  }

  // A/B Testing Support
  async trackABTest(testName: string, variant: string, phoneNumber: string, outcome: string) {
    await supabase
      .from('ab_tests')
      .insert({
        test_name: testName,
        variant: variant,
        phone_number: phoneNumber,
        outcome: outcome,
        timestamp: new Date().toISOString()
      });
  }

  async getABTestResults(testName: string) {
    const { data } = await supabase
      .from('ab_tests')
      .select('*')
      .eq('test_name', testName);

    const results = data?.reduce((acc, test) => {
      const variant = test.variant;
      if (!acc[variant]) {
        acc[variant] = { total: 0, conversions: 0 };
      }
      acc[variant].total++;
      if (test.outcome === 'conversion') {
        acc[variant].conversions++;
      }
      return acc;
    }, {} as Record<string, { total: number; conversions: number }>);

    // Calculate conversion rates and statistical significance
    return Object.entries(results || {}).map(([variant, data]) => ({
      variant,
      total: data.total,
      conversions: data.conversions,
      conversionRate: (data.conversions / data.total) * 100,
      sampleSize: data.total
    }));
  }
}

interface DailyAnalyticsReport {
  date: string;
  conversations: {
    total: number;
    byLanguage: Record<string, number>;
    newConversations: number;
    averageSessionLength: number;
  };
  messages: {
    total: number;
    inbound: number;
    outbound: number;
    responseRate: number;
    averageResponseTime: number;
  };
  conversions: {
    totalLeads: number;
    qualifiedLeads: number;
    appointmentsBooked: number;
    conversionRate: number;
    averageQualificationScore: number;
  };
  mediaShared: {
    total: number;
    sent: number;
    received: number;
    propertyShowcases: number;
    documentShares: number;
  };
  generatedAt: string;
}
```

### 2. Dashboard API Endpoints

```typescript
// app/api/whatsapp/analytics/route.ts
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const timeframe = searchParams.get('timeframe') || '7d';
  const metric = searchParams.get('metric') || 'overview';

  const analytics = new WhatsAppAnalytics();

  try {
    switch (metric) {
      case 'overview':
        const overview = await analytics.getOverviewMetrics(timeframe);
        return NextResponse.json(overview);
        
      case 'funnel':
        const funnelData = await analytics.generateFunnelAnalysis(getDateRange(timeframe));
        return NextResponse.json(funnelData);
        
      case 'languages':
        const languageBreakdown = await analytics.getLanguageBreakdown(timeframe);
        return NextResponse.json(languageBreakdown);
        
      case 'conversions':
        const conversionData = await analytics.getConversionMetrics(timeframe);
        return NextResponse.json(conversionData);
        
      default:
        return NextResponse.json({ error: 'Invalid metric' }, { status: 400 });
    }
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

---

## GDPR Compliance

### 1. Data Protection Framework

```typescript
// lib/gdpr-compliance.ts
export class GDPRCompliance {
  async recordConsent(phoneNumber: string, consentType: 'marketing' | 'processing' | 'storage', granted: boolean) {
    const consent = {
      phone_number: phoneNumber,
      consent_type: consentType,
      granted: granted,
      timestamp: new Date().toISOString(),
      ip_address: null, // WhatsApp doesn't provide IP
      user_agent: 'WhatsApp',
      source: 'whatsapp_bot'
    };

    await supabase
      .from('gdpr_consents')
      .insert(consent);

    // Update user's consent status
    await this.updateConsentStatus(phoneNumber, consentType, granted);
  }

  async requestConsent(phoneNumber: string, language: string): Promise<string> {
    const consentMessages = {
      en: `🔒 Privacy & Data Protection\n\nTo provide you with personalized investment guidance, I need your consent to:\n\n✅ Process your messages and preferences\n✅ Store your conversation for service improvement\n✅ Send you relevant investment opportunities\n\nYour data is protected according to GDPR standards. You can withdraw consent anytime by typing "STOP".\n\nDo you agree to these terms? Reply "YES" to continue or "NO" to opt out.`,
      
      it: `🔒 Privacy e Protezione Dati\n\nPer fornirti una guida personalizzata agli investimenti, ho bisogno del tuo consenso per:\n\n✅ Elaborare i tuoi messaggi e preferenze\n✅ Conservare la conversazione per migliorare il servizio\n✅ Inviarti opportunità di investimento rilevanti\n\nI tuoi dati sono protetti secondo gli standard GDPR. Puoi ritirare il consenso in qualsiasi momento digitando "STOP".\n\nAccetti questi termini? Rispondi "SÌ" per continuare o "NO" per rinunciare.`,

      de: `🔒 Datenschutz & Datenverarbeitung\n\nUm Ihnen personalisierte Investmentberatung zu bieten, benötige ich Ihre Einwilligung für:\n\n✅ Verarbeitung Ihrer Nachrichten und Präferenzen\n✅ Speicherung Ihrer Unterhaltung zur Serviceverbesserung\n✅ Zusendung relevanter Investmentmöglichkeiten\n\nIhre Daten werden gemäß DSGVO-Standards geschützt. Sie können die Einwilligung jederzeit durch "STOPP" widerrufen.\n\nStimmen Sie diesen Bedingungen zu? Antworten Sie "JA" zum Fortfahren oder "NEIN" zum Ablehnen.`,

      fr: `🔒 Confidentialité & Protection des Données\n\nPour vous fournir des conseils d'investissement personnalisés, j'ai besoin de votre consentement pour :\n\n✅ Traiter vos messages et préférences\n✅ Stocker votre conversation pour améliorer le service\n✅ Vous envoyer des opportunités d'investissement pertinentes\n\nVos données sont protégées selon les normes RGPD. Vous pouvez retirer votre consentement à tout moment en tapant "STOP".\n\nAcceptez-vous ces conditions ? Répondez "OUI" pour continuer ou "NON" pour refuser.`,

      es: `🔒 Privacidad y Protección de Datos\n\nPara proporcionarte orientación de inversión personalizada, necesito tu consentimiento para:\n\n✅ Procesar tus mensajes y preferencias\n✅ Almacenar tu conversación para mejorar el servicio\n✅ Enviarte oportunidades de inversión relevantes\n\nTus datos están protegidos según los estándares RGPD. Puedes retirar el consentimiento en cualquier momento escribiendo "PARAR".\n\n¿Aceptas estos términos? Responde "SÍ" para continuar o "NO" para declinar.`,

      ar: `🔒 الخصوصية وحماية البيانات\n\nلتقديم إرشادات استثمارية شخصية، أحتاج موافقتك على:\n\n✅ معالجة رسائلك وتفضيلاتك\n✅ حفظ محادثتك لتحسين الخدمة\n✅ إرسال فرص استثمارية مناسبة\n\nبياناتك محمية وفقاً لمعايير GDPR. يمكنك سحب الموافقة في أي وقت بكتابة "توقف".\n\nهل توافق على هذه الشروط؟ أجب "نعم" للمتابعة أو "لا" للرفض.`,

      zh: `🔒 隐私与数据保护\n\n为了为您提供个性化投资指导，我需要您同意：\n\n✅ 处理您的消息和偏好\n✅ 存储您的对话以改进服务\n✅ 向您发送相关投资机会\n\n您的数据按GDPR标准受到保护。您可以随时通过输入"停止"撤回同意。\n\n您同意这些条款吗？回复"是"继续或"否"退出。`,

      ru: `🔒 Конфиденциальность и Защита Данных\n\nДля предоставления персонализированных инвестиционных советов мне нужно ваше согласие на:\n\n✅ Обработку ваших сообщений и предпочтений\n✅ Хранение вашего разговора для улучшения сервиса\n✅ Отправку релевантных инвестиционных возможностей\n\nВаши данные защищены в соответствии со стандартами GDPR. Вы можете отозвать согласие в любое время, написав "СТОП".\n\nВы согласны с этими условиями? Ответьте "ДА" для продолжения или "НЕТ" для отказа.`
    };

    return consentMessages[language as keyof typeof consentMessages] || consentMessages.en;
  }

  async handleConsentResponse(phoneNumber: string, response: string, language: string): Promise<{ granted: boolean; message: string }> {
    const positiveResponses = {
      en: ['yes', 'y', 'agree', 'accept', 'ok', 'okay'],
      it: ['sì', 'si', 'yes', 'accetto', 'ok', 'okay'],
      de: ['ja', 'yes', 'einverstanden', 'ok', 'okay'],
      fr: ['oui', 'yes', 'ok', 'okay', 'accepte'],
      es: ['sí', 'si', 'yes', 'acepto', 'ok', 'okay'],
      ar: ['نعم', 'yes', 'موافق', 'أوافق'],
      zh: ['是', 'yes', '同意', '好的'],
      ru: ['да', 'yes', 'согласен', 'ok']
    };

    const negativeResponses = {
      en: ['no', 'n', 'decline', 'refuse', 'stop'],
      it: ['no', 'rifiuto', 'stop'],
      de: ['nein', 'no', 'ablehnen', 'stopp'],
      fr: ['non', 'no', 'refuse', 'stop'],
      es: ['no', 'rechazo', 'parar'],
      ar: ['لا', 'no', 'توقف'],
      zh: ['否', 'no', '停止'],
      ru: ['нет', 'no', 'стоп']
    };

    const normalizedResponse = response.toLowerCase().trim();
    const langResponses = positiveResponses[language as keyof typeof positiveResponses] || positiveResponses.en;
    const langNegatives = negativeResponses[language as keyof typeof negativeResponses] || negativeResponses.en;

    const granted = langResponses.includes(normalizedResponse);
    const declined = langNegatives.includes(normalizedResponse);

    if (granted) {
      // Record all necessary consents
      await Promise.all([
        this.recordConsent(phoneNumber, 'processing', true),
        this.recordConsent(phoneNumber, 'storage', true),
        this.recordConsent(phoneNumber, 'marketing', true)
      ]);

      const successMessages = {
        en: `✅ Thank you for your consent! I can now provide personalized investment guidance. Your privacy is important to us - all data is encrypted and handled according to GDPR standards.\n\nHow can I help you with Puglia investments today?`,
        it: `✅ Grazie per il tuo consenso! Ora posso fornire una guida personalizzata agli investimenti. La tua privacy è importante per noi - tutti i dati sono crittografati e gestiti secondo gli standard GDPR.\n\nCome posso aiutarti con gli investimenti in Puglia oggi?`
      };

      return {
        granted: true,
        message: successMessages[language as keyof typeof successMessages] || successMessages.en
      };
    } else if (declined) {
      await this.recordConsent(phoneNumber, 'processing', false);

      const declineMessages = {
        en: `🔒 I understand and respect your decision. Without consent, I cannot provide personalized services, but you can still:\n\n• Visit investinpuglia.eu for general information\n• Contact Giuseppe directly at info@investinpuglia.eu\n• Call +39 XXX XXX XXXX\n\nIf you change your mind, just send "START" to begin again.`,
        it: `🔒 Capisco e rispetto la tua decisione. Senza consenso, non posso fornire servizi personalizzati, ma puoi ancora:\n\n• Visitare investinpuglia.eu per informazioni generali\n• Contattare Giuseppe direttamente a info@investinpuglia.eu\n• Chiamare +39 XXX XXX XXXX\n\nSe cambi idea, invia "INIZIA" per ricominciare.`
      };

      return {
        granted: false,
        message: declineMessages[language as keyof typeof declineMessages] || declineMessages.en
      };
    }

    // Invalid response
    const clarificationMessages = {
      en: `I didn't understand your response. Please reply with "YES" to agree to data processing or "NO" to decline.`,
      it: `Non ho capito la tua risposta. Per favore rispondi con "SÌ" per accettare il trattamento dei dati o "NO" per rifiutare.`
    };

    return {
      granted: false,
      message: clarificationMessages[language as keyof typeof clarificationMessages] || clarificationMessages.en
    };
  }

  async handleDataSubjectRequest(phoneNumber: string, requestType: 'access' | 'deletion' | 'portability' | 'rectification') {
    const request = {
      phone_number: phoneNumber,
      request_type: requestType,
      status: 'pending',
      submitted_at: new Date().toISOString(),
      must_respond_by: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
    };

    const { data } = await supabase
      .from('gdpr_requests')
      .insert(request)
      .select()
      .single();

    // Notify admin immediately
    await this.notifyAdminOfGDPRRequest(request);

    return data;
  }

  async processDataDeletion(phoneNumber: string): Promise<{ success: boolean; details: string[] }> {
    const deletionTasks = [];

    try {
      // Delete conversations and messages
      const { error: messagesError } = await supabase
        .from('whatsapp_messages')
        .delete()
        .in('conversation_id', 
          supabase
            .from('whatsapp_conversations')
            .select('id')
            .eq('phone_number', phoneNumber)
        );

      const { error: conversationsError } = await supabase
        .from('whatsapp_conversations')
        .delete()
        .eq('phone_number', phoneNumber);

      // Delete lead data
      const { error: leadsError } = await supabase
        .from('leads')
        .delete()
        .eq('phone_number', phoneNumber);

      // Delete analytics data
      const { error: analyticsError } = await supabase
        .from('whatsapp_analytics')
        .delete()
        .eq('phone_number', phoneNumber);

      // Delete consent records (keep for legal compliance)
      await supabase
        .from('gdpr_consents')
        .update({ data_deleted: true })
        .eq('phone_number', phoneNumber);

      const details = [
        'Conversations and messages deleted',
        'Lead information removed',
        'Analytics data anonymized',
        'Consent records marked as deleted'
      ];

      if (messagesError || conversationsError || leadsError || analyticsError) {
        throw new Error('Some deletion operations failed');
      }

      return { success: true, details };
    } catch (error) {
      return { 
        success: false, 
        details: [`Deletion failed: ${error.message}`] 
      };
    }
  }

  async generateDataExport(phoneNumber: string): Promise<any> {
    const [conversations, messages, leads, consents, analytics] = await Promise.all([
      supabase.from('whatsapp_conversations').select('*').eq('phone_number', phoneNumber),
      supabase.from('whatsapp_messages').select('*').in('conversation_id',
        supabase.from('whatsapp_conversations').select('id').eq('phone_number', phoneNumber)
      ),
      supabase.from('leads').select('*').eq('phone_number', phoneNumber),
      supabase.from('gdpr_consents').select('*').eq('phone_number', phoneNumber),
      supabase.from('whatsapp_analytics').select('*').eq('phone_number', phoneNumber)
    ]);

    return {
      export_date: new Date().toISOString(),
      phone_number: phoneNumber,
      data: {
        conversations: conversations.data || [],
        messages: messages.data || [],
        leads: leads.data || [],
        consents: consents.data || [],
        analytics: analytics.data || []
      },
      retention_policy: '2 years from last interaction',
      contact_info: 'dpo@investinpuglia.eu'
    };
  }
}
```

---

## Cost Optimization

### 1. WhatsApp API Cost Management

```typescript
// lib/cost-optimization.ts
export class CostOptimizer {
  private readonly costs = {
    // WhatsApp Business API pricing (per message)
    marketing_messages: {
      'authentication': 0.005,
      'marketing': 0.0175,
      'utility': 0.005,
      'service': 0.01
    },
    // Conversation-based pricing
    user_initiated: 0.005, // 24-hour window
    business_initiated: 0.0175 // Requires template
  };

  async optimizeMessageSending(phoneNumber: string, messageType: 'marketing' | 'utility' | 'service', content: string) {
    const costAnalysis = await this.analyzeCostEffectiveness(phoneNumber, messageType);
    
    if (!costAnalysis.shouldSend) {
      console.log(`Cost optimization blocked message to ${phoneNumber}: ${costAnalysis.reason}`);
      return { sent: false, reason: costAnalysis.reason, estimatedSavings: costAnalysis.estimatedCost };
    }

    // Check if we're within user-initiated 24-hour window (free)
    const withinFreeWindow = await this.isWithinFreeWindow(phoneNumber);
    
    if (withinFreeWindow && messageType !== 'marketing') {
      // Send as regular message (no template needed)
      return await this.sendRegularMessage(phoneNumber, content);
    } else {
      // Must use template for business-initiated messages
      return await this.sendTemplateMessage(phoneNumber, messageType, content);
    }
  }

  private async analyzeCostEffectiveness(phoneNumber: string, messageType: string): Promise<CostAnalysisResult> {
    const lead = await this.getLeadData(phoneNumber);
    
    if (!lead) {
      return { shouldSend: false, reason: 'No lead data available', estimatedCost: 0 };
    }

    const analysis = {
      leadScore: lead.qualification_score || 0,
      engagementRate: await this.calculateEngagementRate(phoneNumber),
      lastInteraction: lead.last_activity,
      messagesSent: await this.getMessageCount(phoneNumber),
      estimatedCost: this.costs.marketing_messages[messageType as keyof typeof this.costs.marketing_messages] || 0.01
    };

    // Don't send marketing messages to low-quality leads
    if (messageType === 'marketing' && analysis.leadScore < 40) {
      return { 
        shouldSend: false, 
        reason: 'Lead score too low for marketing messages', 
        estimatedCost: analysis.estimatedCost 
      };
    }

    // Don't send to inactive users (no response in 30 days)
    const daysSinceLastInteraction = analysis.lastInteraction ? 
      Math.floor((Date.now() - new Date(analysis.lastInteraction).getTime()) / (1000 * 60 * 60 * 24)) : 999;
    
    if (daysSinceLastInteraction > 30) {
      return { 
        shouldSend: false, 
        reason: 'User inactive for more than 30 days', 
        estimatedCost: analysis.estimatedCost 
      };
    }

    // Limit marketing messages per user per month
    if (messageType === 'marketing') {
      const marketingMessagesThisMonth = await this.getMonthlyMarketingMessageCount(phoneNumber);
      if (marketingMessagesThisMonth >= 4) {
        return { 
          shouldSend: false, 
          reason: 'Monthly marketing message limit reached', 
          estimatedCost: analysis.estimatedCost 
        };
      }
    }

    return { shouldSend: true, reason: 'Cost-effective to send', estimatedCost: analysis.estimatedCost };
  }

  async batchOptimization(messages: PendingMessage[]): Promise<BatchOptimizationResult> {
    const results = {
      sent: [] as PendingMessage[],
      blocked: [] as PendingMessage[],
      totalCostSavings: 0,
      optimization_details: [] as string[]
    };

    // Group messages by user to optimize conversation windows
    const messagesByUser = this.groupMessagesByUser(messages);

    for (const [phoneNumber, userMessages] of messagesByUser.entries()) {
      const optimized = await this.optimizeUserMessages(phoneNumber, userMessages);
      
      results.sent.push(...optimized.sent);
      results.blocked.push(...optimized.blocked);
      results.totalCostSavings += optimized.costSavings;
      results.optimization_details.push(...optimized.details);
    }

    // Apply rate limiting to prevent hitting WhatsApp limits
    results.sent = this.applyRateLimiting(results.sent);

    return results;
  }

  private async optimizeUserMessages(phoneNumber: string, messages: PendingMessage[]): Promise<UserOptimizationResult> {
    const result: UserOptimizationResult = {
      sent: [],
      blocked: [],
      costSavings: 0,
      details: []
    };

    // Check if user is within free 24-hour window
    const withinFreeWindow = await this.isWithinFreeWindow(phoneNumber);
    
    if (withinFreeWindow) {
      // Combine multiple messages into one to maximize free window
      const combinedMessage = this.combineMessages(messages.filter(m => m.type !== 'marketing'));
      if (combinedMessage) {
        result.sent.push(combinedMessage);
        result.costSavings += (messages.length - 1) * 0.005; // Saved by combining
        result.details.push(`Combined ${messages.length} messages for ${phoneNumber} within free window`);
      }

      // Block marketing messages within free window (waste of opportunity)
      const marketingMessages = messages.filter(m => m.type === 'marketing');
      result.blocked.push(...marketingMessages);
      result.details.push(`Blocked ${marketingMessages.length} marketing messages within free window`);
    } else {
      // Outside free window - prioritize by importance and cost
      const prioritized = this.prioritizeMessages(messages);
      
      // Send only high-priority messages
      result.sent = prioritized.highPriority;
      result.blocked = prioritized.lowPriority;
      
      result.costSavings = prioritized.lowPriority.length * 0.0175; // Average cost saved
      result.details.push(`Prioritized messages for ${phoneNumber}: sent ${result.sent.length}, blocked ${result.blocked.length}`);
    }

    return result;
  }

  // Message batching to maximize 24-hour conversation windows
  async scheduleBatchSending(messages: PendingMessage[]) {
    const batches = this.createOptimalBatches(messages);
    
    for (const batch of batches) {
      await this.processBatch(batch);
      
      // Wait between batches to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  private createOptimalBatches(messages: PendingMessage[]): MessageBatch[] {
    const batches: MessageBatch[] = [];
    const messagesByUser = this.groupMessagesByUser(messages);

    for (const [phoneNumber, userMessages] of messagesByUser.entries()) {
      // Create batches that maximize 24-hour windows
      const userBatches = this.optimizeUserBatching(phoneNumber, userMessages);
      batches.push(...userBatches);
    }

    // Sort batches by cost efficiency
    return batches.sort((a, b) => b.efficiency - a.efficiency);
  }

  // Real-time cost monitoring
  async getCurrentMonthlyCosts(): Promise<MonthlyCostSummary> {
    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM

    const { data: messages } = await supabase
      .from('whatsapp_messages')
      .select('message_type, direction, created_at')
      .gte('created_at', `${currentMonth}-01`)
      .eq('direction', 'outbound');

    const costBreakdown = messages?.reduce((acc, msg) => {
      const category = this.getMessageCategory(msg.message_type);
      const cost = this.costs.marketing_messages[category] || 0.01;
      
      acc[category] = (acc[category] || 0) + cost;
      acc.total += cost;
      
      return acc;
    }, { total: 0 } as Record<string, number>) || { total: 0 };

    return {
      month: currentMonth,
      totalCost: costBreakdown.total,
      breakdown: costBreakdown,
      messagesCount: messages?.length || 0,
      averageCostPerMessage: costBreakdown.total / (messages?.length || 1),
      projectedMonthlyCost: this.projectMonthlyCost(costBreakdown.total),
      budgetStatus: this.getBudgetStatus(costBreakdown.total)
    };
  }

  // Cost alerts and budgeting
  async checkBudgetAlerts(): Promise<BudgetAlert[]> {
    const monthlyCosts = await this.getCurrentMonthlyCosts();
    const alerts: BudgetAlert[] = [];

    const budgetLimit = parseFloat(process.env.WHATSAPP_MONTHLY_BUDGET || '500'); // €500 default
    const warningThreshold = budgetLimit * 0.8; // 80% of budget
    const criticalThreshold = budgetLimit * 0.95; // 95% of budget

    if (monthlyCosts.totalCost >= criticalThreshold) {
      alerts.push({
        level: 'critical',
        message: `WhatsApp costs (€${monthlyCosts.totalCost.toFixed(2)}) approaching monthly budget (€${budgetLimit})`,
        action: 'Suspend non-essential messaging',
        threshold: criticalThreshold
      });
    } else if (monthlyCosts.totalCost >= warningThreshold) {
      alerts.push({
        level: 'warning',
        message: `WhatsApp costs (€${monthlyCosts.totalCost.toFixed(2)}) at ${Math.round((monthlyCosts.totalCost / budgetLimit) * 100)}% of monthly budget`,
        action: 'Review messaging strategy',
        threshold: warningThreshold
      });
    }

    if (monthlyCosts.projectedMonthlyCost > budgetLimit) {
      alerts.push({
        level: 'warning',
        message: `Projected monthly cost (€${monthlyCosts.projectedMonthlyCost.toFixed(2)}) exceeds budget`,
        action: 'Optimize messaging frequency',
        threshold: budgetLimit
      });
    }

    // Trigger alerts if any
    if (alerts.length > 0) {
      await this.sendBudgetAlerts(alerts);
    }

    return alerts;
  }
}

// Type definitions
interface CostAnalysisResult {
  shouldSend: boolean;
  reason: string;
  estimatedCost: number;
}

interface PendingMessage {
  phoneNumber: string;
  content: string;
  type: 'marketing' | 'utility' | 'service';
  priority: 'high' | 'medium' | 'low';
  scheduledFor: Date;
}

interface BatchOptimizationResult {
  sent: PendingMessage[];
  blocked: PendingMessage[];
  totalCostSavings: number;
  optimization_details: string[];
}

interface UserOptimizationResult {
  sent: PendingMessage[];
  blocked: PendingMessage[];
  costSavings: number;
  details: string[];
}

interface MessageBatch {
  phoneNumber: string;
  messages: PendingMessage[];
  sendAt: Date;
  efficiency: number;
  estimatedCost: number;
}

interface MonthlyCostSummary {
  month: string;
  totalCost: number;
  breakdown: Record<string, number>;
  messagesCount: number;
  averageCostPerMessage: number;
  projectedMonthlyCost: number;
  budgetStatus: 'within_budget' | 'approaching_limit' | 'over_budget';
}

interface BudgetAlert {
  level: 'warning' | 'critical';
  message: string;
  action: string;
  threshold: number;
}
```

---

## Technical Implementation

### 1. Environment Configuration

```bash
# .env.local
# WhatsApp Business API
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id
META_ACCESS_TOKEN=your_meta_access_token
META_WEBHOOK_VERIFY_TOKEN=your_webhook_verify_token

# Twilio WhatsApp
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_WHATSAPP_NUMBER=+14155238886
TWILIO_WEBHOOK_URL=https://yourdomain.com/api/whatsapp/webhook

# Calendly
CALENDLY_ACCESS_TOKEN=your_calendly_access_token
CALENDLY_ORGANIZATION=your_calendly_organization

# Budget Management
WHATSAPP_MONTHLY_BUDGET=500
WHATSAPP_COST_ALERTS_ENABLED=true
```

### 2. Deployment Scripts

```typescript
// scripts/deploy-whatsapp.ts
import { TemplateManager } from '../lib/template-management';
import { supabase } from '../lib/supabase';

async function deployWhatsAppIntegration() {
  console.log('🚀 Starting WhatsApp Business API deployment...');

  try {
    // 1. Create database tables
    await createDatabaseTables();
    
    // 2. Submit message templates to Meta
    await submitMessageTemplates();
    
    // 3. Configure webhooks
    await configureWebhooks();
    
    // 4. Test integration
    await testIntegration();
    
    console.log('✅ WhatsApp integration deployed successfully!');
  } catch (error) {
    console.error('❌ Deployment failed:', error);
    process.exit(1);
  }
}

async function createDatabaseTables() {
  const tables = [
    `
    CREATE TABLE IF NOT EXISTS whatsapp_conversations (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      phone_number TEXT NOT NULL,
      conversation_id TEXT UNIQUE,
      language TEXT DEFAULT 'en',
      state TEXT DEFAULT 'welcome',
      user_profile JSONB DEFAULT '{}',
      metadata JSONB DEFAULT '{}',
      status TEXT DEFAULT 'active',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
    `,
    `
    CREATE TABLE IF NOT EXISTS whatsapp_messages (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      conversation_id UUID REFERENCES whatsapp_conversations(id),
      message_id TEXT UNIQUE,
      direction TEXT CHECK (direction IN ('inbound', 'outbound')),
      message_type TEXT DEFAULT 'text',
      content TEXT,
      media_url TEXT,
      status TEXT DEFAULT 'sent',
      created_at TIMESTAMP DEFAULT NOW()
    );
    `,
    // ... additional tables
  ];

  for (const table of tables) {
    const { error } = await supabase.rpc('exec', { sql: table });
    if (error) throw error;
  }

  console.log('✅ Database tables created');
}

async function submitMessageTemplates() {
  const templateManager = new TemplateManager();
  const languages = ['en', 'it', 'es', 'fr', 'de', 'ar', 'zh', 'ru'];
  const templates = ['welcome_message', 'investment_guide', 'appointment_confirmation', 'grant_alert'];

  for (const template of templates) {
    for (const language of languages) {
      try {
        await templateManager.submitTemplate(template, language);
        console.log(`✅ Submitted ${template} template for ${language}`);
      } catch (error) {
        console.warn(`⚠️ Failed to submit ${template} for ${language}:`, error.message);
      }
    }
  }
}

async function configureWebhooks() {
  // Configure Meta webhook
  const metaWebhook = await fetch(`https://graph.facebook.com/v18.0/${process.env.WHATSAPP_BUSINESS_ACCOUNT_ID}/subscriptions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.META_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      object: 'whatsapp_business_account',
      callback_url: `${process.env.TWILIO_WEBHOOK_URL}/meta`,
      fields: ['messages'],
      verify_token: process.env.META_WEBHOOK_VERIFY_TOKEN
    })
  });

  if (!metaWebhook.ok) {
    throw new Error('Failed to configure Meta webhook');
  }

  // Configure Calendly webhook
  const calendlyWebhook = await fetch('https://api.calendly.com/webhook_subscriptions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.CALENDLY_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: `${process.env.TWILIO_WEBHOOK_URL}/calendly`,
      events: ['invitee.created', 'invitee.canceled'],
      organization: process.env.CALENDLY_ORGANIZATION,
      scope: 'organization'
    })
  });

  if (!calendlyWebhook.ok) {
    throw new Error('Failed to configure Calendly webhook');
  }

  console.log('✅ Webhooks configured');
}

async function testIntegration() {
  // Test basic message sending
  const testPhone = process.env.TEST_PHONE_NUMBER;
  
  if (testPhone) {
    await fetch('/api/whatsapp/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phoneNumber: testPhone,
        message: 'WhatsApp integration test - deployment successful!'
      })
    });
    
    console.log('✅ Test message sent');
  }
}

// Run deployment
deployWhatsAppIntegration();
```

### 3. Monitoring & Maintenance

```typescript
// scripts/whatsapp-monitor.ts
export class WhatsAppMonitor {
  async runHealthCheck(): Promise<HealthCheckResult> {
    const checks = await Promise.allSettled([
      this.checkWhatsAppAPIStatus(),
      this.checkDatabaseConnection(),
      this.checkTemplateStatus(),
      this.checkWebhookEndpoints(),
      this.checkBudgetStatus()
    ]);

    const results = checks.map((result, index) => ({
      check: ['WhatsApp API', 'Database', 'Templates', 'Webhooks', 'Budget'][index],
      status: result.status === 'fulfilled' ? 'healthy' : 'unhealthy',
      details: result.status === 'fulfilled' ? result.value : result.reason
    }));

    const overallHealth = results.every(r => r.status === 'healthy') ? 'healthy' : 'unhealthy';

    return {
      timestamp: new Date().toISOString(),
      overall: overallHealth,
      checks: results
    };
  }

  private async checkWhatsAppAPIStatus() {
    const response = await fetch(`https://graph.facebook.com/v18.0/${process.env.WHATSAPP_BUSINESS_ACCOUNT_ID}`, {
      headers: { 'Authorization': `Bearer ${process.env.META_ACCESS_TOKEN}` }
    });

    if (!response.ok) {
      throw new Error(`WhatsApp API error: ${response.status}`);
    }

    return { status: 'API accessible', details: await response.json() };
  }

  async generateDailyReport() {
    const analytics = new WhatsAppAnalytics();
    const costOptimizer = new CostOptimizer();

    const [
      dailyReport,
      costSummary,
      healthCheck,
      budgetAlerts
    ] = await Promise.all([
      analytics.generateDailyReport(),
      costOptimizer.getCurrentMonthlyCosts(),
      this.runHealthCheck(),
      costOptimizer.checkBudgetAlerts()
    ]);

    const report = {
      date: new Date().toISOString().split('T')[0],
      summary: {
        totalConversations: dailyReport.conversations.total,
        totalMessages: dailyReport.messages.total,
        newLeads: dailyReport.conversions.totalLeads,
        appointments: dailyReport.conversions.appointmentsBooked,
        conversionRate: `${(dailyReport.conversions.conversionRate * 100).toFixed(1)}%`
      },
      costs: {
        dailySpent: this.calculateDailySpend(costSummary),
        monthlyTotal: costSummary.totalCost,
        projectedMonthly: costSummary.projectedMonthlyCost,
        budgetUsage: `${((costSummary.totalCost / 500) * 100).toFixed(1)}%`
      },
      health: healthCheck,
      alerts: budgetAlerts,
      recommendations: this.generateRecommendations(dailyReport, costSummary)
    };

    // Send report via Telegram
    await this.sendDailyReportToTelegram(report);

    return report;
  }

  private generateRecommendations(dailyReport: any, costSummary: any): string[] {
    const recommendations = [];

    if (dailyReport.conversions.conversionRate < 0.1) {
      recommendations.push('📈 Low conversion rate detected. Consider reviewing message templates and qualification process.');
    }

    if (costSummary.averageCostPerMessage > 0.02) {
      recommendations.push('💰 High cost per message. Review template usage and batch messaging strategies.');
    }

    if (dailyReport.messages.responseRate < 0.5) {
      recommendations.push('💬 Low response rate. Consider A/B testing different message approaches.');
    }

    if (dailyReport.conversations.byLanguage.en < dailyReport.conversations.total * 0.3) {
      recommendations.push('🌍 High non-English usage. Ensure all languages have updated templates.');
    }

    return recommendations;
  }
}
```

---

## Testing & Deployment

### 1. Testing Strategy

```typescript
// tests/whatsapp-integration.test.ts
describe('WhatsApp Integration', () => {
  beforeEach(async () => {
    // Setup test environment
    await setupTestDatabase();
    await mockWhatsAppAPI();
  });

  describe('Message Flow', () => {
    test('should handle new conversation initiation', async () => {
      const testPhone = '+1234567890';
      const welcomeMessage = 'Hello';

      const response = await simulateIncomingMessage(testPhone, welcomeMessage);

      expect(response.status).toBe(200);
      
      const conversation = await getConversation(testPhone);
      expect(conversation.state).toBe('language_selection');
    });

    test('should detect language and proceed to qualification', async () => {
      const testPhone = '+1234567890';
      
      await simulateConversationFlow(testPhone, [
        'Ciao, sono interessato agli investimenti',
        'Sì, accetto i termini',
        'Ho un budget di 200.000 euro'
      ]);

      const conversation = await getConversation(testPhone);
      expect(conversation.language).toBe('it');
      expect(conversation.state).toBe('qualifying');
    });

    test('should handle GDPR consent properly', async () => {
      const testPhone = '+1234567890';
      
      const response = await simulateIncomingMessage(testPhone, 'YES');
      
      const consents = await getGDPRConsents(testPhone);
      expect(consents).toContainEqual({
        consent_type: 'processing',
        granted: true
      });
    });
  });

  describe('Lead Scoring', () => {
    test('should calculate lead score correctly', async () => {
      const leadData = {
        phoneNumber: '+1234567890',
        userProfile: {
          budget: '250000-500000',
          timeline: '6-months',
          propertyType: 'commercial'
        },
        metadata: {
          messageCount: 8
        }
      };

      const scorer = new LeadScorer();
      const score = scorer.calculateScore(leadData as any);

      expect(score).toBeGreaterThan(70);
    });
  });

  describe('Cost Optimization', () => {
    test('should block low-quality leads from marketing messages', async () => {
      const optimizer = new CostOptimizer();
      const lowQualityLead = { qualification_score: 20 };

      const result = await optimizer.analyzeCostEffectiveness('+1234567890', 'marketing');
      
      expect(result.shouldSend).toBe(false);
      expect(result.reason).toContain('Lead score too low');
    });

    test('should combine messages within free window', async () => {
      const messages = [
        { type: 'utility', content: 'Message 1' },
        { type: 'service', content: 'Message 2' },
        { type: 'utility', content: 'Message 3' }
      ];

      const optimizer = new CostOptimizer();
      const result = await optimizer.optimizeUserMessages('+1234567890', messages);

      expect(result.sent).toHaveLength(1);
      expect(result.costSavings).toBeGreaterThan(0);
    });
  });

  describe('Template Management', () => {
    test('should format templates correctly for Meta submission', async () => {
      const templateManager = new TemplateManager();
      const template = await templateManager.buildComponents({
        header: { type: 'TEXT', text: 'Welcome!' },
        body: { text: 'Hello {{1}}, welcome to InvestInPuglia!' }
      });

      expect(template).toHaveLength(2);
      expect(template[0].type).toBe('HEADER');
      expect(template[1].type).toBe('BODY');
    });
  });

  describe('Analytics', () => {
    test('should generate accurate daily reports', async () => {
      await seedTestData();

      const analytics = new WhatsAppAnalytics();
      const report = await analytics.generateDailyReport();

      expect(report.conversations.total).toBeGreaterThan(0);
      expect(report.conversions.conversionRate).toBeDefined();
    });

    test('should track funnel conversion properly', async () => {
      const analytics = new WhatsAppAnalytics();
      const funnel = await analytics.generateFunnelAnalysis({
        start: '2025-01-01',
        end: '2025-01-31'
      });

      expect(funnel).toBeInstanceOf(Array);
      expect(funnel[0].step).toBe('conversation_started');
    });
  });
});

// Test utilities
async function setupTestDatabase() {
  // Create test tables and seed data
}

async function mockWhatsAppAPI() {
  // Mock external API calls
}

async function simulateIncomingMessage(phone: string, message: string) {
  return await fetch('/api/whatsapp/webhook', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      From: `whatsapp:${phone}`,
      To: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      Body: message,
      MessageSid: `test_${Date.now()}`
    }).toString()
  });
}
```

### 2. Deployment Checklist

```markdown
# WhatsApp Integration Deployment Checklist

## Pre-Deployment
- [ ] WhatsApp Business API access approved by Meta
- [ ] Business verification completed
- [ ] Phone number verification completed
- [ ] Twilio account configured
- [ ] Database schema updated
- [ ] Environment variables configured
- [ ] SSL certificates valid
- [ ] Webhook endpoints accessible
- [ ] Template submissions approved by Meta

## Deployment
- [ ] Database migrations executed
- [ ] API endpoints deployed
- [ ] Webhook URLs configured
- [ ] Template management system deployed
- [ ] Cost optimization rules configured
- [ ] GDPR compliance measures active
- [ ] Analytics tracking enabled
- [ ] Monitoring systems operational

## Post-Deployment
- [ ] End-to-end message flow tested
- [ ] Template message sending verified
- [ ] Calendly integration tested
- [ ] Lead scoring system validated
- [ ] Cost tracking confirmed
- [ ] GDPR request handling tested
- [ ] Analytics dashboard functional
- [ ] Error handling verified
- [ ] Rate limiting operational
- [ ] Budget alerts configured

## Go-Live
- [ ] Test conversations completed successfully
- [ ] Performance metrics baseline established
- [ ] Team training completed
- [ ] Documentation updated
- [ ] Backup and recovery procedures tested
- [ ] Incident response plan activated
- [ ] Customer support team briefed
```

---

## Conclusion

This comprehensive WhatsApp Business API integration strategy provides InvestInPuglia.eu with a powerful multi-channel customer engagement platform that:

1. **Extends Reach**: Leverages WhatsApp's 2+ billion users for maximum market penetration
2. **Personalizes Experience**: Delivers tailored investment guidance in 8 languages
3. **Automates Qualification**: Intelligently scores and routes leads based on investment potential
4. **Optimizes Costs**: Implements sophisticated cost management to maximize ROI
5. **Ensures Compliance**: Maintains GDPR compliance and data protection standards
6. **Drives Conversions**: Seamlessly integrates with Calendly for appointment booking
7. **Provides Analytics**: Delivers comprehensive insights for continuous optimization

### Key Success Metrics
- **Conversation-to-Lead Rate**: Target 25%
- **Lead-to-Appointment Rate**: Target 15%
- **Cost per Qualified Lead**: Target <€10
- **Response Time**: Target <5 minutes
- **User Satisfaction**: Target 4.5/5 stars

### Next Steps
1. **Phase 1**: Complete WhatsApp Business API setup and basic integration (Weeks 1-2)
2. **Phase 2**: Deploy core features and testing (Weeks 3-4)
3. **Phase 3**: Advanced features and optimization (Weeks 5-6)
4. **Phase 4**: Full production deployment and monitoring (Weeks 7-8)

This integration positions InvestInPuglia.eu as a leader in digital customer engagement within the EU investment sector, providing a competitive advantage through advanced automation, personalization, and cost optimization.