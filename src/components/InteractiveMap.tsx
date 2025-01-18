'use client'

import { useEffect } from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons in Next.js
useEffect(() => {
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/marker-icon-2x.png',
    iconUrl: '/marker-icon.png',
    shadowUrl: '/marker-shadow.png',
  })
}, [])

interface Location {
  id: string
  name: string
  description: string
  latitude: number
  longitude: number
}

interface InteractiveMapProps {
  locations: Location[]
  center?: [number, number]
  zoom?: number
  height?: string
  onLocationClick?: (location: Location) => void
  isEditable?: boolean
  onLocationAdd?: (location: { latitude: number; longitude: number }) => void
  onLocationUpdate?: (location: Location) => void
  onLocationDelete?: (locationId: string) => void
}

export default function InteractiveMap({
  locations,
  center = [-2.4, 34.9], // Default center (Tanzania)
  zoom = 6,
  height = '500px',
  onLocationClick,
  isEditable = false,
  onLocationAdd,
  onLocationUpdate,
  onLocationDelete,
}: InteractiveMapProps) {
  const handleMapClick = (e: L.LeafletMouseEvent) => {
    if (isEditable && onLocationAdd) {
      const { lat: latitude, lng: longitude } = e.latlng
      onLocationAdd({ latitude, longitude })
    }
  }

  return (
    <div style={{ height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        onClick={handleMapClick}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.latitude, location.longitude]}
            eventHandlers={{
              click: () => onLocationClick?.(location),
            }}
          >
            <Popup>
              <div>
                <h3 className="font-medium">{location.name}</h3>
                <p className="text-sm">{location.description}</p>
                {isEditable && (
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => onLocationUpdate?.(location)}
                      className="px-2 py-1 text-xs bg-black text-white rounded hover:bg-gray-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onLocationDelete?.(location.id)}
                      className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
} 