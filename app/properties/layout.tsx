import { generateMetadata, pageMetadata } from '@/lib/metadata'

export const metadata = generateMetadata({
  title: pageMetadata.properties.title,
  description: pageMetadata.properties.description,
  keywords: pageMetadata.properties.keywords,
  path: '/properties',
})

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}