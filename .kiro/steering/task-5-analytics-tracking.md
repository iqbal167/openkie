# Task 5: Analytics & QR Source Tracking

## Objective

Implementasi tracking analytics dan parsing URL parameter `?source=` untuk memetakan asal scan QR Code.

## Requirements

- [ ] Buat `hooks/use-source-param.ts` — hook untuk baca `?source=` dari URL via `useSearchParams()`
- [ ] Buat `lib/analytics.ts` — helper functions untuk tracking events
- [ ] Integrasikan Vercel Web Analytics atau GA4 di `app/layout.tsx`
- [ ] Track events: page_view (dengan source), video_play, accordion_open, whatsapp_click
- [ ] Source parameter di-pass ke WhatsApp pre-filled message

## Acceptance Criteria

- Parameter `?source=posyandu_rw04` terbaca dan tersimpan di analytics
- Setiap event tracking terkirim dengan source context
- Analytics tidak blocking render (async loading)
- Tidak ada PII yang di-track

## Dependencies

- Task 1 (layout untuk inject analytics script)

## Komponen yang Dibuat/Diubah

- `hooks/use-source-param.ts` (baru)
- `lib/analytics.ts` (baru)
- `app/layout.tsx` (update — tambah analytics script)
