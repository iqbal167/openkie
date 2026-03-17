# Struktur Folder & Komponen

## Folder Structure

```
app/
├── layout.tsx              # Root layout (font, metadata, theme)
├── page.tsx                # Landing page utama (single page app)
├── globals.css             # Tailwind + CSS variables
├── favicon.ico
components/
├── ui/                     # shadcn/ui components (Button, Accordion, dll)
├── theme-provider.tsx      # next-themes provider
├── hero-section.tsx        # Header + tagline + ilustrasi
├── video-section.tsx       # Video player embed YouTube
├── edukasi-accordion.tsx   # Accordion IUD, Implan, MOW, MOP
├── whatsapp-cta.tsx        # Floating/sticky WhatsApp button
├── footer.tsx              # Footer sederhana (kredit, disclaimer)
lib/
├── utils.ts                # cn() helper (sudah ada)
├── constants.ts            # WhatsApp number, video URLs, konten edukasi
├── analytics.ts            # Helper tracking events
hooks/
├── use-source-param.ts     # Hook baca ?source= dari URL
public/
├── images/                 # Aset gambar .webp (logo, ilustrasi)
```

## Komponen Utama

| Komponen           | Tipe   | Deskripsi                                                   |
| ------------------ | ------ | ----------------------------------------------------------- |
| `HeroSection`      | Server | Header dengan judul, tagline, dan ilustrasi MKJP            |
| `VideoSection`     | Client | Embed YouTube player vertikal dengan tracking play/complete |
| `EdukasiAccordion` | Client | Accordion 4 metode MKJP (IUD, Implan, MOW, MOP)             |
| `WhatsAppCTA`      | Client | Tombol sticky/floating ke wa.me dengan pre-filled message   |
| `Footer`           | Server | Disclaimer kesehatan + kredit Kelurahan                     |

## Alur Halaman (Single Page)

```
[Hero Section] → judul, tagline, ilustrasi
      ↓
[Video Section] → video testimoni warga
      ↓
[Edukasi Accordion] → info 4 metode MKJP
      ↓
[Footer] → disclaimer + kredit
      ↓
[WhatsApp CTA] → floating button (selalu visible)
```
