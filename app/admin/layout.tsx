'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

const navLinks = [
  { href: '/admin/settings', label: 'Settings' },
  { href: '/admin/videos', label: 'Sorotan' },
  { href: '/admin/edukasi', label: 'Edukasi' },
  { href: '/admin/media-edukasi', label: 'Media (Private)' },
  { href: '/admin/quiz', label: 'Quiz' },
  { href: '/admin/participants', label: 'Peserta' },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  if (pathname === '/admin/login') return <>{children}</>

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="text-sm text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>
      <nav className="mb-6 flex gap-4 border-b pb-3">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-medium ${pathname === link.href ? 'text-foreground underline underline-offset-4' : 'text-muted-foreground'}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      {children}
    </div>
  )
}
