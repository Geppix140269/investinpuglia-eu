'use client'

import { useState } from 'react'
import { handleSubmit } from './actions'

export default function ContractSubmitPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setError(null)

    const formData = new FormData(e.currentTarget)
    const contract_file = formData.get('contract_file') as File

    const data = {
      buyer_name: formData.get('buyer_name') as string,
      buyer_email: formData.get('buyer_email') as string,
      buyer_company: formData.get('buyer_company') as string,
      buyer_address: formData.get('buyer_address') as string,
      seller_name: formData.get('seller_name') as string,
      seller_cf: formData.get('seller_cf') as string,
      property_address: formData.get('property_address') as string,
      cadastral_data: formData.get('cadastral_data') as string,
      price: formData.get('price') as string,
      deposit: formData.get('deposit') as string,
      deed_date: formData.get('deed_date') as string,
      financing_deadline: formData.get('financing_deadline') as string,
      court: formData.get('court') as string,
      contract_file,
    }

    const result = await handleSubmit(data)

    if (result.success) {
      setStatus('success')
    } else {
      setStatus('error')
      setError(result.error || 'Unknown error')
    }
  }

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold mb-6">Submit Preliminary Contract</h1>
      <form onSubmit={onSubmit} className="space-y-4" encType="multipart/form-data">
        <input name="buyer_name" placeholder="Buyer Name" required className="w-full border px-3 py-2 rounded" />
        <input name="buyer_email" placeholder="Buyer Email" required className="w-full border px-3 py-2 rounded" />
        <input name="buyer_company" placeholder="Buyer Company" className="w-full border px-3 py-2 rounded" />
        <input name="buyer_address" placeholder="Buyer Address" required className="w-full border px-3 py-2 rounded" />
        <input name="seller_name" placeholder="Seller Name" required className="w-full border px-3 py-2 rounded" />
        <input name="seller_cf" placeholder="Seller CF" className="w-full border px-3 py-2 rounded" />
        <input name="property_address" placeholder="Property Address" required className="w-full border px-3 py-2 rounded" />
        <input name="cadastral_data" placeholder="Cadastral Data" className="w-full border px-3 py-2 rounded" />
        <input name="price" placeholder="Price" required className="w-full border px-3 py-2 rounded" />
        <input name="deposit" placeholder="Deposit" required className="w-full border px-3 py-2 rounded" />
        <input name="deed_date" placeholder="Deed Date" className="w-full border px-3 py-2 rounded" />
        <input name="financing_deadline" placeholder="Financing Deadline" className="w-full border px-3 py-2 rounded" />
        <input name="court" placeholder="Court Jurisdiction" className="w-full border px-3 py-2 rounded" />
        <input name="contract_file" type="file" accept="application/pdf" required className="w-full" />

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          {status === 'submitting' ? 'Submitting...' : 'Submit'}
        </button>

        {status === 'success' && <p className="text-green-600 mt-4">✅ Contract submitted successfully.</p>}
        {status === 'error' && <p className="text-red-600 mt-4">❌ Error: {error}</p>}
      </form>
    </div>
  )
}
