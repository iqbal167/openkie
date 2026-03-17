# Task 7: Auth — Login Admin dengan ENV Credentials

## Objective

Implementasi autentikasi admin sederhana menggunakan credentials dari environment variables. Gunakan NextAuth.js (Auth.js) dengan Credentials provider.

## Requirements

- [ ] Install `next-auth` (v5 / Auth.js)
- [ ] Tambah env variables: `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `AUTH_SECRET`
- [ ] Buat `.env.local` dengan placeholder values
- [ ] Buat `lib/auth.ts` — konfigurasi NextAuth dengan CredentialsProvider, validasi terhadap env vars
- [ ] Buat `app/admin/login/page.tsx` — halaman login sederhana (form username + password)
- [ ] Buat `middleware.ts` — proteksi route `/admin/*` (kecuali `/admin/login`) agar hanya bisa diakses setelah login
- [ ] Tambah API route auth handler `app/api/auth/[...nextauth]/route.ts`

## Acceptance Criteria

- Login berhasil dengan credentials dari env → redirect ke `/admin`
- Login gagal → tampilkan error message
- Akses `/admin` tanpa login → redirect ke `/admin/login`
- Akses `/admin/login` saat sudah login → redirect ke `/admin`
- Tidak ada PII/password yang tersimpan di client
- Username menggunakan format nomor WA admin (misal: 6281234567890)

## Environment Variables

```
ADMIN_USERNAME=6281234567890
ADMIN_PASSWORD=changeme123
AUTH_SECRET=random-secret-min-32-chars
```

## Komponen yang Dibuat/Diubah

- `lib/auth.ts` (baru)
- `app/admin/login/page.tsx` (baru)
- `app/api/auth/[...nextauth]/route.ts` (baru)
- `middleware.ts` (baru)
- `.env.local` (baru)

## Dependencies

- Tidak ada dependency ke task lain
