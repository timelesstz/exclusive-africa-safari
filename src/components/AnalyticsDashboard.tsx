'use client'

import { useState, useEffect } from 'react'
import {
  ChartBarIcon,
  EyeIcon,
  EnvelopeIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface AnalyticsData {
  pageViews: {
    total: number
    trend: number // percentage change
  }
  packageViews: {
    total: number
    trend: number
    byPackage: Array<{
      packageId: string
      packageTitle: string
      views: number
    }>
  }
  inquiries: {
    total: number
    trend: number
    byType: {
      general: number
      specific: number
    }
  }
  topLocations: Array<{
    location: string
    count: number
  }>
}

export default function AnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d')
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/analytics?timeframe=${timeframe}`)
        if (!response.ok) throw new Error('Failed to fetch analytics')
        const analyticsData = await response.json()
        setData(analyticsData)
      } catch (error) {
        console.error('Analytics error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalytics()
  }, [timeframe])

  if (isLoading || !data) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-4" />
                <div className="h-12 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-end">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => setTimeframe(range)}
              className={`
                px-4 py-2 text-sm font-medium
                ${timeframe === range
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-gray-700 hover:text-gray-900'
                }
                ${range === '7d' ? 'rounded-l-lg' : ''}
                ${range === '90d' ? 'rounded-r-lg' : ''}
                border border-gray-200
                hover:bg-orange-50
                focus:z-10 focus:ring-2 focus:ring-orange-500 focus:text-orange-700
              `}
            >
              {range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <EyeIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Page Views
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {data.pageViews.total.toLocaleString()}
                    </div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      data.pageViews.trend > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {data.pageViews.trend > 0 ? '+' : ''}{data.pageViews.trend}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ChartBarIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Package Views
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {data.packageViews.total.toLocaleString()}
                    </div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      data.packageViews.trend > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {data.packageViews.trend > 0 ? '+' : ''}{data.packageViews.trend}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <EnvelopeIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Inquiries
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {data.inquiries.total.toLocaleString()}
                    </div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      data.inquiries.trend > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {data.inquiries.trend > 0 ? '+' : ''}{data.inquiries.trend}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MapPinIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Top Location
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {data.topLocations[0]?.location || 'N/A'}
                    </div>
                    <div className="ml-2 text-sm text-gray-500">
                      {data.topLocations[0]?.count.toLocaleString()} views
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Package Views Chart */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Package Views</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.packageViews.byPackage}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="packageTitle"
                tick={{ fontSize: 12 }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="views" fill="#f97316" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Inquiry Types */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Inquiry Types</h3>
          <dl className="space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-500">General Inquiries</dt>
              <dd className="text-sm font-medium text-gray-900">
                {data.inquiries.byType.general.toLocaleString()}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-500">Package-Specific Inquiries</dt>
              <dd className="text-sm font-medium text-gray-900">
                {data.inquiries.byType.specific.toLocaleString()}
              </dd>
            </div>
          </dl>
        </div>

        {/* Top Locations */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Locations</h3>
          <div className="flow-root">
            <ul className="-my-2">
              {data.topLocations.map((location, index) => (
                <li
                  key={location.location}
                  className={`py-2 ${
                    index !== data.topLocations.length - 1 ? 'border-b border-gray-200' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">{location.location}</div>
                    <div className="text-sm font-medium text-gray-900">
                      {location.count.toLocaleString()} views
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 