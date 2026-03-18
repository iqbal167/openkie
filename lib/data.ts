import { list, put } from '@vercel/blob'
import { unstable_noStore as noStore } from 'next/cache'

import type {
  MediaEdukasi,
  Participant,
  QuizData,
  SiteSettings,
} from '@/lib/types'

const BLOB_KEY = 'settings.json'
const QUIZ_BLOB_KEY = 'quiz.json'
const PARTICIPANTS_BLOB_KEY = 'participants.json'
const MEDIA_BLOB_KEY = 'media-edukasi.json'

// In-memory write-through cache to avoid CDN staleness
const cache = new Map<string, unknown>()

async function readBlob<T>(key: string, fallback: T): Promise<T> {
  noStore()
  if (cache.has(key)) return cache.get(key) as T
  try {
    const { blobs } = await list({ prefix: key, limit: 1 })
    if (!blobs.length) return fallback
    const res = await fetch(blobs[0].downloadUrl, { cache: 'no-store' })
    const data = (await res.json()) as T
    cache.set(key, data)
    return data
  } catch {
    return fallback
  }
}

async function writeBlob<T>(key: string, data: T): Promise<void> {
  await put(key, JSON.stringify(data, null, 2), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
  })
  cache.set(key, data)
}

// --- Settings ---

const defaultSettings: SiteSettings = {
  siteName: 'KIE MKJP Kelurahan Karang Timur',
  siteDescription:
    'Informasi lengkap Metode Kontrasepsi Jangka Panjang (MKJP) untuk warga Kelurahan Karang Timur, Kota Tangerang.',
  whatsappNumber: '6281234567890',
  whatsappMessageTemplate: 'Halo Kader KB, saya ingin konsultasi tentang MKJP.',
  videoTestimonials: [],
  metodeMKJP: [],
}

export const getSettings = () => readBlob(BLOB_KEY, defaultSettings)
export const saveSettings = (s: SiteSettings) => writeBlob(BLOB_KEY, s)

// --- Quiz Data ---

const defaultQuizData: QuizData = { preTest: [], postTest: [] }

export const getQuizData = () => readBlob(QUIZ_BLOB_KEY, defaultQuizData)
export const saveQuizData = (d: QuizData) => writeBlob(QUIZ_BLOB_KEY, d)

// --- Participants ---

export const getParticipants = () =>
  readBlob<Participant[]>(PARTICIPANTS_BLOB_KEY, [])
export const saveParticipants = (d: Participant[]) =>
  writeBlob(PARTICIPANTS_BLOB_KEY, d)

export async function getParticipantByPhone(
  phone: string
): Promise<Participant | undefined> {
  const participants = await getParticipants()
  return participants.find((p) => p.phone === phone)
}

// --- Media Edukasi ---

export const getMediaEdukasi = () =>
  readBlob<MediaEdukasi[]>(MEDIA_BLOB_KEY, [])
export const saveMediaEdukasi = (d: MediaEdukasi[]) =>
  writeBlob(MEDIA_BLOB_KEY, d)
