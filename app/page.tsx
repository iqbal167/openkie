import { Suspense } from 'react'

import { EdukasiAccordion } from '@/components/edukasi-accordion'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/hero-section'
import { VideoSection } from '@/components/video-section'
import { WhatsAppCTA, WhatsAppInlineCTA } from '@/components/whatsapp-cta'
import { getSettings } from '@/lib/data'

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
        <EdukasiAccordion metodeMKJP={settings.metodeMKJP} />
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
