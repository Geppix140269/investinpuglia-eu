// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/firebase';
import { doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

async function sendConfirmationEmail(email: string, professionalId: string) {
  try {
    // Send email via your email service
    console.log(`Sending confirmation email to ${email} for professional ${professionalId}`);
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
  }
}

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
          // Update professional to premium status in Firebase
          const professionalRef = doc(db, 'professionals', professionalId);
          await updateDoc(professionalRef, {
            subscription_status: 'active',
            payment_status: 'completed',
            stripe_subscription_id: session.subscription as string,
            subscription_start_date: serverTimestamp(),
            subscription_type: 'premium',
            updated_at: serverTimestamp()
          });

          // If there's a registration token, mark it as completed
          const registrationToken = session.metadata?.registrationToken;
          if (registrationToken) {
            const registrationRef = doc(db, 'professional_registrations', registrationToken);
            await updateDoc(registrationRef, {
              completed_at: serverTimestamp(),
              stripe_session_id: session.id
            });
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
          const professionalRef = doc(db, 'professionals', professionalId);
          await updateDoc(professionalRef, {
            subscription_status: subscription.status,
            subscription_end_date: new Date(subscription.current_period_end * 1000).toISOString(),
            updated_at: serverTimestamp()
          });
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const professionalId = subscription.metadata?.professionalId;

        if (professionalId) {
          const professionalRef = doc(db, 'professionals', professionalId);
          await updateDoc(professionalRef, {
            subscription_status: 'cancelled',
            subscription_type: 'free',
            subscription_end_date: serverTimestamp(),
            updated_at: serverTimestamp()
          });
        }
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment succeeded:', paymentIntent.id);
        // Add any additional payment tracking here
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.error('Payment failed:', paymentIntent.id);
        // Handle failed payment
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}