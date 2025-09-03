'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Globe, 
  Users, 
  Award,
  TrendingUp,
  Shield,
  Briefcase,
  ArrowRight,
  Check,
  Star,
  Building,
  HandshakeIcon,
  Network
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function JoinNetwork() {
  const [formData, setFormData] = useState({
    name: '',
    profession: '',
    email: '',
    phone: '',
    company: '',
    expertise: '',
    languages: '',
    experience: '',
    message: ''
  });

  const benefits = [
    {
      icon: Globe,
      title: 'International Client Access',
      description: 'Connect with high-net-worth foreign investors seeking Italian property investments',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: HandshakeIcon,
      title: 'Referral Partnerships',
      description: 'Earn competitive commissions through our transparent referral program',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: Network,
      title: 'Knowledge Exchange',
      description: 'Share expertise and learn from seasoned professionals in the Italian investment market',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Award,
      title: 'Quality Standards',
      description: 'Join an exclusive network maintaining the highest professional standards',
      color: 'from-amber-500 to-orange-600'
    }
  ];

  const professions = [
    'Real Estate Agent',
    'Property Developer',
    'Architect/Engineer',
    'Legal Professional',
    'Financial Advisor',
    'Tax Consultant',
    'Construction Company',
    'Property Manager',
    'Marketing Agency',
    'Other Professional Service'
  ];

  const criteria = [
    'Minimum 5 years professional experience in your field',
    'Proven track record with international clients',
    'Fluent in English plus at least one other language',
    'Strong understanding of foreign investment dynamics',
    'Commitment to ethical business practices',
    'Active professional licenses and certifications',
    'Willingness to collaborate and share knowledge',
    'Focus on high-quality, premium services'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/join-network', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert('Application submitted successfully! We will review and contact you within 48 hours.');
        setFormData({
          name: '',
          profession: '',
          email: '',
          phone: '',
          company: '',
          expertise: '',
          languages: '',
          experience: '',
          message: ''
        });
      }
    } catch (error) {
      alert('Error submitting application. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="font-medium">Exclusive Professional Network</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Join Our Elite Network
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8">
              Connect with international investors. Share knowledge. Grow together.
            </p>
            
            <p className="text-lg text-gray-200 max-w-3xl mx-auto">
              We're building a network of Puglia's finest professionals - internationally minded, 
              excellence-driven experts who understand the unique needs of foreign investors 
              seeking Italian property investments.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Join Our Network?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Collaborate with the best. Serve international clients. Build lasting partnerships.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${benefit.color} text-white mb-4`}>
                  <benefit.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Criteria Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Network Membership Criteria</h2>
              <p className="text-xl text-gray-600">
                We maintain high standards to ensure quality service for international investors
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-4">
                {criteria.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                <Star className="inline-block h-5 w-5 text-yellow-500 mr-2" />
                <strong>Special consideration given to:</strong> Professionals with existing international 
                client base, multilingual capabilities, and proven success with foreign investors
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Apply to Join</h2>
              <p className="text-xl text-gray-600">
                Tell us about your expertise and how you can contribute to our network
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Profession *
                  </label>
                  <select
                    required
                    value={formData.profession}
                    onChange={(e) => setFormData({...formData, profession: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select your profession</option>
                    {professions.map(prof => (
                      <option key={prof} value={prof}>{prof}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Company/Organization
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Languages Spoken *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., English, Italian, German"
                  value={formData.languages}
                  onChange={(e) => setFormData({...formData, languages: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Years of Experience *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Years in your profession"
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Areas of Expertise *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe your key areas of expertise and experience with international clients"
                  value={formData.expertise}
                  onChange={(e) => setFormData({...formData, expertise: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              <div className="mb-8">
                <label className="block text-gray-700 font-semibold mb-2">
                  Why Join Our Network?
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us how you can contribute to our network and why you want to work with international investors"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-8 rounded-lg font-bold text-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
              >
                Submit Application
                <ArrowRight className="inline-block ml-2 h-5 w-5" />
              </button>
            </form>
            
            <div className="mt-8 text-center text-gray-600">
              <p>
                Applications are reviewed within 48 hours. Selected professionals will be 
                invited for a video interview to discuss partnership opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Build Your International Practice
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Join a network where excellence meets opportunity. Together, we're creating 
            the premier platform for international property investment in Puglia.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#apply"
              className="inline-block bg-white text-indigo-900 py-4 px-8 rounded-lg font-semibold hover:shadow-2xl transition-all text-lg"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('.bg-gray-50')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Apply Now
            </a>
            <Link
              href="/contact"
              className="inline-block bg-indigo-800 text-white py-4 px-8 rounded-lg font-semibold hover:bg-indigo-700 transition-all text-lg"
            >
              Contact Us for Details
            </Link>
          </div>
          
          <p className="mt-8 text-indigo-200">
            Questions? Call us: +39 351 400 1402
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}