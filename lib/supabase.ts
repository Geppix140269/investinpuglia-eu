// PATH: lib/supabase.ts
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

export const supabase = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  }
)

// Export createClient for backward compatibility
export const createClient = () => supabase

// Add the missing uploadContractPDF function
export async function uploadContractPDF(file: File, fileName: string) {
  const { data, error } = await supabase.storage
    .from('contracts')
    .upload(fileName, file)
  
  if (error) throw error
  return data
}
