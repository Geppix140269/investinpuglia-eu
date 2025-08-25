// PATH: app/admin/agreements/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, FileText, Clock, CheckCircle, XCircle, ExternalLink, Eye } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

interface Agreement {
  id: string;
  agreementId: string;
  clientName: string;
  clientEmail: string;
  clientCompany?: string;
  projectDescription: string;
  totalInvestment: string;
  status: 'draft' | 'pending_signature' | 'signed' | 'expired';
  created_at: any;
  sent_at?: string;
  clientSignedAt?: string;
  pdfUrl?: string;
  token?: string;
}

export default function AgreementsPage() {
  const router = useRouter();
  const [agreements, setAgreements] = useState<Agreement[]>([]);
  const [drafts, setDrafts] = useState<Agreement[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'signed' | 'drafts'>('all');

  useEffect(() => {
    fetchAgreements();
  }, []);

  const fetchAgreements = async () => {
    try {
      // Fetch agreements
      const agreementsQuery = query(
        collection(db, 'agreements'),
        orderBy('created_at', 'desc')
      );
      const agreementsSnapshot = await getDocs(agreementsQuery);
      const agreementsData = agreementsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Agreement[];
      
      // Fetch drafts
      const draftsQuery = query(
        collection(db, 'agreement_drafts'),
        orderBy('created_at', 'desc')
      );
      const draftsSnapshot = await getDocs(draftsQuery);
      const draftsData = draftsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        status: 'draft' as const
      })) as Agreement[];
      
      setAgreements(agreementsData);
      setDrafts(draftsData);
    } catch (error) {
      console.error('Error fetching agreements:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            <Clock className="w-3 h-3" />
            Draft
          </span>
        );
      case 'pending_signature':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
            <Clock className="w-3 h-3" />
            Pending Signature
          </span>
        );
      case 'signed':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
            <CheckCircle className="w-3 h-3" />
            Signed
          </span>
        );
      case 'expired':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-sm">
            <XCircle className="w-3 h-3" />
            Expired
          </span>
        );
      default:
        return null;
    }
  };

  const getFilteredData = () => {
    switch (filter) {
      case 'drafts':
        return drafts;
      case 'pending':
        return agreements.filter(a => a.status === 'pending_signature');
      case 'signed':
        return agreements.filter(a => a.status === 'signed');
      default:
        return [...drafts, ...agreements];
    }
  };

  const filteredData = getFilteredData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading agreements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Agreement Management</h1>
              <p className="text-gray-600 mt-2">Manage project management agreements and contracts</p>
            </div>
            <button
              onClick={() => router.push('/admin/agreements/create')}
              className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Agreement
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{drafts.length}</div>
              <div className="text-sm text-gray-600">Drafts</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-700">
                {agreements.filter(a => a.status === 'pending_signature').length}
              </div>
              <div className="text-sm text-gray-600">Pending Signature</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-700">
                {agreements.filter(a => a.status === 'signed').length}
              </div>
              <div className="text-sm text-gray-600">Signed</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-700">
                {agreements.length + drafts.length}
              </div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex gap-2">
            {(['all', 'drafts', 'pending', 'signed'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  filter === tab
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Agreements List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Agreement ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Investment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      No agreements found
                    </td>
                  </tr>
                ) : (
                  filteredData.map((agreement) => (
                    <tr key={agreement.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {agreement.agreementId || agreement.id.slice(0, 8)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{agreement.clientName}</div>
                        <div className="text-sm text-gray-500">{agreement.clientEmail}</div>
                        {agreement.clientCompany && (
                          <div className="text-sm text-gray-500">{agreement.clientCompany}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {agreement.projectDescription}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          €{parseInt(agreement.totalInvestment).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(agreement.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {agreement.created_at ? 
                            (agreement.created_at.seconds ? 
                              new Date(agreement.created_at.seconds * 1000).toLocaleDateString() : 
                              new Date(agreement.created_at).toLocaleDateString()
                            ) : 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {agreement.pdfUrl && (
                            <a
                              href={agreement.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-teal-600 hover:text-teal-700"
                              title="View PDF"
                            >
                              <Eye className="w-4 h-4" />
                            </a>
                          )}
                          {agreement.token && (
                            <a
                              href={`/agreement/firebase/${agreement.token}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700"
                              title="View Agreement Page"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}