'use client'

import { MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

import { useSourceParam } from '@/hooks/use-source-param'
import { trackEvent } from '@/lib/analytics'

interface WhatsAppProps {
  whatsappNumber: string
  whatsappMessageTemplate: string
  operatingHoursStart?: string
  operatingHoursEnd?: string
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

function useIsOpen(start?: string, end?: string) {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (!start || !end) return
    function check() {
      const now = new Date()
      const hhmm = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
      setOpen(hhmm >= start! && hhmm < end!)
    }
    check()
    const id = setInterval(check, 60_000)
    return () => clearInterval(id)
  }, [start, end])

  return open
}

function formatHour(t: string) {
  return t.replace(':', '.')
}

export function WhatsAppCTA(props: WhatsAppProps) {
  const { href, source } = useWhatsAppLink(props)
  const isOpen = useIsOpen(props.operatingHoursStart, props.operatingHoursEnd)

  if (!isOpen) return null

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
  const isOpen = useIsOpen(props.operatingHoursStart, props.operatingHoursEnd)

  const hasHours = !!(props.operatingHoursStart && props.operatingHoursEnd)
  const hoursText = hasHours
    ? `Jam operasional: ${formatHour(props.operatingHoursStart!)} – ${formatHour(props.operatingHoursEnd!)}`
    : null

  return (
    <section className="py-8 text-center">
      {isOpen ? (
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
      ) : (
        <div className="inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-gray-300 px-6 py-3 text-base font-semibold text-white">
          <MessageCircle className="h-5 w-5" />
          Di Luar Jam Operasional
        </div>
      )}
      {hoursText && (
        <p className="text-muted-foreground mt-2 text-sm font-semibold">
          {hoursText}
        </p>
      )}
    </section>
  )
}
