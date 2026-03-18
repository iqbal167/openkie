export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

import { auth } from '@/lib/auth'
import { getEducationMedia, saveEducationMedia } from '@/lib/data'

export const GET = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json(await getEducationMedia())
})

export const POST = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { title, videoUrl } = await req.json()
  if (!title || !videoUrl)
    return NextResponse.json(
      { error: 'Title dan URL wajib diisi' },
      { status: 400 }
    )
  const items = await getEducationMedia()
  items.push({ title, videoUrl })
  await saveEducationMedia(items)
  return NextResponse.json(items)
})

export const PUT = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { index, title, videoUrl } = await req.json()
  const items = await getEducationMedia()
  if (index < 0 || index >= items.length)
    return NextResponse.json({ error: 'Index tidak valid' }, { status: 400 })
  if (!title || !videoUrl)
    return NextResponse.json(
      { error: 'Title dan URL wajib diisi' },
      { status: 400 }
    )
  items[index] = { title, videoUrl }
  await saveEducationMedia(items)
  return NextResponse.json(items)
})

export const DELETE = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { index } = await req.json()
  const items = await getEducationMedia()
  if (index < 0 || index >= items.length)
    return NextResponse.json({ error: 'Index tidak valid' }, { status: 400 })
  items.splice(index, 1)
  await saveEducationMedia(items)
  return NextResponse.json(items)
})
