'use client'

import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { ConfirmDelete } from '@/components/confirm-delete'
import { SkeletonList } from '@/components/skeleton'
import type { Question } from '@/lib/types'

type QuizType = 'preTest' | 'postTest'

const emptyForm = { question: '', options: ['', '', '', ''], correctAnswer: 0 }

export default function QuizPage() {
  const [type, setType] = useState<QuizType>('preTest')
  const [items, setItems] = useState<Question[]>([])
  const [form, setForm] = useState({ ...emptyForm })
  const [editId, setEditId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch(`/api/admin/quiz?type=${type}&t=${Date.now()}`)
    setItems(await res.json())
    setLoading(false)
  }, [type])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load()
  }, [load])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.question || form.options.some((p) => !p)) {
      toast.error('Soal dan semua pilihan wajib diisi.')
      return
    }

    const isEdit = editId !== null
    setSaving(true)
    const res = await fetch('/api/admin/quiz', {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        isEdit ? { type, id: editId, question: form } : { type, question: form }
      ),
    })

    if (res.ok) {
      setForm({ ...emptyForm })
      setEditId(null)
      toast.success(isEdit ? 'Soal diperbarui!' : 'Soal ditambahkan!')
      setItems(await res.json())
    } else {
      toast.error('Gagal menyimpan.')
    }
    setSaving(false)
  }

  async function handleDelete(id: string) {
    const res = await fetch('/api/admin/quiz', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, id }),
    })
    if (res.ok) {
      setItems(await res.json())
      toast.success('Soal dihapus!')
    }
  }

  function startEdit(q: Question) {
    setForm({
      question: q.question,
      options: [...q.options],
      correctAnswer: q.correctAnswer,
    })
    setEditId(q.id)
  }

  function cancelEdit() {
    setEditId(null)
    setForm({ ...emptyForm })
  }

  const label = type === 'preTest' ? 'Pre-Test' : 'Post-Test'

  return (
    <div>
      <h2 className="mb-4 text-lg font-bold">Kelola Soal Quiz</h2>

      <div className="mb-4 flex gap-2">
        {(['preTest', 'postTest'] as QuizType[]).map((t) => (
          <button
            key={t}
            onClick={() => {
              setType(t)
              setEditId(null)
              setForm({ ...emptyForm })
            }}
            className={`rounded-md px-4 py-2 text-sm font-medium ${type === t ? 'bg-primary text-primary-foreground' : 'border'}`}
          >
            {t === 'preTest' ? 'Pre-Test' : 'Post-Test'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-3">
        <textarea
          placeholder="Soal"
          value={form.question}
          onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
          rows={2}
          className="rounded-md border px-3 py-2 text-sm"
        />
        {form.options.map((p, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="radio"
              name="jawaban"
              checked={form.correctAnswer === i}
              onChange={() => setForm((f) => ({ ...f, correctAnswer: i }))}
              className="accent-primary"
            />
            <input
              placeholder={`Pilihan ${i + 1}`}
              value={p}
              onChange={(e) =>
                setForm((f) => {
                  const options = [...f.options]
                  options[i] = e.target.value
                  return { ...f, options }
                })
              }
              className="flex-1 rounded-md border px-3 py-2 text-sm"
            />
          </div>
        ))}
        <p className="text-muted-foreground text-xs">
          Pilih radio di samping pilihan yang benar.
        </p>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-semibold disabled:opacity-50"
          >
            {saving
              ? 'Menyimpan...'
              : `${editId !== null ? 'Update' : 'Tambah'} Soal ${label}`}
          </button>
          {editId !== null && (
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-md border px-4 py-2 text-sm"
            >
              Batal
            </button>
          )}
        </div>
      </form>

      <h3 className="mb-2 text-sm font-semibold">
        Daftar Soal {label} ({items.length})
      </h3>
      {loading ? (
        <SkeletonList />
      ) : items.length === 0 ? (
        <p className="text-muted-foreground text-sm">Belum ada data.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {items.map((q, i) => (
            <div
              key={q.id}
              className="flex items-start justify-between rounded-md border p-3"
            >
              <div className="flex-1 text-sm">
                <p className="font-medium">
                  {i + 1}. {q.question}
                </p>
                <div className="text-muted-foreground mt-1 space-y-0.5">
                  {q.options?.map((p, pi) => (
                    <p key={pi}>
                      {pi === q.correctAnswer ? '✅' : '○'} {p}
                    </p>
                  ))}
                </div>
              </div>
              <div className="ml-2 flex gap-2">
                <button
                  onClick={() => startEdit(q)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <ConfirmDelete
                  onConfirm={async () => {
                    await handleDelete(q.id)
                  }}
                >
                  <button className="text-sm text-red-600 hover:underline">
                    Hapus
                  </button>
                </ConfirmDelete>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
