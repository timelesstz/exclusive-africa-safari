'use client'

import { useState } from 'react'
import { socialPosts } from '@/data/socialPosts'
import SocialFeed from '@/components/SocialFeed'

export default function SocialPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all')

  const filteredPosts = selectedPlatform === 'all'
    ? socialPosts
    : socialPosts.filter(post => post.platform === selectedPlatform)

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[300px] bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-900/50">
          <div className="absolute inset-0 bg-[url('/images/heroes/social-hero.jpg')] mix-blend-overlay bg-cover bg-center" />
        </div>
        <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Social Media Feed
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Follow our safari adventures and stay updated with the latest wildlife sightings, lodge experiences, and travel tips.
          </p>
        </div>
      </section>

      {/* Filter and Feed Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Platform Filter */}
          <div className="mb-8 flex flex-wrap gap-4">
            {['all', 'instagram', 'facebook', 'twitter'].map(platform => (
              <button
                key={platform}
                onClick={() => setSelectedPlatform(platform)}
                className={`px-6 py-2 rounded-full transition-colors ${
                  selectedPlatform === platform
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </button>
            ))}
          </div>

          {/* Social Feed */}
          <SocialFeed 
            posts={filteredPosts} 
            title={`${selectedPlatform === 'all' ? 'All' : selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)} Posts`}
          />
        </div>
      </section>
    </main>
  )
} 