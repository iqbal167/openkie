# Task 18: Refactor — Generalisasi Aplikasi KIE

## Deskripsi

Refactor aplikasi agar menjadi platform KIE (Komunikasi, Informasi, Edukasi) yang general — bisa dipakai untuk topik apapun, bukan hanya MKJP. Kasus MKJP Kelurahan Karang Timur tetap bisa berjalan via konfigurasi admin (data default + settings).

Prinsip: **semua teks spesifik MKJP harus bisa diubah dari admin settings**, tidak hardcoded di code.

## Perubahan

### 1. Rename type `MetodeMKJP` → `MateriEdukasi`

File yang terdampak:

- `lib/types.ts` — rename interface
- `lib/data.ts` — rename di `defaultSettings.metodeMKJP` → `materiEdukasi`
- `app/page.tsx` — prop name
- `components/edukasi-section.tsx` — prop + import
- `app/api/admin/edukasi/route.ts` — field access
- `app/admin/edukasi/page.tsx` — type import

### 2. Rename field `SiteSettings.metodeMKJP` → `SiteSettings.materiEdukasi`

- `lib/types.ts`
- Semua file yang akses `settings.metodeMKJP`

### 3. Hapus hardcoded teks MKJP

- `components/quiz-gate.tsx` — "Kenali Metode MKJP" → ambil dari `siteName` atau buat field `edukasiTitle` di settings
- `components/edukasi-section.tsx` — "Kenali Metode MKJP" → sama
- `components/footer.tsx` — "Kelurahan Karang Timur, Kota Tangerang" → ambil dari settings atau hapus (footer sudah ada siteName?)
- `lib/data.ts` default values — tetap MKJP sebagai contoh default, tapi bisa diubah admin

### 4. Tambah field di `SiteSettings`

- `edukasiTitle?: string` — judul section edukasi (default: "Materi Edukasi")
- `footerText?: string` — teks footer (default: copyright + siteName)

### 5. Update admin settings page

- Tambah input `edukasiTitle` dan `footerText`

### 6. Validasi

- `npm run validate && npm run build`
- Pastikan landing page tetap tampil normal dengan data existing
