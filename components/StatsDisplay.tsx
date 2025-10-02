'use client'

interface Stat {
  value: string
  label: string
}

const defaultStats: Stat[] = [
  { value: "€50M+", label: "Grants Secured for Clients" },
  { value: "€100K+", label: "Average Client Savings vs. DIY" },
  { value: "30+", label: "Years International Experience" },
  { value: "0", label: "Failed Projects" }
]

interface StatsDisplayProps {
  stats?: Stat[]
  bgColor?: string
}

export default function StatsDisplay({ stats = defaultStats, bgColor = "bg-white" }: StatsDisplayProps) {
  return (
    <div className={`py-12 ${bgColor}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
