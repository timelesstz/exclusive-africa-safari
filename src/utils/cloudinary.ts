const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

interface CloudinaryOptions {
  width?: number
  height?: number
  quality?: number
  format?: 'auto' | 'webp' | 'avif'
  crop?: 'fill' | 'scale' | 'fit' | 'thumb'
  gravity?: 'auto' | 'face' | 'center'
  effect?: string
}

/**
 * Generates a Cloudinary URL with transformations
 * @param publicId - The public ID of the image in Cloudinary
 * @param options - Transformation options
 * @returns Transformed Cloudinary URL
 */
export function getCloudinaryUrl(publicId: string, options: CloudinaryOptions = {}) {
  if (!CLOUDINARY_CLOUD_NAME) {
    console.warn('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not defined')
    return publicId // Return original URL if no cloud name
  }

  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto',
    effect
  } = options

  // Build transformation string
  const transformations = [
    'f_' + format,
    'q_' + quality,
    width && 'w_' + width,
    height && 'h_' + height,
    'c_' + crop,
    'g_' + gravity,
    effect && 'e_' + effect
  ].filter(Boolean).join(',')

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformations}/${publicId}`
}

/**
 * Extracts the public ID from a Cloudinary URL
 * @param url - Full Cloudinary URL
 * @returns Public ID of the image
 */
export function getPublicIdFromUrl(url: string): string | null {
  if (!url) return null

  // Handle both full URLs and public IDs
  if (url.includes('cloudinary.com')) {
    const matches = url.match(/\/upload\/(?:v\d+\/)?(.+)$/)
    return matches ? matches[1].split('.')[0] : null
  }

  return url
}

/**
 * Generates a responsive image URL with automatic format and quality
 * @param publicId - The public ID or URL of the image
 * @param width - Desired width of the image
 * @returns Optimized image URL
 */
export function getResponsiveImageUrl(publicId: string, width: number) {
  const id = getPublicIdFromUrl(publicId) || publicId
  return getCloudinaryUrl(id, {
    width,
    format: 'auto',
    quality: 'auto',
    crop: 'fill',
    gravity: 'auto'
  })
}

/**
 * Generates srcSet for responsive images
 * @param publicId - The public ID or URL of the image
 * @param sizes - Array of image widths to generate
 * @returns SrcSet string for use in img or source elements
 */
export function generateSrcSet(publicId: string, sizes: number[] = [640, 750, 828, 1080, 1200, 1920, 2048]) {
  const id = getPublicIdFromUrl(publicId) || publicId
  return sizes
    .map(size => `${getCloudinaryUrl(id, { width: size })} ${size}w`)
    .join(', ')
}

/**
 * Generates a blur placeholder URL for an image
 * @param publicId - The public ID or URL of the image
 * @returns Low quality placeholder image URL
 */
export function getBlurPlaceholder(publicId: string) {
  const id = getPublicIdFromUrl(publicId) || publicId
  return getCloudinaryUrl(id, {
    width: 10,
    effect: 'blur:1000',
    quality: 10
  })
} 