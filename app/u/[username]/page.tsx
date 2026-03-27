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
    operatingHoursStart: settings.operatingHoursStart ?? '',
    operatingHoursEnd: settings.operatingHoursEnd ?? '',
  }

  const bgStyle =
    settings.bgColorFrom && settings.bgColorTo
      ? `linear-gradient(to bottom, ${settings.bgColorFrom}, ${settings.bgColorTo})`
      : undefined

  return (
    <div className="min-h-screen" style={{ background: bgStyle }}>
      <div className="mx-auto flex min-h-screen max-w-[480px] flex-col px-4 shadow-sm ring-1 ring-black/5 md:max-w-2xl md:px-8">
        <nav className="sticky top-0 z-10 -mx-4 flex items-center justify-between border-b border-black/5 bg-white/80 px-4 py-3 backdrop-blur-md md:-mx-8 md:px-8">
          <p className="text-sm font-semibold md:text-base">
            {settings.siteName || 'OpenKIE'}
          </p>
          <div className="flex gap-4">
            <a
              href="#sorotan"
              className="text-muted-foreground text-xs hover:text-black md:text-sm"
            >
              Sorotan
            </a>
            <a
              href="#edukasi"
              className="text-muted-foreground text-xs hover:text-black md:text-sm"
            >
              Edukasi
            </a>
          </div>
        </nav>
        <main className="flex-1">
          <HeroSection
            siteName={settings.siteName}
            siteDescription={settings.siteDescription}
            logoUrl={settings.logoUrl}
            bannerUrl={settings.bannerUrl}
          />

          <section id="sorotan" className="scroll-mt-14 py-6">
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
    </div>
  )
}
