// app/about/metadata.ts
import { generatePageMetadata } from '@/lib/metadata-utils';

export async function generateMetadata() {
  return await generatePageMetadata('/about');
}