# Task 16: Admin — Kelola Soal Quiz

## Deskripsi

Halaman admin untuk CRUD soal pre-test dan post-test.

## Perubahan

### `app/admin/quiz/page.tsx`

- Tab/toggle: Pre-Test | Post-Test
- List soal dengan tombol edit/hapus
- Form tambah/edit: soal (textarea), 4 pilihan (input), jawaban benar (radio/select)
- Fetch dari `GET /api/admin/quiz?type=preTest|postTest`

### `app/admin/participants/page.tsx`

- Tabel peserta: nama, nomor WA, skor pre-test, skor post-test, tanggal
- Fetch dari `GET /api/admin/participants`

### Update `app/admin/layout.tsx`

- Tambah nav link: "Quiz" → `/admin/quiz`, "Peserta" → `/admin/participants`

## Validasi

- `npm run validate && npm run build`
