# Task 6: Data Layer & JSON Storage

## Objective

Buat abstraksi data layer yang membaca konten dari JSON file (bukan hardcoded di constants.ts). Desain agar compatible untuk migrasi ke database di masa depan.

## Requirements

- [ ] Buat `lib/types.ts` — pindahkan semua interface (VideoTestimonial, MetodeMKJP) + tambah `SiteSettings` type yang mencakup semua konten yang bisa diubah admin
- [ ] Buat `data/settings.json` — file JSON berisi semua konten: siteName, siteDescription, whatsappNumber, whatsappMessageTemplate, videoTestimonials[], metodeMKJP[]
- [ ] Buat `lib/data.ts` — repository pattern: `getSettings()` yang baca dari JSON file. Fungsi ini jadi satu-satunya sumber data. Nanti tinggal ganti implementasi ke DB.
- [ ] Update `lib/constants.ts` — hapus semua data konten, hanya sisakan yang benar-benar konstanta (bukan konten editable)
- [ ] Update semua komponen (hero, video, accordion, whatsapp-cta, footer) agar menerima data via props, bukan import langsung dari constants
- [ ] Update `app/page.tsx` — panggil `getSettings()` di server component, pass data ke child components via props

## Acceptance Criteria

- Semua konten dibaca dari `data/settings.json`
- Tidak ada konten hardcoded di komponen
- Komponen menerima data via props (decoupled dari data source)
- `getSettings()` bisa diganti implementasinya ke DB tanpa ubah komponen
- Build tetap static (SSG) — JSON dibaca saat build time

## Type Definition

```typescript
interface SiteSettings {
  siteName: string
  siteDescription: string
  whatsappNumber: string
  whatsappMessageTemplate: string
  videoTestimonials: VideoTestimonial[]
  metodeMKJP: MetodeMKJP[]
}
```

## Komponen yang Dibuat/Diubah

- `lib/types.ts` (baru)
- `data/settings.json` (baru)
- `lib/data.ts` (baru)
- `lib/constants.ts` (simplify)
- `components/hero-section.tsx` (update — props)
- `components/video-section.tsx` (update — props)
- `components/edukasi-accordion.tsx` (update — props)
- `components/whatsapp-cta.tsx` (update — props)
- `app/page.tsx` (update — fetch data, pass props)
