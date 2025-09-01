'use client'

import { useState, Suspense, lazy } from 'react'
import { Building2, Star, Home, Award, Shield, FileCheck, Briefcase } from 'lucide-react'
// Navbar and Footer are rendered in the main layout.tsx

// Eagerly load critical above-the-fold components
import HeroSection from './components/HeroSection'
import LazySection from './components/LazySection'
import WebVitals from './components/WebVitals'
import PerformanceOptimizer from './components/PerformanceOptimizer'

// Lazy load non-critical components for better performance
const TeamSection = lazy(() => import('./components/TeamSection'))
const DonnaMengaShowcase = lazy(() => import('./components/DonnaMengaShowcase'))
const TorreMattaShowcase = lazy(() => import('./components/TorreMattaShowcase'))
const MajorProjectsSection = lazy(() => import('./components/MajorProjectsSection'))
const TrustIndicatorsSection = lazy(() => import('./components/TrustIndicatorsSection'))
const ShantilandSection = lazy(() => import('./components/ShantilandSection'))
const FinancedProjectsSection = lazy(() => import('./components/FinancedProjectsSection'))
const CTASection = lazy(() => import('./components/CTASection'))

// Loading components for different section heights
const SectionLoader = ({ height = "h-64" }: { height?: string }) => (
  <div className={`${height} bg-gray-100 animate-pulse flex items-center justify-center`}>
    <div className="text-gray-500 text-lg">Loading...</div>
  </div>
)

const ProjectsLoader = () => <SectionLoader height="h-screen" />
const ShowcaseLoader = () => <SectionLoader height="h-96" />
const StandardLoader = () => <SectionLoader height="h-64" />
const CompactLoader = () => <SectionLoader height="h-48" />

interface Project {
  name: string
  location: string
  value: string
  grant: string
  status: string
  description: string
  imageUrl?: string
}

interface PortfolioClientProps {
  projects: any[]
  pageSettings: any
}

export default function PortfolioClient({ projects, pageSettings }: PortfolioClientProps) {
  // Cataldo Russo's impressive statistics
  const stats = {
    totalValue: 100000000, // €100M+ in completed projects
    projectsCompleted: 50,
    grantsSecured: 25000000, // €25M in grants secured
    yearsExperience: 30, // Since 1995
    successRate: 95,
    averageROI: 35
  }

  // Key credentials to highlight
  const credentials = [
    {
      icon: <Award className="h-6 w-6" />,
      title: "Licensed Engineer-Architect",
      description: "Registered with Lecce Order of Engineers (#1697) since 1995",
      highlight: "110/110"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "ITACA Protocol Certified",
      description: "Certified for sustainable construction and energy efficiency standards",
      highlight: "Since 2016"
    },
    {
      icon: <FileCheck className="h-6 w-6" />,
      title: "Fire Safety Specialist",
      description: "Ministry of Interior certified for fire prevention systems",
      highlight: "Law 818/84"
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Grant Funding Expert",
      description: "€20M+ in secured funding (PIA Turismo, PSR, POIN, L.488)",
      highlight: "95% Success Rate"
    }
  ]

  // Projects Financed but Not Started Yet - NOW EMPTY AS SHANTILAND MOVED TO SEPARATE SECTION
  const financedProjects = []

  // Major project categories with real examples from CV - UPDATED IMAGE PATHS
  const majorProjects = [
    {
      category: "5-Star Luxury Hotels",
      icon: <Star className="h-8 w-8" />,
      projects: [
        {
          name: "Masseria San Giuseppe",
          location: "Otranto",
          value: "€2,600,000",
          grant: "Titolo II Turismo",
          status: "2005-2022",
          description: "D.Lgs. 42/04 protected monument, spa and rooms",
          imageUrl: "/Cataldo's projects/dimora san giuseppe.jpg"
        },
        {
          name: "Hotel Bellavista",
          location: "Otranto",
          value: "€1,000,000",
          grant: "Titolo II Turismo",
          status: "2021-2022",
          description: "Complete hotel renovation",
          imageUrl: "/Cataldo's projects/Hotel-Bellavista.webp"
        },
        {
          name: "Masseria Montelauro",
          location: "Otranto",
          value: "€3,300,000",
          grant: "PIA Turismo Funded",
          status: "Completed 2019",
          description: "5-star luxury hotel with 30 suites, spa & fine dining restaurant",
          imageUrl: "/Cataldo's projects/masseria montelauro.jpeg"
        },
        {
          name: "Hotel Basiliani",
          location: "Otranto",
          value: "€2,500,000",
          grant: "Private Investment",
          status: "2005-2009",
          description: "New room block zone B construction",
          imageUrl: "/Cataldo's projects/Basiliani.jpg"
        },
        {
          name: "Hotel Petraria",
          location: "Cannole",
          value: "€5,500,000",
          grant: "Private Investment",
          status: "2002-2008",
          description: "Tourist accommodation development",
          imageUrl: "/Cataldo's projects/hotel petraria cannole.jpg"
        },
        {
          name: "Hotel Bellaria",
          location: "Giurdignano",
          value: "€2,000,000",
          grant: "Private Investment",
          status: "2004-2007",
          description: "Tourist accommodation facility",
          imageUrl: "/Cataldo's projects/Residence Bellaria giurdignano.jpg"
        },
        {
          name: "Hotel Koinè",
          location: "Otranto",
          value: "€3,500,000",
          grant: "Private Investment",
          status: "2002-2006",
          description: "Recreational structure transformation to tourist accommodation",
          imageUrl: "/hotel-koine.jpg"
        },
        {
          name: "Hotel degli Haethey",
          location: "Otranto",
          value: "€2,500,000",
          grant: "L.R. 8/98 + DPR 447/95",
          status: "2001-2006",
          description: "Hotel expansion and elevation project",
          imageUrl: "/Cataldo's projects/hotel haethey otranto.jpg"
        }
      ]
    },
    {
      category: "International Resort Chains",
      icon: <Building2 className="h-8 w-8" />,
      projects: [
        {
          name: "Baglioni Masseria Muzza",
          location: "Otranto",
          value: "€5,500,000",
          grant: "PIA Turismo + Titolo II",
          status: "2011-2023",
          description: "17th century masseria transformed into Baglioni 5-star resort with spa",
          imageUrl: "/Cataldo's projects/baglioni_masseria_muzza.jpg"
        },
        {
          name: "VOI Hotels (Alpitour World)",
          location: "Otranto - Alimini",
          value: "€650,000",
          grant: "Private Investment",
          status: "2015-2019",
          description: "Reception, restaurant, pub, 32 rooms renovation, new spa, beach restaurant",
          imageUrl: "/Cataldo's projects/VOI Alimini Resort.jpg"
        },
        {
          name: "Le Cale d'Otranto (Italia Turismo)",
          location: "Otranto",
          value: "€1,600,000",
          grant: "Private Investment",
          status: "2015-2019",
          description: "Complete renovation blocks A-B-C-D, Pyramid and Tower structures",
          imageUrl: "/Cataldo's projects/Le Cale d'Otranto Beach Resort.jpg"
        },
        {
          name: "Hotel Pietra Verde",
          location: "Otranto",
          value: "€500,000",
          grant: "Private Investment",
          status: "2001-2002",
          description: "Hotel restructuring project with architectural and structural work",
          imageUrl: "/pietra-verde.jpg"
        }
      ]
    },
    {
      category: "Heritage & Castle Restorations",
      icon: <Home className="h-8 w-8" />,
      projects: [
        {
          name: "Masseria Donna Menga",
          location: "Nardò",
          value: "€2,300,000",
          grant: "PIA Turismo",
          status: "2018-2024",
          description: "Rural tourism facility development L.R. 20/98",
          imageUrl: "/Cataldo's projects/Donna-Menga.webp"
        },
        {
          name: "Masseria Furca",
          location: "Santa Cesarea Terme",
          value: "€1,500,000",
          grant: "Private Investment",
          status: "2007-2024",
          description: "Agriturismo development and expansion",
          imageUrl: "/Cataldo's projects/masseria-furca.jpg"
        },
        {
          name: "Castello di Noha - Nohasi Palace",
          location: "Galatina",
          value: "€1,300,000",
          grant: "Titolo II Turismo",
          status: "2019-2022",
          description: "Historic palace restoration for tourist accommodation",
          imageUrl: "/Cataldo's projects/nohasi palace hotel and spa.jpg"
        },
        {
          name: "Dimora San Giuseppe",
          location: "Uggiano La Chiesa",
          value: "€800,000",
          grant: "Private Investment",
          status: "2018-2020",
          description: "Historic building restoration for luxury accommodation",
          imageUrl: "/Cataldo's projects/dimora san giuseppe.jpg"
        },
        {
          name: "Torre Matta",
          location: "Otranto",
          value: "€600,000",
          grant: "Public Works",
          status: "Completed 2016",
          description: "Historic tower restoration - Important public heritage project",
          imageUrl: "/Cataldo's projects/Torre Matta.jpg"
        },
        {
          name: "Underground Hypogeum Complex",
          location: "Otranto",
          value: "€500,000",
          grant: "Private Investment",
          status: "Completed 2015",
          description: "Hotel residence complex with underground archaeological area",
          imageUrl: "/hypogeum.jpg"
        }
      ]
    }
  ]

  return (
    <>
      <WebVitals />
      <PerformanceOptimizer />
      <main>
        <HeroSection stats={stats} />
        
        <LazySection fallback={<CompactLoader />} rootMargin="50px">
          <TeamSection />
        </LazySection>
        
        <LazySection fallback={<ShowcaseLoader />} rootMargin="100px">
          <DonnaMengaShowcase />
        </LazySection>
        
        <LazySection fallback={<ShowcaseLoader />} rootMargin="100px">
          <TorreMattaShowcase />
        </LazySection>
        
        <LazySection fallback={<ProjectsLoader />} rootMargin="200px">
          <MajorProjectsSection majorProjects={majorProjects} />
        </LazySection>
        
        <LazySection fallback={<StandardLoader />} rootMargin="100px">
          <TrustIndicatorsSection credentials={credentials} />
        </LazySection>
        
        <LazySection fallback={<ShowcaseLoader />} rootMargin="100px">
          <ShantilandSection />
        </LazySection>
        
        <LazySection fallback={<StandardLoader />} rootMargin="50px">
          <FinancedProjectsSection financedProjects={financedProjects} />
        </LazySection>
        
        <LazySection fallback={<CompactLoader />} rootMargin="50px">
          <CTASection />
        </LazySection>
      </main>
    </>
  )
}