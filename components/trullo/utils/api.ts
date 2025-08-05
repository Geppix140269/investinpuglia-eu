// API utilities for Trullo chatbot

export async function sendMessage(message: string) {
  console.log('Sending message:', message);
  return { success: true, response: 'Message received' };
}

export async function sendEmailMessage(data: any) {
  console.log('Sending email message:', data);
  return { success: true };
}

export async function sendContactForm(data: any) {
  console.log('Sending contact form:', data);
  return { success: true };
}

export async function saveContactRequest(data: any) {
  console.log('Saving contact request:', data);
  return { success: true };
}

export async function initializeChat() {
  return { sessionId: 'temp-session-' + Date.now() };
}

export async function startConversation() {
  return { conversationId: 'conv-' + Date.now() };
}

export async function endConversation(conversationId: string) {
  console.log('Ending conversation:', conversationId);
  return { success: true };
}

export async function logMessage(message: any) {
  console.log('Logging message:', message);
  return { success: true };
}

export async function sendChatMessage(message: string) {
  console.log('Sending chat message:', message);
  // Simulate AI response
  return { 
    success: true, 
    response: "I understand you're interested in investing in Puglia. How can I help you today?"
  };
}
