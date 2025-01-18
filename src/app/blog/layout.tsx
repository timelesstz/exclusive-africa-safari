'use client'

import Link from 'next/link'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {/* Navigation breadcrumb */}
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-4 py-4">
          <li>
            <div>
              <Link
                href="/"
                className="text-gray-400 hover:text-gray-500"
              >
                Home
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="h-5 w-5 flex-shrink-0 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <Link
                href="/blog"
                className="ml-4 text-gray-400 hover:text-gray-500"
              >
                Blog
              </Link>
            </div>
          </li>
        </ol>
      </nav>

      {/* Main content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 pt-8">
            <div className="text-center">
              <p className="text-base text-gray-400">
                &copy; {new Date().getFullYear()} Exclusive Africa Safaris.
                All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 