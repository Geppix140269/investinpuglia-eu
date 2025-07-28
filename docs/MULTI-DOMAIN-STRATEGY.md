# 🌐 Multi-Domain Strategy & Implementation Plan

## 1. Multi-Domain Architecture

### Domain Mapping Strategy
```
investinpuglia.eu → Main investment promotion site (current)
investiscope.net → Professional dashboard & project management
in-puglia.com → Tourism/lifestyle focus  
inpuglia.eu → Business directory/marketplace
apulink.com → Professional network (architects, accountants, consultants)
```

### Implementation Approach: Middleware-Based Routing

Create a middleware that detects the domain and serves different content from the same codebase:

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const DOMAIN_CONFIG = {
  'investinpuglia.eu': {
    theme: 'investment',
    locale: 'en',
    features: ['calculator', 'locations', 'blog'],
    sanityDataset: 'production',
    showAuth: false // Remove login for now
  },
  'investiscope.net': {
    theme: 'dashboard',
    locale: 'en',
    features: ['analytics', 'projects', 'professionals'],
    sanityDataset: 'investiscope',
    showAuth: true
  },
  'apulink.com': {
    theme: 'professionals',
    locale: 'en',
    features: ['directory', 'registration', 'networking'],
    sanityDataset: 'professionals',
    showAuth: true
  },
  'in-puglia.com': {
    theme: 'tourism',
    locale: 'en',
    features: ['places', 'experiences', 'guides'],
    sanityDataset: 'tourism',
    showAuth: false
  },
  'inpuglia.eu': {
    theme: 'business',
    locale: 'it',
    features: ['directory', 'marketplace', 'networking'],
    sanityDataset: 'business',
    showAuth: true
  }
};

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const domain = hostname.replace('www.', '').split(':')[0];
  
  // Get domain config or default to investinpuglia.eu
  const config = DOMAIN_CONFIG[domain] || DOMAIN_CONFIG['investinpuglia.eu'];
  
  // Clone the request headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-domain', domain);
  requestHeaders.set('x-theme', config.theme);
  requestHeaders.set('x-features', config.features.join(','));
  requestHeaders.set('x-sanity-dataset', config.sanityDataset);
  requestHeaders.set('x-show-auth', config.showAuth.toString());
  
  // Rewrite to theme-specific routes
  const url = request.nextUrl.clone();
  
  // Route to different app sections based on domain
  if (config.theme !== 'investment') {
    url.pathname = `/_sites/${config.theme}${url.pathname}`;
  }
  
  return NextResponse.rewrite(url, {
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
```

## 2. Fix InvestinPuglia.eu Login/Buyer Profile

### Immediate Solution: Remove Login Components
```typescript
// components/Navbar.tsx - Remove login button
export function Navbar() {
  // Remove showAuth check
  return (
    <nav className="navbar">
      {/* Navigation items without login */}
      <Link href="/calculator">Investment Calculator</Link>
      <Link href="/locations">Locations</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}

// Remove or simplify buyer-profile routes
// Convert to public information pages instead
```

### Future Enhancement: Simplified Auth for Other Domains
```typescript
// lib/auth/simple-auth.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const supabase = createClientComponentClient();

// Simplified authentication for professional domains
export async function signInWithEmail(email: string) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  
  if (error) throw error;
  return data;
}
```

## 3. ApuLink Professional Network Features

### A. Professional Registration System
```typescript
// schemas/professional.ts (Sanity Schema)
export const professionalType = {
  name: 'professional',
  title: 'Professional',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'profession',
      title: 'Profession',
      type: 'string',
      options: {
        list: [
          { title: 'Architect', value: 'architect' },
          { title: 'Accountant', value: 'accountant' },
          { title: 'Lawyer', value: 'lawyer' },
          { title: 'Engineer', value: 'engineer' },
          { title: 'Consultant', value: 'consultant' },
          { title: 'Real Estate Agent', value: 'realtor' },
        ],
      },
    },
    {
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'languages',
      title: 'Languages',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'services',
      title: 'Services Offered',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        { name: 'email', type: 'email', title: 'Email' },
        { name: 'phone', type: 'string', title: 'Phone' },
        { name: 'website', type: 'url', title: 'Website' },
        { name: 'linkedin', type: 'url', title: 'LinkedIn' },
      ],
    },
    {
      name: 'verified',
      title: 'Verified Professional',
      type: 'boolean',
      initialValue: false,
    },
  ],
};
```

### B. Project Management Dashboard
```typescript
// app/_sites/dashboard/projects/page.tsx
import { Suspense } from 'react';

interface Project {
  id: string;
  name: string;
  status: 'planning' | 'active' | 'completed';
  budget: number;
  timeline: string;
  team: Professional[];
  documents: Document[];
  milestones: Milestone[];
}

export default function ProjectsDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Project Management</h1>
        
        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Active Projects" value="12" change="+3" />
          <StatCard title="Total Investment" value="€2.4M" change="+15%" />
          <StatCard title="Completed" value="8" change="+2" />
          <StatCard title="Team Members" value="47" change="+5" />
        </div>

        {/* Project List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
            <ProjectList />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickAction
            icon="📋"
            title="New Project"
            description="Start a new investment project"
            href="/projects/new"
          />
          <QuickAction
            icon="👥"
            title="Find Professionals"
            description="Connect with verified experts"
            href="/professionals"
          />
          <QuickAction
            icon="📊"
            title="Analytics"
            description="View project performance"
            href="/analytics"
          />
        </div>
      </div>
    </div>
  );
}

// Project List Component
function ProjectList() {
  const projects = [
    {
      id: '1',
      name: 'Bari Tech Hub',
      status: 'active',
      progress: 65,
      budget: '€500,000',
      deadline: '2025-12-31',
    },
    {
      id: '2',
      name: 'Lecce Tourism Complex',
      status: 'planning',
      progress: 20,
      budget: '€1,200,000',
      deadline: '2026-06-30',
    },
    // Add more projects
  ];

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className="border rounded-lg p-4 hover:shadow-md transition"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-lg">{project.name}</h3>
              <p className="text-sm text-gray-600">
                Budget: {project.budget} | Deadline: {project.deadline}
              </p>
            </div>
            <StatusBadge status={project.status} />
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{project.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### C. Professional Directory Component
```typescript
// app/_sites/professionals/directory/page.tsx
export default function ProfessionalDirectory() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Verified Professionals</h1>
      
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search by name or keyword"
            className="col-span-2 px-4 py-2 border rounded-lg"
          />
          <select className="px-4 py-2 border rounded-lg">
            <option>All Professions</option>
            <option>Architects</option>
            <option>Accountants</option>
            <option>Lawyers</option>
            <option>Engineers</option>
          </select>
          <select className="px-4 py-2 border rounded-lg">
            <option>All Locations</option>
            <option>Bari</option>
            <option>Lecce</option>
            <option>Taranto</option>
          </select>
        </div>
      </div>

      {/* Professional Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProfessionalCard
          name="Maria Rossi"
          profession="Architect"
          location="Bari"
          rating={4.8}
          reviews={32}
          verified={true}
          specialties={['Commercial', 'Restoration', 'Sustainable Design']}
        />
        <ProfessionalCard
          name="Giovanni Bianchi"
          profession="Accountant"
          location="Lecce"
          rating={4.9}
          reviews={28}
          verified={true}
          specialties={['Tax Planning', 'International Business', 'Startups']}
        />
        {/* Add more professional cards */}
      </div>
    </div>
  );
}
```

## 4. Implementation Roadmap

### Phase 1: Domain Setup & Routing (Week 1)
- [ ] Configure DNS for all domains to point to Netlify
- [ ] Implement middleware for domain detection
- [ ] Create folder structure for multi-site content
- [ ] Test routing between domains

### Phase 2: Fix InvestinPuglia.eu (Week 2)
- [ ] Remove broken login components
- [ ] Simplify navigation
- [ ] Convert buyer profile to public information pages
- [ ] Test and deploy changes

### Phase 3: Professional Features (Week 3-4)
- [ ] Create Sanity schemas for professionals
- [ ] Build registration flow for professionals
- [ ] Implement project management dashboard
- [ ] Create professional directory with search

### Phase 4: Domain-Specific Content (Week 5-6)
- [ ] Create unique homepages for each domain
- [ ] Implement domain-specific features
- [ ] Set up separate Sanity datasets
- [ ] Configure analytics per domain

## 5. Technical Implementation Details

### Environment Variables per Domain
```env
# Add to .env.local
NEXT_PUBLIC_INVESTISCOPE_FEATURES=analytics,projects,team
NEXT_PUBLIC_APULINK_FEATURES=directory,registration,verification
NEXT_PUBLIC_TOURISM_FEATURES=places,booking,guides
```

### Domain Detection Hook
```typescript
// hooks/useDomain.ts
import { useHeaders } from 'next/headers';

export function useDomain() {
  const headers = useHeaders();
  const domain = headers.get('x-domain') || 'investinpuglia.eu';
  const theme = headers.get('x-theme') || 'investment';
  const features = headers.get('x-features')?.split(',') || [];
  
  return {
    domain,
    theme,
    features,
    isFeatureEnabled: (feature: string) => features.includes(feature),
  };
}
```

### Conditional Rendering Based on Domain
```typescript
// components/DomainLayout.tsx
export function DomainLayout({ children }) {
  const { theme, domain } = useDomain();
  
  return (
    <div className={`theme-${theme}`}>
      <DomainNavbar domain={domain} />
      <main>{children}</main>
      <DomainFooter domain={domain} />
    </div>
  );
}
```

This approach allows you to:
- Maintain a single codebase for all domains
- Share components and logic across sites
- Customize content and features per domain
- Scale easily by adding new domains
- Reduce maintenance overhead

Would you like me to create specific components or help with any particular aspect of this implementation?
