'use client'

import Image from 'next/image'
import Link from 'next/link'
import Map, { Marker, Popup } from 'react-map-gl'
import { useState } from 'react'

const destinations = [
  {
    id: 'tanzania',
    name: 'Tanzania',
    description:
      'Home to the Serengeti, Ngorongoro Crater, and Mount Kilimanjaro, Tanzania offers the quintessential East African safari experience.',
    image: '/images/tanzania.jpg',
    coordinates: [34.8888, -6.3690],
    highlights: [
      'Witness the Great Migration',
      'Visit Ngorongoro Crater',
      'Climb Mount Kilimanjaro',
      'Explore Zanzibar beaches',
    ],
    bestTimeToVisit: 'June to October (Dry Season)',
    popularParks: [
      'Serengeti National Park',
      'Ngorongoro Conservation Area',
      'Tarangire National Park',
    ],
  },
  {
    id: 'kenya',
    name: 'Kenya',
    description:
      'Kenya is renowned for its classic savannah safaris, diverse wildlife, and rich cultural heritage.',
    image: '/images/kenya.jpg',
    coordinates: [37.9062, -0.0236],
    highlights: [
      'Visit Masai Mara',
      'See Lake Nakuru flamingos',
      'Meet Maasai people',
      'Explore Amboseli',
    ],
    bestTimeToVisit: 'July to October (Migration Season)',
    popularParks: [
      'Masai Mara National Reserve',
      'Amboseli National Park',
      'Tsavo National Park',
    ],
  },
  {
    id: 'botswana',
    name: 'Botswana',
    description:
      'Botswana offers a pristine wilderness experience with its unique delta ecosystem and commitment to conservation.',
    image: '/images/botswana.jpg',
    coordinates: [24.6849, -22.3285],
    highlights: [
      'Explore Okavango Delta',
      'Visit Chobe National Park',
      'See Makgadikgadi Pans',
      'Meet San Bushmen',
    ],
    bestTimeToVisit: 'May to October (Dry Season)',
    popularParks: [
      'Okavango Delta',
      'Chobe National Park',
      'Moremi Game Reserve',
    ],
  },
]

export default function DestinationsPage() {
  const [selectedDestination, setSelectedDestination] = useState<string | null>(
    null
  )

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative">
        <div className="absolute inset-0">
          <Image
            src="/images/destinations-hero.jpg"
            alt="African landscape"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Safari Destinations
          </h1>
          <p className="mt-4 max-w-3xl text-xl text-gray-200">
            Discover the diverse landscapes and wildlife of Africa's most
            iconic safari destinations.
          </p>
        </div>
      </div>

      {/* Map section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="h-[600px] overflow-hidden rounded-lg">
          <Map
            initialViewState={{
              longitude: 25.0,
              latitude: -5.0,
              zoom: 3.5,
            }}
            style={{ width: '100%', height: '100%' }}
            mapStyle="mapbox://styles/mapbox/outdoors-v12"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          >
            {destinations.map((destination) => (
              <Marker
                key={destination.id}
                longitude={destination.coordinates[0]}
                latitude={destination.coordinates[1]}
                onClick={(e) => {
                  e.originalEvent.stopPropagation()
                  setSelectedDestination(destination.id)
                }}
              />
            ))}
            {selectedDestination && (
              <Popup
                longitude={
                  destinations.find((d) => d.id === selectedDestination)
                    ?.coordinates[0] || 0
                }
                latitude={
                  destinations.find((d) => d.id === selectedDestination)
                    ?.coordinates[1] || 0
                }
                onClose={() => setSelectedDestination(null)}
                closeButton={true}
                closeOnClick={false}
              >
                <div className="p-2">
                  <h3 className="font-medium">
                    {
                      destinations.find((d) => d.id === selectedDestination)
                        ?.name
                    }
                  </h3>
                  <p className="mt-1 text-sm">
                    {
                      destinations.find((d) => d.id === selectedDestination)
                        ?.description
                    }
                  </p>
                </div>
              </Popup>
            )}
          </Map>
        </div>
      </div>

      {/* Destinations grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="relative aspect-w-3 aspect-h-2">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-2xl font-bold text-white">
                  {destination.name}
                </h2>
                <p className="mt-2 text-gray-200">
                  {destination.description}
                </p>
                <div className="mt-4">
                  <h3 className="font-medium text-white">Highlights</h3>
                  <ul className="mt-2 space-y-1 text-sm text-gray-200">
                    {destination.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4">
                  <h3 className="font-medium text-white">
                    Best Time to Visit
                  </h3>
                  <p className="mt-1 text-sm text-gray-200">
                    {destination.bestTimeToVisit}
                  </p>
                </div>
                <div className="mt-4">
                  <h3 className="font-medium text-white">Popular Parks</h3>
                  <ul className="mt-2 space-y-1 text-sm text-gray-200">
                    {destination.popularParks.map((park) => (
                      <li key={park}>{park}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <Link
                    href={`/packages?destination=${destination.id}`}
                    className="inline-flex items-center text-sm font-medium text-white hover:text-gray-200"
                  >
                    View Safaris
                    <svg
                      className="ml-2 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Ready to Start Your African Adventure?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500">
              Let us help you plan the perfect safari experience in your
              chosen destination.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-black px-5 py-3 text-base font-medium text-white hover:bg-gray-800"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 