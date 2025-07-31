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
              src="/Giuseppe Funaro 062025.png" 
              alt="Giuseppe Funaro - Property Investment Advisor Puglia" 
              className="relative rounded-3xl shadow-2xl w-full transform -rotate-3 hover:rotate-0 transition-transform duration-300"
            />
            {/* LinkedIn button below image */}
            <div className="text-center mt-6">
              <a 
                href="https://www.linkedin.com/in/giuseppe-funaro/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-gray-700 hover:text-purple-700 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all border border-white/50"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span className="font-semibold">Connect on LinkedIn</span>
              </a>
            </div>
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
