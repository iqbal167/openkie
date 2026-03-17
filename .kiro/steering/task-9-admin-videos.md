# Task 9: Admin Dashboard — Kelola Video Testimoni

## Objective

Buat halaman admin untuk menambah, mengubah, dan menghapus video testimoni.

## Requirements

- [ ] Buat `app/admin/videos/page.tsx` — daftar video testimoni dengan tombol tambah, edit, hapus
- [ ] Form tambah/edit video: input YouTube Video ID + judul
- [ ] Buat `app/api/admin/videos/route.ts` — API endpoint GET (list), POST (tambah), PUT (update), DELETE (hapus)
- [ ] API menulis ke `data/settings.json` (update array `videoTestimonials`)
- [ ] Proteksi API route (cek session)
- [ ] Validasi: YouTube ID tidak boleh kosong, judul tidak boleh kosong

## Acceptance Criteria

- Admin bisa melihat daftar video yang ada
- Admin bisa menambah video baru
- Admin bisa mengubah video ID atau judul
- Admin bisa menghapus video
- Perubahan langsung terlihat di landing page
- API terproteksi

## Komponen yang Dibuat/Diubah

- `app/admin/videos/page.tsx` (baru)
- `app/api/admin/videos/route.ts` (baru)

## Dependencies

- Task 6 (data layer)
- Task 7 (auth)
- Task 8 (admin layout)
