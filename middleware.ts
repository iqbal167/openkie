import { NextResponse } from 'next/server'

import { auth } from '@/lib/auth'

export default auth((req) => {
  const { pathname } = req.nextUrl

  const isLoggedIn = !!req.auth
  const isLoginPage = pathname === '/login'
  const isRegisterPage = pathname === '/register'

  // Not logged in: redirect to login
  if (!isLoggedIn && !isLoginPage && !isRegisterPage) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Already logged in: skip login/register
  if (isLoggedIn && (isLoginPage || isRegisterPage)) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/admin/:path*', '/login', '/register'],
}
