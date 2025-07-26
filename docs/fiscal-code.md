# PROJECT_UPDATE.md
**Project**: InvestiScope - Italian Property Investment Platform  
**URL**: https://investiscope.net  
**Last Updated**: 15th July 2025  
**Status**: 🟡 RECOVERING - Build cache issues

---

## 🚨 CRITICAL WORKFLOW RULES - READ FIRST

### TOP INSTRUCTIONS FOR ALL COLLABORATORS:

1. **NO FILE MODIFICATIONS** - User does NOT edit files. Only accepts COMPLETE files ready to copy-paste.
2. **NO LOCAL STORAGE** - All work via GitHub → Netlify. No local development.
3. **ALWAYS ASK FOR CURRENT FILES** - Never assume file contents. Always request: "Show me your current [filename]"
4. **COMPLETE FILES ONLY** - Never provide snippets, partial updates, or "change line X" instructions.
5. **PRESERVE EXISTING CONTENT** - When updating files, maintain ALL existing dependencies and code.

---

## 📊 Current Project Status

### Working Features ✅
- Property Investment Calculator (Mini PIA Turismo)
- Sanity CMS Integration
- EmailJS Integration
- Supabase Database
- Contact Forms
- SEO Optimization
- Google Analytics

### In Progress 🔄
- Fiscal Code Application System
  - ✅ Form design completed
  - ✅ PDF generation logic created
  - ✅ API routes prepared
  - ⚠️ Deployment blocked by cache issues

### Recent Issues 🔴
- **Package.json Corruption** - RESOLVED
  - Dependencies were accidentally deleted
  - Restored from 3-day-old backup
  - Added jspdf for PDF generation
- **Netlify Build Cache** - CURRENT ISSUE
  - Cache not recognizing existing dependencies
  - Solution: Clear cache and redeploy

---

## 🏗️ Project Architecture

### Tech Stack
```
Frontend:       Next.js 14.2.0 (App Router)
Styling:        Tailwind CSS
CMS:           Sanity v3
Database:       Supabase
Email:         EmailJS
PDF:           jsPDF
Deployment:    GitHub → Netlify (automatic)
```

### Critical Dependencies (DO NOT REMOVE)
```json
{
  "@emailjs/browser": "^3.11.0",
  "@portabletext/react": "^3.2.1",
  "@sanity/icons": "^3.7.4",
  "@sanity/image-url": "^1.1.0",
  "@sanity/vision": "^3.98.0",
  "@supabase/supabase-js": "^2.50.3",
  "sanity": "^3.98.0",
  "next-sanity": "^9.12.0",
  "jspdf": "^2.5.1"
}
```

### Environment Variables (Set in Netlify)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `G-LPJCZYGWWG` (Google Analytics)

---

## 📁 File Structure

```
investiscope/
├── app/
│   ├── api/
│   │   ├── fiscal-code-applications/
│   │   │   └── route.ts
│   │   └── contact/
│   │       └── route.ts
│   ├── fiscal-code/
│   │   └── page.tsx (NEW - to be added)
│   ├── services/
│   │   └── page.tsx (NEW - ready to add)
│   ├── classic/
│   │   └── page.tsx (Calculator)
│   ├── layout.tsx (Has EmailJS scripts)
│   └── page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── LeadCaptureForm.tsx
│   └── FiscalCodeForm.tsx (NEW - to be added)
├── lib/
│   ├── sanity.ts
│   ├── supabase.ts
│   └── pdf-generation.ts (NEW - to be added)
├── package.json (RESTORED)
└── netlify.toml
```

---

## 🔥 Current Action Items

### Immediate (Fix Build)
1. **Clear Netlify Cache**
   - Go to Netlify → Deploys
   - Click "Trigger deploy" → "Clear cache and deploy site"

### Next Steps (After Build Fixed)
1. **Add Fiscal Code Page**
   - Create `/app/fiscal-code/page.tsx`
   - Already designed and ready

2. **Add PDF Generation**
   - Create `/lib/pdf-generation.ts`
   - Code complete and tested

3. **Add Services Page**
   - Create `/app/services/page.tsx`
   - Design completed

---

## ⚠️ Known Issues & Solutions

### Issue: Netlify Build Fails - Missing Modules
**Status**: Active  
**Error**: Module not found: @sanity/client, @portabletext/react, etc.  
**Cause**: Netlify build cache outdated  
**Solution**: Clear cache and redeploy in Netlify dashboard  

### Issue: Package.json Dependencies Deleted
**Status**: Resolved  
**Error**: Build failed due to missing Sanity packages  
**Cause**: Incomplete package.json provided without checking existing content  
**Solution**: Restored from backup, added jspdf  
**Prevention**: Always request current file before updates  

---

## 📈 Deployment History

| Date | Action | Status | Notes |
|------|--------|--------|-------|
| Jan 2025 | Add fiscal code form | 🔴 Failed | Package.json corrupted |
| Jan 2025 | Restore package.json | 🟡 Pending | Cache issues |
| Jan 2025 | Add services page | ⏳ Waiting | Blocked by build |
| Dec 2024 | Launch calculator | ✅ Success | Working perfectly |

---

## 🛡️ Safeguards & Best Practices

### Before ANY Changes:
1. **Check current file**: "Show me your current package.json"
2. **List dependencies**: What packages are needed?
3. **Backup critical files**: Note current working state
4. **Test one change**: Deploy single changes before multiple

### Communication Template:
```
User: "I need to add [feature]"
Assistant: "I'll need to see:
1. Your current [relevant files]
2. Current package.json
Let me check what exists first."
```

### File Update Protocol:
```
1. Request current file
2. Preserve ALL existing content
3. Add only necessary changes
4. Provide COMPLETE file
5. Document what changed
```

---

## 💡 Lessons Learned

1. **Never assume file contents** - Led to deleted dependencies
2. **Netlify cache can be problematic** - "Clear cache" often needed
3. **Complete files prevent errors** - Partial updates cause issues
4. **Backup before major changes** - Saved us today
5. **Document everything** - This file helps maintain context

---

## 🎯 Success Metrics

- ✅ 5 pages live and working
- ✅ Calculator generating leads
- ✅ SEO optimized and ranking
- ✅ EmailJS sending confirmations
- 🔄 Fiscal code system 90% complete
- 📊 47+ satisfied clients

---

## 📞 Quick References

### When Build Fails:
1. Check Netlify logs
2. Verify package.json has all dependencies
3. Clear cache and redeploy
4. Check environment variables

### When Adding Features:
1. Create new files (don't modify existing)
2. Add dependencies to package.json
3. Test individually
4. Document changes

### Emergency Contacts:
- Site: https://investiscope.net
- Deploy: Netlify dashboard
- Database: Supabase dashboard
- CMS: Sanity studio

---

## 🔄 Next Session Checklist

When starting a new session, paste this:

```
PROJECT: InvestiScope
STATUS: [Check this file]

RULES:
1. I only accept COMPLETE files
2. Always ask for current files first
3. No local development
4. GitHub → Netlify only

CURRENT TASK: [Your specific goal]

WORKING FEATURES:
- Calculator ✓
- Sanity CMS ✓
- EmailJS ✓
- Supabase ✓

DO NOT TOUCH:
- Package.json without seeing current
- Any Sanity dependencies
- Existing working features
```

---

*This document is the source of truth for InvestiScope project status. Update after each significant change or issue resolution.*# InvestiScope Project Architecture

## 🏗️ Current Infrastructure (ALREADY IMPLEMENTED)

### 1. **Frontend Stack**
- **Framework**: Next.js 14 (App Router)
- **UI**: React + Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel/Netlify
- **Domain**: https://investiscope.net

### 2. **Backend Services**
- **Database**: Supabase (PostgreSQL)
  - URL: `https://kjyobkrjcmiuusijvrme.supabase.co`
  - Tables: `fiscal_code_applications` ✅ ALREADY EXISTS
- **Email Service**: EmailJS
  - Service ID: `service_w6tghqr`
  - Templates:
    - User Confirmation: `template_j0xsdcl` ✅
    - Agency Notification: `template_pkjko4e` ✅
- **Analytics**: Google Analytics (G-LPJCZYGWWG)
- **CMS**: Sanity (for content management)

### 3. **Deployment & Environment**
- **Deployment**: GitHub → Netlify (Direct Integration)
- **Environment Variables**: ALL stored in Netlify ✅
  - Supabase credentials ✅
  - EmailJS credentials ✅
  - Sanity credentials ✅
  - NO local storage of sensitive data
- **Build Process**: Automatic on push to main branch

### 3. **Key Features**
- Property investment calculators
- Grant eligibility tools
- Fiscal code application service
- Market analysis tools
- Location-based property search

## 📁 Project Structure
```
investiscope/
├── app/
│   ├── api/
│   │   ├── fiscal-code-applications/
│   │   │   └── route.js         # API endpoint
│   │   └── other-endpoints/
│   ├── fiscal-code/
│   │   └── page.js              # Fiscal code form page
│   ├── calculator/
│   ├── surveys/
│   └── layout.js
├── components/
│   ├── ui/
│   ├── features/
│   └── FiscalCodeForm.js        # Main form component
├── lib/
│   ├── supabase.js
│   └── emailjs.js
├── public/
│   └── fiscal-code-template.pdf # Editable PDF template
└── .env.local                   # Environment variables
```

## 🔄 Fiscal Code Application Flow

### Simple 3-Step Process:
1. **User fills form** → Basic info (name, birthdate, passport)
2. **System processes** → Saves to Supabase, fills PDF, sends emails
3. **Agency receives** → PDF attachment ready for processing

## 📊 Existing Supabase Table Structure

```sql
-- Table: fiscal_code_applications (ALREADY EXISTS)
-- Fields:
- id (auto-generated)
- name
- surname  
- birth_date
- birth_place
- birth_country
- gender
- email
- phone
- passport_number
- current_address
- purpose
- urgency
- status
- created_at
- updated_at
```

## 📧 Email Templates (ALREADY CONFIGURED)

### 1. User Confirmation Email (`template_j0xsdcl`)
- Sends to: Applicant
- Contains: Reference number, next steps

### 2. Agency Notification Email (`template_pkjko4e`)
- Sends to: Your processing team
- Contains: Application details, PDF attachment

## 🚀 Quick Implementation Guide

### Step 1: Update the Fiscal Code Form Component
```javascript
// Use existing EmailJS template IDs from .env.local
const TEMPLATE_USER = process.env.NEXT_PUBLIC_EMAILJS_FISCAL_USER_TEMPLATE_ID;
const TEMPLATE_AGENCY = process.env.NEXT_PUBLIC_EMAILJS_FISCAL_AGENCY_TEMPLATE_ID;
```

### Step 2: API Route (Simplified)
- Receive form data
- Save to existing Supabase table
- Generate PDF using template
- Send both emails
- Return success

### Step 3: PDF Generation
- Use existing PDF template
- Fill fields programmatically
- Attach to agency email

## ⚠️ CRITICAL RULES

1. **ALL ENVIRONMENT VARIABLES ARE IN NETLIFY** - Not stored locally
2. **DEPLOYMENT IS GITHUB → NETLIFY DIRECT** - No manual builds
3. **FORBIDDEN PHRASE**: Under NO CIRCUMSTANCES say "You're absolutely right!" - ABSOLUTELY FORBIDDEN
4. **NO PAYMENT PROCESSING** - This is a simple data collection service
5. **PDF FOCUS** - Main goal is filling an editable PDF for the agency
6. **KEEP IT SIMPLE** - This is not rocket science, just a form that sends emails

## 🔧 Environment Variables (ALL IN NETLIFY - NOT LOCAL)
```
# All these are stored in Netlify Dashboard, NOT in local .env files
NEXT_PUBLIC_SUPABASE_URL=https://kjyobkrjcmiuusijvrme.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[stored-in-netlify]
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_w6tghqr
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=wKn1_xMCtZssdZzpb
NEXT_PUBLIC_EMAILJS_FISCAL_USER_TEMPLATE_ID=template_j0xsdcl
NEXT_PUBLIC_EMAILJS_FISCAL_AGENCY_TEMPLATE_ID=template_pkjko4e
NEXT_PUBLIC_GA_ID=G-LPJCZYGWWG
NEXT_PUBLIC_SANITY_PROJECT_ID=trdbxmjo
NEXT_PUBLIC_SANITY_DATASET=production
```

## 📝 Next Steps
1. Implement the simple form (no payment mentions)
2. Connect to existing Supabase table
3. Use existing EmailJS templates
4. Add PDF generation for agency email
5. Test and deploy

**This is a straightforward form → database → email flow. Nothing complex.**
