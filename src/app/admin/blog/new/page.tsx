'use client'

import BlogPostForm from '@/components/BlogPostForm'

export default function NewBlogPostPage() {
  const handleSubmit = async (data: any) => {
    // Here you would typically make an API call to create the blog post
    console.log('Creating blog post:', data)
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Create New Blog Post</h1>
        <p className="mt-2 text-sm text-gray-700">
          Share your insights and experiences with your audience.
        </p>
      </div>

      <BlogPostForm onSubmit={handleSubmit} />
    </div>
  )
} 