import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

import { auth } from '@/lib/auth'
import { getSettings, saveSettings } from '@/lib/data'

export const GET = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const settings = await getSettings()
  return NextResponse.json(settings.videoTestimonials)
})

export const POST = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id, title } = await req.json()
  if (!id || !title)
    return NextResponse.json(
      { error: 'ID dan judul wajib diisi' },
      { status: 400 }
    )
  const settings = await getSettings()
  settings.videoTestimonials.push({ id, title })
  await saveSettings(settings)
  revalidatePath('/')
  return NextResponse.json({ success: true })
})

export const PUT = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { index, id, title } = await req.json()
  const settings = await getSettings()
  if (index < 0 || index >= settings.videoTestimonials.length)
    return NextResponse.json({ error: 'Index tidak valid' }, { status: 400 })
  if (!id || !title)
    return NextResponse.json(
      { error: 'ID dan judul wajib diisi' },
      { status: 400 }
    )
  settings.videoTestimonials[index] = { id, title }
  await saveSettings(settings)
  revalidatePath('/')
  return NextResponse.json({ success: true })
})

export const DELETE = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { index } = await req.json()
  const settings = await getSettings()
  if (index < 0 || index >= settings.videoTestimonials.length)
    return NextResponse.json({ error: 'Index tidak valid' }, { status: 400 })
  settings.videoTestimonials.splice(index, 1)
  await saveSettings(settings)
  revalidatePath('/')
  return NextResponse.json({ success: true })
})
