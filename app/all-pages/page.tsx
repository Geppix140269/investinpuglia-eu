import Link from 'next/link'

export default async function AllPagesIndex() {
  // This page will link to ALL your pages, forcing Google to discover them

  const locations = [
    'invest-in-alberobello-bari',
    'invest-in-altamura-bari',
    'invest-in-andria-barletta-andria-trani',
    'invest-in-bari-bari',
    'invest-in-barletta-barletta-andria-trani',
    'invest-in-bisceglie-barletta-andria-trani',
    'invest-in-bitonto-bari',
    'invest-in-brindisi-brindisi',
    'invest-in-lecce-lecce',
    'invest-in-taranto-taranto',
    'invest-in-ostuni-brindisi',
    'invest-in-polignano-a-mare-bari'
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Investment Opportunities in Puglia</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Main Pages</h2>
          <ul className="space-y-2">
            <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
            <li><Link href="/about" className="text-blue-600 hover:underline">About</Link></li>
            <li><Link href="/services" className="text-blue-600 hover:underline">Services</Link></li>
            <li><Link href="/portfolio" className="text-blue-600 hover:underline">Portfolio</Link></li>
            <li><Link href="/mini-pia-guide" className="text-blue-600 hover:underline">Mini PIA Guide</Link></li>
            <li><Link href="/property-calculator" className="text-blue-600 hover:underline">Property Calculator</Link></li>
            <li><Link href="/contact" className="text-blue-600 hover:underline">Contact</Link></li>
            <li><Link href="/blog" className="text-blue-600 hover:underline">Blog</Link></li>
            <li><Link href="/insights" className="text-blue-600 hover:underline">Insights</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Location Pages</h2>
          <ul className="space-y-2">
            <li><Link href="/locations" className="text-blue-600 hover:underline">All Locations</Link></li>
            {locations.map((location) => (
              <li key={location}>
                <Link href={`/locations/${location}`} className="text-blue-600 hover:underline">
                  {location.replace('invest-in-', '').replace('-', ' ')}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Industries</h2>
          <ul className="space-y-2">
            <li><Link href="/industries" className="text-blue-600 hover:underline">All Industries</Link></li>
            <li><Link href="/industries/tourism" className="text-blue-600 hover:underline">Tourism</Link></li>
            <li><Link href="/industries/manufacturing" className="text-blue-600 hover:underline">Manufacturing</Link></li>
            <li><Link href="/industries/agriculture" className="text-blue-600 hover:underline">Agriculture</Link></li>
            <li><Link href="/industries/technology" className="text-blue-600 hover:underline">Technology</Link></li>
            <li><Link href="/industries/renewable-energy" className="text-blue-600 hover:underline">Renewable Energy</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <p className="text-sm text-gray-600">
          This page helps search engines discover all investment opportunities across Puglia.
          From PIA grants to property investments, explore comprehensive resources for international investors.
        </p>
      </div>
    </div>
  )
}