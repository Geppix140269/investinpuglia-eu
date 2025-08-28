// PATH: app/faq/page.tsx
import { generateMetadata, pageMetadata } from '@/lib/metadata'
import Icon from '@/lib/iconMappings'
import FAQClient from '@/components/FAQClient'

export const metadata = generateMetadata({
  title: pageMetadata.faq.title,
  description: pageMetadata.faq.description,
  keywords: pageMetadata.faq.keywords,
  path: '/faq',
})

export default function FAQPage() {
  return <FAQClient />
}




