'use client'

import { useCallback, useEffect, useState } from 'react'

import type { Participant } from '@/lib/types'

export default function ParticipantsPage() {
  const [items, setItems] = useState<Participant[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    const res = await fetch('/api/admin/participants')
    setItems(await res.json())
    setLoading(false)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load()
  }, [load])

  if (loading)
    return <p className="text-muted-foreground text-sm">Memuat data...</p>

  return (
    <div>
      <h2 className="mb-4 text-lg font-bold">Data Peserta ({items.length})</h2>

      {items.length === 0 ? (
        <p className="text-muted-foreground text-sm">Belum ada peserta.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b text-xs font-semibold text-gray-500 uppercase">
                <th className="px-2 py-2">Nama</th>
                <th className="px-2 py-2">No. WA</th>
                <th className="px-2 py-2">Pre-Test</th>
                <th className="px-2 py-2">Post-Test</th>
                <th className="px-2 py-2">Terdaftar</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.phone} className="border-b">
                  <td className="px-2 py-2">{p.nama}</td>
                  <td className="px-2 py-2">{p.phone}</td>
                  <td className="px-2 py-2">
                    {p.preTest ? `${p.preTest.score}/${p.preTest.total}` : '-'}
                  </td>
                  <td className="px-2 py-2">
                    {p.postTest
                      ? `${p.postTest.score}/${p.postTest.total}`
                      : '-'}
                  </td>
                  <td className="px-2 py-2 text-xs text-gray-500">
                    {new Date(p.registeredAt).toLocaleDateString('id-ID')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
