'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Tab } from '@headlessui/react'
import Map, { Marker } from 'react-map-gl'
import {
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import { getPackageBySlug } from '@/data/packages'
import { notFound } from 'next/navigation'
import { socialPosts } from '@/data/socialPosts'
import SocialFeed from '@/components/SocialFeed'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function PackageDetailPage({ params }: { params: { slug: string } }) {
  const packageData = getPackageBySlug(params.slug)
  const [selectedImage, setSelectedImage] = useState(0)
  const [openDay, setOpenDay] = useState<number | null>(null)

  if (!packageData) {
    notFound()
  }

  return (
    <div className="bg-white">
      {/* Rest of your component implementation */}

      {/* Related Social Posts */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SocialFeed 
            posts={socialPosts.filter(post => 
              post.content.toLowerCase().includes(packageData.title.toLowerCase()) ||
              post.content.toLowerCase().includes(packageData.location.toLowerCase())
            )}
            title="Related Social Posts" 
          />
          <div className="mt-8 text-center">
            <Link
              href="/social"
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700"
            >
              View All Posts
              <ChevronRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Rest of the package detail content */}
    </div>
  )
} 