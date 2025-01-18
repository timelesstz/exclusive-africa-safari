import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// This would typically be in a database
let inquiries: any[] = []

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { message } = await request.json()
    const { id } = params

    // Find the inquiry (this would typically be a database query)
    const inquiry = inquiries.find((inq) => inq.id === id)
    if (!inquiry) {
      return NextResponse.json(
        { error: 'Inquiry not found' },
        { status: 404 }
      )
    }

    // Send reply email to customer
    await resend.emails.send({
      from: 'Safari Adventures <no-reply@yourdomain.com>',
      to: inquiry.email,
      subject: `Re: Your Safari Inquiry - ${inquiry.packageTitle}`,
      html: `
        <h2>Response to Your Safari Inquiry</h2>
        <p>Dear ${inquiry.name},</p>
        <p>${message}</p>
        <h3>Your Original Inquiry</h3>
        <p><strong>Package:</strong> ${inquiry.packageTitle}</p>
        <p><strong>Duration:</strong> ${inquiry.packageDuration}</p>
        <p><strong>Travel Dates:</strong> ${inquiry.travelDates}</p>
        <p><strong>Group Size:</strong> ${inquiry.groupSize}</p>
        <p>Best regards,<br>Safari Adventures Team</p>
      `,
    })

    // Update inquiry status (this would typically be a database update)
    inquiry.status = 'responded'

    return NextResponse.json(
      { message: 'Reply sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Failed to send reply:', error)
    return NextResponse.json(
      { error: 'Failed to send reply' },
      { status: 500 }
    )
  }
} 