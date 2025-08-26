import { Property } from './types'

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Palazzo Palmariggi - Historic Investment Opportunity',
    slug: 'palazzo-palmariggi',
    type: 'historic',
    price: 1450000,
    currency: 'EUR',
    location: {
      city: 'Palmariggi',
      province: 'Lecce',
      region: 'Puglia',
      coordinates: {
        lat: 40.3333,
        lng: 18.3167
      }
    },
    details: {
      squareMeters: 1300,
      landSquareMeters: 5000,
      floors: 2,
      yearBuilt: 1900,
      condition: 'to-renovate'
    },
    description: {
      short: 'Magnificent early 20th century palazzo with 1,300 sqm interior and 5,000 sqm buildable garden, perfect for boutique hotel conversion.',
      full: 'Located in Palmariggi, just a few kilometers from the pristine Adriatic coastline, this extraordinary palazzo spans two levels. This architectural gem from the early 1900s showcases exceptional construction quality, featuring authentic Salento-style vaulted ceilings throughout, complemented by elegant coffered ceilings on the first floor.',
      features: [
        'Original Salento vaulted ceilings',
        'Coffered ceilings on first floor',
        'Multiple verandas with garden views',
        '5,000 sqm buildable land',
        'Minutes from Adriatic beaches'
      ],
      investmentPotential: 'Ideal for conversion into luxury boutique hotel with 20-30 rooms. Growing tourism market with potential €5,000-10,000/week vacation rental income.'
    },
    images: [
      {
        url: 'https://res.cloudinary.com/dusubfxgo/image/upload/v1756236762/investinpuglia/properties/palazzo-palmariggi/palazzo-exterior.jpg',
        alt: 'Palazzo Palmariggi exterior',
        isPrimary: true
      },
      {
        url: 'https://res.cloudinary.com/dusubfxgo/image/upload/v1756236764/investinpuglia/properties/palazzo-palmariggi/interior-vaulted-ceilings.jpg',
        alt: 'Interior vaulted ceilings'
      },
      {
        url: 'https://res.cloudinary.com/dusubfxgo/image/upload/v1756236765/investinpuglia/properties/palazzo-palmariggi/garden-view.jpg',
        alt: 'Garden view'
      },
      {
        url: 'https://res.cloudinary.com/dusubfxgo/image/upload/v1756236767/investinpuglia/properties/palazzo-palmariggi/interior-room-1.jpg',
        alt: 'Interior room 1'
      },
      {
        url: 'https://res.cloudinary.com/dusubfxgo/image/upload/v1756236769/investinpuglia/properties/palazzo-palmariggi/interior-room-2.jpg',
        alt: 'Interior room 2'
      },
      {
        url: 'https://res.cloudinary.com/dusubfxgo/image/upload/v1756236770/investinpuglia/properties/palazzo-palmariggi/interior-room-3.jpg',
        alt: 'Interior room 3'
      },
      {
        url: 'https://res.cloudinary.com/dusubfxgo/image/upload/v1756236772/investinpuglia/properties/palazzo-palmariggi/interior-room-4.jpg',
        alt: 'Interior room 4'
      },
      {
        url: 'https://res.cloudinary.com/dusubfxgo/image/upload/v1756236774/investinpuglia/properties/palazzo-palmariggi/exterior-detail.jpg',
        alt: 'Exterior detail'
      }
    ],
    investment: {
      potentialReturn: '15-20% annual ROI with boutique hotel conversion',
      suggestedUse: ['Boutique Hotel', 'Luxury B&B', 'Event Venue', 'Private Residence'],
      grants: ['PIA Tourism', 'Historic Restoration Fund'],
      zoning: 'Mixed use - residential/commercial'
    },
    amenities: [
      'Private garden',
      'Historic architecture',
      'Development potential',
      'Parking area'
    ],
    distanceToSea: 8,
    distanceToAirport: 45,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    featured: true,
    status: 'available'
  },
  {
    id: '2',
    title: 'Seafront Villa in Polignano a Mare',
    slug: 'seafront-villa-polignano',
    type: 'residential',
    price: 2850000,
    currency: 'EUR',
    location: {
      city: 'Polignano a Mare',
      province: 'Bari',
      region: 'Puglia'
    },
    details: {
      squareMeters: 450,
      landSquareMeters: 2000,
      bedrooms: 6,
      bathrooms: 5,
      floors: 2,
      yearBuilt: 2018,
      condition: 'new'
    },
    description: {
      short: 'Stunning modern villa with direct sea access and panoramic views of the Adriatic.',
      full: 'Contemporary luxury villa positioned on the dramatic cliffs of Polignano a Mare with private access to the crystal-clear waters below.',
      features: [
        'Direct sea access',
        'Infinity pool',
        'Smart home technology',
        'Wine cellar',
        'Guest house'
      ],
      investmentPotential: 'Premium vacation rental generating €3,000-5,000 per week in high season.'
    },
    images: [
      {
        url: 'https://res.cloudinary.com/dusubfxgo/image/upload/v1756236775/investinpuglia/properties/generic/villa-polignano.jpg',
        alt: 'Villa exterior with sea view',
        isPrimary: true
      }
    ],
    investment: {
      potentialReturn: '12-15% annual ROI',
      suggestedUse: ['Luxury Vacation Rental', 'Private Residence'],
      grants: ['Tourism Development Grant']
    },
    amenities: [
      'Swimming pool',
      'Sea access',
      'Garden',
      'Garage',
      'Security system'
    ],
    distanceToSea: 0,
    distanceToAirport: 55,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
    featured: true,
    status: 'available'
  },
  {
    id: '3',
    title: 'Trulli Complex in Alberobello',
    slug: 'trulli-complex-alberobello',
    type: 'historic',
    price: 680000,
    currency: 'EUR',
    location: {
      city: 'Alberobello',
      province: 'Bari',
      region: 'Puglia'
    },
    details: {
      squareMeters: 280,
      landSquareMeters: 8000,
      bedrooms: 7,
      bathrooms: 4,
      condition: 'renovated'
    },
    description: {
      short: 'Authentic UNESCO World Heritage trulli complex with 7 cones, fully restored.',
      full: 'Unique opportunity to own a piece of UNESCO World Heritage in the heart of Alberobello. This complex of interconnected trulli has been lovingly restored while maintaining all original features.',
      features: [
        'UNESCO World Heritage site',
        '7 traditional cones',
        'Original stone construction',
        'Modern amenities',
        'Large olive grove'
      ],
      investmentPotential: 'Established B&B with 80% occupancy rate, generating €80,000-100,000 annually.'
    },
    images: [
      {
        url: 'https://res.cloudinary.com/dusubfxgo/image/upload/v1756236779/investinpuglia/properties/generic/trulli-alberobello.jpg',
        alt: 'Trulli complex exterior',
        isPrimary: true
      }
    ],
    investment: {
      potentialReturn: '14-18% annual ROI',
      suggestedUse: ['Boutique B&B', 'Vacation Rental', 'Cultural Tourism'],
      grants: ['UNESCO Heritage Grant', 'Rural Tourism Development']
    },
    amenities: [
      'Swimming pool',
      'Olive grove',
      'Traditional kitchen',
      'Parking',
      'Garden'
    ],
    distanceToSea: 20,
    distanceToAirport: 65,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    featured: false,
    status: 'available'
  }
]