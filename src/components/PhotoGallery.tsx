'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

interface Photo {
  src: string
  alt: string
  width: number
  height: number
}

interface PhotoGalleryProps {
  photos: Photo[]
  title: string
}

export default function PhotoGallery({ photos, title }: PhotoGalleryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)

  const lightboxPhotos = photos.map(photo => ({
    src: photo.src,
    alt: photo.alt,
    width: photo.width,
    height: photo.height,
  }))

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">{title} Gallery</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <div 
            key={index}
            className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => {
              setPhotoIndex(index)
              setIsOpen(true)
            }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-sm font-medium">View Photo</span>
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        index={photoIndex}
        slides={lightboxPhotos}
        render={{
          slide: ({ slide }) => (
            <div className="relative w-full h-full">
              <Image
                src={slide.src}
                alt={slide.alt || ''}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
            </div>
          ),
        }}
      />
    </div>
  )
} 