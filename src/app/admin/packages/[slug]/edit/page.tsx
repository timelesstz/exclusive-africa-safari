'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getPackageBySlug } from '@/data/packages'

export default function AdminPackageEditPage({
  params,
}: {
  params: { slug: string }
}) {
  const router = useRouter()
  const [packageData, setPackageData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const pkg = getPackageBySlug(params.slug)
        if (!pkg) {
          router.push('/admin/packages')
          return
        }
        setPackageData(pkg)
      } catch (error) {
        console.error('Failed to fetch package:', error)
        router.push('/admin/packages')
      } finally {
        setLoading(false)
      }
    }

    fetchPackage()
  }, [params.slug, router])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!packageData) {
    return null
  }

  return (
    <div>
      {/* Your edit form implementation */}
    </div>
  )
} 