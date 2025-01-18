'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'
import OptimizedImage from './OptimizedImage'

interface UploadedImage {
  publicId: string
  url: string
  width: number
  height: number
  format: string
}

interface ImageUploaderProps {
  onUpload?: (image: UploadedImage) => void
  onDelete?: (publicId: string) => void
  folder?: string
  maxFiles?: number
  accept?: string[]
  className?: string
}

export default function ImageUploader({
  onUpload,
  onDelete,
  folder = 'safari-images',
  maxFiles = 1,
  accept = ['image/jpeg', 'image/png', 'image/webp'],
  className = '',
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setError(null)
    setIsUploading(true)

    try {
      for (const file of acceptedFiles) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('folder', folder)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error('Upload failed')
        }

        const data = await response.json()
        setUploadedImages(prev => [...prev, data])
        onUpload?.(data)
      }
    } catch (err) {
      console.error('Upload error:', err)
      setError('Failed to upload image. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }, [folder, onUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    accept: accept.reduce((acc, curr) => ({ ...acc, [curr]: [] }), {}),
  })

  const handleDelete = async (publicId: string) => {
    try {
      const response = await fetch('/api/upload', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicId }),
      })

      if (!response.ok) {
        throw new Error('Delete failed')
      }

      setUploadedImages(prev => prev.filter(img => img.publicId !== publicId))
      onDelete?.(publicId)
    } catch (err) {
      console.error('Delete error:', err)
      setError('Failed to delete image. Please try again.')
    }
  }

  return (
    <div className={className}>
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-orange-500 bg-orange-50' : 'border-gray-300 hover:border-orange-400'}
          ${isUploading ? 'opacity-50 pointer-events-none' : ''}
        `}
      >
        <input {...getInputProps()} />
        <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          {isDragActive ? (
            'Drop the files here...'
          ) : (
            <>
              Drag & drop images here, or <span className="text-orange-600">browse</span>
            </>
          )}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          {accept.join(', ')} • Max {maxFiles} file{maxFiles !== 1 ? 's' : ''}
        </p>
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
            <div className="animate-pulse text-orange-600">Uploading...</div>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}

      {uploadedImages.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {uploadedImages.map((image) => (
            <div key={image.publicId} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden">
                <OptimizedImage
                  src={image.publicId}
                  alt="Uploaded image"
                  fill
                  className="object-cover"
                />
              </div>
              <button
                onClick={() => handleDelete(image.publicId)}
                className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Delete image"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 