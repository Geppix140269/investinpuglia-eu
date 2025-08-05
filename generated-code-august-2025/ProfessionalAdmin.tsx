import React, { useState, useEffect } from 'react';
import { Save, Plus, Edit, Trash2, Search, CheckCircle, XCircle } from 'lucide-react';

const ProfessionalAdmin = () => {
  const [professionals, setProfessionals] = useState([]);
  const [editingProfessional, setEditingProfessional] = useState<any>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    type: 'lawyer',
    email: '',
    phone: '',
    website: '',
    location: '',
    languages: [] as string[],
    specialties: [],
    description: '',
    verified: false,
    response_time: '< 24h'
  });

  const PROFESSIONAL_TYPES = [
    { value: 'lawyer', label: 'Lawyer / Avvocato' },
    { value: 'architect', label: 'Architect / Architetto' },
    { value: 'accountant', label: 'Accountant / Commercialista' },
    { value: 'engineer', label: 'Engineer / Ingegnere' },
    { value: 'realtor', label: 'Real Estate / Agente Immobiliare' },
    { value: 'contractor', label: 'Contractor / Impresa Edile' },
    { value: 'notary', label: 'Notary / Notaio' },
    { value: 'surveyor', label: 'Surveyor / Geometra' }
  ];

  const LANGUAGES = [
    { code: 'IT', label: 'ðŸ‡®ðŸ‡¹ Italian' },
    { code: 'EN', label: 'ðŸ‡¬ðŸ‡§ English' },
    { code: 'ES', label: 'ðŸ‡ªðŸ‡¸ Spanish' },
    { code: 'FR', label: 'ðŸ‡«ðŸ‡· French' },
    { code: 'DE', label: 'ðŸ‡©ðŸ‡ª German' },
    { code: 'RU', label: 'ðŸ‡·ðŸ‡º Russian' },
    { code: 'AR', label: 'ðŸ‡¸ðŸ‡¦ Arabic' },
    { code: 'ZH', label: 'ðŸ‡¨ðŸ‡³ Chinese' }
  ];

  const LOCATIONS = [
    'Bari', 'Lecce', 'Brindisi', 'Taranto', 'Foggia', 
    'Ostuni', 'Monopoli', 'Alberobello', 'Gallipoli', 
    'Polignano a Mare', 'Fasano', 'Martina Franca'
  ];

  const SPECIALTY_SUGGESTIONS = {
    lawyer: ['Real Estate Law', 'Foreign Investment', 'Tax Law', 'Immigration', 'Corporate Law', 'Contract Law'],
    architect: ['Historic Restoration', 'Modern Design', 'Sustainable Architecture', 'Interior Design', 'Urban Planning'],
    accountant: ['International Tax', 'VAT Optimization', 'Grant Applications', 'Business Formation', 'Financial Planning'],
    engineer: ['Structural Analysis', 'Seismic Assessment', 'MEP Engineering', 'Building Permits', 'Project Management'],
    realtor: ['Luxury Properties', 'Commercial Real Estate', 'Property Management', 'Investment Analysis', 'Market Research'],
    contractor: ['Renovation', 'New Construction', 'Historic Restoration', 'Project Management', 'Green Building']
  };

  // Load professionals
  useEffect(() => {
    loadProfessionals();
  }, []);

  const loadProfessionals = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/professionals');
      if (response.ok) {
        const data = await response.json();
        setProfessionals(data);
      }
    } catch (error) {
      console.error('Error loading professionals:', error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingProfessional 
        ? `/api/professionals/${editingProfessional.id}`
        : '/api/professionals';
      
      const method = editingProfessional ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccessMessage(editingProfessional ? 'Professional updated!' : 'Professional added!');
        resetForm();
        loadProfessionals();
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error saving professional:', error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this professional?')) return;

    try {
      const response = await fetch(`/api/professionals/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        loadProfessionals();
        setSuccessMessage('Professional deleted');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error deleting professional:', error);
    }
  };

  const handleEdit = (professional) => {
    setFormData(professional);
    setEditingProfessional(professional);
    setIsAddingNew(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'lawyer',
      email: '',
      phone: '',
      website: '',
      location: '',
      languages: [] as string[],
      specialties: [],
      description: '',
      verified: false,
      response_time: '< 24h'
    });
    setEditingProfessional(null);
    setIsAddingNew(false);
  };

  const toggleLanguage = (lang: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter(l => l !== lang)
        : [...prev.languages, lang]
    }));
  };

  const addSpecialty = (specialty) => {
    if (!formData.specialties.includes(specialty)) {
      setFormData(prev => ({
        ...prev,
        specialties: [...prev.specialties, specialty]
      }));
    }
  };

  const removeSpecialty = (specialty) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.filter(s => s !== specialty)
    }));
  };

  // Filter professionals
  const filteredProfessionals = professionals.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Professional Directory Admin</h1>
          <button
            onClick={() => setIsAddingNew(true)}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 flex items-center gap-2"
          >
            <Plus size={20} />
            Add Professional
          </button>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {successMessage}
          </div>
        )}

        {/* Add/Edit Form */}
        {isAddingNew && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingProfessional ? 'Edit Professional' : 'Add New Professional'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                    placeholder="e.g., Avv. Mario Rossi"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                  >
                    {PROFESSIONAL_TYPES.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                    placeholder="+39 xxx xxx xxxx"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input
                    type="text"
                    value={formData.website}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                    placeholder="www.example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                  >
                    <option value="">Select location</option>
                    {LOCATIONS.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Response Time</label>
                  <select
                    value={formData.response_time}
                    onChange={(e) => setFormData({...formData, response_time: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                  >
                    <option value="< 24h">Less than 24 hours</option>
                    <option value="< 48h">Less than 48 hours</option>
                    <option value="< 72h">Less than 72 hours</option>
                    <option value="< 1 week">Less than 1 week</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="verified"
                    checked={formData.verified}
                    onChange={(e) => setFormData({...formData, verified: e.target.checked})}
                    className="mr-2"
                  />
                  <label htmlFor="verified" className="text-sm font-medium text-gray-700">
                    Verified Professional
                  </label>
                </div>
              </div>

              {/* Languages */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => toggleLanguage(lang.code)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        formData.languages.includes(lang.code)
                          ? 'bg-teal-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specialties */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialties</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.specialties.map(spec => (
                    <span key={spec} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      {spec}
                      <button
                        type="button"
                        onClick={() => removeSpecialty(spec)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Ã—
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {(SPECIALTY_SUGGESTIONS[formData.type] || []).map(spec => (
                    <button
                      key={spec}
                      type="button"
                      onClick={() => addSpecialty(spec)}
                      disabled={formData.specialties.includes(spec)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        formData.specialties.includes(spec)
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      + {spec}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                  placeholder="Brief description of expertise and experience..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 flex items-center gap-2"
                >
                  <Save size={20} />
                  {editingProfessional ? 'Update' : 'Save'} Professional
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search professionals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
          />
        </div>

        {/* Professionals List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Languages</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProfessionals.map((professional) => (
                <tr key={professional.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{professional.name}</div>
                      <div className="text-sm text-gray-500">{professional.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {professional.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {professional.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {professional.languages?.join(', ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {professional.verified ? (
                      <span className="text-green-600 flex items-center gap-1">
                        <CheckCircle size={16} /> Verified
                      </span>
                    ) : (
                      <span className="text-gray-400 flex items-center gap-1">
                        <XCircle size={16} /> Unverified
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(professional)}
                      className="text-teal-600 hover:text-teal-900 mr-4"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(professional.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProfessionals.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No professionals found
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-2xl font-bold text-teal-600">{professionals.length}</p>
            <p className="text-sm text-gray-600">Total Professionals</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-2xl font-bold text-green-600">
              {professionals.filter(p => p.verified).length}
            </p>
            <p className="text-sm text-gray-600">Verified</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-2xl font-bold text-blue-600">
              {[...new Set(professionals.map(p => p.location))].length}
            </p>
            <p className="text-sm text-gray-600">Cities Covered</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-2xl font-bold text-purple-600">
              {[...new Set(professionals.flatMap(p => p.languages || []))].length}
            </p>
            <p className="text-sm text-gray-600">Languages</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalAdmin;

