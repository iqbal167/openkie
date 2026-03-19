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

import { auth } from '@/lib/auth'

export const PUT = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { currentPassword, newUsername, newPassword } = await req.json()
  const admin = await getAdmin()
  if (!admin)
    return NextResponse.json({ error: 'No admin found' }, { status: 404 })

  if (
    !currentPassword ||
    !(await bcrypt.compare(currentPassword, admin.passwordHash))
  )
    return NextResponse.json({ error: 'Password lama salah' }, { status: 403 })

  const username = newUsername || admin.username
  const passwordHash = newPassword
    ? await bcrypt.hash(newPassword, 10)
    : admin.passwordHash

  if (newPassword && newPassword.length < 6)
    return NextResponse.json(
      { error: 'Password minimal 6 karakter' },
      { status: 400 }
    )

  await saveAdmin({ username, passwordHash })
  return NextResponse.json({ success: true })
})
