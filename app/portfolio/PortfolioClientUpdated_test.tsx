'use client'

import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface PortfolioClientProps {
  projects: any[]
  pageSettings: any
}

export default function PortfolioClient({ projects, pageSettings }: PortfolioClientProps) {
  return (
    <>
      <Navbar />
      <main>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center">Portfolio Test</h1>
            <p className="text-center mt-4">Testing basic structure</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}