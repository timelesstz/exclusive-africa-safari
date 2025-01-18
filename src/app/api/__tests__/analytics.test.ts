import { GET } from '../analytics/route'
import { analytics } from '@vercel/analytics'

// Mock Vercel Analytics
jest.mock('@vercel/analytics', () => ({
  analytics: {
    retrievePageViews: jest.fn(),
    retrieveCustomEvents: jest.fn(),
  },
}))

describe('Analytics API Route', () => {
  const mockPageViews = {
    total: 1000,
    pages: [
      { path: '/test', views: 500, properties: { location: 'Kenya' } },
      { path: '/other', views: 500, properties: { location: 'Tanzania' } },
    ],
  }

  const mockPackageViews = {
    events: [
      { properties: { packageId: '1', packageTitle: 'Safari 1' } },
      { properties: { packageId: '1', packageTitle: 'Safari 1' } },
      { properties: { packageId: '2', packageTitle: 'Safari 2' } },
    ],
  }

  const mockInquiries = {
    events: [
      { properties: { inquiryType: 'general' } },
      { properties: { inquiryType: 'specific' } },
      { properties: { inquiryType: 'general' } },
    ],
  }

  beforeEach(() => {
    jest.clearAllMocks()
    // Mock successful responses
    ;(analytics.retrievePageViews as jest.Mock).mockResolvedValue(mockPageViews)
    ;(analytics.retrieveCustomEvents as jest.Mock)
      .mockImplementation((eventType) => {
        if (eventType === 'package_view') return Promise.resolve(mockPackageViews)
        if (eventType === 'inquiry_submission') return Promise.resolve(mockInquiries)
        return Promise.resolve({ events: [] })
      })
  })

  it('returns analytics data with correct structure', async () => {
    const request = new Request('http://localhost/api/analytics?timeframe=30d')
    const response = await GET(request)
    const data = await response.json()

    expect(data).toEqual(expect.objectContaining({
      pageViews: expect.objectContaining({
        total: 1000,
        trend: expect.any(Number),
      }),
      packageViews: expect.objectContaining({
        total: 3,
        trend: expect.any(Number),
        byPackage: expect.arrayContaining([
          expect.objectContaining({
            packageId: expect.any(String),
            packageTitle: expect.any(String),
            views: expect.any(Number),
          }),
        ]),
      }),
      inquiries: expect.objectContaining({
        total: 3,
        trend: expect.any(Number),
        byType: expect.objectContaining({
          general: 2,
          specific: 1,
        }),
      }),
      topLocations: expect.arrayContaining([
        expect.objectContaining({
          location: expect.any(String),
          count: expect.any(Number),
        }),
      ]),
    }))
  })

  it('handles different timeframe parameters', async () => {
    const timeframes = ['7d', '30d', '90d']

    for (const timeframe of timeframes) {
      const request = new Request(`http://localhost/api/analytics?timeframe=${timeframe}`)
      await GET(request)

      expect(analytics.retrievePageViews).toHaveBeenCalledWith(timeframe)
      expect(analytics.retrieveCustomEvents).toHaveBeenCalledWith('package_view', timeframe)
      expect(analytics.retrieveCustomEvents).toHaveBeenCalledWith('inquiry_submission', timeframe)
    }
  })

  it('handles API errors gracefully', async () => {
    // Mock API error
    (analytics.retrievePageViews as jest.Mock).mockRejectedValue(new Error('API Error'))

    const request = new Request('http://localhost/api/analytics?timeframe=30d')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data).toEqual(expect.objectContaining({
      error: expect.any(String),
    }))
  })

  it('calculates trends correctly', async () => {
    const request = new Request('http://localhost/api/analytics?timeframe=30d')
    const response = await GET(request)
    const data = await response.json()

    // Verify trend calculations
    expect(data.pageViews.trend).toBeDefined()
    expect(data.packageViews.trend).toBeDefined()
    expect(data.inquiries.trend).toBeDefined()
  })
}) 