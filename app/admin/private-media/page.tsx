'use client'

import { useCallback, useEffect, useState } from 'react'

import { ConfirmDelete } from '@/components/confirm-delete'
import { SkeletonList } from '@/components/skeleton'
import type { EducationMedia } from '@/lib/types'
import { extractYouTubeId } from '@/lib/utils'

export default function EducationMediaPage() {
  const [items, setItems] = useState<EducationMedia[]>([])
  const [title, setTitle] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch(`/api/admin/private-media?t=${Date.now()}`)
    setItems(await res.json())
    setLoading(false)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load()
  }, [load])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title || !videoUrl) {
      setStatus('Title dan URL wajib diisi.')
      return
    }
    const isEdit = editIndex !== null
    setSaving(true)
    const res = await fetch('/api/admin/private-media', {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        isEdit ? { index: editIndex, title, videoUrl } : { title, videoUrl }
      ),
    })
    if (res.ok) {
      setTitle('')
      setVideoUrl('')
      setEditIndex(null)
      setStatus(isEdit ? 'Video diperbarui!' : 'Video ditambahkan!')
      setItems(await res.json())
    } else {
      setStatus('Gagal menyimpan.')
    }
    setSaving(false)
  }

  async function handleDelete(index: number) {
    const res = await fetch('/api/admin/private-media', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ index }),
    })
    if (res.ok) {
      setItems(await res.json())
      setStatus('Video dihapus!')
    }
  }

  function startEdit(index: number) {
    setEditIndex(index)
    setTitle(items[index].title)
    setVideoUrl(items[index].videoUrl)
    setStatus('')
  }

  function cancelEdit() {
    setEditIndex(null)
    setTitle('')
    setVideoUrl('')
  }

  return (
    <div>
      <h2 className="mb-4 text-lg font-bold">Media Edukasi (Private)</h2>
      <p className="text-muted-foreground mb-4 text-sm">
        Video ini hanya dapat dilihat oleh admin.
      </p>

      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-3">
        <input
          placeholder="Judul Video"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-md border px-3 py-2 text-sm"
        />
        <input
          placeholder="URL YouTube (misal: https://youtube.com/watch?v=...)"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="rounded-md border px-3 py-2 text-sm"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-semibold disabled:opacity-50"
          >
            {saving
              ? 'Menyimpan...'
              : editIndex !== null
                ? 'Update Video'
                : 'Tambah Video'}
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
        {status && (
          <p
            className={`text-sm ${status.includes('Gagal') || status.includes('wajib') ? 'text-red-500' : 'text-green-600'}`}
          >
            {status}
          </p>
        )}
      </form>

      {loading ? (
        <SkeletonList />
      ) : items.length === 0 ? (
        <p className="text-muted-foreground text-sm">Belum ada data.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((item, i) => (
            <div key={i} className="rounded-lg border p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-medium">{item.title}</p>
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
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <iframe
                  src={`https://www.youtube.com/embed/${extractYouTubeId(item.videoUrl)}`}
                  title={item.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
