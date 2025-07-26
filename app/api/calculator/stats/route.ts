import { NextResponse } from 'next/server'
import { CalculatorConfigService } from '@/lib/services/calculatorConfigService'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '30')
    
    const stats = await CalculatorConfigService.getCalculationStats(days)
    
    return NextResponse.json({
      period: `Last ${days} days`,
      stats
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}
