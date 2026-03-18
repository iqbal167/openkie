import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

import { getAdmin, saveAdmin } from '@/lib/data'

export async function POST(req: Request) {
  const admin = await getAdmin()
  if (admin)
    return NextResponse.json({ error: 'Already set up' }, { status: 403 })

  const { username, password } = await req.json()
  if (!username || !password || password.length < 6)
    return NextResponse.json(
      { error: 'Username and password (min 6 chars) required' },
      { status: 400 }
    )

  const passwordHash = await bcrypt.hash(password, 10)
  await saveAdmin({ username, passwordHash })
  return NextResponse.json({ success: true })
}
