import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

// This would typically be replaced with a database
let locations = [
  {
    id: '1',
    name: 'Serengeti National Park',
    description: 'Home to the great wildebeest migration.',
    latitude: -2.3333,
    longitude: 34.8333,
  },
  {
    id: '2',
    name: 'Ngorongoro Crater',
    description: 'A UNESCO World Heritage Site.',
    latitude: -3.2,
    longitude: 35.5,
  },
]

export async function GET() {
  try {
    return NextResponse.json(locations)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch locations' },
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
    const newLocation = {
      id: Date.now().toString(),
      ...data,
    }

    locations.push(newLocation)

    return NextResponse.json(newLocation, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create location' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const data = await request.json()
    const index = locations.findIndex((loc) => loc.id === data.id)

    if (index === -1) {
      return NextResponse.json(
        { error: 'Location not found' },
        { status: 404 }
      )
    }

    locations[index] = { ...locations[index], ...data }

    return NextResponse.json(locations[index])
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update location' },
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

    if (!id) {
      return NextResponse.json(
        { error: 'Missing location ID' },
        { status: 400 }
      )
    }

    const index = locations.findIndex((loc) => loc.id === id)

    if (index === -1) {
      return NextResponse.json(
        { error: 'Location not found' },
        { status: 404 }
      )
    }

    locations = locations.filter((loc) => loc.id !== id)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete location' },
      { status: 500 }
    )
  }
} 