'use client'

import { useSearchParams } from 'next/navigation'

export function useSourceParam() {
  const searchParams = useSearchParams()
  return searchParams.get('source')
}
