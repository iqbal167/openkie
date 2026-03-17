# Task 8: Admin Dashboard — Layout & Settings Page

## Objective

Buat halaman admin dashboard untuk mengubah pengaturan umum: nama situs, deskripsi, nomor WhatsApp, dan template pesan WhatsApp.

## Requirements

- [ ] Buat `app/admin/layout.tsx` — layout admin dengan sidebar/nav sederhana, logout button
- [ ] Buat `app/admin/page.tsx` — dashboard utama, redirect ke settings atau tampilkan overview
- [ ] Buat `app/admin/settings/page.tsx` — form edit: siteName, siteDescription, whatsappNumber, whatsappMessageTemplate
- [ ] Buat `app/api/admin/settings/route.ts` — API endpoint GET (baca settings) dan PUT (update settings)
- [ ] API PUT menulis ke `data/settings.json` (nanti bisa diganti ke DB)
- [ ] Proteksi API route — hanya bisa diakses oleh admin yang sudah login (cek session)
- [ ] Setelah save, tampilkan feedback sukses/error

## Acceptance Criteria

- Admin bisa melihat settings saat ini di form
- Admin bisa mengubah dan menyimpan settings
- Perubahan tersimpan di `data/settings.json`
- Landing page menampilkan data terbaru setelah settings diubah
- API endpoint terproteksi (401 jika tidak login)

## Komponen yang Dibuat/Diubah

- `app/admin/layout.tsx` (baru)
- `app/admin/page.tsx` (baru)
- `app/admin/settings/page.tsx` (baru)
- `app/api/admin/settings/route.ts` (baru)

## Dependencies

- Task 6 (data layer — `getSettings()` dan `data/settings.json`)
- Task 7 (auth — session check)
