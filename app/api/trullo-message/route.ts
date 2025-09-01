// app/api/trullo-message/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { EXPERT_DIRECTORY } from '@/components/trullo/knowledge/core/expert-directory';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const resend = new Resend(process.env.RESEND_API_KEY);

// Giuseppe's email - CRITICAL
const GIUSEPPE_EMAIL = 'g.funaro@investinpuglia.eu';

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      email,
      phone,
      message,
      conversationHistory,
      language,
      timestamp,
      // New fields for better lead tracking
      budget,
      timeline,
      propertyType,
      purpose
    } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Store lead in Firebase with enhanced data
    try {
      await addDoc(collection(db, 'trullo_contact_requests'), {
        name,
        email,
        phone: phone || null,
        message,
        language: language || 'en',
        budget: budget || null,
        timeline: timeline || null,
        property_type: propertyType || null,
        purpose: purpose || null,
        conversation_history: conversationHistory || null,
        created_at: serverTimestamp()
      });
    } catch (storageError) {
      console.error('Failed to store in Firebase:', storageError);
      // Continue with email even if storage fails
    }

    // Language labels
    const languageNames: Record<string, string> = {
      en: 'English',
      it: 'Italian',
      es: 'Spanish',
      fr: 'French',
      de: 'German',
      ar: 'Arabic',
      zh: 'Chinese'
    };

    // Create enhanced HTML email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #8B5CF6 0%, #10B981 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">New Investment Inquiry</h1>
          <p style="color: white; opacity: 0.9; margin: 10px 0 0 0;">via Trullo AI Assistant</p>
        </div>
        
        <div style="background: #f3f4f6; padding: 30px;">
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #7c3aed; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Language:</strong> ${languageNames[language] || language?.toUpperCase() || 'English'}</p>
            <p><strong>Timestamp:</strong> ${timestamp || new Date().toISOString()}</p>
          </div>

          ${(budget || timeline || propertyType || purpose) ? `
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #7c3aed; margin-top: 0;">Investment Details</h3>
            ${budget ? `<p><strong>Budget Range:</strong> ${budget}</p>` : ''}
            ${timeline ? `<p><strong>Timeline:</strong> ${timeline}</p>` : ''}
            ${propertyType ? `<p><strong>Property Type:</strong> ${propertyType}</p>` : ''}
            ${purpose ? `<p><strong>Purpose:</strong> ${purpose}</p>` : ''}
          </div>
          ` : ''}

          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #7c3aed; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          ${conversationHistory ? `
          <div style="background: white; padding: 20px; border-radius: 8px;">
            <h3 style="color: #7c3aed; margin-top: 0;">Conversation History</h3>
            <div style="font-size: 12px; color: #6b7280; max-height: 400px; overflow-y: auto;">
              <pre style="white-space: pre-wrap; font-family: Arial, sans-serif;">${
                typeof conversationHistory === 'string' 
                  ? conversationHistory 
                  : JSON.stringify(conversationHistory, null, 2)
              }</pre>
            </div>
          </div>
          ` : ''}
        </div>

        <div style="background: #1f2937; padding: 20px; text-align: center; border-radius: 0 0 10px 10px;">
          <p style="color: #9ca3af; margin: 0; font-size: 12px;">
            Received via Trullo AI Assistant at investinpuglia.eu
          </p>
        </div>
      </div>
    `;

    // Send email to Giuseppe
    const emailResponse = await resend.emails.send({
      from: 'Trullo AI <info@1402celsius.com>',
      to: GIUSEPPE_EMAIL,
      subject: `New ${language?.toUpperCase() || 'EN'} Inquiry: ${name} - ${propertyType || 'Investment Opportunity'}`,
      html: htmlContent,
      text: `New contact from ${name} (${email}). Phone: ${phone || 'N/A'}. Message: ${message}`,
    });

    if (!emailResponse.data) {
      throw new Error('Failed to send email');
    }

    // Send confirmation email to the user
    const userLanguage = language || 'en';
    const confirmationMessages = {
      en: {
        subject: 'Thank you for your inquiry - InvestInPuglia.eu',
        greeting: `Dear ${name}`,
        body: 'Thank you for contacting us through our Trullo AI assistant. We have received your inquiry and our team will review it shortly.',
        expert: 'Our expert team will contact you within 24-48 hours to discuss your investment opportunities in Puglia.',
        signature: 'Best regards,<br>The InvestInPuglia Team'
      },
      it: {
        subject: 'Grazie per la sua richiesta - InvestInPuglia.eu',
        greeting: `Gentile ${name}`,
        body: 'La ringraziamo per averci contattato tramite il nostro assistente AI Trullo. Abbiamo ricevuto la sua richiesta e il nostro team la esaminerà a breve.',
        expert: 'Il nostro team di esperti la contatterà entro 24-48 ore per discutere delle opportunità di investimento in Puglia.',
        signature: 'Cordiali saluti,<br>Il Team InvestInPuglia'
      }
    };

    const msg = confirmationMessages[userLanguage] || confirmationMessages.en;
    
    const userHtmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #8B5CF6 0%, #10B981 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">InvestInPuglia.eu</h1>
        </div>
        
        <div style="background: white; padding: 30px;">
          <p>${msg.greeting},</p>
          <p>${msg.body}</p>
          <p>${msg.expert}</p>
          
          <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #7c3aed; margin-top: 0;">Your Inquiry Summary:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <p>${msg.signature}</p>
        </div>
        
        <div style="background: #1f2937; padding: 20px; text-align: center; border-radius: 0 0 10px 10px;">
          <p style="color: #9ca3af; margin: 0; font-size: 12px;">
            © 2024 InvestInPuglia.eu - Your Gateway to Puglia Investments
          </p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: 'InvestInPuglia <info@1402celsius.com>',
      to: email,
      subject: msg.subject,
      html: userHtmlContent,
    });

    return NextResponse.json({ 
      success: true,
      message: 'Contact request sent successfully' 
    });

  } catch (error) {
    console.error('Failed to process contact request:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}