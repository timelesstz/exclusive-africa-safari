'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Tab } from '@headlessui/react'
import { CalendarDaysIcon, ClockIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/outline'

interface PackageDetailProps {
  package: {
    title: string
    subtitle: string
    description: string
    duration: string
    groupSize: string
    location: string
    startingPrice: string
    highlights: string[]
    inclusions: string[]
    exclusions: string[]
    itinerary: Array<{
      day: number
      title: string
      description: string
      meals: string[]
      accommodation: string
    }>
    images: Array<{
      url: string
      alt: string
    }>
    accommodations: Array<{
      name: string
      description: string
      image: string
    }>
  }
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function PackageDetail({ package: pkg }: PackageDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative">
        <div className="aspect-w-16 aspect-h-9 w-full">
          <Image
            src={pkg.images[selectedImageIndex].url}
            alt={pkg.images[selectedImageIndex].alt}
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              {pkg.title}
            </h1>
            <p className="mt-2 text-lg text-gray-200">{pkg.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Thumbnail grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-5 gap-4">
          {pkg.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={classNames(
                'relative aspect-w-3 aspect-h-2',
                selectedImageIndex === index
                  ? 'ring-2 ring-black'
                  : 'hover:opacity-75'
              )}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Quick facts */}
      <div className="border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center space-x-3">
              <ClockIcon className="h-6 w-6 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">{pkg.duration}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <UserGroupIcon className="h-6 w-6 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Group Size</p>
                <p className="font-medium">{pkg.groupSize}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPinIcon className="h-6 w-6 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{pkg.location}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CalendarDaysIcon className="h-6 w-6 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Starting From</p>
                <p className="font-medium">{pkg.startingPrice}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Tab.Group>
          <Tab.List className="flex space-x-1 border-b border-gray-200">
            {['Overview', 'Itinerary', 'Accommodations', 'Inclusions'].map(
              (tab) => (
                <Tab
                  key={tab}
                  className={({ selected }) =>
                    classNames(
                      'py-3 px-5 text-sm font-medium focus:outline-none',
                      selected
                        ? 'border-b-2 border-black text-black'
                        : 'text-gray-500 hover:text-black'
                    )
                  }
                >
                  {tab}
                </Tab>
              )
            )}
          </Tab.List>
          <Tab.Panels className="mt-8">
            {/* Overview */}
            <Tab.Panel>
              <div className="prose max-w-none">
                <p>{pkg.description}</p>
                <h3>Highlights</h3>
                <ul>
                  {pkg.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </Tab.Panel>

            {/* Itinerary */}
            <Tab.Panel>
              <div className="space-y-8">
                {pkg.itinerary.map((day) => (
                  <div key={day.day} className="border-b border-gray-200 pb-8">
                    <h3 className="text-lg font-medium">
                      Day {day.day}: {day.title}
                    </h3>
                    <p className="mt-4 text-gray-600">{day.description}</p>
                    <div className="mt-4 flex items-center space-x-8">
                      <div>
                        <p className="text-sm text-gray-500">Meals</p>
                        <p className="font-medium">
                          {day.meals.join(' • ')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          Accommodation
                        </p>
                        <p className="font-medium">{day.accommodation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Tab.Panel>

            {/* Accommodations */}
            <Tab.Panel>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {pkg.accommodations.map((accommodation, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-lg border border-gray-200"
                  >
                    <div className="aspect-w-3 aspect-h-2">
                      <Image
                        src={accommodation.image}
                        alt={accommodation.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="font-medium">{accommodation.name}</h4>
                      <p className="mt-2 text-sm text-gray-600">
                        {accommodation.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Tab.Panel>

            {/* Inclusions */}
            <Tab.Panel>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium">Included</h3>
                  <ul className="mt-4 space-y-2">
                    {pkg.inclusions.map((inclusion, index) => (
                      <li
                        key={index}
                        className="flex items-start space-x-3 text-gray-600"
                      >
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{inclusion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Not Included</h3>
                  <ul className="mt-4 space-y-2">
                    {pkg.exclusions.map((exclusion, index) => (
                      <li
                        key={index}
                        className="flex items-start space-x-3 text-gray-600"
                      >
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-red-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        <span>{exclusion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

      {/* CTA section */}
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Ready to Start Your Safari Adventure?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500">
              Book this package now or contact us for a customized itinerary.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <button className="rounded-md bg-black px-6 py-3 text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
                Book Now
              </button>
              <button className="rounded-md border border-black px-6 py-3 text-base font-medium text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
                Inquire
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 