// Twilio WhatsApp Client for InvestInPuglia
import twilio from 'twilio';

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const twilioClient = twilio(accountSid, authToken);

// WhatsApp Configuration
export const TWILIO_CONFIG = {
  // Your WhatsApp Business Number
  WHATSAPP_NUMBER: 'whatsapp:+447862140269',
  PHONE_NUMBER: '+447862140269',
  MESSAGE_SERVICE_SID: process.env.TWILIO_MESSAGE_SERVICE_SID, // MG607c186c6439b65a5413ab2f71d82b13
  
  // Approved Message Templates
  TEMPLATES: {
    OTP: process.env.TWILIO_TEMPLATE_OTP, // HX51ca4dc03eab5256c777b9c64da0faf9b
    WELCOME: process.env.TWILIO_TEMPLATE_WELCOME, // HX1947d14deb90d0d8c7b5b064e1c49974
    INQUIRY: process.env.TWILIO_TEMPLATE_INQUIRY, // HX9611bf3fc2a783f125c3bdc96fe2c204
    APPOINTMENT: process.env.TWILIO_TEMPLATE_APPOINTMENT // HX5dae804ae9579051a8914f79c71c1f594
  }
};

// Send WhatsApp message using approved template
export async function sendWhatsAppTemplate(
  to: string,
  templateSid: string,
  variables: Record<string, string> = {}
) {
  try {
    const toNumber = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;
    
    const message = await twilioClient.messages.create({
      from: TWILIO_CONFIG.WHATSAPP_NUMBER,
      to: toNumber,
      contentSid: templateSid,
      contentVariables: JSON.stringify(variables),
      messagingServiceSid: TWILIO_CONFIG.MESSAGE_SERVICE_SID
    });
    
    console.log('✅ WhatsApp template sent:', message.sid);
    return { success: true, messageId: message.sid };
  } catch (error) {
    console.error('❌ WhatsApp template error:', error);
    return { success: false, error };
  }
}

// Send regular WhatsApp message (within 24-hour window)
export async function sendWhatsAppMessage(
  to: string,
  body: string,
  mediaUrl?: string
) {
  try {
    const toNumber = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;
    
    const messageOptions: any = {
      from: TWILIO_CONFIG.WHATSAPP_NUMBER,
      to: toNumber,
      body
    };
    
    // Add media if provided (images, PDFs, etc.)
    if (mediaUrl) {
      messageOptions.mediaUrl = [mediaUrl];
    }
    
    const message = await twilioClient.messages.create(messageOptions);
    
    console.log('✅ WhatsApp message sent:', message.sid);
    return { success: true, messageId: message.sid };
  } catch (error) {
    console.error('❌ WhatsApp message error:', error);
    return { success: false, error };
  }
}

// Send welcome message to new contact
export async function sendWelcomeMessage(phoneNumber: string, name: string) {
  return sendWhatsAppTemplate(
    phoneNumber,
    TWILIO_CONFIG.TEMPLATES.WELCOME!,
    {
      '1': name, // {{1}} in template
      '2': 'InvestInPuglia Team'
    }
  );
}

// Send inquiry response
export async function sendInquiryResponse(
  phoneNumber: string,
  name: string,
  propertyType: string
) {
  return sendWhatsAppTemplate(
    phoneNumber,
    TWILIO_CONFIG.TEMPLATES.INQUIRY!,
    {
      '1': name,
      '2': propertyType,
      '3': '€2.25M', // Max grant amount
      '4': 'https://buy.stripe.com/bJe9AV0y03xCbe6cx408g07' // Consultation link
    }
  );
}

// Send appointment confirmation
export async function sendAppointmentConfirmation(
  phoneNumber: string,
  name: string,
  date: string,
  time: string
) {
  return sendWhatsAppTemplate(
    phoneNumber,
    TWILIO_CONFIG.TEMPLATES.APPOINTMENT!,
    {
      '1': name,
      '2': date,
      '3': time,
      '4': 'Giuseppe Funaro'
    }
  );
}

// Send OTP verification with SMS fallback
export async function sendOTPMessage(phoneNumber: string, otp: string) {
  // First try WhatsApp template
  const whatsappResult = await sendWhatsAppTemplate(
    phoneNumber,
    TWILIO_CONFIG.TEMPLATES.OTP!,
    {
      '1': otp,
      '2': '5' // Minutes until expiry
    }
  );

  // If WhatsApp fails, try regular SMS
  if (!whatsappResult.success) {
    console.warn('⚠️ WhatsApp OTP failed, trying SMS fallback');
    return sendSMSOTP(phoneNumber, otp);
  }

  return whatsappResult;
}

// Send OTP via regular SMS (fallback)
export async function sendSMSOTP(phoneNumber: string, otp: string) {
  try {
    const formattedPhone = formatWhatsAppNumber(phoneNumber);
    console.log(`📱 Attempting SMS OTP to: ${formattedPhone} (from: ${phoneNumber})`);

    const message = await twilioClient.messages.create({
      from: TWILIO_CONFIG.PHONE_NUMBER,
      to: formattedPhone,
      body: `Your exclusive property access code is: ${otp}\n\nThis code expires in 5 minutes.\n\nInvestInPuglia.eu`
    });

    console.log(`✅ SMS OTP sent successfully:`, {
      sid: message.sid,
      to: formattedPhone,
      status: message.status,
      direction: message.direction
    });

    return { success: true, messageId: message.sid };
  } catch (error: any) {
    console.error(`❌ SMS OTP error for ${phoneNumber}:`, {
      error: error.message,
      code: error.code,
      moreInfo: error.moreInfo,
      status: error.status
    });

    // Return more specific error information
    return {
      success: false,
      error: error.message || error,
      errorCode: error.code,
      errorDetails: error.moreInfo
    };
  }
}

// Check if we can send a message (24-hour window check)
export async function canSendMessage(phoneNumber: string): Promise<boolean> {
  try {
    // Check last inbound message time from database
    // If within 24 hours, return true
    // Otherwise, must use template
    return true; // Simplified for now
  } catch (error) {
    console.error('Error checking message window:', error);
    return false;
  }
}

// Validate and format international phone numbers
export function formatWhatsAppNumber(phone: string): string {
  // Remove any spaces, dashes, parentheses, and dots
  let cleaned = phone.replace(/[\s\-\(\)\.]/g, '');

  // If already has country code, validate and return
  if (cleaned.startsWith('+')) {
    return cleaned;
  }

  // Handle numbers without country code
  if (cleaned.startsWith('00')) {
    // International format starting with 00, replace with +
    return '+' + cleaned.substring(2);
  }

  // Country-specific formatting
  if (cleaned.startsWith('44')) {
    // UK number starting with country code (without +)
    return '+' + cleaned;
  } else if (cleaned.startsWith('0')) {
    // Numbers starting with 0 - could be UK or Italian
    if (cleaned.length === 11 && cleaned.startsWith('07')) {
      // UK mobile number format: 07xxxxxxxxx
      return '+44' + cleaned.substring(1);
    } else if (cleaned.length >= 10 && cleaned.length <= 11 && cleaned.startsWith('0')) {
      // Italian number starting with 0
      return '+39' + cleaned.substring(1);
    } else {
      // Default to Italian for other 0-prefixed numbers
      return '+39' + cleaned.substring(1);
    }
  } else if (cleaned.startsWith('7') && cleaned.length === 10) {
    // UK mobile without leading 0: 7xxxxxxxxx
    return '+44' + cleaned;
  } else if (cleaned.startsWith('3') && cleaned.length === 10) {
    // Italian mobile: 3xxxxxxxxx
    return '+39' + cleaned;
  } else if (cleaned.length >= 10) {
    // For other formats, try to detect country by length and pattern
    if (cleaned.length === 10 && (cleaned.startsWith('7') || cleaned.startsWith('8'))) {
      // Likely UK mobile
      return '+44' + cleaned;
    } else {
      // Default to Italian
      return '+39' + cleaned;
    }
  }

  // If we can't determine, default to Italian with country code
  return '+39' + cleaned;
}

export default twilioClient;