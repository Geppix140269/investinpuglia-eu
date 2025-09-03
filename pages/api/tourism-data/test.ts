import { NextApiRequest, NextApiResponse } from 'next';
import { DMSDataFetcher, DMSAuthenticator } from '../../../lib/puglia-dms-api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('Testing DMS API Connection...');

  const results = {
    timestamp: new Date().toISOString(),
    tests: {
      publicAuth: { status: 'pending', message: '', data: null },
      apiKeyAuth: { status: 'pending', message: '', data: null },
      dataFetch: { status: 'pending', message: '', data: null },
      datasets: { status: 'pending', message: '', data: null }
    },
    configuration: {
      hasApiKey: !!process.env.PUGLIA_DMS_API_KEY,
      baseUrl: 'https://osservatorio.dms.puglia.it',
      cacheEnabled: true,
      cacheDuration: '5 minutes'
    },
    recommendations: []
  };

  try {
    // Test 1: Public Authentication
    console.log('Test 1: Testing public guest authentication...');
    const publicAuth = new DMSAuthenticator();
    try {
      await publicAuth.authenticatePublic();
      results.tests.publicAuth = {
        status: 'success',
        message: 'Public guest authentication successful',
        data: { accessLevel: 'read-only' }
      };
    } catch (error: any) {
      results.tests.publicAuth = {
        status: 'failed',
        message: `Public auth failed: ${error.message}`,
        data: null
      };
      results.recommendations.push(
        'Public authentication is failing. The DMS may be temporarily unavailable or credentials may have changed.'
      );
    }

    // Test 2: API Key Authentication (if key is provided)
    if (process.env.PUGLIA_DMS_API_KEY) {
      console.log('Test 2: Testing API key authentication...');
      const apiAuth = new DMSAuthenticator();
      try {
        await apiAuth.authenticateWithApiKey(process.env.PUGLIA_DMS_API_KEY);
        results.tests.apiKeyAuth = {
          status: 'success',
          message: 'API key authentication successful',
          data: { accessLevel: 'full' }
        };
      } catch (error: any) {
        results.tests.apiKeyAuth = {
          status: 'failed',
          message: `API key auth failed: ${error.message}`,
          data: null
        };
        results.recommendations.push(
          'API key authentication failed. Please verify your API key is correct and active.'
        );
      }
    } else {
      results.tests.apiKeyAuth = {
        status: 'skipped',
        message: 'No API key configured in environment variables',
        data: null
      };
      results.recommendations.push(
        'To enable full API access, add PUGLIA_DMS_API_KEY to your .env.local file. Contact osservatorio@agenziapugliapromozione.it for an API key.'
      );
    }

    // Test 3: Fetch Sample Data
    console.log('Test 3: Testing data fetch...');
    const fetcher = new DMSDataFetcher();
    try {
      const sampleData = await fetcher.fetchTourismData({
        datasetLabel: 'DS_ARRIVI_TURISTICI',
        period: 'current_month'
      });
      results.tests.dataFetch = {
        status: 'success',
        message: 'Successfully fetched tourism data',
        data: {
          recordsReturned: sampleData.data ? sampleData.data.length : 0,
          hasData: !!sampleData.data
        }
      };
    } catch (error: any) {
      results.tests.dataFetch = {
        status: 'failed',
        message: `Data fetch failed: ${error.message}`,
        data: null
      };
      
      // Check if we're falling back to mock data
      if (error.message.includes('mock') || error.response?.status === 404) {
        results.tests.dataFetch.message += ' (Using mock data fallback)';
        results.recommendations.push(
          'Real-time data is unavailable. System is using mock data. This is normal during development.'
        );
      }
    }

    // Test 4: List Available Datasets
    console.log('Test 4: Fetching available datasets...');
    try {
      const datasets = await fetcher.getAvailableDatasets();
      results.tests.datasets = {
        status: 'success',
        message: `Found ${datasets.length} available datasets`,
        data: datasets.map((ds: any) => ({
          label: ds.label,
          name: ds.name
        }))
      };
    } catch (error: any) {
      results.tests.datasets = {
        status: 'partial',
        message: 'Using default dataset list',
        data: [
          { label: 'DS_ARRIVI_TURISTICI', name: 'Tourist Arrivals' },
          { label: 'DS_PRESENZE_TURISTICHE', name: 'Tourist Presences' },
          { label: 'DS_STRUTTURE_RICETTIVE', name: 'Accommodation Facilities' },
          { label: 'DS_TASSO_OCCUPAZIONE', name: 'Occupancy Rate' },
          { label: 'DS_STAGIONALITA', name: 'Seasonality' }
        ]
      };
    }

    // Overall status
    const allTests = Object.values(results.tests);
    const hasFailures = allTests.some(t => t.status === 'failed');
    const hasSuccesses = allTests.some(t => t.status === 'success');

    if (!hasFailures && hasSuccesses) {
      results.recommendations.unshift('✅ DMS API connection is working properly!');
    } else if (hasFailures && hasSuccesses) {
      results.recommendations.unshift('⚠️ DMS API connection is partially working. Some features may be limited.');
    } else if (!hasSuccesses) {
      results.recommendations.unshift('❌ DMS API connection failed. Using mock data for all requests.');
    }

    return res.status(200).json({
      success: true,
      ...results
    });

  } catch (error: any) {
    console.error('DMS API test error:', error);
    
    results.recommendations.unshift(
      '❌ Critical error during DMS API testing. Please check server logs for details.'
    );

    return res.status(200).json({
      success: false,
      error: error.message,
      ...results
    });
  }
}