'use client'

import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { trackEvent } from '@/lib/analytics'
import type { MetodeMKJP } from '@/lib/types'
import { extractYouTubeId } from '@/lib/utils'

interface EdukasiSectionProps {
  metodeMKJP: MetodeMKJP[]
}

export function EdukasiSection({ metodeMKJP }: EdukasiSectionProps) {
  const [selected, setSelected] = useState<MetodeMKJP | null>(null)

  function open(metode: MetodeMKJP) {
    trackEvent('edukasi_open', { metode: metode.nama })
    setSelected(metode)
  }

  return (
    <section className="py-8">
      <h2 className="mb-4 text-xl font-bold">Kenali Metode MKJP</h2>
      <div className="flex flex-col gap-3">
        {metodeMKJP.map((metode, i) => (
          <button
            key={i}
            onClick={() => open(metode)}
            className="flex items-center justify-between rounded-xl border bg-white p-4 text-left shadow-sm transition-shadow hover:shadow-md"
          >
            <div>
              <p className="font-semibold">{metode.nama}</p>
              <p className="text-muted-foreground mt-1 line-clamp-1 text-sm">
                {metode.deskripsi}
              </p>
            </div>
            <span className="text-muted-foreground ml-3 text-lg">›</span>
          </button>
        ))}
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-h-[85vh] max-w-[480px] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.nama}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 text-sm leading-relaxed">
                <p>{selected.deskripsi}</p>

                {selected.videoUrl && (
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <iframe
                      src={`https://www.youtube.com/embed/${extractYouTubeId(selected.videoUrl)}`}
                      title={selected.nama}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
