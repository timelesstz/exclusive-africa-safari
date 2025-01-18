'use client'

import { useState } from 'react'
import { Tab } from '@headlessui/react'
import { FolderIcon } from '@heroicons/react/24/outline'
import ImageUploader from '@/components/ImageUploader'
import OptimizedImage from '@/components/OptimizedImage'

const IMAGE_FOLDERS = [
  { name: 'Packages', id: 'safari-packages' },
  { name: 'Accommodations', id: 'safari-accommodations' },
  { name: 'Activities', id: 'safari-activities' },
  { name: 'Blog', id: 'safari-blog' },
]

interface UploadedImage {
  publicId: string
  url: string
  width: number
  height: number
  format: string
}

export default function MediaPage() {
  const [selectedFolder, setSelectedFolder] = useState(IMAGE_FOLDERS[0])
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [selectedImage, setSelectedImage] = useState<UploadedImage | null>(null)

  const handleUpload = (image: UploadedImage) => {
    setUploadedImages(prev => [...prev, image])
  }

  const handleDelete = (publicId: string) => {
    setUploadedImages(prev => prev.filter(img => img.publicId !== publicId))
    if (selectedImage?.publicId === publicId) {
      setSelectedImage(null)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Media Library</h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg">
          <Tab.Group>
            <div className="border-b border-gray-200">
              <Tab.List className="flex gap-4 p-4">
                {IMAGE_FOLDERS.map((folder) => (
                  <Tab
                    key={folder.id}
                    className={({ selected }) => `
                      px-4 py-2 rounded-lg text-sm font-medium transition-colors
                      ${selected
                        ? 'bg-orange-50 text-orange-600'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      }
                    `}
                    onClick={() => setSelectedFolder(folder)}
                  >
                    <div className="flex items-center gap-2">
                      <FolderIcon className="w-4 h-4" />
                      {folder.name}
                    </div>
                  </Tab>
                ))}
              </Tab.List>
            </div>

            <Tab.Panels>
              {IMAGE_FOLDERS.map((folder) => (
                <Tab.Panel key={folder.id} className="p-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {uploadedImages
                          .filter(img => img.publicId.startsWith(folder.id))
                          .map((image) => (
                            <div
                              key={image.publicId}
                              className={`relative group cursor-pointer rounded-lg overflow-hidden
                                ${selectedImage?.publicId === image.publicId ? 'ring-2 ring-orange-500' : ''}
                              `}
                              onClick={() => setSelectedImage(image)}
                            >
                              <div className="aspect-square">
                                <OptimizedImage
                                  src={image.publicId}
                                  alt=""
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          ))}
                      </div>
                    </div>

                    <div>
                      <ImageUploader
                        folder={folder.id}
                        onUpload={handleUpload}
                        onDelete={handleDelete}
                        maxFiles={5}
                        className="mb-6"
                      />

                      {selectedImage && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h3 className="font-medium text-gray-900 mb-4">Image Details</h3>
                          <dl className="space-y-2 text-sm">
                            <div>
                              <dt className="text-gray-500">Public ID</dt>
                              <dd className="flex items-center gap-2">
                                <code className="text-xs bg-gray-100 px-2 py-1 rounded flex-grow">
                                  {selectedImage.publicId}
                                </code>
                                <button
                                  onClick={() => copyToClipboard(selectedImage.publicId)}
                                  className="text-orange-600 hover:text-orange-700"
                                >
                                  Copy
                                </button>
                              </dd>
                            </div>
                            <div>
                              <dt className="text-gray-500">Dimensions</dt>
                              <dd>{selectedImage.width} × {selectedImage.height}</dd>
                            </div>
                            <div>
                              <dt className="text-gray-500">Format</dt>
                              <dd className="uppercase">{selectedImage.format}</dd>
                            </div>
                            <div>
                              <dt className="text-gray-500">URL</dt>
                              <dd className="flex items-center gap-2">
                                <code className="text-xs bg-gray-100 px-2 py-1 rounded flex-grow truncate">
                                  {selectedImage.url}
                                </code>
                                <button
                                  onClick={() => copyToClipboard(selectedImage.url)}
                                  className="text-orange-600 hover:text-orange-700"
                                >
                                  Copy
                                </button>
                              </dd>
                            </div>
                          </dl>
                        </div>
                      )}
                    </div>
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  )
} 