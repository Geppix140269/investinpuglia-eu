// app/property-registry/page.tsx
// Main page for Catasto property registry search

import { Metadata } from 'next';
import CatastoPropertySearch from '@/components/CatastoPropertySearch';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Property Registry Search | InvestInPuglia',
  description: 'Search Italian property registry (Catasto) for real estate information in Puglia',
};

export default async function PropertyRegistryPage() {
  // Check if user is authenticated
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login?redirect=/property-registry');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Italian Property Registry (Catasto)
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Access official property data for real estate in Puglia
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Logged in as</p>
              <p className="font-medium text-gray-900">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12">
        <CatastoPropertySearch />
        
        {/* Information Section */}
        <div className="max-w-6xl mx-auto px-6 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What is Visura Catastale?
              </h3>
              <p className="text-gray-600 text-sm">
                A visura catastale is an official document from the Italian land registry 
                containing detailed information about a property including ownership, 
                cadastral income, and property classification.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Property Identification
              </h3>
              <p className="text-gray-600 text-sm">
                Italian properties are identified by: Foglio (sheet number), 
                Particella (parcel number), and optionally Subalterno (sub-unit number) 
                for apartments or subdivided properties.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Legal Disclaimer
              </h3>
              <p className="text-gray-600 text-sm">
                Documents obtained through this service are for informational purposes. 
                For official legal proceedings, please obtain certified copies from the 
                Agenzia delle Entrate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
