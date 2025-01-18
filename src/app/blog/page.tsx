'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { images } from '@/data/images'

// This would typically come from an API or CMS
const blogPosts = [
  {
    id: 1,
    slug: 'best-time-for-safari',
    title: 'The Best Time to Go on an African Safari',
    excerpt: 'Learn about the optimal seasons for wildlife viewing across different African destinations.',
    image: images.blog.safariSeasons,
    author: 'Sarah Johnson',
    date: 'March 15, 2024',
    category: 'Travel Tips',
    readTime: '5 min read',
  },
  {
    id: 2,
    slug: 'wildlife-photography-tips',
    title: 'Essential Wildlife Photography Tips for Safari',
    excerpt: 'Master the art of capturing stunning wildlife photographs with these expert tips and techniques.',
    image: images.blog.wildlifePhotography,
    author: 'Michael Chen',
    date: 'March 10, 2024',
    category: 'Photography',
    readTime: '6 min read',
  },
  {
    id: 3,
    slug: 'great-migration-guide',
    title: 'Complete Guide to the Great Migration',
    excerpt: "The Great Migration is one of nature's most spectacular events, where over two million wildebeest, zebras, and gazelles make their annual journey through the Serengeti-Mara ecosystem.",
    image: images.blog.greatMigration,
    author: 'David Kimani',
    date: 'March 5, 2024',
    category: 'Wildlife',
    readTime: '7 min read',
  },
  {
    id: 4,
    slug: 'luxury-safari-lodges',
    title: 'Top 10 Luxury Safari Lodges in Africa',
    excerpt: 'Discover the most exclusive and luxurious safari lodges that combine world-class comfort with unforgettable wildlife experiences.',
    image: images.blog.luxuryLodges,
    author: 'Emily Thompson',
    date: 'March 1, 2024',
    category: 'Accommodation',
    readTime: '8 min read',
  },
  {
    id: 5,
    slug: 'cultural-experiences',
    title: 'Cultural Experiences on Safari',
    excerpt: 'Enrich your safari experience by immersing yourself in the vibrant cultures and traditions of local communities.',
    image: images.blog.culturalExperiences,
    author: 'Grace Mwangi',
    date: 'February 25, 2024',
    category: 'Culture',
    readTime: '6 min read',
  },
]

const categories = [
  'All',
  'Travel Tips',
  'Photography',
  'Wildlife',
  'Accommodation',
  'Culture',
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-gray-900">
        <Image
          src={images.heroes.blog}
          alt="Safari Blog"
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Safari Blog</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Discover insights, tips, and stories about African safaris
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <div className="mb-12 space-y-6">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${selectedCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-orange-600 font-medium">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-xl font-semibold mb-2 text-gray-900">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 bg-orange-50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">
            Stay Updated with Safari Insights
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest safari tips, wildlife photography guides, and travel inspiration.
          </p>
          <div className="flex max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 