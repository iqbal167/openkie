export const dynamic = 'force-dynamic'

import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

import { auth } from '@/lib/auth'
import { getSettings, saveSettings } from '@/lib/data'

export const GET = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const settings = await getSettings()
  return NextResponse.json({
    siteName: settings.siteName,
    siteDescription: settings.siteDescription,
    whatsappNumber: settings.whatsappNumber,
    whatsappMessageTemplate: settings.whatsappMessageTemplate,
  })
})

export const PUT = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const settings = await getSettings()

  const updated = {
    ...settings,
    siteName: body.siteName ?? settings.siteName,
    siteDescription: body.siteDescription ?? settings.siteDescription,
    whatsappNumber: body.whatsappNumber ?? settings.whatsappNumber,
    whatsappMessageTemplate:
      body.whatsappMessageTemplate ?? settings.whatsappMessageTemplate,
  }

  await saveSettings(updated)
  revalidatePath('/')
  return NextResponse.json({ success: true })
})
