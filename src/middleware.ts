import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
    const isLoginPage = req.nextUrl.pathname === '/admin/login'

    // Redirect authenticated users away from login page
    if (token && isLoginPage) {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url))
    }

    // Allow access to login page
    if (isLoginPage) {
      return NextResponse.next()
    }

    // Protect admin routes
    if (isAdminRoute && (!token || token.role !== 'admin')) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: ['/admin/:path*'],
} 