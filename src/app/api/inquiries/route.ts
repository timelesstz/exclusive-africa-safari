import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// This would typically be in a database
let inquiries: any[] = []

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const inquiry = {
      id: Date.now().toString(),
      ...data,
      status: 'new',
      createdAt: new Date().toISOString(),
    }

    // Store the inquiry (this would typically go to a database)
    inquiries.push(inquiry)

    // Send email notification to admin
    await resend.emails.send({
      from: 'Safari Inquiries <inquiries@yourdomain.com>',
      to: process.env.ADMIN_EMAIL || 'admin@yourdomain.com',
      subject: `New Safari Inquiry: ${data.packageTitle}`,
      html: `
        <h2>New Safari Inquiry</h2>
        <p><strong>Package:</strong> ${data.packageTitle}</p>
        <p><strong>Duration:</strong> ${data.packageDuration}</p>
        <p><strong>Price Range:</strong> ${data.budget}</p>
        <h3>Customer Details</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Travel Dates:</strong> ${data.travelDates}</p>
        <p><strong>Group Size:</strong> ${data.groupSize}</p>
        <h3>Custom Requests</h3>
        <p>${data.customRequests || 'None'}</p>
      `,
    })

    // Send confirmation email to customer
    await resend.emails.send({
      from: 'Safari Adventures <no-reply@yourdomain.com>',
      to: data.email,
      subject: 'We received your safari inquiry',
      html: `
        <h2>Thank you for your inquiry!</h2>
        <p>Dear ${data.name},</p>
        <p>We have received your inquiry about the ${data.packageTitle} package. Our team will review your request and get back to you within 24 hours.</p>
        <h3>Inquiry Details</h3>
        <p><strong>Package:</strong> ${data.packageTitle}</p>
        <p><strong>Duration:</strong> ${data.packageDuration}</p>
        <p><strong>Preferred Travel Dates:</strong> ${data.travelDates}</p>
        <p><strong>Group Size:</strong> ${data.groupSize}</p>
        <p>If you have any immediate questions, please don't hesitate to contact us.</p>
        <p>Best regards,<br>Safari Adventures Team</p>
      `,
    })

    return NextResponse.json(
      { message: 'Inquiry submitted successfully', id: inquiry.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Failed to process inquiry:', error)
    return NextResponse.json(
      { error: 'Failed to process inquiry' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    return NextResponse.json(inquiries)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch inquiries' },
      { status: 500 }
    )
  }
} 