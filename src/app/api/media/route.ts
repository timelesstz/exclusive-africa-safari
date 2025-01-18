import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// This would typically be replaced with a database
let mediaItems = [
  {
    id: '1',
    title: 'Lion in Serengeti',
    url: '/lion.jpg',
    publicId: 'safari/lion',
    uploadedAt: '2024-03-15',
    type: 'image',
  },
]

export async function GET() {
  try {
    return NextResponse.json(mediaItems)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch media items' },
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
    const newItem = {
      id: Date.now().toString(),
      ...data,
      uploadedAt: new Date().toISOString().split('T')[0],
    }

    mediaItems.push(newItem)

    return NextResponse.json(newItem, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create media item' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const publicId = searchParams.get('publicId')

    if (!id || !publicId) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId)

    // Delete from local storage
    mediaItems = mediaItems.filter((item) => item.id !== id)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete media item' },
      { status: 500 }
    )
  }
} 