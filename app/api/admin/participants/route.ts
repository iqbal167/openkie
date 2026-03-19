export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

import { auth } from '@/lib/auth'
import { clearParticipants, getParticipants } from '@/lib/data'

export const GET = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = req.auth.user!.id!
  return NextResponse.json(await getParticipants(userId))
})

export const DELETE = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = req.auth.user!.id!
  await clearParticipants(userId)
  return NextResponse.json([])
})
