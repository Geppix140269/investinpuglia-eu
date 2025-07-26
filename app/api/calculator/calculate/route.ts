import { NextResponse } from 'next/server'
import { CalculatorConfigService } from '@/lib/services/calculatorConfigService'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { propertyValue, renovationBudget, fixturesPercent, grantRate, email } = body
    
    if (!propertyValue || !renovationBudget || fixturesPercent === undefined || !grantRate) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }
    
    const config = await CalculatorConfigService.getActiveConfig()
    if (!config) {
      return NextResponse.json(
        { error: 'No active calculator configuration' },
        { status: 404 }
      )
    }
    
    const fixturesAndFittings = renovationBudget * (fixturesPercent / 100)
    const innovationComponent = renovationBudget * (config.parameters.components.innovation.minPercent / 100)
    const sustainabilityComponent = renovationBudget * (
      (config.parameters.components.sustainability.minPercent + config.parameters.components.sustainability.maxPercent) / 2 / 100
    )
    const designAndPM = renovationBudget * (config.parameters.costs.designAndPM.percent / 100)
    
    const eligibleCostsBeforePreliminary = renovationBudget + fixturesAndFittings + 
                                          innovationComponent + sustainabilityComponent + 
                                          designAndPM
    
    const preliminaryStudies = eligibleCostsBeforePreliminary * (config.parameters.costs.preliminaryStudies.percent / 100)
    const eligibleCosts = eligibleCostsBeforePreliminary + preliminaryStudies
    
    const grantAmount = eligibleCosts * grantRate
    const totalProjectCost = propertyValue + renovationBudget + fixturesAndFittings
    const userInvestment = totalProjectCost - grantAmount
    
    const results = {
      totalProjectCost,
      eligibleCosts,
      grantAmount,
      userInvestment,
      breakdown: {
        propertyPurchase: propertyValue,
        renovationCosts: renovationBudget,
        fixturesAndFittings,
        innovationComponent,
        sustainabilityComponent,
        designAndPM,
        preliminaryStudies
      }
    }
    
    const sessionId = `api_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const calculationId = await CalculatorConfigService.saveCalculation(
      sessionId,
      config,
      { propertyValue, renovationBudget, fixturesPercent, grantRate },
      results,
      email
    )
    
    return NextResponse.json({
      success: true,
      calculationId,
      config: {
        name: config.name,
        validFrom: config.validFrom,
        validUntil: config.validUntil
      },
      results
    })
  } catch (error) {
    console.error('Calculation error:', error)
    return NextResponse.json(
      { error: 'Failed to perform calculation' },
      { status: 500 }
    )
  }
}
