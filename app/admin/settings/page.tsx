'use client'

import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

interface SettingsForm {
  siteName: string
  siteDescription: string
  whatsappNumber: string
  whatsappMessageTemplate: string
  quizEnabled: boolean
  highlightTitle: string
  educationTitle: string
  footerText: string
}

export default function SettingsPage() {
  const [form, setForm] = useState<SettingsForm>({
    siteName: '',
    siteDescription: '',
    whatsappNumber: '',
    whatsappMessageTemplate: '',
    quizEnabled: false,
    highlightTitle: '',
    educationTitle: '',
    footerText: '',
  })
  const [saving, setSaving] = useState(false)

  const loadSettings = useCallback(async () => {
    const res = await fetch(`/api/admin/settings?t=${Date.now()}`)
    const data = await res.json()
    setForm({
      ...data,
      quizEnabled: data.quizEnabled ?? false,
      highlightTitle: data.highlightTitle ?? '',
      educationTitle: data.educationTitle ?? '',
      footerText: data.footerText ?? '',
    })
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadSettings()
  }, [loadSettings])

  function formatWhatsApp(value: string): string {
    const digits = value.replace(/\D/g, '')
    if (digits.startsWith('08')) return '62' + digits.slice(1)
    if (digits.startsWith('+62')) return digits.slice(1)
    return digits
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form.whatsappNumber && !/^62\d{9,13}$/.test(form.whatsappNumber)) {
      toast.error('Format WA: 62 diikuti 9-13 digit (contoh: 6287885684726)')
      return
    }
    setSaving(true)
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      toast.success('Berhasil disimpan!')
    } else {
      toast.error('Gagal menyimpan.')
    }
    setSaving(false)
  }

  function update(field: keyof SettingsForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  type Field = {
    key: Exclude<keyof SettingsForm, 'quizEnabled'>
    label: string
    textarea?: boolean
    placeholder?: string
  }

  const featuredFields: Field[] = [
    { key: 'highlightTitle', label: 'Judul Section Sorotan' },
    { key: 'siteName', label: 'Nama Situs' },
    { key: 'siteDescription', label: 'Deskripsi Situs', textarea: true },
    {
      key: 'whatsappNumber',
      label: 'Nomor WhatsApp',
      placeholder: '6287885684726',
    },
    {
      key: 'whatsappMessageTemplate',
      label: 'Template Pesan WhatsApp',
      textarea: true,
    },
    { key: 'footerText', label: 'Teks Footer' },
  ]

  const edukasiFields: Field[] = [
    { key: 'educationTitle', label: 'Judul Section Edukasi' },
  ]

  function renderFields(fields: Field[]) {
    return fields.map(({ key, label, textarea, placeholder }) => (
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
            onBlur={
              key === 'whatsappNumber'
                ? () => update(key, formatWhatsApp(form[key]))
                : undefined
            }
            placeholder={placeholder}
            className="rounded-md border px-3 py-2 text-sm"
          />
        )}
      </label>
    ))
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <section>
          <h2 className="mb-3 text-lg font-bold">Featured</h2>
          <div className="flex flex-col gap-4">
            {renderFields(featuredFields)}
          </div>
        </section>

        <hr />

        <section>
          <h2 className="mb-3 text-lg font-bold">Edukasi</h2>
          <div className="flex flex-col gap-4">
            {renderFields(edukasiFields)}
            <label className="flex items-center justify-between rounded-md border px-4 py-3">
              <div>
                <span className="text-sm font-medium">
                  Pre-Test & Post-Test
                </span>
                <p className="text-muted-foreground text-xs">
                  Aktifkan quiz sebelum dan sesudah materi edukasi
                </p>
              </div>
              <input
                type="checkbox"
                checked={form.quizEnabled}
                onChange={(e) =>
                  setForm((f) => ({ ...f, quizEnabled: e.target.checked }))
                }
                className="accent-primary h-5 w-5"
              />
            </label>
          </div>
        </section>

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
