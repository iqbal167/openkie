export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'

import { getQuizQuestions, getUserByUsername } from '@/lib/data'

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get('type')
  const username = req.nextUrl.searchParams.get('username')
  if (type !== 'preTest' && type !== 'postTest')
    return NextResponse.json({ error: 'Type tidak valid' }, { status: 400 })
  if (!username)
    return NextResponse.json({ error: 'Username required' }, { status: 400 })

  const user = await getUserByUsername(username)
  if (!user)
    return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const questions = (await getQuizQuestions(user.id, type)).map(
    ({ correctAnswer: _, ...rest }) => rest
  )
  return NextResponse.json(questions)
}
