'use client'

import { useCallback, useEffect, useState } from 'react'

import { ConfirmDelete } from '@/components/confirm-delete'
import { SkeletonList } from '@/components/skeleton'
import type { EducationMaterial } from '@/lib/types'

const emptyForm: EducationMaterial = {
  name: '',
  description: '',
  videoUrl: '',
}

export default function EdukasiPage() {
  const [items, setItems] = useState<EducationMaterial[]>([])
  const [form, setForm] = useState<EducationMaterial>({ ...emptyForm })
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch(`/api/admin/edukasi?t=${Date.now()}`)
    setItems(await res.json())
    setLoading(false)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load()
  }, [load])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.description) return

    const isEdit = editIndex !== null
    const res = await fetch('/api/admin/edukasi', {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(isEdit ? { ...form, index: editIndex } : form),
    })

    if (res.ok) {
      setForm({ ...emptyForm })
      setEditIndex(null)
      setStatus(isEdit ? 'Materi diperbarui!' : 'Materi ditambahkan!')
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
      setStatus('Materi dihapus!')
      await load()
    }
  }

  function startEdit(index: number) {
    setEditIndex(index)
    setForm({ ...items[index] })
    setStatus('')
  }

  function cancelEdit() {
    setEditIndex(null)
    setForm({ ...emptyForm })
  }

  return (
    <div>
      <h2 className="mb-4 text-lg font-bold">Kelola Konten Edukasi</h2>

      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-3">
        <input
          placeholder="Judul"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="rounded-md border px-3 py-2 text-sm"
        />
        <textarea
          placeholder="Deskripsi"
          value={form.description}
          onChange={(e) =>
            setForm((f) => ({ ...f, description: e.target.value }))
          }
          rows={2}
          className="rounded-md border px-3 py-2 text-sm"
        />
        <input
          placeholder="URL YouTube (opsional)"
          value={form.videoUrl ?? ''}
          onChange={(e) => setForm((f) => ({ ...f, videoUrl: e.target.value }))}
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

      {loading ? (
        <SkeletonList />
      ) : items.length === 0 ? (
        <p className="text-muted-foreground text-sm">Belum ada data.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-md border p-3"
            >
              <div className="text-sm">
                <p className="font-medium">{item.name}</p>
                <p className="text-muted-foreground line-clamp-1">
                  {item.description}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(i)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <ConfirmDelete
                  onConfirm={async () => {
                    await handleDelete(i)
                  }}
                >
                  <button className="text-sm text-red-600 hover:underline">
                    Hapus
                  </button>
                </ConfirmDelete>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
