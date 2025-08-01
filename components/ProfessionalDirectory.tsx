'use client';

import React, { useState, useEffect } from 'react';
import { Search, MapPin, Globe, Clock, Star, Phone, Mail, ExternalLink, X } from 'lucide-react';

interface Professional {
  id: string;
  name: string;
  type: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  languages: string[];
  specialties: string[];
  description: string;
  rating: number;
  review_count: number;
  verified: boolean;
  response_time: string;
}

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ProfessionalDirectory() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState<Professional[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const professionalTypeLabels: Record<string, string> = {
    lawyer: 'Lawyer',
    architect: 'Architect',
    accountant: 'Accountant',
    notary: 'Notary',
    real_estate_agent: 'Real Estate Agent',
    contractor: 'Contractor',
    surveyor: 'Surveyor',
    engineer: 'Engineer'
  };

  useEffect(() => {
    fetchProfessionals();
  }, []);

  useEffect(() => {
    filterProfessionals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedType, selectedLanguage, professionals]);

  const fetchProfessionals = async () => {
    try {
      const response = await fetch('/api/professionals');
      if (response.ok) {
        const data = await response.json();
        setProfessionals(data);
        setFilteredProfessionals(data);
      }
    } catch (error) {
      console.error('Error fetching professionals:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProfessionals = () => {
    let filtered = [...professionals];

    if (searchTerm) {
      filtered = filtered.filter(prof =>
        prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prof.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prof.specialties.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(prof => prof.type === selectedType);
    }

    if (selectedLanguage !== 'all') {
      filtered = filtered.filter(prof => prof.languages.includes(selectedLanguage));
    }

    setFilteredProfessionals(filtered);
  };

  const handleViewProfile = async (professional: Professional) => {
    setSelectedProfessional(professional);
    
    try {
      await fetch('/api/professional-interaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          professional_id: professional.id,
          interaction_type: 'view'
        })
      });
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  };

  const handleContact = () => {
    setShowContactModal(true);
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedProfessional) return;

    setSending(true);
    try {
      await fetch('/api/professional-interaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          professional_id: selectedProfessional.id,
          interaction_type: 'contact'
        })
      });

      await fetch('/api/contact-professional', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          professional: selectedProfessional,
          ...contactForm
        })
      });

      setContactForm({ name: '', email: '', phone: '', message: '' });
      setShowContactModal(false);
      alert('Message sent successfully! The professional will contact you soon.');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const allLanguages = Array.from(new Set(professionals.flatMap(p => p.languages))).sort();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
          Find Trusted Professionals in Puglia
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, location, or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Professionals</option>
              {Object.entries(professionalTypeLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>

            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Languages</option>
              {allLanguages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </div>

        <p className="text-gray-600 mb-4">
          Found {filteredProfessionals.length} professionals
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfessionals.map((professional) => (
            <div key={professional.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{professional.name}</h3>
                    <span className="inline-block px-3 py-1 text-sm bg-teal-100 text-teal-800 rounded-full mt-1">
                      {professionalTypeLabels[professional.type] || professional.type}
                    </span>
                  </div>
                  {professional.verified && (
                    <div className="bg-green-100 p-2 rounded-full">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin size={16} className="mr-2" />
                    {professional.location}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Globe size={16} className="mr-2" />
                    {professional.languages.join(', ')}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock size={16} className="mr-2" />
                    Response time: {professional.response_time}
                  </div>
                  {professional.rating > 0 && (
                    <div className="flex items-center text-gray-600 text-sm">
                      <Star size={16} className="mr-2 text-yellow-400" />
                      {professional.rating} ({professional.review_count} reviews)
                    </div>
                  )}
                </div>

                {professional.specialties.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Specialties:</p>
                    <div className="flex flex-wrap gap-1">
                      {professional.specialties.slice(0, 3).map((specialty, i) => (
                        <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {specialty}
                        </span>
                      ))}
                      {professional.specialties.length > 3 && (
                        <span className="text-xs text-gray-500">+{professional.specialties.length - 3} more</span>
                      )}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => handleViewProfile(professional)}
                  className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProfessionals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No professionals found matching your criteria.</p>
            <p className="text-gray-400 mt-2">Try adjusting your filters or search term.</p>
          </div>
        )}

        {selectedProfessional && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedProfessional.name}</h2>
                    <span className="inline-block px-3 py-1 text-sm bg-teal-100 text-teal-800 rounded-full mt-1">
                      {professionalTypeLabels[selectedProfessional.type] || selectedProfessional.type}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedProfessional(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <p className="text-gray-700">{selectedProfessional.description}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin size={18} className="mr-2" />
                      {selectedProfessional.location}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock size={18} className="mr-2" />
                      Response: {selectedProfessional.response_time}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Globe size={18} className="mr-2" />
                      {selectedProfessional.languages.join(', ')}
                    </div>
                    {selectedProfessional.rating > 0 && (
                      <div className="flex items-center text-gray-600">
                        <Star size={18} className="mr-2 text-yellow-400" />
                        {selectedProfessional.rating} ({selectedProfessional.review_count} reviews)
                      </div>
                    )}
                  </div>

                  {selectedProfessional.specialties.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Specialties</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProfessional.specialties.map((specialty, i) => (
                          <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4 pt-4">
                    {selectedProfessional.phone && (
                      <a
                        href={`tel:${selectedProfessional.phone}`}
                        className="flex items-center gap-2 text-teal-600 hover:text-teal-700"
                      >
                        <Phone size={18} />
                        {selectedProfessional.phone}
                      </a>
                    )}
                    {selectedProfessional.email && (
                      <a
                        href={`mailto:${selectedProfessional.email}`}
                        className="flex items-center gap-2 text-teal-600 hover:text-teal-700"
                      >
                        <Mail size={18} />
                        Email
                      </a>
                    )}
                    {selectedProfessional.website && (
                      <a
                        href={selectedProfessional.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-teal-600 hover:text-teal-700"
                      >
                        <ExternalLink size={18} />
                        Website
                      </a>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleContact}
                  className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Contact This Professional
                </button>
              </div>
            </div>
          </div>
        )}

        {showContactModal && selectedProfessional && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Contact {selectedProfessional.name}</h3>
                  <button
                    onClick={() => setShowContactModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSendMessage}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={contactForm.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                      <input
                        type="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Phone (optional)</label>
                      <input
                        type="tel"
                        name="phone"
                        value={contactForm.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea
                        name="message"
                        value={contactForm.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Describe your project or inquiry..."
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <button
                      type="submit"
                      disabled={sending}
                      className="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 disabled:opacity-50"
                    >
                      {sending ? 'Sending...' : 'Send Message'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowContactModal(false)}
                      className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
