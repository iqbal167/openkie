import { NextResponse } from 'next/server'

import { auth } from '@/lib/auth'
import { getMediaEdukasi, saveMediaEdukasi } from '@/lib/data'

export const GET = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json(await getMediaEdukasi())
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
  const items = await getMediaEdukasi()
  items.push({ title, videoUrl })
  await saveMediaEdukasi(items)
  return NextResponse.json({ success: true })
})

export const DELETE = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { index } = await req.json()
  const items = await getMediaEdukasi()
  if (index < 0 || index >= items.length)
    return NextResponse.json({ error: 'Index tidak valid' }, { status: 400 })
  items.splice(index, 1)
  await saveMediaEdukasi(items)
  return NextResponse.json({ success: true })
})
