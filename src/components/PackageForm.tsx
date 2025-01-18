'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ImageUploader } from '@/components/ImageUploader'
import RichTextEditor from '@/components/RichTextEditor'

interface PackageFormProps {
  initialData?: {
    id?: string
    title: string
    subtitle: string
    description: string
    duration: string
    location: string
    startingPrice: number
    groupSize: {
      min: number
      max: number
    }
    featured: boolean
    image: string
  }
}

export default function PackageForm({ initialData }: PackageFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState(
    initialData || {
      title: '',
      subtitle: '',
      description: '',
      duration: '',
      location: '',
      startingPrice: 0,
      groupSize: {
        min: 2,
        max: 6,
      },
      featured: false,
      image: '',
    }
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(
        `/api/packages${initialData?.id ? `/${initialData.id}` : ''}`,
        {
          method: initialData?.id ? 'PATCH' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      )

      if (!response.ok) {
        throw new Error('Failed to save package')
      }

      router.push('/admin/packages')
      router.refresh()
    } catch (error) {
      console.error('Submit error:', error)
      alert('Failed to save package. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }))
  }

  const handleGroupSizeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      groupSize: {
        ...prev.groupSize,
        [name]: Number(value),
      },
    }))
  }

  const handleImageUpload = (imageUrl: string) => {
    setFormData(prev => ({
      ...prev,
      image: imageUrl,
    }))
  }

  const handleDescriptionChange = (content: string) => {
    setFormData(prev => ({
      ...prev,
      description: content,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
      <div className="space-y-12">
        {/* Basic Information */}
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Basic Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Enter the basic details of the safari package.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Title */}
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            {/* Subtitle */}
            <div className="sm:col-span-4">
              <label
                htmlFor="subtitle"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Subtitle
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="subtitle"
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <RichTextEditor
                  content={formData.description}
                  onChange={handleDescriptionChange}
                />
              </div>
            </div>

            {/* Location */}
            <div className="sm:col-span-3">
              <label
                htmlFor="location"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Location
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            {/* Duration */}
            <div className="sm:col-span-3">
              <label
                htmlFor="duration"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Duration
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="duration"
                  id="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g. 7 Days"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            {/* Starting Price */}
            <div className="sm:col-span-2">
              <label
                htmlFor="startingPrice"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Starting Price
              </label>
              <div className="mt-2">
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="startingPrice"
                    id="startingPrice"
                    value={formData.startingPrice}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Group Size */}
            <div className="sm:col-span-4">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Group Size
              </label>
              <div className="mt-2 flex gap-4">
                <div>
                  <label
                    htmlFor="min"
                    className="block text-sm font-medium leading-6 text-gray-600"
                  >
                    Minimum
                  </label>
                  <input
                    type="number"
                    name="min"
                    id="min"
                    value={formData.groupSize.min}
                    onChange={handleGroupSizeChange}
                    className="block w-20 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                    required
                    min="1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="max"
                    className="block text-sm font-medium leading-6 text-gray-600"
                  >
                    Maximum
                  </label>
                  <input
                    type="number"
                    name="max"
                    id="max"
                    value={formData.groupSize.max}
                    onChange={handleGroupSizeChange}
                    className="block w-20 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                    required
                    min={formData.groupSize.min}
                  />
                </div>
              </div>
            </div>

            {/* Featured Toggle */}
            <div className="sm:col-span-4">
              <div className="flex items-center gap-x-3">
                <input
                  type="checkbox"
                  name="featured"
                  id="featured"
                  checked={formData.featured}
                  onChange={e => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
                />
                <label
                  htmlFor="featured"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Featured Package
                </label>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Featured packages will be highlighted on the homepage.
              </p>
            </div>

            {/* Image Upload */}
            <div className="col-span-full">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Package Image
              </label>
              <div className="mt-2">
                <ImageUploader
                  onUpload={handleImageUpload}
                  defaultImage={formData.image}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : initialData ? 'Update Package' : 'Create Package'}
        </button>
      </div>
    </form>
  )
} 