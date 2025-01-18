'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getBlogPostBySlug } from '@/data/blog'

export default function AdminBlogEditPage({
  params,
}: {
  params: { slug: string }
}) {
  const router = useRouter()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = getBlogPostBySlug(params.slug)
        if (!postData) {
          router.push('/admin/blog')
          return
        }
        setPost(postData)
      } catch (error) {
        console.error('Failed to fetch post:', error)
        router.push('/admin/blog')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [params.slug, router])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!post) {
    return null
  }

  return (
    <div>
      {/* Your edit form implementation */}
    </div>
  )
} 