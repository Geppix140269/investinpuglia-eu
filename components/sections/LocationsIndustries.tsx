import Link from 'next/link';
import { MapPin, Building, Hotel, Utensils, Factory, Home, Briefcase, ArrowRight } from 'lucide-react';

export default function LocationsIndustries() {
  const locations = [
    {
      name: 'Bari',
      description: 'Capital city & business hub',
      link: '/locations/bari',
      stats: '+63.5% growth'
    },
    {
      name: 'Lecce', 
      description: 'Baroque jewel of the South',
      link: '/locations/lecce',
      stats: 'UNESCO Heritage'
    },
    {
      name: 'Ostuni',
      description: 'The White City premium market', 
      link: '/locations/ostuni',
      stats: '+250% value growth'
    },
    {
      name: 'Monopoli',
      description: 'Luxury coastal destination',
      link: '/locations/monopoli',
      stats: '€400k-1M+ market'
    },
    {
      name: 'Valle d\'Itria',
      description: 'Trulli heritage region',
      link: '/locations/valle-ditria',
      stats: 'Unique properties'
    },
    {
      name: 'Salento Coast',
      description: 'Premier beach destinations',
      link: '/locations/salento',
      stats: 'Tourism hotspot'
    }
  ];

  const industries = [
    {
      name: 'Hotels & Resorts',
      description: 'Luxury hospitality development',
      link: '/industries/hotels-resorts',
      fundingRate: '45-55%',
      icon: <Hotel className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Trulli & Heritage',
      description: 'Historic property restoration',
      link: '/industries/trulli-heritage',
      fundingRate: '55%',
      icon: <Home className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Restaurants & Food',
      description: 'Culinary ventures & agritourism',
      link: '/industries/restaurants-food',
      fundingRate: '50%',
      icon: <Utensils className="w-6 h-6" />,
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Manufacturing & Tech',
      description: 'Industrial & technology projects',
      link: '/industries/manufacturing-tech',
      fundingRate: '45%',
      icon: <Factory className="w-6 h-6" />,
      color: 'from-orange-500 to-orange-600'
    },
    {
      name: 'Real Estate Development',
      description: 'Residential & commercial projects',
      link: '/industries/real-estate',
      fundingRate: '40-50%',
      icon: <Building className="w-6 h-6" />,
      color: 'from-red-500 to-red-600'
    },
    {
      name: 'Business Services',
      description: 'Professional & consulting services',
      link: '/industries/business-services',
      fundingRate: '35-45%',
      icon: <Briefcase className="w-6 h-6" />,
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Locations Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Prime Investment <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-emerald-600">Locations</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Strategic locations across Puglia offering unique investment opportunities and exceptional growth potential
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location, index) => (
              <Link
                key={index}
                href={location.link}
                className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="bg-gradient-to-br from-purple-100 to-emerald-100 h-48 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs font-bold text-purple-600">{location.stats}</span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <MapPin className="w-8 h-8 text-white/80" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{location.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{location.description}</p>
                  <div className="flex items-center text-purple-600 font-medium text-sm group-hover:gap-3 transition-all">
                    <span>Explore Location</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Industries Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Investment <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-emerald-600">Industries</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Diverse sectors eligible for EU grants and regional funding programs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <Link
                key={index}
                href={industry.link}
                className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${industry.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                  {industry.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{industry.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{industry.description}</p>
                <div className="flex items-center justify-between">
                  <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {industry.fundingRate} Funding
                  </div>
                  <ArrowRight className="w-5 h-5 text-purple-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-purple-600 to-emerald-600 rounded-3xl p-12 text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Invest in Puglia?
          </h3>
          <p className="text-lg mb-8 text-purple-100 max-w-2xl mx-auto">
            Explore opportunities across all locations and industries with our expert guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center gap-2 bg-white text-purple-900 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              FREE Expert Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/properties"
              className="inline-flex items-center justify-center gap-2 bg-purple-700 text-white px-8 py-4 rounded-full font-bold hover:bg-purple-800 transition-all"
            >
              Browse Properties
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}