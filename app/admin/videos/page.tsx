'use client'

import { useCallback, useEffect, useState } from 'react'

import { ConfirmDelete } from '@/components/confirm-delete'
import { SkeletonList } from '@/components/skeleton'
import type { VideoTestimonial } from '@/lib/types'

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoTestimonial[]>([])
  const [form, setForm] = useState({ id: '', title: '' })
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch(`/api/admin/videos?t=${Date.now()}`)
    const data = await res.json()
    setVideos(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load()
  }, [load])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.id || !form.title) return
    setSaving(true)

    const isEdit = editIndex !== null
    const res = await fetch('/api/admin/videos', {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(isEdit ? { ...form, index: editIndex } : form),
    })

    if (res.ok) {
      setForm({ id: '', title: '' })
      setEditIndex(null)
      setStatus(isEdit ? 'Video diperbarui!' : 'Video ditambahkan!')
      setVideos(await res.json())
    } else {
      setStatus('Gagal menyimpan.')
    }
    setSaving(false)
  }

  async function handleDelete(index: number) {
    const res = await fetch('/api/admin/videos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ index }),
    })
    if (res.ok) {
      setVideos(await res.json())
      setStatus('Video dihapus!')
    }
  }

  function startEdit(index: number) {
    setEditIndex(index)
    setForm(videos[index])
    setStatus('')
  }

  function cancelEdit() {
    setEditIndex(null)
    setForm({ id: '', title: '' })
  }

  return (
    <div>
      <h2 className="mb-4 text-lg font-bold">Kelola Video Sorotan</h2>

      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-3">
        <input
          placeholder="Judul Video"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          className="rounded-md border px-3 py-2 text-sm"
        />
        <input
          placeholder="URL YouTube (misal: https://youtube.com/watch?v=...)"
          value={form.id}
          onChange={(e) => setForm((f) => ({ ...f, id: e.target.value }))}
          className="rounded-md border px-3 py-2 text-sm"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-semibold disabled:opacity-50"
          >
            {saving ? 'Menyimpan...' : editIndex !== null ? 'Update' : 'Tambah'}
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
      ) : videos.length === 0 ? (
        <p className="text-muted-foreground text-sm">Belum ada data.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {videos.map((v, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-md border p-3"
            >
              <div className="text-sm">
                <p className="font-medium">{v.title}</p>
                <p className="text-muted-foreground">{v.id}</p>
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
