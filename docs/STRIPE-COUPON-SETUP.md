# 🎁 MINIPIA50 Coupon Setup in Stripe

## Create the Coupon in Stripe Dashboard

### Step 1: Navigate to Coupons
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Click **"Products"** in the left sidebar
3. Click **"Coupons"** (might be under "More" → "Coupons")

### Step 2: Create New Coupon
Click **"+ New coupon"** and configure:

#### Coupon Settings:
- **Coupon ID**: `MINIPIA50`
- **Name**: First 50 - Mini PIA Special Offer
- **Type**: Percentage discount
- **Percent off**: `50%`
- **Duration**: Once
- **Redeem by**: Set to 3 months from now (optional)
- **Max redemptions**: `50` (IMPORTANT - limits to first 50 users!)

#### Additional Settings:
- **Applies to**: All products (or select your consultation products)
- **Currency**: EUR
- **Metadata** (optional):
  - `campaign`: `early-bird`
  - `description`: `50% off for first 50 bookings`

### Step 3: Save and Activate
1. Click **"Create coupon"**
2. Copy the Coupon ID: `MINIPIA50`
3. The coupon is now active!

---

## Add Coupon to Payment Links

### For Payment Links (if supported in your region):
1. Go to your payment link
2. Find **"Allow promotion codes"** setting
3. Toggle it **ON**
4. Save the payment link

### For Checkout Sessions (API method):
The coupon is automatically applied in our code when users enter it.

---

## Test the Coupon

### Test Process:
1. Go to booking page
2. Enter coupon code: `MINIPIA50`
3. See prices update:
   - 30 min: ~~€60~~ → **€30**
   - 60 min: ~~€100~~ → **€50**
4. Proceed to payment
5. Verify discount applied in Stripe checkout

### Test Card:
- Number: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits

---

## Monitor Usage

### Track Redemptions:
1. Go to Stripe Dashboard → Coupons
2. Click on `MINIPIA50`
3. View **"Times redeemed"** counter
4. Once it hits 50, coupon automatically stops working

### View Analytics:
- Total discount given
- Revenue impact
- Customer list who used coupon
- Conversion rate with coupon

---

## Email Campaign Text

Add this to your email campaigns:

```
🎉 LIMITED OFFER: First 50 Bookings Get 50% OFF!

Use code MINIPIA50 at checkout:
• 30-minute consultation: €30 (was €60)
• 1-hour deep dive: €50 (was €100)

Only 50 spots available - first come, first served!
Mini PIA grants end in 2027. Don't miss out!

[Book Now with 50% OFF →]
```

---

## Important Notes

⚠️ **Coupon Limits**:
- Maximum 50 redemptions (automatically enforced)
- One use per customer
- Cannot be combined with other offers

✅ **Why This Works**:
- Creates urgency (only 50 spots)
- Lowers barrier to entry
- Still profitable (€30-50 covers time)
- Builds initial client base quickly

📊 **Expected Results**:
- Faster initial bookings
- Social proof from first 50 clients
- Reviews and testimonials
- Word-of-mouth marketing

---

## Coupon Expiry Strategy

After 50 redemptions, consider:
1. Create new coupon `MINIPIA25` with 25% off
2. Or `EARLYBIRD20` with 20% off
3. Keep some incentive to maintain momentum

---

## Support
If customers have issues with the coupon:
- Verify they typed `MINIPIA50` correctly
- Check if 50 uses have been reached
- Manual discount can be applied if needed