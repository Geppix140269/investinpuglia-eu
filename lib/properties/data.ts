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
      potentialReturn: '26% annual ROI with Mini PIA grant (5% property appreciation)',
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
      potentialReturn: '26% annual ROI with Mini PIA grant (5% property appreciation)',
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
      potentialReturn: '26% annual ROI with Mini PIA grant (5% property appreciation)',
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
  },
  {
    id: '4',
    title: 'Historic Masseria with 8.3 Hectares - Martina Franca',
    slug: 'masseria-martina-franca',
    type: 'historic',
    price: 700000,
    currency: 'EUR',
    location: {
      city: 'Martina Franca',
      province: 'Taranto',
      region: 'Puglia'
    },
    details: {
      squareMeters: 818,
      landSquareMeters: 83000,
      floors: 2,
      yearBuilt: 1800,
      condition: 'to-renovate'
    },
    description: {
      short: 'Early 19th-century masseria with trulli complex (8 cones), 818 sqm interior on 8.3 hectares, perfect for boutique hotel conversion with 24 beds planned.',
      full: 'Ancient masseria dating from the early nineteenth century, partly to be restored in the prestigious Barratta district. Features main structure with 2 residential units, trulli complex with 8 cones, planned dining room for 50 seats, wood-burning oven, and large open space. Property includes barnyard of approximately 4,000 sqm.',
      features: [
        'Early 19th century historic building',
        'Trulli complex with 8 cones',
        'Planned capacity for 24 beds',
        'Dining room for 50 guests',
        'Traditional wood-burning oven',
        '8.3 hectares of land',
        'Partially restored structure'
      ],
      investmentPotential: 'Ideal Mini PIA candidate - historic 19th-century property requiring partial restoration, planned for 24-bed accommodation facility with restaurant. Perfect for boutique hotel or agriturismo conversion.'
    },
    images: [
      {
        url: 'https://images.gate-away.com/properties2/2243/520414/main/800/Main_image.jpg',
        alt: 'Masseria Martina Franca exterior',
        isPrimary: true
      }
    ],
    investment: {
      potentialReturn: '26% annual ROI with Mini PIA grant (5% property appreciation)',
      suggestedUse: ['Boutique Hotel', 'Agriturismo', 'Wedding Venue', 'Rural Resort'],
      grants: ['Mini PIA Tourism', 'Rural Development Fund', 'Historic Restoration Grant'],
      zoning: 'Agricultural with tourism development permitted'
    },
    amenities: [
      'Trulli complex',
      'Wood-burning oven',
      'Large courtyard',
      'Agricultural land',
      'Development potential'
    ],
    distanceToSea: 25,
    distanceToAirport: 70,
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25'),
    featured: true,
    status: 'available'
  },
  {
    id: '5',
    title: 'Ancient Two-Level Masseria - Ceglie Messapica',
    slug: 'masseria-ceglie-messapica',
    type: 'historic',
    price: 590000,
    currency: 'EUR',
    location: {
      city: 'Ceglie Messapica',
      province: 'Brindisi',
      region: 'Puglia'
    },
    details: {
      squareMeters: 583,
      landSquareMeters: 490000,
      floors: 2,
      yearBuilt: 1700,
      condition: 'to-renovate'
    },
    description: {
      short: 'Ancient masseria on two levels with 583 sqm, stone rooms, partial trulli, on 49 hectares of land in the prestigious Fedele Grande district.',
      full: 'Ancient masseria on two levels in the Fedele Grande district. Ground floor features numerous stone rooms with partial trulli and wood-burning oven (480 sqm). First floor in rustic state with star vaulted rooms and fireplace (103 sqm). Set on 49 hectares of mostly arable land and woodland with cisterns and potential aqueduct connection.',
      features: [
        'Historic stone construction',
        'Star vaulted ceilings',
        'Partial trulli structures',
        'Traditional fireplace',
        'Wood-burning oven',
        '49 hectares of land',
        'Cisterns for water storage',
        'ENEL electricity available'
      ],
      investmentPotential: 'Excellent Mini PIA opportunity - historic masseria requiring full restoration, 583 sqm allows for 10-12 guest rooms plus common areas. Large land holding perfect for agricultural tourism activities.'
    },
    images: [
      {
        url: 'https://images.gate-away.com/properties2/2243/488192/main/800/Main_image.jpg',
        alt: 'Masseria Ceglie Messapica exterior',
        isPrimary: true
      }
    ],
    investment: {
      potentialReturn: '26% annual ROI with Mini PIA grant (5% property appreciation)',
      suggestedUse: ['Luxury Agriturismo', 'Boutique Resort', 'Organic Farm Stay', 'Wellness Retreat'],
      grants: ['Mini PIA Tourism', 'Agricultural Development Fund', 'Historic Building Restoration'],
      zoning: 'Agricultural with tourism permitted'
    },
    amenities: [
      'Star vaulted ceilings',
      'Traditional oven',
      'Fireplace',
      'Cisterns',
      'Extensive agricultural land',
      'Woodland areas'
    ],
    distanceToSea: 20,
    distanceToAirport: 40,
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22'),
    featured: false,
    status: 'available'
  },
  {
    id: '5',
    title: 'Trulli Complex with Development Potential - Noci',
    slug: 'trulli-complex-noci-poltri',
    type: 'historic',
    price: 330000,
    currency: 'EUR',
    location: {
      city: 'Noci',
      province: 'Bari',
      region: 'Puglia',
      coordinates: {
        lat: 40.7935,
        lng: 17.1269
      }
    },
    details: {
      squareMeters: 350,
      landSquareMeters: 3000,
      floors: 1,
      yearBuilt: 1800,
      condition: 'partially-renovated'
    },
    description: {
      short: 'Unique trulli complex between Alberobello and Noci - partially renovated with significant development potential for B&B or multiple residences.',
      full: 'Exceptional investment opportunity in Contrada Poltri, strategically positioned between the UNESCO World Heritage site of Alberobello and the charming town of Noci. This remarkable property features a recently renovated trulli group alongside historic structures awaiting restoration, offering incredible flexibility for investors. The complex includes 5 additional trulli and 4 ancient stables (2 large, 2 small) ready for transformation.',
      features: [
        'Recently renovated trulli with modern amenities',
        'Living room with wooden mezzanine',
        'Fully equipped kitchen and large bathroom',
        'Restored stable with original architectural features',
        '5 additional trulli for restoration',
        '4 historic stables for conversion',
        'Climate control system installed in renovated section',
        'Water cisterns on property',
        'Electricity already connected',
        '3,000 sqm of developable land'
      ],
      investmentPotential: 'Prime opportunity for B&B development with Mini PIA grant eligibility up to 55% funding. Potential to create 6-8 independent rental units generating €800-1,200 per unit weekly in peak season. Strategic location between two major tourist destinations ensures year-round rental demand.'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1599744331477-5e3a1e4dee87?w=800&h=600&fit=crop',
        alt: 'Trulli complex exterior view',
        isPrimary: true
      },
      {
        url: 'https://images.unsplash.com/photo-1630618358535-79ab16a2f36e?w=800&h=600&fit=crop',
        alt: 'Renovated trulli entrance'
      },
      {
        url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
        alt: 'Interior living space with traditional architecture'
      },
      {
        url: 'https://images.unsplash.com/photo-1601919788948-bccb502de09f?w=800&h=600&fit=crop',
        alt: 'Traditional stone architecture'
      },
      {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
        alt: 'Restored interior space'
      },
      {
        url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
        alt: 'Kitchen area'
      },
      {
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop',
        alt: 'Bathroom with modern fixtures'
      },
      {
        url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
        alt: 'Trulli structures in Puglia'
      },
      {
        url: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&h=600&fit=crop',
        alt: 'Property grounds and landscape'
      },
      {
        url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
        alt: 'Additional structures for development'
      }
    ],
    investment: {
      potentialReturn: '35% annual ROI with Mini PIA grant for trulli restoration (55% funding)',
      suggestedUse: ['Luxury B&B', 'Multiple Vacation Rentals', 'Boutique Hotel', 'Private Estate with Guest Houses'],
      grants: ['Mini PIA Tourism (55% for trulli)', 'NRRP Historic Restoration', 'Regional Tourism Development Fund'],
      zoning: 'Mixed use - residential/tourism'
    },
    amenities: [
      'Partially renovated',
      'Climate control',
      'Water cisterns',
      'Electricity connected',
      'Development land',
      'Original architectural features',
      'Private grounds',
      'Multiple structures'
    ],
    distanceToSea: 33,
    distanceToAirport: 80,
    createdAt: new Date('2024-12-30'),
    updatedAt: new Date('2024-12-30'),
    featured: true,
    status: 'available'
  }
]

// Property listings courtesy of Gate-away.com