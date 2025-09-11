import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface UserData {
  name: string;
  email: string;
  phone: string;
  preferredContact: 'email' | 'whatsapp';
  country: string;
}

interface CalculationData {
  propertyValue: number;
  propertyType: 'residential' | 'luxury' | 'commercial';
  buyerType: 'eu' | 'non-eu';
  isFirstHome: boolean;
  hasAgency: boolean;
  needsMortgage: boolean;
  mortgageAmount: number;
  propertySize: number;
  hasCondominium: boolean;
  region: 'standard' | 'puglia';
}

export async function POST(request: NextRequest) {
  try {
    const { userData, calculationData } = await request.json() as {
      userData: UserData;
      calculationData: CalculationData;
    };

    // Validate required fields
    if (!userData.name || !userData.email || !userData.phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
        { status: 400 }
      );
    }

    // Store in Firebase
    const registrationData = {
      ...userData,
      calculationData,
      registeredAt: serverTimestamp(),
      source: 'property_calculator',
      leadScore: calculateLeadScore(calculationData),
      status: 'new'
    };

    const docRef = await addDoc(collection(db, 'calculator_leads'), registrationData);
    
    console.log('Calculator lead registered:', {
      id: docRef.id,
      name: userData.name,
      email: userData.email,
      propertyValue: calculationData.propertyValue,
      leadScore: calculateLeadScore(calculationData)
    });

    // Send notification to Giuseppe via Telegram
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://investinpuglia.eu'}/api/trullo-telegram`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'calculator_registration',
          data: {
            ...userData,
            calculationData,
            leadScore: calculateLeadScore(calculationData),
            registrationId: docRef.id,
            timestamp: new Date().toISOString()
          }
        })
      });
    } catch (error) {
      console.error('Failed to send Telegram notification:', error);
      // Don't fail the registration if notification fails
    }

    return NextResponse.json({
      success: true,
      registrationId: docRef.id,
      message: 'Registration successful'
    });

  } catch (error) {
    console.error('Calculator registration error:', error);
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    );
  }
}

function calculateLeadScore(calculationData: CalculationData): number {
  let score = 0;
  
  // Property value scoring
  if (calculationData.propertyValue > 1000000) score += 30;
  else if (calculationData.propertyValue > 500000) score += 20;
  else if (calculationData.propertyValue > 250000) score += 10;
  else score += 5;
  
  // Property type scoring
  if (calculationData.propertyType === 'luxury') score += 15;
  else if (calculationData.propertyType === 'commercial') score += 10;
  else score += 5;
  
  // Buyer type (non-EU often more serious)
  if (calculationData.buyerType === 'non-eu') score += 10;
  else score += 5;
  
  // Mortgage indicates serious buyer
  if (calculationData.needsMortgage) score += 10;
  
  // First home indicates commitment
  if (calculationData.isFirstHome) score += 5;
  
  return Math.min(score, 100); // Cap at 100
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Calculator Registration API',
    version: '1.0.0',
    required_fields: ['userData.name', 'userData.email', 'userData.phone', 'calculationData']
  });
}