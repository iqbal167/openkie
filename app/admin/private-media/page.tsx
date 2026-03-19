'use client'

import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { ConfirmDelete } from '@/components/confirm-delete'
import { SkeletonList } from '@/components/skeleton'
import type { EducationMedia } from '@/lib/types'
import { extractYouTubeId } from '@/lib/utils'

export default function EducationMediaPage() {
  const [items, setItems] = useState<EducationMedia[]>([])
  const [title, setTitle] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [editId, setEditId] = useState<number | null>(null)
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
      toast.error('Title dan URL wajib diisi.')
      return
    }
    const isEdit = editId !== null
    setSaving(true)
    const res = await fetch('/api/admin/private-media', {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        isEdit ? { id: editId, title, videoUrl } : { title, videoUrl }
      ),
    })
    if (res.ok) {
      setTitle('')
      setVideoUrl('')
      setEditId(null)
      toast.success(isEdit ? 'Video diperbarui!' : 'Video ditambahkan!')
      setItems(await res.json())
    } else {
      toast.error('Gagal menyimpan.')
    }
    setSaving(false)
  }

  async function handleDelete(id: number) {
    const res = await fetch('/api/admin/private-media', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    if (res.ok) {
      setItems(await res.json())
      toast.success('Video dihapus!')
    }
  }

  function startEdit(item: EducationMedia) {
    setEditId(item.id)
    setTitle(item.title)
    setVideoUrl(item.videoUrl)
  }

  function cancelEdit() {
    setEditId(null)
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
              : editId !== null
                ? 'Update Video'
                : 'Tambah Video'}
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
      </form>

      {loading ? (
        <SkeletonList />
      ) : items.length === 0 ? (
        <p className="text-muted-foreground text-sm">Belum ada data.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.id} className="rounded-lg border p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-medium">{item.title}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(item)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <ConfirmDelete
                    onConfirm={async () => {
                      await handleDelete(item.id)
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
