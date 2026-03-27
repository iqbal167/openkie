import { Skeleton } from '@/components/skeleton'

export default function Loading() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-[480px] flex-col px-4 md:max-w-2xl md:px-8">
        {/* Navbar */}
        <div className="sticky top-0 z-10 -mx-4 border-b border-black/5 px-4 py-3 md:-mx-8 md:px-8">
          <Skeleton className="h-5 w-24 md:h-6" />
        </div>

        <div className="flex-1">
          {/* Hero: Banner with overlay logo + title */}
          <div className="relative -mx-4 h-48 md:-mx-8 md:h-64">
            <Skeleton className="h-full w-full" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <Skeleton className="h-20 w-20 rounded-full md:h-24 md:w-24" />
              <Skeleton className="h-6 w-40 md:h-7" />
            </div>
          </div>
          {/* Description */}
          <div className="-mx-4 mt-4 px-4 py-3 md:-mx-8 md:px-8">
            <Skeleton className="mx-auto h-4 w-full md:h-5" />
            <Skeleton className="mx-auto mt-2 h-4 w-2/3" />
          </div>

          {/* Sorotan */}
          <div className="py-6">
            <Skeleton className="mb-4 h-7 w-32" />
            <Skeleton className="aspect-[9/16] w-full rounded-lg md:aspect-video" />
          </div>

          {/* Edukasi */}
          <div className="py-8">
            <Skeleton className="mb-4 h-7 w-40" />
            <div className="flex flex-col gap-3">
              <Skeleton className="h-16 w-full rounded-lg" />
              <Skeleton className="h-16 w-full rounded-lg" />
              <Skeleton className="h-16 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
