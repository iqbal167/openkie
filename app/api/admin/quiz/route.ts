export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

import { auth } from '@/lib/auth'
import { getQuizData, saveQuizData } from '@/lib/data'
import type { QuizData } from '@/lib/types'

type QuizType = keyof QuizData

function validType(t: unknown): t is QuizType {
  return t === 'preTest' || t === 'postTest'
}

export const GET = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const type = new URL(req.url).searchParams.get('type')
  const quiz = await getQuizData()
  if (validType(type)) return NextResponse.json(quiz[type])
  return NextResponse.json(quiz)
})

export const POST = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { type, question } = await req.json()
  if (!validType(type))
    return NextResponse.json({ error: 'Type tidak valid' }, { status: 400 })
  if (!question?.soal || !question?.pilihan?.length)
    return NextResponse.json(
      { error: 'Question data incomplete' },
      { status: 400 }
    )

  const quiz = await getQuizData()
  quiz[type].push({ ...question, id: crypto.randomUUID() })
  await saveQuizData(quiz)
  return NextResponse.json(quiz)
})

export const PUT = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { type, index, question } = await req.json()
  if (!validType(type))
    return NextResponse.json({ error: 'Type tidak valid' }, { status: 400 })

  const quiz = await getQuizData()
  if (index < 0 || index >= quiz[type].length)
    return NextResponse.json({ error: 'Index tidak valid' }, { status: 400 })

  quiz[type][index] = { ...question, id: quiz[type][index].id }
  await saveQuizData(quiz)
  return NextResponse.json(quiz)
})

export const DELETE = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { type, index } = await req.json()
  if (!validType(type))
    return NextResponse.json({ error: 'Type tidak valid' }, { status: 400 })

  const quiz = await getQuizData()
  if (index < 0 || index >= quiz[type].length)
    return NextResponse.json({ error: 'Index tidak valid' }, { status: 400 })

  quiz[type].splice(index, 1)
  await saveQuizData(quiz)
  return NextResponse.json(quiz)
})
