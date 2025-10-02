'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ProjectOversightPage() {
  return (
    <>
      <Navbar />

      <section className="relative bg-gradient-to-br from-indigo-900 to-purple-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-yellow-400 text-slate-900 px-4 py-2 rounded-full font-bold mb-6">
              TIER 3 - Construction Phase
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Project Oversight & Management
            </h1>

            <p className="text-2xl text-indigo-200 mb-4">
              €3,000/month | 12-24 Months
            </p>

            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Your boots on the ground during construction. Weekly reports, contractor oversight, quality control. €3K/month to protect your €1M investment.
            </p>

            <Link href="/contact" className="inline-block bg-yellow-400 text-slate-900 py-4 px-8 rounded-lg font-bold hover:bg-yellow-300 transition-all text-lg">
              Start Project Oversight <ArrowRight className="inline-block ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">What You Get</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-indigo-50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Weekly Deliverables</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" /><span>Site visit report with photos and videos</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" /><span>Contractor performance assessment</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" /><span>Progress vs. timeline tracking</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" /><span>Issues identified and resolution plan</span></li>
                </ul>
              </div>

              <div className="bg-purple-50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Monthly Deliverables</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" /><span>Comprehensive progress report (% completion per phase)</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" /><span>Financial statement (spent vs. budget, variance analysis)</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" /><span>Upcoming milestones and decisions required</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" /><span>Risk register with mitigation strategies</span></li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">Ongoing Services Throughout Project</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <p className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" /><span>Contractor oversight and accountability</span></p>
                <p className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" /><span>Quality control checkpoints at every phase</span></p>
                <p className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" /><span>Timeline enforcement (keeping project on schedule)</span></p>
                <p className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" /><span>Problem resolution (disputes, delays, surprises)</span></p>
                <p className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" /><span>Grant compliance verification</span></p>
                <p className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" /><span>Final grant reconciliation and drawdown</span></p>
              </div>
            </div>

            <div className="mt-12 bg-yellow-50 border-l-4 border-yellow-500 p-6">
              <h3 className="text-xl font-bold mb-4">What You Save (over 24 months):</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 24 monthly trips to Italy: <strong>€48K</strong></li>
                <li>• Contractor overcharges/poor work: <strong>€50K-€150K</strong></li>
                <li>• Project delays: <strong>€30K-€100K</strong></li>
                <li>• Quality issues caught late: <strong>€40K-€120K</strong></li>
                <li>• Grant compliance problems: <strong>€100K-€500K</strong></li>
                <li className="pt-2 border-t-2 border-yellow-500 font-bold">Your Investment: <strong>€72K over 24 months</strong></li>
                <li className="font-bold text-indigo-600">Total Savings: <strong>€268K-€918K</strong></li>
                <li className="font-bold text-green-600">ROI: <strong>3.7X-12.8X</strong></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Protect Your Investment</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            €3,000/month is 0.25% of your monthly construction burn rate on a €1M project. That's cheap insurance.
          </p>
          <Link href="/contact" className="inline-block bg-yellow-400 text-slate-900 py-4 px-8 rounded-lg font-bold hover:bg-yellow-300 transition-all text-lg">
            Start Project Oversight <ArrowRight className="inline-block ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
