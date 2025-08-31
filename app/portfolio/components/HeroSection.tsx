interface HeroSectionProps {
  stats: {
    totalValue: number
    projectsCompleted: number
    grantsSecured: number
    yearsExperience: number
    successRate: number
    averageROI: number
  }
}

export default function HeroSection({ stats }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-700 text-white">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            30 Years of Excellence in Hospitality, Heritage & Urban Design
          </h1>
          <p className="text-2xl mb-4 text-indigo-200">
            Over €100 Million in Projects Shaping Tourism and Communities in Puglia
          </p>
          <p className="text-lg mb-8 text-gray-300">
            €25M in grants secured • 95% success rate • Transforming Puglia since 1995
          </p>
          <p className="text-lg text-gray-300">
            Portfolio of Dott. Ing. Cataldo Russo - Licensed Engineer-Architect
          </p>
        </div>
        
        {/* Impressive Stats Grid - Based on CV actual data */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
            <div className="text-3xl font-bold">{stats.projectsCompleted}+</div>
            <div className="text-sm text-indigo-200">Projects Delivered</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
            <div className="text-3xl font-bold">€{(stats.totalValue/1000000).toFixed(0)}M+</div>
            <div className="text-sm text-indigo-200">Total Value</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
            <div className="text-3xl font-bold">€{(stats.grantsSecured/1000000).toFixed(0)}M</div>
            <div className="text-sm text-indigo-200">Grants Secured</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
            <div className="text-3xl font-bold">{stats.yearsExperience}</div>
            <div className="text-sm text-indigo-200">Years Experience</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
            <div className="text-3xl font-bold">{stats.successRate}%</div>
            <div className="text-sm text-indigo-200">Success Rate</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
            <div className="text-3xl font-bold">{stats.averageROI}%</div>
            <div className="text-sm text-indigo-200">Average ROI</div>
          </div>
        </div>
      </div>
    </section>
  )
}