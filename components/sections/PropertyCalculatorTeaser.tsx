'use client'
import React, { useState } from 'react';
import { Calculator, Euro, ArrowRight, TrendingUp, Shield, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

const PropertyCalculatorTeaser: React.FC = () => {
  const [propertyValue, setPropertyValue] = useState<number>(250000);
  const [propertyType, setPropertyType] = useState<'residential' | 'luxury' | 'commercial'>('residential');
  const [buyerType, setBuyerType] = useState<'eu' | 'non-eu'>('non-eu');
  const [isFirstHome, setIsFirstHome] = useState<boolean>(true);
  
  const router = useRouter();

  // Quick calculation for teaser (simplified)
  const calculateQuickEstimate = () => {
    let registrationTax = 0;
    if (propertyType === 'residential') {
      registrationTax = isFirstHome && buyerType === 'eu' ? propertyValue * 0.02 : propertyValue * 0.09;
    } else {
      registrationTax = propertyValue * 0.09;
    }
    
    const notaryFees = propertyValue * (buyerType === 'non-eu' ? 0.025 : 0.02);
    const agencyFees = propertyValue * 0.036;
    const lawyerFees = buyerType === 'non-eu' ? 3500 : 2000;
    const otherCosts = 2000;
    
    const totalCosts = registrationTax + notaryFees + agencyFees + lawyerFees + otherCosts;
    const percentage = (totalCosts / propertyValue) * 100;
    
    return { totalCosts, percentage };
  };

  const { totalCosts, percentage } = calculateQuickEstimate();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleCalculateDetailed = () => {
    // Pass parameters to full calculator
    const params = new URLSearchParams({
      propertyValue: propertyValue.toString(),
      propertyType,
      buyerType,
      isFirstHome: isFirstHome.toString()
    });
    
    router.push(`/property-calculator?${params.toString()}`);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Calculate Your Italian Property Costs
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get an instant estimate of all costs when buying property in Italy as a foreign investor. 
            Includes taxes, legal fees, and annual expenses.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Input Section */}
            <div className="p-8 bg-gradient-to-br from-gray-50 to-white">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Euro className="w-6 h-6 text-blue-600" />
                Property Details
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Property Value
                  </label>
                  <div className="relative">
                    <Euro className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="range"
                      min="100000"
                      max="2000000"
                      step="25000"
                      value={propertyValue}
                      onChange={(e) => setPropertyValue(Number(e.target.value))}
                      className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>€100k</span>
                      <span className="font-bold text-lg text-blue-600">{formatCurrency(propertyValue)}</span>
                      <span>€2M+</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Property Type
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'residential', label: 'Residential', icon: '🏠' },
                      { value: 'luxury', label: 'Luxury', icon: '🏰' },
                      { value: 'commercial', label: 'Commercial', icon: '🏢' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setPropertyType(option.value as any)}
                        className={`p-3 rounded-lg border-2 text-center transition-all ${
                          propertyType === option.value
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{option.icon}</div>
                        <div className="text-sm font-medium">{option.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Buyer Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'eu', label: 'EU Resident', icon: '🇪🇺', desc: 'Lower taxes' },
                      { value: 'non-eu', label: 'Non-EU Resident', icon: '🌍', desc: 'Higher fees' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setBuyerType(option.value as any)}
                        className={`p-4 rounded-lg border-2 text-center transition-all ${
                          buyerType === option.value
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{option.icon}</div>
                        <div className="text-sm font-semibold">{option.label}</div>
                        <div className="text-xs text-gray-500">{option.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="firstHomeTeaser"
                    checked={isFirstHome}
                    onChange={(e) => setIsFirstHome(e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="firstHomeTeaser" className="text-sm font-medium text-gray-700">
                    First home in Italy (Prima Casa) - Lower taxes for EU residents
                  </label>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="p-8 bg-gradient-to-br from-blue-600 to-green-600 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6" />
                  Estimated Costs
                </h3>

                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">
                        {formatCurrency(totalCosts)}
                      </div>
                      <div className="text-lg opacity-90">
                        Total Estimated Costs
                      </div>
                      <div className="text-2xl font-semibold mt-3">
                        {percentage.toFixed(1)}% of property value
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
                      <div className="font-semibold">Registration Tax</div>
                      <div className="text-lg font-bold">
                        {isFirstHome && buyerType === 'eu' ? '2%' : '9%'}
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
                      <div className="font-semibold">Legal + Notary</div>
                      <div className="text-lg font-bold">
                        {buyerType === 'non-eu' ? '4.5%' : '4%'}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="w-4 h-4" />
                      <span>Accurate Italian tax calculations</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>Updated 2024 rates & regulations</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calculator className="w-4 h-4" />
                      <span>All costs included: taxes, fees, annual expenses</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCalculateDetailed}
                    className="w-full bg-white text-blue-600 font-bold py-4 px-6 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                  >
                    Get Detailed Breakdown
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <p className="text-xs opacity-75 text-center">
                    Free detailed report includes all costs, payment timeline, and expert consultation booking
                  </p>
                </div>
              </div>

              {/* Background decoration */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full"></div>
                <div className="absolute bottom-10 left-10 w-24 h-24 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
            <div className="text-gray-600">Years helping foreign investors</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">€80M+</div>
            <div className="text-gray-600">In successful investments managed</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
            <div className="text-gray-600">Client satisfaction rate</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </section>
  );
};

export default PropertyCalculatorTeaser;