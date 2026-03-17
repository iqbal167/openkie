# Task 10: Admin Dashboard — Kelola Konten Edukasi MKJP

## Objective

Buat halaman admin untuk menambah, mengubah, dan menghapus konten edukasi metode MKJP (accordion items).

## Requirements

- [ ] Buat `app/admin/edukasi/page.tsx` — daftar metode MKJP dengan tombol tambah, edit, hapus
- [ ] Form tambah/edit metode: nama, deskripsi, kelebihan (multi-input), efek samping (multi-input), mitos, fakta
- [ ] Buat `app/api/admin/edukasi/route.ts` — API endpoint GET, POST, PUT, DELETE
- [ ] API menulis ke `data/settings.json` (update array `metodeMKJP`)
- [ ] Proteksi API route (cek session)
- [ ] Validasi: nama dan deskripsi wajib diisi

## Acceptance Criteria

- Admin bisa melihat daftar metode MKJP
- Admin bisa menambah metode baru
- Admin bisa mengubah semua field (termasuk tambah/hapus item kelebihan dan efek samping)
- Admin bisa menghapus metode
- Perubahan langsung terlihat di landing page
- API terproteksi

## Komponen yang Dibuat/Diubah

- `app/admin/edukasi/page.tsx` (baru)
- `app/api/admin/edukasi/route.ts` (baru)

## Dependencies

- Task 6 (data layer)
- Task 7 (auth)
- Task 8 (admin layout)
