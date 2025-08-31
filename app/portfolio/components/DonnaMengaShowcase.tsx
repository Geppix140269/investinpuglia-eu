import { Sparkles, CheckCircle } from 'lucide-react'
import BeforeAfterSlider from '@/components/BeforeAfterSlider'

export default function DonnaMengaShowcase() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="h-4 w-4" />
              Featured Transformation
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Masseria Donna Menga
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Abandoned Heritage to Luxury Resort
            </p>
          </div>

          {/* Before/After Slider */}
          <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
            <BeforeAfterSlider
              beforeImage="/Cataldo's projects/Donna Menga Before.webp"
              afterImage="/Cataldo's projects/Donna-Menga.webp"
              beforeLabel="Before Renovation"
              afterLabel="After Transformation"
              height={600}
            />
          </div>

          {/* Project Details */}
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Project Overview</h3>
              <p className="text-gray-600 mb-6">
                Complete transformation of a historic masseria into a luxury rural tourism destination, 
                preserving authentic Puglian architecture while introducing modern luxury amenities.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-gray-600">Location</span>
                  <span className="font-semibold">Nardò, Puglia</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-gray-600">Total Investment</span>
                  <span className="font-semibold text-indigo-600">€2.3M</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-gray-600">Funding</span>
                  <span className="font-semibold">PIA Turismo Funded</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-gray-600">Completion</span>
                  <span className="font-semibold">2024</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Key Features</h3>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-lg font-semibold text-indigo-600">15 Luxury Suites</div>
                  <div className="text-sm text-gray-600">Rooms</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-lg font-semibold text-indigo-600">4,500 sqm</div>
                  <div className="text-sm text-gray-600">Area</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-lg font-semibold text-indigo-600">5 Stars</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-lg font-semibold text-indigo-600">35% Expected</div>
                  <div className="text-sm text-gray-600">ROI</div>
                </div>
              </div>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Historic preservation with modern luxury</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Sustainable energy systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Organic farm-to-table restaurant</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Wellness spa & infinity pool</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}