export const dynamic = 'force-dynamic'

import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

import { auth } from '@/lib/auth'
import { getSettings, saveSettings } from '@/lib/data'

export const GET = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const settings = await getSettings()
  return NextResponse.json(settings.educationMaterials)
})

export const POST = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  if (!body.name || !body.description)
    return NextResponse.json(
      { error: 'Name and description required' },
      { status: 400 }
    )
  const settings = await getSettings()
  settings.educationMaterials.push({
    name: body.name,
    description: body.description,
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
  if (body.index < 0 || body.index >= settings.educationMaterials.length)
    return NextResponse.json({ error: 'Index tidak valid' }, { status: 400 })
  if (!body.name || !body.description)
    return NextResponse.json(
      { error: 'Name and description required' },
      { status: 400 }
    )
  settings.educationMaterials[body.index] = {
    name: body.name,
    description: body.description,
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
  if (index < 0 || index >= settings.educationMaterials.length)
    return NextResponse.json({ error: 'Index tidak valid' }, { status: 400 })
  settings.educationMaterials.splice(index, 1)
  await saveSettings(settings)
  revalidatePath('/')
  return NextResponse.json({ success: true })
})
