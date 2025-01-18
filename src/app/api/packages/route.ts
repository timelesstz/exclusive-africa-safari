import { NextResponse } from 'next/server'
import { safariPackages } from '@/data/packages'

// In a real app, this would be a database
let packages = [...safariPackages]

// GET /api/packages - List all packages
export async function GET() {
  try {
    return NextResponse.json(packages)
  } catch (error) {
    console.error('GET packages error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch packages' },
      { status: 500 }
    )
  }
}

// POST /api/packages - Create a new package
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['title', 'subtitle', 'duration', 'location', 'startingPrice']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Generate ID and slug
    const id = Math.random().toString(36).substring(7)
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const newPackage = {
      id,
      slug,
      ...body,
      featured: body.featured || false,
      groupSize: body.groupSize || { min: 2, max: 6 },
    }

    packages.push(newPackage)

    return NextResponse.json(newPackage, { status: 201 })
  } catch (error) {
    console.error('POST package error:', error)
    return NextResponse.json(
      { error: 'Failed to create package' },
      { status: 500 }
    )
  }
}

// PATCH /api/packages - Update multiple packages
export async function PATCH(request: Request) {
  try {
    const updates = await request.json()
    
    if (!Array.isArray(updates)) {
      return NextResponse.json(
        { error: 'Updates must be an array' },
        { status: 400 }
      )
    }

    const updatedPackages = []
    
    for (const update of updates) {
      const { id, ...changes } = update
      
      if (!id) {
        return NextResponse.json(
          { error: 'Each update must include an id' },
          { status: 400 }
        )
      }

      const index = packages.findIndex(p => p.id === id)
      
      if (index === -1) {
        return NextResponse.json(
          { error: `Package not found: ${id}` },
          { status: 404 }
        )
      }

      packages[index] = { ...packages[index], ...changes }
      updatedPackages.push(packages[index])
    }

    return NextResponse.json(updatedPackages)
  } catch (error) {
    console.error('PATCH packages error:', error)
    return NextResponse.json(
      { error: 'Failed to update packages' },
      { status: 500 }
    )
  }
} 