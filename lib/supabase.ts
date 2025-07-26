// lib/supabase.ts
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.Supabase_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.Supabase_API || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables')
}

// Export the createClient function
export function createClient() {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}

// Export a singleton instance for convenience
export const supabase = createClient()

// Database helper functions
export async function trackCTAClick(
  variant: string,
  location: string,
  metadata?: Record<string, any>
) {
  try {
    const { error } = await supabase
      .from('cta_clicks')
      .insert([{
        variant,
        location,
        metadata,
        user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : null
      }])

    if (error) throw error
  } catch (error) {
    console.error('Error tracking CTA click:', error)
  }
}

export async function trackPageView(
  page_path: string,
  metadata?: Record<string, any>
) {
  try {
    const { error } = await supabase
      .from('page_views')
      .insert([{
        page_path,
        referrer: typeof document !== 'undefined' ? document.referrer : null,
        user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : null,
        metadata
      }])

    if (error) throw error
  } catch (error) {
    console.error('Error tracking page view:', error)
  }
}

/**
 * Uploads a PDF file to the 'contracts' bucket and returns the public URL.
 * @param file - The File object to upload
 * @param buyerName - Used to generate a unique filename
 * @returns Public URL string or null on failure
 */
export async function uploadContractPDF(file: File, buyerName: string): Promise<string | null> {
  const timestamp = Date.now();
  const sanitizedBuyer = buyerName.trim().replace(/\s+/g, '_').replace(/[^\w\-]/g, '');
  const fileName = `contract_${sanitizedBuyer}_${timestamp}.pdf`;

  const { error: uploadError } = await supabase.storage
    .from('contracts')
    .upload(fileName, file, {
      contentType: 'application/pdf',
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    console.error('❌ Upload error:', uploadError.message);
    return null;
  }

  const { data: urlData } = supabase.storage
    .from('contracts')
    .getPublicUrl(fileName);

  return urlData?.publicUrl || null;
}

/**
 * Handles form submission: upload contract, then email with EmailJS
 */
import emailjs from '@emailjs/browser'

export async function handleSubmit(formData: {
  buyer_name: string,
  buyer_email: string,
  buyer_company: string,
  buyer_address: string,
  seller_name: string,
  seller_cf: string,
  property_address: string,
  cadastral_data: string,
  price: string,
  deposit: string,
  deed_date: string,
  financing_deadline: string,
  court: string,
  contract_file: File
}) {
  try {
    const publicUrl = await uploadContractPDF(formData.contract_file, formData.buyer_name)
    if (!publicUrl) throw new Error('Upload failed')

    const templateParams = {
      buyer_name: formData.buyer_name,
      buyer_email: formData.buyer_email,
      buyer_company: formData.buyer_company,
      buyer_address: formData.buyer_address,
      seller_name: formData.seller_name,
      seller_cf: formData.seller_cf,
      property_address: formData.property_address,
      cadastral_data: formData.cadastral_data,
      price: formData.price,
      deposit: formData.deposit,
      deed_date: formData.deed_date,
      financing_deadline: formData.financing_deadline,
      court: formData.court,
      contract_url: publicUrl
    }

    const result = await emailjs.send(
      'service_w6tghqr',
      'template_a47xzn7',
      templateParams,
      'wKn1_xMCtZssdZzpb'
    )

    console.log('✅ Email sent:', result.status, result.text)
    return { success: true }
  } catch (error) {
    console.error('❌ Submission error:', error)
    return { success: false, error: String(error) }
  }
}
