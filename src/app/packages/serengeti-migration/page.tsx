'use client'

import dynamic from 'next/dynamic'
import { images } from '@/data/images'

// Dynamically import the ItineraryDetail component
const DynamicItineraryDetail = dynamic(() => import('@/components/ItineraryDetail'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      <div className="h-[70vh] bg-gray-200" />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    </div>
  )
})

const itineraryData = {
  title: "Serengeti Migration Safari",
  subtitle: "Follow the Great Migration through Tanzania's most iconic wildlife destinations",
  duration: "7 Days / 6 Nights",
  destinations: ["Serengeti National Park", "Ngorongoro Crater"],
  highlights: [
    "Witness the Great Migration in the Serengeti",
    "Game drives in the Ngorongoro Crater",
    "Visit to authentic Maasai village",
    "Luxury lodge and tented camp accommodation",
    "Professional wildlife photography opportunities",
    "Sundowners in the African bush"
  ],
  pricing: {
    startingPrice: 3999,
    included: [
      "All accommodations as specified",
      "All meals during safari",
      "Private safari vehicle and guide",
      "Park entrance and conservation fees",
      "Airport transfers",
      "Bottled water during game drives",
      "Flying doctors emergency evacuation cover",
      "All government taxes and levies"
    ],
    excluded: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Personal items and souvenirs",
      "Gratuities for guides and staff",
      "Optional activities not specified",
      "Alcoholic beverages"
    ]
  },
  groupSize: {
    min: 2,
    max: 6
  },
  weather: {
    season: "Dry Season (June to October)",
    temperature: "20°C to 30°C (68°F to 86°F)",
    rainfall: "Minimal rainfall, clear skies",
    highlights: [
      "Perfect visibility for game viewing",
      "Comfortable daytime temperatures",
      "Cool mornings and evenings",
      "Low mosquito activity"
    ]
  },
  packingList: [
    {
      category: "Clothing",
      items: [
        "Neutral-colored safari wear",
        "Light jacket or fleece",
        "Wide-brimmed hat",
        "Comfortable walking shoes",
        "Swimwear",
        "Evening wear for dinners"
      ]
    },
    {
      category: "Photography",
      items: [
        "Camera and lenses",
        "Extra memory cards",
        "Charging equipment",
        "Dust-proof camera bag",
        "Binoculars"
      ]
    },
    {
      category: "Personal Items",
      items: [
        "Sunscreen and insect repellent",
        "Prescription medications",
        "Sunglasses",
        "Personal toiletries",
        "Power adapter",
        "Small daypack"
      ]
    }
  ],
  days: [
    {
      title: "Arrival in Arusha",
      description: "Welcome to Tanzania! Upon arrival at Kilimanjaro International Airport, you'll be met by your guide and transferred to your luxury lodge in Arusha.",
      activities: [
        "Airport meet and greet",
        "Transfer to Arusha",
        "Welcome dinner",
        "Safari briefing"
      ],
      meals: {
        dinner: "Welcome dinner at the lodge"
      },
      accommodation: {
        name: "Arusha Serena Hotel",
        description: "A luxury hotel set among coffee plantations with views of Mount Meru, featuring elegant rooms, a swimming pool, and beautiful gardens.",
        image: images.packages.arushaSerena
      },
      location: {
        name: "Arusha",
        coordinates: [36.6827, -3.3869] as [number, number],
        description: "Your journey begins in Arusha, the safari capital of Tanzania"
      }
    },
    {
      title: "Ngorongoro Crater",
      description: "After breakfast, drive to Ngorongoro Conservation Area. Afternoon game drive in the crater, a UNESCO World Heritage Site.",
      activities: [
        "Scenic drive to Ngorongoro",
        "Afternoon crater game drive",
        "Sundowner at crater rim",
        "Evening presentation on crater ecology"
      ],
      meals: {
        breakfast: "Breakfast at Arusha Serena",
        lunch: "Packed lunch for game drive",
        dinner: "Dinner at the lodge"
      },
      accommodation: {
        name: "Ngorongoro Serena Safari Lodge",
        description: "Perched on the crater rim, this lodge offers stunning views and traditional African architecture, blending perfectly with its surroundings.",
        image: images.packages.ngorongoroSerena
      },
      location: {
        name: "Ngorongoro Crater",
        coordinates: [35.5889, -3.2444] as [number, number],
        description: "Explore the world's largest intact volcanic caldera"
      }
    },
    {
      title: "Serengeti National Park",
      description: "Early morning departure for the Serengeti. Game drive en route to your luxury tented camp, following the wildebeest migration.",
      activities: [
        "Morning drive to Serengeti",
        "Game viewing en route",
        "Afternoon game drive",
        "Evening wildlife presentation"
      ],
      meals: {
        breakfast: "Breakfast at the lodge",
        lunch: "Picnic lunch in the bush",
        dinner: "Dinner at the camp"
      },
      accommodation: {
        name: "Serengeti Migration Camp",
        description: "Luxury tented camp overlooking the Grumeti River, offering an authentic safari experience with modern comforts.",
        image: images.packages.migrationCamp
      },
      location: {
        name: "Central Serengeti",
        coordinates: [34.8888, -2.3333] as [number, number],
        description: "Heart of the Serengeti, prime location for witnessing the Great Migration"
      }
    }
  ]
}

export default function SerengetiMigrationPage() {
  return <DynamicItineraryDetail {...itineraryData} />
} 