import AnalyticsDashboard from '@/components/AnalyticsDashboard'

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
          <p className="mt-2 text-sm text-gray-600">
            Track key metrics and insights about your safari packages.
          </p>
        </div>

        <AnalyticsDashboard />
      </div>
    </div>
  )
} 