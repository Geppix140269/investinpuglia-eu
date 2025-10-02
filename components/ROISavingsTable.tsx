'use client'

interface ROIRow {
  riskAvoided: string
  potentialSavings: string
}

interface ROISavingsTableProps {
  investment: string
  rows: ROIRow[]
  roiMultiple: string
}

export default function ROISavingsTable({ investment, rows, roiMultiple }: ROISavingsTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h4 className="text-xl font-bold mb-4 text-gray-900">What You Save:</h4>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left py-3 px-2 font-semibold text-gray-700">Risk Avoided</th>
              <th className="text-right py-3 px-2 font-semibold text-gray-700">Potential Savings</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-3 px-2 text-sm text-gray-600">{row.riskAvoided}</td>
                <td className="py-3 px-2 text-right font-semibold text-gray-900">{row.potentialSavings}</td>
              </tr>
            ))}
            <tr className="bg-indigo-50 font-bold">
              <td className="py-4 px-2 text-gray-900">Your Investment: {investment}</td>
              <td className="py-4 px-2 text-right text-indigo-600">Potential ROI: {roiMultiple}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
