'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { trackEvent } from '@/lib/analytics'
import { METODE_MKJP } from '@/lib/constants'

export function EdukasiAccordion() {
  return (
    <section className="py-8">
      <h2 className="mb-4 text-xl font-bold">Kenali Metode MKJP</h2>
      <Accordion
        type="single"
        collapsible
        onValueChange={(value) => {
          if (value) trackEvent('accordion_open', { metode: value })
        }}
      >
        {METODE_MKJP.map((metode, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left text-base font-semibold">
              {metode.nama}
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-sm leading-relaxed">
              <p>{metode.deskripsi}</p>

              <div>
                <p className="font-semibold">Kelebihan:</p>
                <ul className="list-inside list-disc">
                  {metode.kelebihan.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-semibold">Efek Samping:</p>
                <ul className="list-inside list-disc">
                  {metode.efekSamping.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-muted rounded-md p-3">
                <p className="font-semibold">
                  ❌ Mitos: {metode.mitosVsFakta.mitos}
                </p>
                <p className="mt-1">✅ Fakta: {metode.mitosVsFakta.fakta}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
