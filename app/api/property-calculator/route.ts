import { NextRequest, NextResponse } from 'next/server';

export interface PropertyCalculationRequest {
  propertyValue: number;
  propertyType: 'residential' | 'luxury' | 'commercial';
  buyerType: 'eu' | 'non-eu';
  isFirstHome: boolean;
  hasAgency: boolean;
  needsMortgage: boolean;
  mortgageAmount?: number;
  propertySize: number;
  hasCondominium: boolean;
  region: 'standard' | 'puglia';
  userEmail?: string;
}

export interface PropertyCosts {
  // Purchase costs
  registrationTax: number;
  cadastralTax: number;
  mortgageTax: number;
  notaryFees: number;
  agencyFees: number;
  
  // Professional fees
  lawyerFees: number;
  surveyorFees: number;
  translationFees: number;
  
  // Additional costs
  mortgageCosts: number;
  insuranceCosts: number;
  utilityDeposits: number;
  
  // Annual costs
  imuTax: number;
  tiscTax: number;
  condominiumFees: number;
  
  // Total costs
  totalUpfrontCosts: number;
  totalAnnualCosts: number;
  grandTotal: number;
  
  // Percentages
  totalCostPercentage: number;
}

function calculatePropertyCosts(params: PropertyCalculationRequest): PropertyCosts {
  const {
    propertyValue,
    propertyType,
    buyerType,
    isFirstHome,
    hasAgency,
    needsMortgage,
    mortgageAmount = 0,
    propertySize,
    hasCondominium,
    region
  } = params;

  // Registration Tax (Imposta di Registro)
  let registrationTax = 0;
  if (propertyType === 'residential') {
    if (isFirstHome && buyerType === 'eu') {
      registrationTax = propertyValue * 0.02; // 2% for first home EU residents
    } else {
      registrationTax = propertyValue * 0.09; // 9% for second home or non-EU
    }
  } else if (propertyType === 'luxury') {
    registrationTax = propertyValue * 0.09; // 9% for luxury properties
  } else {
    registrationTax = propertyValue * 0.09; // 9% for commercial
  }

  // Fixed taxes
  const cadastralTax = isFirstHome && buyerType === 'eu' ? 50 : 200;
  const mortgageTax = isFirstHome && buyerType === 'eu' ? 50 : 200;

  // Notary fees (varies by complexity and buyer type)
  let notaryRate = 0.02; // Base 2%
  if (buyerType === 'non-eu') notaryRate = 0.025; // Higher for non-EU
  if (propertyValue > 500000) notaryRate += 0.005; // Higher for expensive properties
  const notaryFees = propertyValue * notaryRate;

  // Agency fees (if using agency)
  const agencyFees = hasAgency ? propertyValue * 0.036 : 0; // 3% + 22% VAT

  // Professional fees
  let lawyerFees = 2000; // Base rate
  if (buyerType === 'non-eu') lawyerFees = 3500; // Higher for non-EU
  if (propertyValue > 500000) lawyerFees += 1000; // Complex transactions

  const surveyorFees = 800; // Standard technical inspection
  const translationFees = buyerType === 'non-eu' ? 1200 : 0;

  // Mortgage costs
  const mortgageCosts = needsMortgage ? mortgageAmount * 0.0025 + 1500 : 0;

  // Insurance (annual but included in upfront for first year)
  const insuranceCosts = propertyValue * 0.0015;

  // Utility deposits and connections
  const utilityDeposits = 800;

  // Annual costs
  // IMU tax (varies by municipality, first home usually exempt for residents)
  let imuRate = 0;
  if (!isFirstHome || buyerType === 'non-eu') {
    imuRate = region === 'puglia' ? 0.0076 : 0.008; // Slightly lower in Puglia
  }
  const imuTax = propertyValue * imuRate;

  // TASI tax (municipal services)
  const tascRate = 0.0025;
  const tiscTax = propertyValue * tascRate;

  // Condominium fees
  const condominiumFees = hasCondominium ? propertySize * 20 : 0; // €20/sqm annually

  // Calculate totals
  const totalUpfrontCosts = registrationTax + cadastralTax + mortgageTax + 
                           notaryFees + agencyFees + lawyerFees + 
                           surveyorFees + translationFees + mortgageCosts + 
                           insuranceCosts + utilityDeposits;

  const totalAnnualCosts = imuTax + tiscTax + condominiumFees;
  const grandTotal = totalUpfrontCosts + totalAnnualCosts;
  const totalCostPercentage = (totalUpfrontCosts / propertyValue) * 100;

  return {
    registrationTax,
    cadastralTax,
    mortgageTax,
    notaryFees,
    agencyFees,
    lawyerFees,
    surveyorFees,
    translationFees,
    mortgageCosts,
    insuranceCosts,
    utilityDeposits,
    imuTax,
    tiscTax,
    condominiumFees,
    totalUpfrontCosts,
    totalAnnualCosts,
    grandTotal,
    totalCostPercentage
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as PropertyCalculationRequest;

    // Validate input
    if (!body.propertyValue || body.propertyValue < 50000) {
      return NextResponse.json(
        { error: 'Invalid property value. Minimum €50,000.' },
        { status: 400 }
      );
    }

    if (body.needsMortgage && (!body.mortgageAmount || body.mortgageAmount <= 0)) {
      return NextResponse.json(
        { error: 'Mortgage amount required when mortgage is needed.' },
        { status: 400 }
      );
    }

    // Calculate costs
    const costs = calculatePropertyCosts(body);

    // Log calculation for analytics (optional)
    console.log('Property calculation requested:', {
      propertyValue: body.propertyValue,
      propertyType: body.propertyType,
      buyerType: body.buyerType,
      totalCosts: costs.totalUpfrontCosts,
      userEmail: body.userEmail || 'anonymous'
    });

    // Send notification to Giuseppe if it's a high-value calculation
    if (body.propertyValue > 500000 && body.userEmail) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://investinpuglia.eu'}/api/trullo-telegram`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'property_calculation',
            data: {
              propertyValue: body.propertyValue,
              propertyType: body.propertyType,
              buyerType: body.buyerType,
              totalCosts: costs.totalUpfrontCosts,
              userEmail: body.userEmail,
              timestamp: new Date().toISOString()
            }
          })
        });
      } catch (error) {
        console.error('Failed to send notification:', error);
        // Don't fail the request if notification fails
      }
    }

    return NextResponse.json({
      success: true,
      costs,
      input: body,
      calculatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Property calculation error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate property costs' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Italy Property Costs Calculator API',
    version: '1.0.0',
    endpoints: {
      POST: {
        description: 'Calculate property purchase costs',
        required_fields: ['propertyValue', 'propertyType', 'buyerType', 'isFirstHome'],
        optional_fields: ['hasAgency', 'needsMortgage', 'mortgageAmount', 'propertySize', 'hasCondominium', 'region', 'userEmail']
      }
    },
    supported_property_types: ['residential', 'luxury', 'commercial'],
    supported_buyer_types: ['eu', 'non-eu'],
    supported_regions: ['standard', 'puglia']
  });
}