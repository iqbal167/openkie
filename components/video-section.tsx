'use client'

import { useState } from 'react'

import type { VideoTestimonial } from '@/lib/types'
import { extractYouTubeId } from '@/lib/utils'

interface VideoSectionProps {
  videoTestimonials: VideoTestimonial[]
}

export function VideoSection({ videoTestimonials }: VideoSectionProps) {
  const [showAll, setShowAll] = useState(false)

  if (videoTestimonials.length === 0) return null

  const visible = showAll ? videoTestimonials : [videoTestimonials[0]]

  return (
    <section className="py-8">
      <h2 className="mb-4 text-xl font-bold">Testimoni Sang Jawara</h2>
      <div className="flex flex-col gap-6">
        {visible.map((video) => (
          <div key={video.id + video.title}>
            <p className="mb-2 text-sm font-medium">{video.title}</p>
            <div className="bg-muted relative aspect-[9/16] overflow-hidden rounded-lg">
              <iframe
                src={`https://www.youtube.com/embed/${extractYouTubeId(video.id)}`}
                title={video.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        ))}
      </div>
      {videoTestimonials.length > 1 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-4 w-full rounded-lg border py-3 text-sm font-medium transition-colors hover:bg-gray-50"
        >
          Lihat {videoTestimonials.length - 1} Testimoni Lainnya
        </button>
      )}
    </section>
  )
}
