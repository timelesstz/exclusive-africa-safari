import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

let packages = [
  // Your packages data here
]

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const pkg = packages.find((p) => p.slug === params.slug)
    if (!pkg) {
      return new NextResponse(
        JSON.stringify({ error: 'Package not found' }),
        { status: 404 }
      )
    }
    return NextResponse.json(pkg)
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch package' }),
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
    const index = packages.findIndex((p) => p.slug === params.slug)
    if (index === -1) {
      return new NextResponse(
        JSON.stringify({ error: 'Package not found' }),
        { status: 404 }
      )
    }

    packages[index] = {
      ...packages[index],
      ...body,
      slug: params.slug,
    }

    return NextResponse.json(packages[index])
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Failed to update package' }),
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
    const index = packages.findIndex((p) => p.slug === params.slug)
    if (index === -1) {
      return new NextResponse(
        JSON.stringify({ error: 'Package not found' }),
        { status: 404 }
      )
    }

    packages = packages.filter((p) => p.slug !== params.slug)
    return NextResponse.json({ message: 'Package deleted successfully' })
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Failed to delete package' }),
      { status: 500 }
    )
  }
} 