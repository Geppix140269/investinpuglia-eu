// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const professionalId = session.metadata?.professionalId;

        if (professionalId) {
          // Update professional to premium status
          await supabase
            .from('professionals')
            .update({
              subscription_status: 'active',
              payment_status: 'completed',
              stripe_subscription_id: session.subscription as string,
              subscription_start_date: new Date().toISOString(),
              subscription_type: 'premium',
              updated_at: new Date().toISOString()
            })
            .eq('id', professionalId);

          // If there's a registration token, mark it as completed
          const registrationToken = session.metadata?.registrationToken;
          if (registrationToken) {
            await supabase
              .from('professional_registrations')
              .update({
                completed_at: new Date().toISOString(),
                stripe_session_id: session.id
              })
              .eq('token', registrationToken);
          }

          // Send confirmation email
          await sendConfirmationEmail(session.customer_email!, professionalId);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const professionalId = subscription.metadata?.professionalId;

        if (professionalId) {
          await supabase
            .from('professionals')
            .update({
              subscription_status: subscription.status,
              subscription_end_date: new Date(subscription.current_period_end * 1000).toISOString(),
              updated_at: new Date().toISOString()
            })
            .eq('id', professionalId);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const professionalId = subscription.metadata?.professionalId;

        if (professionalId) {
          await supabase
            .from('professionals')
            .update({
              subscription_status: 'cancelled',
              subscription_type: 'free',
              subscription_end_date: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .eq('id', professionalId);
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
        const professionalId = subscription.metadata?.professionalId;

        if (professionalId) {
          await supabase
            .from('professionals')
            .update({
              payment_status: 'failed',
              updated_at: new Date().toISOString()
            })
            .eq('id', professionalId);

          // Send payment failed email
          await sendPaymentFailedEmail(invoice.customer_email!, professionalId);
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function sendConfirmationEmail(email: string, professionalId: string) {
  // Use your Resend API to send confirmation
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/send-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: email,
      subject: 'Welcome to InvestInPuglia Professional Directory!',
      template: 'professional_welcome',
      data: { professionalId }
    })
  });
  return response.json();
}

async function sendPaymentFailedEmail(email: string, professionalId: string) {
  // Use your Resend API to send payment failed notification
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/send-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: email,
      subject: 'Payment Failed - InvestInPuglia Professional Directory',
      template: 'payment_failed',
      data: { professionalId }
    })
  });
  return response.json();
}
