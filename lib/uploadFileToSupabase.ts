// lib/uploadFileToSupabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function uploadFileToSupabase(file: Blob, filename: string): Promise<string> {
  const { data, error } = await supabase.storage
    .from("contracts")
    .upload(`contracts/${Date.now()}_${filename}`, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: "application/pdf",
    });

  if (error) throw error;

  const { data: publicUrl } = supabase.storage
    .from("contracts")
    .getPublicUrl(data.path);

  return publicUrl.publicUrl;
}
