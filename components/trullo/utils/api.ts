// PATH: components/trullo/utils/api.ts
// Updated for Netlify Functions

import { Message } from '../types';

// Main chat function that calls our Netlify Function
export async function sendChatMessage(
  messages: Message[],
  systemPrompt: string,
  language: string
): Promise<{ success: boolean; message: string }> {
  try {
    // Use Netlify Functions endpoint
    const response = await fetch('/.netlify/functions/trullo-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        systemPrompt,
        language
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error calling chat API:', error);
    
    // Fallback response if API fails
    return {
      success: false,
      message: "I'm having trouble connecting right now. Please try again in a moment, or contact us directly at info@investinpuglia.eu"
    };
  }
}

// Email sending function
export async function sendEmailMessage(formData: any, language: string) {
  try {
    const response = await fetch('/.netlify/functions/trullo-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formData,
        language
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return await response.json();
  } catch (error) {
    console.error('Email API error:', error);
    throw error;
  }
}

// Contact form submission
export async function saveContactRequest(
  conversationId: string,
  formData: any,
  language: string
) {
  try {
    const response = await fetch('/.netlify/functions/trullo-contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversationId,
        formData,
        language
      })
    });

    if (!response.ok) {
      throw new Error('Failed to save contact request');
    }

    return await response.json();
  } catch (error) {
    console.error('Contact API error:', error);
    throw error;
  }
}

// Start conversation tracking
export async function startConversation(sessionId: string, language: string) {
  try {
    const response = await fetch('/.netlify/functions/trullo-conversation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'start',
        sessionId,
        language
      })
    });

    if (!response.ok) {
      throw new Error('Failed to start conversation');
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to start conversation:', error);
    // Return a mock conversationId so the chat can continue
    return { conversationId: `conv_${Date.now()}` };
  }
}

// Log message
export async function logMessage(
  conversationId: string,
  role: string,
  content: string
) {
  try {
    await fetch('/.netlify/functions/trullo-conversation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'log',
        conversationId,
        role,
        content
      })
    });
  } catch (error) {
    console.error('Failed to log message:', error);
    // Non-critical, don't throw
  }
}

// End conversation
export async function endConversation(conversationId: string) {
  try {
    await fetch('/.netlify/functions/trullo-conversation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'end',
        conversationId
      })
    });
  } catch (error) {
    console.error('Failed to end conversation:', error);
    // Non-critical, don't throw
  }
}

// Telegram notification (for admin alerts)
export async function sendTelegramNotification(type: string, data: any) {
  try {
    await fetch('/.netlify/functions/trullo-telegram', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        data
      })
    });
  } catch (error) {
    console.error('Failed to send telegram notification:', error);
    // Non-critical, don't throw
  }
}
