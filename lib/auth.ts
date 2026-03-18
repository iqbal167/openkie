import bcrypt from 'bcryptjs'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { getAdmin } from '@/lib/data'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: { username: {}, password: {} },
      async authorize(credentials) {
        const username = credentials?.username as string
        const password = credentials?.password as string
        if (!username || !password) return null

        const admin = await getAdmin()
        if (!admin) return null

        if (
          admin.username === username &&
          (await bcrypt.compare(password, admin.passwordHash))
        ) {
          return { id: '1', name: admin.username }
        }
        return null
      },
    }),
  ],
  pages: { signIn: '/admin/login' },
})
