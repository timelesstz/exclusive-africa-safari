'use client'

import { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ChevronDownIcon, 
  ChevronUpIcon,
  CalendarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  SunIcon,
  CloudIcon,
  CheckCircleIcon,
  MapPinIcon,
  ClockIcon,
  PrinterIcon
} from '@heroicons/react/24/outline'
import dynamic from 'next/dynamic'
import OptimizedImage from '@/components/OptimizedImage'

// Loading skeletons
function MapSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 h-full">
      <div className="w-full h-full bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
        <div className="text-center">
          <MapPinIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">Loading map...</p>
        </div>
      </div>
    </div>
  )
}

function AccommodationSkeleton() {
  return (
    <div className="bg-gray-50 rounded-lg p-4 animate-pulse">
      <div className="relative h-48 mb-4 rounded-lg bg-gray-200" />
      <div className="h-5 bg-gray-200 rounded w-2/3 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-full" />
    </div>
  )
}

// Dynamically import components that use browser APIs
const InquiryForm = dynamic(() => import('@/components/InquiryForm'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <p className="text-gray-500">Loading inquiry form...</p>
      </div>
    </div>
  )
})

// Dynamically import map components with loading states
const DynamicMap = dynamic(
  () => import('react-map-gl').then(mod => ({ 
    default: ({ children, ...props }) => <mod.Map {...props}>{children}</mod.Map>
  })), {
    ssr: false,
    loading: () => <MapSkeleton />
  }
)

const DynamicMarker = dynamic(
  () => import('react-map-gl').then(mod => mod.Marker), 
  { ssr: false }
)

const DynamicPopup = dynamic(
  () => import('react-map-gl').then(mod => mod.Popup), 
  { ssr: false }
)

interface Location {
  name: string
  coordinates: [number, number]
  description: string
}

interface Day {
  title: string
  description: string
  activities: string[]
  meals: {
    breakfast?: string
    lunch?: string
    dinner?: string
  }
  accommodation: {
    name: string
    description: string
    image: string
  }
  location: Location
}

interface Weather {
  season: string
  temperature: string
  rainfall: string
  highlights: string[]
}

interface PackingItem {
  category: string
  items: string[]
}

interface ItineraryDetailProps {
  title: string
  subtitle: string
  duration: string
  destinations: string[]
  highlights: string[]
  days: Day[]
  pricing: {
    startingPrice: number
    included: string[]
    excluded: string[]
  }
  groupSize: {
    min: number
    max: number
  }
  weather: Weather
  packingList: PackingItem[]
}

export default function ItineraryDetail({
  title,
  subtitle,
  duration,
  destinations,
  highlights,
  days,
  pricing,
  groupSize,
  weather,
  packingList,
}: ItineraryDetailProps) {
  const [openDayIndex, setOpenDayIndex] = useState<number | null>(0)
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [activeTab, setActiveTab] = useState<'itinerary' | 'included' | 'packing'>('itinerary')
  const [isInquiryOpen, setIsInquiryOpen] = useState(false)
  const [isMapReady, setIsMapReady] = useState(false)

  // Calculate the center point of all locations for initial map view
  const coordinates = days.map(day => day.location.coordinates)
  const center = coordinates.reduce(
    (acc, curr) => [acc[0] + curr[0], acc[1] + curr[1]],
    [0, 0]
  ).map(coord => coord / coordinates.length)

  // Handle map initialization
  useEffect(() => {
    setIsMapReady(true)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Print Button */}
      <button
        onClick={() => window.print()}
        className="fixed top-4 right-4 z-50 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 no-print"
        aria-label="Print itinerary"
      >
        <PrinterIcon className="w-6 h-6 text-gray-600" />
      </button>

      {/* Hero Section */}
      <Suspense fallback={
        <div className="relative h-[60vh] md:h-[70vh] bg-gray-200 animate-pulse no-print">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-gray-50" />
        </div>
      }>
        <div className="relative h-[60vh] md:h-[70vh] w-full no-print">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2048&q=80"
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-gray-50">
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 text-white">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-wrap items-center gap-2 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-4 h-4" />
                    <span className="whitespace-nowrap">{destinations.join(' • ')}</span>
                  </div>
                  <span className="hidden sm:inline mx-2">|</span>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-4 h-4" />
                    <span>{duration}</span>
                  </div>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{title}</h1>
                <p className="text-lg sm:text-xl text-gray-100 max-w-2xl mb-8">{subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </Suspense>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 relative z-10 print-full-width">
        {/* Package Title for Print */}
        <div className="hidden print:block mb-8">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-xl mt-2">{subtitle}</p>
          <div className="flex gap-4 mt-4">
            <p><strong>Duration:</strong> {duration}</p>
            <p><strong>Destinations:</strong> {destinations.join(', ')}</p>
          </div>
        </div>

        {/* Quick Facts */}
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-xl p-4 sm:p-6 shadow-lg animate-pulse">
                <div className="h-8 w-8 bg-gray-200 rounded-full mb-4" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            ))}
          </div>
        }>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 print:block print:space-y-4">
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg flex items-center gap-4 print:shadow-none">
              <CalendarIcon className="w-6 sm:w-8 h-6 sm:h-8 text-orange-600" />
              <div>
                <h3 className="font-medium text-gray-900">Duration</h3>
                <p className="text-gray-600">{duration}</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg flex items-center gap-4">
              <UserGroupIcon className="w-6 sm:w-8 h-6 sm:h-8 text-orange-600" />
              <div>
                <h3 className="font-medium text-gray-900">Group Size</h3>
                <p className="text-gray-600">{groupSize.min}-{groupSize.max} people</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg flex items-center gap-4">
              <CurrencyDollarIcon className="w-6 sm:w-8 h-6 sm:h-8 text-orange-600" />
              <div className="flex-grow">
                <h3 className="font-medium text-gray-900">Starting From</h3>
                <p className="text-gray-600">${pricing.startingPrice.toLocaleString()}</p>
              </div>
              <button
                onClick={() => setIsInquiryOpen(true)}
                className="hidden md:block px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
              >
                Inquire Now
              </button>
            </div>
          </div>
        </Suspense>

        {/* Highlights */}
        <div className="bg-white rounded-xl p-4 sm:p-8 shadow-lg mb-8 sm:mb-12 print:shadow-none">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Trip Highlights</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 print:print-columns-2">
            {highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircleIcon className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weather Information */}
        <div className="bg-white rounded-xl p-4 sm:p-8 shadow-lg mb-8 sm:mb-12 print:shadow-none">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Weather & Climate</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-orange-600" />
                <h3 className="font-medium text-gray-900">Season</h3>
              </div>
              <p className="text-gray-600">{weather.season}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <SunIcon className="w-5 h-5 text-orange-600" />
                <h3 className="font-medium text-gray-900">Temperature</h3>
              </div>
              <p className="text-gray-600">{weather.temperature}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CloudIcon className="w-5 h-5 text-orange-600" />
                <h3 className="font-medium text-gray-900">Rainfall</h3>
              </div>
              <p className="text-gray-600">{weather.rainfall}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Highlights</h3>
              <ul className="text-gray-600 space-y-1">
                {weather.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tabs Navigation - Hide in Print */}
        <div className="mb-6 sm:mb-8 overflow-x-auto no-print">
          <div className="border-b border-gray-200 min-w-max">
            <nav className="flex gap-4 sm:gap-8">
              <button
                onClick={() => setActiveTab('itinerary')}
                className={`py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                  activeTab === 'itinerary'
                    ? 'border-orange-600 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Itinerary
              </button>
              <button
                onClick={() => setActiveTab('included')}
                className={`py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                  activeTab === 'included'
                    ? 'border-orange-600 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                What's Included
              </button>
              <button
                onClick={() => setActiveTab('packing')}
                className={`py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                  activeTab === 'packing'
                    ? 'border-orange-600 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Packing List
              </button>
            </nav>
          </div>
        </div>

        {/* Content Sections */}
        <div className="print:block">
          {/* Itinerary Section */}
          <div className={activeTab === 'itinerary' ? '' : 'hidden print:block'}>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 hidden print:block">Daily Itinerary</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 print:block">
              {/* Interactive Map - Hide in Print */}
              <div className="h-[400px] sm:h-[500px] lg:h-[600px] lg:sticky lg:top-8 no-print">
                {isMapReady ? (
                  <div className="bg-white rounded-xl shadow-lg p-4 h-full">
                    <DynamicMap
                      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                      initialViewState={{
                        longitude: center[0],
                        latitude: center[1],
                        zoom: 4
                      }}
                      style={{ width: '100%', height: '100%', borderRadius: '0.75rem' }}
                      mapStyle="mapbox://styles/mapbox/outdoors-v12"
                    >
                      {days.map((day, index) => (
                        <DynamicMarker
                          key={index}
                          longitude={day.location.coordinates[0]}
                          latitude={day.location.coordinates[1]}
                          onClick={e => {
                            e.originalEvent.stopPropagation()
                            setSelectedLocation(day.location)
                          }}
                        >
                          <div className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm cursor-pointer">
                            {index + 1}
                          </div>
                        </DynamicMarker>
                      ))}
                      {selectedLocation && (
                        <DynamicPopup
                          longitude={selectedLocation.coordinates[0]}
                          latitude={selectedLocation.coordinates[1]}
                          anchor="bottom"
                          onClose={() => setSelectedLocation(null)}
                          className="z-50"
                        >
                          <div className="p-2 max-w-[200px] sm:max-w-[300px]">
                            <h3 className="font-medium text-gray-900">{selectedLocation.name}</h3>
                            <p className="text-sm text-gray-600">{selectedLocation.description}</p>
                          </div>
                        </DynamicPopup>
                      )}
                    </DynamicMap>
                  </div>
                ) : (
                  <MapSkeleton />
                )}
              </div>

              {/* Map Overview for Print */}
              <div className="hidden print:block map-container mb-8">
                <h3 className="text-xl font-semibold mb-4">Journey Overview</h3>
                <ul className="space-y-2">
                  {days.map((day, index) => (
                    <li key={index}>
                      <strong>Day {index + 1}:</strong> {day.location.name} - {day.location.description}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Itinerary Days */}
              <div className="print:mt-8">
                {days.map((day, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 print:shadow-none print:mb-8 itinerary-day"
                  >
                    {/* Day Header */}
                    <div className="px-4 sm:px-6 py-4 print:border-b print:border-gray-200">
                      <div className="flex items-center gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-medium print:bg-transparent">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="font-medium text-gray-900">{day.title}</h3>
                          <p className="text-sm text-gray-500">{day.location.name}</p>
                        </div>
                      </div>
                    </div>

                    {/* Day Content - Always visible in print */}
                    <div className={`px-4 sm:px-6 pb-6 ${openDayIndex === index ? '' : 'hidden print:block'}`}>
                      <p className="text-gray-600 mb-6">{day.description}</p>

                      <div className="space-y-6">
                        {/* Activities */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Today's Activities:</h4>
                          <ul className="space-y-2">
                            {day.activities.map((activity, actIndex) => (
                              <li key={actIndex} className="flex items-start gap-2">
                                <CheckCircleIcon className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                                <span className="text-gray-600">{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Meals */}
                        {Object.keys(day.meals).length > 0 && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Meals:</h4>
                            <ul className="space-y-2">
                              {Object.entries(day.meals).map(([meal, description]) => (
                                <li key={meal} className="text-gray-600">
                                  <span className="font-medium capitalize">{meal}</span>: {description}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Accommodation */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Accommodation:</h4>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="relative h-48 sm:h-64 mb-4 rounded-lg overflow-hidden">
                              <OptimizedImage
                                src={day.accommodation.image}
                                alt={day.accommodation.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <h5 className="font-medium text-gray-900 mb-2">{day.accommodation.name}</h5>
                            <p className="text-gray-600">{day.accommodation.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* What's Included Section */}
          <div className={`mt-12 ${activeTab === 'included' ? '' : 'hidden print:block'}`}>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 hidden print:block">Package Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 print:block print:space-y-8">
              <div className="bg-white rounded-xl p-4 sm:p-8 shadow-lg">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">What's Included</h3>
                <ul className="space-y-3">
                  {pricing.included.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-xl p-4 sm:p-8 shadow-lg">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">What's Not Included</h3>
                <ul className="space-y-3">
                  {pricing.excluded.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-600 flex-shrink-0 mt-1 font-bold">×</span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Packing List Section */}
          <div className={`mt-12 ${activeTab === 'packing' ? '' : 'hidden print:block'}`}>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 hidden print:block">Recommended Packing List</h2>
            <div className="bg-white rounded-xl p-4 sm:p-8 shadow-lg print:shadow-none">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {packingList.map((category, index) => (
                  <div key={index}>
                    <h4 className="font-medium text-gray-900 mb-4">{category.category}</h4>
                    <ul className="space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2">
                          <CheckCircleIcon className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Print Footer */}
        <div className="hidden print:block print-footer mt-12">
          <p className="text-center text-sm">
            For the most up-to-date information and to make a booking, please visit our website or contact us directly.
          </p>
        </div>
      </div>

      {/* Sticky Bottom Bar - Hide in Print */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 no-print">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs sm:text-sm text-gray-600">Starting from</p>
            <p className="text-xl sm:text-2xl font-bold text-orange-600">
              ${pricing.startingPrice.toLocaleString()}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">per person</p>
          </div>
          <button
            onClick={() => setIsInquiryOpen(true)}
            className="bg-orange-600 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-orange-700 transition-colors text-sm sm:text-base"
          >
            Inquire Now
          </button>
        </div>
      </div>

      {/* Inquiry Form - Hide in Print */}
      <InquiryForm
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        packageTitle={title}
        packageDuration={duration}
        startingPrice={pricing.startingPrice}
      />
    </div>
  )
} 