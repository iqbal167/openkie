# Task 17: Loading Skeleton — Better UX saat fetch data

## Deskripsi

Tambahkan loading skeleton di semua halaman yang fetch data, baik publik maupun admin.

## Perubahan

### 1. Buat `components/skeleton.tsx` — reusable skeleton primitives

- `SkeletonLine` — single line placeholder (height + width configurable)
- `SkeletonCard` — card-shaped placeholder
- `SkeletonVideo` — aspect-ratio video placeholder

### 2. Landing page (publik)

- `components/video-section.tsx` — skeleton saat belum render (sudah server component, tapi iframe loading="lazy" bisa pakai skeleton placeholder)
- `components/quiz-gate.tsx` — skeleton saat checkStatus loading
- `components/quiz-form.tsx` — skeleton saat fetch questions
- `components/edukasi-section.tsx` — tidak perlu (data dari props server)

### 3. Admin pages

- `app/admin/settings/page.tsx` — skeleton form saat loadSettings
- `app/admin/videos/page.tsx` — skeleton list saat load
- `app/admin/edukasi/page.tsx` — skeleton list saat load
- `app/admin/quiz/page.tsx` — skeleton list saat load
- `app/admin/participants/page.tsx` — skeleton table saat load
- `app/admin/media-edukasi/page.tsx` — skeleton list saat load

### 4. Validasi

- `npm run validate && npm run build`
