'use client'

import { useState, useEffect } from 'react'
import { EnvelopeIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { Transition } from '@headlessui/react'

interface Inquiry {
  id: string
  name: string
  email: string
  phone: string
  packageTitle: string
  packageDuration: string
  travelDates: string
  groupSize: string
  budget: string
  customRequests?: string
  status: 'new' | 'responded'
  createdAt: string
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [replyText, setReplyText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  // Fetch inquiries
  const fetchInquiries = async () => {
    try {
      const response = await fetch('/api/inquiries')
      if (!response.ok) throw new Error('Failed to fetch inquiries')
      const data = await response.json()
      setInquiries(data)
    } catch (error) {
      console.error('Error fetching inquiries:', error)
      showNotification('Failed to load inquiries', 'error')
    }
  }

  useEffect(() => {
    fetchInquiries()

    // Set up polling for new inquiries every 30 seconds
    const pollInterval = setInterval(fetchInquiries, 30000)
    return () => clearInterval(pollInterval)
  }, [])

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.packageTitle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === 'all' || inquiry.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleReply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedInquiry) return
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/inquiries/${selectedInquiry.id}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: replyText,
        }),
      })

      if (!response.ok) throw new Error('Failed to send reply')

      showNotification('Reply sent successfully', 'success')
      setSelectedInquiry(null)
      setReplyText('')
      fetchInquiries() // Refresh the list
    } catch (error) {
      console.error('Error sending reply:', error)
      showNotification('Failed to send reply', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleMarkAsResponded = async (id: string) => {
    try {
      const response = await fetch(`/api/inquiries/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'responded',
        }),
      })

      if (!response.ok) throw new Error('Failed to update status')

      showNotification('Status updated successfully', 'success')
      fetchInquiries() // Refresh the list
    } catch (error) {
      console.error('Error updating status:', error)
      showNotification('Failed to update status', 'error')
    }
  }

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inquiries</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage and respond to customer inquiries.
          </p>
        </div>
      </div>

      {/* Notification */}
      <Transition
        show={!!notification}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {notification && (
          <div
            className={`fixed top-4 right-4 z-50 rounded-md p-4 ${
              notification.type === 'success'
                ? 'bg-green-50 text-green-800'
                : 'bg-red-50 text-red-800'
            }`}
          >
            <p className="text-sm font-medium">{notification.message}</p>
          </div>
        )}
      </Transition>

      {/* Filters */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <input
            type="text"
            placeholder="Search inquiries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
          />
        </div>
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="responded">Responded</option>
          </select>
        </div>
      </div>

      {/* Inquiries List */}
      <div className="mt-8">
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredInquiries.map((inquiry) => (
              <li key={inquiry.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium text-black">
                            {inquiry.name}
                          </p>
                          <span
                            className={`ml-2 inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                              inquiry.status === 'new'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {inquiry.status}
                          </span>
                        </div>
                        <div className="mt-2">
                          <div className="text-sm text-gray-500">
                            <p>Email: {inquiry.email}</p>
                            <p>Phone: {inquiry.phone}</p>
                            <p>Package: {inquiry.packageTitle}</p>
                            <p>Travel Dates: {inquiry.travelDates}</p>
                            <p>Group Size: {inquiry.groupSize}</p>
                            <p>Budget: ${inquiry.budget}</p>
                          </div>
                          {inquiry.customRequests && (
                            <p className="mt-2 text-sm text-gray-600">
                              {inquiry.customRequests}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-end space-x-4 sm:mt-0">
                        <button
                          onClick={() => setSelectedInquiry(inquiry)}
                          className="inline-flex items-center rounded-md bg-amber-600 px-3 py-2 text-sm font-medium text-white hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                        >
                          <EnvelopeIcon className="h-4 w-4 mr-2" />
                          Reply
                        </button>
                        {inquiry.status === 'new' && (
                          <button
                            onClick={() => handleMarkAsResponded(inquiry.id)}
                            className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            <CheckCircleIcon className="h-4 w-4 mr-2" />
                            Mark as Responded
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-400">
                    Received on {new Date(inquiry.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Reply Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => !isSubmitting && setSelectedInquiry(null)}
            ></div>

            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  onClick={() => !isSubmitting && setSelectedInquiry(null)}
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                  disabled={isSubmitting}
                >
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Reply to {selectedInquiry.name}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Inquiry: {selectedInquiry.customRequests || 'No specific requests'}
                  </p>
                </div>
                <form onSubmit={handleReply} className="mt-4">
                  <textarea
                    rows={4}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                    placeholder="Type your reply..."
                    disabled={isSubmitting}
                  />
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => !isSubmitting && setSelectedInquiry(null)}
                      className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:bg-amber-300"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Reply'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 