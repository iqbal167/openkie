export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

import { getParticipants, getQuizData, saveParticipants } from '@/lib/data'
import type { Participant } from '@/lib/types'

export async function POST(req: Request) {
  const { phone, type, answers } = (await req.json()) as {
    phone: string
    type: 'preTest' | 'postTest'
    answers: number[]
  }

  if (type !== 'preTest' && type !== 'postTest')
    return NextResponse.json({ error: 'Type tidak valid' }, { status: 400 })

  const participants = await getParticipants()
  const idx = participants.findIndex((p: Participant) => p.phone === phone)
  if (idx === -1)
    return NextResponse.json(
      { error: 'Peserta tidak ditemukan' },
      { status: 404 }
    )

  if (participants[idx][type])
    return NextResponse.json(
      { error: `${type} sudah dikerjakan` },
      { status: 400 }
    )

  const quiz = await getQuizData()
  const questions = quiz[type]

  if (!Array.isArray(answers) || answers.length !== questions.length)
    return NextResponse.json(
      { error: 'Jumlah jawaban tidak sesuai' },
      { status: 400 }
    )

  const score = questions.reduce(
    (acc: number, q, i: number) =>
      acc + (q.correctAnswer === answers[i] ? 1 : 0),
    0
  )

  participants[idx][type] = {
    score,
    total: questions.length,
    completedAt: new Date().toISOString(),
  }
  await saveParticipants(participants)

  return NextResponse.json({ score, total: questions.length })
}
