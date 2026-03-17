import { head, put } from '@vercel/blob'

import type { SiteSettings } from '@/lib/types'

const BLOB_KEY = 'settings.json'

const defaultSettings: SiteSettings = {
  siteName: 'KIE MKJP Kelurahan Karang Timur',
  siteDescription:
    'Informasi lengkap Metode Kontrasepsi Jangka Panjang (MKJP) untuk warga Kelurahan Karang Timur, Kota Tangerang.',
  whatsappNumber: '6281234567890',
  whatsappMessageTemplate: 'Halo Kader KB, saya ingin konsultasi tentang MKJP.',
  videoTestimonials: [],
  metodeMKJP: [],
}

export async function getSettings(): Promise<SiteSettings> {
  try {
    const meta = await head(BLOB_KEY)
    const res = await fetch(meta.url, { cache: 'no-store' })
    return (await res.json()) as SiteSettings
  } catch {
    return defaultSettings
  }
}

export async function saveSettings(settings: SiteSettings): Promise<void> {
  await put(BLOB_KEY, JSON.stringify(settings, null, 2), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
  })
}
