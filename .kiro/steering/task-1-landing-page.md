# Task 1: Landing Page Mobile-First

## Objective

Setup halaman utama dengan layout mobile-first, metadata SEO, dan struktur komponen dasar.

## Requirements

- [ ] Update `app/layout.tsx`: ganti metadata (title, description, og tags) sesuai KIE MKJP
- [ ] Ganti `lang="en"` ke `lang="id"` di html tag
- [ ] Hapus ThemeProvider (tidak perlu dark mode, pakai light only)
- [ ] Update `app/page.tsx`: replace boilerplate dengan layout section-based
- [ ] Buat `components/hero-section.tsx` (Server Component): judul, tagline, ilustrasi
- [ ] Pastikan layout max-width 480px centered, padding horizontal 16px
- [ ] Tambahkan viewport meta yang sesuai untuk mobile

## Acceptance Criteria

- Halaman render dengan benar di 360px width
- Lighthouse Mobile Score > 90 (Performance, Accessibility, SEO)
- Metadata OG lengkap untuk sharing via WhatsApp
- Tidak ada horizontal scroll di mobile

## Dependencies

- Tidak ada (task pertama)

## Komponen yang Dibuat/Diubah

- `app/layout.tsx` (update)
- `app/page.tsx` (rewrite)
- `components/hero-section.tsx` (baru)
