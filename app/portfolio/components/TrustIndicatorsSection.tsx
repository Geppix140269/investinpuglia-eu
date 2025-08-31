interface TrustIndicatorsSectionProps {
  credentials: Array<{
    icon: JSX.Element
    title: string
    description: string
    highlight: string
  }>
}

export default function TrustIndicatorsSection({ credentials }: TrustIndicatorsSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why International Investors Choose InvestInPuglia</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our technical team combines three decades of excellence with proven grant funding expertise
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {credentials.map((cred, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-indigo-50 rounded-xl p-6 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600">
                  {cred.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">{cred.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{cred.description}</p>
                  <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold">
                    {cred.highlight}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}