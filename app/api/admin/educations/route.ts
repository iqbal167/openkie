export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

import { auth } from '@/lib/auth'
import {
  addEducationMaterial,
  deleteEducationMaterial,
  getEducationMaterials,
  updateEducationMaterial,
} from '@/lib/data'

export const GET = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = req.auth.user!.id!
  return NextResponse.json(await getEducationMaterials(userId))
})

export const POST = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = req.auth.user!.id!
  const { name, description, videoUrl } = await req.json()
  if (!name || !description)
    return NextResponse.json(
      { error: 'Name and description required' },
      { status: 400 }
    )
  await addEducationMaterial(userId, { name, description, videoUrl })
  return NextResponse.json(await getEducationMaterials(userId))
})

export const PUT = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = req.auth.user!.id!
  const { id, name, description, videoUrl } = await req.json()
  if (!id || !name || !description)
    return NextResponse.json(
      { error: 'Name and description required' },
      { status: 400 }
    )
  await updateEducationMaterial(id, userId, { name, description, videoUrl })
  return NextResponse.json(await getEducationMaterials(userId))
})

export const DELETE = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = req.auth.user!.id!
  const { id } = await req.json()
  await deleteEducationMaterial(id, userId)
  return NextResponse.json(await getEducationMaterials(userId))
})
