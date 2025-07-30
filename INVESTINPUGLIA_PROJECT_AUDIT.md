# INVESTINPUGLIA.EU PROJECT AUDIT & ARCHITECTURE
Generated on: 2025-07-29 19:21:34

## PROJECT OVERVIEW

**Project Name:** InvestInPuglia.eu
**Type:** [To be determined based on your project]
**Stack:** [To be determined from package.json]
**Status:** [Current development status]

## PLATFORM PURPOSE

[This section will be filled based on the actual project purpose]


### DETECTED STACK

**Framework:** Next.js 14.2.0

**Key Dependencies:**
- react: ^18
- next: 14.2.0
- typescript: ^5
- tailwindcss: ^3.3.0 (dev)
- @supabase/supabase-js: ^2.50.3


## DIRECTORY STRUCTURE
```
.sanity
.sanity/runtime
app
app/(forms)
app/(forms)/contract
app/(forms)/contract/submit
app/[locale]
app/[locale]/industries
app/[locale]/industries/[slug]
app/[locale]/locations
app/[locale]/locations/[slug]
app/admin
app/api
app/api/buyer-profile
app/api/buyer-profile/complete
app/api/buyer-profile/success
app/api/calculator
app/api/calculator/calculate
app/api/calculator/config
app/api/calculator/stats
app/api/chat
app/api/createPost
app/api/fiscal-code-applications
app/api/import-industries
app/api/lead-capture
app/api/trullo-log
app/api/trullo-message
app/auth
app/auth/callback
app/blog
app/blog/[slug]
app/buyer-profile
app/calculator
app/classic
app/classic/register
app/contact
app/cookies
app/faq
app/fiscal-code
app/fiscal-code/components
app/how-it-works
app/industries
app/industries/[slug]
app/investment-process
app/legal-notice
app/login
app/preliminary-sale-contract
app/privacy
app/services
app/studio
app/studio/[[...tool]]
app/surveys
app/surveys/order
app/surveys/report
app/terms
app/tools
app/trullo-monitor
components
components/trullo
components/trullo/constants
components/trullo/hooks
components/trullo/types
components/trullo/utils
contexts
data
docs
lib
lib/sanity
lib/services
netlify
netlify/functions
public
public/icon
sanity
sanity/lib
sanity-blog-upload
sanity-studio
sanity-studio/schemaTypes
sanity-studio/schemaTypes/objects
sanity-studio/static
schemas
schemas/objects
scripts
```

### KEY FILES:
```
.sanity/runtime/app.js - 0.31 KB
app/(forms)/contract/submit/actions.ts - 1.23 KB
app/(forms)/contract/submit/page.tsx - 3.71 KB
app/[locale]/industries/[slug]/page.tsx - 9.39 KB
app/[locale]/locations/[slug]/page.tsx - 7.68 KB
app/[locale]/locations/page.tsx - 8.2 KB
app/admin/page.tsx - 3.18 KB
app/api/buyer-profile/success/page.tsx - 1.94 KB
app/blog/[slug]/page.tsx - 7.82 KB
app/blog/page.tsx - 2.02 KB
app/buyer-profile/page.tsx - 21.73 KB
app/calculator/page.tsx - 10.87 KB
app/classic/page.tsx - 88.44 KB
app/classic/register/page.tsx - 15.28 KB
app/contact/page.tsx - 5.87 KB
app/cookies/page.tsx - 2.75 KB
app/faq/page.tsx - 1.19 KB
app/fiscal-code/components/FiscalCodeForm.tsx - 15.39 KB
app/fiscal-code/page.tsx - 65.89 KB
app/globals.css - 12.16 KB
app/how-it-works/page.tsx - 14.9 KB
app/industries/[slug]/page.tsx - 8.37 KB
app/industries/page.tsx - 3.72 KB
app/investment-process/page.tsx - 3.02 KB
app/legal-notice/page.tsx - 16.08 KB
app/login/page.tsx - 5.47 KB
app/page.tsx - 43.76 KB
app/preliminary-sale-contract/page.tsx - 4.39 KB
app/privacy/page.tsx - 17.9 KB
app/services/page.tsx - 7.82 KB
app/sitemap.ts - 2.2 KB
app/studio/[[...tool]]/page.tsx - 0.64 KB
app/surveys/order/page.tsx - 14.92 KB
app/surveys/page.tsx - 20.36 KB
app/surveys/report/page.tsx - 16.13 KB
app/terms/page.tsx - 20.14 KB
app/tools/page.tsx - 13.52 KB
app/trullo-monitor/page.tsx - 18.26 KB
components/AuthGuard.tsx - 1.25 KB
components/ContactClient.tsx - 17.11 KB
components/ContractSubmitForm.tsx - 4 KB
components/CTAButton.tsx - 5.14 KB
components/ExitIntentPopup.tsx - 8.13 KB
components/FAQClient.tsx - 21.2 KB
components/FiscalCodeForm.tsx - 18.77 KB
components/Footer.tsx - 6.09 KB
components/GoogleLoginButton.tsx - 1.39 KB
components/HeroPuglia.tsx - 0.88 KB
components/LeadCaptureForm.tsx - 3.93 KB
components/Navbar.tsx - 9.52 KB
components/PropertyInvestmentTimeline.tsx - 20.19 KB
components/trullo/ChatInput.tsx - 2.41 KB
components/trullo/ChatMessages.tsx - 3.27 KB
components/trullo/constants/prompts.ts - 23.54 KB
components/trullo/constants/translations.ts - 7.25 KB
components/trullo/ContactForm.tsx - 3.54 KB
components/trullo/hooks/useChat.ts - 6.9 KB
components/trullo/TrulloChatbot.tsx - 7.53 KB
components/trullo/types/index.ts - 0.52 KB
components/trullo/utils/api.ts - 2.35 KB
components/trullo/utils/authentication.ts - 6.45 KB
components/TrulloChatbot_full.tsx - 49.38 KB
components/TrulloChatbotWrapper.tsx - 2.9 KB
contexts/AuthContext.tsx - 3.27 KB
docs/MULTI-DOMAIN-STRATEGY.md - 13.42 KB
docs/PROJECT-STATUS.md - 8.56 KB
docs/session_summary.md - 12.71 KB
INVESTINPUGLIA_PROJECT_AUDIT.md - 2.07 KB
lib/database.ts - 1.52 KB
lib/generatePdfBlob.ts - 1.49 KB
lib/iconMappings.tsx - 7.91 KB
lib/locations.ts - 2.9 KB
lib/pdf-generation.ts - 13.5 KB
lib/PortableText.tsx - 6.41 KB
lib/queries.ts - 0.3 KB
lib/sanity.ts - 0.3 KB
lib/sanity/client.ts - 0.41 KB
lib/sendContractEmail.ts - 0.73 KB
lib/sendContractWithEmailJS.ts - 0.8 KB
lib/services/calculatorConfigService.ts - 6.59 KB
lib/supabase.ts - 4.5 KB
lib/uploadFileToSupabase.ts - 0.76 KB
netlify/functions/createBlogPost.js - 2.71 KB
next.config.js - 0.2 KB
package.json - 1.17 KB
postcss.config.js - 0.09 KB
public/manifest.json - 0.54 KB
README.md - 0.23 KB
sanity.cli.ts - 0.36 KB
sanity.config.ts - 0.93 KB
sanity/env.ts - 0.53 KB
sanity/lib/client.ts - 0.28 KB
sanity/lib/image.ts - 0.36 KB
sanity/lib/live.ts - 0.55 KB
sanity/structure.ts - 0.55 KB
sanity-blog-upload/blog-upload-clean.js - 2.84 KB
sanity-blog-upload/enhanced-blog-upload.js - 74.3 KB
sanity-blog-upload/package.json - 0.32 KB
tailwind.config.js - 0.5 KB
tsconfig.json - 0.62 KB
```

## SIMPLIFIED TREE VIEW

```
InvestInPuglia.eu/
+-- .sanity/
    +-- runtime/
+-- app/
    +-- (forms)/
    +-- about/
    +-- admin/
    +-- api/
    +-- auth/
+-- components/
    +-- trullo/
+-- contexts/
+-- data/
+-- docs/
+-- lib/
    +-- sanity/
    +-- services/
+-- netlify/
    +-- functions/
+-- public/
    +-- icon/
+-- sanity/
    +-- lib/
+-- sanity-blog-upload/
+-- sanity-studio/
    +-- schemaTypes/
    +-- static/
+-- schemas/
    +-- objects/
+-- scripts/
+-- INVESTINPUGLIA_PROJECT_AUDIT.md
+-- next.config.js
+-- package-lock.json
+-- package.json
+-- postcss.config.js
+-- README.md
+-- sanity.cli.ts
+-- sanity.config.ts
+-- tailwind.config.js
+-- tsconfig.json
```

## DETECTED FEATURES

- Next.js 13+ App Router
- TypeScript
- Static Assets Directory

## AVAILABLE SCRIPTS

```json
"dev": "next dev"
"build": "next build"
"start": "next start"
"lint": "next lint"
```

## QUICK START COMMANDS

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

## PROJECT STRUCTURE NOTES

- Check package.json for all available scripts
- Look for .env.example for required environment variables
- Review README.md for project-specific instructions

---

Generated by InvestInPuglia.eu Audit Script
Use this document to onboard new developers or AI assistants
