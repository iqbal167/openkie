import { NextResponse } from 'next/server'

import { auth } from '@/lib/auth'
import { getParticipants } from '@/lib/data'

export const GET = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const participants = await getParticipants()
  return NextResponse.json(participants)
})
