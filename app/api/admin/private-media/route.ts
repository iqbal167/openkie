export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

import { auth } from '@/lib/auth'
import {
  addEducationMedia,
  deleteEducationMedia,
  getEducationMedia,
  updateEducationMedia,
} from '@/lib/data'

export const GET = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = req.auth.user!.id!
  return NextResponse.json(await getEducationMedia(userId))
})

export const POST = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = req.auth.user!.id!
  const { title, videoUrl } = await req.json()
  if (!title || !videoUrl)
    return NextResponse.json(
      { error: 'Title dan URL wajib diisi' },
      { status: 400 }
    )
  await addEducationMedia(userId, { title, videoUrl })
  return NextResponse.json(await getEducationMedia(userId))
})

export const PUT = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = req.auth.user!.id!
  const { id, title, videoUrl } = await req.json()
  if (!id || !title || !videoUrl)
    return NextResponse.json(
      { error: 'Title dan URL wajib diisi' },
      { status: 400 }
    )
  await updateEducationMedia(id, userId, { title, videoUrl })
  return NextResponse.json(await getEducationMedia(userId))
})

export const DELETE = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = req.auth.user!.id!
  const { id } = await req.json()
  await deleteEducationMedia(id, userId)
  return NextResponse.json(await getEducationMedia(userId))
})
