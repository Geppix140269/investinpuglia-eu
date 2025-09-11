'use client'
import React, { useState, useEffect } from 'react';
import { Calculator, Home, Euro, FileText, AlertCircle, Info, Mail, MessageCircle, Download, User } from 'lucide-react';

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
  totalCostPercentage: number;
}

interface UserData {
  name: string;
  email: string;
  phone: string;
  preferredContact: 'email' | 'whatsapp';
  country: string;
}

const PropertyCalculatorWithRegistration: React.FC = () => {
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
  
  const [costs, setCosts] = useState<PropertyCosts | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showRegistration, setShowRegistration] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isSendingReport, setIsSendingReport] = useState<boolean>(false);

  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    phone: '',
    preferredContact: 'email',
    country: ''
  });

  const calculateCosts = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/property-calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyValue,
          propertyType,
          buyerType,
          isFirstHome,
          hasAgency,
          needsMortgage,
          mortgageAmount: needsMortgage ? mortgageAmount : 0,
          propertySize,
          hasCondominium,
          region,
          userEmail: isRegistered ? userData.email : undefined
        })
      });

      const data = await response.json();
      if (data.success) {
        setCosts(data.costs);
      } else {
        console.error('Calculation failed:', data.error);
      }
    } catch (error) {
      console.error('Failed to calculate costs:', error);
    }
    
    setIsLoading(false);
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/calculator-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userData,
          calculationData: {
            propertyValue,
            propertyType,
            buyerType,
            isFirstHome,
            hasAgency,
            needsMortgage,
            mortgageAmount: needsMortgage ? mortgageAmount : 0,
            propertySize,
            hasCondominium,
            region
          }
        })
      });

      const data = await response.json();
      if (data.success) {
        setIsRegistered(true);
        setShowRegistration(false);
        // Recalculate with user data
        calculateCosts();
      } else {
        console.error('Registration failed:', data.error);
      }
    } catch (error) {
      console.error('Failed to register:', error);
    }

    setIsLoading(false);
  };

  const sendReport = async () => {
    if (!costs || !isRegistered) return;
    
    setIsSendingReport(true);

    try {
      const response = await fetch('/api/send-calculator-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userData,
          costs,
          calculationData: {
            propertyValue,
            propertyType,
            buyerType,
            isFirstHome,
            hasAgency,
            needsMortgage,
            mortgageAmount: needsMortgage ? mortgageAmount : 0,
            propertySize,
            hasCondominium,
            region
          }
        })
      });

      const data = await response.json();
      if (data.success) {
        alert(userData.preferredContact === 'email' 
          ? 'Detailed report sent to your email!'
          : 'Detailed report sent to your WhatsApp!'
        );
      } else {
        console.error('Failed to send report:', data.error);
        alert('Failed to send report. Please try again.');
      }
    } catch (error) {
      console.error('Failed to send report:', error);
      alert('Failed to send report. Please try again.');
    }

    setIsSendingReport(false);
  };

  useEffect(() => {
    if (!showRegistration) {
      calculateCosts();
    }
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
          ) : costs ? (
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
                      {costs.totalCostPercentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mt-6">
                {!isRegistered ? (
                  <button
                    onClick={() => setShowRegistration(true)}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <User className="w-5 h-5" />
                    Get Detailed Report & Expert Consultation
                  </button>
                ) : (
                  <div className="space-y-2">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-green-800">
                        <User className="w-4 h-4" />
                        <span className="text-sm font-medium">Registered: {userData.name} ({userData.email})</span>
                      </div>
                    </div>
                    <button
                      onClick={sendReport}
                      disabled={isSendingReport}
                      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      {isSendingReport ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                          Sending Report...
                        </>
                      ) : (
                        <>
                          {userData.preferredContact === 'email' ? <Mail className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
                          Send Detailed Report via {userData.preferredContact === 'email' ? 'Email' : 'WhatsApp'}
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Registration Modal */}
      {showRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Get Your Detailed Property Investment Report</h3>
            <p className="text-gray-600 text-sm mb-4">
              Register to receive a comprehensive PDF report with your calculations, plus expert consultation from Giuseppe Funaro's team.
            </p>
            
            <form onSubmit={handleRegistration} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number (with country code)"
                value={userData.phone}
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Country"
                value={userData.country}
                onChange={(e) => setUserData({ ...userData, country: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Contact Method
                </label>
                <select
                  value={userData.preferredContact}
                  onChange={(e) => setUserData({ ...userData, preferredContact: e.target.value as 'email' | 'whatsapp' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="email">Email</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowRegistration(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {isLoading ? 'Registering...' : 'Get Report'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyCalculatorWithRegistration;