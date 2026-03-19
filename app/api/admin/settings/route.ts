export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

import { auth } from '@/lib/auth'
import { getSettings, saveSettings } from '@/lib/data'

export const GET = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = req.auth.user!.id!
  return NextResponse.json(await getSettings(userId))
})

export const PUT = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = req.auth.user!.id!
  const body = await req.json()
  const settings = await getSettings(userId)
  await saveSettings(userId, { ...settings, ...body })
  return NextResponse.json({ success: true })
})
