/**
 * ROI Calculation for Mini PIA Properties
 * Based on 50% non-refundable grant structure with 10% non-eligible costs
 */

export interface MiniPIAInvestment {
  purchasePrice: number
  renovationCost: number
  totalProjectCost: number
  eligibleCosts: number // 90% of total
  nonEligibleCosts: number // 10% of total (out of pocket)
  grantAmount: number // 50% of eligible costs
  actualInvestment: number // 50% of eligible + 100% of non-eligible
  holdingPeriod: number // years
}

export function calculateMiniPIAReturn(totalProjectCost: number, holdingPeriod: number = 5) {
  // Calculate actual investment with 10% non-eligible costs
  const eligibleCosts = totalProjectCost * 0.9
  const nonEligibleCosts = totalProjectCost * 0.1
  const grantAmount = eligibleCosts * 0.5
  const actualInvestment = (eligibleCosts * 0.5) + nonEligibleCosts // Your actual out-of-pocket

  // Scenario 1: Break-even sale (no appreciation)
  const breakEvenSale = totalProjectCost
  const breakEvenProfit = breakEvenSale - actualInvestment
  const breakEvenROI = (breakEvenProfit / actualInvestment) * 100
  const breakEvenAnnualROI = breakEvenROI / holdingPeriod

  // Scenario 2: Conservative appreciation (3% per year)
  const conservativeAppreciation = 0.03
  const conservativeSale = totalProjectCost * Math.pow(1 + conservativeAppreciation, holdingPeriod)
  const conservativeProfit = conservativeSale - actualInvestment
  const conservativeROI = (conservativeProfit / actualInvestment) * 100
  const conservativeAnnualROI = conservativeROI / holdingPeriod

  // Scenario 3: Average market appreciation (5% per year - as requested) 
  const marketAppreciation = 0.05
  const marketSale = totalProjectCost * Math.pow(1 + marketAppreciation, holdingPeriod)
  const marketProfit = marketSale - actualInvestment
  const marketROI = (marketProfit / actualInvestment) * 100
  const marketAnnualROI = marketROI / holdingPeriod

  return {
    breakEven: {
      salePrice: breakEvenSale,
      profit: breakEvenProfit,
      totalROI: breakEvenROI,
      annualROI: breakEvenAnnualROI
    },
    conservative: {
      salePrice: conservativeSale,
      profit: conservativeProfit,
      totalROI: conservativeROI,
      annualROI: conservativeAnnualROI
    },
    market: {
      salePrice: marketSale,
      profit: marketProfit,
      totalROI: marketROI,
      annualROI: marketAnnualROI
    }
  }
}

/**
 * Realistic Example Calculation:
 * 
 * Palazzo Palmariggi:
 * - Purchase: €1,450,000
 * - Renovation: €1,550,000 (€1,200/sqm × 1,300sqm)
 * - Total Project Cost: €3,000,000
 * - Eligible Costs (90%): €2,700,000
 * - Non-Eligible Costs (10%): €300,000 (furniture, fees, etc.)
 * - Mini PIA Grant: €1,350,000 (50% of eligible)
 * - Your Actual Investment: €1,650,000 (€1,350,000 + €300,000)
 * 
 * After 5 years with 5% annual appreciation:
 * - Property Value: €3,000,000 × 1.05^5 = €3,828,844
 * - Your Return: €3,828,844 - €1,650,000 = €2,178,844
 * - Total ROI: 132% 
 * - Annual ROI: 26.4%
 * 
 * Even with ZERO appreciation:
 * - Sale Price: €3,000,000
 * - Your Return: €3,000,000 - €1,650,000 = €1,350,000
 * - Total ROI: 82%
 * - Annual ROI: 16.4%
 */

export const GRANT_PERCENTAGE = 0.5 // 50% Mini PIA grant
export const MINIMUM_ROOMS = 5
export const HOLDING_PERIOD = 5 // years minimum
export const RENOVATION_COST_PER_SQM = {
  basic: 800,
  standard: 1200, 
  luxury: 1800
}