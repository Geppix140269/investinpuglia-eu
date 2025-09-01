'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { 
  Building2, MapPin, Calendar, TrendingUp, Users, Award,
  CheckCircle, Euro, Clock, Briefcase, Star, Shield,
  Home, FileCheck, Hammer, Target, ArrowRight, Sparkles,
  User, AlertCircle
} from 'lucide-react'

interface PortfolioClientProps {
  projects: any[]
  pageSettings: any
}

export default function PortfolioClient({ projects, pageSettings }: PortfolioClientProps) {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-700 text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold text-center mb-8">Investment Portfolio</h1>
            <p className="text-xl text-center">50+ Successfully Delivered Projects Worth €95M+</p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Completed Projects</h2>
            <p className="text-center text-gray-600 mb-8">Projects managed by our team over 29 years</p>
            
            {/* Projects will be displayed here */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="font-bold mb-2">Baglioni Masseria Muzza</h3>
                <p className="text-gray-600">€5.5M - Completed 2023</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="font-bold mb-2">VOI Hotels Alimini</h3>
                <p className="text-gray-600">€650K - Completed 2019</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="font-bold mb-2">Masseria Donna Menga</h3>
                <p className="text-gray-600">€2.3M - Completed 2024</p>
              </div>
            </div>
          </div>
        </section>

        {/* Hotel Shantiland - Planned Development */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Hotel Shantiland - Planned Development</h2>
              <p className="text-xl text-gray-600">PIA Turismo approved project with building permit issued October 2024</p>
            </div>
            
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-xl mb-4">Project Details</h3>
                  <p className="text-gray-700 mb-4">
                    New luxury tourist accommodation development in Otranto. 
                    Building permit (Permesso di Costruire n. 27/2024) issued on October 18, 2024.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>Client: Shantiland srl</li>
                    <li>Project Manager: Ing. Cataldo Russo</li>
                    <li>Construction Start: 2025</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-4">Investment Structure</h3>
                  <ul className="space-y-2">
                    <li>Total Investment: <strong>€2,167,400</strong></li>
                    <li>PIA Grant (50%): <strong>€1,084,000</strong></li>
                    <li>Private Equity: <strong>€1,083,400</strong></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}