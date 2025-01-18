'use client'

import { useSession } from 'next-auth/react'
import {
  ChartBarIcon,
  DocumentTextIcon,
  PhotoIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'

const stats = [
  {
    name: 'Total Packages',
    value: '12',
    icon: DocumentTextIcon,
    change: '+2',
    changeType: 'increase',
  },
  {
    name: 'Blog Posts',
    value: '24',
    icon: ChartBarIcon,
    change: '+5',
    changeType: 'increase',
  },
  {
    name: 'Media Items',
    value: '48',
    icon: PhotoIcon,
    change: '+12',
    changeType: 'increase',
  },
  {
    name: 'Inquiries',
    value: '18',
    icon: UserGroupIcon,
    change: '+3',
    changeType: 'increase',
  },
]

const recentInquiries = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john@example.com',
    package: 'Serengeti Migration Safari',
    date: '2024-03-15',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    package: 'Luxury Okavango Delta',
    date: '2024-03-14',
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael@example.com',
    package: 'Masai Mara Adventure',
    date: '2024-03-13',
  },
]

export default function AdminDashboardPage() {
  const { data: session } = useSession()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {session?.user?.name}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Here's what's happening with your website today.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-black p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  item.changeType === 'increase'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {item.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Recent Inquiries */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Recent Inquiries</h2>
        <div className="mt-4 overflow-hidden rounded-lg bg-white shadow">
          <ul role="list" className="divide-y divide-gray-200">
            {recentInquiries.map((inquiry) => (
              <li key={inquiry.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{inquiry.name}</p>
                    <p className="text-sm text-gray-500">{inquiry.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {inquiry.package}
                    </p>
                    <p className="text-sm text-gray-500">{inquiry.date}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
} 