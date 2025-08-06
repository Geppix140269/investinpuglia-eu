// lib/services/catasto.service.ts
// Service module for Italian Catasto (Property Registry) API integration

interface CatastoConfig {
  apiUrl: string;
  apiKey?: string;
  timeout?: number;
}

interface PropertyData {
  foglio: string;        // Sheet number
  particella: string;    // Parcel number
  subalterno?: string;   // Sub-unit number
  comune: string;        // Municipality
  provincia: string;     // Province
}

interface CatastoDocument {
  type: 'visura_catastale' | 'planimetria' | 'mappa';
  format: 'pdf' | 'json';
  data: any;
  generatedAt: Date;
}

class CatastoService {
  private config: CatastoConfig;
  
  constructor(config: CatastoConfig) {
    this.config = {
      timeout: 30000, // 30 seconds default
      ...config
    };
  }

  /**
   * Fetch cadastral certificate (visura catastale) for a property
   */
  async getVisuraCatastale(property: PropertyData): Promise<CatastoDocument> {
    try {
      const response = await fetch(`${this.config.apiUrl}/siscat/api/v1/visura`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey && { 'X-API-Key': this.config.apiKey })
        },
        body: JSON.stringify({
          foglio: property.foglio,
          particella: property.particella,
          subalterno: property.subalterno,
          comune: property.comune,
          provincia: property.provincia
        }),
        signal: AbortSignal.timeout(this.config.timeout!)
      });

      if (!response.ok) {
        throw new Error(`Catasto API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.blob();
      
      return {
        type: 'visura_catastale',
        format: 'pdf',
        data: data,
        generatedAt: new Date()
      };
    } catch (error) {
      console.error('Error fetching visura catastale:', error);
      throw error;
    }
  }

  /**
   * Search properties by owner fiscal code
   */
  async searchByOwner(fiscalCode: string, provincia?: string): Promise<PropertyData[]> {
    try {
      const params = new URLSearchParams({
        codice_fiscale: fiscalCode,
        ...(provincia && { provincia })
      });

      const response = await fetch(
        `${this.config.apiUrl}/siscat/api/v1/search/owner?${params}`,
        {
          method: 'GET',
          headers: {
            ...(this.config.apiKey && { 'X-API-Key': this.config.apiKey })
          },
          signal: AbortSignal.timeout(this.config.timeout!)
        }
      );

      if (!response.ok) {
        throw new Error(`Catasto API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error searching properties:', error);
      throw error;
    }
  }

  /**
   * Get property map (mappa catastale)
   */
  async getPropertyMap(property: PropertyData): Promise<CatastoDocument> {
    try {
      const response = await fetch(`${this.config.apiUrl}/siscat/api/v1/mappa`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey && { 'X-API-Key': this.config.apiKey })
        },
        body: JSON.stringify(property),
        signal: AbortSignal.timeout(this.config.timeout!)
      });

      if (!response.ok) {
        throw new Error(`Catasto API error: ${response.status}`);
      }

      const data = await response.blob();
      
      return {
        type: 'mappa',
        format: 'pdf',
        data: data,
        generatedAt: new Date()
      };
    } catch (error) {
      console.error('Error fetching property map:', error);
      throw error;
    }
  }

  /**
   * Validate cadastral data format
   */
  validateCadastralData(property: PropertyData): boolean {
    // Validate foglio (sheet) - typically 1-4 digits
    if (!property.foglio || !/^\d{1,4}$/.test(property.foglio)) {
      return false;
    }

    // Validate particella (parcel) - typically 1-5 digits
    if (!property.particella || !/^\d{1,5}$/.test(property.particella)) {
      return false;
    }

    // Validate subalterno if present - typically 1-4 digits
    if (property.subalterno && !/^\d{1,4}$/.test(property.subalterno)) {
      return false;
    }

    // Validate comune and provincia are present
    if (!property.comune || !property.provincia) {
      return false;
    }

    return true;
  }
}

// Create singleton instance
const catastoService = new CatastoService({
  apiUrl: process.env.NEXT_PUBLIC_CATASTO_API_URL || 'http://localhost:5000',
  apiKey: process.env.CATASTO_API_KEY
});

export { catastoService, CatastoService, type PropertyData, type CatastoDocument };
