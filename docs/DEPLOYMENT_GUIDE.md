# InvestiScope API Reference

## Overview

InvestiScope uses a combination of Next.js API routes and Supabase client-side operations for data management. This document covers all available endpoints, database operations, and external API integrations.

## Authentication

All API requests require authentication via Supabase Auth JWT tokens.

```typescript
// Headers required for authenticated requests
{
  "Authorization": "Bearer <supabase_jwt_token>",
  "Content-Type": "application/json"
}
```

## Base URLs

- **Development**: `http://localhost:3000`
- **Production**: `https://your-app.netlify.app`
- **Supabase**: `https://kjyobkrjcmiuusijvrme.supabase.co`

---

## Portfolio Management API

### GET /api/portfolios
Get all portfolios for the authenticated user.

**Authentication**: Required

**Response**:
```json
{
  "data": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "name": "My Investment Portfolio",
      "description": "Real estate investments",
      "total_value": 1250000.00,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "error": null
}
```

### POST /api/portfolios
Create a new portfolio.

**Authentication**: Required

**Request Body**:
```json
{
  "name": "New Portfolio",
  "description": "Portfolio description"
}
```

**Response**:
```json
{
  "data": {
    "id": "uuid",
    "user_id": "uuid",
    "name": "New Portfolio",
    "description": "Portfolio description",
    "total_value": 0.00,
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  },
  "error": null
}
```

### PUT /api/portfolios/[id]
Update an existing portfolio.

**Authentication**: Required

**Request Body**:
```json
{
  "name": "Updated Portfolio Name",
  "description": "Updated description"
}
```

### DELETE /api/portfolios/[id]
Delete a portfolio and all associated holdings.

**Authentication**: Required

**Response**:
```json
{
  "success": true,
  "message": "Portfolio deleted successfully"
}
```

---

## Holdings Management API

### GET /api/portfolios/[id]/holdings
Get all holdings for a specific portfolio.

**Authentication**: Required

**Response**:
```json
{
  "data": [
    {
      "id": "uuid",
      "portfolio_id": "uuid",
      "symbol": "PROPERTY_001",
      "quantity": 1.0,
      "avg_cost": 800000.00,
      "current_price": 850000.00,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "error": null
}
```

### POST /api/portfolios/[id]/holdings
Add a new holding to a portfolio.

**Authentication**: Required

**Request Body**:
```json
{
  "symbol": "PROPERTY_002",
  "quantity": 1.0,
  "avg_cost": 650000.00,
  "current_price": 650000.00
}
```

### PUT /api/holdings/[id]
Update an existing holding.

**Authentication**: Required

**Request Body**:
```json
{
  "quantity": 1.0,
  "avg_cost": 675000.00,
  "current_price": 700000.00
}
```

### DELETE /api/holdings/[id]
Remove a holding from portfolio.

**Authentication**: Required

---

## Transaction Management API

### GET /api/portfolios/[id]/transactions
Get transaction history for a portfolio.

**Authentication**: Required

**Query Parameters**:
- `limit` (optional): Number of transactions to return (default: 50)
- `offset` (optional): Pagination offset (default: 0)
- `type` (optional): Filter by transaction type ('buy', 'sell', 'dividend', 'split')

**Response**:
```json
{
  "data": [
    {
      "id": "uuid",
      "portfolio_id": "uuid",
      "symbol": "PROPERTY_001",
      "type": "buy",
      "quantity": 1.0,
      "price": 800000.00,
      "fees": 15000.00,
      "date": "2024-01-01T00:00:00Z",
      "notes": "Initial property purchase",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "error": null,
  "pagination": {
    "total": 25,
    "limit": 50,
    "offset": 0
  }
}
```

### POST /api/portfolios/[id]/transactions
Record a new transaction.

**Authentication**: Required

**Request Body**:
```json
{
  "symbol": "PROPERTY_001",
  "type": "buy",
  "quantity": 1.0,
  "price": 800000.00,
  "fees": 15000.00,
  "date": "2024-01-01T10:00:00Z",
  "notes": "Property purchase in Puglia"
}
```

---

## Market Data API

### GET /api/market/quote/[symbol]
Get real-time market data for a symbol.

**Authentication**: Required

**Response**:
```json
{
  "data": {
    "symbol": "PROPERTY_001",
    "current_price": 850000.00,
    "change": 50000.00,
    "change_percent": 6.25,
    "last_updated": "2024-01-01T15:30:00Z",
    "market_status": "open"
  },
  "error": null
}
```

### GET /api/market/history/[symbol]
Get historical price data.

**Authentication**: Required

**Query Parameters**:
- `period`: Time period ('1d', '7d', '1m', '3m', '1y')
- `interval`: Data interval ('1h', '1d', '1w')

**Response**:
```json
{
  "data": {
    "symbol": "PROPERTY_001",
    "prices": [
      {
        "date": "2024-01-01T00:00:00Z",
        "price": 800000.00
      },
      {
        "date": "2024-01-02T00:00:00Z",
        "price": 805000.00
      }
    ]
  },
  "error": null
}
```

---

## Lead Management API

### POST /api/leads
Create a new lead from calculator or contact forms.

**Authentication**: Not required (public endpoint)

**Request Body**:
```json
{
  "email": "investor@example.com",
  "name": "John Smith",
  "phone": "+39 123 456 7890",
  "source": "mini_pia_calculator",
  "metadata": {
    "property_value": 800000,
    "renovation_budget": 400000,
    "grant_amount": 480000,
    "location": "Puglia",
    "timeline": "6-12 months"
  }
}
```

**Response**:
```json
{
  "data": {
    "id": "uuid",
    "email": "investor@example.com",
    "name": "John Smith",
    "phone": "+39 123 456 7890",
    "source": "mini_pia_calculator",
    "created_at": "2024-01-01T00:00:00Z",
    "metadata": { ... }
  },
  "success": true
}
```

### GET /api/leads
Get all leads (admin only).

**Authentication**: Required (admin role)

**Query Parameters**:
- `limit`: Number of leads to return
- `offset`: Pagination offset
- `source`: Filter by lead source
- `date_from`: Filter from date
- `date_to`: Filter to date

---

## Analysis Storage API

### POST /api/analyses
Store calculation results.

**Authentication**: Required

**Request Body**:
```json
{
  "lead_id": "uuid",
  "analysis_type": "mini_pia_calculator",
  "property_value": 800000.00,
  "renovation_budget": 400000.00,
  "grant_amount": 480000.00,
  "total_investment": 1200000.00,
  "roi_percentage": 15.5,
  "analysis_data": {
    "fixtures_fittings": 150000,
    "innovation_component": 24000,
    "environmental_component": 30000,
    "design_pm": 24000,
    "preliminary_studies": 20655,
    "grant_rate": 0.4
  }
}
```

### GET /api/analyses/[id]
Get specific analysis results.

**Authentication**: Required

---

## Analytics Tracking API

### POST /api/analytics/cta-click
Track CTA button clicks.

**Authentication**: Not required

**Request Body**:
```json
{
  "session_id": "session_123456789",
  "cta_type": "calculator",
  "cta_location": "hero_section",
  "page_url": "/",
  "metadata": {
    "button_text": "Calculate My Grant",
    "user_agent": "Mozilla/5.0..."
  }
}
```

### POST /api/analytics/page-view
Track page views.

**Authentication**: Not required

**Request Body**:
```json
{
  "session_id": "session_123456789",
  "page_url": "/calculator",
  "referrer": "https://google.com",
  "user_agent": "Mozilla/5.0..."
}
```

---

## External API Integrations

### EmailJS Integration
Used for sending automated reports and communications.

**Configuration**:
```javascript
const emailConfig = {
  serviceId: 'service_w6tghqr',
  templateId: 'template_vztws4q',
  publicKey: 'wKn1_xMCtZssdZzpb'
}
```

**Template Variables**:
```javascript
{
  name: "Customer Name",
  to_email: "customer@example.com",
  total_project_value: "€1,200,000",
  mini_pia_grant: "€480,000",
  grant_rate: "40%",
  net_investment: "€720,000",
  // ... additional financial data
}
```

### WhatsApp Business API
Direct messaging integration for customer support.

**Message Format**:
```
Hi, I'm interested in Puglia property investment and grants.

Property Value: €800,000
Grant Amount: €480,000
Timeline: 6-12 months
```

### Calendly Integration
Booking system for consultation calls.

**Embed URL**: `https://calendly.com/investiscope_pro/30min`

---

## Database Direct Operations

All database operations use Supabase client with Row Level Security.

### Supabase Client Configuration
```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    db: {
      schema: 'public'
    }
  }
)
```

### Common Query Patterns

**Insert Lead**:
```typescript
const { data, error } = await supabase
  .from('leads')
  .insert({
    email,
    name,
    phone,
    source,
    metadata
  })
  .select()
```

**Get User Portfolios**:
```typescript
const { data, error } = await supabase
  .from('portfolios')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: false })
```

**Track Analytics**:
```typescript
const { error } = await supabase
  .from('cta_clicks')
  .insert({
    session_id,
    cta_type,
    cta_location,
    page_url,
    timestamp: new Date().toISOString(),
    metadata
  })
```

---

## Error Handling

### Standard Error Response Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "reason": "Invalid email format"
    }
  },
  "data": null
}
```

### Common Error Codes
- `AUTHENTICATION_ERROR`: Invalid or missing authentication
- `AUTHORIZATION_ERROR`: Insufficient permissions
- `VALIDATION_ERROR`: Invalid input data
- `NOT_FOUND`: Resource not found
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INTERNAL_ERROR`: Server-side error

---

## Rate Limiting

### Supabase Limits
- **Requests per minute**: 500 (can be increased)
- **Database connections**: 100 concurrent
- **Storage**: 500MB (free tier)
- **Bandwidth**: 5GB (free tier)

### Recommended Client-Side Throttling
```typescript
// Debounce calculation updates
const debouncedCalculation = useMemo(
  () => debounce(updateCalculations, 300),
  []
)
```

---

## Testing Endpoints

### Health Check
```bash
curl -X GET https://your-app.netlify.app/api/health
```

### Test Authentication
```bash
curl -X GET https://your-app.netlify.app/api/portfolios \
  -H "Authorization: Bearer <jwt_token>"
```

### Test Lead Creation
```bash
curl -X POST https://your-app.netlify.app/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "source": "api_test"
  }'
```

---

## API Versioning

Currently using **v1** (implicit). Future versions will be explicitly versioned:
- `/api/v1/portfolios`
- `/api/v2/portfolios`

## Support

For API support and questions:
- **Email**: info@marietrulli.com
- **WhatsApp**: +39 351 400 1402
- **Documentation**: Check project README.md