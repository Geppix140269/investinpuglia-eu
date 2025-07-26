# InvestiScope Architecture Documentation

## System Overview

InvestiScope is a Next.js-based investment analysis platform designed for Italian property market investments, specifically focusing on Mini PIA Turismo grant calculations and property investment guidance.

## Architecture Diagram

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client Side   │    │   Server Side   │    │   External      │
│                 │    │                 │    │   Services      │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ Next.js Frontend│◄──►│ Next.js API     │◄──►│ Supabase        │
│ React Components│    │ Routes          │    │ PostgreSQL      │
│ TypeScript      │    │ Server Actions  │    │                 │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ State Management│    │ Authentication  │◄──►│ Supabase Auth   │
│ Local Storage   │    │ Session Mgmt    │    │                 │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ UI Components   │    │ Business Logic  │◄──►│ EmailJS         │
│ Custom CSS      │    │ Calculations    │    │ WhatsApp API    │
└─────────────────┘    └─────────────────┘    │ Calendly        │
                                              │ Sanity CMS      │
                                              └─────────────────┘
```

## Technology Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **UI Library**: React 18+
- **Styling**: Custom CSS with modern design patterns
- **State Management**: React hooks + Local Storage
- **Forms**: Native HTML forms with React event handlers

### Backend
- **API**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (JWT-based)
- **Real-time**: Supabase real-time subscriptions
- **File Storage**: Browser-based (no server storage)

### Infrastructure
- **Hosting**: Netlify
- **Deployment**: GitHub → Netlify (automatic)
- **CDN**: Netlify Edge Network
- **SSL**: Automatic HTTPS via Netlify

### External Integrations
- **Email**: EmailJS for automated reports
- **Analytics**: Google Analytics 4
- **Communication**: WhatsApp Business API
- **Scheduling**: Calendly integration
- **CMS**: Sanity for content management

## Data Architecture

### Database Schema (Supabase)

```sql
-- Core user management
user_profiles {
  id: UUID (PK, FK to auth.users)
  username: TEXT
  full_name: TEXT
  avatar_url: TEXT
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
}

-- Investment portfolios
portfolios {
  id: UUID (PK)
  user_id: UUID (FK)
  name: TEXT
  description: TEXT
  total_value: DECIMAL
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
}

-- Individual holdings
holdings {
  id: UUID (PK)
  portfolio_id: UUID (FK)
  symbol: TEXT
  quantity: DECIMAL
  avg_cost: DECIMAL
  current_price: DECIMAL
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
}

-- Transaction history
transactions {
  id: UUID (PK)
  portfolio_id: UUID (FK)
  symbol: TEXT
  type: ENUM ('buy', 'sell', 'dividend', 'split')
  quantity: DECIMAL
  price: DECIMAL
  fees: DECIMAL
  date: TIMESTAMP
  notes: TEXT
  created_at: TIMESTAMP
}

-- Lead management
leads {
  id: UUID (PK)
  email: TEXT
  name: TEXT
  phone: TEXT
  source: TEXT
  metadata: JSONB
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
}

-- Analysis results
analyses {
  id: UUID (PK)
  lead_id: UUID (FK)
  analysis_type: TEXT
  property_value: DECIMAL
  renovation_budget: DECIMAL
  grant_amount: DECIMAL
  total_investment: DECIMAL
  roi_percentage: DECIMAL
  analysis_data: JSONB
  created_at: TIMESTAMP
}

-- Analytics tracking
cta_clicks {
  id: UUID (PK)
  session_id: TEXT
  cta_type: TEXT
  cta_location: TEXT
  page_url: TEXT
  metadata: JSONB
  timestamp: TIMESTAMP
  user_agent: TEXT
}

page_views {
  id: UUID (PK)
  session_id: TEXT
  page_url: TEXT
  referrer: TEXT
  timestamp: TIMESTAMP
  time_on_page: INTEGER
  user_agent: TEXT
}
```

### Security Model

**Row Level Security (RLS)**
- All tables have RLS enabled
- Users can only access their own data
- Service role for admin operations

**Authentication Flow**
1. User signs up/in via Supabase Auth
2. JWT token issued and stored
3. Token included in all API requests
4. Server validates token on each request

## Component Architecture

### Page Components
```
/app
├── page.tsx                 # Landing page
├── calculator/
│   └── page.tsx            # Calculator selection
├── classic/
│   └── page.tsx            # Advanced Mini PIA calculator
└── surveys/
    └── order/
        └── page.tsx        # Service ordering system
```

### Reusable Components
```
/components
├── ui/
│   ├── Button.tsx          # CTA buttons with tracking
│   ├── Card.tsx           # Content containers
│   ├── Modal.tsx          # Dialog modals
│   ├── Table.tsx          # Data tables
│   └── Chart.tsx          # Financial charts
├── features/
│   ├── PortfolioCard.tsx   # Portfolio summaries
│   ├── HoldingRow.tsx      # Individual holdings
│   ├── TransactionForm.tsx # Transaction entry
│   ├── MarketQuote.tsx     # Real-time prices
│   └── PropertyInvestmentTimeline.tsx # Investment process
└── layout/
    ├── Header.tsx          # Navigation
    ├── Sidebar.tsx         # Dashboard navigation
    └── Footer.tsx          # Site footer
```

### Business Logic
```
/lib
├── supabase.ts            # Database client & types
├── database.ts            # Database operations
├── calculations.ts        # Financial calculations
└── utils.ts              # Utility functions
```

## Data Flow

### Mini PIA Calculator Flow
1. **User Input** → Sliders for property costs, renovations, etc.
2. **Real-time Calculation** → JavaScript functions compute grants
3. **Display Update** → DOM manipulation shows results
4. **Report Generation** → PDF creation with jsPDF
5. **Lead Capture** → Form submission to Supabase
6. **Email Delivery** → EmailJS sends personalized report

### Service Ordering Flow
1. **Service Selection** → User chooses surveys/bundles
2. **Price Calculation** → Dynamic pricing with discounts
3. **Form Submission** → Contact details + requirements
4. **Lead Storage** → Supabase database entry
5. **Notification** → Email to sales team

## Performance Considerations

### Frontend Optimization
- **Static Generation**: Next.js builds static pages where possible
- **Component Lazy Loading**: Dynamic imports for large components
- **Image Optimization**: Next.js automatic image optimization
- **Bundle Splitting**: Automatic code splitting per route

### Database Optimization
- **Indexing**: Proper indexes on frequently queried columns
- **Query Optimization**: Efficient Supabase queries
- **Connection Pooling**: Built-in Supabase connection management
- **Caching**: Next.js ISR for static content

### CDN & Delivery
- **Global CDN**: Netlify edge network
- **Asset Optimization**: Automatic compression and minification
- **GZIP Compression**: Automatic content compression
- **Browser Caching**: Proper cache headers

## Scalability Architecture

### Horizontal Scaling
- **Stateless Design**: No server-side sessions
- **Database Scaling**: Supabase auto-scaling
- **CDN Distribution**: Global content delivery
- **API Rate Limiting**: Built-in Supabase limits

### Monitoring & Observability
- **Analytics**: Google Analytics for user behavior
- **Error Tracking**: Console logging (recommend Sentry)
- **Performance**: Lighthouse metrics
- **Uptime**: Netlify status monitoring

## Security Architecture

### Authentication & Authorization
- **JWT Tokens**: Supabase-issued tokens
- **Session Management**: Automatic token refresh
- **Role-Based Access**: User vs. admin permissions
- **API Security**: Token validation on all endpoints

### Data Protection
- **Encryption at Rest**: Supabase encrypted storage
- **HTTPS Everywhere**: Mandatory SSL/TLS
- **Input Validation**: Client and server-side validation
- **XSS Prevention**: React's built-in protection
- **CSRF Protection**: SameSite cookies

### Privacy & Compliance
- **Data Minimization**: Only collect necessary data
- **User Consent**: Clear privacy policies
- **Data Retention**: Configurable retention policies
- **GDPR Compliance**: Right to deletion, data export

## Development Architecture

### Code Organization
```
investiscope/
├── app/                   # Next.js app directory
├── components/            # Reusable React components
├── lib/                  # Business logic & utilities
├── public/               # Static assets
├── docs/                 # Documentation
├── .env.local           # Environment variables
├── next.config.js       # Next.js configuration
└── package.json         # Dependencies
```

### Build Process
1. **Development**: `npm run dev` (hot reload)
2. **Type Checking**: TypeScript compilation
3. **Linting**: ESLint code quality checks
4. **Building**: `npm run build` (production optimization)
5. **Deployment**: Automatic via Netlify

### Environment Management
- **Development**: Local environment with dev database
- **Staging**: Preview deployments on Netlify
- **Production**: Main branch auto-deployment
- **Environment Variables**: Managed via Netlify dashboard