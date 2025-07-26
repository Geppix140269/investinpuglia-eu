# InvestiScope Documentation

## Project Overview

InvestiScope is a comprehensive investment analysis and portfolio management platform that provides real-time market insights, portfolio tracking, and investment decision support tools.

## Tech Stack

- **Frontend**: React/Next.js
- **Backend**: Supabase (Database, Auth, Real-time)
- **Deployment**: Netlify
- **Version Control**: GitHub
- **Database**: PostgreSQL (via Supabase)

## Documentation Structure

### 1. Getting Started
- [Quick Start Guide](#quick-start-guide)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [First Time User Guide](#first-time-user-guide)

### 2. User Guides
- [Dashboard Overview](#dashboard-overview)
- [Portfolio Management](#portfolio-management)
- [Market Analysis Tools](#market-analysis-tools)
- [Investment Tracking](#investment-tracking)
- [Reports and Analytics](#reports-and-analytics)

### 3. Technical Documentation
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [Component Library](#component-library)
- [State Management](#state-management)
- [Authentication Flow](#authentication-flow)

### 4. Development
- [Development Setup](#development-setup)
- [Contributing Guidelines](#contributing-guidelines)
- [Code Standards](#code-standards)
- [Testing Guidelines](#testing-guidelines)
- [Deployment Process](#deployment-process)

### 5. Configuration
- [Supabase Configuration](#supabase-configuration)
- [Netlify Deployment](#netlify-deployment)
- [Environment Variables](#environment-variables)
- [Security Settings](#security-settings)

### 6. Features
- [Real-time Data](#real-time-data)
- [Portfolio Analytics](#portfolio-analytics)
- [Risk Assessment](#risk-assessment)
- [Market Insights](#market-insights)
- [User Management](#user-management)

---

## Quick Start Guide

### Prerequisites
- Node.js 18+ 
- Git
- Supabase account
- Netlify account (for deployment)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/[your-username]/investiscope.git
cd investiscope
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

4. **Configure Supabase**
- Create a new Supabase project
- Copy your project URL and anon key to `.env.local`
- Run the database migrations

5. **Start development server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see your application.

---

## Environment Setup

### Required Environment Variables

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Application Configuration
NEXT_PUBLIC_SITE_URL=https://your-app.netlify.app
NEXTAUTH_SECRET=your_nextauth_secret

# API Keys (if applicable)
MARKET_DATA_API_KEY=your_market_data_api_key
```

### Supabase Setup

1. **Create Tables**
```sql
-- Users table (extends Supabase auth.users)
CREATE TABLE public.user_profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portfolios table
CREATE TABLE public.portfolios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  total_value DECIMAL(15,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Holdings table
CREATE TABLE public.holdings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  portfolio_id UUID REFERENCES public.portfolios(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  quantity DECIMAL(15,8) NOT NULL,
  avg_cost DECIMAL(15,2) NOT NULL,
  current_price DECIMAL(15,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions table
CREATE TABLE public.transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  portfolio_id UUID REFERENCES public.portfolios(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  type TEXT CHECK (type IN ('buy', 'sell', 'dividend', 'split')),
  quantity DECIMAL(15,8) NOT NULL,
  price DECIMAL(15,2) NOT NULL,
  fees DECIMAL(15,2) DEFAULT 0,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

2. **Set up Row Level Security (RLS)**
```sql
-- Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.holdings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own portfolios" ON public.portfolios
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own portfolios" ON public.portfolios
  FOR ALL USING (auth.uid() = user_id);
```

---

## API Reference

### Authentication

All API endpoints require authentication via Supabase Auth.

### Endpoints

#### Portfolios
- `GET /api/portfolios` - Get user's portfolios
- `POST /api/portfolios` - Create new portfolio
- `PUT /api/portfolios/:id` - Update portfolio
- `DELETE /api/portfolios/:id` - Delete portfolio

#### Holdings
- `GET /api/portfolios/:id/holdings` - Get portfolio holdings
- `POST /api/portfolios/:id/holdings` - Add new holding
- `PUT /api/holdings/:id` - Update holding
- `DELETE /api/holdings/:id` - Remove holding

#### Transactions
- `GET /api/portfolios/:id/transactions` - Get portfolio transactions
- `POST /api/portfolios/:id/transactions` - Add new transaction

#### Market Data
- `GET /api/market/quote/:symbol` - Get real-time quote
- `GET /api/market/history/:symbol` - Get historical data

---

## Component Library

### Layout Components
- `<Header />` - Main navigation header
- `<Sidebar />` - Dashboard sidebar navigation
- `<Footer />` - Application footer

### UI Components
- `<Button />` - Primary action button
- `<Card />` - Content container
- `<Modal />` - Modal dialog
- `<Table />` - Data table with sorting/filtering
- `<Chart />` - Interactive charts

### Feature Components
- `<PortfolioCard />` - Portfolio summary display
- `<HoldingRow />` - Individual holding display
- `<TransactionForm />` - Add/edit transaction
- `<MarketQuote />` - Real-time price display

---

## Development Guidelines

### Code Standards

1. **File Structure**
```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── features/     # Feature-specific components
│   └── layout/       # Layout components
├── pages/            # Next.js pages
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── lib/              # External service configs
└── types/            # TypeScript type definitions
```

2. **Naming Conventions**
- Components: PascalCase (`PortfolioCard.tsx`)
- Files: camelCase (`portfolioUtils.ts`)
- Constants: UPPER_SNAKE_CASE (`API_ENDPOINTS`)

3. **TypeScript**
- All components must be typed
- Use interfaces for props
- Export types from `types/` directory

### Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

### Deployment

#### Automatic Deployment (Recommended)
1. Push to `main` branch
2. Netlify automatically builds and deploys
3. Environment variables are configured in Netlify dashboard

#### Manual Deployment
```bash
# Build the application
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=.next
```

---

## Security Considerations

### Data Protection
- All sensitive data encrypted at rest (Supabase)
- API keys stored in environment variables
- Row Level Security enabled on all tables

### Authentication
- Supabase Auth handles user management
- JWT tokens for API authentication
- Session management with automatic refresh

### Best Practices
- Input validation on all forms
- SQL injection prevention via Supabase client
- XSS protection via React's built-in escaping
- HTTPS enforced on all environments

---

## Support and Contributing

### Getting Help
- Check the [FAQ](#faq)
- Search existing [GitHub Issues](https://github.com/[your-username]/investiscope/issues)
- Create a new issue with detailed information

### Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup for Contributors
```bash
# Fork and clone the repo
git clone https://github.com/[your-username]/investiscope.git

# Install dependencies
npm install

# Create your environment file
cp .env.example .env.local

# Set up pre-commit hooks
npm run prepare

# Start development server
npm run dev
```

---

## FAQ

**Q: How do I add a new investment to my portfolio?**
A: Navigate to your portfolio, click "Add Holding", enter the symbol and quantity, then save.

**Q: Can I import data from other platforms?**
A: Yes, we support CSV imports from major brokerage platforms. Go to Settings > Import Data.

**Q: How often is market data updated?**
A: Real-time data is updated every 15 seconds during market hours.

**Q: Is my financial data secure?**
A: Yes, all data is encrypted and stored securely with Supabase. We follow industry-standard security practices.

---

## Changelog

### v1.0.0 (Current)
- Initial release
- Portfolio creation and management
- Real-time market data integration
- Transaction tracking
- Basic analytics and reporting

### Roadmap
- v1.1.0: Advanced charting and analytics
- v1.2.0: Mobile app
- v1.3.0: API for third-party integrations
- v2.0.0: AI-powered investment insights

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📚 Documentation

- [📊 Project Diagnostic](./docs/PROJECT_DIAGNOSTIC.md) - Comprehensive project audit
- [🏗️ Architecture Guide](./docs/ARCHITECTURE.md) - Technical architecture details  
- [🔌 API Reference](./docs/API_REFERENCE.md) - Complete API documentation
- [🚀 Deployment Guide](./docs/DEPLOYMENT_GUIDE.md) - Deployment and maintenance
