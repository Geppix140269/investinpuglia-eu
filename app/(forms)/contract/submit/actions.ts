'use server'

import { uploadContractPDF } from '@/lib/supabase'
import emailjs from '@emailjs/browser'

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_w6tghqr'
const EMAILJS_TEMPLATE_ID = 'template_a47xzn7'
const EMAILJS_PUBLIC_KEY = 'wKn1_xMCtZssdZzpb'

type FormDataFields = {
  buyer_name: string
  buyer_email: string
  buyer_company: string
  buyer_address: string
  seller_name: string
  seller_cf: string
  property_address: string
  cadastral_data: string
  price: string
  deposit: string
  deed_date: string
  financing_deadline: string
  court: string
  contract_file: File
}

export async function handleSubmit(data: FormDataFields) {
  try {
    const pdfUrl = await uploadContractPDF(data.contract_file, data.buyer_name)
    if (!pdfUrl) throw new Error('PDF upload failed')

    const templateParams = {
      ...data,
      contract_file: pdfUrl
    }

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    )

    return { success: true, response }
  } catch (err: any) {
    console.error('❌ Submission failed:', err.message)
    return { success: false, error: err.message }
  }
}
