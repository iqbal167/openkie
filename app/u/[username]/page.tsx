import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { EdukasiSection } from '@/components/edukasi-section'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/hero-section'
import { QuizGate } from '@/components/quiz-gate'
import { VideoSection } from '@/components/video-section'
import { WhatsAppCTA, WhatsAppInlineCTA } from '@/components/whatsapp-cta'
import {
  getEducationMaterials,
  getHighlights,
  getSettings,
  getUserByUsername,
} from '@/lib/data'

export const dynamic = 'force-dynamic'

export default async function UserLandingPage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  const user = await getUserByUsername(username)
  if (!user) notFound()

  const [settings, highlights, educationMaterials] = await Promise.all([
    getSettings(user.id),
    getHighlights(user.id),
    getEducationMaterials(user.id),
  ])

  const waProps = {
    whatsappNumber: settings.whatsappNumber,
    whatsappMessageTemplate: settings.whatsappMessageTemplate,
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-[480px] flex-col px-4">
      <main className="flex-1">
        <HeroSection
          siteName={settings.siteName}
          siteDescription={settings.siteDescription}
        />

        <section className="py-6">
          <h2 className="mb-4 text-xl font-bold">
            {settings.highlightTitle || 'Sorotan'}
          </h2>
          <VideoSection videoTestimonials={highlights} />
        </section>

        {settings.quizEnabled ? (
          <QuizGate
            educationTitle={settings.educationTitle}
            username={username}
          >
            <EdukasiSection
              educationMaterials={educationMaterials}
              educationTitle={settings.educationTitle}
            />
          </QuizGate>
        ) : (
          <EdukasiSection
            educationMaterials={educationMaterials}
            educationTitle={settings.educationTitle}
          />
        )}

        <Suspense>
          <WhatsAppInlineCTA {...waProps} />
        </Suspense>
      </main>
      <Footer footerText={settings.footerText} />
      <Suspense>
        <WhatsAppCTA {...waProps} />
      </Suspense>
    </div>
  )
}
