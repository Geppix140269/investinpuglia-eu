// audit-project.js
// Save this file in your project root directory and run: node audit-project.js

const fs = require('fs');
const path = require('path');

// Configuration
const PROJECT_NAME = 'InvestInPuglia.eu';
const OUTPUT_FILE = 'PROJECT_DOCUMENTATION.md';
const IGNORE_DIRS = [
  'node_modules',
  '.git',
  '.next',
  'dist',
  'build',
  '.sanity',
  '.vercel',
  'coverage',
  '.env',
  '.env.local'
];

const IGNORE_FILES = [
  '.DS_Store',
  'Thumbs.db',
  '*.log',
  '*.lock',
  '.env*'
];

// Helper functions
function shouldIgnore(filePath) {
  const fileName = path.basename(filePath);
  const dirName = path.dirname(filePath);
  
  // Check if in ignored directory
  for (const ignoreDir of IGNORE_DIRS) {
    if (filePath.includes(ignoreDir)) return true;
  }
  
  // Check if ignored file
  for (const ignorePattern of IGNORE_FILES) {
    if (ignorePattern.includes('*')) {
      const pattern = ignorePattern.replace('*', '');
      if (fileName.includes(pattern)) return true;
    } else if (fileName === ignorePattern) {
      return true;
    }
  }
  
  return false;
}

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return (stats.size / 1024).toFixed(2) + ' KB';
  } catch {
    return '0 KB';
  }
}

function getDirectoryStructure(dir, prefix = '', isLast = true) {
  if (shouldIgnore(dir)) return '';
  
  const files = fs.readdirSync(dir).filter(f => !shouldIgnore(path.join(dir, f)));
  let result = '';
  
  files.forEach((file, index) => {
    const filePath = path.join(dir, file);
    const isLastFile = index === files.length - 1;
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      result += `${prefix}${isLastFile ? '└── ' : '├── '}${file}/\n`;
      result += getDirectoryStructure(filePath, prefix + (isLastFile ? '    ' : '│   '), isLastFile);
    } else {
      result += `${prefix}${isLastFile ? '└── ' : '├── '}${file}\n`;
    }
  });
  
  return result;
}

function getImportantFiles(dir, basePath = '') {
  let files = [];
  
  if (shouldIgnore(dir)) return files;
  
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const relativePath = path.join(basePath, item);
      
      if (shouldIgnore(fullPath)) continue;
      
      const stats = fs.statSync(fullPath);
      
      if (stats.isDirectory()) {
        files = files.concat(getImportantFiles(fullPath, relativePath));
      } else if (stats.isFile()) {
        // Include important files
        const ext = path.extname(item);
        const importantExts = ['.tsx', '.ts', '.jsx', '.js', '.json', '.md', '.css'];
        
        if (importantExts.includes(ext) || ['package.json', 'README.md', '.env.example'].includes(item)) {
          files.push({
            path: relativePath,
            size: getFileSize(fullPath),
            fullPath: fullPath
          });
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }
  
  return files;
}

function getPackageInfo() {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    return {
      name: packageJson.name || 'Unknown',
      version: packageJson.version || '0.0.0',
      description: packageJson.description || 'No description',
      scripts: packageJson.scripts || {},
      dependencies: packageJson.dependencies || {},
      devDependencies: packageJson.devDependencies || {}
    };
  } catch {
    return null;
  }
}

function detectFeatures() {
  const features = [];
  
  // Check for common files and directories
  if (fs.existsSync('next.config.js') || fs.existsSync('next.config.mjs')) {
    features.push('Next.js Application');
  }
  if (fs.existsSync('tailwind.config.js')) {
    features.push('Tailwind CSS');
  }
  if (fs.existsSync('tsconfig.json')) {
    features.push('TypeScript');
  }
  if (fs.existsSync('.sanity')) {
    features.push('Sanity CMS');
  }
  if (fs.existsSync('supabase')) {
    features.push('Supabase Integration');
  }
  if (fs.existsSync('public')) {
    features.push('Static Assets');
  }
  if (fs.existsSync('components/trullo')) {
    features.push('Trullo AI Chatbot');
  }
  
  // Check package.json for more features
  const pkg = getPackageInfo();
  if (pkg && pkg.dependencies) {
    if (pkg.dependencies['@supabase/supabase-js']) features.push('Supabase Database');
    if (pkg.dependencies['react']) features.push('React');
    if (pkg.dependencies['@emailjs/browser']) features.push('EmailJS Integration');
    if (pkg.dependencies['recharts']) features.push('Data Visualization (Recharts)');
  }
  
  return features;
}

function generateDocumentation() {
  console.log('🔍 Starting project audit...\n');
  
  const pkg = getPackageInfo();
  const features = detectFeatures();
  const importantFiles = getImportantFiles('.');
  const timestamp = new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0];
  
  let documentation = `# ${PROJECT_NAME} - PROJECT DOCUMENTATION
Generated on: ${timestamp}

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

**Project Name:** ${PROJECT_NAME}
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
\`\`\`
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
\`\`\`

## 📁 PROJECT STRUCTURE
\`\`\`
${getDirectoryStructure('.')}
\`\`\`

## 📄 KEY FILES AND COMPONENTS

### Core Application Files
`;

  // Add important files section
  const categorizedFiles = {
    'Pages': importantFiles.filter(f => f.path.startsWith('app') && f.path.endsWith('page.tsx')),
    'Components': importantFiles.filter(f => f.path.startsWith('components')),
    'API Routes': importantFiles.filter(f => f.path.includes('api') && f.path.endsWith('route.ts')),
    'Configuration': importantFiles.filter(f => ['package.json', 'tsconfig.json', 'next.config.js', 'tailwind.config.js'].includes(path.basename(f.path))),
    'Lib/Utils': importantFiles.filter(f => f.path.startsWith('lib')),
  };

  for (const [category, files] of Object.entries(categorizedFiles)) {
    if (files.length > 0) {
      documentation += `\n### ${category}\n`;
      files.slice(0, 10).forEach(file => {
        documentation += `- \`${file.path}\` - ${file.size}\n`;
      });
      if (files.length > 10) {
        documentation += `- ... and ${files.length - 10} more files\n`;
      }
    }
  }

  documentation += `
## 🚀 FEATURES

### Current Features
`;

  features.forEach(feature => {
    documentation += `- ✅ ${feature}\n`;
  });

  documentation += `
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
- Environment variables (see \`.env.example\`)

### Installation
\`\`\`bash
# Clone the repository
git clone https://github.com/Geppix140269/investinpuglia-eu.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev
\`\`\`

### Available Scripts
`;

  if (pkg && pkg.scripts) {
    documentation += '```json\n';
    for (const [script, command] of Object.entries(pkg.scripts)) {
      documentation += `"${script}": "${command}"\n`;
    }
    documentation += '```\n';
  }

  documentation += `
## 🔧 CONFIGURATION

### Environment Variables Required
\`\`\`
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
\`\`\`

## 📱 COMPONENTS OVERVIEW

### Trullo AI Chatbot
- **Location:** \`components/trullo/\`
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
\`\`\`bash
npm run build
\`\`\`

### Production Checklist
- [ ] Environment variables set
- [ ] Database migrations run
- [ ] Sanity content published
- [ ] SSL certificates active
- [ ] Analytics configured
- [ ] SEO meta tags verified

## 📊 PROJECT STATISTICS

- **Total Files:** ${importantFiles.length}
- **Last Updated:** ${timestamp}
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
`;

  // Write to file
  fs.writeFileSync(OUTPUT_FILE, documentation);
  console.log(`✅ Documentation generated: ${OUTPUT_FILE}`);
  console.log(`📄 Total size: ${getFileSize(OUTPUT_FILE)}`);
}

// Run the audit
console.log('🚀 InvestInPuglia.eu Project Audit Tool\n');
generateDocumentation();