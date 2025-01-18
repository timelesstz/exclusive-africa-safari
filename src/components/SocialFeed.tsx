'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { motion, AnimatePresence } from 'framer-motion'
import { HeartIcon, ChatBubbleOvalLeftIcon, ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { 
  InstagramIcon, 
  FacebookIcon, 
  TwitterIcon 
} from '@/components/icons/SocialIcons'

interface SocialPost {
  id: string
  platform: 'instagram' | 'facebook' | 'twitter'
  author: {
    name: string
    username: string
    image: string
  }
  date: string
  content: string
  media?: {
    type: 'image' | 'video'
    url: string
    thumbnail?: string
  }
  stats: {
    likes: number
    comments: number
  }
  url: string
}

interface SocialFeedProps {
  posts: SocialPost[]
  title?: string
}

export default function SocialFeed({ posts, title = "Social Media" }: SocialFeedProps) {
  const [mounted, setMounted] = useState(false)
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set())

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleImageLoad = (postId: string) => {
    setLoadingImages(prev => {
      const newSet = new Set(prev)
      newSet.delete(postId)
      return newSet
    })
  }

  const handleImageLoadStart = (postId: string) => {
    setLoadingImages(prev => {
      const newSet = new Set(prev)
      newSet.add(postId)
      return newSet
    })
  }

  const handleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const getPlatformIcon = (platform: SocialPost['platform']) => {
    switch (platform) {
      case 'instagram':
        return <InstagramIcon className="w-5 h-5" />
      case 'facebook':
        return <FacebookIcon className="w-5 h-5" />
      case 'twitter':
        return <TwitterIcon className="w-5 h-5" />
    }
  }

  const getPlatformColor = (platform: SocialPost['platform']) => {
    switch (platform) {
      case 'instagram':
        return 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500'
      case 'facebook':
        return 'bg-blue-600'
      case 'twitter':
        return 'bg-sky-500'
      default:
        return 'bg-gray-500'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, 'MMM d, yyyy')
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? posts.length - 1 : prev - 1
    )
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === posts.length - 1 ? 0 : prev + 1
    )
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-0">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0"
      >
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        <div className="flex gap-3">
          {['instagram', 'facebook', 'twitter'].map(platform => (
            <motion.div
              key={platform}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`w-10 h-10 rounded-full ${getPlatformColor(platform as SocialPost['platform'])} text-white flex items-center justify-center shadow-md hover:shadow-lg transition-shadow cursor-pointer`}
            >
              {getPlatformIcon(platform as SocialPost['platform'])}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
          >
            {/* Post Header */}
            <div className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3 border-b border-gray-100">
              <div className="relative w-10 sm:w-12 h-10 sm:h-12 rounded-full overflow-hidden bg-gray-100">
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 40px, 48px"
                  onLoadingComplete={() => handleImageLoad(post.id + '_avatar')}
                  onLoadStart={() => handleImageLoadStart(post.id + '_avatar')}
                />
                {loadingImages.has(post.id + '_avatar') && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{post.author.name}</p>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                  <span className="truncate">@{post.author.username}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline">{formatDate(post.date)}</span>
                </div>
              </div>
              <div
                className={`w-8 h-8 rounded-full ${getPlatformColor(
                  post.platform
                )} text-white flex items-center justify-center flex-shrink-0`}
              >
                {getPlatformIcon(post.platform)}
              </div>
            </div>

            {/* Post Media */}
            {post.media && (
              <div
                className="relative aspect-square cursor-pointer group bg-gray-100"
                onClick={() => {
                  setSelectedMedia(post.media?.url || null)
                  setCurrentImageIndex(index)
                }}
              >
                <Image
                  src={post.media.url}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  onLoadingComplete={() => handleImageLoad(post.id)}
                  onLoadStart={() => handleImageLoadStart(post.id)}
                />
                {loadingImages.has(post.id) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                {post.media.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                    <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-white/90 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                      <div className="w-0 h-0 border-t-6 sm:border-t-8 border-t-transparent border-l-10 sm:border-l-12 border-l-black border-b-6 sm:border-b-8 border-b-transparent ml-1" />
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            )}

            {/* Post Content */}
            <div className="p-3 sm:p-4">
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-3">{post.content}</p>
              <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                <div className="flex items-center gap-3 sm:gap-4">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-1 hover:text-red-500 transition-colors"
                  >
                    {likedPosts.has(post.id) ? (
                      <HeartIconSolid className="w-4 sm:w-5 h-4 sm:h-5 text-red-500" />
                    ) : (
                      <HeartIcon className="w-4 sm:w-5 h-4 sm:h-5" />
                    )}
                    {post.stats.likes + (likedPosts.has(post.id) ? 1 : 0)}
                  </motion.button>
                  <div className="flex items-center gap-1">
                    <ChatBubbleOvalLeftIcon className="w-4 sm:w-5 h-4 sm:h-5" />
                    {post.stats.comments}
                  </div>
                </div>
                <Link
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 hover:text-orange-700 font-medium"
                >
                  View Post
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Enhanced Lightbox */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 sm:p-0"
            onClick={() => setSelectedMedia(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative aspect-square sm:aspect-auto sm:h-auto bg-gray-100">
                <Image
                  src={posts[currentImageIndex].media?.url || ''}
                  alt="Social media post"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 1536px) 1024px"
                  onLoadingComplete={() => handleImageLoad('lightbox')}
                  onLoadStart={() => handleImageLoadStart('lightbox')}
                />
                {loadingImages.has('lightbox') && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/50 to-transparent">
                <p className="text-xs sm:text-sm text-white">
                  Posted by {posts[currentImageIndex].author.name} on {formatDate(posts[currentImageIndex].date)}
                </p>
              </div>
              <button
                className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white hover:text-gray-300 bg-black/50 p-1.5 sm:p-2 rounded-full transition-colors"
                onClick={() => setSelectedMedia(null)}
              >
                <XMarkIcon className="w-5 sm:w-6 h-5 sm:h-6" />
              </button>
              <button
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 p-1.5 sm:p-2 rounded-full transition-colors"
                onClick={handlePrevImage}
              >
                <ChevronLeftIcon className="w-5 sm:w-6 h-5 sm:h-6" />
              </button>
              <button
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 p-1.5 sm:p-2 rounded-full transition-colors"
                onClick={handleNextImage}
              >
                <ChevronRightIcon className="w-5 sm:w-6 h-5 sm:h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 