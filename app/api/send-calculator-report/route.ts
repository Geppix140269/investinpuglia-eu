import { NextRequest, NextResponse } from 'next/server';

interface PropertyCosts {
  registrationTax: number;
  cadastralTax: number;
  mortgageTax: number;
  notaryFees: number;
  agencyFees: number;
  lawyerFees: number;
  surveyorFees: number;
  translationFees: number;
  mortgageCosts: number;
  insuranceCosts: number;
  utilityDeposits: number;
  imuTax: number;
  tiscTax: number;
  condominiumFees: number;
  totalUpfrontCosts: number;
  totalAnnualCosts: number;
  grandTotal: number;
  totalCostPercentage: number;
}

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
    const { userData, costs, calculationData } = await request.json() as {
      userData: UserData;
      costs: PropertyCosts;
      calculationData: CalculationData;
    };

    if (userData.preferredContact === 'email') {
      await sendEmailReport(userData, costs, calculationData);
    } else {
      await sendWhatsAppReport(userData, costs, calculationData);
    }

    return NextResponse.json({
      success: true,
      message: `Report sent via ${userData.preferredContact}`
    });

  } catch (error) {
    console.error('Report sending error:', error);
    return NextResponse.json(
      { error: 'Failed to send report' },
      { status: 500 }
    );
  }
}

async function sendEmailReport(userData: UserData, costs: PropertyCosts, calculationData: CalculationData) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const emailContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Your Italian Property Investment Report</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3B82F6, #10B981); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px; }
        .header h1 { margin: 0; font-size: 28px; }
        .header p { margin: 10px 0 0; opacity: 0.9; }
        .section { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .cost-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e9ecef; }
        .cost-item:last-child { border-bottom: none; }
        .cost-label { font-weight: 500; }
        .cost-amount { font-weight: bold; color: #3B82F6; }
        .total { background: #e3f2fd; padding: 20px; border-radius: 8px; border-left: 4px solid #3B82F6; }
        .cta { background: linear-gradient(135deg, #10B981, #3B82F6); color: white; padding: 20px; border-radius: 8px; text-align: center; margin-top: 30px; }
        .cta a { color: white; text-decoration: none; font-weight: bold; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Your Italian Property Investment Report</h1>
        <p>Comprehensive cost breakdown for your ${formatCurrency(calculationData.propertyValue)} ${calculationData.propertyType} property</p>
    </div>

    <div class="section">
        <h2 style="color: #3B82F6; margin-top: 0;">Property Details</h2>
        <div class="cost-item">
            <span class="cost-label">Property Value:</span>
            <span class="cost-amount">${formatCurrency(calculationData.propertyValue)}</span>
        </div>
        <div class="cost-item">
            <span class="cost-label">Property Type:</span>
            <span class="cost-amount">${calculationData.propertyType.charAt(0).toUpperCase() + calculationData.propertyType.slice(1)}</span>
        </div>
        <div class="cost-item">
            <span class="cost-label">Buyer Type:</span>
            <span class="cost-amount">${calculationData.buyerType === 'eu' ? 'EU Resident' : 'Non-EU Resident'}</span>
        </div>
        <div class="cost-item">
            <span class="cost-label">First Home:</span>
            <span class="cost-amount">${calculationData.isFirstHome ? 'Yes' : 'No'}</span>
        </div>
        <div class="cost-item">
            <span class="cost-label">Property Size:</span>
            <span class="cost-amount">${calculationData.propertySize} sqm</span>
        </div>
    </div>

    <div class="section">
        <h2 style="color: #3B82F6; margin-top: 0;">Purchase Costs Breakdown</h2>
        <div class="cost-item">
            <span class="cost-label">Registration Tax (${calculationData.isFirstHome && calculationData.buyerType === 'eu' ? '2%' : '9%'}):</span>
            <span class="cost-amount">${formatCurrency(costs.registrationTax)}</span>
        </div>
        <div class="cost-item">
            <span class="cost-label">Cadastral Tax:</span>
            <span class="cost-amount">${formatCurrency(costs.cadastralTax)}</span>
        </div>
        <div class="cost-item">
            <span class="cost-label">Mortgage Tax:</span>
            <span class="cost-amount">${formatCurrency(costs.mortgageTax)}</span>
        </div>
        <div class="cost-item">
            <span class="cost-label">Notary Fees:</span>
            <span class="cost-amount">${formatCurrency(costs.notaryFees)}</span>
        </div>
        ${costs.agencyFees > 0 ? `
        <div class="cost-item">
            <span class="cost-label">Agency Fees:</span>
            <span class="cost-amount">${formatCurrency(costs.agencyFees)}</span>
        </div>
        ` : ''}
        <div class="cost-item">
            <span class="cost-label">Legal Fees:</span>
            <span class="cost-amount">${formatCurrency(costs.lawyerFees)}</span>
        </div>
        <div class="cost-item">
            <span class="cost-label">Surveyor Fees:</span>
            <span class="cost-amount">${formatCurrency(costs.surveyorFees)}</span>
        </div>
        ${costs.translationFees > 0 ? `
        <div class="cost-item">
            <span class="cost-label">Translation Fees:</span>
            <span class="cost-amount">${formatCurrency(costs.translationFees)}</span>
        </div>
        ` : ''}
        ${costs.mortgageCosts > 0 ? `
        <div class="cost-item">
            <span class="cost-label">Mortgage Costs:</span>
            <span class="cost-amount">${formatCurrency(costs.mortgageCosts)}</span>
        </div>
        ` : ''}
        <div class="cost-item">
            <span class="cost-label">Insurance & Utilities:</span>
            <span class="cost-amount">${formatCurrency(costs.insuranceCosts + costs.utilityDeposits)}</span>
        </div>
    </div>

    <div class="section">
        <h2 style="color: #3B82F6; margin-top: 0;">Annual Costs</h2>
        <div class="cost-item">
            <span class="cost-label">IMU Property Tax:</span>
            <span class="cost-amount">${formatCurrency(costs.imuTax)}</span>
        </div>
        <div class="cost-item">
            <span class="cost-label">TASI Municipal Tax:</span>
            <span class="cost-amount">${formatCurrency(costs.tiscTax)}</span>
        </div>
        ${costs.condominiumFees > 0 ? `
        <div class="cost-item">
            <span class="cost-label">Condominium Fees:</span>
            <span class="cost-amount">${formatCurrency(costs.condominiumFees)}</span>
        </div>
        ` : ''}
    </div>

    <div class="total">
        <div class="cost-item" style="font-size: 18px; border: none;">
            <span class="cost-label">Total Upfront Costs:</span>
            <span class="cost-amount">${formatCurrency(costs.totalUpfrontCosts)}</span>
        </div>
        <div class="cost-item" style="font-size: 16px; border: none;">
            <span class="cost-label">Annual Costs:</span>
            <span class="cost-amount">${formatCurrency(costs.totalAnnualCosts)}</span>
        </div>
        <div class="cost-item" style="font-size: 20px; border: none; color: #10B981;">
            <span class="cost-label">Total Cost Percentage:</span>
            <span class="cost-amount">${costs.totalCostPercentage.toFixed(1)}%</span>
        </div>
    </div>

    <div class="cta">
        <h3 style="margin: 0 0 15px;">Ready to Invest in Italy?</h3>
        <p style="margin: 0 0 20px;">Giuseppe Funaro's team specializes in helping foreign investors navigate Italian property purchases and access EU grants up to €2.75M.</p>
        <a href="https://calendly.com/investinpuglia/30min" style="background: rgba(255,255,255,0.2); padding: 10px 20px; border-radius: 5px; display: inline-block;">Book Your Consultation</a>
    </div>
    
    <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin-top: 20px; text-align: center;">
        <p style="margin: 0; color: #856404; font-size: 14px;">
            📧 <strong>Important:</strong> If you don't see this email in your inbox, please check your spam/junk folder. 
            You can mark emails from reports@investinpuglia.eu as "not spam" to ensure future reports arrive in your inbox.
        </p>
    </div>
</body>
</html>
  `;

  // Send email using Resend API
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'InvestInPuglia <reports@investinpuglia.eu>',
      to: [userData.email],
      subject: `Your Italian Property Investment Report - ${formatCurrency(calculationData.propertyValue)} Property`,
      reply_to: 'g.funaro@investinpuglia.eu',
      html: emailContent
    })
  });

  if (!response.ok) {
    throw new Error('Failed to send email report');
  }

  console.log('Email report sent to:', userData.email);
}

async function sendWhatsAppReport(userData: UserData, costs: PropertyCosts, calculationData: CalculationData) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const whatsappMessage = `🏠 *Your Italian Property Investment Report*

📊 *Property Details:*
• Value: ${formatCurrency(calculationData.propertyValue)}
• Type: ${calculationData.propertyType.charAt(0).toUpperCase() + calculationData.propertyType.slice(1)}
• Buyer: ${calculationData.buyerType === 'eu' ? 'EU Resident' : 'Non-EU Resident'}
• First Home: ${calculationData.isFirstHome ? 'Yes' : 'No'}
• Size: ${calculationData.propertySize} sqm

💰 *Cost Summary:*
• Registration Tax: ${formatCurrency(costs.registrationTax)}
• Notary Fees: ${formatCurrency(costs.notaryFees)}
• Legal Fees: ${formatCurrency(costs.lawyerFees)}
${costs.agencyFees > 0 ? `• Agency Fees: ${formatCurrency(costs.agencyFees)}\n` : ''}${costs.translationFees > 0 ? `• Translation: ${formatCurrency(costs.translationFees)}\n` : ''}
📈 *Total Upfront Costs: ${formatCurrency(costs.totalUpfrontCosts)}*
📅 Annual Costs: ${formatCurrency(costs.totalAnnualCosts)}

🎯 *Total Cost Percentage: ${costs.totalCostPercentage.toFixed(1)}%*

Ready to invest in Italy? 🇮🇹
Giuseppe Funaro's team can help you navigate the purchase process and access EU grants up to €2.75M.

Book your consultation: https://calendly.com/investinpuglia/30min`;

  // Send WhatsApp message using Twilio
  const twilioResponse = await fetch('https://api.twilio.com/2010-04-01/Accounts/' + process.env.TWILIO_ACCOUNT_SID + '/Messages.json', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(process.env.TWILIO_ACCOUNT_SID + ':' + process.env.TWILIO_AUTH_TOKEN).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      From: process.env.TWILIO_WHATSAPP_NUMBER || '',
      To: `whatsapp:${userData.phone}`,
      Body: whatsappMessage
    })
  });

  if (!twilioResponse.ok) {
    throw new Error('Failed to send WhatsApp report');
  }

  console.log('WhatsApp report sent to:', userData.phone);
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Calculator Report Sender API',
    version: '1.0.0',
    supported_methods: ['email', 'whatsapp'],
    required_fields: ['userData', 'costs', 'calculationData']
  });
}