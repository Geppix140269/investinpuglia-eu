// components/sections/AboutGiuseppe.tsx
import Icon from '@/lib/iconMappings'

export default function AboutGiuseppe() {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-purple-50 to-emerald-50 relative overflow-hidden" id="advisor">
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto px-5 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-5 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <Icon name="User" size={20} />
            YOUR ADVISOR
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
            Meet <strong className="font-bold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">Giuseppe Funaro</strong>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your strategic partner in Italian property investment success
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-emerald-600 rounded-3xl transform rotate-3"></div>
            <img 
              src="/Giuseppe Funaro 062025.jpg" 
              alt="Giuseppe Funaro - Property Investment Advisor Puglia" 
              className="relative rounded-3xl shadow-2xl w-full transform -rotate-3 hover:rotate-0 transition-transform duration-300"
            />
          </div>
          
          <div>
            <div className="prose prose-lg">
              <p className="text-lg text-gray-700 mb-6">
                After 35+ years in international business, I've seen too many investors lose fortunes 
                due to language barriers, cultural misunderstandings, and working with the wrong people. 
                That's why I've built a network of only the most trusted, proven professionals in Puglia.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3 bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-lg">
                  <Icon name="Check" size={20} className="text-green-600 mt-1" />
                  <span className="text-gray-700">
                    <strong>Every professional vetted</strong> - minimum 10 successful projects required
                  </span>
                </div>
                <div className="flex items-start gap-3 bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-lg">
                  <Icon name="Check" size={20} className="text-green-600 mt-1" />
                  <span className="text-gray-700">
                    <strong>Real references provided</strong> - talk to past clients before you commit
                  </span>
                </div>
                <div className="flex items-start gap-3 bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-lg">
                  <Icon name="Check" size={20} className="text-green-600 mt-1" />
                  <span className="text-gray-700">
                    <strong>Fixed pricing agreements</strong> - no surprise costs or delays
                  </span>
                </div>
                <div className="flex items-start gap-3 bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-lg">
                  <Icon name="Check" size={20} className="text-green-600 mt-1" />
                  <span className="text-gray-700">
                    <strong>Full project oversight</strong> - I personally ensure standards are met
                  </span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-100 to-emerald-100 rounded-2xl p-6 border border-white/50 shadow-lg">
                <p className="text-sm text-gray-600 italic mb-2">
                  "I don't just give advice - I connect you with the exact professionals who have 
                  successfully completed similar projects. Your success is guaranteed because you're 
                  working with proven experts, not taking chances."
                </p>
                <p className="text-sm font-semibold text-gray-800">— Giuseppe Funaro</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
