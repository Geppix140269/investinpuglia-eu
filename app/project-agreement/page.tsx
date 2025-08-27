'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ProjectAgreementPage() {
  const [showDownloadModal, setShowDownloadModal] = useState(false)

  const handleDownloadPDF = () => {
    // This would typically generate or fetch a PDF version
    setShowDownloadModal(true)
    setTimeout(() => setShowDownloadModal(false), 3000)
    
    // Create a link to download the PDF if it exists in public folder
    const link = document.createElement('a')
    link.href = '/Project_Management_Agreement.pdf'
    link.download = 'InvestInPuglia_Project_Agreement.pdf'
    link.click()
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-light text-center">
            Project Management Agreement
          </h1>
          <p className="text-center text-gray-300 mt-4">
            Professional Services Agreement for Investment Coordination in Puglia, Italy
          </p>
          <div className="text-center mt-6">
            <Link 
              href="/sign-agreement"
              className="inline-block bg-emerald-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-emerald-700 transition-all duration-300 animate-pulse"
            >
              ✍️ Sign This Agreement Online Now →
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="bg-gray-50 py-4 sticky top-20 z-10 border-b">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center text-sm">
            <a href="#parties" className="text-emerald-600 hover:text-emerald-700 px-3 py-1 rounded hover:bg-emerald-50">Parties</a>
            <a href="#services" className="text-emerald-600 hover:text-emerald-700 px-3 py-1 rounded hover:bg-emerald-50">Services</a>
            <a href="#phases" className="text-emerald-600 hover:text-emerald-700 px-3 py-1 rounded hover:bg-emerald-50">Project Phases</a>
            <a href="#fees" className="text-emerald-600 hover:text-emerald-700 px-3 py-1 rounded hover:bg-emerald-50">Fees & Payment</a>
            <a href="#obligations" className="text-emerald-600 hover:text-emerald-700 px-3 py-1 rounded hover:bg-emerald-50">Obligations</a>
            <a href="#confidentiality" className="text-emerald-600 hover:text-emerald-700 px-3 py-1 rounded hover:bg-emerald-50">Confidentiality</a>
            <a href="#termination" className="text-emerald-600 hover:text-emerald-700 px-3 py-1 rounded hover:bg-emerald-50">Termination</a>
            <a href="#governing-law" className="text-emerald-600 hover:text-emerald-700 px-3 py-1 rounded hover:bg-emerald-50">Governing Law</a>
          </div>
        </div>
      </section>

      {/* Agreement Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <div className="bg-white rounded-lg shadow-sm p-8">
            
            {/* Effective Date */}
            <div className="text-center mb-8 pb-8 border-b">
              <p className="text-sm text-gray-600">EFFECTIVE DATE: [TO BE INSERTED]</p>
              <p className="text-sm text-gray-600 mt-2">AGREEMENT NUMBER: [TO BE GENERATED]</p>
            </div>

            {/* Article 1: Parties */}
            <article id="parties" className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Article 1: Parties to the Agreement</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-4">
                <p className="mb-4">This Project Management Agreement ("Agreement") is entered into between:</p>
                
                <div className="mb-4 border-l-4 border-emerald-600 pl-4">
                  <p className="font-semibold text-lg mb-2">Service Provider:</p>
                  <p className="font-medium">1402 CELSIUS LTD</p>
                  <p>20-22 Wenlock Road, N1 7GU</p>
                  <p>London, United Kingdom</p>
                  <p className="mt-2">
                    <span className="text-sm text-gray-700">Company Registration No:</span> 
                    <span className="font-medium"> 12475013</span>
                  </p>
                  <p>
                    <span className="text-sm text-gray-700">VAT No:</span> 
                    <span className="font-medium"> GB 343 1702 32</span>
                  </p>
                  <p className="mt-2">
                    <span className="text-sm text-gray-700">Operating through:</span> 
                    <span className="font-medium"> InvestInPuglia.eu</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-3 italic">(hereinafter referred to as the "Service Provider")</p>
                </div>
                
                <div className="mb-4 border-l-4 border-blue-600 pl-4 mt-6">
                  <p className="font-semibold text-lg mb-2">Client:</p>
                  <p>[Client Name]</p>
                  <p>[Client Address]</p>
                  <p>[Client City, Postal Code, Country]</p>
                  <p className="text-sm text-gray-600 mt-3 italic">(hereinafter referred to as the "Client")</p>
                </div>
                
                <p className="text-sm text-gray-600 italic mt-4">
                  Collectively referred to as the "Parties" and individually as a "Party"
                </p>
              </div>
            </article>

            {/* Article 2: Recitals and Background */}
            <article className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Article 2: Recitals and Background</h2>
              
              <div className="space-y-4">
                <p className="font-semibold">WHEREAS:</p>
                
                <div className="pl-6 space-y-3">
                  <p><span className="font-medium">A.</span> The Client wishes to explore and execute a real estate investment in Puglia, Italy, and requires professional project coordination and representation services to support this endeavour;</p>
                  
                  <p><span className="font-medium">B.</span> The Service Provider acts as a Project Coordinator and Client Representative, responsible for managing and coordinating all third-party professionals, ensuring their deliverables are completed on time and according to the project plan agreed with the Client (the "Project Owner");</p>
                  
                  <p><span className="font-medium">C.</span> The Service Provider, through its authorized representatives and associates including Giuseppe Funaro, possesses the necessary qualifications, experience, and local expertise to coordinate, manage, and oversee all professional services required for the project;</p>
                  
                  <p><span className="font-medium">D.</span> The Service Provider undertakes responsibility for the performance management of all engaged professionals, while the actual technical services are performed by qualified third-party specialists;</p>
                  
                  <p><span className="font-medium">E.</span> The Service Provider has access to grant programs totaling up to €2.25 million through the Regione Puglia PIA (Pacchetti Integrati di Agevolazioni) and is a member of CapitalImprese (capitalimprese.it) and the International Trade Council (ITC);</p>
                  
                  <p><span className="font-medium">F.</span> The parties wish to enter into this professional services agreement under the terms and conditions set forth below.</p>
                </div>
              </div>
            </article>

            {/* Article 3: Nature and Scope of Services */}
            <article id="services" className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Article 3: Nature and Scope of Services</h2>
              
              <div className="space-y-4">
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <h3 className="font-semibold mb-2 text-amber-900">3.0 Nature of Services</h3>
                  <p className="text-sm mb-3">The Service Provider acts exclusively as a Project Coordinator and Client Representative, responsible for:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Coordinating and managing all third-party professionals engaged in the project</li>
                    <li>Representing the Client's interests in all project-related matters</li>
                    <li>Ensuring timely delivery of all professional services according to the agreed project plan</li>
                    <li>Monitoring and reporting on the performance of all engaged professionals</li>
                    <li>Acting as the single point of contact between the Client and all project stakeholders</li>
                  </ul>
                  <p className="text-sm mt-3 italic">The Service Provider does not directly perform technical services (architectural, engineering, construction, legal, or financial advisory) but ensures these services are delivered by qualified professionals according to the Client's requirements and timeline.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">3.1 Property Search and Strategic Planning – Representation Services</h3>
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>Representing the Client in property viewings and negotiations</li>
                    <li>Coordinating property surveyors and valuation experts</li>
                    <li>Managing market analysis through qualified research professionals</li>
                    <li>Overseeing development of business models through specialist consultants</li>
                    <li>Access to Apulink.com platform for property management</li>
                    <li>Ensuring all strategic planning deliverables meet agreed timelines</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">3.2 Grant and Financial Application Management – Coordination & Accountability</h3>
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>Managing accredited grant consultants for identifying funding opportunities (including Mini PIA Turismo)</li>
                    <li>Overseeing preparation and timely submission of all application documents</li>
                    <li>Coordinating business plan development through qualified financial advisors</li>
                    <li>Representing the Client in meetings with banks and financial institutions</li>
                    <li>Taking responsibility for ensuring all grant application deadlines are met</li>
                    <li>Monitoring and reporting on application progress and outcomes</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">3.3 Legal and Administrative Services – Management Responsibility</h3>
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>Coordination of legal professionals for entity setup and compliance</li>
                    <li>Management of notary appointments and deed preparations</li>
                    <li>Oversight of permit applications through qualified technicians</li>
                    <li>Virtual team coordination (architects, engineers, lawyers)</li>
                    <li>Accountability for project delivery according to agreed timelines</li>
                    <li>Regular progress reporting with clear accountability for delays</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">3.4 Confidentiality and Data Protection</h3>
                  <p className="text-sm mb-2">The Service Provider agrees to:</p>
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>Maintain strict confidentiality over all Client information</li>
                    <li>Comply with UK GDPR and data protection regulations</li>
                    <li>Not disclose confidential information for any unauthorized purpose</li>
                    <li>Return or destroy all confidential materials upon termination</li>
                  </ul>
                </div>
              </div>
            </article>

            {/* Article 4: Project Phases */}
            <article id="phases" className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Article 4: Project Phases and Deliverables</h2>
              
              <div className="space-y-6">
                <h3 className="font-semibold text-lg text-gray-800 mb-4">Stage 1: From Search to Preliminary Agreement</h3>
                
                <div className="bg-emerald-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-3 text-emerald-900">Phase 1.1: Property Search & Planning (€2,500)</h3>
                  <p className="mb-3 text-sm">Duration: 2-4 weeks from commencement</p>
                  
                  <p className="font-medium mb-2">Deliverables:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Property evaluation based on client's specific criteria</li>
                    <li>Search properties by budget, location, and requirements</li>
                    <li>Market analysis and investment opportunity assessment</li>
                    <li>Basic business and project plan development</li>
                    <li>Timeline and milestone planning</li>
                    <li>Preparation for offer to seller</li>
                    <li>Full access to Apulink.com platform</li>
                    <li>Initial grant eligibility verification</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-3 text-blue-900">Phase 1.2: Negotiation & Due Diligence (€2,500)</h3>
                  <p className="mb-3 text-sm">Duration: 4-6 weeks from commencement</p>
                  
                  <p className="font-medium mb-2">Deliverables:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Property price negotiation with sellers</li>
                    <li>Legal assistance for property assessment</li>
                    <li>Administrative support for all requirements</li>
                    <li>Virtual team of technical professionals coordination</li>
                    <li>Architectural and structural evaluations</li>
                    <li>Due diligence coordination</li>
                    <li>Document preparation and review</li>
                    <li>Preliminary agreement preparation</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-3 text-yellow-900">Phase 1.3: Preliminary Agreement (€2,500)</h3>
                  <p className="mb-3 text-sm">Duration: 2-3 weeks from commencement</p>
                  
                  <p className="font-medium mb-2">Deliverables:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Preliminary agreement finalization</li>
                    <li>Legal review and notary coordination</li>
                    <li>Milestone planning agreed with client</li>
                    <li>Deposit and payment structuring</li>
                    <li>Risk assessment and mitigation</li>
                    <li>Contract registration support</li>
                    <li>Next phase planning and preparation</li>
                  </ul>
                </div>
                
                <h3 className="font-semibold text-lg text-gray-800 mt-8 mb-4">Stage 2: From Grant Application to Property Acquisition</h3>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-3 text-purple-900">Phase 2.1: CUP Approval Milestone (€2,500)</h3>
                  <p className="mb-3 text-sm">Duration: Variable based on regional timelines</p>
                  <p className="text-sm font-medium text-purple-700 mb-3">Payment due upon obtaining CUP (Codice Unico Progetto) from Regione Puglia</p>
                  
                  <p className="font-medium mb-2">Services Included:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Complete grant application preparation and submission</li>
                    <li>Business plan finalization for grant approval</li>
                    <li>Technical documentation preparation</li>
                    <li>Direct liaison with Regione Puglia authorities</li>
                    <li>Response to authority queries and requests</li>
                    <li>Grant approval monitoring and follow-up</li>
                    <li>CUP code obtainment and registration</li>
                  </ul>
                </div>
                
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-3 text-indigo-900">Phase 2.2: Final Deed & Negotiation Bonus (€2,500 + 5% of savings)</h3>
                  <p className="mb-3 text-sm">Duration: 2-4 weeks from CUP approval</p>
                  <p className="text-sm font-medium text-indigo-700 mb-3">€2,500 due upon final deed signature + 5% of any savings negotiated on asking price</p>
                  
                  <p className="font-medium mb-2">Services Included:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Final deed preparation and review</li>
                    <li>Notary coordination and scheduling</li>
                    <li>Property registration assistance</li>
                    <li>Ownership transfer completion</li>
                    <li>Tax registration and compliance</li>
                    <li>Utility transfer coordination</li>
                    <li>Post-acquisition support</li>
                  </ul>
                  <div className="bg-white p-3 rounded mt-3 border border-indigo-200">
                    <p className="text-xs text-gray-700">
                      <strong>Negotiation Bonus Example:</strong> Property asking price €500,000, negotiated to €450,000 = 
                      €50,000 savings × 5% = €2,500 additional bonus payable at deed signature
                    </p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg border-2 border-purple-300">
                  <h3 className="font-semibold mb-3 text-purple-900">Success Fee: Grant Funding (2.5%)</h3>
                  <p className="mb-3 text-sm">Payable upon receipt of grant funds</p>
                  
                  <p className="font-medium mb-2">Terms:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>2.5% of the total grant amount secured (up to €2.25M available)</li>
                    <li>Payable only after grant funds are received from Regione Puglia</li>
                    <li>Performance-based alignment with client success</li>
                    <li>Example: €500,000 grant = €12,500 success fee</li>
                    <li>Includes ongoing support for grant compliance and reporting</li>
                  </ul>
                </div>
              </div>
            </article>

            {/* Article 5: Fees and Payment Terms */}
            <article id="fees" className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Article 5: Fees and Payment Terms</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">5.1 Fee Structure</h3>
                  <table className="w-full border-collapse border border-gray-300 text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">Phase</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Fee</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Payment Terms</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-emerald-50">
                        <td className="border border-gray-300 px-4 py-2 font-semibold" colSpan={3}>Stage 1: Search to Preliminary Agreement</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Phase 1.1: Property Search & Planning</td>
                        <td className="border border-gray-300 px-4 py-2">€1,500</td>
                        <td className="border border-gray-300 px-4 py-2">Due upon agreement execution</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Phase 1.2: Negotiation & Due Diligence</td>
                        <td className="border border-gray-300 px-4 py-2">€3,500</td>
                        <td className="border border-gray-300 px-4 py-2">Due upon phase commencement</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Phase 1.3: Preliminary Agreement</td>
                        <td className="border border-gray-300 px-4 py-2">€2,500</td>
                        <td className="border border-gray-300 px-4 py-2">Due before preliminary signing</td>
                      </tr>
                      <tr className="bg-purple-50">
                        <td className="border border-gray-300 px-4 py-2 font-semibold" colSpan={3}>Stage 2: Grant Application to Final Deed</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Phase 2.1: CUP Approval</td>
                        <td className="border border-gray-300 px-4 py-2">€2,500</td>
                        <td className="border border-gray-300 px-4 py-2">Due upon CUP obtainment</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Phase 2.2: Final Deed</td>
                        <td className="border border-gray-300 px-4 py-2">€2,500</td>
                        <td className="border border-gray-300 px-4 py-2">Due upon deed signature</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Negotiation Bonus</td>
                        <td className="border border-gray-300 px-4 py-2">5% of savings</td>
                        <td className="border border-gray-300 px-4 py-2">Due upon deed signature</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Success Fee</td>
                        <td className="border border-gray-300 px-4 py-2">2.5% of grant amount</td>
                        <td className="border border-gray-300 px-4 py-2">Due upon grant fund receipt</td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mt-4">
                    <p className="text-sm font-semibold text-gray-700">Total Investment Summary:</p>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• Stage 1 Total: €7,500 (from search to preliminary agreement)</li>
                      <li>• Stage 2 Total: €5,000 + 5% negotiation bonus + 2.5% grant success fee</li>
                      <li>• Complete Project: €12,500 fixed + performance-based fees</li>
                    </ul>
                    <p className="text-xs text-gray-500 mt-2 italic">
                      Example: €50,000 saved on purchase = €2,500 bonus | €500,000 grant = €12,500 fee
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">5.2 Payment Methods</h3>
                  <p>Payments shall be made via:</p>
                  <ul className="list-disc pl-6 mt-2">
                    <li>Stripe secure payment platform (Phases 1 & 2)</li>
                    <li>Wire transfer for amounts exceeding €5,000</li>
                    <li>Other methods as mutually agreed in writing</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">5.3 Late Payment</h3>
                  <p>Late payments shall incur interest at 8% above the Bank of England base rate, in accordance with English law.</p>
                </div>
              </div>
            </article>

            {/* Article 6: Client Obligations */}
            <article id="obligations" className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Article 6: Client Obligations</h2>
              
              <div className="space-y-4">
                <p>The Client agrees to:</p>
                
                <ul className="list-decimal pl-6 space-y-2">
                  <li>Provide accurate and complete information necessary for service delivery</li>
                  <li>Respond to information requests within 48 business hours</li>
                  <li>Designate an authorized representative for decision-making</li>
                  <li>Make timely payments according to the fee schedule</li>
                  <li>Comply with Italian law and regulations</li>
                  <li>Maintain confidentiality of proprietary information</li>
                  <li>Provide necessary powers of attorney when required</li>
                  <li>Cover all government fees, taxes, and official charges</li>
                </ul>
              </div>
            </article>

            {/* Article 7: Consultant Obligations */}
            <article className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Article 7: Consultant Obligations</h2>
              
              <div className="space-y-4">
                <p>The Consultant agrees to:</p>
                
                <ul className="list-decimal pl-6 space-y-2">
                  <li>Perform services with professional competence and diligence</li>
                  <li>Maintain appropriate licenses and authorizations</li>
                  <li>Provide regular updates and progress reports</li>
                  <li>Maintain confidentiality of Client information</li>
                  <li>Disclose any conflicts of interest</li>
                  <li>Comply with applicable laws and regulations</li>
                  <li>Maintain professional liability insurance</li>
                  <li>Provide access to the InvestInPuglia.eu platform</li>
                </ul>
              </div>
            </article>

            {/* Article 8: Confidentiality, NDA & NCA */}
            <article id="confidentiality" className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Article 8: Confidentiality, Non-Disclosure & Non-Circumvention</h2>
              
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h3 className="font-semibold mb-2 text-red-900">8.1 Non-Disclosure Agreement (NDA)</h3>
                  <p className="mb-3">Both Parties agree to maintain strict confidentiality regarding all non-public information exchanged during the engagement, including but not limited to:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Business strategies, plans, and financial information</li>
                    <li>Property details, pricing, and negotiation strategies</li>
                    <li>Contact information of sellers, agents, and professionals</li>
                    <li>Grant application strategies and documentation</li>
                    <li>Proprietary methodologies and business processes</li>
                    <li>Any information marked or identified as confidential</li>
                  </ul>
                  <p className="mt-3 text-sm">Neither party shall disclose, publish, or disseminate confidential information to any third party without prior written consent, except as required by law or court order.</p>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h3 className="font-semibold mb-2 text-orange-900">8.2 Non-Circumvention Agreement (NCA)</h3>
                  <p className="mb-3">The Client agrees not to circumvent, avoid, bypass, or obviate the Service Provider, directly or indirectly, to:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Contact, deal with, or engage any contacts, professionals, or service providers introduced by the Service Provider</li>
                    <li>Enter into any business transactions with parties introduced through this engagement without the Service Provider's involvement</li>
                    <li>Share contact information of introduced parties with third parties for the purpose of circumvention</li>
                    <li>Attempt to negotiate directly with properties or sellers identified by the Service Provider</li>
                  </ul>
                  <p className="mt-3 text-sm font-medium">This non-circumvention clause applies to all introductions made during the term of this Agreement and for a period of three (3) years thereafter.</p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h3 className="font-semibold mb-2 text-yellow-900">8.3 Breach and Remedies</h3>
                  <p className="mb-3">In the event of breach of confidentiality or circumvention:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>The breaching party shall be liable for all damages, losses, and costs incurred</li>
                    <li>The non-breaching party may seek immediate injunctive relief</li>
                    <li>For circumvention breaches, the Client shall pay the Service Provider the full commission or fees that would have been earned</li>
                    <li>Legal costs and attorney fees shall be borne by the breaching party</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">8.4 GDPR Compliance</h3>
                  <p>The Service Provider shall process personal data in accordance with the General Data Protection Regulation (GDPR) and Italian privacy laws. All data processing shall be limited to the purposes of this Agreement.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">8.5 Duration</h3>
                  <p>Confidentiality and non-disclosure obligations shall survive termination of this Agreement for a period of five (5) years. Non-circumvention obligations shall survive for three (3) years after termination.</p>
                </div>
              </div>
            </article>

            {/* Article 9: Intellectual Property */}
            <article className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Article 9: Intellectual Property</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">9.1 Work Product</h3>
                  <p>All deliverables created specifically for the Client shall become the Client's property upon full payment of applicable fees.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">9.2 Pre-existing IP</h3>
                  <p>Each Party retains ownership of their pre-existing intellectual property. The Consultant grants the Client a license to use Consultant's pre-existing IP solely for the purposes contemplated by this Agreement.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">9.3 Platform Access</h3>
                  <p>Access to the InvestInPuglia.eu platform is provided under a limited, non-exclusive, non-transferable license during the term of engagement.</p>
                </div>
              </div>
            </article>

            {/* Article 10: Liability and Indemnification */}
            <article className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Article 10: Liability and Indemnification</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">10.1 Limitation of Liability</h3>
                  <p>Except for cases of gross negligence or willful misconduct, the Consultant's total liability shall not exceed the fees paid under this Agreement.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">10.2 No Guarantee of Results</h3>
                  <p>The Consultant does not guarantee grant approval, specific investment returns, or business outcomes. All investments carry inherent risks.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">10.3 Indemnification</h3>
                  <p>Each Party shall indemnify the other against claims arising from their own negligence, breach of this Agreement, or violation of applicable laws.</p>
                </div>
              </div>
            </article>

            {/* Article 11: Term and Termination */}
            <article id="termination" className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Article 11: Term and Termination</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">11.1 Term</h3>
                  <p>This Agreement commences upon execution and continues until completion of the selected phases or termination.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">11.2 Termination for Convenience</h3>
                  <p>Either Party may terminate with 30 days written notice. The Client remains liable for fees for work completed and expenses incurred.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">11.3 Termination for Cause</h3>
                  <p>Either Party may terminate immediately upon material breach if not cured within 15 days of written notice.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">11.4 Effect of Termination</h3>
                  <p>Upon termination, the Consultant shall deliver all completed work product, and the Client shall pay all outstanding fees.</p>
                </div>
              </div>
            </article>

            {/* Article 12: Dispute Resolution */}
            <article className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Article 12: Dispute Resolution</h2>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">12.1 Dispute Resolution Process</h3>
                  <ol className="list-decimal pl-6 space-y-2 text-sm">
                    <li><strong>Negotiation:</strong> The parties shall first attempt to resolve disputes through good faith negotiation</li>
                    <li><strong>Mediation:</strong> If negotiation fails, disputes shall be submitted to mediation under CEDR rules</li>
                    <li><strong>Arbitration:</strong> Unresolved disputes shall be finally settled by arbitration under LCIA rules</li>
                    <li><strong>Jurisdiction:</strong> The courts of England and Wales shall have exclusive jurisdiction for any court proceedings</li>
                  </ol>
                </div>
              </div>
            </article>

            {/* Article 13: Governing Law */}
            <article id="governing-law" className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Article 13: Governing Law and Jurisdiction</h2>
              
              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="font-semibold mb-2">This Agreement shall be governed by and construed in accordance with the laws of England and Wales.</p>
                  
                  <p className="text-sm mt-2">The parties agree that:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
                    <li>English law applies to all aspects of this Agreement</li>
                    <li>The courts of England and Wales have exclusive jurisdiction</li>
                    <li>UK GDPR and data protection regulations apply</li>
                    <li>The Contracts (Rights of Third Parties) Act 1999 is excluded</li>
                  </ul>
                </div>
              </div>
            </article>

            {/* Article 14: General Provisions */}
            <article className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Article 14: General Provisions</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">14.1 Entire Agreement</h3>
                  <p>This Agreement constitutes the entire understanding between the Parties and supersedes all prior agreements.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">14.2 Amendments</h3>
                  <p>Modifications must be in writing and signed by both Parties.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">14.3 Severability</h3>
                  <p>If any provision is deemed invalid, the remaining provisions shall continue in full force.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">14.4 Force Majeure</h3>
                  <p>Neither Party shall be liable for delays due to circumstances beyond their reasonable control.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">14.5 Assignment</h3>
                  <p>This Agreement may not be assigned without the other Party's written consent.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">14.6 Notices</h3>
                  <p>All notices shall be in writing and delivered via email with confirmation or registered mail.</p>
                </div>
              </div>
            </article>

            {/* Signature Section */}
            <article className="mb-10 mt-12 pt-8 border-t-2">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">Execution</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-6 text-sm text-gray-600">
                  IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first written above.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <p className="font-semibold mb-4">FOR THE SERVICE PROVIDER:</p>
                    <p className="font-medium mb-4">1402 CELSIUS LTD</p>
                    <div className="border-b border-gray-400 mb-2 h-12"></div>
                    <p className="text-sm">By: _________________________</p>
                    <p className="text-sm text-gray-600">Name: Giuseppe Funaro</p>
                    <p className="text-sm text-gray-600">Title: Authorized Representative</p>
                    <p className="text-sm text-gray-600">Date: _________________</p>
                  </div>
                  
                  <div>
                    <p className="font-semibold mb-4">FOR THE CLIENT:</p>
                    <p className="font-medium mb-4">[Client Name]</p>
                    <div className="border-b border-gray-400 mb-2 h-12"></div>
                    <p className="text-sm">By: _________________________</p>
                    <p className="text-sm text-gray-600">Name: _________________</p>
                    <p className="text-sm text-gray-600">Title: _________________</p>
                    <p className="text-sm text-gray-600">Date: _________________</p>
                  </div>
                </div>
              </div>
            </article>

            {/* Schedules */}
            <article className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Schedules</h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded">
                  <h3 className="font-semibold mb-3">SCHEDULE A – Specific Project Details</h3>
                  <div className="space-y-2 text-sm">
                    <p>Property Location/Region: ____________________________</p>
                    <p>Estimated Project Value: ____________________________</p>
                    <p>Target Completion Date: ____________________________</p>
                    <p>Specific Grant Programs: ____________________________</p>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded">
                  <h3 className="font-semibold mb-3">SCHEDULE B – Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <p className="font-medium mb-2">Service Provider's Project Manager:</p>
                      <p>Name: Giuseppe Funaro</p>
                      <p>Email: info@investinpuglia.eu</p>
                      <p>Phone: +39 351 400 1402</p>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Client's Primary Contact:</p>
                      <p>Name: ____________________________</p>
                      <p>Email: ____________________________</p>
                      <p>Phone: ____________________________</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded">
                  <h3 className="font-semibold mb-3">SCHEDULE C – Banking Details</h3>
                  <div className="text-sm">
                    <p className="mb-2">For payments to the Service Provider:</p>
                    <div className="bg-white p-3 rounded border border-purple-200">
                      <p><strong>Bank Name:</strong> ____________________________</p>
                      <p><strong>Account Name:</strong> 1402 Celsius Ltd</p>
                      <p><strong>IBAN:</strong> ____________________________</p>
                      <p><strong>SWIFT/BIC:</strong> ____________________________</p>
                      <p className="mt-2 text-xs text-gray-600">Note: Stripe payment links are provided for Phases 1.1-1.3. Bank details for milestone payments.</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Appendices */}
            <article className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Appendices</h2>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded">
                  <h3 className="font-semibold mb-2">Appendix A: Service Level Agreement</h3>
                  <ul className="list-disc pl-6 text-sm space-y-1">
                    <li>Response time: 24 hours for urgent matters, 48 hours for standard inquiries</li>
                    <li>Meeting availability: Minimum 2 hours per week during active phases</li>
                    <li>Report delivery: Weekly during Phase 2, bi-weekly during Phase 1</li>
                    <li>Platform uptime: 99.5% availability for InvestInPuglia.eu dashboard</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded">
                  <h3 className="font-semibold mb-2">Appendix B: Key Performance Indicators</h3>
                  <ul className="list-disc pl-6 text-sm space-y-1">
                    <li>Phase 1: Delivery of comprehensive analysis within 4 weeks</li>
                    <li>Phase 2: Grant application submission within 8 weeks</li>
                    <li>Phase 3: Monthly progress reports on grant status</li>
                    <li>Client satisfaction score target: &gt;4.5/5.0</li>
                  </ul>
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* How to Sign This Agreement Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12 text-gray-900">
            📝 How to Sign This Agreement
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-4xl mb-4 text-center">1️⃣</div>
              <h3 className="font-semibold text-lg mb-3 text-center">Initial Contact</h3>
              <p className="text-sm text-gray-600">
                Email us at <a href="mailto:info@investinpuglia.eu" className="text-emerald-600 font-medium">info@investinpuglia.eu</a> or 
                WhatsApp <a href="https://wa.me/393514001402" className="text-emerald-600 font-medium">+39 351 400 1402</a> to express interest
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-4xl mb-4 text-center">2️⃣</div>
              <h3 className="font-semibold text-lg mb-3 text-center">Receive Agreement</h3>
              <p className="text-sm text-gray-600">
                We'll send you a personalized agreement with your details filled in, 
                ready for digital signature via DocuSign or similar platform
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-4xl mb-4 text-center">3️⃣</div>
              <h3 className="font-semibold text-lg mb-3 text-center">Sign & Pay</h3>
              <p className="text-sm text-gray-600">
                Sign electronically and make Phase 1.1 payment (€2,500) via 
                Stripe secure link to activate services immediately
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-6 text-gray-900">🌍 For International Clients</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-2xl mr-4">✅</span>
                <div>
                  <p className="font-medium text-gray-900">No Need to Travel to Italy</p>
                  <p className="text-sm text-gray-600">Everything can be signed digitally from your country</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="text-2xl mr-4">✅</span>
                <div>
                  <p className="font-medium text-gray-900">English Law Agreement</p>
                  <p className="text-sm text-gray-600">Governed by laws of England & Wales for your protection</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="text-2xl mr-4">✅</span>
                <div>
                  <p className="font-medium text-gray-900">Multiple Payment Options</p>
                  <p className="text-sm text-gray-600">Stripe (cards), bank transfers, or other agreed methods</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="text-2xl mr-4">✅</span>
                <div>
                  <p className="font-medium text-gray-900">Power of Attorney Available</p>
                  <p className="text-sm text-gray-600">We can arrange POA for Italian transactions when needed</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h4 className="font-semibold text-amber-900 mb-2">📋 Documents You'll Need:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Valid passport or ID</li>
                <li>• Proof of address (utility bill, bank statement)</li>
                <li>• Tax ID from your country</li>
                <li>• Proof of funds (for property purchase - can be provided later)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Action Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-light text-gray-900 mb-6">Ready to Start?</h2>
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-8 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-4">Quick Start Process:</h3>
            <ol className="text-left space-y-3 text-sm">
              <li className="flex items-start">
                <span className="font-bold mr-2">1.</span>
                <span>Download this agreement for review with your advisor</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">2.</span>
                <span>Contact us with your property requirements and budget</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">3.</span>
                <span>Receive personalized agreement within 24 hours</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">4.</span>
                <span>Sign digitally and pay Phase 1.1 (€2,500) to begin</span>
              </li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDownloadPDF}
              className="inline-flex items-center justify-center bg-white text-gray-700 py-3 px-6 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Download PDF for Review
            </button>
            
            <a
              href="mailto:info@investinpuglia.eu?subject=Project%20Agreement%20Inquiry&body=Hello,%0D%0A%0D%0AI'm%20interested%20in%20your%20property%20investment%20services%20in%20Puglia.%0D%0A%0D%0AMy%20requirements:%0D%0A-%20Budget:%20€%0D%0A-%20Property%20type:%20%0D%0A-%20Location%20preference:%20%0D%0A-%20Timeline:%20%0D%0A%0D%0APlease%20send%20me%20a%20personalized%20agreement.%0D%0A%0D%0AThank%20you!"
              className="inline-flex items-center justify-center bg-emerald-600 text-white py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              Request Personalized Agreement
            </a>
            
            <a
              href="https://wa.me/393514001402?text=Hi%2C%20I%27m%20interested%20in%20signing%20the%20Project%20Management%20Agreement%20for%20property%20investment%20in%20Puglia"
              className="inline-flex items-center justify-center bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              WhatsApp Us Now
            </a>
          </div>
        </div>
      </section>

      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-emerald-600 mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Download Started</h3>
              <p className="text-sm text-gray-600">Your PDF download should begin automatically.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}