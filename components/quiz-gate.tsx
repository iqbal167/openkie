'use client'

import { useCallback, useEffect, useState } from 'react'

import { PhoneRegister } from '@/components/phone-register'
import { QuizForm } from '@/components/quiz-form'
import { Skeleton } from '@/components/skeleton'
import type { Participant } from '@/lib/types'

type Step = 'register' | 'preTest' | 'edukasi' | 'postTest' | 'done'

interface QuizGateProps {
  children: React.ReactNode
  educationTitle?: string
}

export function QuizGate({ children, educationTitle }: QuizGateProps) {
  const [step, setStep] = useState<Step>('register')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [preScore, setPreScore] = useState<string | null>(null)
  const [postScore, setPostScore] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const checkStatus = useCallback(async (p: string) => {
    try {
      const res = await fetch('/api/quiz/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: p, nama: '-' }),
      })
      const data = (await res.json()) as {
        registered: boolean
        participant: Participant
      }
      const pt = data.participant
      setName(pt.name)

      if (pt.preTest) setPreScore(`${pt.preTest.score}/${pt.preTest.total}`)
      if (pt.postTest) setPostScore(`${pt.postTest.score}/${pt.postTest.total}`)

      if (pt.postTest) setStep('done')
      else if (pt.preTest) setStep('edukasi')
      else setStep('preTest')
    } catch {
      setStep('register')
    }
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem('quiz_phone')
    if (saved) {
      setPhone(saved)
      void checkStatus(saved)
    }
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleRegistered(p: string, n: string) {
    setPhone(p)
    setName(n)
    setStep('preTest')
  }

  function switchAccount() {
    localStorage.removeItem('quiz_phone')
    setPhone('')
    setName('')
    setPreScore(null)
    setPostScore(null)
    setStep('register')
  }

  function handlePreComplete(score: number, total: number) {
    setPreScore(`${score}/${total}`)
    setStep('edukasi')
  }

  function handlePostComplete(score: number, total: number) {
    setPostScore(`${score}/${total}`)
    setStep('done')
  }

  if (loading)
    return (
      <section className="py-8">
        <Skeleton className="mb-4 h-7 w-48" />
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-2/3" />
        </div>
      </section>
    )

  const userBadge = step !== 'register' && (
    <div className="mb-4 flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
      <div className="text-sm">
        <p className="font-semibold">{name}</p>
        <p className="text-muted-foreground text-xs">{phone}</p>
      </div>
      <button
        onClick={switchAccount}
        className="text-xs text-blue-600 hover:underline"
      >
        Ganti Akun
      </button>
    </div>
  )

  return (
    <section className="py-8">
      <h2 className="mb-4 text-xl font-bold">
        {educationTitle || 'Materi Edukasi'}
      </h2>

      {step === 'register' && <PhoneRegister onRegistered={handleRegistered} />}

      {step === 'preTest' && (
        <>
          {userBadge}
          <QuizForm
            type="preTest"
            phone={phone}
            onComplete={handlePreComplete}
          />
        </>
      )}

      {step === 'edukasi' && (
        <div className="flex flex-col gap-6">
          {userBadge}
          {preScore && (
            <div className="rounded-lg bg-green-50 p-4 text-sm">
              <p className="font-semibold text-green-800">
                ✅ Pre-Test selesai — Skor: {preScore}
              </p>
              <p className="mt-1 text-green-700">
                Pelajari materi di bawah, lalu kerjakan Post-Test.
              </p>
            </div>
          )}
          {children}
          <button
            onClick={() => setStep('postTest')}
            className="bg-primary text-primary-foreground rounded-lg px-4 py-3 text-sm font-semibold"
          >
            Mulai Post-Test
          </button>
        </div>
      )}

      {step === 'postTest' && (
        <>
          {userBadge}
          <QuizForm
            type="postTest"
            phone={phone}
            onComplete={handlePostComplete}
          />
        </>
      )}

      {step === 'done' && (
        <div className="flex flex-col gap-4">
          {userBadge}
          <div className="rounded-lg bg-blue-50 p-4 text-sm">
            <p className="font-semibold text-blue-800">
              🎉 Anda sudah menyelesaikan Pre-Test & Post-Test!
            </p>
            <div className="mt-2 flex gap-4 text-blue-700">
              <span>Pre-Test: {preScore}</span>
              <span>Post-Test: {postScore}</span>
            </div>
          </div>
          {children}
        </div>
      )}
    </section>
  )
}
