'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  HomeIcon,
  PackageIcon,
  NewspaperIcon,
  PhotoIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline'
import Providers from './providers'
import AdminLayout from '@/components/AdminLayout'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
  { name: 'Packages', href: '/admin/packages', icon: PackageIcon },
  { name: 'Blog Posts', href: '/admin/blog', icon: NewspaperIcon },
  { name: 'Media', href: '/admin/media', icon: PhotoIcon },
  { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon },
]

export default function RootAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <AdminLayout>{children}</AdminLayout>
    </Providers>
  )
} 