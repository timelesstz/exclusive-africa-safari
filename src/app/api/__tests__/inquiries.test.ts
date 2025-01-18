import { GET, POST, PATCH } from '../inquiries/route'
import { Resend } from 'resend'

// Mock Resend
jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ id: 'test-email-id' }),
    },
  })),
}))

describe('Inquiries API Route', () => {
  const mockInquiry = {
    id: '1',
    packageId: 'test-package',
    packageTitle: 'Test Safari',
    packageDuration: '7 days',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    travelDates: '2024-06-01',
    groupSize: 4,
    budget: 5000,
    message: 'Test inquiry message',
    status: 'new',
    createdAt: new Date().toISOString(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET', () => {
    it('returns all inquiries', async () => {
      const request = new Request('http://localhost/api/inquiries')
      const response = await GET(request)
      const data = await response.json()

      expect(Array.isArray(data)).toBe(true)
      if (data.length > 0) {
        expect(data[0]).toEqual(expect.objectContaining({
          id: expect.any(String),
          packageTitle: expect.any(String),
          status: expect.any(String),
        }))
      }
    })
  })

  describe('POST', () => {
    it('creates a new inquiry and sends notifications', async () => {
      const request = new Request('http://localhost/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockInquiry),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual(expect.objectContaining({
        id: expect.any(String),
        status: 'new',
      }))

      // Verify email notifications were sent
      const resendInstance = (Resend as jest.Mock).mock.results[0].value
      expect(resendInstance.emails.send).toHaveBeenCalledTimes(2) // Admin + Customer notifications
    })

    it('handles missing required fields', async () => {
      const invalidInquiry = { ...mockInquiry }
      delete invalidInquiry.email // Remove required field

      const request = new Request('http://localhost/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invalidInquiry),
      })

      const response = await POST(request)
      expect(response.status).toBe(400)
    })

    it('handles email sending failures', async () => {
      // Mock email sending failure
      const resendInstance = (Resend as jest.Mock).mock.results[0].value
      resendInstance.emails.send.mockRejectedValueOnce(new Error('Email sending failed'))

      const request = new Request('http://localhost/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockInquiry),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBeDefined()
    })
  })

  describe('PATCH', () => {
    it('updates inquiry status', async () => {
      const request = new Request('http://localhost/api/inquiries/1', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'responded' }),
      })

      const response = await PATCH(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual(expect.objectContaining({
        id: expect.any(String),
        status: 'responded',
      }))
    })

    it('handles invalid status values', async () => {
      const request = new Request('http://localhost/api/inquiries/1', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'invalid-status' }),
      })

      const response = await PATCH(request)
      expect(response.status).toBe(400)
    })

    it('handles non-existent inquiries', async () => {
      const request = new Request('http://localhost/api/inquiries/non-existent', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'responded' }),
      })

      const response = await PATCH(request)
      expect(response.status).toBe(404)
    })
  })
}) 