import Link from 'next/link'
import OptimizedImage from '@/components/OptimizedImage'

interface PackageCardProps {
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
}

export default function PackageCard({
  slug,
  title,
  subtitle,
  image,
  duration,
  location,
  startingPrice,
  groupSize,
}: PackageCardProps) {
  return (
    <Link href={`/packages/${slug}`} className="block group">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
        <div className="relative h-48 sm:h-64">
          <OptimizedImage
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-2 text-sm text-white">
              <span>{location}</span>
              <span>•</span>
              <span>{duration}</span>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{subtitle}</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Starting from</p>
              <p className="text-lg font-bold text-orange-600">${startingPrice.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Group size</p>
              <p className="text-sm text-gray-700">{groupSize.min}-{groupSize.max} people</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
} 