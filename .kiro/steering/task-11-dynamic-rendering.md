# Task 11: Dynamic Rendering — Landing Page Baca Data Terbaru

## Objective

Ubah landing page dari static (SSG) ke dynamic agar selalu menampilkan data terbaru setelah admin mengubah konten.

## Requirements

- [ ] Tambah `export const dynamic = 'force-dynamic'` di `app/page.tsx` agar halaman di-render per request (bukan cached saat build)
- [ ] Pastikan `getSettings()` di `lib/data.ts` membaca file JSON fresh setiap request (no caching)
- [ ] Alternatif: gunakan `revalidatePath('/')` di API admin setelah save, agar bisa tetap pakai ISR (Incremental Static Regeneration) — lebih performa

## Acceptance Criteria

- Admin mengubah konten → landing page langsung menampilkan perubahan tanpa rebuild
- Performa tetap acceptable (< 2 detik load time)
- Tidak ada stale data yang ditampilkan ke user

## Komponen yang Dibuat/Diubah

- `app/page.tsx` (update — tambah dynamic config atau revalidate)
- `app/api/admin/settings/route.ts` (update — revalidatePath jika pakai ISR)

## Dependencies

- Task 6 (data layer)
- Task 8 (admin settings API)
