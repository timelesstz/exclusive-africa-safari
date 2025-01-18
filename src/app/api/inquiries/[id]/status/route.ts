import { NextResponse } from 'next/server'

// This would typically be in a database
let inquiries: any[] = []

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json()
    const { id } = params

    // Find and update the inquiry (this would typically be a database query)
    const inquiry = inquiries.find((inq) => inq.id === id)
    if (!inquiry) {
      return NextResponse.json(
        { error: 'Inquiry not found' },
        { status: 404 }
      )
    }

    // Validate status
    if (!['new', 'responded'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    // Update status
    inquiry.status = status

    return NextResponse.json(
      { message: 'Status updated successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Failed to update status:', error)
    return NextResponse.json(
      { error: 'Failed to update status' },
      { status: 500 }
    )
  }
} 