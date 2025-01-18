'use client'

import { useState } from 'react'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/24/solid'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface Review {
  id: string
  author: {
    name: string
    image: string
    location: string
  }
  rating: number
  date: string
  title: string
  content: string
  package: string
  photos?: string[]
}

interface ReviewsProps {
  reviews: Review[]
  title?: string
}

export default function Reviews({ reviews, title = "Guest Reviews" }: ReviewsProps) {
  const [currentReview, setCurrentReview] = useState(0)
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

  const handlePrevious = () => {
    setCurrentReview((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentReview((prev) => (prev === reviews.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrevious}
            className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-900" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-900" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Review Content */}
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          {/* Author Info */}
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image
                src={reviews[currentReview].author.image}
                alt={reviews[currentReview].author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">
                {reviews[currentReview].author.name}
              </h3>
              <p className="text-sm text-gray-500">
                {reviews[currentReview].author.location}
              </p>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-5 h-5 ${
                      i < reviews[currentReview].rating
                        ? 'text-yellow-400'
                        : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Review Content */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              {reviews[currentReview].title}
            </h4>
            <p className="text-gray-600">{reviews[currentReview].content}</p>
          </div>

          {/* Package & Date */}
          <div className="pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Safari Package: <span className="text-orange-600">{reviews[currentReview].package}</span>
            </p>
            <p className="text-sm text-gray-500">
              Traveled on {reviews[currentReview].date}
            </p>
          </div>
        </div>

        {/* Review Photos */}
        {reviews[currentReview].photos && reviews[currentReview].photos.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-medium text-gray-900 mb-4">Guest Photos</h4>
            <div className="grid grid-cols-2 gap-4">
              {reviews[currentReview].photos.map((photo, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <Image
                    src={photo}
                    alt={`Guest photo ${index + 1}`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Review Navigation */}
      <div className="flex justify-center gap-2">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentReview(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentReview === index
                ? 'bg-orange-600 w-6'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Photo Lightbox */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] mx-4">
            <Image
              src={selectedPhoto}
              alt="Guest photo"
              width={1200}
              height={800}
              className="object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300"
              onClick={() => setSelectedPhoto(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 