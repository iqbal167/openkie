'use client'

import { useState } from 'react'

interface PhoneRegisterProps {
  onRegistered: (phone: string, name: string) => void
  username: string
}

export function PhoneRegister({ onRegistered, username }: PhoneRegisterProps) {
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const cleaned = phone.replace(/\D/g, '')
    if (!/^(08|628)\d{8,}$/.test(cleaned)) {
      setError('Format nomor WA tidak valid (08xxx atau 628xxx)')
      return
    }
    if (!name.trim()) {
      setError('Nama wajib diisi')
      return
    }

    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/quiz/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleaned, name: name.trim(), username }),
      })
      if (res.ok) {
        onRegistered(cleaned, name.trim())
      } else {
        setError('Gagal mendaftar, coba lagi.')
      }
    } catch {
      setError('Terjadi kesalahan jaringan.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <p className="text-sm text-gray-600">
        Masukkan nomor WhatsApp dan nama untuk memulai.
      </p>
      <input
        type="tel"
        placeholder="Nomor WhatsApp (08xxx)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="rounded-lg border px-4 py-3 text-sm"
      />
      <input
        placeholder="Nama Lengkap"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="rounded-lg border px-4 py-3 text-sm"
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="bg-primary text-primary-foreground rounded-lg px-4 py-3 text-sm font-semibold disabled:opacity-50"
      >
        {loading ? 'Memproses...' : 'Mulai'}
      </button>
    </form>
  )
}
