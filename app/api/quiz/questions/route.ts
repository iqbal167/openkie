export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'

import { getQuizData } from '@/lib/data'

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get('type')
  if (type !== 'preTest' && type !== 'postTest')
    return NextResponse.json({ error: 'Type tidak valid' }, { status: 400 })

  const quiz = await getQuizData()
  const questions = quiz[type].map(({ jawabanBenar: _, ...rest }) => rest)
  return NextResponse.json(questions)
}
