'use client'

import { useCallback, useEffect, useState } from 'react'

import { Skeleton } from '@/components/skeleton'

interface QuizQuestion {
  id: string
  question: string
  options: string[]
}

interface QuizFormProps {
  type: 'preTest' | 'postTest'
  phone: string
  username: string
  onComplete: (score: number, total: number) => void
}

export function QuizForm({ type, phone, username, onComplete }: QuizFormProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    const res = await fetch(
      `/api/quiz/questions?type=${type}&username=${username}`
    )
    const data = await res.json()
    setQuestions(data)
    setLoading(false)
  }, [type, username])

  useEffect(() => {
    void load()
  }, [load])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (Object.keys(answers).length < questions.length) {
      setError('Jawab semua soal terlebih dahulu.')
      return
    }

    setSubmitting(true)
    setError('')
    const ordered = questions.map((_, i) => answers[i])
    try {
      const res = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, type, answers: ordered, username }),
      })
      const data = await res.json()
      if (res.ok) {
        onComplete(data.score, data.total)
      } else {
        setError(data.error || 'Gagal mengirim jawaban.')
      }
    } catch {
      setError('Terjadi kesalahan jaringan.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading)
    return (
      <div className="flex flex-col gap-6 py-4">
        <Skeleton className="h-6 w-32" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    )

  if (questions.length === 0)
    return (
      <p className="py-8 text-center text-sm text-gray-500">
        Belum ada soal {type === 'preTest' ? 'Pre-Test' : 'Post-Test'}.
      </p>
    )

  const label = type === 'preTest' ? 'Pre-Test' : 'Post-Test'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <h3 className="text-lg font-bold">{label}</h3>
      <p className="text-sm text-gray-600">
        Jawab {questions.length} soal berikut.
      </p>

      {questions.map((q, qi) => (
        <div key={q.id} className="flex flex-col gap-2">
          <p className="text-sm font-medium">
            {qi + 1}. {q.question}
          </p>
          {q.options.map((p, pi) => (
            <label
              key={pi}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-colors ${answers[qi] === pi ? 'border-primary bg-primary/5 font-medium' : ''}`}
            >
              <input
                type="radio"
                name={`q-${qi}`}
                checked={answers[qi] === pi}
                onChange={() => setAnswers((a) => ({ ...a, [qi]: pi }))}
                className="accent-primary"
              />
              {p}
            </label>
          ))}
        </div>
      ))}

      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="bg-primary text-primary-foreground rounded-lg px-4 py-3 text-sm font-semibold disabled:opacity-50"
      >
        {submitting ? 'Mengirim...' : `Kirim Jawaban ${label}`}
      </button>
    </form>
  )
}
