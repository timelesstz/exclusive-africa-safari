import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import nodemailer from 'nodemailer'

// Mock function to get inquiry by slug
function getInquiry(slug: string) {
  // In a real app, this would fetch from a database
  return {
    slug,
    name: 'John Doe',
    email: 'john@example.com',
    package: 'Serengeti Migration Safari',
    message: 'Interested in booking this safari.',
  }
}

export async function POST(
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
    const { replyText } = body

    if (!replyText) {
      return new NextResponse(
        JSON.stringify({ error: 'Reply text is required' }),
        { status: 400 }
      )
    }

    const inquiry = getInquiry(params.slug)
    if (!inquiry) {
      return new NextResponse(
        JSON.stringify({ error: 'Inquiry not found' }),
        { status: 404 }
      )
    }

    // Send email using nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: inquiry.email,
      subject: `Re: Your Inquiry about ${inquiry.package}`,
      text: replyText,
      html: `<div>${replyText}</div>`,
    })

    return NextResponse.json({ message: 'Reply sent successfully' })
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Failed to send reply' }),
      { status: 500 }
    )
  }
} 