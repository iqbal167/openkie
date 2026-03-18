import { Skeleton } from '@/components/skeleton'

export default function Loading() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[480px] flex-col px-4">
      <div className="flex-1">
        {/* Hero */}
        <div className="flex flex-col items-center gap-4 py-10">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Sorotan */}
        <div className="py-6">
          <Skeleton className="mb-4 h-7 w-32" />
          <Skeleton className="aspect-[9/16] w-full rounded-lg" />
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
  )
}
