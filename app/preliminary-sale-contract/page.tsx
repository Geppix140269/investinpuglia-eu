// app/preliminary-sale-contract/page.tsx
"use client";

import { useState } from "react";
import { uploadFileToSupabase } from "@/lib/uploadFileToSupabase";
import { sendContractEmail } from "@/lib/sendContractEmail";
import { generatePdfBlob } from "@/lib/generatePdfBlob";

export default function PreliminaryContractPage() {
  const [form, setForm] = useState({
    sellerName: "",
    sellerBirth: "",
    sellerCF: "",
    sellerAddress: "",
    buyerName: "",
    companyName: "",
    vatNumber: "",
    buyerCF: "",
    buyerAddress: "",
    propertyAddress: "",
    cadastralData: "",
    price: "",
    deposit: "",
    deedDate: "",
    financingDeadline: "",
    court: "Lecce",
    email: "",
    file: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setForm({ ...form, file: e.target.files[0] });
    }
  };

  const handleSubmit = async () => {
    const { file, ...formWithoutFile } = form;

    const pdfBlob = generatePdfBlob(formWithoutFile);
    const fileUrl = await uploadFileToSupabase(pdfBlob, `${form.buyerName}_preliminary_contract.pdf`);

    await sendContractEmail({
      to: form.email,
      subject: "Your Preliminary Sale Contract",
      pdfUrl: fileUrl,
      formData: formWithoutFile,
    });

    alert("Contract generated, uploaded and emailed successfully.");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Preliminary Sale Contract / Contratto Preliminare</h1>
      <div className="grid grid-cols-1 gap-4">
        <input name="sellerName" placeholder="Seller Name / Nome Venditore" onChange={handleChange} className="p-2 border rounded" />
        <input name="sellerBirth" placeholder="Place and DOB / Luogo e data nascita" onChange={handleChange} className="p-2 border rounded" />
        <input name="sellerCF" placeholder="Tax Code / Codice Fiscale" onChange={handleChange} className="p-2 border rounded" />
        <input name="sellerAddress" placeholder="Seller Address / Indirizzo venditore" onChange={handleChange} className="p-2 border rounded" />

        <input name="buyerName" placeholder="Buyer Name / Nome Acquirente" onChange={handleChange} className="p-2 border rounded" />
        <input name="companyName" placeholder="Company (optional) / Azienda (facoltativa)" onChange={handleChange} className="p-2 border rounded" />
        <input name="vatNumber" placeholder="VAT Number / Partita IVA" onChange={handleChange} className="p-2 border rounded" />
        <input name="buyerCF" placeholder="Tax Code / Codice Fiscale Acquirente" onChange={handleChange} className="p-2 border rounded" />
        <input name="buyerAddress" placeholder="Buyer Address / Indirizzo Acquirente" onChange={handleChange} className="p-2 border rounded" />

        <input name="propertyAddress" placeholder="Property Address / Indirizzo Immobile" onChange={handleChange} className="p-2 border rounded" />
        <textarea name="cadastralData" placeholder="Cadastral Data / Dati Catastali" onChange={handleChange} className="p-2 border rounded" />
        <input name="price" type="number" placeholder="Price (€) / Prezzo" onChange={handleChange} className="p-2 border rounded" />
        <input name="deposit" type="number" placeholder="Deposit (€) / Caparra" onChange={handleChange} className="p-2 border rounded" />
        <input name="deedDate" type="date" placeholder="Deed Date / Data Rogito" onChange={handleChange} className="p-2 border rounded" />
        <input name="financingDeadline" type="date" placeholder="Mini PIA Approval Deadline" onChange={handleChange} className="p-2 border rounded" />
        <input name="court" placeholder="Jurisdiction / Foro" onChange={handleChange} defaultValue="Lecce" className="p-2 border rounded" />

        <input name="email" type="email" placeholder="Your Email (to receive contract)" onChange={handleChange} className="p-2 border rounded" />
        <input name="file" type="file" onChange={handleFile} className="p-2 border rounded" />

        <button onClick={handleSubmit} className="bg-blue-700 text-white py-2 rounded">Generate, Upload & Send PDF</button>
      </div>
    </div>
  );
}
