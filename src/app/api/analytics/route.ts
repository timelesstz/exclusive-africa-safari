import { NextResponse } from 'next/server'
import { analytics } from '@vercel/analytics'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const timeframe = searchParams.get('timeframe') || '30d'

    // Get analytics data from Vercel Analytics
    const [pageViews, packageViews, inquiries] = await Promise.all([
      analytics.retrievePageViews(timeframe),
      analytics.retrieveCustomEvents('package_view', timeframe),
      analytics.retrieveCustomEvents('inquiry_submission', timeframe),
    ])

    // Calculate trends (comparing to previous period)
    const previousTimeframe = timeframe === '7d' ? '14d' : timeframe === '30d' ? '60d' : '180d'
    const [previousPageViews, previousPackageViews, previousInquiries] = await Promise.all([
      analytics.retrievePageViews(previousTimeframe),
      analytics.retrieveCustomEvents('package_view', previousTimeframe),
      analytics.retrieveCustomEvents('inquiry_submission', previousTimeframe),
    ])

    // Process package views
    const packageViewsByPackage = packageViews.events.reduce((acc, event) => {
      const { packageId, packageTitle } = event.properties
      if (!acc[packageId]) {
        acc[packageId] = {
          packageId,
          packageTitle,
          views: 0,
        }
      }
      acc[packageId].views++
      return acc
    }, {} as Record<string, { packageId: string; packageTitle: string; views: number }>)

    // Process locations
    const locationCounts = pageViews.pages.reduce((acc, page) => {
      const location = page.properties?.location
      if (location) {
        acc[location] = (acc[location] || 0) + page.views
      }
      return acc
    }, {} as Record<string, number>)

    const topLocations = Object.entries(locationCounts)
      .map(([location, count]) => ({ location, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // Calculate trends
    const calculateTrend = (current: number, previous: number) => {
      if (previous === 0) return 0
      return Math.round(((current - previous) / previous) * 100)
    }

    const response = {
      pageViews: {
        total: pageViews.total,
        trend: calculateTrend(
          pageViews.total,
          previousPageViews.total
        ),
      },
      packageViews: {
        total: packageViews.events.length,
        trend: calculateTrend(
          packageViews.events.length,
          previousPackageViews.events.length
        ),
        byPackage: Object.values(packageViewsByPackage),
      },
      inquiries: {
        total: inquiries.events.length,
        trend: calculateTrend(
          inquiries.events.length,
          previousInquiries.events.length
        ),
        byType: {
          general: inquiries.events.filter(e => e.properties.inquiryType === 'general').length,
          specific: inquiries.events.filter(e => e.properties.inquiryType === 'specific').length,
        },
      },
      topLocations,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    )
  }
} 