export const dynamic = 'force-dynamic'

import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

import { auth } from '@/lib/auth'
import { getSettings, saveSettings } from '@/lib/data'

export const GET = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json(await getSettings())
})

export const PUT = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const settings = await getSettings()

  await saveSettings({ ...settings, ...body })
  revalidatePath('/')
  return NextResponse.json({ success: true })
})
