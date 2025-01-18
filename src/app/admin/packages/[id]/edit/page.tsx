'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import PackageForm from '@/components/PackageForm'

export default function EditPackagePage() {
  const { id } = useParams()
  const [package_, setPackage] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await fetch(`/api/packages/${id}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch package')
        }

        const data = await response.json()
        setPackage(data)
      } catch (error) {
        console.error('Fetch error:', error)
        setError('Failed to load package. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPackage()
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 w-64 bg-gray-200 rounded mb-4" />
            <div className="h-4 w-96 bg-gray-200 rounded mb-8" />
            <div className="space-y-6">
              <div className="h-40 bg-gray-200 rounded" />
              <div className="h-40 bg-gray-200 rounded" />
              <div className="h-40 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Error</h1>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Edit Package</h1>
          <p className="mt-2 text-sm text-gray-600">
            Make changes to the package details below.
          </p>
        </div>

        <PackageForm initialData={package_} />
      </div>
    </div>
  )
} 