'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link 
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Consultation Services</h2>
            <p className="text-gray-700 mb-4">
              By booking a consultation with InvestInPuglia, you agree to the following terms:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Consultations are provided by Giuseppe Funaro and the InvestInPuglia team</li>
              <li>30-minute consultations cost €60</li>
              <li>60-minute consultations cost €100</li>
              <li>Payment is required in advance through our secure Stripe payment system</li>
              <li>Consultations are scheduled via Calendly after payment confirmation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Grant Advisory Disclaimer</h2>
            <p className="text-gray-700 mb-4">
              Our consultation services provide guidance on Mini PIA and other EU grant opportunities. Please note:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>We provide advisory services only - grant approval is at the discretion of the relevant authorities</li>
              <li>Past success rates do not guarantee future results</li>
              <li>Mini PIA grants are subject to availability and end in 2027</li>
              <li>Grant eligibility depends on meeting specific criteria set by the Italian government</li>
              <li>We cannot guarantee grant approval or specific funding amounts</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Cancellation and Refund Policy</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Cancellations must be made at least 24 hours before the scheduled consultation</li>
              <li>Cancellations made with 24+ hours notice receive a full refund</li>
              <li>Cancellations made with less than 24 hours notice are non-refundable</li>
              <li>No-shows forfeit the consultation fee</li>
              <li>We reserve the right to reschedule consultations with 24 hours notice</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Confidentiality</h2>
            <p className="text-gray-700">
              All information shared during consultations is treated as confidential. We will not share your 
              investment plans, financial information, or business strategies with third parties without your 
              explicit written consent, except as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Limitation of Liability</h2>
            <p className="text-gray-700">
              InvestInPuglia provides advisory services based on our expertise and experience. We are not liable 
              for investment losses, grant application rejections, or business outcomes. All investment decisions 
              are made at your own risk. Our maximum liability is limited to the consultation fee paid.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Intellectual Property</h2>
            <p className="text-gray-700">
              All materials, strategies, and methodologies shared during consultations remain the intellectual 
              property of InvestInPuglia. You may use this information for your personal investment activities 
              but may not resell or redistribute our proprietary information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Protection</h2>
            <p className="text-gray-700 mb-4">
              We comply with GDPR and Italian data protection laws. Your personal data is processed in accordance 
              with our <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Governing Law</h2>
            <p className="text-gray-700">
              These terms are governed by Italian law. Any disputes will be resolved through the courts of Puglia, Italy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Information</h2>
            <p className="text-gray-700">
              For questions about these terms, please contact:<br />
              Email: invest@investinpuglia.eu<br />
              Address: Puglia, Italy
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Updates to Terms</h2>
            <p className="text-gray-700">
              We reserve the right to update these terms at any time. The latest version will always be available 
              at https://investinpuglia.eu/terms. Continued use of our services after updates constitutes acceptance 
              of the new terms.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Last updated: {new Date().toLocaleDateString()}<br />
              © 2024 InvestInPuglia. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}