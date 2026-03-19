import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

import { createUser, getUserByEmail } from '@/lib/data'

export async function POST(req: Request) {
  const { email, password } = await req.json()
  if (!email || !password || password.length < 6)
    return NextResponse.json(
      { error: 'Email dan password (min 6 karakter) wajib diisi' },
      { status: 400 }
    )

  const existing = await getUserByEmail(email)
  if (existing)
    return NextResponse.json(
      { error: 'Email sudah terdaftar' },
      { status: 409 }
    )

  const passwordHash = await bcrypt.hash(password, 10)
  try {
    await createUser(email, passwordHash)
  } catch {
    return NextResponse.json({ error: 'Gagal membuat akun' }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}
