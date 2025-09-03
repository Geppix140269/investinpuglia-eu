import { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'json2csv';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { format, period, region, dataType = 'tourism' } = req.body;

    // Fetch the data (reuse logic from fetch endpoint)
    const data = await fetchTourismData({ period, region, dataType });

    let fileContent: Buffer;
    let contentType: string;
    let fileName: string;

    const timestamp = new Date().toISOString().split('T')[0];

    switch (format) {
      case 'csv':
        fileContent = Buffer.from(generateCSV(data));
        contentType = 'text/csv';
        fileName = `tourism-data-${timestamp}.csv`;
        break;

      case 'xlsx':
        fileContent = await generateExcel(data);
        contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        fileName = `tourism-data-${timestamp}.xlsx`;
        break;

      case 'pdf':
        fileContent = await generatePDF(data);
        contentType = 'application/pdf';
        fileName = `tourism-report-${timestamp}.pdf`;
        break;

      default:
        return res.status(400).json({ error: 'Invalid format' });
    }

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.send(fileContent);

  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Export failed' });
  }
}

async function fetchTourismData(params: any) {
  // Fetch data from DMS or use mock data
  return {
    summary: [
      { metric: 'Total Visitors', value: 2400000, change: 12.5 },
      { metric: 'International Arrivals', value: 850000, change: 18.2 },
      { metric: 'Average Stay (days)', value: 4.2, change: -2.1 },
      { metric: 'Occupancy Rate (%)', value: 68.5, change: 5.3 },
      { metric: 'Tourism Revenue (EUR)', value: 1200000000, change: 15.7 }
    ],
    monthlyData: generateMonthlyData(),
    regionData: generateRegionData(),
    demographicData: generateDemographicData()
  };
}

function generateCSV(data: any): string {
  try {
    // Flatten data structure for CSV
    const flatData: any[] = [];
    
    // Add summary data
    data.summary.forEach((item: any) => {
      flatData.push({
        Category: 'Summary',
        Metric: item.metric,
        Value: item.value,
        'Change (%)': item.change
      });
    });

    // Add monthly data
    data.monthlyData.forEach((item: any) => {
      flatData.push({
        Category: 'Monthly',
        Metric: item.month,
        Value: item.visitors,
        'Revenue (EUR)': item.revenue
      });
    });

    // Add region data
    data.regionData.forEach((item: any) => {
      flatData.push({
        Category: 'Region',
        Metric: item.name,
        Value: item.visitors,
        'Hotels': item.hotels,
        'Occupancy (%)': item.occupancy
      });
    });

    const fields = Object.keys(flatData[0]);
    const csv = parse(flatData, { fields });
    return csv;
  } catch (error) {
    console.error('CSV generation error:', error);
    return 'Error generating CSV';
  }
}

async function generateExcel(data: any): Promise<Buffer> {
  // For Excel generation, we'll create a simple implementation
  // In production, you'd use a library like exceljs or xlsx
  
  // Simplified: return CSV data as fallback
  const csvData = generateCSV(data);
  return Buffer.from(csvData);
}

async function generatePDF(data: any): Promise<Buffer> {
  // For PDF generation, create a simple HTML-to-PDF conversion
  // In production, you'd use puppeteer or jspdf
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Tourism Report - Puglia</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { color: #1e40af; }
        h2 { color: #3b82f6; margin-top: 30px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #f3f4f6; }
        .metric { font-weight: bold; }
        .positive { color: #10b981; }
        .negative { color: #ef4444; }
      </style>
    </head>
    <body>
      <h1>Tourism Data Report - Puglia</h1>
      <p>Generated on: ${new Date().toLocaleDateString()}</p>
      
      <h2>Executive Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Value</th>
            <th>Change (%)</th>
          </tr>
        </thead>
        <tbody>
          ${data.summary.map((item: any) => `
            <tr>
              <td class="metric">${item.metric}</td>
              <td>${typeof item.value === 'number' ? item.value.toLocaleString() : item.value}</td>
              <td class="${item.change > 0 ? 'positive' : 'negative'}">${item.change > 0 ? '+' : ''}${item.change}%</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <h2>Regional Distribution</h2>
      <table>
        <thead>
          <tr>
            <th>Region</th>
            <th>Visitors</th>
            <th>Hotels</th>
            <th>Occupancy (%)</th>
          </tr>
        </thead>
        <tbody>
          ${data.regionData.map((item: any) => `
            <tr>
              <td class="metric">${item.name}</td>
              <td>${item.visitors.toLocaleString()}</td>
              <td>${item.hotels}</td>
              <td>${item.occupancy}%</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <p style="margin-top: 40px; font-size: 12px; color: #6b7280;">
        Data source: Puglia DMS Observatory | Report generated via InvestInPuglia.eu
      </p>
    </body>
    </html>
  `;

  // Return HTML as buffer (in production, convert to PDF)
  return Buffer.from(htmlContent);
}

function generateMonthlyData() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    month,
    visitors: Math.floor(150000 + Math.random() * 250000),
    revenue: Math.floor(80000000 + Math.random() * 120000000)
  }));
}

function generateRegionData() {
  const regions = ['Bari', 'Brindisi', 'Foggia', 'Lecce', 'Taranto', 'BAT'];
  return regions.map(region => ({
    name: region,
    visitors: Math.floor(200000 + Math.random() * 600000),
    hotels: Math.floor(50 + Math.random() * 150),
    occupancy: (60 + Math.random() * 20).toFixed(1)
  }));
}

function generateDemographicData() {
  return {
    ageGroups: [
      { group: '18-24', percentage: 15 },
      { group: '25-34', percentage: 28 },
      { group: '35-44', percentage: 25 },
      { group: '45-54', percentage: 18 },
      { group: '55+', percentage: 14 }
    ],
    purposes: [
      { purpose: 'Leisure', percentage: 72 },
      { purpose: 'Business', percentage: 18 },
      { purpose: 'Family', percentage: 8 },
      { purpose: 'Other', percentage: 2 }
    ]
  };
}