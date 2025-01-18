import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

// This would typically be replaced with a database
let posts = [
  {
    id: '1',
    title: 'Top 10 Wildlife Photography Tips for Safari',
    excerpt: 'Master the art of wildlife photography with these expert tips.',
    content: `<h2>1. Use a Long Lens</h2>
<p>When photographing wildlife, a telephoto lens is essential. It allows you to keep a safe distance while getting close-up shots.</p>

<h2>2. Early Morning and Late Afternoon</h2>
<p>The golden hours provide the best lighting for wildlife photography. Animals are also more active during these times.</p>

<h2>3. Be Patient</h2>
<p>Wildlife photography requires patience. Sometimes you need to wait hours for the perfect shot.</p>`,
    category: 'Photography',
    status: 'published',
    author: 'John Smith',
    featuredImage: '/wildlife-photography.jpg',
    publishedAt: '2024-03-15',
  },
]

export async function GET() {
  try {
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const data = await request.json()
    const newPost = {
      id: Date.now().toString(),
      ...data,
      publishedAt: data.status === 'published'
        ? new Date().toISOString().split('T')[0]
        : null,
    }

    posts.push(newPost)

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
} 