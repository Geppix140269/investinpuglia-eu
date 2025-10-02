# Deploy inpuglia.eu Variant - Step by Step Guide

## Prerequisites
- Git branch `inpuglia-eu-variant` has been pushed to GitHub ✓
- Netlify CLI is installed ✓

## Deployment Steps

### Step 1: Create the Netlify Site
```bash
netlify sites:create --name inpuglia-eu-variant
```
- Select: **1402 Celsius Ltd** (when prompted)
- Note the **Site ID** from the output

### Step 2: Link to the New Site
Replace `[SITE_ID]` with the ID from Step 1:
```bash
netlify link --id [SITE_ID]
```

### Step 3: Configure Build Settings
Replace `[SITE_ID]` with your site ID:
```bash
netlify api updateSite --site-id [SITE_ID] --data "{\"build_settings\":{\"cmd\":\"npm run build\",\"dir\":\".next\"},\"repo\":{\"provider\":\"github\",\"repo\":\"Geppix140269/investinpuglia-eu\",\"branch\":\"inpuglia-eu-variant\"}}"
```

### Step 4: Get Environment Variables from Main Site
```bash
netlify env:list --site-id 4d05000c-827e-4750-8384-b0ab3a279334
```
Copy all the variable names - you'll need them in the next step.

### Step 5: Copy Each Environment Variable
For each variable from Step 4, run (replace `[SITE_ID]`, `VAR_NAME`, and `VALUE`):
```bash
netlify env:set VAR_NAME "VALUE" --site-id [SITE_ID]
```

**Common variables to copy:**
- NEXT_PUBLIC_SANITY_PROJECT_ID
- NEXT_PUBLIC_SANITY_DATASET
- SANITY_API_TOKEN
- NEXT_PUBLIC_FIREBASE_API_KEY
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
- NEXT_PUBLIC_FIREBASE_PROJECT_ID
- FIREBASE_ADMIN_CLIENT_EMAIL
- FIREBASE_ADMIN_PRIVATE_KEY
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- EMAILJS_SERVICE_ID
- EMAILJS_TEMPLATE_ID
- EMAILJS_PUBLIC_KEY
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- STRIPE_SECRET_KEY
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- OPENAI_API_KEY
- TWILIO_ACCOUNT_SID
- TWILIO_AUTH_TOKEN
- TWILIO_VERIFY_SERVICE_SID

### Step 6: Set Site URL for New Domain
Replace `[SITE_ID]`:
```bash
netlify env:set NEXT_PUBLIC_SITE_URL "https://inpuglia.eu" --site-id [SITE_ID]
```

### Step 7: Add Custom Domain
Replace `[SITE_ID]`:
```bash
netlify domains:add inpuglia.eu --site-id [SITE_ID]
```

### Step 8: Deploy to Production
Replace `[SITE_ID]`:
```bash
netlify deploy --prod --site-id [SITE_ID]
```

## Alternative: Use Netlify Dashboard

If CLI is causing issues, you can configure everything via the dashboard:

1. **Create Site**: https://app.netlify.com/start
   - Import from GitHub: `Geppix140269/investinpuglia-eu`
   - Branch: `inpuglia-eu-variant`
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Add Domain**:
   - Go to: Domain management → Add custom domain
   - Enter: `inpuglia.eu`
   - Netlify will handle DNS automatically

3. **Copy Environment Variables**:
   - From main site: https://app.netlify.com/sites/investinpuglia/settings/env
   - To new site: Environment variables section
   - Update `NEXT_PUBLIC_SITE_URL` to `https://inpuglia.eu`

4. **Enable Next.js Plugin**:
   - Build settings → Plugins
   - Install `@netlify/plugin-nextjs`

5. **Deploy**:
   - Trigger a new deploy from Deploys tab

## Verification Checklist

After deployment:
- [ ] Site is live at https://inpuglia.eu
- [ ] All service tier pages load correctly:
  - [ ] /pricing
  - [ ] /foundation-package
  - [ ] /property-snapshot
  - [ ] /project-oversight
  - [ ] /full-orchestration
- [ ] Contact form works
- [ ] Navigation is correct
- [ ] Footer links work
- [ ] SSL certificate is active

## A/B Testing Setup

Main site: https://investinpuglia.eu (GitHub main branch)
Test variant: https://inpuglia.eu (GitHub inpuglia-eu-variant branch)

Track metrics:
- Conversion rates on service pages
- Time on page
- Form submissions
- Bounce rates
- User engagement with pricing page
