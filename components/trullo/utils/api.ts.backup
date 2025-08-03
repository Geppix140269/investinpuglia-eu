// PATH: components/trullo/utils/api.ts
import { Message, MessageForm, Language } from '../types';

// Chat API
export async function sendChatMessage(
  messages: Message[],
  systemPrompt: string,
  language: Language
) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: messages.map(m => ({
        role: m.role,
        content: m.content
      })),
      system: systemPrompt,
      language
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get response');
  }

  return response.json();
}

// Email API
export async function sendEmailMessage(
  formData: MessageForm,
  language: Language
) {
  const response = await fetch('/api/trullo-message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...formData,
      language
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to send message');
  }

  return response.json();
}

// Logging API
export async function logToSupabase(action: string, data: any) {
  try {
    const response = await fetch('/api/trullo-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action,
        ...data
      })
    });
    
    return response.json();
  } catch (err) {
    console.error('Failed to log to Supabase:', err);
    return null;
  }
}

export async function startConversation(sessionId: string, language: Language) {
  return logToSupabase('startConversation', {
    sessionId,
    language,
    userAgent: navigator.userAgent
  });
}

export async function logMessage(conversationId: string, role: 'user' | 'assistant', content: string) {
  return logToSupabase('logMessage', {
    conversationId,
    role,
    content
  });
}

export async function saveContactRequest(
  conversationId: string,
  contactData: MessageForm,
  language: Language
) {
  return logToSupabase('saveContactRequest', {
    conversationId,
    ...contactData,
    language
  });
}

export async function endConversation(conversationId: string) {
  return logToSupabase('endConversation', {
    conversationId
  });
}
