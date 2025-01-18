import { trackEvent, trackPageView, trackPackageView, trackInquirySubmission } from '../analytics'

// Mock window.va
const mockVa = jest.fn()
beforeEach(() => {
  window.va = mockVa
  jest.clearAllMocks()
})

describe('Analytics Utilities', () => {
  describe('trackEvent', () => {
    it('should call window.va with correct parameters', () => {
      const event = {
        name: 'test_event',
        properties: { test: 'value' }
      }
      trackEvent(event)
      expect(mockVa).toHaveBeenCalledWith('event', event.name, event.properties)
    })
  })

  describe('trackPageView', () => {
    it('should track page view with correct properties', () => {
      const pageView = {
        path: '/test',
        title: 'Test Page',
        referrer: 'https://google.com'
      }
      trackPageView(pageView)
      expect(mockVa).toHaveBeenCalledWith('event', 'page_view', pageView)
    })
  })

  describe('trackPackageView', () => {
    it('should track package view with correct properties', () => {
      const packageView = {
        packageId: 'test-id',
        packageTitle: 'Test Package',
        location: 'Test Location'
      }
      trackPackageView(packageView)
      expect(mockVa).toHaveBeenCalledWith('event', 'package_view', packageView)
    })
  })

  describe('trackInquirySubmission', () => {
    it('should track inquiry submission with correct properties', () => {
      const inquiry = {
        packageId: 'test-id',
        packageTitle: 'Test Package',
        inquiryType: 'general' as const
      }
      trackInquirySubmission(inquiry)
      expect(mockVa).toHaveBeenCalledWith('event', 'inquiry_submission', inquiry)
    })
  })
}) 