'use client'

import { useState } from 'react'

import type { VideoTestimonial } from '@/lib/types'
import { extractYouTubeId } from '@/lib/utils'

interface VideoSectionProps {
  videoTestimonials: VideoTestimonial[]
}

export function VideoSection({ videoTestimonials }: VideoSectionProps) {
  const [showAll, setShowAll] = useState(false)

  if (videoTestimonials.length === 0)
    return <p className="text-muted-foreground text-sm">Belum ada data.</p>

  const visible = showAll ? videoTestimonials : [videoTestimonials[0]]

  return (
    <>
      <div className="flex flex-col gap-6">
        {visible.map((video) => (
          <div key={video.id}>
            <p className="mb-3 text-base font-semibold">{video.title}</p>
            <div className="bg-muted relative aspect-[9/16] overflow-hidden rounded-lg md:aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${extractYouTubeId(video.videoId)}`}
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
          className="mt-4 w-full rounded-lg border border-gray-300 bg-white/70 py-3 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-white"
        >
          Lihat {videoTestimonials.length - 1} Video Lainnya
        </button>
      )}
    </>
  )
}
