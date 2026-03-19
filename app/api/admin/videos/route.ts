export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

import { auth } from '@/lib/auth'
import {
  addHighlight,
  deleteHighlight,
  getHighlights,
  updateHighlight,
} from '@/lib/data'

export const GET = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = req.auth.user!.id!
  return NextResponse.json(await getHighlights(userId))
})

export const POST = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = req.auth.user!.id!
  const { videoId, title } = await req.json()
  if (!videoId || !title)
    return NextResponse.json(
      { error: 'ID dan judul wajib diisi' },
      { status: 400 }
    )
  await addHighlight(userId, { videoId, title })
  return NextResponse.json(await getHighlights(userId))
})

export const PUT = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = req.auth.user!.id!
  const { id, videoId, title } = await req.json()
  if (!id || !videoId || !title)
    return NextResponse.json(
      { error: 'ID dan judul wajib diisi' },
      { status: 400 }
    )
  await updateHighlight(id, userId, { videoId, title })
  return NextResponse.json(await getHighlights(userId))
})

export const DELETE = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = req.auth.user!.id!
  const { id } = await req.json()
  await deleteHighlight(id, userId)
  return NextResponse.json(await getHighlights(userId))
})
