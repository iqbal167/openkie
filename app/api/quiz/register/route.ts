export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

import { getParticipants, saveParticipants } from '@/lib/data'

export async function POST(req: Request) {
  const { phone, name } = await req.json()
  if (!phone || !name)
    return NextResponse.json(
      { error: 'Phone and name wajib diisi' },
      { status: 400 }
    )

  const participants = await getParticipants()
  const existing = participants.find((p) => p.phone === phone)

  if (existing)
    return NextResponse.json({ registered: false, participant: existing })

  const participant = {
    phone,
    name,
    registeredAt: new Date().toISOString(),
  }
  participants.push(participant)
  await saveParticipants(participants)
  return NextResponse.json({ registered: true, participant })
}
