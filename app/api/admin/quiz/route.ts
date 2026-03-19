export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

import { auth } from '@/lib/auth'
import {
  addQuestion,
  deleteQuestion,
  getQuizQuestions,
  updateQuestion,
} from '@/lib/data'

export const GET = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = req.auth.user!.id!
  const type = new URL(req.url).searchParams.get('type') as
    | 'preTest'
    | 'postTest'
    | null
  if (type) return NextResponse.json(await getQuizQuestions(userId, type))
  const [pre, post] = await Promise.all([
    getQuizQuestions(userId, 'preTest'),
    getQuizQuestions(userId, 'postTest'),
  ])
  return NextResponse.json({ preTest: pre, postTest: post })
})

export const POST = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = req.auth.user!.id!
  const { type, question } = await req.json()
  if (!type || !question?.question || !question?.options?.length)
    return NextResponse.json(
      { error: 'Question data incomplete' },
      { status: 400 }
    )
  await addQuestion(userId, {
    type,
    question: question.question,
    options: question.options,
    correctAnswer: question.correctAnswer,
  })
  return NextResponse.json(await getQuizQuestions(userId, type))
})

export const PUT = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = req.auth.user!.id!
  const { type, id, question } = await req.json()
  if (!id || !question)
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
  await updateQuestion(id, userId, {
    question: question.question,
    options: question.options,
    correctAnswer: question.correctAnswer,
  })
  return NextResponse.json(await getQuizQuestions(userId, type))
})

export const DELETE = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = req.auth.user!.id!
  const { type, id } = await req.json()
  await deleteQuestion(id, userId)
  return NextResponse.json(await getQuizQuestions(userId, type))
})
