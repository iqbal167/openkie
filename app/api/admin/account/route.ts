import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

import { auth } from '@/lib/auth'
import { getUserByUsername } from '@/lib/data'
import { supabase } from '@/lib/supabase'

export const PUT = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = req.auth.user!.id!

  const { currentPassword, newUsername, newPassword } = await req.json()

  const { data: user } = await supabase
    .from('users')
    .select('password_hash, username')
    .eq('id', userId)
    .single()
  if (!user)
    return NextResponse.json({ error: 'User not found' }, { status: 404 })

  if (
    !currentPassword ||
    !(await bcrypt.compare(currentPassword, user.password_hash))
  )
    return NextResponse.json({ error: 'Password lama salah' }, { status: 403 })

  if (newPassword && newPassword.length < 6)
    return NextResponse.json(
      { error: 'Password minimal 6 karakter' },
      { status: 400 }
    )

  if (newUsername && newUsername !== user.username) {
    const existing = await getUserByUsername(newUsername)
    if (existing)
      return NextResponse.json(
        { error: 'Username sudah dipakai' },
        { status: 409 }
      )
  }

  const updates: Record<string, string> = {}
  if (newUsername) updates.username = newUsername
  if (newPassword) updates.password_hash = await bcrypt.hash(newPassword, 10)

  if (Object.keys(updates).length === 0)
    return NextResponse.json({ error: 'Tidak ada perubahan' }, { status: 400 })

  await supabase.from('users').update(updates).eq('id', userId)
  return NextResponse.json({ success: true })
})

export const DELETE = auth(async (req) => {
  if (!req.auth)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = req.auth.user!.id!

  const { currentPassword } = await req.json()

  const { data: user } = await supabase
    .from('users')
    .select('password_hash')
    .eq('id', userId)
    .single()
  if (!user)
    return NextResponse.json({ error: 'User not found' }, { status: 404 })

  if (
    !currentPassword ||
    !(await bcrypt.compare(currentPassword, user.password_hash))
  )
    return NextResponse.json({ error: 'Password salah' }, { status: 403 })

  await supabase.from('users').delete().eq('id', userId)
  return NextResponse.json({ success: true })
})
