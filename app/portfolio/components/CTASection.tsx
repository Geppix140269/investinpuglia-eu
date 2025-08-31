import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-900 to-purple-800 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Start Your Investment Project?
        </h2>
        <p className="text-xl mb-8 text-indigo-200 max-w-3xl mx-auto">
          Join 50+ successful investors who have transformed their properties into profitable luxury destinations 
          with our expert guidance and grant funding expertise
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="bg-white text-indigo-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all"
          >
            Schedule Consultation
          </Link>
          <Link
            href="/services"
            className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-indigo-900 transition-all"
          >
            Explore Our Services
          </Link>
        </div>
      </div>
    </section>
  )
}