import { Suspense } from 'react'

import { EdukasiSection } from '@/components/edukasi-section'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/hero-section'
import { QuizGate } from '@/components/quiz-gate'
import { VideoSection } from '@/components/video-section'
import { WhatsAppCTA, WhatsAppInlineCTA } from '@/components/whatsapp-cta'
import { getEducationMaterials, getHighlights, getSettings } from '@/lib/data'

export const revalidate = 0

export default async function Home() {
  const [settings, highlights, educationMaterials] = await Promise.all([
    getSettings(),
    getHighlights(),
    getEducationMaterials(),
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

        {/* Sorotan (Featured) */}
        <section className="py-6">
          <h2 className="mb-4 text-xl font-bold">
            {settings.highlightTitle || 'Sorotan'}
          </h2>
          <VideoSection videoTestimonials={highlights} />
        </section>

        {/* Edukasi */}
        {settings.quizEnabled ? (
          <QuizGate educationTitle={settings.educationTitle}>
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
