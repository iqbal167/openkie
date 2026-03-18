import { NextResponse } from 'next/server'

import { auth } from '@/lib/auth'
import { getAdmin } from '@/lib/data'

export default auth(async (req) => {
  const { pathname } = req.nextUrl
  const isSetupPage = pathname === '/admin/setup'
  const isSetupApi = pathname === '/api/admin/setup'
  const isLoginPage = pathname === '/admin/login'
  const isLoggedIn = !!req.auth

  const admin = await getAdmin()

  // No admin yet: redirect to setup (except setup page/api itself)
  if (!admin) {
    if (isSetupPage || isSetupApi) return NextResponse.next()
    return NextResponse.redirect(new URL('/admin/setup', req.url))
  }

  // Admin exists: block setup page
  if (isSetupPage) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  // Not logged in: redirect to login
  if (!isLoginPage && !isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  // Already logged in: skip login page
  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/admin/:path*', '/api/admin/setup'],
}
