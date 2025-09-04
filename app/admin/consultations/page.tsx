'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Calendar, Mail, Phone, Euro, Clock, MapPin, FileText, CheckCircle, XCircle, Trash2, Download } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

interface ConsultationSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  budget: string;
  timeline: string;
  propertyType: string;
  location: string;
  businessPlan?: string;
  grantExperience?: string;
  questionsForUs?: string;
  source: string;
  campaign: string;
  status: 'new' | 'contacted' | 'scheduled' | 'completed' | 'nurture';
  qualified: boolean;
  createdAt: string;
  notes?: string;
}

export default function ConsultationsAdmin() {
  const [submissions, setSubmissions] = useState<ConsultationSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'qualified' | 'nurture'>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<ConsultationSubmission | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const q = query(collection(db, 'consultation_submissions'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as ConsultationSubmission));
      setSubmissions(data);
    } catch (error) {
      console.error('Error fetching consultations:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'consultation_submissions', id), {
        status: newStatus,
        updatedAt: new Date().toISOString()
      });
      await fetchSubmissions();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteSubmission = async (id: string) => {
    if (confirm('Are you sure you want to delete this submission?')) {
      try {
        await deleteDoc(doc(db, 'consultation_submissions', id));
        await fetchSubmissions();
      } catch (error) {
        console.error('Error deleting submission:', error);
      }
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Budget', 'Timeline', 'Property Type', 'Location', 'Qualified', 'Status', 'Date'];
    const rows = filteredSubmissions.map(s => [
      s.name,
      s.email,
      s.phone || '',
      s.budget,
      s.timeline,
      s.propertyType,
      s.location,
      s.qualified ? 'Yes' : 'No',
      s.status,
      format(new Date(s.createdAt), 'yyyy-MM-dd HH:mm')
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `consultations_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  const filteredSubmissions = submissions.filter(s => {
    if (filter === 'all') return true;
    if (filter === 'qualified') return s.qualified;
    if (filter === 'nurture') return !s.qualified;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'nurture': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="text-center">Loading consultations...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Consultation Submissions</h1>
            <Link href="/admin/dashboard" className="text-blue-600 hover:underline">
              Back to Dashboard
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{submissions.length}</div>
              <div className="text-sm text-gray-600">Total Submissions</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {submissions.filter(s => s.qualified).length}
              </div>
              <div className="text-sm text-gray-600">Qualified Leads</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {submissions.filter(s => s.status === 'new').length}
              </div>
              <div className="text-sm text-gray-600">New (Uncontacted)</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {submissions.filter(s => s.status === 'scheduled').length}
              </div>
              <div className="text-sm text-gray-600">Scheduled</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              All ({submissions.length})
            </button>
            <button
              onClick={() => setFilter('qualified')}
              className={`px-4 py-2 rounded ${filter === 'qualified' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
            >
              Qualified ({submissions.filter(s => s.qualified).length})
            </button>
            <button
              onClick={() => setFilter('nurture')}
              className={`px-4 py-2 rounded ${filter === 'nurture' ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`}
            >
              Nurture ({submissions.filter(s => !s.qualified).length})
            </button>
            <button
              onClick={exportToCSV}
              className="ml-auto px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Contact</th>
                  <th className="text-left p-4">Budget</th>
                  <th className="text-left p-4">Timeline</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions.map((submission) => (
                  <tr key={submission.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      {format(new Date(submission.createdAt), 'MMM dd, HH:mm')}
                    </td>
                    <td className="p-4">
                      <div className="font-semibold">{submission.name}</div>
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        {submission.qualified ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-yellow-500" />
                        )}
                        {submission.qualified ? 'Qualified' : 'Nurture'}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <a href={`mailto:${submission.email}`} className="text-blue-600 hover:underline">
                          {submission.email}
                        </a>
                      </div>
                      {submission.phone && (
                        <div className="text-sm">
                          <a href={`tel:${submission.phone}`} className="text-blue-600 hover:underline">
                            {submission.phone}
                          </a>
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-medium">{submission.budget}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">{submission.timeline}</div>
                    </td>
                    <td className="p-4">
                      <select
                        value={submission.status}
                        onChange={(e) => updateStatus(submission.id, e.target.value)}
                        className={`px-2 py-1 rounded text-sm ${getStatusColor(submission.status)}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="completed">Completed</option>
                        <option value="nurture">Nurture</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedSubmission(submission)}
                          className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                          title="View details"
                        >
                          <FileText className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteSubmission(submission.id)}
                          className="text-red-600 hover:bg-red-50 p-1 rounded"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Modal */}
        {selectedSubmission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold">Consultation Details</h2>
                  <button
                    onClick={() => setSelectedSubmission(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-600 mb-2">Contact Information</h3>
                    <div className="space-y-2">
                      <div><strong>Name:</strong> {selectedSubmission.name}</div>
                      <div><strong>Email:</strong> {selectedSubmission.email}</div>
                      <div><strong>Phone:</strong> {selectedSubmission.phone || 'Not provided'}</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-600 mb-2">Investment Details</h3>
                    <div className="space-y-2">
                      <div><strong>Budget:</strong> {selectedSubmission.budget}</div>
                      <div><strong>Timeline:</strong> {selectedSubmission.timeline}</div>
                      <div><strong>Property Type:</strong> {selectedSubmission.propertyType}</div>
                      <div><strong>Location:</strong> {selectedSubmission.location}</div>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <h3 className="font-semibold text-gray-600 mb-2">Business Plan</h3>
                    <div className="bg-gray-50 p-3 rounded">
                      {selectedSubmission.businessPlan || 'Not provided'}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <h3 className="font-semibold text-gray-600 mb-2">Grant Experience</h3>
                    <div className="bg-gray-50 p-3 rounded">
                      {selectedSubmission.grantExperience || 'No previous experience'}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <h3 className="font-semibold text-gray-600 mb-2">Questions</h3>
                    <div className="bg-gray-50 p-3 rounded">
                      {selectedSubmission.questionsForUs || 'No specific questions'}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <h3 className="font-semibold text-gray-600 mb-2">Tracking</h3>
                    <div className="space-y-1 text-sm">
                      <div><strong>Source:</strong> {selectedSubmission.source}</div>
                      <div><strong>Campaign:</strong> {selectedSubmission.campaign}</div>
                      <div><strong>Submitted:</strong> {format(new Date(selectedSubmission.createdAt), 'PPpp')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}