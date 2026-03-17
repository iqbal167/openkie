# Product: KIE MKJP Digital Kelurahan Karang Timur

## Ringkasan

Landing page edukatif berbasis QR Code untuk mendigitalisasi KIE (Komunikasi, Informasi, Edukasi) tentang MKJP (Metode Kontrasepsi Jangka Panjang) di Kelurahan Karang Timur, Kota Tangerang. Warga memindai QR Code di Posyandu/Puskesmas/Balai Warga → langsung akses halaman mobile tanpa login/download.

## Target Pengguna

1. **Pasangan Usia Subur (PUS):** Wanita 20-40 tahun, smartphone entry-to-mid level, koneksi 3G/4G. Butuh info langsung ke inti, minim jargon medis.
2. **Kader KB / Tenaga Kesehatan:** Butuh alat bantu visual interaktif untuk penyuluhan di lapangan.

## Objectives

- Menyediakan akses informasi MKJP yang valid, cepat, dan mudah dipahami
- Menurunkan miskonsepsi/mitos MKJP (IUD, Implan, MOW, MOP) via video testimoni warga lokal
- Meningkatkan konversi konsultasi via WhatsApp dengan Kader KB

## Success Metrics (KPIs)

| Metric                           | Target                                 |
| -------------------------------- | -------------------------------------- |
| Session Duration                 | > 1.5 menit rata-rata                  |
| Video Completion Rate            | > 50%                                  |
| CTR tombol "Konsultasi WhatsApp" | > 15% dari unique visitors             |
| Lighthouse Score (Mobile)        | > 90 (Performance, Accessibility, SEO) |

## Scope MVP (v1)

### In Scope

- Mobile-optimized landing page (mobile-first, 360x800px referensi)
- Video player section (embed YouTube Unlisted, format vertikal)
- Konten edukasi accordion (IUD, Implan, MOW, MOP)
- Smart CTA WhatsApp (deep link wa.me + pre-filled message)
- QR source tracking via URL parameter (`?source=posyandu_rw04`)
- Analytics dasar (page views, button clicks)

### Out of Scope

- Sistem login/register
- Dashboard admin (pakai GA4/Vercel Analytics)
- Live chat (dialihkan ke WhatsApp)
