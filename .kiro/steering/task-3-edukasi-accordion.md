# Task 3: Konten Edukasi Accordion

## Objective

Implementasi section edukasi 4 metode MKJP dalam format accordion yang hemat ruang layar.

## Requirements

- [ ] Install shadcn/ui Accordion component (`npx shadcn@latest add accordion`)
- [ ] Buat `components/edukasi-accordion.tsx` (Client Component)
- [ ] 4 item accordion: IUD, Implan, MOW, MOP
- [ ] Setiap item berisi: deskripsi singkat, kelebihan, efek samping, mitos vs fakta
- [ ] Konten edukasi disimpan di `lib/constants.ts` sebagai typed array
- [ ] Judul section "Kenali Metode MKJP" di atas accordion

## Acceptance Criteria

- Accordion bisa expand/collapse per item
- Hanya 1 item terbuka pada satu waktu (type="single")
- Teks mudah dibaca (font size min 14px, line-height 1.6)
- Konten menggunakan bahasa sederhana, minim jargon medis

## Dependencies

- Task 1 (landing page structure)
- shadcn/ui Accordion component

## Komponen yang Dibuat/Diubah

- `components/edukasi-accordion.tsx` (baru)
- `lib/constants.ts` (update — tambah data edukasi)
