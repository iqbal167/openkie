export const dynamic = 'force-dynamic'

import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

import { auth } from '@/lib/auth'
import { getEducationMaterials, saveEducationMaterials } from '@/lib/data'

export const GET = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json(await getEducationMaterials())
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
  const items = await getEducationMaterials()
  items.push({
    name: body.name,
    description: body.description,
    videoUrl: body.videoUrl ?? '',
  })
  await saveEducationMaterials(items)
  revalidatePath('/')
  return NextResponse.json(items)
})

export const PUT = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const items = await getEducationMaterials()
  if (body.index < 0 || body.index >= items.length)
    return NextResponse.json({ error: 'Index tidak valid' }, { status: 400 })
  if (!body.name || !body.description)
    return NextResponse.json(
      { error: 'Name and description required' },
      { status: 400 }
    )
  items[body.index] = {
    name: body.name,
    description: body.description,
    videoUrl: body.videoUrl ?? '',
  }
  await saveEducationMaterials(items)
  revalidatePath('/')
  return NextResponse.json(items)
})

export const DELETE = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { index } = await req.json()
  const items = await getEducationMaterials()
  if (index < 0 || index >= items.length)
    return NextResponse.json({ error: 'Index tidak valid' }, { status: 400 })
  items.splice(index, 1)
  await saveEducationMaterials(items)
  revalidatePath('/')
  return NextResponse.json(items)
})
