# 🚀 SIMPLIFIED Stripe Setup - Two Options

## Option 1: Automatic (Easiest - No Stripe Configuration Needed!)

Just add your **Stripe Secret Key** to `.env.local`:
```
STRIPE_SECRET_KEY=sk_live_... (or sk_test_... for testing)
```

**That's it!** The system will automatically create checkout sessions with:
- ✅ Correct success URLs that redirect to Calendly
- ✅ Terms of service acceptance
- ✅ Customer email and phone collection
- ✅ Proper pricing (€60 for 30min, €100 for 60min)

**How it works:**
1. User clicks "Book Consultation" 
2. System creates a Stripe checkout session automatically
3. After payment → Success page → Auto-redirect to Calendly

---

## Option 2: Using Stripe Payment Links (More Control)

### Step 1: Find Payment Links in Stripe
1. Log into [Stripe Dashboard](https://dashboard.stripe.com)
2. Look in the **left sidebar** for **"Payment links"**
   - It might be under **"Payments"** section
   - Or under **"Products"** → **"Payment links"**

### Step 2: Create a Payment Link
1. Click **"+ New link"** or **"Create payment link"**
2. Click **"Add a new product"**
3. Fill in:
   - **Name**: Professional Grant Consultation - 30 Minutes
   - **Price**: €60 (one-time)

### Step 3: Configure After Payment Behavior
After adding the product, look for **"After payment"** section:

**If you see "Confirmation page" options:**
- Select **"Don't show confirmation page"**
- Enable **"Redirect to your website"**
- Enter this URL:
```
https://investinpuglia.eu/consultation-success?duration=30&calendly=https%3A%2F%2Fcalendly.com%2Finvestinpuglia%2F30min
```

**If you DON'T see these options:**
- Stripe Payment Links might not support custom success URLs in your region
- Use **Option 1 (Automatic)** instead - it works everywhere!

### Step 4: Get Your Payment Link
1. Click **"Create link"**
2. Copy the link (looks like: `https://buy.stripe.com/...`)
3. Add to `.env.local`:
```
NEXT_PUBLIC_STRIPE_CONSULTATION_30_URL=https://buy.stripe.com/your-link-here
NEXT_PUBLIC_STRIPE_CONSULTATION_60_URL=https://buy.stripe.com/your-other-link
```

---

## 🎯 Can't Find The Options? Here's Why:

### Payment Links Limitations
Stripe Payment Links have limitations:
- Not all features available in all countries
- Custom success URLs might not be supported
- Terms acceptance might not be customizable

### The Solution: Use Option 1!
Our automatic checkout session creation handles everything programmatically:
- Works in ALL countries
- Full control over success URLs
- Automatic Calendly redirect
- Terms acceptance included

---

## 📋 Quick Test Guide

### To Test Option 1 (Automatic):
1. Add your Stripe Secret Key to `.env.local`
2. Go to `/book-consultation`
3. Click "Proceed to Payment"
4. Use test card: `4242 4242 4242 4242`
5. After payment → Should redirect to success page → Then Calendly

### To Test Option 2 (Payment Links):
1. Create payment links in Stripe
2. Add URLs to `.env.local`
3. Test same flow as above

---

## 🆘 Still Having Issues?

### Common Problems:
1. **"Can't find Payment Links"** → It might be called "Payment Pages" or under "Billing"
2. **"No success URL option"** → Use Option 1 (Automatic)
3. **"Terms of service not available"** → Normal for Payment Links, Option 1 handles this

### What You Actually Need:
Just your **Stripe Secret Key**! Everything else is handled automatically by the code.

### Finding Your Stripe Secret Key:
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Click **"Developers"** (top right)
3. Click **"API keys"**
4. Copy your **Secret key** (starts with `sk_live_` or `sk_test_`)
5. Add to `.env.local`

---

## ✅ That's It!
The system handles all the complex stuff:
- Creating checkout sessions
- Setting success URLs
- Redirecting to Calendly
- Collecting customer info

You just need to provide your Stripe Secret Key!