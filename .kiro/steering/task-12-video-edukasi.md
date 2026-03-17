# Task 12: Video Edukasi per Metode MKJP

## Deskripsi

Tambahkan field `videoUrl` (opsional) pada setiap metode MKJP. Jika diisi, video YouTube akan ditampilkan di dalam accordion edukasi pada landing page.

## Perubahan

### 1. Update type `MetodeMKJP` di `lib/types.ts`

- Tambah field `videoUrl?: string`

### 2. Update komponen `edukasi-accordion.tsx`

- Jika `metode.videoUrl` ada, tampilkan YouTube embed di dalam accordion content (setelah deskripsi, sebelum kelebihan)
- Gunakan `extractYouTubeId()` dari `lib/utils.ts` untuk extract ID dari full URL
- Aspect ratio 16:9, `loading="lazy"`

### 3. Update admin edukasi page `app/admin/edukasi/page.tsx`

- Tambah input field `videoUrl` (placeholder: "URL YouTube (opsional)")
- Update `emptyForm` dengan `videoUrl: ''`
- Kirim `videoUrl` ke API

### 4. Update API `app/api/admin/edukasi/route.ts`

- Terima `videoUrl` di POST dan PUT, default `''` jika tidak diisi

### 5. Validasi

- `npm run validate && npm run build`
