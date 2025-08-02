// File: components/trullo/utils/expert-routing.ts
import { EXPERT_DIRECTORY, Expert } from '../knowledge/core/expert-directory';

export function detectExpertFromMessage(message: string, language: string = 'en'): Expert {
  const lowerMessage = message.toLowerCase();
  
  // Engineering keywords
  const engineeringKeywords = [
    'engineer', 'construction', 'renovation', 'structural', 'permit', 
    'building', 'architect', 'technical', 'ingegnere', 'costruzione',
    'ristrutturazione', 'permesso', 'edificio', 'tecnico'
  ];
  
  // Accounting keywords  
  const accountingKeywords = [
    'tax', 'accounting', 'fiscal', 'vat', 'company', 'business',
    'finance', 'accountant', 'tasse', 'contabilità', 'fiscale',
    'iva', 'società', 'commercialista'
  ];
  
  // Check for engineering topics
  if (engineeringKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return EXPERT_DIRECTORY.find(e => e.id === 'russo')!;
  }
  
  // Check for accounting topics
  if (accountingKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return EXPERT_DIRECTORY.find(e => e.id === 'quarta')!;
  }
  
  // Default to Giuseppe for investment/general
  return EXPERT_DIRECTORY.find(e => e.id === 'giuseppe')!;
}

export function generateWhatsAppLink(expert: Expert, message: string, includeCustomerInfo: boolean = false): string {
  const cleanPhone = expert.whatsapp.replace(/[\s+]/g, '');
  
  let whatsappMessage: string;
  if (expert.isExternal && !includeCustomerInfo) {
    // External experts get only the question
    whatsappMessage = `Hello ${expert.name}, I have a technical question: ${message.slice(0, 200)}`;
  } else {
    // Internal or when explicitly including info
    whatsappMessage = `Hello ${expert.name}, I'm interested in: ${message.slice(0, 200)}`;
  }
  
  const encodedMessage = encodeURIComponent(whatsappMessage);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

export function formatExpertContact(expert: Expert, userMessage: string, language: string = 'en'): string {
  const whatsappLink = generateWhatsAppLink(expert, userMessage);
  
  const privacyNote = expert.isExternal ? 
    (language === 'en' ? 
      '\n\n🔒 *Privacy Note*: Your personal details will remain confidential. Giuseppe will coordinate the response.' :
      '\n\n🔒 *Nota Privacy*: I tuoi dati personali rimarranno riservati. Giuseppe coordinerà la risposta.')
    : '';
  
  if (language === 'en') {
    return `I'll connect you with **${expert.name}** (${expert.title}) who specializes in this area.

📧 **Email**: I can send your inquiry to ${expert.email}
📱 **WhatsApp**: [Chat directly with ${expert.name.split(' ')[0]}](${whatsappLink})
📞 **Phone**: ${expert.phone}
${privacyNote}

Which contact method do you prefer?`;
  } else {
    return `Ti metterò in contatto con **${expert.name}** (${expert.title}) che è specializzato in quest'area.

📧 **Email**: Posso inviare la tua richiesta a ${expert.email}
📱 **WhatsApp**: [Chatta direttamente con ${expert.name.split(' ')[0]}](${whatsappLink})
📞 **Telefono**: ${expert.phone}
${privacyNote}

Quale metodo di contatto preferisci?`;
  }
}
