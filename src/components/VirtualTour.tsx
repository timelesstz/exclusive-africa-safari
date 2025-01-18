'use client'

import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { CameraIcon } from '@heroicons/react/24/solid'

interface TourSpot {
  id: string
  title: string
  description: string
  panoramaUrl: string
  thumbnail: string
}

interface VirtualTourProps {
  spots: TourSpot[]
  title: string
}

export default function VirtualTour({ spots, title }: VirtualTourProps) {
  const [currentSpot, setCurrentSpot] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const handlePrevious = () => {
    setCurrentSpot((prev) => (prev === 0 ? spots.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentSpot((prev) => (prev === spots.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Main Panorama View */}
        <div className="relative aspect-[2/1] bg-gray-100">
          {/* We'll use an iframe to embed the 360 viewer (e.g., Marzipano, Pannellum) */}
          <iframe
            src={`/panorama-viewer?url=${encodeURIComponent(spots[currentSpot].panoramaUrl)}`}
            className="w-full h-full border-0"
            onLoad={() => setIsLoading(false)}
          />

          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="animate-pulse text-gray-400">
                <CameraIcon className="w-12 h-12" />
                <p className="mt-2">Loading panorama...</p>
              </div>
            </div>
          )}

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-900" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-900" />
          </button>
        </div>

        {/* Spot Information */}
        <div className="p-6">
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            {spots[currentSpot].title}
          </h3>
          <p className="text-gray-600">{spots[currentSpot].description}</p>
        </div>

        {/* Thumbnail Navigation */}
        <div className="border-t border-gray-100 p-4">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {spots.map((spot, index) => (
              <button
                key={spot.id}
                onClick={() => setCurrentSpot(index)}
                className={`flex-shrink-0 relative rounded-lg overflow-hidden ${
                  currentSpot === index
                    ? 'ring-2 ring-orange-600'
                    : 'hover:ring-2 hover:ring-gray-300'
                }`}
              >
                <div className="w-24 aspect-video">
                  <img
                    src={spot.thumbnail}
                    alt={spot.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <p>
          👆 Click and drag to look around. Use your mouse wheel or pinch to zoom.
          Click the arrows or thumbnails to move between different areas.
        </p>
      </div>
    </div>
  )
} 