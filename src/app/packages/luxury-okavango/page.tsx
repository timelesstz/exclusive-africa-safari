'use client'

import ItineraryDetail from '@/components/ItineraryDetail'
import { images } from '@/data/images'

const itineraryData = {
  title: "Luxury Okavango Delta Safari",
  subtitle: "Experience the pristine wilderness of Botswana's Okavango Delta in exclusive luxury camps",
  duration: "5 Days / 4 Nights",
  destinations: ["Okavango Delta", "Moremi Game Reserve"],
  highlights: [
    "Exclusive water and land safari activities",
    "Mokoro (dugout canoe) excursions",
    "Big Five game viewing",
    "Scenic helicopter flight over the Delta",
    "Luxury tented camp experience",
    "Night game drives in private concession"
  ],
  pricing: {
    startingPrice: 5499,
    included: [
      "Luxury tented accommodation",
      "All meals and beverages (including premium drinks)",
      "Private guide and safari vehicle",
      "Scenic helicopter transfer",
      "All safari activities",
      "Park and conservation fees",
      "Laundry service",
      "Emergency evacuation insurance"
    ],
    excluded: [
      "International and regional flights",
      "Visa fees",
      "Travel insurance",
      "Premium imported spirits",
      "Gratuities",
      "Personal shopping",
      "Spa treatments"
    ]
  },
  groupSize: {
    min: 2,
    max: 8
  },
  weather: {
    season: "Peak Season (July to October)",
    temperature: "10°C to 28°C (50°F to 82°F)",
    rainfall: "Dry season with clear skies",
    highlights: [
      "Best game viewing conditions",
      "Pleasant daytime temperatures",
      "Cool evenings perfect for sundowners",
      "Minimal mosquito activity"
    ]
  },
  packingList: [
    {
      category: "Safari Wear",
      items: [
        "Neutral colored clothing",
        "Light layers for temperature changes",
        "Sun hat and sunglasses",
        "Comfortable walking shoes",
        "Swimwear for pool",
        "Smart casual wear for dinners"
      ]
    },
    {
      category: "Equipment",
      items: [
        "Camera and extra batteries",
        "Binoculars",
        "Universal power adapter",
        "Small backpack for activities",
        "Waterproof bag for electronics"
      ]
    },
    {
      category: "Essentials",
      items: [
        "Sunscreen (high SPF)",
        "Insect repellent",
        "Personal medications",
        "Hand sanitizer",
        "Lip balm with SPF",
        "Reusable water bottle"
      ]
    }
  ],
  days: [
    {
      title: "Arrival in Okavango Delta",
      description: "Arrive at Maun International Airport and take a scenic helicopter flight to your luxury camp in the heart of the Delta. Afternoon water-based safari activity.",
      activities: [
        "Scenic helicopter transfer",
        "Camp orientation",
        "Afternoon mokoro excursion",
        "Sunset drinks and dinner"
      ],
      meals: {
        lunch: "Light lunch at the camp",
        dinner: "Gourmet dinner under the stars"
      },
      accommodation: {
        name: "Eagle Island Lodge",
        description: "A luxury lodge situated on a private island in the Okavango Delta, offering exclusive water-based safari experiences and stunning views.",
        image: images.packages.eagleIsland
      },
      location: {
        name: "Okavango Delta",
        coordinates: [23.1089, -19.2833],
        description: "Heart of the Okavango Delta, a UNESCO World Heritage site"
      }
    },
    {
      title: "Water and Land Safari Activities",
      description: "Full day of mixed safari activities, including mokoro excursions, walking safaris, and game drives in the surrounding area.",
      activities: [
        "Morning game drive",
        "Guided walking safari",
        "Afternoon mokoro excursion",
        "Night game drive"
      ],
      meals: {
        breakfast: "Full breakfast at the lodge",
        lunch: "Picnic lunch during activities",
        dinner: "Traditional boma dinner"
      },
      accommodation: {
        name: "Eagle Island Lodge",
        description: "A luxury lodge situated on a private island in the Okavango Delta, offering exclusive water-based safari experiences and stunning views.",
        image: images.packages.eagleIsland
      },
      location: {
        name: "Okavango Delta",
        coordinates: [23.1089, -19.2833],
        description: "Pristine wilderness of the Delta's waterways"
      }
    },
    {
      title: "Moremi Game Reserve",
      description: "Full day game drive in the famous Moremi Game Reserve, known for its diverse wildlife and stunning landscapes.",
      activities: [
        "Full day game drive",
        "Bird watching",
        "Predator tracking",
        "Sundowner in the bush"
      ],
      meals: {
        breakfast: "Early morning breakfast",
        lunch: "Packed lunch in the bush",
        dinner: "Fine dining at the lodge"
      },
      accommodation: {
        name: "Eagle Island Lodge",
        description: "A luxury lodge situated on a private island in the Okavango Delta, offering exclusive water-based safari experiences and stunning views.",
        image: images.packages.eagleIsland
      },
      location: {
        name: "Moremi Game Reserve",
        coordinates: [23.5007, -19.1383],
        description: "The first protected area of the Okavango Delta"
      }
    }
  ]
}

export default function LuxuryOkavangoPage() {
  return <ItineraryDetail {...itineraryData} />
} 