import { NextResponse } from 'next/server'

import { auth } from '@/lib/auth'
import { getSettings, saveSettings } from '@/lib/data'
import { supabase } from '@/lib/supabase'

const BUCKET = 'openkie'

export const POST = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = req.auth.user!.id!

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const type = formData.get('type') as string | null

  if (!file || !type || !['logo', 'banner'].includes(type))
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const ext = file.name.split('.').pop() || 'png'
  const path = `${userId}/${type}.${ext}`

  // Remove old file (may have different extension)
  const { data: existing } = await supabase.storage
    .from(BUCKET)
    .list(userId, { search: type })
  if (existing?.length) {
    await supabase.storage
      .from(BUCKET)
      .remove(existing.map((f) => `${userId}/${f.name}`))
  }

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(path)

  const settings = await getSettings(userId)
  await saveSettings(userId, {
    ...settings,
    [type === 'logo' ? 'logoUrl' : 'bannerUrl']: publicUrl,
  })

  return NextResponse.json({ url: publicUrl })
})

export const DELETE = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = req.auth.user!.id!

  const { type } = await req.json()
  if (!type || !['logo', 'banner'].includes(type))
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const { data: files } = await supabase.storage
    .from(BUCKET)
    .list(userId, { search: type })
  if (files?.length) {
    await supabase.storage
      .from(BUCKET)
      .remove(files.map((f) => `${userId}/${f.name}`))
  }

  const settings = await getSettings(userId)
  await saveSettings(userId, {
    ...settings,
    [type === 'logo' ? 'logoUrl' : 'bannerUrl']: '',
  })

  return NextResponse.json({ success: true })
})
