import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/hero-section'

export default function Home() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[480px] flex-col px-4">
      <main className="flex-1">
        <HeroSection />
        {/* VideoSection — Task 2 */}
        {/* EdukasiAccordion — Task 3 */}
      </main>
      <Footer />
      {/* WhatsAppCTA — Task 4 */}
    </div>
  )
}
