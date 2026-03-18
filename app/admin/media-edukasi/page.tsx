'use client'

import { useCallback, useEffect, useState } from 'react'

import type { MediaEdukasi } from '@/lib/types'
import { extractYouTubeId } from '@/lib/utils'

export default function MediaEdukasiPage() {
  const [items, setItems] = useState<MediaEdukasi[]>([])
  const [title, setTitle] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [status, setStatus] = useState('')

  const load = useCallback(async () => {
    const res = await fetch('/api/admin/media-edukasi')
    setItems(await res.json())
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
    const res = await fetch('/api/admin/media-edukasi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, videoUrl }),
    })
    if (res.ok) {
      setTitle('')
      setVideoUrl('')
      setStatus('Video ditambahkan!')
      await load()
    } else {
      setStatus('Gagal menyimpan.')
    }
  }

  async function handleDelete(index: number) {
    const res = await fetch('/api/admin/media-edukasi', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ index }),
    })
    if (res.ok) {
      setStatus('Video dihapus!')
      await load()
    }
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
        <button
          type="submit"
          className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-semibold"
        >
          Tambah Video
        </button>
        {status && (
          <p
            className={`text-sm ${status.includes('Gagal') || status.includes('wajib') ? 'text-red-500' : 'text-green-600'}`}
          >
            {status}
          </p>
        )}
      </form>

      <div className="flex flex-col gap-4">
        {items.map((item, i) => (
          <div key={i} className="rounded-lg border p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium">{item.title}</p>
              <button
                onClick={() => handleDelete(i)}
                className="text-sm text-red-600 hover:underline"
              >
                Hapus
              </button>
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
    </div>
  )
}
