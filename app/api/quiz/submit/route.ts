export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

import {
  getParticipantByPhone,
  getQuizQuestions,
  getUserByUsername,
  saveParticipant,
} from '@/lib/data'

export async function POST(req: Request) {
  const { phone, type, answers, username } = (await req.json()) as {
    phone: string
    type: 'preTest' | 'postTest'
    answers: number[]
    username: string
  }

  if (type !== 'preTest' && type !== 'postTest')
    return NextResponse.json({ error: 'Type tidak valid' }, { status: 400 })
  if (!username)
    return NextResponse.json({ error: 'Username required' }, { status: 400 })

  const user = await getUserByUsername(username)
  if (!user)
    return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const participant = await getParticipantByPhone(user.id, phone)
  if (!participant)
    return NextResponse.json(
      { error: 'Peserta tidak ditemukan' },
      { status: 404 }
    )

  if (participant[type])
    return NextResponse.json(
      { error: `${type} sudah dikerjakan` },
      { status: 400 }
    )

  const questions = await getQuizQuestions(user.id, type)

  if (!Array.isArray(answers) || answers.length !== questions.length)
    return NextResponse.json(
      { error: 'Jumlah jawaban tidak sesuai' },
      { status: 400 }
    )

  const score = questions.reduce(
    (acc, q, i) => acc + (q.correctAnswer === answers[i] ? 1 : 0),
    0
  )

  const result = {
    score,
    total: questions.length,
    completedAt: new Date().toISOString(),
  }

  await saveParticipant(user.id, {
    phone: participant.phone,
    name: participant.name,
    preTest: type === 'preTest' ? result : participant.preTest,
    postTest: type === 'postTest' ? result : participant.postTest,
  })

  return NextResponse.json({ score, total: questions.length })
}
