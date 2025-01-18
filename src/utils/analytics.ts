import { Analytics } from '@vercel/analytics/react'

export interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
}

export interface PageView {
  path: string
  title: string
  referrer?: string
}

export interface PackageView {
  packageId: string
  packageTitle: string
  location: string
}

export interface InquirySubmission {
  packageId: string
  packageTitle: string
  inquiryType: 'general' | 'specific'
}

export function trackEvent(event: AnalyticsEvent) {
  if (typeof window !== 'undefined' && window.va) {
    window.va('event', event.name, event.properties)
  }
}

export function trackPageView({ path, title, referrer }: PageView) {
  trackEvent({
    name: 'page_view',
    properties: {
      path,
      title,
      referrer,
    },
  })
}

export function trackPackageView({ packageId, packageTitle, location }: PackageView) {
  trackEvent({
    name: 'package_view',
    properties: {
      packageId,
      packageTitle,
      location,
    },
  })
}

export function trackInquirySubmission({ packageId, packageTitle, inquiryType }: InquirySubmission) {
  trackEvent({
    name: 'inquiry_submission',
    properties: {
      packageId,
      packageTitle,
      inquiryType,
    },
  })
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <Analytics />
  )
} 