import { generateMetadata, pageMetadata } from '@/lib/metadata'

export const metadata = generateMetadata({
  title: pageMetadata.contact.title,
  description: pageMetadata.contact.description,
  keywords: pageMetadata.contact.keywords,
  path: '/contact',
})

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}