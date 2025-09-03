/**
 * Puglia DMS Observatory API Configuration
 * 
 * The DMS Observatory uses Knowage BI platform for data access.
 * This module handles authentication and data retrieval.
 */

import axios from 'axios';

// API Configuration
const DMS_CONFIG = {
  baseUrl: 'https://osservatorio.dms.puglia.it',
  endpoints: {
    login: '/knowage/servlet/AdapterHTTP?PAGE=LoginPage',
    data: '/knowage/restful-services/2.0/datasets',
    documents: '/knowage/restful-services/2.0/documents',
    export: '/knowage/restful-services/2.0/export'
  },
  // Public guest access (base64 encoded)
  publicCredentials: {
    username: 'public_guest',
    password: 'public_guest'
  }
};

/**
 * Authentication Methods for DMS API
 */
export class DMSAuthenticator {
  private token: string | null = null;
  private tokenExpiry: Date | null = null;

  /**
   * Method 1: Silent Authentication (Public Access)
   * Uses public_guest credentials for read-only access
   */
  async authenticatePublic(): Promise<string> {
    try {
      const response = await axios.post(
        `${DMS_CONFIG.baseUrl}${DMS_CONFIG.endpoints.login}`,
        {
          username: DMS_CONFIG.publicCredentials.username,
          password: DMS_CONFIG.publicCredentials.password,
          silentAuthentication: true
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      if (response.data.token) {
        this.token = response.data.token;
        this.tokenExpiry = new Date(Date.now() + 3600000); // 1 hour
        return this.token;
      }

      throw new Error('No token received');
    } catch (error) {
      console.error('Public authentication failed:', error);
      throw error;
    }
  }

  /**
   * Method 2: API Key Authentication (Requires Registration)
   * Contact: osservatorio@agenziapugliapromozione.it
   */
  async authenticateWithApiKey(apiKey: string): Promise<string> {
    try {
      const response = await axios.post(
        `${DMS_CONFIG.baseUrl}/knowage/restful-services/2.0/authentication`,
        {},
        {
          headers: {
            'X-API-Key': apiKey,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.token) {
        this.token = response.data.token;
        this.tokenExpiry = new Date(Date.now() + 3600000);
        return this.token;
      }

      throw new Error('API key authentication failed');
    } catch (error) {
      console.error('API key authentication failed:', error);
      throw error;
    }
  }

  /**
   * Get current valid token
   */
  async getToken(): Promise<string> {
    if (!this.token || !this.tokenExpiry || this.tokenExpiry < new Date()) {
      // Try public authentication first
      await this.authenticatePublic();
    }
    return this.token!;
  }
}

/**
 * DMS Data Fetcher - Main API Interface
 */
export class DMSDataFetcher {
  private auth: DMSAuthenticator;

  constructor(apiKey?: string) {
    this.auth = new DMSAuthenticator();
    
    // If API key is provided in environment variables
    if (apiKey || process.env.PUGLIA_DMS_API_KEY) {
      this.auth.authenticateWithApiKey(apiKey || process.env.PUGLIA_DMS_API_KEY!);
    }
  }

  /**
   * Fetch tourism statistics
   */
  async fetchTourismData(params: {
    datasetLabel?: string;
    period?: string;
    territory?: string;
    indicators?: string[];
  }) {
    try {
      const token = await this.auth.getToken();
      
      // Known dataset labels in Knowage system
      const datasets = {
        arrivals: 'DS_ARRIVI_TURISTICI',
        presences: 'DS_PRESENZE_TURISTICHE',
        accommodations: 'DS_STRUTTURE_RICETTIVE',
        occupancy: 'DS_TASSO_OCCUPAZIONE',
        seasonality: 'DS_STAGIONALITA'
      };

      const datasetLabel = params.datasetLabel || datasets.arrivals;

      const response = await axios.get(
        `${DMS_CONFIG.baseUrl}/knowage/restful-services/2.0/datasets/${datasetLabel}/data`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          params: {
            offset: 0,
            fetchSize: 1000,
            territory: params.territory,
            period: params.period,
            ...(params.indicators && { indicators: params.indicators.join(',') })
          }
        }
      );

      return this.transformKnowageData(response.data);
    } catch (error) {
      console.error('Failed to fetch tourism data:', error);
      throw error;
    }
  }

  /**
   * Execute a specific Knowage document/report
   */
  async executeDocument(documentLabel: string, parameters?: any) {
    try {
      const token = await this.auth.getToken();
      
      const response = await axios.post(
        `${DMS_CONFIG.baseUrl}/knowage/restful-services/2.0/documents/${documentLabel}/execute`,
        {
          parameters: parameters || {}
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Failed to execute document:', error);
      throw error;
    }
  }

  /**
   * Transform Knowage data format to our application format
   */
  private transformKnowageData(knowageData: any) {
    // Knowage typically returns data in this structure
    const { metaData, rows } = knowageData;
    
    if (!metaData || !rows) {
      return knowageData; // Return as-is if structure is different
    }

    // Transform rows into objects using metadata field names
    const fields = metaData.fields.map((f: any) => f.name);
    const transformedData = rows.map((row: any[]) => {
      const obj: any = {};
      fields.forEach((field: string, index: number) => {
        obj[field] = row[index];
      });
      return obj;
    });

    return {
      data: transformedData,
      metadata: metaData,
      totalRecords: knowageData.results || rows.length
    };
  }

  /**
   * Get available datasets and their metadata
   */
  async getAvailableDatasets() {
    try {
      const token = await this.auth.getToken();
      
      const response = await axios.get(
        `${DMS_CONFIG.baseUrl}/knowage/restful-services/2.0/datasets`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Failed to fetch available datasets:', error);
      // Return default datasets if API fails
      return [
        { label: 'DS_ARRIVI_TURISTICI', name: 'Tourist Arrivals' },
        { label: 'DS_PRESENZE_TURISTICHE', name: 'Tourist Presences' },
        { label: 'DS_STRUTTURE_RICETTIVE', name: 'Accommodation Facilities' },
        { label: 'DS_TASSO_OCCUPAZIONE', name: 'Occupancy Rate' },
        { label: 'DS_STAGIONALITA', name: 'Seasonality' }
      ];
    }
  }
}

/**
 * Integration with Next.js API routes
 */
export async function fetchDMSData(options: any) {
  const fetcher = new DMSDataFetcher();
  
  try {
    // Attempt to fetch real data
    const data = await fetcher.fetchTourismData(options);
    return {
      success: true,
      source: 'dms',
      data
    };
  } catch (error) {
    console.error('DMS API Error:', error);
    
    // Fallback to mock data if DMS is unavailable
    return {
      success: true,
      source: 'mock',
      data: generateMockData(options),
      error: 'DMS API unavailable - using sample data'
    };
  }
}

function generateMockData(options: any) {
  // Your existing mock data generation
  return {
    summary: {
      totalVisitors: 2400000,
      internationalArrivals: 850000,
      averageStay: 4.2,
      occupancyRate: 68.5,
      revenue: 1200000000
    },
    trends: {
      monthly: Array.from({ length: 12 }, (_, i) => ({
        month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
        visitors: Math.floor(150000 + Math.random() * 250000),
        revenue: Math.floor(80000000 + Math.random() * 120000000)
      }))
    },
    regions: ['Bari', 'Brindisi', 'Foggia', 'Lecce', 'Taranto', 'BAT'].map(name => ({
      name,
      visitors: Math.floor(200000 + Math.random() * 600000),
      hotels: Math.floor(50 + Math.random() * 150),
      occupancy: (60 + Math.random() * 20).toFixed(1)
    }))
  };
}