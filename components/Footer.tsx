// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-5 text-center">
        <div className="flex justify-center items-center gap-3 mb-4">
          <img 
            src="/Logo_InvestInPuglia_White.svg" 
            alt="Invest in Puglia Logo" 
            className="h-12 w-auto"
          />
        </div>
        <p className="text-gray-400 text-sm tracking-wider mb-8" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.15em' }}>
          EU PROPERTY GRANTS • INVESTMENT ADVISORY • PUGLIA EXPERTISE
        </p>
        
        <div className="flex justify-center gap-8 mb-8">
          <a href="/" className="hover:text-green-400 transition-colors">Home</a>
          <a href="/calculator" className="hover:text-green-400 transition-colors">Calculators</a>
          <a href="/buyer-profile" className="hover:text-green-400 transition-colors">Buyer Profile</a>
          <a href="/contact" className="hover:text-green-400 transition-colors">Contact</a>
          <a href="/blog" className="hover:text-green-400 transition-colors">Blog</a>
        </div>
        
        <div className="text-gray-400">
          <p>📧 info@investinpuglia.eu</p>
          <p>📱 +39 351 400 1402</p>
        </div>
        
        <p className="text-gray-500 mt-8">© 2025 Invest in Puglia. All rights reserved.</p>
      </div>
    </footer>
  )
}
