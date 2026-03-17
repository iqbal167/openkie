import './globals.css'

import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Geist } from 'next/font/google'

import { getSettings } from '@/lib/data'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  return {
    title: settings.siteName,
    description: settings.siteDescription,
    openGraph: {
      title: settings.siteName,
      description: settings.siteDescription,
      locale: 'id_ID',
      type: 'website',
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
