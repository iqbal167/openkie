import { Suspense } from 'react'

import { EdukasiSection } from '@/components/edukasi-section'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/hero-section'
import { QuizGate } from '@/components/quiz-gate'
import { VideoSection } from '@/components/video-section'
import { WhatsAppCTA, WhatsAppInlineCTA } from '@/components/whatsapp-cta'
import { getSettings } from '@/lib/data'

export const revalidate = 0

export default async function Home() {
  const settings = await getSettings()

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
        <VideoSection videoTestimonials={settings.videoTestimonials} />
        {settings.quizEnabled ? (
          <QuizGate>
            <EdukasiSection metodeMKJP={settings.metodeMKJP} />
          </QuizGate>
        ) : (
          <EdukasiSection metodeMKJP={settings.metodeMKJP} />
        )}
      </main>
      <Suspense>
        <WhatsAppInlineCTA {...waProps} />
      </Suspense>
      <Footer />
      <Suspense>
        <WhatsAppCTA {...waProps} />
      </Suspense>
    </div>
  )
}
