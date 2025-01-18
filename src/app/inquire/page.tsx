'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarIcon } from '@heroicons/react/24/outline'

// This would typically come from an API
const packages = [
  {
    id: '1',
    title: 'Serengeti Migration Safari',
    duration: '7 Days / 6 Nights',
    startingPrice: 'From $3,999',
  },
  {
    id: '2',
    title: 'Luxury Okavango Delta',
    duration: '5 Days / 4 Nights',
    startingPrice: 'From $5,499',
  },
  {
    id: '3',
    title: 'Masai Mara Adventure',
    duration: '6 Days / 5 Nights',
    startingPrice: 'From $2,999',
  },
]

export default function InquirePage() {
  const searchParams = useSearchParams()
  const packageId = searchParams.get('package')
  const selectedPackage = packages.find((p) => p.id === packageId)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationality: '',
    travelDates: '',
    numberOfTravelers: '',
    packageId: packageId || '',
    specialRequests: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit inquiry')
      }

      setSubmitSuccess(true)
    } catch (error) {
      setSubmitError(
        'There was an error submitting your inquiry. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Thank You!
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Your inquiry has been received. One of our safari experts will
            contact you shortly to discuss your trip.
          </p>
          <div className="mt-8">
            <Link
              href="/packages"
              className="text-sm font-medium text-black hover:text-gray-700"
            >
              ← Back to Safari Packages
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative">
        <div className="absolute inset-0">
          <Image
            src="/images/inquiry-hero.jpg"
            alt="Safari landscape"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Plan Your Safari
          </h1>
          <p className="mt-4 max-w-3xl text-xl text-gray-200">
            Fill out the form below and one of our safari experts will be in
            touch to help plan your perfect African adventure.
          </p>
        </div>
      </div>

      {/* Form section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Personal Information
                </h3>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="nationality"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nationality
                    </label>
                    <input
                      type="text"
                      name="nationality"
                      id="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Trip Details */}
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Trip Details
                </h3>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="travelDates"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Preferred Travel Dates
                    </label>
                    <div className="relative mt-1">
                      <input
                        type="text"
                        name="travelDates"
                        id="travelDates"
                        placeholder="MM/YYYY or flexible"
                        value={formData.travelDates}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                      />
                      <CalendarIcon className="pointer-events-none absolute right-3 top-2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="numberOfTravelers"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Number of Travelers
                    </label>
                    <select
                      name="numberOfTravelers"
                      id="numberOfTravelers"
                      required
                      value={formData.numberOfTravelers}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                    >
                      <option value="">Select number of travelers</option>
                      <option value="1">1 person</option>
                      <option value="2">2 people</option>
                      <option value="3-4">3-4 people</option>
                      <option value="5-6">5-6 people</option>
                      <option value="7+">7+ people</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="packageId"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Interested Safari Package
                    </label>
                    <select
                      name="packageId"
                      id="packageId"
                      value={formData.packageId}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                    >
                      <option value="">Select a package</option>
                      {packages.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.title} ({pkg.duration}) - {pkg.startingPrice}
                        </option>
                      ))}
                      <option value="custom">
                        I'd like a custom safari package
                      </option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="specialRequests"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Special Requests or Questions
                    </label>
                    <textarea
                      name="specialRequests"
                      id="specialRequests"
                      rows={4}
                      value={formData.specialRequests}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                      placeholder="Tell us about any special requirements, preferences, or questions you have..."
                    />
                  </div>
                </div>
              </div>

              {submitError && (
                <div className="rounded-md bg-red-50 p-4">
                  <p className="text-sm text-red-700">{submitError}</p>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="mt-10 lg:col-span-4 lg:mt-0">
            <div className="sticky top-4">
              <div className="overflow-hidden rounded-lg bg-gray-50">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Why Book With Us
                  </h3>
                  <div className="mt-6 space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Expert Local Knowledge
                      </h4>
                      <p className="mt-2 text-sm text-gray-500">
                        Our team has extensive experience and intimate
                        knowledge of African safaris.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Personalized Service
                      </h4>
                      <p className="mt-2 text-sm text-gray-500">
                        We tailor each safari to your preferences and
                        requirements.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        24/7 Support
                      </h4>
                      <p className="mt-2 text-sm text-gray-500">
                        We're here to assist you before, during, and after
                        your safari.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Best Value Guarantee
                      </h4>
                      <p className="mt-2 text-sm text-gray-500">
                        We offer competitive prices without compromising on
                        quality.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-100 p-6">
                  <h4 className="font-medium text-gray-900">
                    Need Immediate Assistance?
                  </h4>
                  <p className="mt-2 text-sm text-gray-500">
                    Call us at{' '}
                    <a
                      href="tel:+1234567890"
                      className="font-medium text-black hover:text-gray-700"
                    >
                      +1 (234) 567-890
                    </a>{' '}
                    or email{' '}
                    <a
                      href="mailto:info@example.com"
                      className="font-medium text-black hover:text-gray-700"
                    >
                      info@example.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 