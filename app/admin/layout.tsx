'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

const navLinks = [
  { href: '/admin/settings', label: 'Settings' },
  { href: '/admin/videos', label: 'Sorotan' },
  { href: '/admin/educations', label: 'Edukasi' },
  { href: '/admin/private-media', label: 'Media (Private)' },
  { href: '/admin/quiz', label: 'Quiz' },
  { href: '/admin/participants', label: 'Peserta' },
  { href: '/admin/account', label: 'Akun' },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const username = session?.user?.name

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="text-sm text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>
      {username && (
        <p className="text-muted-foreground mb-4 text-sm">
          Landing page:{' '}
          <Link
            href={`/u/${username}`}
            className="text-primary hover:underline"
            target="_blank"
          >
            /u/{username}
          </Link>
        </p>
      )}
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
