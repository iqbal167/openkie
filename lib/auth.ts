import bcrypt from 'bcryptjs'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { getUserByEmail } from '@/lib/data'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const email = credentials?.email as string
        const password = credentials?.password as string
        if (!email || !password) return null

        const user = await getUserByEmail(email)
        if (!user) return null

        if (await bcrypt.compare(password, user.passwordHash)) {
          return { id: user.id, name: user.username, email: user.email }
        }
        return null
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.userId = user.id
        token.username = user.name
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.userId as string
      session.user.name = token.username as string
      return session
    },
  },
  pages: { signIn: '/login' },
})
