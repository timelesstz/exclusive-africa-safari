export interface SafariPackage {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  duration: string
  location: string
  startingPrice: string
  image: string
  featured: boolean
  groupSize: string
  nextDeparture: string
  highlights: string[]
  inclusions: string[]
  exclusions: string[]
  itinerary: {
    day: number
    title: string
    description: string
    accommodation: string
    meals: string
    coordinates: [number, number] // [longitude, latitude]
  }[]
  images: string[]
  accommodations: {
    name: string
    description: string
    image: string
  }[]
}

export const safariPackages: SafariPackage[] = [
  {
    id: '1',
    slug: 'serengeti-migration',
    title: "Serengeti Migration Safari",
    subtitle: "Follow the Great Migration through Tanzania's most iconic wildlife destinations",
    description: "Experience the world's greatest wildlife spectacle as over two million wildebeest, zebra, and gazelle make their annual migration through the Serengeti ecosystem. This carefully crafted safari takes you to the heart of the action, with expert guides who know exactly where to find the herds.",
    duration: '7 Days / 6 Nights',
    location: 'Tanzania',
    startingPrice: 'From $3,999',
    image: '/images/serengeti-1.jpg',
    featured: true,
    groupSize: '2-6 guests',
    nextDeparture: 'June 15, 2024',
    highlights: [
      'Witness the Great Migration in action',
      'Stay in luxury tented camps',
      'Game drives in custom 4x4 vehicles',
      'Visit Ngorongoro Crater',
      'Professional wildlife photography opportunities',
      'Cultural visit to Maasai village',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Arusha',
        description: 'Arrive at Kilimanjaro International Airport and transfer to your luxury lodge in Arusha. Evening welcome dinner and safari briefing.',
        accommodation: 'Arusha Serena Hotel',
        meals: 'Dinner',
        coordinates: [36.6827, -3.3869],
      },
      {
        day: 2,
        title: 'Ngorongoro Crater',
        description: 'Drive to Ngorongoro Crater for a full-day game drive in this UNESCO World Heritage site. Spot diverse wildlife including black rhinos, lions, and flamingos.',
        accommodation: 'Ngorongoro Serena Safari Lodge',
        meals: 'Breakfast, Lunch, Dinner',
        coordinates: [35.5857, -3.2444],
      },
      {
        day: 3,
        title: 'Serengeti National Park',
        description: 'Journey to the Serengeti, game viewing en route. Afternoon game drive following the migration herds.',
        accommodation: 'Migration Camp',
        meals: 'Breakfast, Lunch, Dinner',
        coordinates: [34.8333, -2.3333],
      },
    ],
    images: [
      '/images/serengeti-1.jpg',
      '/images/serengeti-2.jpg',
      '/images/serengeti-3.jpg',
      '/images/serengeti-4.jpg',
    ],
    accommodations: [
      {
        name: 'Arusha Serena Hotel',
        description: 'Luxury lodge set in tropical gardens with mountain views',
        image: '/images/arusha-serena.jpg',
      },
      {
        name: 'Ngorongoro Serena Safari Lodge',
        description: 'Stone lodge built into the crater rim with panoramic views',
        image: '/images/ngorongoro-serena.jpg',
      },
      {
        name: 'Migration Camp',
        description: 'Luxury tented camp in the heart of the Serengeti',
        image: '/images/migration-camp.jpg',
      },
    ],
    inclusions: [
      'All accommodations',
      'Professional safari guide',
      'All meals as specified',
      'Park entrance fees',
      'Game drives in 4x4 vehicle',
      'Airport transfers',
      'Flying doctors insurance',
    ],
    exclusions: [
      'International flights',
      'Visa fees',
      'Travel insurance',
      'Personal expenses',
      'Gratuities',
      'Optional activities',
    ],
  },
  {
    id: '2',
    slug: 'luxury-okavango',
    title: 'Luxury Okavango Delta',
    subtitle: "Explore Botswana's pristine wilderness in ultimate luxury",
    description: 'Discover the unique ecosystem of the Okavango Delta with its diverse wildlife and stunning landscapes. Experience water safaris, walking safaris, and game drives in this pristine wilderness.',
    duration: '5 Days / 4 Nights',
    location: 'Botswana',
    startingPrice: 'From $5,499',
    image: '/images/okavango-1.jpg',
    featured: false,
    groupSize: '2-8 guests',
    nextDeparture: 'July 1, 2024',
    highlights: [
      'Water safaris by traditional mokoro',
      'Walking safaris with expert guides',
      'Luxury lodge accommodation',
      'Bird watching opportunities',
      'Night game drives',
      'Scenic helicopter flight',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Maun',
        description: 'Arrive in Maun and take a light aircraft flight to your luxury lodge in the Okavango Delta. Afternoon water safari.',
        accommodation: 'Eagle Island Lodge',
        meals: 'Lunch, Dinner',
        coordinates: [23.4162, -19.9833],
      },
      {
        day: 2,
        title: 'Water and Land Activities',
        description: 'Morning mokoro excursion followed by an afternoon game drive. Evening sundowner cruise.',
        accommodation: 'Eagle Island Lodge',
        meals: 'Breakfast, Lunch, Dinner',
        coordinates: [23.4162, -19.9833],
      },
    ],
    images: [
      '/images/okavango-1.jpg',
      '/images/okavango-2.jpg',
      '/images/okavango-3.jpg',
    ],
    accommodations: [
      {
        name: 'Eagle Island Lodge',
        description: 'Luxury water-based lodge in the heart of the Delta',
        image: '/images/eagle-island.jpg',
      },
    ],
    inclusions: [
      'Luxury accommodation',
      'All meals and beverages',
      'Light aircraft transfers',
      'All activities',
      'National park fees',
      'Laundry service',
    ],
    exclusions: [
      'International flights',
      'Visa fees',
      'Travel insurance',
      'Premium beverages',
      'Gratuities',
    ],
  },
  {
    id: '3',
    slug: 'masai-mara-adventure',
    title: 'Masai Mara Adventure',
    subtitle: "Experience Kenya's most iconic wildlife reserve and immerse yourself in Maasai culture",
    description: "Discover the wonders of the Masai Mara, home to an incredible concentration of wildlife and the legendary Maasai people. This adventure combines exceptional game viewing with authentic cultural experiences.",
    duration: '6 Days / 5 Nights',
    location: 'Kenya',
    startingPrice: 'From $2,999',
    image: '/images/masai-mara-1.jpg',
    featured: true,
    groupSize: '2-8 guests',
    nextDeparture: 'July 15, 2024',
    highlights: [
      'Witness the Great Migration (seasonal)',
      'Visit authentic Maasai villages',
      'Hot air balloon safari option',
      'Big Five game viewing',
      'Sundowner experiences',
      'Professional photography guidance',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Nairobi',
        description: 'Welcome to Kenya! Transfer to your hotel in Nairobi. Evening briefing and welcome dinner.',
        accommodation: 'Nairobi Serena Hotel',
        meals: 'Dinner',
        coordinates: [36.8219, -1.2921],
      },
      {
        day: 2,
        title: 'Journey to Masai Mara',
        description: 'Morning drive to Masai Mara. Afternoon game drive in search of big cats.',
        accommodation: 'Mara Serena Safari Lodge',
        meals: 'Breakfast, Lunch, Dinner',
        coordinates: [35.0444, -1.5466],
      },
      {
        day: 3,
        title: 'Masai Mara Game Drives',
        description: 'Full day of game drives. Optional hot air balloon safari available.',
        accommodation: 'Mara Serena Safari Lodge',
        meals: 'Breakfast, Lunch, Dinner',
        coordinates: [35.0444, -1.5466],
      },
    ],
    images: [
      '/images/masai-mara-1.jpg',
      '/images/masai-mara-2.jpg',
      '/images/masai-mara-3.jpg',
      '/images/masai-mara-4.jpg',
    ],
    accommodations: [
      {
        name: 'Nairobi Serena Hotel',
        description: 'Luxury hotel in the heart of Nairobi',
        image: '/images/nairobi-serena.jpg',
      },
      {
        name: 'Mara Serena Safari Lodge',
        description: 'Traditional lodge with panoramic views of the Mara',
        image: '/images/mara-serena.jpg',
      },
    ],
    inclusions: [
      'All accommodations',
      'Expert safari guide',
      'All meals as specified',
      'Park entrance fees',
      'Game drives in 4x4 vehicle',
      'Airport transfers',
      'Cultural village visit',
    ],
    exclusions: [
      'International flights',
      'Visa fees',
      'Travel insurance',
      'Optional activities',
      'Gratuities',
      'Personal expenses',
    ],
  },
  {
    id: '4',
    slug: 'victoria-falls-safari',
    title: 'Victoria Falls & Zambezi Safari',
    subtitle: "Experience the majesty of Victoria Falls and wildlife along the Zambezi River",
    description: "Combine the spectacular Victoria Falls with game viewing along the mighty Zambezi River. This safari offers a perfect blend of adventure activities and wildlife experiences.",
    duration: '5 Days / 4 Nights',
    location: 'Zimbabwe',
    startingPrice: 'From $2,499',
    image: '/images/victoria-falls-1.jpg',
    featured: false,
    groupSize: '2-6 guests',
    nextDeparture: 'August 1, 2024',
    highlights: [
      'Guided tour of Victoria Falls',
      'Sunset cruise on the Zambezi',
      'Game drives in Zambezi National Park',
      'Optional adventure activities',
      'River safari experiences',
      'Cultural village visit',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival at Victoria Falls',
        description: 'Arrive at Victoria Falls Airport. Afternoon guided tour of the falls.',
        accommodation: 'Victoria Falls Hotel',
        meals: 'Dinner',
        coordinates: [25.8572, -17.9244],
      },
      {
        day: 2,
        title: 'Zambezi National Park',
        description: 'Morning game drive. Afternoon sunset cruise on the Zambezi River.',
        accommodation: 'Victoria Falls Hotel',
        meals: 'Breakfast, Lunch, Dinner',
        coordinates: [25.8572, -17.9244],
      },
    ],
    images: [
      '/images/victoria-falls-1.jpg',
      '/images/victoria-falls-2.jpg',
      '/images/victoria-falls-3.jpg',
    ],
    accommodations: [
      {
        name: 'Victoria Falls Hotel',
        description: 'Historic luxury hotel with views of Victoria Falls Bridge',
        image: '/images/victoria-falls-hotel.jpg',
      },
    ],
    inclusions: [
      'Luxury accommodation',
      'All transfers',
      'Guided falls tour',
      'Sunset cruise',
      'Game drives',
      'Most meals',
      'Park fees',
    ],
    exclusions: [
      'International flights',
      'Visa fees',
      'Travel insurance',
      'Optional activities',
      'Some meals',
      'Gratuities',
    ],
  },
  {
    id: '5',
    slug: 'kruger-luxury-safari',
    title: 'Luxury Kruger Safari',
    subtitle: "Experience South Africa's premier wildlife destination in ultimate luxury",
    description: "Discover the wildlife-rich Kruger National Park from the comfort of an exclusive private reserve. Enjoy luxury accommodations, gourmet dining, and exceptional game viewing.",
    duration: '7 Days / 6 Nights',
    location: 'South Africa',
    startingPrice: 'From $4,999',
    image: '/images/kruger-1.jpg',
    featured: true,
    groupSize: '2-6 guests',
    nextDeparture: 'June 1, 2024',
    highlights: [
      'Big Five game viewing',
      'Luxury lodge accommodation',
      'Night game drives',
      'Walking safaris',
      'Wine tasting experiences',
      'Spa treatments available',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival at Kruger',
        description: 'Fly to Skukuza Airport. Transfer to your luxury lodge. Afternoon game drive.',
        accommodation: 'Lion Sands River Lodge',
        meals: 'Lunch, Dinner',
        coordinates: [31.5927, -24.9947],
      },
      {
        day: 2,
        title: 'Sabi Sands Game Drives',
        description: 'Morning and afternoon game drives in the private reserve.',
        accommodation: 'Lion Sands River Lodge',
        meals: 'Breakfast, Lunch, Dinner',
        coordinates: [31.5927, -24.9947],
      },
    ],
    images: [
      '/images/kruger-1.jpg',
      '/images/kruger-2.jpg',
      '/images/kruger-3.jpg',
    ],
    accommodations: [
      {
        name: 'Lion Sands River Lodge',
        description: 'Luxury lodge overlooking the Sabie River',
        image: '/images/lion-sands.jpg',
      },
    ],
    inclusions: [
      'Luxury accommodation',
      'All meals and selected beverages',
      'Game drives',
      'Walking safaris',
      'Park fees',
      'Laundry service',
      'Airport transfers',
    ],
    exclusions: [
      'Flights',
      'Premium beverages',
      'Spa treatments',
      'Travel insurance',
      'Gratuities',
      'Personal items',
    ],
  }
]

export function getPackageBySlug(slug: string): SafariPackage | undefined {
  return safariPackages.find((pkg) => pkg.slug === slug)
}

export function getAllPackageSlugs(): string[] {
  return safariPackages.map((pkg) => pkg.slug)
} 