import { Suspense } from 'react'

import { EdukasiAccordion } from '@/components/edukasi-accordion'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/hero-section'
import { VideoSection } from '@/components/video-section'
import { WhatsAppCTA } from '@/components/whatsapp-cta'

export default function Home() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[480px] flex-col px-4">
      <main className="flex-1">
        <HeroSection />
        <VideoSection />
        <EdukasiAccordion />
      </main>
      <Footer />
      <Suspense>
        <WhatsAppCTA />
      </Suspense>
    </div>
  )
}
