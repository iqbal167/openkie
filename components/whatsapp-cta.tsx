'use client'

import { MessageCircle } from 'lucide-react'

import { useSourceParam } from '@/hooks/use-source-param'
import { WHATSAPP_MESSAGE_TEMPLATE, WHATSAPP_NUMBER } from '@/lib/constants'

export function WhatsAppCTA() {
  const source = useSourceParam()

  const message = source
    ? `${WHATSAPP_MESSAGE_TEMPLATE} (dari: ${source})`
    : WHATSAPP_MESSAGE_TEMPLATE

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Konsultasi via WhatsApp"
      className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  )
}
