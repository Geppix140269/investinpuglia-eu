# Stripe Products Configuration for InvestInPuglia Consultations

## Overview
Configure two consultation products in Stripe Dashboard with payment links that redirect to Calendly after successful payment.

---

## Product 1: 30-Minute Consultation

### Basic Information
- **Product Name**: Professional Grant Consultation - 30 Minutes
- **Product ID** (optional): consultation-30min
- **Description**: Expert consultation with Giuseppe Funaro on EU Mini PIA grants and Puglia investment opportunities
- **Price**: €60.00
- **Currency**: EUR
- **Payment Type**: One-time payment

### Product Details (for Product Page)
```
Professional 30-minute consultation covering:
✓ Mini PIA grant eligibility assessment (up to 45% funding)
✓ Investment strategy overview for Puglia properties
✓ Q&A session on grant applications
✓ Clear next steps roadmap

Perfect for investors seeking initial guidance on EU grants ending in 2027.
Expert: Giuseppe Funaro - 30+ years EU/Regional grant expertise
```

### Metadata (Add in Stripe Dashboard)
- `duration`: 30
- `consultation_type`: professional
- `expert`: Giuseppe Funaro
- `category`: grant-consultation

### Payment Link Settings
1. Go to **Payment Links** in Stripe Dashboard
2. Create new payment link for this product
3. Configure:
   - **Collect phone number**: Yes (required)
   - **Collect billing address**: Yes
   - **Allow promotion codes**: Optional
   - **Adjustable quantity**: No
   - **Terms of service**: Link to https://investinpuglia.eu/terms

### Success URL Configuration
Set the success URL to:
```
https://investinpuglia.eu/consultation-success?duration=30&calendly=https%3A%2F%2Fcalendly.com%2Finvestinpuglia%2F30min
```

### Cancel URL Configuration
```
https://investinpuglia.eu/book-consultation
```

---

## Product 2: 1-Hour Deep Dive Consultation

### Basic Information
- **Product Name**: Professional Grant Consultation - 1 Hour Deep Dive
- **Product ID** (optional): consultation-60min
- **Description**: Comprehensive consultation with Giuseppe Funaro including detailed grant analysis and personalized action plan
- **Price**: €100.00
- **Currency**: EUR
- **Payment Type**: One-time payment

### Product Details (for Product Page)
```
Comprehensive 1-hour consultation including:
✓ Complete Mini PIA grant eligibility analysis (45% funding)
✓ Property investment evaluation and recommendations
✓ Detailed grant application strategy
✓ ROI projections and investment timeline
✓ Personalized action plan document
✓ Follow-up email with summary and resources

Ideal for serious investors ready to secure EU grants before 2027 deadline.
Expert: Giuseppe Funaro - 30+ years expertise, €50M+ grants secured
```

### Metadata (Add in Stripe Dashboard)
- `duration`: 60
- `consultation_type`: deep-dive
- `expert`: Giuseppe Funaro
- `category`: grant-consultation
- `popular`: true

### Payment Link Settings
1. Go to **Payment Links** in Stripe Dashboard
2. Create new payment link for this product
3. Configure:
   - **Collect phone number**: Yes (required)
   - **Collect billing address**: Yes
   - **Allow promotion codes**: Optional
   - **Adjustable quantity**: No
   - **Terms of service**: Link to https://investinpuglia.eu/terms

### Success URL Configuration
Set the success URL to:
```
https://investinpuglia.eu/consultation-success?duration=60&calendly=https%3A%2F%2Fcalendly.com%2Finvestinpuglia%2F60min
```

### Cancel URL Configuration
```
https://investinpuglia.eu/book-consultation
```

---

## Email Receipt Configuration

### Custom Email Receipt Message (Add to both products)
```
Thank you for booking your consultation with InvestInPuglia!

NEXT STEP: Please schedule your consultation time immediately using the link provided after payment completion.

What's Included:
- Professional consultation with Giuseppe Funaro
- 30+ years of EU/Regional grant expertise
- Personalized Mini PIA grant strategy (45% funding available)
- Action plan for your Puglia investment

Important Information:
- Mini PIA grants end in 2027 (first come, first served)
- Limited funds remaining
- Average client saves €100,000+ through proper grant applications

Need assistance? Contact: invest@investinpuglia.eu

InvestInPuglia Team
Technical & Business Experts since 1990s
```

---

## Stripe Dashboard Setup Instructions

### Step 1: Create Products
1. Navigate to **Products** in Stripe Dashboard
2. Click **"+ Add product"**
3. Enter the product information above
4. Set pricing as specified
5. Save product

### Step 2: Create Payment Links
1. Go to **Payment Links**
2. Click **"+ Create link"**
3. Select the product created
4. Configure settings as specified above
5. Copy the payment link URL

### Step 3: Add to Environment Variables
Add these to your `.env.local` file:
```
NEXT_PUBLIC_STRIPE_CONSULTATION_30_URL=https://buy.stripe.com/[your-30min-link]
NEXT_PUBLIC_STRIPE_CONSULTATION_60_URL=https://buy.stripe.com/[your-60min-link]
```

### Step 4: Test the Flow
1. Make a test payment using Stripe test cards
2. Verify redirect to success page
3. Confirm auto-redirect to Calendly
4. Check email receipt is sent

---

## Calendly Configuration Requirements

### For 30-Minute Meetings
- URL: https://calendly.com/investinpuglia/30min
- Title: "Mini PIA Grant Consultation - 30 Minutes"
- Description: Include grant eligibility topics
- Location: Video call (Zoom/Google Meet)

### For 60-Minute Meetings
- URL: https://calendly.com/investinpuglia/60min
- Title: "Investment Deep Dive - 1 Hour Consultation"
- Description: Comprehensive grant and investment planning
- Location: Video call (Zoom/Google Meet)

### Calendly Confirmation Email Should Include
```
Consultation confirmed with Giuseppe Funaro
Topic: Mini PIA Grants & Puglia Investment Opportunities

Preparation Tips:
1. Have your investment budget ready
2. Prepare questions about Mini PIA grants (45% funding)
3. Consider your timeline (grants end in 2027)
4. Review our portfolio: https://investinpuglia.eu/portfolio

Looking forward to discussing your investment success!
```

---

## Important URLs for Email Campaigns

### Direct Booking Link (with payment)
```
https://investinpuglia.eu/book-consultation?source=email&campaign=[campaign-name]
```

### For Cold Email Templates
Replace existing Calendly links with:
```html
<a href="https://investinpuglia.eu/book-consultation?source=email&campaign=cold-outreach">
  Book Professional Consultation →
</a>
```

This ensures payment is collected before scheduling.

---

## Testing Checklist
- [ ] Products created in Stripe Dashboard
- [ ] Payment links generated
- [ ] Success URLs configured correctly
- [ ] Environment variables updated
- [ ] Test payment flow works
- [ ] Redirect to Calendly works
- [ ] Email receipts sent correctly
- [ ] Calendly sends confirmation

---

## Support Information
- **Stripe Support**: https://support.stripe.com
- **Test Cards**: 4242 4242 4242 4242 (any future date, any CVC)
- **InvestInPuglia Support**: invest@investinpuglia.eu