// app/api/create-checkout-session/route.ts
// SIMPLIFIED VERSION - No complex tax setup needed!

import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export async function POST(request: Request) {
  try {
    const { professionalId, email, name } = await request.json();

    // Create Stripe checkout session - Stripe handles ALL the tax complexity!
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price: 'price_1RrjwZQwo4eCAfOGVpmzejcN',
          quantity: 1,
        },
      ],
      // Stripe automatically handles tax based on customer location!
      automatic_tax: {
        enabled: true,
      },
      // Allow customers to enter VAT numbers
      tax_id_collection: {
        enabled: true,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/professionals/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/professionals/cancel`,
      metadata: {
        professionalId: professionalId,
        professionalName: name,
      },
    });

    return NextResponse.json({ 
      url: session.url // Just redirect to Stripe's hosted page!
    });
  } catch (error: any) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
