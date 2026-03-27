'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
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
  bgColorFrom: string
  bgColorTo: string
  logoUrl: string
  bannerUrl: string
  operatingHoursStart: string
  operatingHoursEnd: string
}

const COLOR_PRESETS = [
  { from: '#ffffff', to: '#ffffff', label: 'Putih' },
  { from: '#dbeafe', to: '#ede9fe', label: 'Biru → Ungu' },
  { from: '#dcfce7', to: '#d1fae5', label: 'Hijau Muda' },
  { from: '#fef3c7', to: '#fce7f3', label: 'Kuning → Pink' },
  { from: '#f0f9ff', to: '#e0f2fe', label: 'Langit' },
  { from: '#fdf2f8', to: '#fce7f3', label: 'Pink' },
  { from: '#f5f3ff', to: '#ede9fe', label: 'Lavender' },
  { from: '#ecfdf5', to: '#f0fdf4', label: 'Mint' },
]

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
    bgColorFrom: '#ffffff',
    bgColorTo: '#ffffff',
    logoUrl: '',
    bannerUrl: '',
    operatingHoursStart: '',
    operatingHoursEnd: '',
  })
  const [saving, setSaving] = useState(false)
  const logoRef = useRef<HTMLInputElement>(null)
  const bannerRef = useRef<HTMLInputElement>(null)

  const loadSettings = useCallback(async () => {
    const res = await fetch(`/api/admin/settings?t=${Date.now()}`)
    const data = await res.json()
    setForm({
      ...data,
      quizEnabled: data.quizEnabled ?? false,
      highlightTitle: data.highlightTitle ?? '',
      educationTitle: data.educationTitle ?? '',
      footerText: data.footerText ?? '',
      bgColorFrom: data.bgColorFrom ?? '#ffffff',
      bgColorTo: data.bgColorTo ?? '#ffffff',
      logoUrl: data.logoUrl ?? '',
      bannerUrl: data.bannerUrl ?? '',
      operatingHoursStart: data.operatingHoursStart ?? '',
      operatingHoursEnd: data.operatingHoursEnd ?? '',
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

  async function uploadFile(file: File, type: 'logo' | 'banner') {
    const fd = new FormData()
    fd.append('file', file)
    fd.append('type', type)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    if (res.ok) {
      const { url } = await res.json()
      setForm((f) => ({
        ...f,
        [type === 'logo' ? 'logoUrl' : 'bannerUrl']: url,
      }))
      toast.success(`${type === 'logo' ? 'Logo' : 'Banner'} diupload!`)
    } else {
      toast.error('Gagal upload.')
    }
  }

  async function deleteFile(type: 'logo' | 'banner') {
    const res = await fetch('/api/admin/upload', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type }),
    })
    if (res.ok) {
      setForm((f) => ({
        ...f,
        [type === 'logo' ? 'logoUrl' : 'bannerUrl']: '',
      }))
      toast.success(`${type === 'logo' ? 'Logo' : 'Banner'} dihapus!`)
    }
  }

  type Field = {
    key: Exclude<
      keyof SettingsForm,
      | 'quizEnabled'
      | 'bgColorFrom'
      | 'bgColorTo'
      | 'logoUrl'
      | 'bannerUrl'
      | 'operatingHoursStart'
      | 'operatingHoursEnd'
    >
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
            <div>
              <span className="text-sm font-medium">
                Jam Operasional WhatsApp
              </span>
              <p className="text-muted-foreground mb-2 text-xs">
                Kosongkan jika aktif 24 jam.
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  value={form.operatingHoursStart}
                  onChange={(e) =>
                    update('operatingHoursStart', e.target.value)
                  }
                  className="rounded-md border px-3 py-2 text-sm"
                />
                <span className="text-sm">—</span>
                <input
                  type="time"
                  value={form.operatingHoursEnd}
                  onChange={(e) => update('operatingHoursEnd', e.target.value)}
                  className="rounded-md border px-3 py-2 text-sm"
                />
              </div>
            </div>
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

        <hr />

        <section>
          <h2 className="mb-3 text-lg font-bold">Logo & Banner</h2>
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-sm font-medium">Logo</span>
              <div className="mt-1 flex items-center gap-3">
                {form.logoUrl ? (
                  <Image
                    src={form.logoUrl}
                    alt="Logo"
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-lg border object-contain"
                  />
                ) : (
                  <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-lg border text-xs text-gray-400">
                    Logo
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => logoRef.current?.click()}
                    className="rounded-md border px-3 py-1.5 text-sm"
                  >
                    Upload
                  </button>
                  {form.logoUrl && (
                    <button
                      type="button"
                      onClick={() => deleteFile('logo')}
                      className="rounded-md border px-3 py-1.5 text-sm text-red-600"
                    >
                      Hapus
                    </button>
                  )}
                </div>
                <input
                  ref={logoRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0]
                    if (f) uploadFile(f, 'logo')
                    e.target.value = ''
                  }}
                />
              </div>
            </div>

            <div>
              <span className="text-sm font-medium">Banner</span>
              <div className="mt-1">
                {form.bannerUrl ? (
                  <Image
                    src={form.bannerUrl}
                    alt="Banner"
                    width={600}
                    height={200}
                    className="h-32 w-full rounded-lg border object-cover"
                  />
                ) : (
                  <div className="bg-muted flex h-32 w-full items-center justify-center rounded-lg border text-sm text-gray-400">
                    Banner
                  </div>
                )}
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => bannerRef.current?.click()}
                    className="rounded-md border px-3 py-1.5 text-sm"
                  >
                    Upload
                  </button>
                  {form.bannerUrl && (
                    <button
                      type="button"
                      onClick={() => deleteFile('banner')}
                      className="rounded-md border px-3 py-1.5 text-sm text-red-600"
                    >
                      Hapus
                    </button>
                  )}
                </div>
                <input
                  ref={bannerRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0]
                    if (f) uploadFile(f, 'banner')
                    e.target.value = ''
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <hr />

        <section>
          <h2 className="mb-3 text-lg font-bold">Warna Background</h2>
          <p className="text-muted-foreground mb-3 text-sm">
            Pilih kombinasi warna gradient untuk landing page.
          </p>

          <div className="mb-3 flex flex-wrap gap-2">
            {COLOR_PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() =>
                  setForm((f) => ({
                    ...f,
                    bgColorFrom: p.from,
                    bgColorTo: p.to,
                  }))
                }
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-all ${
                  form.bgColorFrom === p.from && form.bgColorTo === p.to
                    ? 'ring-primary border-primary ring-2'
                    : 'hover:border-gray-400'
                }`}
              >
                <span
                  className="inline-block h-4 w-4 rounded-full border"
                  style={{
                    background: `linear-gradient(to bottom, ${p.from}, ${p.to})`,
                  }}
                />
                {p.label}
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Warna Atas</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={form.bgColorFrom}
                  onChange={(e) => update('bgColorFrom', e.target.value)}
                  className="h-9 w-12 cursor-pointer rounded border"
                />
                <span className="text-muted-foreground text-xs">
                  {form.bgColorFrom}
                </span>
              </div>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Warna Bawah</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={form.bgColorTo}
                  onChange={(e) => update('bgColorTo', e.target.value)}
                  className="h-9 w-12 cursor-pointer rounded border"
                />
                <span className="text-muted-foreground text-xs">
                  {form.bgColorTo}
                </span>
              </div>
            </label>
          </div>

          <div
            className="mt-3 h-12 rounded-lg border"
            style={{
              background: `linear-gradient(to bottom, ${form.bgColorFrom}, ${form.bgColorTo})`,
            }}
          />
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
