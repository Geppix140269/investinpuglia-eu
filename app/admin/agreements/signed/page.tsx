'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'

export default function SignedAgreementsPage() {
  const [agreements, setAgreements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, pending_payment, paid

  useEffect(() => {
    fetchAgreements()
  }, [filter])

  const fetchAgreements = async () => {
    try {
      let q = query(collection(db, 'agreements'), orderBy('createdAt', 'desc'))
      
      if (filter !== 'all') {
        q = query(collection(db, 'agreements'), 
          where('status', '==', filter),
          orderBy('createdAt', 'desc')
        )
      }

      const querySnapshot = await getDocs(q)
      const agreementsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      setAgreements(agreementsData)
    } catch (error) {
      console.error('Error fetching agreements:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A'
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading agreements...</div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Signed Agreements</h1>
      
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          All ({agreements.length})
        </button>
        <button
          onClick={() => setFilter('pending_payment')}
          className={`px-4 py-2 rounded ${filter === 'pending_payment' ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`}
        >
          Pending Payment
        </button>
        <button
          onClick={() => setFilter('paid')}
          className={`px-4 py-2 rounded ${filter === 'paid' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
        >
          Paid
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Property</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {agreements.map((agreement) => (
              <tr key={agreement.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{formatDate(agreement.createdAt)}</td>
                <td className="px-4 py-3 text-sm font-medium">{agreement.clientName}</td>
                <td className="px-4 py-3 text-sm">{agreement.clientEmail}</td>
                <td className="px-4 py-3 text-sm">{agreement.clientCountry}</td>
                <td className="px-4 py-3 text-sm">
                  {agreement.propertyType} - {agreement.propertyLocation || 'TBD'}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded text-xs ${
                    agreement.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {agreement.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-medium">€{agreement.amountDue}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {agreements.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No agreements found
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Quick Stats</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Total Agreements:</span>
            <span className="ml-2 font-bold">{agreements.length}</span>
          </div>
          <div>
            <span className="text-gray-600">Pending Payment:</span>
            <span className="ml-2 font-bold text-yellow-600">
              {agreements.filter(a => a.status === 'pending_payment').length}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Total Value:</span>
            <span className="ml-2 font-bold text-green-600">
              €{agreements.reduce((sum, a) => sum + (a.amountDue || 0), 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}