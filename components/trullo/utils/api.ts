// API utilities for Trullo chatbot

export async function sendMessage(message: string) {
  console.log('Sending message:', message);
  return { success: true, response: 'Message received' };
}

export async function sendEmailMessage(formData: any, language: string) {
  console.log('Sending email message:', { formData, language });
  return { success: true };
}

export async function sendContactForm(data: any) {
  console.log('Sending contact form:', data);
  return { success: true };
}

export async function saveContactRequest(conversationId: string, formData: any, language: string) {
  console.log('Saving contact request:', { conversationId, formData, language });
  return { success: true };
}

export async function initializeChat() {
  return { sessionId: 'temp-session-' + Date.now() };
}

export async function startConversation(sessionId?: string, language?: string) {
  return { conversationId: 'conv-' + Date.now() };
}

export async function endConversation(conversationId: string) {
  console.log('Ending conversation:', conversationId);
  return { success: true };
}

export async function logMessage(conversationId: string, role: string, message: any) {
  console.log('Logging message:', { conversationId, role, message });
  return { success: true };
}

export async function sendChatMessage(messages: any[], systemPrompt: string, language: string) {
  console.log('Sending chat message with:', messages.length, 'messages');
  // CRITICAL: Return EXACTLY what useChat.ts expects at lines 242-243
  return { 
    success: true, 
    message: "I understand you're interested in investing in Puglia. How can I help you today?"
  };
}