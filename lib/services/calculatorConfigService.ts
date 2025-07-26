// lib/services/calculatorConfigService.ts

import { groq } from 'next-sanity'
import { sanity } from '@/lib/sanity'

export interface CalculatorConfig {
  _id: string
  name: string
  slug: { current: string }
  active: boolean
  validFrom: string
  validUntil?: string
  parameters: {
    propertyValue: {
      min: number
      max: number
      step: number
    }
    renovationBudget: {
      min: number
      max: number
      step: number
    }
    grantRates: Array<{
      label: string
      value: number
      description: string
      conditions?: string[]
    }>
    components: {
      innovation: {
        minPercent: number
        description?: string
      }
      sustainability: {
        minPercent: number
        maxPercent: number
        description?: string
      }
    }
    costs: {
      designAndPM: {
        percent: number
        description?: string
      }
      preliminaryStudies: {
        percent: number
        description?: string
      }
    }
  }
  helpTexts?: {
    propertyValue?: string
    renovationBudget?: string
    fixturesPercent?: string
    grantRate?: string
  }
  disclaimers?: string[]
}

export interface CalculationResult {
  sessionId: string
  userEmail?: string
  calculatedAt: string
  configUsed: string
  inputs: {
    propertyValue: number
    renovationBudget: number
    fixturesPercent: number
    grantRate: number
  }
  results: {
    totalProjectCost: number
    eligibleCosts: number
    grantAmount: number
    userInvestment: number
    breakdown: {
      propertyPurchase: number
      renovationCosts: number
      fixturesAndFittings: number
      innovationComponent: number
      sustainabilityComponent: number
      designAndPM: number
      preliminaryStudies: number
    }
  }
}

export class CalculatorConfigService {
  /**
   * Get the currently active calculator configuration
   */
  static async getActiveConfig(): Promise<CalculatorConfig | null> {
    const query = groq`
      *[_type == "calculatorConfig" && active == true] | order(validFrom desc) [0]
    `
    
    try {
      const config = await sanity.fetch(query)
      return config
    } catch (error) {
      console.error('Error fetching calculator config:', error)
      // Fall back to hardcoded config if Sanity fails
      return this.getDefaultConfig()
    }
  }

  /**
   * Get configuration valid for a specific date
   */
  static async getConfigForDate(date: Date): Promise<CalculatorConfig | null> {
    const query = groq`
      *[_type == "calculatorConfig" 
        && validFrom <= $date 
        && (validUntil == null || validUntil >= $date)
      ] | order(validFrom desc) [0]
    `
    
    return await sanity.fetch(query, { date: date.toISOString() })
  }

  /**
   * Save calculation result to Sanity
   */
  static async saveCalculation(
    sessionId: string,
    config: CalculatorConfig,
    inputs: CalculationResult['inputs'],
    results: CalculationResult['results'],
    userEmail?: string
  ): Promise<string> {
    const doc = {
      _type: 'calculationResult',
      sessionId,
      userEmail,
      calculatedAt: new Date().toISOString(),
      configUsed: {
        _type: 'reference',
        _ref: config._id
      },
      inputs,
      results
    }
    
    try {
      const result = await sanity.create(doc)
      return result._id
    } catch (error) {
      console.error('Error saving calculation:', error)
      throw error
    }
  }

  /**
   * Get calculation history for a user
   */
  static async getUserCalculations(email: string): Promise<CalculationResult[]> {
    const query = groq`
      *[_type == "calculationResult" && userEmail == $email] | order(calculatedAt desc) {
        ...,
        "configName": configUsed->name
      }
    `
    
    return await sanity.fetch(query, { email })
  }

  /**
   * Update calculation with report download status
   */
  static async markReportDownloaded(calculationId: string): Promise<void> {
    await sanity
      .patch(calculationId)
      .set({ reportDownloaded: true })
      .commit()
  }

  /**
   * Get calculation statistics for admin dashboard
   */
  static async getCalculationStats(days: number = 30): Promise<any> {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    
    const query = groq`{
      "total": count(*[_type == "calculationResult" && calculatedAt >= $startDate]),
      "withEmail": count(*[_type == "calculationResult" && calculatedAt >= $startDate && defined(userEmail)]),
      "reportsDownloaded": count(*[_type == "calculationResult" && calculatedAt >= $startDate && reportDownloaded == true]),
      "avgGrantAmount": math::avg(*[_type == "calculationResult" && calculatedAt >= $startDate].results.grantAmount),
      "byConfig": *[_type == "calculatorConfig"] {
        name,
        "count": count(*[_type == "calculationResult" && configUsed._ref == ^._id && calculatedAt >= $startDate])
      }
    }`
    
    return await sanity.fetch(query, { startDate: startDate.toISOString() })
  }

  /**
   * Fallback configuration if Sanity is unavailable
   */
  private static getDefaultConfig(): CalculatorConfig {
    return {
      _id: 'default',
      name: 'Mini PIA Turismo Default',
      slug: { current: 'mini-pia-default' },
      active: true,
      validFrom: new Date().toISOString(),
      parameters: {
        propertyValue: {
          min: 100000,
          max: 3000000,
          step: 10000
        },
        renovationBudget: {
          min: 50000,
          max: 2000000,
          step: 5000
        },
        grantRates: [
          { label: 'Base Rate (40%)', value: 0.4, description: 'Standard grant rate' },
          { label: 'Small Enterprise (50%)', value: 0.5, description: 'For small enterprises' },
          { label: 'Micro Enterprise (60%)', value: 0.6, description: 'For micro enterprises' }
        ],
        components: {
          innovation: {
            minPercent: 2,
            description: 'Minimum 2% for innovation technologies'
          },
          sustainability: {
            minPercent: 2,
            maxPercent: 3,
            description: '2-3% for environmental sustainability'
          }
        },
        costs: {
          designAndPM: {
            percent: 6,
            description: 'Design and project management'
          },
          preliminaryStudies: {
            percent: 1.5,
            description: 'Preliminary studies and assessments'
          }
        }
      }
    }
  }
}
