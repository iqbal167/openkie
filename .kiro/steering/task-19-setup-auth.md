# Task 19: First-Run Setup Auth — Self-Hosted Admin Registration

## Deskripsi

Ganti auth dari env-based credentials ke blob-based dengan first-run setup flow. User yang deploy bisa buat admin account pertama kali buka `/admin`, tanpa perlu set env credentials.

## Flow

1. User deploy, set hanya `BLOB_READ_WRITE_TOKEN` + `AUTH_SECRET`
2. Buka `/admin` → cek blob `admin.json` ada atau tidak
3. Jika belum ada → redirect ke `/admin/setup` (buat username + password)
4. Jika sudah ada → redirect ke `/admin/login` (login biasa)
5. Setup page hanya bisa diakses jika `admin.json` belum ada
6. Password di-hash pakai bcrypt sebelum disimpan

## Perubahan

### 1. Install bcryptjs

- `npm install bcryptjs @types/bcryptjs`

### 2. Buat data layer admin — `lib/data.ts`

- Blob key: `admin.json`
- Type: `AdminUser { username: string, passwordHash: string }`
- Functions: `getAdmin(): Promise<AdminUser | null>`, `saveAdmin(admin: AdminUser): Promise<void>`

### 3. Buat `/admin/setup/page.tsx`

- Form: username + password + confirm password
- POST ke `/api/admin/setup`
- Hanya bisa diakses jika admin belum ada
- Redirect ke `/admin/login` setelah setup

### 4. Buat `/api/admin/setup/route.ts`

- POST: cek admin belum ada, hash password, simpan ke blob
- Reject jika admin sudah ada (403)

### 5. Update `lib/auth.ts`

- Ganti CredentialsProvider: cek username + password vs blob `admin.json`
- Pakai `bcryptjs.compare()` untuk verify password
- Hapus dependency ke `ADMIN_EMAIL` / `ADMIN_PASSWORD` env vars

### 6. Update middleware

- Jika admin belum ada dan akses `/admin/*` (bukan `/admin/setup`) → redirect ke `/admin/setup`
- Jika admin sudah ada dan akses `/admin/setup` → redirect ke `/admin`

### 7. Hapus env vars `ADMIN_EMAIL` dan `ADMIN_PASSWORD`

- Hapus dari `.env.local` dan dokumentasi
- Minimal env: `BLOB_READ_WRITE_TOKEN` + `AUTH_SECRET`

### 8. Validasi

- `npm run validate && npm run build`
- Test: hapus admin.json blob → buka /admin → harus redirect ke setup
