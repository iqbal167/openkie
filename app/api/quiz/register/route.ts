export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

import {
  getParticipantByPhone,
  getUserByUsername,
  saveParticipant,
} from '@/lib/data'

export async function POST(req: Request) {
  const { phone, name, username } = await req.json()
  if (!phone || !name || !username)
    return NextResponse.json(
      { error: 'Phone, name, username wajib diisi' },
      { status: 400 }
    )

  const user = await getUserByUsername(username)
  if (!user)
    return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const existing = await getParticipantByPhone(user.id, phone)
  if (existing)
    return NextResponse.json({ registered: false, participant: existing })

  await saveParticipant(user.id, { phone, name })
  const participant = await getParticipantByPhone(user.id, phone)
  return NextResponse.json({ registered: true, participant })
}
