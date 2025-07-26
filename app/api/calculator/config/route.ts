import { NextResponse } from 'next/server'
import { CalculatorConfigService } from '@/lib/services/calculatorConfigService'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const dateParam = searchParams.get('date')
    
    let config
    if (dateParam) {
      const date = new Date(dateParam)
      config = await CalculatorConfigService.getConfigForDate(date)
    } else {
      config = await CalculatorConfigService.getActiveConfig()
    }
    
    if (!config) {
      return NextResponse.json(
        { error: 'No active calculator configuration found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(config)
  } catch (error) {
    console.error('Error fetching calculator config:', error)
    return NextResponse.json(
      { error: 'Failed to fetch calculator configuration' },
      { status: 500 }
    )
  }
}
