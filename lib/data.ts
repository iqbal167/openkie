import { head, put } from '@vercel/blob'

import type { Participant, QuizData, SiteSettings } from '@/lib/types'

const BLOB_KEY = 'settings.json'
const QUIZ_BLOB_KEY = 'quiz.json'
const PARTICIPANTS_BLOB_KEY = 'participants.json'

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

// --- Quiz Data ---

const defaultQuizData: QuizData = { preTest: [], postTest: [] }

export async function getQuizData(): Promise<QuizData> {
  try {
    const meta = await head(QUIZ_BLOB_KEY)
    const res = await fetch(meta.url, { cache: 'no-store' })
    return (await res.json()) as QuizData
  } catch {
    return defaultQuizData
  }
}

export async function saveQuizData(data: QuizData): Promise<void> {
  await put(QUIZ_BLOB_KEY, JSON.stringify(data, null, 2), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
  })
}

// --- Participants ---

export async function getParticipants(): Promise<Participant[]> {
  try {
    const meta = await head(PARTICIPANTS_BLOB_KEY)
    const res = await fetch(meta.url, { cache: 'no-store' })
    return (await res.json()) as Participant[]
  } catch {
    return []
  }
}

export async function saveParticipants(data: Participant[]): Promise<void> {
  await put(PARTICIPANTS_BLOB_KEY, JSON.stringify(data, null, 2), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
  })
}

export async function getParticipantByPhone(
  phone: string
): Promise<Participant | undefined> {
  const participants = await getParticipants()
  return participants.find((p) => p.phone === phone)
}

// --- Media Edukasi (admin only) ---

export async function getMediaEdukasi(): Promise<
  import('@/lib/types').MediaEdukasi[]
> {
  try {
    const meta = await head('media-edukasi.json')
    const res = await fetch(meta.url, { cache: 'no-store' })
    return (await res.json()) as import('@/lib/types').MediaEdukasi[]
  } catch {
    return []
  }
}

export async function saveMediaEdukasi(
  data: import('@/lib/types').MediaEdukasi[]
): Promise<void> {
  await put('media-edukasi.json', JSON.stringify(data, null, 2), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
  })
}
