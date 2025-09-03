import { Metadata } from 'next';
import { generatePageMetadata } from '../layout-metadata';
import ConsultationPageClient from './ConsultationPageClient';

export const metadata: Metadata = generatePageMetadata('/consultation');

export default function ConsultationPage() {
  return <ConsultationPageClient />;
}