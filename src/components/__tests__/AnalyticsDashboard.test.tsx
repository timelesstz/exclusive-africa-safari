import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import AnalyticsDashboard from '../AnalyticsDashboard'

// Mock fetch
const mockAnalyticsData = {
  pageViews: {
    total: 1000,
    trend: 5
  },
  packageViews: {
    total: 500,
    trend: 10,
    byPackage: [
      { packageId: '1', packageTitle: 'Test Package', views: 100 }
    ]
  },
  inquiries: {
    total: 50,
    trend: -2,
    byType: {
      general: 30,
      specific: 20
    }
  },
  topLocations: [
    { location: 'Test Location', count: 200 }
  ]
}

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockAnalyticsData)
  })
) as jest.Mock

describe('AnalyticsDashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders loading state initially', () => {
    render(<AnalyticsDashboard />)
    expect(screen.getByRole('group')).toBeInTheDocument()
    expect(document.querySelector('.animate-pulse')).toBeInTheDocument()
  })

  it('fetches and displays analytics data', async () => {
    render(<AnalyticsDashboard />)
    
    await waitFor(() => {
      expect(screen.getByText('1,000')).toBeInTheDocument() // Page views
      expect(screen.getByText('500')).toBeInTheDocument() // Package views
      expect(screen.getByText('50')).toBeInTheDocument() // Inquiries
      expect(screen.getByText('Test Location')).toBeInTheDocument()
    })

    expect(global.fetch).toHaveBeenCalledWith('/api/analytics?timeframe=30d')
  })

  it('changes timeframe when buttons are clicked', async () => {
    render(<AnalyticsDashboard />)
    
    const sevenDaysButton = screen.getByText('Last 7 Days')
    fireEvent.click(sevenDaysButton)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/analytics?timeframe=7d')
    })
  })

  it('displays trend indicators correctly', async () => {
    render(<AnalyticsDashboard />)
    
    await waitFor(() => {
      expect(screen.getByText('+5%')).toBeInTheDocument() // Page views trend
      expect(screen.getByText('+10%')).toBeInTheDocument() // Package views trend
      expect(screen.getByText('-2%')).toBeInTheDocument() // Inquiries trend
    })
  })

  it('displays inquiry type breakdown', async () => {
    render(<AnalyticsDashboard />)
    
    await waitFor(() => {
      expect(screen.getByText('30')).toBeInTheDocument() // General inquiries
      expect(screen.getByText('20')).toBeInTheDocument() // Specific inquiries
    })
  })
}) 