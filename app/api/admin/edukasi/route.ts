import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

import { auth } from '@/lib/auth'
import { getSettings, saveSettings } from '@/lib/data'

export const GET = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const settings = await getSettings()
  return NextResponse.json(settings.metodeMKJP)
})

export const POST = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  if (!body.nama || !body.deskripsi)
    return NextResponse.json(
      { error: 'Nama dan deskripsi wajib diisi' },
      { status: 400 }
    )
  const settings = await getSettings()
  settings.metodeMKJP.push({
    nama: body.nama,
    deskripsi: body.deskripsi,
    videoUrl: body.videoUrl ?? '',
  })
  await saveSettings(settings)
  revalidatePath('/')
  return NextResponse.json({ success: true })
})

export const PUT = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const settings = await getSettings()
  if (body.index < 0 || body.index >= settings.metodeMKJP.length)
    return NextResponse.json({ error: 'Index tidak valid' }, { status: 400 })
  if (!body.nama || !body.deskripsi)
    return NextResponse.json(
      { error: 'Nama dan deskripsi wajib diisi' },
      { status: 400 }
    )
  settings.metodeMKJP[body.index] = {
    nama: body.nama,
    deskripsi: body.deskripsi,
    videoUrl: body.videoUrl ?? '',
  }
  await saveSettings(settings)
  revalidatePath('/')
  return NextResponse.json({ success: true })
})

export const DELETE = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { index } = await req.json()
  const settings = await getSettings()
  if (index < 0 || index >= settings.metodeMKJP.length)
    return NextResponse.json({ error: 'Index tidak valid' }, { status: 400 })
  settings.metodeMKJP.splice(index, 1)
  await saveSettings(settings)
  revalidatePath('/')
  return NextResponse.json({ success: true })
})
