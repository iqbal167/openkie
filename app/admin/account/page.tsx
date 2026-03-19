'use client'

import { useState } from 'react'
import { toast } from 'sonner'

export default function AccountPage() {
  const [form, setForm] = useState({
    currentPassword: '',
    newUsername: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!form.currentPassword) {
      toast.error('Password lama wajib diisi.')
      return
    }
    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      toast.error('Password baru tidak sama.')
      return
    }
    if (form.newPassword && form.newPassword.length < 6) {
      toast.error('Password baru minimal 6 karakter.')
      return
    }
    if (!form.newUsername && !form.newPassword) {
      toast.error('Isi username baru atau password baru.')
      return
    }

    setSaving(true)
    const res = await fetch('/api/admin/account', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentPassword: form.currentPassword,
        newUsername: form.newUsername || undefined,
        newPassword: form.newPassword || undefined,
      }),
    })

    if (res.ok) {
      setForm({
        currentPassword: '',
        newUsername: '',
        newPassword: '',
        confirmPassword: '',
      })
      toast.success('Berhasil diperbarui!')
    } else {
      const data = await res.json()
      toast.error(data.error || 'Gagal memperbarui.')
    }
    setSaving(false)
  }

  return (
    <div>
      <h2 className="mb-4 text-lg font-bold">Akun</h2>
      <form onSubmit={handleSubmit} className="flex max-w-sm flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Password Lama *</span>
          <input
            type="password"
            value={form.currentPassword}
            onChange={(e) =>
              setForm((f) => ({ ...f, currentPassword: e.target.value }))
            }
            required
            className="rounded-md border px-3 py-2 text-sm"
          />
        </label>
        <hr />
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Username Baru</span>
          <input
            value={form.newUsername}
            onChange={(e) =>
              setForm((f) => ({ ...f, newUsername: e.target.value }))
            }
            placeholder="Kosongkan jika tidak diubah"
            className="rounded-md border px-3 py-2 text-sm"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Password Baru</span>
          <input
            type="password"
            value={form.newPassword}
            onChange={(e) =>
              setForm((f) => ({ ...f, newPassword: e.target.value }))
            }
            placeholder="Kosongkan jika tidak diubah"
            className="rounded-md border px-3 py-2 text-sm"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Konfirmasi Password Baru</span>
          <input
            type="password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm((f) => ({ ...f, confirmPassword: e.target.value }))
            }
            placeholder="Ulangi password baru"
            className="rounded-md border px-3 py-2 text-sm"
          />
        </label>
        <button
          type="submit"
          disabled={saving}
          className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-semibold disabled:opacity-50"
        >
          {saving ? 'Menyimpan...' : 'Simpan'}
        </button>
      </form>
    </div>
  )
}
