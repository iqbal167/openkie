'use client'

import { useCallback, useEffect, useState } from 'react'

import type { MetodeMKJP } from '@/lib/types'

const emptyForm: MetodeMKJP = {
  nama: '',
  deskripsi: '',
  kelebihan: [''],
  efekSamping: [''],
  mitosVsFakta: { mitos: '', fakta: '' },
}

export default function EdukasiPage() {
  const [items, setItems] = useState<MetodeMKJP[]>([])
  const [form, setForm] = useState<MetodeMKJP>({ ...emptyForm })
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [status, setStatus] = useState('')

  const load = useCallback(async () => {
    const res = await fetch('/api/admin/edukasi')
    const data = await res.json()
    setItems(data)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load()
  }, [load])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.nama || !form.deskripsi) return

    const clean = {
      ...form,
      kelebihan: form.kelebihan.filter(Boolean),
      efekSamping: form.efekSamping.filter(Boolean),
    }

    const isEdit = editIndex !== null
    const res = await fetch('/api/admin/edukasi', {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(isEdit ? { ...clean, index: editIndex } : clean),
    })

    if (res.ok) {
      setForm({ ...emptyForm })
      setEditIndex(null)
      setStatus(isEdit ? 'Metode diperbarui!' : 'Metode ditambahkan!')
      await load()
    } else {
      setStatus('Gagal menyimpan.')
    }
  }

  async function handleDelete(index: number) {
    const res = await fetch('/api/admin/edukasi', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ index }),
    })
    if (res.ok) {
      setStatus('Metode dihapus!')
      await load()
    }
  }

  function startEdit(index: number) {
    setEditIndex(index)
    const item = items[index]
    setForm({
      ...item,
      kelebihan: item.kelebihan.length ? item.kelebihan : [''],
      efekSamping: item.efekSamping.length ? item.efekSamping : [''],
    })
    setStatus('')
  }

  function cancelEdit() {
    setEditIndex(null)
    setForm({ ...emptyForm })
  }

  function updateList(
    field: 'kelebihan' | 'efekSamping',
    index: number,
    value: string
  ) {
    setForm((f) => {
      const arr = [...f[field]]
      arr[index] = value
      return { ...f, [field]: arr }
    })
  }

  function addListItem(field: 'kelebihan' | 'efekSamping') {
    setForm((f) => ({ ...f, [field]: [...f[field], ''] }))
  }

  function removeListItem(field: 'kelebihan' | 'efekSamping', index: number) {
    setForm((f) => ({
      ...f,
      [field]: f[field].filter((_, i) => i !== index),
    }))
  }

  return (
    <div>
      <h2 className="mb-4 text-lg font-bold">Kelola Konten Edukasi</h2>

      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-3">
        <input
          placeholder="Nama Metode"
          value={form.nama}
          onChange={(e) => setForm((f) => ({ ...f, nama: e.target.value }))}
          className="rounded-md border px-3 py-2 text-sm"
        />
        <textarea
          placeholder="Deskripsi"
          value={form.deskripsi}
          onChange={(e) =>
            setForm((f) => ({ ...f, deskripsi: e.target.value }))
          }
          rows={2}
          className="rounded-md border px-3 py-2 text-sm"
        />

        <MultiInput
          label="Kelebihan"
          items={form.kelebihan}
          onChange={(i, v) => updateList('kelebihan', i, v)}
          onAdd={() => addListItem('kelebihan')}
          onRemove={(i) => removeListItem('kelebihan', i)}
        />
        <MultiInput
          label="Efek Samping"
          items={form.efekSamping}
          onChange={(i, v) => updateList('efekSamping', i, v)}
          onAdd={() => addListItem('efekSamping')}
          onRemove={(i) => removeListItem('efekSamping', i)}
        />

        <input
          placeholder="Mitos"
          value={form.mitosVsFakta.mitos}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              mitosVsFakta: { ...f.mitosVsFakta, mitos: e.target.value },
            }))
          }
          className="rounded-md border px-3 py-2 text-sm"
        />
        <input
          placeholder="Fakta"
          value={form.mitosVsFakta.fakta}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              mitosVsFakta: { ...f.mitosVsFakta, fakta: e.target.value },
            }))
          }
          className="rounded-md border px-3 py-2 text-sm"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-semibold"
          >
            {editIndex !== null ? 'Update' : 'Tambah'}
          </button>
          {editIndex !== null && (
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-md border px-4 py-2 text-sm"
            >
              Batal
            </button>
          )}
        </div>
        {status && <p className="text-sm text-green-600">{status}</p>}
      </form>

      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-md border p-3"
          >
            <div className="text-sm">
              <p className="font-medium">{item.nama}</p>
              <p className="text-muted-foreground line-clamp-1">
                {item.deskripsi}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(i)}
                className="text-sm text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(i)}
                className="text-sm text-red-600 hover:underline"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MultiInput({
  label,
  items,
  onChange,
  onAdd,
  onRemove,
}: {
  label: string
  items: string[]
  onChange: (index: number, value: string) => void
  onAdd: () => void
  onRemove: (index: number) => void
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium">{label}</span>
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            value={item}
            onChange={(e) => onChange(i, e.target.value)}
            className="flex-1 rounded-md border px-3 py-1 text-sm"
          />
          {items.length > 1 && (
            <button
              type="button"
              onClick={() => onRemove(i)}
              className="text-sm text-red-500"
            >
              ✕
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={onAdd}
        className="self-start text-sm text-blue-600 hover:underline"
      >
        + Tambah {label.toLowerCase()}
      </button>
    </div>
  )
}
