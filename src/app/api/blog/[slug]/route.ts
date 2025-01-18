import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

let posts = [
  // Your blog posts data here
]

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const post = posts.find((p) => p.slug === params.slug)
    if (!post) {
      return new NextResponse(
        JSON.stringify({ error: 'Post not found' }),
        { status: 404 }
      )
    }
    return NextResponse.json(post)
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch post' }),
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const session = await getServerSession()
  if (!session) {
    return new NextResponse(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const index = posts.findIndex((p) => p.slug === params.slug)
    if (index === -1) {
      return new NextResponse(
        JSON.stringify({ error: 'Post not found' }),
        { status: 404 }
      )
    }

    posts[index] = {
      ...posts[index],
      ...body,
      slug: params.slug,
    }

    return NextResponse.json(posts[index])
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Failed to update post' }),
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const session = await getServerSession()
  if (!session) {
    return new NextResponse(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401 }
    )
  }

  try {
    const index = posts.findIndex((p) => p.slug === params.slug)
    if (index === -1) {
      return new NextResponse(
        JSON.stringify({ error: 'Post not found' }),
        { status: 404 }
      )
    }

    posts = posts.filter((p) => p.slug !== params.slug)
    return NextResponse.json({ message: 'Post deleted successfully' })
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Failed to delete post' }),
      { status: 500 }
    )
  }
} 