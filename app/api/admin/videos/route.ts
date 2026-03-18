export const dynamic = 'force-dynamic'

import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

import { auth } from '@/lib/auth'
import { getHighlights, saveHighlights } from '@/lib/data'

export const GET = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json(await getHighlights())
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
  const items = await getHighlights()
  items.push({ id, title })
  await saveHighlights(items)
  revalidatePath('/')
  return NextResponse.json(items)
})

export const PUT = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { index, id, title } = await req.json()
  const items = await getHighlights()
  if (index < 0 || index >= items.length)
    return NextResponse.json({ error: 'Index tidak valid' }, { status: 400 })
  if (!id || !title)
    return NextResponse.json(
      { error: 'ID dan judul wajib diisi' },
      { status: 400 }
    )
  items[index] = { id, title }
  await saveHighlights(items)
  revalidatePath('/')
  return NextResponse.json(items)
})

export const DELETE = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { index } = await req.json()
  const items = await getHighlights()
  if (index < 0 || index >= items.length)
    return NextResponse.json({ error: 'Index tidak valid' }, { status: 400 })
  items.splice(index, 1)
  await saveHighlights(items)
  revalidatePath('/')
  return NextResponse.json(items)
})
