import { generateMetadata, pageMetadata } from '@/lib/metadata'

export const metadata = generateMetadata({
  title: pageMetadata.services.title,
  description: pageMetadata.services.description,
  keywords: pageMetadata.services.keywords,
  path: '/services',
})

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}