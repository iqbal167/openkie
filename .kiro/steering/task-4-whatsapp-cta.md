# Task 4: WhatsApp CTA

## Objective

Implementasi tombol CTA floating yang mengarahkan ke WhatsApp Kader KB dengan pre-filled message.

## Requirements

- [ ] Buat `components/whatsapp-cta.tsx` (Client Component)
- [ ] Tombol floating sticky di bottom screen (fixed position)
- [ ] Deep link ke `https://wa.me/{nomor}?text={pesan}`
- [ ] Pre-filled message dinamis, include source parameter jika ada
- [ ] Contoh pesan: "Halo Kader KB, saya ingin konsultasi tentang MKJP. (dari: {source})"
- [ ] Nomor WhatsApp dan template pesan di `lib/constants.ts`
- [ ] Icon WhatsApp (gunakan Lucide atau SVG custom)
- [ ] Tracking: kirim event saat tombol diklik

## Acceptance Criteria

- Tombol selalu visible saat scroll (sticky bottom)
- Tombol tidak menutupi konten penting
- Deep link berfungsi di Android dan iOS
- Pre-filled message terisi dengan benar termasuk source
- Tombol memiliki kontras warna yang cukup (accessibility)

## Dependencies

- Task 1 (landing page structure)
- Task 5 (source parameter tracking — bisa paralel, CTA baca dari URL)

## Komponen yang Dibuat/Diubah

- `components/whatsapp-cta.tsx` (baru)
- `lib/constants.ts` (update — tambah WA number + message template)
