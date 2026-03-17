'use client'

import { MessageCircle } from 'lucide-react'

import { useSourceParam } from '@/hooks/use-source-param'
import { trackEvent } from '@/lib/analytics'

interface WhatsAppProps {
  whatsappNumber: string
  whatsappMessageTemplate: string
}

function useWhatsAppLink({
  whatsappNumber,
  whatsappMessageTemplate,
}: WhatsAppProps) {
  const source = useSourceParam()
  const message = source
    ? `${whatsappMessageTemplate} (dari: ${source})`
    : whatsappMessageTemplate
  return {
    href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
    source,
  }
}

export function WhatsAppCTA(props: WhatsAppProps) {
  const { href, source } = useWhatsAppLink(props)

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Konsultasi via WhatsApp"
      onClick={() => trackEvent('whatsapp_click', { source: source ?? '' })}
      className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  )
}

export function WhatsAppInlineCTA(props: WhatsAppProps) {
  const { href, source } = useWhatsAppLink(props)

  return (
    <section className="py-8 text-center">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackEvent('whatsapp_click_inline', { source: source ?? '' })
        }
        className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-base font-semibold text-white shadow-md transition-transform hover:scale-105"
      >
        <MessageCircle className="h-5 w-5" />
        Konsultasi Sekarang
      </a>
    </section>
  )
}
