# Puglia DMS Observatory API Setup Guide

## Overview
The Puglia DMS (Destination Management System) Observatory provides tourism data through a Knowage BI platform. This guide explains how to connect your InvestInPuglia.eu website to the DMS API.

## Connection Methods

### Method 1: Public Guest Access (Current Setup)
The system currently uses public guest access for read-only data:
- **Username**: public_guest
- **Password**: public_guest
- **Access Level**: Read-only tourism statistics
- **No registration required**

### Method 2: API Key Access (Recommended for Production)
For production use with higher rate limits and full access:

1. **Contact Puglia Tourism Agency**
   - Email: osservatorio@agenziapugliapromozione.it
   - Phone: +39 080 506 9341
   - Request: API access for InvestInPuglia.eu

2. **Required Information**
   - Organization: InvestInPuglia.eu
   - Purpose: Tourism data integration for investment platform
   - Expected traffic: Specify your estimated API calls/day
   - Data needed: Tourism statistics, occupancy rates, visitor demographics

3. **You will receive**
   - API Key
   - Technical documentation
   - Rate limits information
   - Support contact

## Environment Configuration

### Step 1: Add API Key to Environment Variables
Create or update `.env.local` file:

```env
# Puglia DMS API Configuration
PUGLIA_DMS_API_KEY=your_api_key_here
PUGLIA_DMS_API_URL=https://osservatorio.dms.puglia.it
PUGLIA_DMS_CACHE_DURATION=300000
```

### Step 2: Test Connection
Run the test endpoint to verify connection:

```bash
curl -X POST http://localhost:3005/api/tourism-data/test
```

## Available Datasets

The DMS provides access to these primary datasets:

1. **DS_ARRIVI_TURISTICI** - Tourist Arrivals
   - Monthly/yearly arrivals
   - Origin countries
   - Accommodation types

2. **DS_PRESENZE_TURISTICHE** - Tourist Presences
   - Length of stay
   - Seasonal patterns
   - Demographics

3. **DS_STRUTTURE_RICETTIVE** - Accommodation Facilities
   - Hotels, B&Bs, vacation rentals
   - Capacity and availability
   - Geographic distribution

4. **DS_TASSO_OCCUPAZIONE** - Occupancy Rates
   - Room occupancy percentages
   - Seasonal variations
   - Price indices

5. **DS_STAGIONALITA** - Seasonality Data
   - Peak/off-peak periods
   - Event impacts
   - Weather correlations

## API Usage Examples

### Fetch Tourist Arrivals
```javascript
const response = await fetch('/api/tourism-data/fetch', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    dataType: 'tourism',
    period: 'month',
    region: 'bari',
    startDate: '2025-01-01',
    endDate: '2025-08-31'
  })
});
```

### Export Data to Excel
```javascript
const response = await fetch('/api/tourism-data/export', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    format: 'xlsx',
    period: 'year',
    region: 'all'
  })
});
```

## Data Update Frequency

- **Real-time data**: Updated every 24 hours
- **Historical data**: Updated monthly
- **Forecasts**: Updated quarterly

## Rate Limits

### Public Access
- 100 requests per hour
- 1000 requests per day
- Max 1000 records per request

### API Key Access
- 1000 requests per hour
- 10000 requests per day
- Max 10000 records per request

## Troubleshooting

### Common Issues

1. **401 Unauthorized**
   - Check API key is valid
   - Verify credentials in .env.local
   - Ensure key hasn't expired

2. **429 Too Many Requests**
   - You've hit rate limits
   - Implement caching (already configured for 5 minutes)
   - Consider upgrading access level

3. **500 Server Error**
   - DMS server is down
   - System will automatically fallback to mock data
   - Check status at: https://osservatorio.dms.puglia.it/status

4. **No Data Returned**
   - Check date range is valid
   - Verify region parameter matches DMS regions
   - Some datasets may have delayed data

## Support Contacts

### Technical Support
- **Email**: supporto.tecnico@agenziapugliapromozione.it
- **Hours**: Mon-Fri 9:00-18:00 CET

### Data Questions
- **Email**: osservatorio@agenziapugliapromozione.it
- **Documentation**: https://osservatorio.dms.puglia.it/docs

## Security Best Practices

1. **Never commit API keys to git**
   - Use environment variables
   - Add .env.local to .gitignore

2. **Implement rate limiting**
   - Cache responses (already configured)
   - Queue requests during peak times

3. **Monitor usage**
   - Log API calls
   - Track error rates
   - Set up alerts for failures

## Integration Checklist

- [ ] Contact Puglia Tourism Agency for API access
- [ ] Receive and configure API key
- [ ] Update .env.local with credentials
- [ ] Test connection with test endpoint
- [ ] Verify data is displaying correctly
- [ ] Set up error monitoring
- [ ] Configure production caching
- [ ] Deploy to production

## Additional Resources

- [Knowage Documentation](https://docs.knowage-suite.com/)
- [Puglia Tourism Portal](https://www.viaggiareinpuglia.it/)
- [DMS Observatory Dashboard](https://osservatorio.dms.puglia.it/)

---

*Last Updated: September 2025*
*Version: 1.0*