'use client'

import { useState, useEffect } from 'react'
import Image, { ImageProps } from 'next/image'
import { twMerge } from 'tailwind-merge'
import { getCloudinaryUrl, getPublicIdFromUrl, getBlurPlaceholder } from '@/utils/cloudinary'

const FALLBACK_IMAGE = "safari-fallback-image"
const DEFAULT_BLUR_DATA_URL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR0XFyAeIRshGxsdIR0hHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="

export interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src?: string | null
  fallbackSrc?: string
  className?: string
  width?: number
  height?: number
  quality?: number
  crop?: 'fill' | 'scale' | 'fit' | 'thumb'
  gravity?: 'auto' | 'face' | 'center'
}

export default function OptimizedImage({
  src,
  fallbackSrc = FALLBACK_IMAGE,
  alt,
  className,
  fill,
  width,
  height,
  quality = 90,
  crop = 'fill',
  gravity = 'auto',
  priority,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string>('')
  const [blurDataUrl, setBlurDataUrl] = useState<string>(DEFAULT_BLUR_DATA_URL)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!src) {
      setImgSrc(getCloudinaryUrl(fallbackSrc, { width, height, quality, crop, gravity }))
      setBlurDataUrl(getBlurPlaceholder(fallbackSrc))
      return
    }

    const publicId = getPublicIdFromUrl(src) || src
    setImgSrc(getCloudinaryUrl(publicId, { width, height, quality, crop, gravity }))
    setBlurDataUrl(getBlurPlaceholder(publicId))
    setError(false)
    setIsLoading(true)
  }, [src, fallbackSrc, width, height, quality, crop, gravity])

  return (
    <div className={twMerge(
      'relative overflow-hidden bg-gray-100',
      isLoading && 'animate-pulse',
      className
    )}>
      <Image
        {...props}
        src={imgSrc}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={twMerge(
          'object-cover duration-700 ease-in-out',
          isLoading ? 'scale-110 blur-lg' : 'scale-100 blur-0',
          props.className
        )}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          setError(true)
          const publicId = getPublicIdFromUrl(fallbackSrc) || fallbackSrc
          setImgSrc(getCloudinaryUrl(publicId, { width, height, quality, crop, gravity }))
        }}
        priority={priority}
        quality={quality}
        sizes={props.sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
        placeholder="blur"
        blurDataURL={blurDataUrl}
      />
    </div>
  )
} 