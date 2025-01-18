import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Resend } from 'resend'
import InquiryForm from '../InquiryForm'
import { trackInquirySubmission } from '@/utils/analytics'

// Mock analytics tracking
jest.mock('@/utils/analytics', () => ({
  trackInquirySubmission: jest.fn(),
}))

// Mock Resend
jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ id: 'test-email-id' }),
    },
  })),
}))

// Mock fetch for API calls
global.fetch = jest.fn()

describe('InquiryForm Integration', () => {
  const mockPackage = {
    id: 'test-safari',
    title: 'Test Safari Package',
    duration: '7 days',
    startingPrice: 5000,
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: 'new-inquiry-id', status: 'new' }),
    })
  })

  it('submits inquiry and triggers notifications', async () => {
    const user = userEvent.setup()
    const onClose = jest.fn()

    render(
      <InquiryForm
        isOpen={true}
        onClose={onClose}
        packageTitle={mockPackage.title}
        packageDuration={mockPackage.duration}
        startingPrice={mockPackage.startingPrice}
      />
    )

    // Fill out the form
    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/phone/i), '+1234567890')
    await user.type(screen.getByLabelText(/travel dates/i), '2024-06-01')
    await user.type(screen.getByLabelText(/group size/i), '4')
    await user.type(screen.getByLabelText(/budget/i), '6000')
    await user.type(screen.getByLabelText(/message/i), 'Test inquiry message')

    // Submit the form
    await user.click(screen.getByRole('button', { name: /submit/i }))

    // Verify API call
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: expect.stringContaining('john@example.com'),
      })
    })

    // Verify analytics tracking
    expect(trackInquirySubmission).toHaveBeenCalledWith({
      packageId: expect.any(String),
      packageTitle: mockPackage.title,
      inquiryType: 'specific',
    })

    // Verify form reset and closure
    await waitFor(() => {
      expect(screen.getByLabelText(/name/i)).toHaveValue('')
      expect(onClose).toHaveBeenCalled()
    })
  })

  it('displays validation errors for required fields', async () => {
    const user = userEvent.setup()
    
    render(
      <InquiryForm
        isOpen={true}
        onClose={() => {}}
        packageTitle={mockPackage.title}
        packageDuration={mockPackage.duration}
        startingPrice={mockPackage.startingPrice}
      />
    )

    // Submit without filling required fields
    await user.click(screen.getByRole('button', { name: /submit/i }))

    // Verify validation messages
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument()
      expect(screen.getByText(/email is required/i)).toBeInTheDocument()
      expect(screen.getByText(/travel dates are required/i)).toBeInTheDocument()
    })

    // Verify no API call was made
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('handles API errors gracefully', async () => {
    const user = userEvent.setup()
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'))

    render(
      <InquiryForm
        isOpen={true}
        onClose={() => {}}
        packageTitle={mockPackage.title}
        packageDuration={mockPackage.duration}
        startingPrice={mockPackage.startingPrice}
      />
    )

    // Fill out the form
    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/travel dates/i), '2024-06-01')
    await user.type(screen.getByLabelText(/group size/i), '4')

    // Submit the form
    await user.click(screen.getByRole('button', { name: /submit/i }))

    // Verify error message
    await waitFor(() => {
      expect(screen.getByText(/failed to submit inquiry/i)).toBeInTheDocument()
    })
  })

  it('preserves form state during validation errors', async () => {
    const user = userEvent.setup()
    
    render(
      <InquiryForm
        isOpen={true}
        onClose={() => {}}
        packageTitle={mockPackage.title}
        packageDuration={mockPackage.duration}
        startingPrice={mockPackage.startingPrice}
      />
    )

    // Fill out some fields but not all required ones
    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/message/i), 'Test message')

    // Submit the form
    await user.click(screen.getByRole('button', { name: /submit/i }))

    // Verify field values are preserved
    await waitFor(() => {
      expect(screen.getByLabelText(/name/i)).toHaveValue('John Doe')
      expect(screen.getByLabelText(/message/i)).toHaveValue('Test message')
    })
  })
}) 