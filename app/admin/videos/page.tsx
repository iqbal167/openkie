'use client'

import { useCallback, useEffect, useState } from 'react'

import { ConfirmDelete } from '@/components/confirm-delete'
import { SkeletonList } from '@/components/skeleton'
import type { VideoTestimonial } from '@/lib/types'

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoTestimonial[]>([])
  const [form, setForm] = useState({ videoId: '', title: '' })
  const [editId, setEditId] = useState<number | null>(null)
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch(`/api/admin/videos?t=${Date.now()}`)
    setVideos(await res.json())
    setLoading(false)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load()
  }, [load])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.videoId || !form.title) return
    setSaving(true)

    const isEdit = editId !== null
    const res = await fetch('/api/admin/videos', {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(isEdit ? { id: editId, ...form } : form),
    })

    if (res.ok) {
      setForm({ videoId: '', title: '' })
      setEditId(null)
      setStatus(isEdit ? 'Video diperbarui!' : 'Video ditambahkan!')
      setVideos(await res.json())
    } else {
      setStatus('Gagal menyimpan.')
    }
    setSaving(false)
  }

  async function handleDelete(id: number) {
    const res = await fetch('/api/admin/videos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    if (res.ok) {
      setVideos(await res.json())
      setStatus('Video dihapus!')
    }
  }

  function startEdit(v: VideoTestimonial) {
    setEditId(v.id)
    setForm({ videoId: v.videoId, title: v.title })
    setStatus('')
  }

  function cancelEdit() {
    setEditId(null)
    setForm({ videoId: '', title: '' })
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
          value={form.videoId}
          onChange={(e) => setForm((f) => ({ ...f, videoId: e.target.value }))}
          className="rounded-md border px-3 py-2 text-sm"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-semibold disabled:opacity-50"
          >
            {saving ? 'Menyimpan...' : editId !== null ? 'Update' : 'Tambah'}
          </button>
          {editId !== null && (
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
          {videos.map((v) => (
            <div
              key={v.id}
              className="flex items-center justify-between rounded-md border p-3"
            >
              <div className="text-sm">
                <p className="font-medium">{v.title}</p>
                <p className="text-muted-foreground">{v.videoId}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(v)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <ConfirmDelete
                  onConfirm={async () => {
                    await handleDelete(v.id)
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
