'use client'

import { useEffect, useState } from 'react'

interface SettingsForm {
  siteName: string
  siteDescription: string
  whatsappNumber: string
  whatsappMessageTemplate: string
}

export default function SettingsPage() {
  const [form, setForm] = useState<SettingsForm>({
    siteName: '',
    siteDescription: '',
    whatsappNumber: '',
    whatsappMessageTemplate: '',
  })
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>(
    'idle'
  )

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then(setForm)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('saving')
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setStatus(res.ok ? 'success' : 'error')
  }

  function update(field: keyof SettingsForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setStatus('idle')
  }

  const fields: {
    key: keyof SettingsForm
    label: string
    textarea?: boolean
  }[] = [
    { key: 'siteName', label: 'Nama Situs' },
    { key: 'siteDescription', label: 'Deskripsi Situs', textarea: true },
    { key: 'whatsappNumber', label: 'Nomor WhatsApp' },
    {
      key: 'whatsappMessageTemplate',
      label: 'Template Pesan WhatsApp',
      textarea: true,
    },
  ]

  return (
    <div>
      <h2 className="mb-4 text-lg font-bold">Pengaturan Umum</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {fields.map(({ key, label, textarea }) => (
          <label key={key} className="flex flex-col gap-1">
            <span className="text-sm font-medium">{label}</span>
            {textarea ? (
              <textarea
                value={form[key]}
                onChange={(e) => update(key, e.target.value)}
                rows={3}
                className="rounded-md border px-3 py-2 text-sm"
              />
            ) : (
              <input
                value={form[key]}
                onChange={(e) => update(key, e.target.value)}
                className="rounded-md border px-3 py-2 text-sm"
              />
            )}
          </label>
        ))}
        <button
          type="submit"
          disabled={status === 'saving'}
          className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-semibold disabled:opacity-50"
        >
          {status === 'saving' ? 'Menyimpan...' : 'Simpan'}
        </button>
        {status === 'success' && (
          <p className="text-sm text-green-600">Berhasil disimpan!</p>
        )}
        {status === 'error' && (
          <p className="text-sm text-red-600">Gagal menyimpan. Coba lagi.</p>
        )}
      </form>
    </div>
  )
}
