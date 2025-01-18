'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon 
} from '@heroicons/react/24/outline'
import { ImageUploader } from '@/components/ImageUploader'

interface Package {
  id: string
  slug: string
  title: string
  subtitle: string
  image: string
  duration: string
  location: string
  startingPrice: number
  groupSize: {
    min: number
    max: number
  }
  featured: boolean
}

export default function PackagesAdminPage() {
  const [packages, setPackages] = useState<Package[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<keyof Package>('title')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleSort = (field: keyof Package) => {
    if (field === sortField) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedPackages = [...packages].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]
    const direction = sortDirection === 'asc' ? 1 : -1

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue) * direction
    }
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return (aValue - bValue) * direction
    }
    return 0
  }).filter(pkg => 
    pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return

    try {
      const response = await fetch(`/api/packages/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete package')

      setPackages(prev => prev.filter(pkg => pkg.id !== id))
    } catch (error) {
      console.error('Delete error:', error)
      alert('Failed to delete package. Please try again.')
    }
  }

  const handleFeatureToggle = async (id: string, featured: boolean) => {
    try {
      const response = await fetch(`/api/packages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ featured }),
      })

      if (!response.ok) throw new Error('Failed to update package')

      setPackages(prev => prev.map(pkg => 
        pkg.id === id ? { ...pkg, featured } : pkg
      ))
    } catch (error) {
      console.error('Update error:', error)
      alert('Failed to update package. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Packages</h1>
          <Link
            href="/admin/packages/new"
            className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            New Package
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Search and Filters */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="flex-grow">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search packages..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Packages Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    <button
                      onClick={() => handleSort('title')}
                      className="inline-flex items-center gap-1 hover:text-gray-700"
                    >
                      Title
                      {sortField === 'title' && (
                        sortDirection === 'asc' ? 
                          <ChevronUpIcon className="w-4 h-4" /> : 
                          <ChevronDownIcon className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    <button
                      onClick={() => handleSort('location')}
                      className="inline-flex items-center gap-1 hover:text-gray-700"
                    >
                      Location
                      {sortField === 'location' && (
                        sortDirection === 'asc' ? 
                          <ChevronUpIcon className="w-4 h-4" /> : 
                          <ChevronDownIcon className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Duration</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    <button
                      onClick={() => handleSort('startingPrice')}
                      className="inline-flex items-center gap-1 hover:text-gray-700"
                    >
                      Price
                      {sortField === 'startingPrice' && (
                        sortDirection === 'asc' ? 
                          <ChevronUpIcon className="w-4 h-4" /> : 
                          <ChevronDownIcon className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Featured</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedPackages.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden relative flex-shrink-0">
                          <ImageUploader
                            src={pkg.image}
                            alt={pkg.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{pkg.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {pkg.subtitle}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-500">{pkg.location}</td>
                    <td className="px-4 py-4 text-gray-500">{pkg.duration}</td>
                    <td className="px-4 py-4 text-gray-500">
                      ${pkg.startingPrice.toLocaleString()}
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => handleFeatureToggle(pkg.id, !pkg.featured)}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                          pkg.featured ? 'bg-orange-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            pkg.featured ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/packages/${pkg.id}/edit`}
                          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(pkg.id)}
                          className="p-2 text-red-500 hover:text-red-700 transition-colors"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {sortedPackages.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No packages found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 