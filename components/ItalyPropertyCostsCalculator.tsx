'use client'
import React, { useState, useEffect } from 'react';
import { Calculator, Home, Euro, FileText, AlertCircle, Info } from 'lucide-react';

interface PropertyCosts {
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
}

const ItalyPropertyCostsCalculator: React.FC = () => {
  const [propertyValue, setPropertyValue] = useState<number>(200000);
  const [propertyType, setPropertyType] = useState<'residential' | 'luxury' | 'commercial'>('residential');
  const [buyerType, setBuyerType] = useState<'eu' | 'non-eu'>('non-eu');
  const [isFirstHome, setIsFirstHome] = useState<boolean>(true);
  const [hasAgency, setHasAgency] = useState<boolean>(true);
  const [needsMortgage, setNeedsMortgage] = useState<boolean>(false);
  const [mortgageAmount, setMortgageAmount] = useState<number>(0);
  const [propertySize, setPropertySize] = useState<number>(100);
  const [hasCondominium, setHasCondominium] = useState<boolean>(false);
  const [region, setRegion] = useState<'standard' | 'puglia'>('puglia');
  
  const [costs, setCosts] = useState<PropertyCosts>({} as PropertyCosts);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const calculateCosts = async () => {
    setIsLoading(true);
    
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
    const cadastralTax = isFirstHome ? 50 : 200;
    const mortgageTax = isFirstHome ? 50 : 200;

    // Notary fees (1.5-3% of property value)
    const notaryFees = propertyValue * (buyerType === 'non-eu' ? 0.025 : 0.02);

    // Agency fees (3-6% + VAT)
    const agencyFees = hasAgency ? propertyValue * 0.036 : 0; // 3% + 22% VAT

    // Lawyer fees (more expensive for foreigners)
    const lawyerFees = buyerType === 'non-eu' ? 3500 : 2000;

    // Surveyor/technical inspection
    const surveyorFees = 800;

    // Translation fees for non-EU buyers
    const translationFees = buyerType === 'non-eu' ? 1200 : 0;

    // Mortgage costs (if applicable)
    const mortgageCosts = needsMortgage ? mortgageAmount * 0.0025 + 1500 : 0; // 0.25% + fixed costs

    // Insurance (building + contents)
    const insuranceCosts = propertyValue * 0.0015; // ~0.15% annually

    // Utility deposits
    const utilityDeposits = 800;

    // Annual IMU tax (varies by municipality)
    const imuRate = isFirstHome ? 0 : 0.0076; // First home usually exempt
    const imuTax = propertyValue * imuRate;

    // TASI tax (abolished in many areas but still exists in some)
    const tiscTax = propertyValue * 0.0025; // ~0.25%

    // Condominium fees (if applicable)
    const condominiumFees = hasCondominium ? propertySize * 20 : 0; // €20/sqm annually

    const totalUpfrontCosts = registrationTax + cadastralTax + mortgageTax + 
                             notaryFees + agencyFees + lawyerFees + 
                             surveyorFees + translationFees + mortgageCosts + 
                             insuranceCosts + utilityDeposits;

    const totalAnnualCosts = imuTax + tiscTax + condominiumFees;
    const grandTotal = totalUpfrontCosts + totalAnnualCosts;

    setCosts({
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
      grandTotal
    });

    setIsLoading(false);
  };

  useEffect(() => {
    calculateCosts();
  }, [propertyValue, propertyType, buyerType, isFirstHome, hasAgency, needsMortgage, mortgageAmount, propertySize, hasCondominium, region]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const CostBreakdown = ({ title, amount, description }: { title: string; amount: number; description: string }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex-1">
        <div className="font-medium text-gray-900">{title}</div>
        <div className="text-sm text-gray-600">{description}</div>
      </div>
      <div className="font-bold text-lg text-blue-600">{formatCurrency(amount)}</div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-8 h-8 text-blue-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Italy Property Costs Calculator</h2>
          <p className="text-gray-600">Complete breakdown of all costs for foreign buyers</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Parameters */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Home className="w-5 h-5" />
            Property Details
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Value
            </label>
            <div className="relative">
              <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={propertyValue}
                onChange={(e) => setPropertyValue(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="50000"
                step="10000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Type
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="residential">Residential Property</option>
              <option value="luxury">Luxury Property (&gt;€750k)</option>
              <option value="commercial">Commercial Property</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buyer Nationality
            </label>
            <select
              value={buyerType}
              onChange={(e) => setBuyerType(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="eu">EU Resident</option>
              <option value="non-eu">Non-EU Resident</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Size (sqm)
            </label>
            <input
              type="number"
              value={propertySize}
              onChange={(e) => setPropertySize(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              min="30"
              step="10"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="firstHome"
              checked={isFirstHome}
              onChange={(e) => setIsFirstHome(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="firstHome" className="text-sm text-gray-700">
              First home in Italy (Prima Casa)
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="hasAgency"
              checked={hasAgency}
              onChange={(e) => setHasAgency(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="hasAgency" className="text-sm text-gray-700">
              Using real estate agency
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="hasCondominium"
              checked={hasCondominium}
              onChange={(e) => setHasCondominium(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="hasCondominium" className="text-sm text-gray-700">
              Apartment in condominium
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="needsMortgage"
              checked={needsMortgage}
              onChange={(e) => setNeedsMortgage(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="needsMortgage" className="text-sm text-gray-700">
              Need mortgage financing
            </label>
          </div>

          {needsMortgage && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mortgage Amount
              </label>
              <input
                type="number"
                value={mortgageAmount}
                onChange={(e) => setMortgageAmount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                min="0"
                max={propertyValue * 0.8}
                step="5000"
              />
            </div>
          )}
        </div>

        {/* Cost Breakdown */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Cost Breakdown
          </h3>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Calculating costs...</p>
            </div>
          ) : (
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800">Purchase Taxes & Fees</h4>
              <CostBreakdown
                title="Registration Tax"
                amount={costs.registrationTax}
                description={`${isFirstHome && buyerType === 'eu' ? '2%' : '9%'} of property value`}
              />
              <CostBreakdown
                title="Cadastral Tax"
                amount={costs.cadastralTax}
                description="Fixed government fee"
              />
              <CostBreakdown
                title="Mortgage Tax"
                amount={costs.mortgageTax}
                description="Fixed government fee"
              />

              <h4 className="font-semibold text-gray-800 mt-6">Professional Fees</h4>
              <CostBreakdown
                title="Notary Fees"
                amount={costs.notaryFees}
                description={`${buyerType === 'non-eu' ? '2.5%' : '2%'} of property value`}
              />
              {hasAgency && (
                <CostBreakdown
                  title="Agency Fees"
                  amount={costs.agencyFees}
                  description="3% + 22% VAT"
                />
              )}
              <CostBreakdown
                title="Lawyer Fees"
                amount={costs.lawyerFees}
                description={buyerType === 'non-eu' ? 'Higher for non-EU buyers' : 'Legal assistance'}
              />
              <CostBreakdown
                title="Surveyor Fees"
                amount={costs.surveyorFees}
                description="Technical inspection"
              />
              {buyerType === 'non-eu' && (
                <CostBreakdown
                  title="Translation Fees"
                  amount={costs.translationFees}
                  description="Document translation"
                />
              )}

              <h4 className="font-semibold text-gray-800 mt-6">Additional Costs</h4>
              {needsMortgage && (
                <CostBreakdown
                  title="Mortgage Costs"
                  amount={costs.mortgageCosts}
                  description="0.25% + fixed costs"
                />
              )}
              <CostBreakdown
                title="Insurance"
                amount={costs.insuranceCosts}
                description="Building + contents insurance"
              />
              <CostBreakdown
                title="Utility Deposits"
                amount={costs.utilityDeposits}
                description="Gas, electricity, water"
              />

              <h4 className="font-semibold text-gray-800 mt-6">Annual Costs</h4>
              <CostBreakdown
                title="IMU Tax"
                amount={costs.imuTax}
                description={isFirstHome ? 'Exempt for first home' : '0.76% annually'}
              />
              <CostBreakdown
                title="TASI Tax"
                amount={costs.tiscTax}
                description="Municipal services tax"
              />
              {hasCondominium && (
                <CostBreakdown
                  title="Condominium Fees"
                  amount={costs.condominiumFees}
                  description="€20/sqm annually"
                />
              )}

              {/* Summary */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-blue-900">Total Upfront Costs:</span>
                  <span className="font-bold text-xl text-blue-600">
                    {formatCurrency(costs.totalUpfrontCosts)}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-blue-900">Annual Costs:</span>
                  <span className="font-bold text-xl text-blue-600">
                    {formatCurrency(costs.totalAnnualCosts)}
                  </span>
                </div>
                <div className="border-t border-blue-200 pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-blue-900">Total Cost Percentage:</span>
                    <span className="font-bold text-2xl text-blue-600">
                      {((costs.totalUpfrontCosts / propertyValue) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-yellow-800">
                    <h4 className="font-semibold mb-2">Important Notes:</h4>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Costs vary by region and municipality</li>
                      <li>First home benefits only available for EU residents</li>
                      <li>Additional costs may apply for historic properties</li>
                      <li>Mortgage availability limited for non-EU residents</li>
                      <li>Consider ongoing maintenance and renovation costs</li>
                      <li>Exchange rate fluctuations may affect final costs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItalyPropertyCostsCalculator;