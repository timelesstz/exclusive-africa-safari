import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Resend } from 'resend'
import InquiriesPage from '../inquiries/page'

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

describe('Admin Inquiries Page Integration', () => {
  const mockInquiries = [
    {
      id: '1',
      packageTitle: 'Safari Package 1',
      name: 'John Doe',
      email: 'john@example.com',
      status: 'new',
      createdAt: new Date().toISOString(),
      message: 'Test inquiry 1',
    },
    {
      id: '2',
      packageTitle: 'Safari Package 2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'responded',
      createdAt: new Date().toISOString(),
      message: 'Test inquiry 2',
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock).mockImplementation((url) => {
      if (url.endsWith('/api/inquiries')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockInquiries),
        })
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ status: 'success' }),
      })
    })
  })

  it('loads and displays inquiries', async () => {
    render(<InquiriesPage />)

    await waitFor(() => {
      expect(screen.getByText('Safari Package 1')).toBeInTheDocument()
      expect(screen.getByText('Safari Package 2')).toBeInTheDocument()
    })

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('jane@example.com')).toBeInTheDocument()
  })

  it('filters inquiries by status', async () => {
    const user = userEvent.setup()
    render(<InquiriesPage />)

    // Wait for inquiries to load
    await waitFor(() => {
      expect(screen.getByText('Safari Package 1')).toBeInTheDocument()
    })

    // Filter by 'responded' status
    const statusFilter = screen.getByLabelText(/status/i)
    await user.selectOptions(statusFilter, 'responded')

    // Verify only responded inquiries are shown
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
  })

  it('searches inquiries by name or email', async () => {
    const user = userEvent.setup()
    render(<InquiriesPage />)

    // Wait for inquiries to load
    await waitFor(() => {
      expect(screen.getByText('Safari Package 1')).toBeInTheDocument()
    })

    // Search for 'john'
    const searchInput = screen.getByPlaceholderText(/search/i)
    await user.type(searchInput, 'john')

    // Verify filtered results
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument()
  })

  it('replies to an inquiry', async () => {
    const user = userEvent.setup()
    render(<InquiriesPage />)

    // Wait for inquiries to load
    await waitFor(() => {
      expect(screen.getByText('Safari Package 1')).toBeInTheDocument()
    })

    // Click reply button for first inquiry
    const replyButtons = screen.getAllByText(/reply/i)
    await user.click(replyButtons[0])

    // Fill out reply form
    const replyInput = screen.getByLabelText(/reply message/i)
    await user.type(replyInput, 'Thank you for your inquiry')

    // Submit reply
    const sendButton = screen.getByRole('button', { name: /send reply/i })
    await user.click(sendButton)

    // Verify API calls
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/api/inquiries/1/reply'), {
        method: 'POST',
        headers: expect.any(Object),
        body: expect.stringContaining('Thank you for your inquiry'),
      })
    })
  })

  it('updates inquiry status', async () => {
    const user = userEvent.setup()
    render(<InquiriesPage />)

    // Wait for inquiries to load
    await waitFor(() => {
      expect(screen.getByText('Safari Package 1')).toBeInTheDocument()
    })

    // Click status toggle for first inquiry
    const statusButtons = screen.getAllByRole('button', { name: /mark as responded/i })
    await user.click(statusButtons[0])

    // Verify API call
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/api/inquiries/1'), {
        method: 'PATCH',
        headers: expect.any(Object),
        body: JSON.stringify({ status: 'responded' }),
      })
    })
  })

  it('handles errors when loading inquiries', async () => {
    // Mock API error
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'))
    
    render(<InquiriesPage />)

    await waitFor(() => {
      expect(screen.getByText(/error loading inquiries/i)).toBeInTheDocument()
    })
  })

  it('handles errors when replying to inquiries', async () => {
    const user = userEvent.setup()
    render(<InquiriesPage />)

    // Wait for inquiries to load
    await waitFor(() => {
      expect(screen.getByText('Safari Package 1')).toBeInTheDocument()
    })

    // Mock API error for reply
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to send reply'))

    // Click reply button and submit
    const replyButtons = screen.getAllByText(/reply/i)
    await user.click(replyButtons[0])
    const replyInput = screen.getByLabelText(/reply message/i)
    await user.type(replyInput, 'Test reply')
    const sendButton = screen.getByRole('button', { name: /send reply/i })
    await user.click(sendButton)

    // Verify error message
    await waitFor(() => {
      expect(screen.getByText(/failed to send reply/i)).toBeInTheDocument()
    })
  })
}) 