import { list, put } from '@vercel/blob'
import { unstable_noStore as noStore } from 'next/cache'

import type {
  AdminUser,
  EducationMaterial,
  EducationMedia,
  Participant,
  QuizData,
  SiteSettings,
  VideoTestimonial,
} from '@/lib/types'

const BLOB_KEY = 'settings.json'
const QUIZ_BLOB_KEY = 'quiz.json'
const PARTICIPANTS_BLOB_KEY = 'participants.json'
const MEDIA_BLOB_KEY = 'education-media.json'
const EDUCATION_MATERIALS_BLOB_KEY = 'education-materials.json'
const HIGHLIGHT_BLOB_KEY = 'highlight.json'
const ADMIN_BLOB_KEY = 'admin.json'

// Per-request cache: writeBlob stores here so a subsequent readBlob
// in the same request gets fresh data (avoids CDN staleness).
// Cleared automatically per request since serverless = new execution.
const pending = new Map<string, unknown>()

async function readBlob<T>(key: string, fallback: T): Promise<T> {
  noStore()
  if (pending.has(key)) {
    const data = pending.get(key) as T
    pending.delete(key)
    return data
  }
  try {
    const { blobs } = await list({ prefix: key, limit: 1 })
    if (!blobs.length) return fallback
    const res = await fetch(blobs[0].downloadUrl, { cache: 'no-store' })
    return (await res.json()) as T
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
  pending.set(key, data)
}

// --- Settings ---

const defaultSettings: SiteSettings = {
  siteName: 'OpenKIE',
  siteDescription: 'Platform edukasi digital',
  whatsappNumber: '',
  whatsappMessageTemplate: 'Halo, saya ingin bertanya.',
}

export const getSettings = async () => {
  const s = await readBlob(BLOB_KEY, defaultSettings)
  return s
}
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

// --- Education Materials ---

export const getEducationMaterials = () =>
  readBlob<EducationMaterial[]>(EDUCATION_MATERIALS_BLOB_KEY, [])
export const saveEducationMaterials = (d: EducationMaterial[]) =>
  writeBlob(EDUCATION_MATERIALS_BLOB_KEY, d)

// --- Media Edukasi ---

export const getEducationMedia = () =>
  readBlob<EducationMedia[]>(MEDIA_BLOB_KEY, [])
export const saveEducationMedia = (d: EducationMedia[]) =>
  writeBlob(MEDIA_BLOB_KEY, d)

// --- Highlights ---

export const getHighlights = () =>
  readBlob<VideoTestimonial[]>(HIGHLIGHT_BLOB_KEY, [])
export const saveHighlights = (d: VideoTestimonial[]) =>
  writeBlob(HIGHLIGHT_BLOB_KEY, d)

// --- Admin ---

export const getAdmin = () => readBlob<AdminUser | null>(ADMIN_BLOB_KEY, null)
export const saveAdmin = (a: AdminUser) => writeBlob(ADMIN_BLOB_KEY, a)
