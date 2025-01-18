'use client'

import Image from 'next/image'
import Link from 'next/link'
import PackageCard from '@/components/PackageCard'
import { images } from '@/data/images'
import { socialPosts } from '@/data/socialPosts'
import SocialFeed from '@/components/SocialFeed'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

const samplePackages = [
  {
    title: 'Serengeti Migration Safari',
    description: 'Witness the great wildebeest migration across the Serengeti plains in this unforgettable 7-day adventure.',
    price: 'From $3,999',
    duration: '7 Days',
    image: '/serengeti.jpg',
    slug: 'serengeti-migration',
  },
  {
    title: 'Luxury Okavango Delta',
    description: "Experience the pristine wilderness of Botswana's Okavango Delta in exclusive luxury camps.",
    price: 'From $5,499',
    duration: '5 Days',
    image: '/okavango.jpg',
    slug: 'luxury-okavango',
  },
  {
    title: 'Masai Mara Adventure',
    description: "Explore Kenya's most famous reserve and meet the Masai people in this cultural and wildlife experience.",
    price: 'From $2,999',
    duration: '6 Days',
    image: '/masai-mara.jpg',
    slug: 'masai-mara-adventure',
  },
]

const features = [
  {
    title: 'Expert Local Guides',
    description: 'Our experienced guides bring deep knowledge and passion to every safari.',
    icon: '🎯',
  },
  {
    title: 'Luxury Accommodations',
    description: 'Stay in carefully selected lodges and camps that blend comfort with authenticity.',
    icon: '🏨',
  },
  {
    title: 'Customized Experiences',
    description: 'Every safari is tailored to your preferences and travel style.',
    icon: '✨',
  },
]

const destinations = [
  {
    name: 'Serengeti National Park',
    description: 'Experience the Great Migration and endless plains.',
    image: images.destinations.serengeti,
  },
  {
    name: 'Okavango Delta',
    description: "Explore the world's largest inland river delta.",
    image: images.destinations.okavango,
  },
  {
    name: 'Masai Mara',
    description: 'Witness incredible wildlife and Maasai culture.',
    image: images.destinations.masaiMara,
  },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full">
        <div className="absolute inset-0">
          <Image
            src="/hero-safari.jpg"
            alt="African Safari Landscape"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">
            Exclusive Africa Safaris
          </h1>
          <p className="text-xl md:text-2xl text-center mb-8 max-w-2xl">
            Experience the untamed beauty of Africa through our carefully curated safari adventures
          </p>
          <Link
            href="/packages"
            className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors"
          >
            Explore Packages
          </Link>
        </div>
      </section>

      {/* Featured Packages Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Featured Safari Packages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {samplePackages.map((pkg) => (
              <PackageCard key={pkg.slug} {...pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Social Feed Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SocialFeed 
            posts={socialPosts.slice(0, 3)} 
            title="Follow Our Safari Adventures" 
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

      {/* Why Choose Us Section */}
      <section className="bg-gray-50 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white p-6 rounded-lg shadow-sm text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
