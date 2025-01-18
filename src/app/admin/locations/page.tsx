'use client'

import { useState } from 'react'
import InteractiveMap from '@/components/InteractiveMap'
import { PlusIcon } from '@heroicons/react/24/outline'

// This would typically come from an API
const initialLocations = [
  {
    id: '1',
    name: 'Serengeti National Park',
    description: 'Home to the great wildebeest migration.',
    latitude: -2.3333,
    longitude: 34.8333,
  },
  {
    id: '2',
    name: 'Ngorongoro Crater',
    description: 'A UNESCO World Heritage Site.',
    latitude: -3.2,
    longitude: 35.5,
  },
]

export default function LocationsPage() {
  const [locations, setLocations] = useState(initialLocations)
  const [isAddingLocation, setIsAddingLocation] = useState(false)
  const [editingLocation, setEditingLocation] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    latitude: 0,
    longitude: 0,
  })

  const handleLocationAdd = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
    if (isAddingLocation) {
      setFormData({ ...formData, latitude, longitude })
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editingLocation) {
      // Update existing location
      setLocations(
        locations.map((loc) =>
          loc.id === editingLocation.id
            ? { ...formData, id: editingLocation.id }
            : loc
        )
      )
      setEditingLocation(null)
    } else {
      // Add new location
      setLocations([
        ...locations,
        {
          id: Date.now().toString(),
          ...formData,
        },
      ])
    }
    setFormData({ name: '', description: '', latitude: 0, longitude: 0 })
    setIsAddingLocation(false)
  }

  const handleLocationUpdate = (location: any) => {
    setEditingLocation(location)
    setFormData({
      name: location.name,
      description: location.description,
      latitude: location.latitude,
      longitude: location.longitude,
    })
  }

  const handleLocationDelete = (locationId: string) => {
    if (confirm('Are you sure you want to delete this location?')) {
      setLocations(locations.filter((loc) => loc.id !== locationId))
    }
  }

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Locations</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your safari destinations and points of interest.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => setIsAddingLocation(true)}
            className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Location
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Map */}
        <div className="bg-white p-6 rounded-lg shadow">
          <InteractiveMap
            locations={locations}
            isEditable={isAddingLocation}
            onLocationAdd={handleLocationAdd}
            onLocationUpdate={handleLocationUpdate}
            onLocationDelete={handleLocationDelete}
          />
        </div>

        {/* Location Form */}
        {(isAddingLocation || editingLocation) && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {editingLocation ? 'Edit Location' : 'Add New Location'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="latitude"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Latitude
                  </label>
                  <input
                    type="number"
                    id="latitude"
                    required
                    step="any"
                    value={formData.latitude}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        latitude: parseFloat(e.target.value),
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="longitude"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Longitude
                  </label>
                  <input
                    type="number"
                    id="longitude"
                    required
                    step="any"
                    value={formData.longitude}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        longitude: parseFloat(e.target.value),
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingLocation(false)
                    setEditingLocation(null)
                    setFormData({
                      name: '',
                      description: '',
                      latitude: 0,
                      longitude: 0,
                    })
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  {editingLocation ? 'Update Location' : 'Add Location'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Locations List */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          All Locations
        </h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {locations.map((location) => (
              <li key={location.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {location.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {location.description}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {location.latitude}, {location.longitude}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleLocationUpdate(location)}
                        className="px-3 py-1 text-xs bg-black text-white rounded hover:bg-gray-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleLocationDelete(location.id)}
                        className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
} 