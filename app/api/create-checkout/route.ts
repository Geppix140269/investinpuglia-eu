import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { duration = '30', couponCode } = body;

    // Define consultation details
    const consultations = {
      '30': {
        name: 'Professional Grant Consultation - 30 Minutes',
        description: 'Expert consultation with Giuseppe Funaro on EU Mini PIA grants',
        price: 6000, // €60 in cents
        calendlyUrl: 'https://calendly.com/investinpuglia/30min'
      },
      '60': {
        name: 'Professional Grant Consultation - 1 Hour Deep Dive',
        description: 'Comprehensive consultation with detailed grant analysis and action plan',
        price: 10000, // €100 in cents
        calendlyUrl: 'https://calendly.com/investinpuglia/60min'
      }
    };

    const consultation = consultations[duration as keyof typeof consultations];
    if (!consultation) {
      return NextResponse.json({ error: 'Invalid duration' }, { status: 400 });
    }

    // Build checkout session options
    const sessionOptions: any = {
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: consultation.name,
              description: consultation.description,
              metadata: {
                duration: duration,
                expert: 'Giuseppe Funaro',
                type: 'consultation'
              }
            },
            unit_amount: consultation.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      
      // SUCCESS URL - This is where customer goes after payment
      success_url: `${request.headers.get('origin')}/consultation-success?duration=${duration}&calendly=${encodeURIComponent(consultation.calendlyUrl)}&session_id={CHECKOUT_SESSION_ID}`,
      
      // CANCEL URL - Where customer goes if they cancel
      cancel_url: `${request.headers.get('origin')}/book-consultation`,
      
      // Customer information collection
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      
      // Custom fields for terms acceptance
      custom_text: {
        terms_of_service_acceptance: {
          message: 'I agree to the [Terms of Service](https://investinpuglia.eu/terms)',
        },
      },
      
      // Metadata for tracking
      metadata: {
        duration: duration,
        consultation_type: duration === '60' ? 'deep-dive' : 'standard',
        source: 'website'
      },
      
      // Customer email collection
      customer_email: body.email || undefined,
    };

    // Add discount if coupon code provided
    if (couponCode && couponCode === 'MINIPIA50') {
      sessionOptions.discounts = [{
        coupon: 'MINIPIA50' // This must match the coupon ID in Stripe
      }];
    }

    // Create the checkout session
    const session = await stripe.checkout.sessions.create(sessionOptions);

    return NextResponse.json({ 
      checkoutUrl: session.url,
      sessionId: session.id 
    });
    
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}