'use client'

import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PortfolioHero from './components/PortfolioHero'
import PortfolioStats from './components/PortfolioStats'
import ExpertTeamPremium from './components/ExpertTeamPremium'
import FeaturedTransformation from './components/FeaturedTransformation'
import HeritageExcellence from './components/HeritageExcellence'
import PortfolioProjectsSanity from './components/PortfolioProjectsSanity'
import UpcomingProjects from './components/UpcomingProjects'
import PortfolioCredentials from './components/PortfolioCredentials'
import PortfolioCTA from './components/PortfolioCTA'

interface PortfolioClientProps {
  projects: any[]
  pageSettings: any
}

export default function PortfolioClientRefactored({ projects, pageSettings }: PortfolioClientProps) {
  return (
    <>
      <Navbar />
      <main>
        <PortfolioHero />
        <PortfolioStats />
        <ExpertTeamPremium />
        <FeaturedTransformation />
        <HeritageExcellence />
        <PortfolioProjectsSanity />
        <UpcomingProjects />
        <PortfolioCredentials />
        <PortfolioCTA />
      </main>
      <Footer />
    </>
  )
}