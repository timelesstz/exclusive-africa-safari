'use client'

import PackageForm from '@/components/PackageForm'

export default function NewPackagePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Create New Package</h1>
          <p className="mt-2 text-sm text-gray-600">
            Fill in the details below to create a new safari package.
          </p>
        </div>

        <PackageForm />
      </div>
    </div>
  )
} 