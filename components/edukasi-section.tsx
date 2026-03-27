'use client'

import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { trackEvent } from '@/lib/analytics'
import type { EducationMaterial } from '@/lib/types'
import { extractYouTubeId } from '@/lib/utils'

interface EdukasiSectionProps {
  educationMaterials: EducationMaterial[]
  educationTitle?: string
}

export function EdukasiSection({
  educationMaterials,
  educationTitle,
}: EdukasiSectionProps) {
  const [selected, setSelected] = useState<EducationMaterial | null>(null)

  function open(metode: EducationMaterial) {
    trackEvent('edukasi_open', { metode: metode.name })
    setSelected(metode)
  }

  return (
    <section id="edukasi" className="scroll-mt-14 py-8">
      <h2 className="mb-4 text-xl font-bold">
        {educationTitle || 'Materi Edukasi'}
      </h2>
      <div className="flex flex-col gap-3">
        {educationMaterials.length === 0 ? (
          <p className="text-muted-foreground text-sm">Belum ada data.</p>
        ) : (
          educationMaterials.map((metode) => (
            <button
              key={metode.id}
              onClick={() => open(metode)}
              className="flex items-center justify-between rounded-xl border bg-white p-4 text-left shadow-sm transition-shadow hover:shadow-md"
            >
              <div>
                <p className="font-semibold">{metode.name}</p>
                <p className="text-muted-foreground mt-1 line-clamp-1 text-sm">
                  {metode.description}
                </p>
              </div>
              <span className="text-muted-foreground ml-3 text-lg">›</span>
            </button>
          ))
        )}
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-h-[85vh] max-w-[480px] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 text-sm leading-relaxed">
                <p className="whitespace-pre-line">{selected.description}</p>

                {selected.videoUrl && (
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <iframe
                      src={`https://www.youtube.com/embed/${extractYouTubeId(selected.videoUrl)}`}
                      title={selected.name}
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
