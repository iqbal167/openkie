# Task 2: Video Player Section

## Objective

Implementasi section video testimoni warga dengan embed YouTube yang ringan dan mobile-friendly.

## Requirements

- [ ] Buat `components/video-section.tsx` (Client Component)
- [ ] Embed YouTube Unlisted video dengan aspect ratio vertikal (9:16)
- [ ] Gunakan lite-youtube-embed atau iframe lazy-load untuk performa
- [ ] Tambahkan judul section "Testimoni Warga" di atas video
- [ ] Video URLs disimpan di `lib/constants.ts`
- [ ] Tracking: kirim event saat video di-play

## Acceptance Criteria

- Video tidak auto-play (hemat bandwidth)
- Iframe lazy-loaded (tidak blocking initial render)
- Aspect ratio konsisten di berbagai ukuran layar mobile
- FCP tidak terpengaruh signifikan oleh video embed

## Dependencies

- Task 1 (landing page structure)

## Komponen yang Dibuat/Diubah

- `components/video-section.tsx` (baru)
- `lib/constants.ts` (baru/update)
