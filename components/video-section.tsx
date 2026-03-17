'use client'

import type { VideoTestimonial } from '@/lib/types'

interface VideoSectionProps {
  videoTestimonials: VideoTestimonial[]
}

export function VideoSection({ videoTestimonials }: VideoSectionProps) {
  return (
    <section className="py-8">
      <h2 className="mb-4 text-xl font-bold">Testimoni Warga</h2>
      <div className="flex flex-col gap-6">
        {videoTestimonials.map((video) => (
          <div key={video.id + video.title}>
            <p className="mb-2 text-sm font-medium">{video.title}</p>
            <div className="bg-muted relative aspect-[9/16] overflow-hidden rounded-lg">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
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
    </section>
  )
}
