'use client'

import { useState, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { safariPackages } from '@/data/packages'
import {
  AdjustmentsHorizontalIcon,
  MapPinIcon,
  ClockIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline'
import { images } from '@/data/images'
import dynamic from 'next/dynamic'

// Dynamically import the InquiryForm with ssr disabled to prevent hydration issues
const InquiryForm = dynamic(() => import('@/components/InquiryForm'), {
  ssr: false,
})

const locations = ['All Locations', 'Tanzania', 'Kenya', 'Botswana', 'Zimbabwe', 'South Africa']
const durations = ['Any Duration', '1-5 Days', '6-10 Days', '11+ Days']
const priceRanges = [
  'Any Price',
  'Under $3,000',
  '$3,000 - $5,000',
  'Over $5,000',
]

// Loading skeleton for package card
function PackageCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl shadow-lg animate-pulse">
      <div className="relative aspect-w-16 aspect-h-9 bg-gray-200" />
      <div className="flex flex-1 flex-col justify-between bg-white p-6">
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="mt-4 flex items-center justify-between">
            <div>
              <div className="h-6 bg-gray-200 rounded w-24 mb-1" />
              <div className="h-4 bg-gray-200 rounded w-32" />
            </div>
            <div className="text-right">
              <div className="h-4 bg-gray-200 rounded w-16 mb-1" />
              <div className="h-4 bg-gray-200 rounded w-20" />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="h-10 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  )
}

// Loading skeleton for filters
function FiltersSkeleton() {
  return (
    <div className="flex flex-col space-y-4 py-8 lg:flex-row lg:items-center lg:space-x-8 lg:space-y-0 animate-pulse">
      <div className="flex-1">
        <div className="h-10 bg-gray-200 rounded" />
      </div>
      <div className="flex items-center space-x-2">
        <div className="h-10 w-10 bg-gray-200 rounded" />
        <div className="h-10 bg-gray-200 rounded w-32" />
      </div>
      <div className="flex items-center space-x-2">
        <div className="h-10 w-10 bg-gray-200 rounded" />
        <div className="h-10 bg-gray-200 rounded w-32" />
      </div>
      <div className="flex items-center space-x-2">
        <div className="h-10 w-10 bg-gray-200 rounded" />
        <div className="h-10 bg-gray-200 rounded w-32" />
      </div>
    </div>
  )
}

export default function PackagesPage() {
  // Move all state management to client-side only
  const [selectedLocation, setSelectedLocation] = useState('All Locations')
  const [selectedDuration, setSelectedDuration] = useState('Any Duration')
  const [selectedPrice, setSelectedPrice] = useState('Any Price')
  const [searchQuery, setSearchQuery] = useState('')
  const [isInquiryOpen, setIsInquiryOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<typeof safariPackages[0] | null>(null)

  const getPriceRange = (price: string) => {
    const numericPrice = parseInt(price.replace(/\D/g, ''))
    if (numericPrice < 3000) return 'Under $3,000'
    if (numericPrice <= 5000) return '$3,000 - $5,000'
    return 'Over $5,000'
  }

  const getDurationRange = (duration: string) => {
    const days = parseInt(duration.split(' ')[0])
    if (days <= 5) return '1-5 Days'
    if (days <= 10) return '6-10 Days'
    return '11+ Days'
  }

  const filteredPackages = safariPackages.filter((pkg) => {
    const matchesLocation =
      selectedLocation === 'All Locations' || pkg.location === selectedLocation
    const matchesDuration =
      selectedDuration === 'Any Duration' ||
      getDurationRange(pkg.duration) === selectedDuration
    const matchesPrice =
      selectedPrice === 'Any Price' ||
      getPriceRange(pkg.startingPrice) === selectedPrice
    const matchesSearch =
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesLocation && matchesDuration && matchesPrice && matchesSearch
  })

  const handleInquireClick = (pkg: typeof safariPackages[0]) => {
    setSelectedPackage(pkg)
    setIsInquiryOpen(true)
  }

  return (
    <div className="bg-gray-50">
      {/* Hero section */}
      <Suspense fallback={
        <div className="relative h-[50vh] bg-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent">
            <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 sm:py-40 lg:px-8">
              <div className="h-12 bg-gray-300 rounded w-1/3 mb-6" />
              <div className="h-6 bg-gray-300 rounded w-2/3" />
            </div>
          </div>
        </div>
      }>
        <div className="relative">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=2048&q=80"
              alt="Safari landscape"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 sm:py-40 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Safari Packages
            </h1>
            <p className="mt-6 max-w-3xl text-xl text-gray-100">
              {`Discover our carefully curated selection of safari experiences
              across Africa's most iconic destinations.`}
            </p>
          </div>
        </div>
      </Suspense>

      {/* Filters */}
      <div className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<FiltersSkeleton />}>
            <div className="flex flex-col space-y-4 py-8 lg:flex-row lg:items-center lg:space-x-8 lg:space-y-0">
              {/* Search */}
              <div className="flex-1">
                <label htmlFor="search" className="sr-only">
                  Search packages
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search packages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                />
              </div>

              {/* Location filter */}
              <div className="flex items-center space-x-2">
                <MapPinIcon className="h-5 w-5 text-gray-400" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-black focus:outline-none focus:ring-black"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration filter */}
              <div className="flex items-center space-x-2">
                <ClockIcon className="h-5 w-5 text-gray-400" />
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-black focus:outline-none focus:ring-black"
                >
                  {durations.map((duration) => (
                    <option key={duration} value={duration}>
                      {duration}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price filter */}
              <div className="flex items-center space-x-2">
                <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
                <select
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-black focus:outline-none focus:ring-black"
                >
                  {priceRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Suspense>
        </div>
      </div>

      {/* Featured packages */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Featured Safaris
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Suspense fallback={
              <>
                {[1, 2, 3].map((n) => (
                  <PackageCardSkeleton key={n} />
                ))}
              </>
            }>
              {filteredPackages
                .filter((pkg) => pkg.featured)
                .map((pkg) => (
                  <article
                    key={pkg.id}
                    className="group flex flex-col overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl bg-white"
                  >
                    <div className="relative aspect-w-16 aspect-h-9">
                      <Image
                        src={pkg.image}
                        alt={pkg.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-white/90">
                          <MapPinIcon className="w-4 h-4" />
                          <span>{pkg.location}</span>
                          <span className="mx-2">•</span>
                          <ClockIcon className="w-4 h-4" />
                          <span>{pkg.duration}</span>
                        </div>
                        <h3 className="mt-2 text-xl font-bold text-white">
                          {pkg.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col justify-between bg-white p-6">
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">
                          {pkg.subtitle}
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                          <div>
                            <p className="text-lg font-bold text-gray-900">
                              {pkg.startingPrice}
                            </p>
                            <p className="text-sm text-gray-500">
                              per person sharing
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                              {pkg.groupSize}
                            </p>
                            <p className="text-xs text-gray-500">
                              group size
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <Link
                          href={`/packages/${pkg.slug}`}
                          className="block w-full rounded-lg bg-orange-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 transition-colors duration-200"
                        >
                          Explore Itinerary
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
            </Suspense>
          </div>
        </div>
      </div>

      {/* All packages */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">All Safaris</h2>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Suspense fallback={
            <>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <PackageCardSkeleton key={n} />
              ))}
            </>
          }>
            {filteredPackages
              .filter((pkg) => !pkg.featured)
              .map((pkg) => (
                <article
                  key={pkg.id}
                  className="group flex flex-col overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl bg-white"
                >
                  <div className="relative aspect-w-16 aspect-h-9">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-white/90">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{pkg.location}</span>
                        <span className="mx-2">•</span>
                        <ClockIcon className="w-4 h-4" />
                        <span>{pkg.duration}</span>
                      </div>
                      <h3 className="mt-2 text-xl font-bold text-white">
                        {pkg.title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between bg-white p-6">
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">{pkg.subtitle}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          <p className="text-lg font-bold text-gray-900">
                            {pkg.startingPrice}
                          </p>
                          <p className="text-sm text-gray-500">
                            per person sharing
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {pkg.groupSize}
                          </p>
                          <p className="text-xs text-gray-500">
                            group size
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Link
                        href={`/packages/${pkg.slug}`}
                        className="block w-full rounded-lg bg-orange-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 transition-colors duration-200"
                      >
                        Explore Itinerary
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
          </Suspense>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Can't Find What You're Looking For?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-300">
              Let us help you create a custom safari experience tailored to
              your preferences and interests.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-transparent bg-orange-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-orange-500 transition-colors duration-200"
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