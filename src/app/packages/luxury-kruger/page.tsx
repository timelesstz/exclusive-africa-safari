'use client'

import ItineraryDetail from '@/components/ItineraryDetail'
import { images } from '@/data/images'

const itineraryData = {
  title: "Luxury Kruger Safari",
  subtitle: "Experience the ultimate in luxury safari accommodation while exploring South Africa's premier wildlife destination",
  duration: "7 Days / 6 Nights",
  destinations: ["Sabi Sand Game Reserve", "Kruger National Park"],
  highlights: [
    "Big Five game viewing",
    "Luxury lodge accommodation",
    "Private plunge pools",
    "Night game drives",
    "Walking safaris",
    "Wine tasting experiences",
    "Spa treatments"
  ],
  pricing: {
    startingPrice: 4999,
    included: [
      "Ultra-luxury lodge accommodation",
      "All meals and premium beverages",
      "Private guide and vehicle",
      "Twice daily game drives",
      "Walking safaris",
      "Park and conservation fees",
      "Laundry service",
      "Airport transfers",
      "Emergency evacuation insurance"
    ],
    excluded: [
      "International and regional flights",
      "Visa fees",
      "Travel insurance",
      "Premium imported spirits",
      "Gratuities",
      "Spa treatments",
      "Curio shop purchases"
    ]
  },
  groupSize: {
    min: 2,
    max: 6
  },
  weather: {
    season: "Best Season (May to September)",
    temperature: "10°C to 25°C (50°F to 77°F)",
    rainfall: "Dry winter season",
    highlights: [
      "Best game viewing conditions",
      "Minimal rainfall",
      "Clear skies",
      "Pleasant daytime temperatures",
      "Cool evenings perfect for fireside dining"
    ]
  },
  packingList: [
    {
      category: "Safari Wear",
      items: [
        "Neutral colored clothing",
        "Warm layers for morning/evening",
        "Sun hat and sunglasses",
        "Comfortable walking shoes",
        "Smart casual wear for dinners",
        "Swimming costume"
      ]
    },
    {
      category: "Photography",
      items: [
        "Professional camera equipment",
        "Extra memory cards",
        "Charging equipment",
        "Binoculars",
        "Bean bag for camera support"
      ]
    },
    {
      category: "Personal Items",
      items: [
        "Sunscreen and lip balm",
        "Insect repellent",
        "Personal medications",
        "Small flashlight",
        "Power bank",
        "Adaptor for South African plugs"
      ]
    }
  ],
  days: [
    {
      title: "Arrival at Sabi Sand",
      description: "Arrive at Skukuza Airport and transfer to your ultra-luxury lodge in the Sabi Sand Game Reserve. Afternoon game drive followed by welcome dinner.",
      activities: [
        "Airport transfer",
        "Lodge orientation",
        "Afternoon game drive",
        "Welcome dinner"
      ],
      meals: {
        lunch: "Light lunch at the lodge",
        dinner: "Gourmet welcome dinner"
      },
      accommodation: {
        name: "Lion Sands River Lodge",
        description: "An ultra-luxury lodge offering unparalleled views of the Sabie River, featuring private plunge pools and world-class amenities.",
        image: images.packages.lionSands
      },
      location: {
        name: "Sabi Sand Game Reserve",
        coordinates: [-24.8433, 31.5333],
        description: "Premier private game reserve adjacent to Kruger National Park"
      }
    },
    {
      title: "Safari Activities",
      description: "Full day of safari activities including morning and afternoon game drives, guided bush walk, and optional spa treatment.",
      activities: [
        "Morning game drive",
        "Guided bush walk",
        "Optional spa treatment",
        "Evening game drive"
      ],
      meals: {
        breakfast: "Full breakfast at lodge",
        lunch: "À la carte lunch",
        dinner: "Boma dinner under the stars"
      },
      accommodation: {
        name: "Lion Sands River Lodge",
        description: "An ultra-luxury lodge offering unparalleled views of the Sabie River, featuring private plunge pools and world-class amenities.",
        image: images.packages.lionSands
      },
      location: {
        name: "Sabi Sand Game Reserve",
        coordinates: [-24.8433, 31.5333],
        description: "Prime Big Five territory"
      }
    },
    {
      title: "Exclusive Game Viewing",
      description: "Early morning game drive focusing on predator tracking, followed by a wine tasting experience and an afternoon game drive.",
      activities: [
        "Predator tracking",
        "Wine tasting",
        "Afternoon game drive",
        "Stargazing dinner"
      ],
      meals: {
        breakfast: "Bush breakfast",
        lunch: "Wine pairing lunch",
        dinner: "Private deck dining"
      },
      accommodation: {
        name: "Lion Sands River Lodge",
        description: "An ultra-luxury lodge offering unparalleled views of the Sabie River, featuring private plunge pools and world-class amenities.",
        image: images.packages.lionSands
      },
      location: {
        name: "Sabi Sand Game Reserve",
        coordinates: [-24.8433, 31.5333],
        description: "Exclusive wildlife viewing area"
      }
    }
  ]
}

export default function LuxuryKrugerPage() {
  return <ItineraryDetail {...itineraryData} />
} 