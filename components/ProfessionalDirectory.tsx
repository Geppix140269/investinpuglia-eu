import React, { useState, useEffect } from 'react';
import { Search, Phone, Mail, Globe, MapPin, Star, Filter, Calendar } from 'lucide-react';

// Sample professional data - in production, this would come from your database
const SAMPLE_PROFESSIONALS = [
  {
    id: 1,
    name: "Avv. Maria Rossi",
    type: "lawyer",
    specialties: ["Real Estate Law", "Foreign Investment", "Tax Planning"],
    languages: ["IT", "EN", "FR"],
    location: "Lecce",
    rating: 4.8,
    reviews: 42,
    email: "m.rossi@example.com",
    phone: "+39 0832 123456",
    website: "www.rossilaw.it",
    verified: true,
    responseTime: "< 24h",
    description: "Specialized in helping international investors navigate Italian property law with 15+ years experience."
  },
  {
    id: 2,
    name: "Arch. Giuseppe Bianchi",
    type: "architect",
    specialties: ["Historic Restoration", "Luxury Villas", "Sustainable Design"],
    languages: ["IT", "EN", "DE"],
    location: "Ostuni",
    rating: 4.9,
    reviews: 38,
    email: "studio@bianchi.it",
    phone: "+39 0831 987654",
    website: "www.studiobianchi.it",
    verified: true,
    responseTime: "< 48h",
    description: "Award-winning architect specializing in preserving Puglia's architectural heritage while creating modern luxury spaces."
  },
  {
    id: 3,
    name: "Ing. Roberto Russo",
    type: "engineer",
    specialties: ["Structural Analysis", "Seismic Assessment", "Building Permits"],
    languages: ["IT", "EN"],
    location: "Bari",
    rating: 4.7,
    reviews: 29,
    email: "ing.russo@example.com",
    phone: "+39 080 555444",
    verified: true,
    responseTime: "< 72h",
    description: "Expert in structural engineering and regulatory compliance for property renovations in Puglia."
  },
  {
    id: 4,
    name: "Dott. Lucia Greco",
    type: "accountant",
    specialties: ["International Tax", "VAT Optimization", "Grant Applications"],
    languages: ["IT", "EN", "ES"],
    location: "Brindisi",
    rating: 4.9,
    reviews: 51,
    email: "l.greco@fiscale.it",
    phone: "+39 0831 333222",
    website: "www.grecofiscale.it",
    verified: true,
    responseTime: "< 24h",
    description: "Certified accountant with expertise in EU grant applications and cross-border tax optimization."
  }
];

const PROFESSIONAL_TYPES = {
  all: { label: "All Professionals", icon: "👥" },
  lawyer: { label: "Lawyers", icon: "⚖️" },
  architect: { label: "Architects", icon: "🏛️" },
  accountant: { label: "Accountants", icon: "💰" },
  engineer: { label: "Engineers", icon: "🔧" },
  realtor: { label: "Real Estate", icon: "🏠" },
  contractor: { label: "Contractors", icon: "🔨" }
};

const ProfessionalDirectory = () => {
  const [professionals, setProfessionals] = useState(SAMPLE_PROFESSIONALS);
  const [filteredProfessionals, setFilteredProfessionals] = useState(SAMPLE_PROFESSIONALS);
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState(null);

  // Filter professionals based on criteria
  useEffect(() => {
    let filtered = professionals;

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(p => p.type === selectedType);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by language
    if (selectedLanguage !== 'all') {
      filtered = filtered.filter(p => p.languages.includes(selectedLanguage));
    }

    // Filter by location
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(p => p.location === selectedLocation);
    }

    setFilteredProfessionals(filtered);
  }, [selectedType, searchTerm, selectedLanguage, selectedLocation, professionals]);

  const handleContactClick = (professional) => {
    setSelectedProfessional(professional);
    setShowContactModal(true);
    
    // Track the interest
    trackProfessionalView(professional.id, professional.type);
  };

  const trackProfessionalView = async (professionalId, professionalType) => {
    // In production, send this to your API
    console.log('Tracking view:', { professionalId, professionalType });
  };

  const ContactModal = ({ professional, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-xl font-bold mb-4">Contact {professional.name}</h3>
        
        <div className="space-y-4">
          <a href={`tel:${professional.phone}`} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition">
            <Phone className="text-green-600" size={20} />
            <span className="font-medium">{professional.phone}</span>
          </a>
          
          <a href={`mailto:${professional.email}`} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
            <Mail className="text-blue-600" size={20} />
            <span className="font-medium">{professional.email}</span>
          </a>
          
          {professional.website && (
            <a href={`https://${professional.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition">
              <Globe className="text-purple-600" size={20} />
              <span className="font-medium">{professional.website}</span>
            </a>
          )}
          
          <button className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition flex items-center justify-center gap-2">
            <Calendar size={20} />
            Schedule Consultation
          </button>
        </div>
        
        <button onClick={onClose} className="mt-6 text-gray-500 hover:text-gray-700 w-full text-center">
          Close
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Professional Directory</h1>
        <p className="text-gray-600">Connect with trusted professionals for your investment in Puglia</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search professionals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
          >
            {Object.entries(PROFESSIONAL_TYPES).map(([value, { label, icon }]) => (
              <option key={value} value={value}>{icon} {label}</option>
            ))}
          </select>

          {/* Language Filter */}
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
          >
            <option value="all">🌐 All Languages</option>
            <option value="IT">🇮🇹 Italian</option>
            <option value="EN">🇬🇧 English</option>
            <option value="ES">🇪🇸 Spanish</option>
            <option value="FR">🇫🇷 French</option>
            <option value="DE">🇩🇪 German</option>
          </select>

          {/* Location Filter */}
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
          >
            <option value="all">📍 All Locations</option>
            <option value="Bari">Bari</option>
            <option value="Lecce">Lecce</option>
            <option value="Brindisi">Brindisi</option>
            <option value="Ostuni">Ostuni</option>
            <option value="Taranto">Taranto</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-gray-600 mb-4">
        Found {filteredProfessionals.length} professionals
      </p>

      {/* Professional Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProfessionals.map((professional) => (
          <div key={professional.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  {professional.name}
                  {professional.verified && (
                    <span className="text-teal-600" title="Verified Professional">✓</span>
                  )}
                </h3>
                <p className="text-gray-600 capitalize">{PROFESSIONAL_TYPES[professional.type].icon} {professional.type}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-500 fill-current" size={16} />
                  <span className="font-semibold">{professional.rating}</span>
                  <span className="text-gray-500 text-sm">({professional.reviews})</span>
                </div>
                <p className="text-sm text-gray-500">{professional.responseTime}</p>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{professional.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin size={16} />
                {professional.location}
              </div>
              <div className="flex flex-wrap gap-2">
                {professional.specialties.map((specialty, idx) => (
                  <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {specialty}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                {professional.languages.map((lang, idx) => (
                  <span key={idx} className="text-sm text-gray-600">
                    {lang}{idx < professional.languages.length - 1 ? ' •' : ''}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleContactClick(professional)}
              className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition flex items-center justify-center gap-2"
            >
              <Phone size={18} />
              Contact Professional
            </button>
          </div>
        ))}
      </div>

      {/* Contact Modal */}
      {showContactModal && selectedProfessional && (
        <ContactModal
          professional={selectedProfessional}
          onClose={() => setShowContactModal(false)}
        />
      )}

      {/* No Results */}
      {filteredProfessionals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No professionals found matching your criteria.</p>
          <button onClick={() => {
            setSelectedType('all');
            setSearchTerm('');
            setSelectedLanguage('all');
            setSelectedLocation('all');
          }} className="mt-4 text-teal-600 hover:text-teal-700">
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfessionalDirectory;
