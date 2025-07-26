// components/ContractSubmitForm.tsx
'use client';

import { useState } from 'react';
import { generatePdfBlob } from '@/lib/generatePdfBlob';
import { uploadFileToSupabase } from '@/lib/uploadFileToSupabase';
import { sendContractWithEmailJS } from '@/lib/sendContractWithEmailJS';

export default function ContractSubmitForm() {
  const [form, setForm] = useState({
    sellerName: '',
    sellerBirth: '',
    sellerCF: '',
    sellerAddress: '',
    buyerName: '',
    companyName: '',
    vatNumber: '',
    buyerCF: '',
    buyerAddress: '',
    propertyAddress: '',
    cadastralData: '',
    price: '',
    deposit: '',
    deedDate: '',
    financingDeadline: '',
    court: 'Lecce',
    email: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setStatus('Generating PDF...');
      const pdfBlob = generatePdfBlob(form);

      setStatus('Uploading file to Supabase...');
      const fileUrl = await uploadFileToSupabase(pdfBlob, `${form.buyerName}_contract.pdf`);

      setStatus('Sending email...');
      await sendContractWithEmailJS({
        to: form.email,
        subject: 'Preliminary Sale Contract',
        pdfUrl: fileUrl,
        formData: form,
      });

      setStatus('✅ Contract sent successfully!');
    } catch (err: any) {
      setStatus('❌ Failed: ' + err.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Preliminary Sale Contract</h1>
      <div className="grid grid-cols-1 gap-4">
        <input name="sellerName" placeholder="Seller Name" onChange={handleChange} className="p-2 border rounded" />
        <input name="sellerBirth" placeholder="Seller Birth" onChange={handleChange} className="p-2 border rounded" />
        <input name="sellerCF" placeholder="Seller CF" onChange={handleChange} className="p-2 border rounded" />
        <input name="sellerAddress" placeholder="Seller Address" onChange={handleChange} className="p-2 border rounded" />
        <input name="buyerName" placeholder="Buyer Name" onChange={handleChange} className="p-2 border rounded" />
        <input name="companyName" placeholder="Company Name" onChange={handleChange} className="p-2 border rounded" />
        <input name="vatNumber" placeholder="VAT Number" onChange={handleChange} className="p-2 border rounded" />
        <input name="buyerCF" placeholder="Buyer CF" onChange={handleChange} className="p-2 border rounded" />
        <input name="buyerAddress" placeholder="Buyer Address" onChange={handleChange} className="p-2 border rounded" />
        <input name="propertyAddress" placeholder="Property Address" onChange={handleChange} className="p-2 border rounded" />
        <textarea name="cadastralData" placeholder="Cadastral Data" onChange={handleChange} className="p-2 border rounded" />
        <input name="price" placeholder="Price (€)" type="number" onChange={handleChange} className="p-2 border rounded" />
        <input name="deposit" placeholder="Deposit (€)" type="number" onChange={handleChange} className="p-2 border rounded" />
        <input name="deedDate" placeholder="Deed Date" type="date" onChange={handleChange} className="p-2 border rounded" />
        <input name="financingDeadline" placeholder="Financing Deadline" type="date" onChange={handleChange} className="p-2 border rounded" />
        <input name="court" placeholder="Court" defaultValue="Lecce" onChange={handleChange} className="p-2 border rounded" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="p-2 border rounded" />
        <button onClick={handleSubmit} className="bg-blue-700 text-white py-2 rounded">
          Submit Contract
        </button>
        {status && <div className="text-sm mt-2">{status}</div>}
      </div>
    </div>
  );
}
