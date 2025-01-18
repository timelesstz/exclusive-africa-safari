import { NextResponse } from 'next/server'
import { safariPackages } from '@/data/packages'

// In a real app, this would be a database
let packages = [...safariPackages]

// GET /api/packages/[id] - Get a single package
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const pkg = packages.find(p => p.id === params.id)
    
    if (!pkg) {
      return NextResponse.json(
        { error: 'Package not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(pkg)
  } catch (error) {
    console.error('GET package error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch package' },
      { status: 500 }
    )
  }
}

// PATCH /api/packages/[id] - Update a single package
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const index = packages.findIndex(p => p.id === params.id)
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Package not found' },
        { status: 404 }
      )
    }

    const changes = await request.json()
    packages[index] = { ...packages[index], ...changes }

    return NextResponse.json(packages[index])
  } catch (error) {
    console.error('PATCH package error:', error)
    return NextResponse.json(
      { error: 'Failed to update package' },
      { status: 500 }
    )
  }
}

// DELETE /api/packages/[id] - Delete a single package
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const index = packages.findIndex(p => p.id === params.id)
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Package not found' },
        { status: 404 }
      )
    }

    packages.splice(index, 1)

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('DELETE package error:', error)
    return NextResponse.json(
      { error: 'Failed to delete package' },
      { status: 500 }
    )
  }
} 