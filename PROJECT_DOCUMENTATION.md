# InvestInPuglia.eu - PROJECT DOCUMENTATION
Generated on: 2025-07-31 07:24:04

## 🏆 GOLDEN RULES FOR DEVELOPMENT

### 🏆 GOLDEN RULE #1: STEP BY STEP APPROACH
Claude will NOT fire instructions like a headless chicken but go STEP BY STEP in achieving the objective. Only after having a CLEAR PLAN and having EXPLAINED that plan to Giuseppe and WHY it will work. Claude will NEVER just make or write code trying or guessing a solution because TIME IS PRECIOUS AND PATIENCE IS LIMITED!

### 🏆 GOLDEN RULE #2: GITHUB EDITING
Giuseppe edits code DIRECTLY ON GITHUB, which means local machine does not have changes unless we git pull. Claude must remember this when giving instructions about code changes.

### 🏆 GOLDEN RULE #3: WINDOWS ENVIRONMENT
Giuseppe uses Windows with PowerShell, not Linux/Mac terminal. Commands must be appropriate for this environment.

### 🏆 GOLDEN RULE #4: COMPLETE CODE UPDATES
Claude will ONLY UPDATE CODE if Claude has seen the existing file in the repo and after having visualized the existing file code will update accordingly. NO CODE CHANGES unless there is a clear understanding of what exists to avoid conflicts with other files.

### 🏆 GOLDEN RULE #5: NO LINE REDUCTION WITHOUT JUSTIFICATION
Claude will NEVER return code updated with less lines than its original unless clearly justified and explained previously to Giuseppe.

---

## 🚀 PROJECT OVERVIEW

**Project Name:** InvestInPuglia.eu
**Platform:** Investment Advisory & EU Grants Platform for Puglia, Italy
**Repository:** https://github.com/Geppix140269/investinpuglia-eu
**Live URL:** https://investinpuglia.eu

### 📋 QUICK FACTS
- **Framework:** Next.js 14.2.0
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase
- **CMS:** Sanity
- **AI Assistant:** Trullo Chatbot (Multi-language)

## 🎯 PLATFORM PURPOSE

InvestInPuglia.eu is a comprehensive platform designed to help international investors discover and secure EU grants and investment opportunities in Puglia, Italy. The platform features:

- **EU Grants Calculator** - Calculate potential grants up to €2.25M
- **Property Investment Advisory** - Expert guidance for foreign investors
- **Trullo AI Assistant** - Multi-language chatbot for instant assistance
- **Buyer Profile System** - Personalized investment matching
- **Multi-language Support** - 7 languages (EN, IT, ES, FR, DE, AR, ZH)

## 🏗️ ARCHITECTURE

### Tech Stack
```
Frontend:
├── Next.js 14.2.0 (App Router)
├── React 18
├── TypeScript
├── Tailwind CSS
└── Framer Motion (animations)

Backend:
├── Supabase (Database & Auth)
├── Sanity CMS (Content Management)
├── Next.js API Routes
└── EmailJS (Email Service)

AI/Chatbot:
├── OpenAI API Integration
├── Multi-language Support
├── Session Management
└── Lead Capture System
```

## 📁 PROJECT STRUCTURE
```
├── .nvmrc
├── app/
│   ├── (forms)/
│   │   └── contract/
│   │       └── submit/
│   │           ├── actions.ts
│   │           └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── admin/
│   │   ├── fiscal-code
│   │   └── page.tsx
│   ├── api/
│   │   ├── buyer-profile/
│   │   │   ├── complete/
│   │   │   │   └── route.ts
│   │   │   └── success/
│   │   │       └── page.tsx
│   │   ├── calculator/
│   │   │   ├── calculate/
│   │   │   │   └── route.ts
│   │   │   ├── config/
│   │   │   │   └── route.ts
│   │   │   └── stats/
│   │   │       └── route.ts
│   │   ├── chat/
│   │   │   └── route.ts
│   │   ├── createPost/
│   │   │   └── route.ts
│   │   ├── fiscal-code-applications/
│   │   │   └── route.ts
│   │   ├── get-industries/
│   │   │   └── route.ts
│   │   ├── import-industries/
│   │   │   └── route.ts
│   │   ├── lead-capture/
│   │   │   └── route.ts
│   │   ├── trullo-log/
│   │   │   └── route.ts
│   │   └── trullo-message/
│   │       └── route.ts
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── buyer-profile/
│   │   └── page.tsx
│   ├── calculator/
│   │   └── page.tsx
│   ├── classic/
│   │   ├── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── cookies/
│   │   └── page.tsx
│   ├── faq/
│   │   └── page.tsx
│   ├── fiscal-code/
│   │   ├── components/
│   │   │   └── FiscalCodeForm.tsx
│   │   └── page.tsx
│   ├── globals.css
│   ├── how-it-works/
│   │   └── page.tsx
│   ├── industries/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── investment-process/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── legal-notice/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── page.tsx
│   ├── preliminary-sale-contract/
│   │   └── page.tsx
│   ├── privacy/
│   │   └── page.tsx
│   ├── services/
│   │   └── page.tsx
│   ├── sitemap.ts
│   ├── studio/
│   │   └── [[...tool]]/
│   │       └── page.tsx
│   ├── surveys/
│   │   ├── order/
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   └── report/
│   │       └── page.tsx
│   ├── terms/
│   │   └── page.tsx
│   ├── tools/
│   │   └── page.tsx
│   ├── trullo-monitor/
│   │   └── page.tsx
│   └── [locale]/
│       ├── industries/
│       │   └── [slug]/
│       │       └── page.tsx
│       └── locations/
│           ├── page.tsx
│           └── [slug]/
│               └── page.tsx
├── audit-fixed.ps1
├── audit-project.js
├── audit.ps1
├── components/
│   ├── AuthGuard.tsx
│   ├── ContactClient.tsx
│   ├── ContractSubmitForm.tsx
│   ├── CTAButton.tsx
│   ├── ExitIntentPopup.tsx
│   ├── FAQClient.tsx
│   ├── FiscalCodeForm.tsx
│   ├── Footer.tsx
│   ├── GoogleLoginButton.tsx
│   ├── HeroPuglia.tsx
│   ├── LeadCaptureForm.tsx
│   ├── Navbar.tsx
│   ├── PropertyInvestmentTimeline.tsx
│   ├── SectionLoader.tsx
│   ├── sections/
│   │   ├── AboutGiuseppe.tsx
│   │   ├── BuyerProfile.tsx
│   │   ├── CTASection.tsx
│   │   ├── FAQ.tsx
│   │   ├── GrantInstitutions.tsx
│   │   ├── HeroSection.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── OpportunitySection.tsx
│   │   ├── Services.tsx
│   │   └── SuccessStories.tsx
│   ├── trullo/
│   │   ├── ChatInput.tsx
│   │   ├── ChatMessages.tsx
│   │   ├── constants/
│   │   │   ├── prompts.ts
│   │   │   └── translations.ts
│   │   ├── ContactForm.tsx
│   │   ├── hooks/
│   │   │   └── useChat.ts
│   │   ├── TrulloChatbot.tsx
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── utils/
│   │       ├── api.ts
│   │       └── authentication.ts
│   ├── TrulloChatbotWrapper.tsx
│   ├── TrulloChatbot_full.tsx
│   └── TrulloPromptBanner.tsx
├── contexts/
│   └── AuthContext.tsx
├── data/
│   └── puglia-cities.csv
├── deploy-locations.sh
├── desktop.ini
├── docs/
│   ├── MULTI-DOMAIN-STRATEGY.md
│   ├── PROJECT-STATUS.md
│   └── session_summary.md
├── INVESTINPUGLIA_PROJECT_AUDIT.md
├── INVESTINPUGLIA_QUICK_BRIEF.md
├── lib/
│   ├── database.ts
│   ├── generatePdfBlob.ts
│   ├── iconMappings.tsx
│   ├── locations.ts
│   ├── pdf-generation.ts
│   ├── PortableText.tsx
│   ├── queries.ts
│   ├── sanity/
│   │   └── client.ts
│   ├── sanity.ts
│   ├── sendContractEmail.ts
│   ├── sendContractWithEmailJS.ts
│   ├── services/
│   │   └── calculatorConfigService.ts
│   ├── supabase.ts
│   └── uploadFileToSupabase.ts
├── middleware.ts.backup
├── netlify/
│   └── functions/
│       └── createBlogPost.js
├── netlify.toml
├── New Text Document.txt
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── public/
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── apple-touch-icon.png
│   ├── Brigitte.png
│   ├── browserconfig.xml
│   ├── EN_co_fundedvertical_RGB_POS.png
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon.ico
│   ├── Giuseppe Funaro 062025.jpg
│   ├── icon/
│   │   ├── alert.png
│   │   ├── Bell.png
│   │   ├── calculator.png
│   │   ├── calendar.png
│   │   ├── chart.png
│   │   ├── check.png
│   │   ├── crown.png
│   │   ├── document.png
│   │   ├── Euro.png
│   │   ├── Gavel.png
│   │   ├── Gear.png
│   │   ├── globe.png
│   │   ├── Hammer.png
│   │   ├── HouseArrowUP.png
│   │   ├── LockKeyhole.png
│   │   ├── MagnifyingGlass.png
│   │   ├── mail.png
│   │   ├── MapPin.png
│   │   ├── notification.mp3
│   │   ├── Shield.png
│   │   ├── smartphone.png
│   │   ├── SpeechBubble.png
│   │   ├── Speedometer.png
│   │   ├── triangularFlag.png
│   │   ├── TrulloHouse.png
│   │   ├── UpwardArrow.png
│   │   ├── User.png
│   │   ├── Villa.png
│   │   └── whatsapp.png
│   ├── icons
│   ├── IMG_3382.JPG
│   ├── LOGO-REGIONE-PUGLIA-PNG.webp
│   ├── Logo_InvestInPuglia_Black.png
│   ├── Logo_InvestInPuglia_Black.svg
│   ├── Logo_InvestInPuglia_Morph.png
│   ├── Logo_InvestInPuglia_Teal.png
│   ├── Logo_InvestInPuglia_Teal.svg
│   ├── Logo_InvestInPuglia_White.png
│   ├── Logo_InvestInPuglia_White.svg
│   ├── manifest.json
│   ├── Mini-PIA-Grant-Guide-2025.pdf
│   ├── og-image.png
│   ├── puglia-background-fallback.jpg
│   ├── puglia-background.mp4
│   ├── puglia-background.mp4.mp4
│   ├── puglia-bg.jpg
│   ├── regione_puglia-Photoroom.png
│   ├── robots.txt
│   ├── site.webmanifest
│   ├── sitemap.xml
│   ├── test-sitemap.xml
│   ├── trullo.png
│   ├── _headers
│   └── _redirects
├── README.md
├── sanity/
│   ├── env.ts
│   ├── lib/
│   │   ├── client.ts
│   │   ├── image.ts
│   │   └── live.ts
│   └── structure.ts
├── sanity-blog-upload/
│   ├── blog-upload-clean.js
│   ├── enhanced-blog-upload.js
│   ├── package-lock.json
│   └── package.json
├── sanity-industries-upload/
│   └── upload-industries.js
├── sanity-studio/
│   ├── eslint.config.mjs
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── sanity.cli.ts
│   ├── sanity.config.ts
│   ├── schemaTypes/
│   │   ├── author.ts
│   │   ├── blockContent.ts
│   │   ├── calculationResult.ts
│   │   ├── calculatorConfig.ts
│   │   ├── category.ts
│   │   ├── index.ts
│   │   ├── industryPage.ts
│   │   ├── locationPage.ts
│   │   ├── objects/
│   │   │   └── seo.ts
│   │   └── post.ts
│   ├── static/
│   └── tsconfig.json
├── sanity.cli.ts
├── sanity.config.ts
├── schemas/
│   ├── locationPage.ts
│   └── objects/
│       └── seo.ts
├── scripts/
│   ├── create-daily-pages.js
│   ├── import-puglia-locations.js
│   └── import-puglia-locations.js.backup
├── tailwind.config.js
└── tsconfig.json

```

## 📄 KEY FILES AND COMPONENTS

### Core Application Files

### Pages
- `app\(forms)\contract\submit\page.tsx` - 3.71 KB
- `app\about\page.tsx` - 10.94 KB
- `app\admin\page.tsx` - 3.18 KB
- `app\api\buyer-profile\success\page.tsx` - 1.94 KB
- `app\blog\page.tsx` - 2.02 KB
- `app\blog\[slug]\page.tsx` - 7.82 KB
- `app\buyer-profile\page.tsx` - 21.73 KB
- `app\calculator\page.tsx` - 10.87 KB
- `app\classic\page.tsx` - 88.44 KB
- `app\classic\register\page.tsx` - 15.28 KB
- ... and 24 more files

### Components
- `components\AuthGuard.tsx` - 1.25 KB
- `components\ContactClient.tsx` - 17.11 KB
- `components\ContractSubmitForm.tsx` - 4.00 KB
- `components\CTAButton.tsx` - 5.14 KB
- `components\ExitIntentPopup.tsx` - 8.13 KB
- `components\FAQClient.tsx` - 21.20 KB
- `components\FiscalCodeForm.tsx` - 18.77 KB
- `components\Footer.tsx` - 7.68 KB
- `components\GoogleLoginButton.tsx` - 1.39 KB
- `components\HeroPuglia.tsx` - 0.88 KB
- ... and 27 more files

### API Routes
- `app\api\buyer-profile\complete\route.ts` - 2.18 KB
- `app\api\calculator\calculate\route.ts` - 2.95 KB
- `app\api\calculator\config\route.ts` - 0.92 KB
- `app\api\calculator\stats\route.ts` - 0.65 KB
- `app\api\chat\route.ts` - 1.66 KB
- `app\api\createPost\route.ts` - 2.62 KB
- `app\api\fiscal-code-applications\route.ts` - 5.30 KB
- `app\api\get-industries\route.ts` - 0.85 KB
- `app\api\import-industries\route.ts` - 118.60 KB
- `app\api\lead-capture\route.ts` - 1.77 KB
- ... and 2 more files

### Configuration
- `next.config.js` - 0.20 KB
- `package.json` - 1.17 KB
- `sanity-blog-upload\package.json` - 0.32 KB
- `sanity-studio\package.json` - 0.81 KB
- `sanity-studio\tsconfig.json` - 0.42 KB
- `tailwind.config.js` - 0.50 KB
- `tsconfig.json` - 0.62 KB

### Lib/Utils
- `lib\database.ts` - 1.52 KB
- `lib\generatePdfBlob.ts` - 1.49 KB
- `lib\iconMappings.tsx` - 7.91 KB
- `lib\locations.ts` - 2.90 KB
- `lib\pdf-generation.ts` - 13.50 KB
- `lib\PortableText.tsx` - 6.41 KB
- `lib\queries.ts` - 0.30 KB
- `lib\sanity\client.ts` - 0.41 KB
- `lib\sanity.ts` - 0.30 KB
- `lib\sendContractEmail.ts` - 0.73 KB
- ... and 4 more files

## 🚀 FEATURES

### Current Features
- ✅ Next.js Application
- ✅ Tailwind CSS
- ✅ TypeScript
- ✅ Sanity CMS
- ✅ Static Assets
- ✅ Trullo AI Chatbot
- ✅ Supabase Database
- ✅ React
- ✅ EmailJS Integration

### Key Functionalities
- **Multi-domain Support** - Subdomains for each language
- **EU Grants Calculator** - Real-time grant calculations
- **Property Surveys** - Professional property evaluation
- **Buyer Profile Matching** - Personalized investment opportunities
- **Contract Generation** - Automated preliminary contracts
- **Lead Management** - Integrated CRM via Supabase
- **SEO Optimized** - Multi-language SEO support
- **Exit Intent Popups** - Lead capture optimization

## 🛠️ DEVELOPMENT

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Sanity account
- Environment variables (see `.env.example`)

### Installation
```bash
# Clone the repository
git clone https://github.com/Geppix140269/investinpuglia-eu.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev
```

### Available Scripts
```json
"dev": "next dev"
"build": "next build"
"start": "next start"
"lint": "next lint"
```

## 🔧 CONFIGURATION

### Environment Variables Required
```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=

# Email Service
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=

# OpenAI (for Trullo)
OPENAI_API_KEY=

# Google Analytics
NEXT_PUBLIC_GA_ID=
```

## 📱 COMPONENTS OVERVIEW

### Trullo AI Chatbot
- **Location:** `components/trullo/`
- **Features:** Multi-language support, lead capture, session tracking
- **Languages:** EN, IT, ES, FR, DE, AR, ZH
- **Position:** Center-bottom (recently updated)

### Page Sections (Modularized)
- **HeroSection** - Landing page hero with CTA
- **GrantInstitutions** - EU funding partners
- **OpportunitySection** - Investment opportunities
- **HowItWorks** - Process explanation
- **BuyerProfile** - Profile creation CTA
- **AboutGiuseppe** - Founder information
- **Services** - Service offerings
- **SuccessStories** - Client testimonials
- **FAQ** - Frequently asked questions
- **CTASection** - Bottom call-to-action

## 🌐 DEPLOYMENT

### Hosting
- **Primary:** Vercel/Netlify
- **Domain:** investinpuglia.eu
- **Subdomains:** Language-specific (en., it., es., etc.)

### Build Command
```bash
npm run build
```

### Production Checklist
- [ ] Environment variables set
- [ ] Database migrations run
- [ ] Sanity content published
- [ ] SSL certificates active
- [ ] Analytics configured
- [ ] SEO meta tags verified

## 📊 PROJECT STATISTICS

- **Total Files:** 152
- **Last Updated:** 2025-07-31 07:24:04
- **Primary Language:** TypeScript/JavaScript
- **Target Audience:** International investors interested in Puglia

## 🤝 TEAM

- **Founder/CEO:** Giuseppe Funaro
- **Development:** Geppix140269
- **Advisory Partners:** 
  - Ing. Russo (Otranto) - Property Development
  - Studio Quarta (Lecce) - EU Funding Experts

## 📞 CONTACT

- **Email:** info@investinpuglia.eu
- **Phone:** +39 351 400 1402
- **GitHub:** https://github.com/Geppix140269/investinpuglia-eu

---

*This documentation was automatically generated by the project audit script.*
