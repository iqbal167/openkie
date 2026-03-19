'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Suspense, useState } from 'react'
import { toast } from 'sonner'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)

  if (searchParams.get('error')) {
    toast.error('Email atau password salah')
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const res = await signIn('credentials', {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      redirect: false,
    })

    if (res?.error) {
      toast.error('Email atau password salah')
      setLoading(false)
    } else {
      router.push('/admin')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col gap-4"
    >
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="rounded-md border px-4 py-2"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        className="rounded-md border px-4 py-2"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-primary text-primary-foreground rounded-md px-4 py-2 font-semibold disabled:opacity-50"
      >
        {loading ? 'Masuk...' : 'Masuk'}
      </button>
      <p className="text-center text-sm">
        Belum punya akun?{' '}
        <Link href="/register" className="text-primary hover:underline">
          Daftar
        </Link>
      </p>
    </form>
  )
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        <h1 className="text-2xl font-bold">Masuk</h1>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
