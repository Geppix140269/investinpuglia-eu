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
  console.log('Processing chat with', messages.length, 'messages');
  
  // Get the last user message
  const lastUserMessage = messages.filter(m => m.role === 'user').pop();
  const userInput = lastUserMessage?.content?.toLowerCase() || '';
  
  // Create contextual responses based on user input
  let response = "I understand you're interested in investing in Puglia. How can I help you today?";
  
  // Property inquiries
  if (userInput.includes('property') || userInput.includes('properties') || userInput.includes('real estate')) {
    response = "Puglia offers diverse property investments from €50,000 seaside apartments to €2M+ luxury masserias. Popular areas include Polignano a Mare, Ostuni, and Lecce. What type of property interests you?";
  }
  // Price inquiries
  else if (userInput.includes('price') || userInput.includes('cost') || userInput.includes('how much')) {
    response = "Property prices in Puglia vary significantly: Renovation projects from €30,000, move-in ready homes from €80,000, and premium coastal properties from €200,000+. What's your investment budget?";
  }
  // Grant inquiries
  else if (userInput.includes('grant') || userInput.includes('incentive') || userInput.includes('funding')) {
    response = "Excellent timing! EU and Italian grants offer up to €2.25M for tourism, agriculture, and renewable energy projects. The Resto al Sud program provides 50% grants for under-46 entrepreneurs. Shall I explain the eligibility criteria?";
  }
  // ROI inquiries
  else if (userInput.includes('roi') || userInput.includes('return') || userInput.includes('yield')) {
    response = "Puglia property investments typically yield 6-12% annually through rentals, with capital appreciation of 5-8% per year. Tourist rentals in hotspots like Polignano can generate €30-50k annually. Would you like specific examples?";
  }
  // Location inquiries
  else if (userInput.includes('where') || userInput.includes('location') || userInput.includes('area')) {
    response = "Top investment areas include: Polignano a Mare (coastal tourism), Ostuni (luxury market), Lecce (cultural tourism), Valle d'Itria (rural luxury), and Salento coast (beach properties). Each offers unique opportunities. Which appeals to you?";
  }
  // Process inquiries
  else if (userInput.includes('process') || userInput.includes('how') || userInput.includes('steps')) {
    response = "The investment process is straightforward: 1) Property selection, 2) Due diligence (we assist), 3) Preliminary contract, 4) Notary deed. EU citizens have no restrictions. Non-EU investors can also buy freely. Shall I guide you through each step?";
  }
  // Tax inquiries
  else if (userInput.includes('tax') || userInput.includes('taxes')) {
    response = "Italy offers attractive tax incentives: 7% flat tax for retirees, 26% capital gains (reducible), and various renovation tax credits up to 110%. Puglia has additional regional benefits. Would you like a detailed tax analysis?";
  }
  // Contact/meeting
  else if (userInput.includes('meet') || userInput.includes('contact') || userInput.includes('speak') || userInput.includes('call')) {
    response = "I'd be happy to arrange a consultation! You can reach our team at info@investinpuglia.eu or +39 080 123 4567. We also offer property tours and investment seminars. What works best for you?";
  }
  
  // Add some variety to prevent repetition
  const variations = [
    "Great question! ",
    "I'm glad you asked. ",
    "Excellent point. ",
    "Let me help with that. ",
    "Good timing! "
  ];
  
  // Sometimes add a variation prefix
  if (Math.random() > 0.5 && !response.startsWith("I understand")) {
    response = variations[Math.floor(Math.random() * variations.length)] + response;
  }
  
  return { 
    success: true, 
    message: response
  };
}