'use client'

import ItineraryDetail from '@/components/ItineraryDetail'
import { images } from '@/data/images'

const itineraryData = {
  title: "Victoria Falls & Zambezi Safari",
  subtitle: "Experience the majestic Victoria Falls and explore the wildlife-rich Zambezi National Park",
  duration: "5 Days / 4 Nights",
  destinations: ["Victoria Falls", "Zambezi National Park"],
  highlights: [
    "Guided tour of Victoria Falls",
    "Sunset cruise on the Zambezi River",
    "Game drives in Zambezi National Park",
    "Optional adventure activities",
    "Luxury riverside accommodation",
    "Cultural village visit"
  ],
  pricing: {
    startingPrice: 2499,
    included: [
      "Luxury hotel accommodation",
      "All meals and beverages",
      "Private guide and vehicle",
      "Victoria Falls tour",
      "Sunset cruise",
      "Game drives",
      "Park entrance fees",
      "Airport transfers"
    ],
    excluded: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Optional activities",
      "Gratuities",
      "Personal items",
      "Premium drinks"
    ]
  },
  groupSize: {
    min: 2,
    max: 8
  },
  weather: {
    season: "Best Season (May to October)",
    temperature: "15°C to 29°C (59°F to 84°F)",
    rainfall: "Dry season with clear skies",
    highlights: [
      "Best views of Victoria Falls",
      "Pleasant temperatures",
      "Excellent game viewing",
      "Perfect for outdoor activities"
    ]
  },
  packingList: [
    {
      category: "Clothing",
      items: [
        "Light, breathable clothing",
        "Waterproof jacket (for Falls spray)",
        "Sun hat and sunglasses",
        "Comfortable walking shoes",
        "Smart casual wear for dinners",
        "Swimwear"
      ]
    },
    {
      category: "Equipment",
      items: [
        "Camera (waterproof recommended)",
        "Binoculars",
        "Universal power adapter",
        "Day pack",
        "Dry bag for electronics"
      ]
    },
    {
      category: "Essentials",
      items: [
        "Sunscreen",
        "Insect repellent",
        "Personal medications",
        "Hand sanitizer",
        "Cash for optional activities",
        "Passport"
      ]
    }
  ],
  days: [
    {
      title: "Arrival at Victoria Falls",
      description: "Arrive at Victoria Falls Airport and transfer to your luxury hotel. Afternoon guided tour of the magnificent Victoria Falls, followed by a sunset cruise on the Zambezi River.",
      activities: [
        "Airport transfer",
        "Victoria Falls tour",
        "Sunset cruise",
        "Welcome dinner"
      ],
      meals: {
        lunch: "Light lunch at hotel",
        dinner: "Welcome dinner with river views"
      },
      accommodation: {
        name: "Victoria Falls Hotel",
        description: "A historic luxury hotel with stunning views of the Victoria Falls Bridge and the spray of the Falls.",
        image: images.packages.victoriaFallsHotel
      },
      location: {
        name: "Victoria Falls",
        coordinates: [-17.9243, 25.8572],
        description: "One of the Seven Natural Wonders of the World"
      }
    },
    {
      title: "Zambezi National Park Safari",
      description: "Full day game drive in Zambezi National Park, known for its diverse wildlife including elephants, lions, and numerous bird species.",
      activities: [
        "Morning game drive",
        "Riverside picnic lunch",
        "Afternoon game drive",
        "Sundowner drinks"
      ],
      meals: {
        breakfast: "Full breakfast at hotel",
        lunch: "Picnic lunch in the park",
        dinner: "Dinner at hotel restaurant"
      },
      accommodation: {
        name: "Victoria Falls Hotel",
        description: "A historic luxury hotel with stunning views of the Victoria Falls Bridge and the spray of the Falls.",
        image: images.packages.victoriaFallsHotel
      },
      location: {
        name: "Zambezi National Park",
        coordinates: [-17.9514, 25.7967],
        description: "Wildlife sanctuary along the Zambezi River"
      }
    },
    {
      title: "Adventure Activities & Cultural Visit",
      description: "Morning at leisure for optional activities (helicopter flight, bungee jumping, or white-water rafting). Afternoon visit to a local village for cultural insights.",
      activities: [
        "Optional adventure activities",
        "Cultural village visit",
        "Traditional dance performance",
        "Craft market visit"
      ],
      meals: {
        breakfast: "Breakfast at hotel",
        lunch: "Lunch at local restaurant",
        dinner: "Traditional African dinner"
      },
      accommodation: {
        name: "Victoria Falls Hotel",
        description: "A historic luxury hotel with stunning views of the Victoria Falls Bridge and the spray of the Falls.",
        image: images.packages.victoriaFallsHotel
      },
      location: {
        name: "Victoria Falls Town",
        coordinates: [-17.9243, 25.8572],
        description: "Historic town near the magnificent Falls"
      }
    }
  ]
}

export default function VictoriaFallsPage() {
  return <ItineraryDetail {...itineraryData} />
} 