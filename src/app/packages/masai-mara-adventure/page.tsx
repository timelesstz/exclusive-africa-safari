'use client'

import ItineraryDetail from '@/components/ItineraryDetail'
import { images } from '@/data/images'

const itineraryData = {
  title: "Masai Mara Adventure",
  subtitle: "Explore Kenya's most famous reserve and meet the Maasai people in this cultural and wildlife experience",
  duration: "6 Days / 5 Nights",
  destinations: ["Masai Mara National Reserve", "Maasai Village"],
  highlights: [
    "Big Five game viewing",
    "Great Migration (seasonal)",
    "Hot air balloon safari",
    "Maasai village visit",
    "Bush walks with Maasai guides",
    "Sundowners in the savannah"
  ],
  pricing: {
    startingPrice: 2999,
    included: [
      "Luxury tented accommodation",
      "All meals and beverages",
      "Private safari vehicle and guide",
      "Hot air balloon safari",
      "Park entrance fees",
      "Cultural village visit",
      "Airport transfers",
      "Flying doctors evacuation coverage"
    ],
    excluded: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Premium spirits",
      "Gratuities",
      "Personal items",
      "Spa treatments"
    ]
  },
  groupSize: {
    min: 2,
    max: 6
  },
  weather: {
    season: "Peak Season (July to October)",
    temperature: "20°C to 30°C (68°F to 86°F)",
    rainfall: "Minimal during dry season",
    highlights: [
      "Great Migration season",
      "Clear skies perfect for photography",
      "Comfortable temperatures",
      "Best wildlife viewing conditions"
    ]
  },
  packingList: [
    {
      category: "Safari Attire",
      items: [
        "Neutral colored clothing",
        "Warm jacket for morning game drives",
        "Sun hat and sunglasses",
        "Sturdy walking shoes",
        "Light rain jacket",
        "Smart casual wear for evenings"
      ]
    },
    {
      category: "Photography",
      items: [
        "Camera with zoom lens",
        "Extra memory cards",
        "Charging equipment",
        "Binoculars",
        "Dust-proof camera bag"
      ]
    },
    {
      category: "Personal Items",
      items: [
        "High SPF sunscreen",
        "Insect repellent",
        "First aid kit",
        "Prescription medications",
        "Reusable water bottle",
        "Power bank"
      ]
    }
  ],
  days: [
    {
      title: "Arrival in Nairobi",
      description: "Arrive at Jomo Kenyatta International Airport and transfer to your hotel in Nairobi. Evening briefing about your upcoming safari adventure.",
      activities: [
        "Airport meet and greet",
        "Transfer to hotel",
        "Safari briefing",
        "Welcome dinner"
      ],
      meals: {
        dinner: "Welcome dinner at hotel restaurant"
      },
      accommodation: {
        name: "Nairobi Serena Hotel",
        description: "A luxury hotel in the heart of Nairobi, offering comfortable rooms and excellent dining options.",
        image: images.packages.nairobiSerena
      },
      location: {
        name: "Nairobi",
        coordinates: [-1.2921, 36.8219],
        description: "Kenya's vibrant capital city"
      }
    },
    {
      title: "Journey to Masai Mara",
      description: "Morning flight to Masai Mara, followed by a game drive en route to your luxury tented camp. Afternoon game drive in search of the Big Five.",
      activities: [
        "Flight to Masai Mara",
        "Game drive to camp",
        "Afternoon game drive",
        "Sundowner drinks"
      ],
      meals: {
        breakfast: "Breakfast at hotel",
        lunch: "Lunch at the camp",
        dinner: "Dinner under the stars"
      },
      accommodation: {
        name: "Mara Serena Safari Lodge",
        description: "A stunning lodge perched on a hill with panoramic views of the Mara plains, featuring traditional Maasai-inspired architecture.",
        image: images.packages.maraSerena
      },
      location: {
        name: "Masai Mara",
        coordinates: [-1.5024, 35.1532],
        description: "The world-famous Masai Mara National Reserve"
      }
    },
    {
      title: "Hot Air Balloon Safari",
      description: "Early morning hot air balloon safari followed by a champagne breakfast. Afternoon game drive and visit to a Maasai village.",
      activities: [
        "Hot air balloon safari",
        "Champagne breakfast",
        "Afternoon game drive",
        "Maasai village visit"
      ],
      meals: {
        breakfast: "Champagne breakfast in the bush",
        lunch: "Picnic lunch",
        dinner: "Dinner at the lodge"
      },
      accommodation: {
        name: "Mara Serena Safari Lodge",
        description: "A stunning lodge perched on a hill with panoramic views of the Mara plains, featuring traditional Maasai-inspired architecture.",
        image: images.packages.maraSerena
      },
      location: {
        name: "Masai Mara",
        coordinates: [-1.5024, 35.1532],
        description: "The vast savannah of the Mara"
      }
    }
  ]
}

export default function MasaiMaraPage() {
  return <ItineraryDetail {...itineraryData} />
} 