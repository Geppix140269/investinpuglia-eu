# WhatsApp Business Integration Setup Guide

## 🚀 Quick Setup Instructions

### 1. **Configure Twilio Webhook**

Login to your Twilio Console and set the webhook URL for your WhatsApp number:

```
Webhook URL: https://investinpuglia.eu/api/whatsapp-webhook
Method: POST
```

### 2. **Environment Variables**

Add these to your `.env.local` file:

```env
# Twilio Configuration
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+447862140269

# Supabase (for conversation storage)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Base URL
NEXT_PUBLIC_BASE_URL=https://investinpuglia.eu

# Resend (for email notifications)
RESEND_API_KEY=your_resend_api_key
```

### 3. **Database Setup**

Run the migration in Supabase:

```sql
-- Run the migration file:
-- supabase/migrations/create_whatsapp_tables.sql
```

### 4. **Deploy to Production**

```bash
# Deploy to Vercel/Netlify
git add .
git commit -m "Add WhatsApp Business integration"
git push origin main
```

### 5. **Test the Integration**

Send a WhatsApp message to your business number:
- Number: +447862140269
- Test message: "Hi, I want to invest in Puglia"

## 📱 Message Flow

### Initial Contact
1. User sends message to WhatsApp
2. Webhook receives at `/api/whatsapp-webhook`
3. Language detected automatically
4. Trullo AI generates response
5. Response sent back via Twilio

### Consultation Booking
1. Investment intent detected
2. Stripe payment link offered (€60)
3. User clicks link and pays
4. Confirmation sent via WhatsApp
5. Giuseppe notified immediately

## 🎯 Features Implemented

✅ **Multi-language Support** (8 languages)
✅ **AI-Powered Responses** via Trullo
✅ **Stripe Payment Integration** (€60 consultations)
✅ **Lead Scoring Algorithm** (0-100 points)
✅ **Conversation History** stored in Supabase
✅ **High-Value Lead Alerts** to Giuseppe
✅ **GDPR Compliant** data handling

## 📊 Analytics Dashboard

View WhatsApp analytics at:
```
https://investinpuglia.eu/admin/dashboard
```

Metrics tracked:
- Total conversations
- Language distribution
- Lead scores
- Consultation bookings
- Conversion rates

## 🔧 Troubleshooting

### Message not receiving response:
1. Check Twilio webhook logs
2. Verify environment variables
3. Check Supabase connection

### Payment link not working:
1. Verify Stripe link is active
2. Check payment processing

### Language detection issues:
1. Review message patterns in config
2. Default falls back to English

## 📞 Support

For technical support:
- Email: g.funaro@investinpuglia.eu
- WhatsApp: +393514001402

## 🎉 You're Ready!

Your WhatsApp Business integration is now live! Start receiving and converting leads 24/7.

### Next Steps:
1. Submit message templates to Meta for approval
2. Set up follow-up sequences
3. Train team on handling escalations
4. Monitor conversion metrics