import { supabase } from '@/lib/supabase'
import type {
  EducationMaterial,
  EducationMedia,
  Participant,
  Question,
  SiteSettings,
  User,
  VideoTestimonial,
} from '@/lib/types'

// --- Users ---

export async function getUserByUsername(
  username: string
): Promise<(User & { passwordHash: string }) | null> {
  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single()
  if (!data) return null
  return {
    id: data.id,
    email: data.email,
    username: data.username,
    passwordHash: data.password_hash,
  }
}

export async function getUserByEmail(
  email: string
): Promise<(User & { passwordHash: string }) | null> {
  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()
  if (!data) return null
  return {
    id: data.id,
    email: data.email,
    username: data.username,
    passwordHash: data.password_hash,
  }
}

function generateUsername(email: string): string {
  const prefix = email
    .split('@')[0]
    .replace(/[^a-z0-9]/gi, '')
    .toLowerCase()
  const rand = Math.random().toString(36).slice(2, 10)
  return `${prefix}-${rand}`
}

export async function createUser(
  email: string,
  passwordHash: string
): Promise<User> {
  const username = generateUsername(email)
  const { data, error } = await supabase
    .from('users')
    .insert({ email, username, password_hash: passwordHash })
    .select('id, email, username')
    .single()
  if (error || !data) throw new Error(error?.message ?? 'Failed to create user')
  return data
}

// --- Settings ---

const defaultSettings: SiteSettings = {
  siteName: 'OpenKIE',
  siteDescription: 'Platform edukasi digital',
  whatsappNumber: '',
  whatsappMessageTemplate: 'Halo, saya ingin bertanya.',
  quizEnabled: false,
  highlightTitle: '',
  educationTitle: '',
  footerText: '',
}

export async function getSettings(userId: string): Promise<SiteSettings> {
  const { data } = await supabase
    .from('settings')
    .select('*')
    .eq('user_id', userId)
    .single()
  if (!data) return defaultSettings
  return {
    siteName: data.site_name,
    siteDescription: data.site_description,
    whatsappNumber: data.whatsapp_number,
    whatsappMessageTemplate: data.whatsapp_message_template,
    quizEnabled: data.quiz_enabled,
    highlightTitle: data.highlight_title,
    educationTitle: data.education_title,
    footerText: data.footer_text,
  }
}

export async function saveSettings(userId: string, s: SiteSettings) {
  await supabase.from('settings').upsert({
    user_id: userId,
    site_name: s.siteName,
    site_description: s.siteDescription,
    whatsapp_number: s.whatsappNumber,
    whatsapp_message_template: s.whatsappMessageTemplate,
    quiz_enabled: s.quizEnabled ?? false,
    highlight_title: s.highlightTitle ?? '',
    education_title: s.educationTitle ?? '',
    footer_text: s.footerText ?? '',
  })
}

// --- Highlights ---

export async function getHighlights(
  userId: string
): Promise<VideoTestimonial[]> {
  const { data } = await supabase
    .from('highlights')
    .select('*')
    .eq('user_id', userId)
    .order('position')
  return (data ?? []).map((r) => ({
    id: r.id,
    videoId: r.video_id,
    title: r.title,
  }))
}

export async function addHighlight(
  userId: string,
  h: { title: string; videoId: string }
) {
  const { data: max } = await supabase
    .from('highlights')
    .select('position')
    .eq('user_id', userId)
    .order('position', { ascending: false })
    .limit(1)
    .single()
  await supabase.from('highlights').insert({
    user_id: userId,
    title: h.title,
    video_id: h.videoId,
    position: (max?.position ?? -1) + 1,
  })
}

export async function updateHighlight(
  id: number,
  userId: string,
  h: { title: string; videoId: string }
) {
  await supabase
    .from('highlights')
    .update({ title: h.title, video_id: h.videoId })
    .eq('id', id)
    .eq('user_id', userId)
}

export async function deleteHighlight(id: number, userId: string) {
  await supabase.from('highlights').delete().eq('id', id).eq('user_id', userId)
}

// --- Education Materials ---

export async function getEducationMaterials(
  userId: string
): Promise<EducationMaterial[]> {
  const { data } = await supabase
    .from('education_materials')
    .select('*')
    .eq('user_id', userId)
    .order('position')
  return (data ?? []).map((r) => ({
    id: r.id,
    name: r.name,
    description: r.description,
    videoUrl: r.video_url,
  }))
}

export async function addEducationMaterial(
  userId: string,
  m: { name: string; description: string; videoUrl?: string }
) {
  const { data: max } = await supabase
    .from('education_materials')
    .select('position')
    .eq('user_id', userId)
    .order('position', { ascending: false })
    .limit(1)
    .single()
  await supabase.from('education_materials').insert({
    user_id: userId,
    name: m.name,
    description: m.description,
    video_url: m.videoUrl ?? '',
    position: (max?.position ?? -1) + 1,
  })
}

export async function updateEducationMaterial(
  id: number,
  userId: string,
  m: { name: string; description: string; videoUrl?: string }
) {
  await supabase
    .from('education_materials')
    .update({
      name: m.name,
      description: m.description,
      video_url: m.videoUrl ?? '',
    })
    .eq('id', id)
    .eq('user_id', userId)
}

export async function deleteEducationMaterial(id: number, userId: string) {
  await supabase
    .from('education_materials')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)
}

// --- Education Media (Private) ---

export async function getEducationMedia(
  userId: string
): Promise<EducationMedia[]> {
  const { data } = await supabase
    .from('education_media')
    .select('*')
    .eq('user_id', userId)
    .order('position')
  return (data ?? []).map((r) => ({
    id: r.id,
    title: r.title,
    videoUrl: r.video_url,
  }))
}

export async function addEducationMedia(
  userId: string,
  m: { title: string; videoUrl: string }
) {
  const { data: max } = await supabase
    .from('education_media')
    .select('position')
    .eq('user_id', userId)
    .order('position', { ascending: false })
    .limit(1)
    .single()
  await supabase.from('education_media').insert({
    user_id: userId,
    title: m.title,
    video_url: m.videoUrl,
    position: (max?.position ?? -1) + 1,
  })
}

export async function updateEducationMedia(
  id: number,
  userId: string,
  m: { title: string; videoUrl: string }
) {
  await supabase
    .from('education_media')
    .update({ title: m.title, video_url: m.videoUrl })
    .eq('id', id)
    .eq('user_id', userId)
}

export async function deleteEducationMedia(id: number, userId: string) {
  await supabase
    .from('education_media')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)
}

// --- Quiz ---

export async function getQuizQuestions(
  userId: string,
  type?: 'preTest' | 'postTest'
): Promise<Question[]> {
  let q = supabase
    .from('questions')
    .select('*')
    .eq('user_id', userId)
    .order('position')
  if (type) q = q.eq('type', type)
  const { data } = await q
  return (data ?? []).map((r) => ({
    id: r.id,
    type: r.type,
    question: r.question,
    options: r.options as string[],
    correctAnswer: r.correct_answer,
  }))
}

export async function addQuestion(
  userId: string,
  q: {
    type: string
    question: string
    options: string[]
    correctAnswer: number
  }
) {
  const { data: max } = await supabase
    .from('questions')
    .select('position')
    .eq('user_id', userId)
    .eq('type', q.type)
    .order('position', { ascending: false })
    .limit(1)
    .single()
  await supabase.from('questions').insert({
    user_id: userId,
    type: q.type,
    question: q.question,
    options: q.options,
    correct_answer: q.correctAnswer,
    position: (max?.position ?? -1) + 1,
  })
}

export async function updateQuestion(
  id: string,
  userId: string,
  q: { question: string; options: string[]; correctAnswer: number }
) {
  await supabase
    .from('questions')
    .update({
      question: q.question,
      options: q.options,
      correct_answer: q.correctAnswer,
    })
    .eq('id', id)
    .eq('user_id', userId)
}

export async function deleteQuestion(id: string, userId: string) {
  await supabase.from('questions').delete().eq('id', id).eq('user_id', userId)
}

// --- Participants ---

export async function getParticipants(userId: string): Promise<Participant[]> {
  const { data } = await supabase
    .from('participants')
    .select('*')
    .eq('user_id', userId)
    .order('registered_at', { ascending: false })
  return (data ?? []).map((r) => ({
    id: r.id,
    phone: r.phone,
    name: r.name,
    preTest: r.pre_test,
    postTest: r.post_test,
    registeredAt: r.registered_at,
  }))
}

export async function getParticipantByPhone(
  userId: string,
  phone: string
): Promise<Participant | undefined> {
  const { data } = await supabase
    .from('participants')
    .select('*')
    .eq('user_id', userId)
    .eq('phone', phone)
    .single()
  if (!data) return undefined
  return {
    id: data.id,
    phone: data.phone,
    name: data.name,
    preTest: data.pre_test,
    postTest: data.post_test,
    registeredAt: data.registered_at,
  }
}

export async function saveParticipant(
  userId: string,
  p: { phone: string; name: string; preTest?: unknown; postTest?: unknown }
) {
  await supabase.from('participants').upsert(
    {
      user_id: userId,
      phone: p.phone,
      name: p.name,
      pre_test: p.preTest ?? null,
      post_test: p.postTest ?? null,
    },
    { onConflict: 'user_id,phone' }
  )
}

export async function clearParticipants(userId: string) {
  await supabase.from('participants').delete().eq('user_id', userId)
}
