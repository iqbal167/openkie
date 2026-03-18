# OpenKIE

Platform KIE (Komunikasi, Informasi, Edukasi) digital open-source yang bisa di-deploy sendiri (self-hosted). Aplikasi mobile-first untuk media belajar dan sharing materi edukasi, dilengkapi sistem pre-test/post-test dan dashboard admin.

![Landing Page](docs/screenshot-landing.png)

## Fitur

- 📱 Landing page mobile-first dengan QR code
- 🎬 Video sorotan (highlight) dengan YouTube embed
- 📚 Materi edukasi dengan modal detail
- ✅ Sistem quiz pre-test & post-test
- ⚙️ Dashboard admin untuk kelola semua konten
- 🔐 First-run setup — buat akun admin saat pertama deploy
- ✏️ Semua teks dan judul bisa dikustomisasi dari admin

## Tech Stack

- [Next.js](https://nextjs.org) (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) (storage)
- NextAuth v5 (autentikasi)

---

## Deploy ke Vercel (One-Click)

Cara paling mudah — klik tombol di bawah:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/iqbal167/openkie&env=AUTH_SECRET&envDescription=Secret%20untuk%20enkripsi%20session.%20Generate%20di%20link%20berikut.&envLink=https://secretkeygen.vercel.app/&stores=[{"type":"blob"}])

### Langkah-langkah:

1. Buat akun [GitHub](https://github.com/signup) jika belum punya (gratis)
2. Buat akun [Vercel](https://vercel.com/signup) — bisa langsung pakai akun GitHub
3. Klik tombol **Deploy with Vercel** di atas
4. Login ke akun Vercel

   ![Vercel Login](docs/deploy-01-login.png)

5. Vercel akan otomatis clone repo ke akun kamu
6. Isi `AUTH_SECRET` — klik link [secretkeygen.vercel.app](https://secretkeygen.vercel.app/) yang tersedia, copy hasilnya, paste

   ![Set Environment Variable](docs/deploy-02-env.png)

7. Blob store otomatis dibuat oleh Vercel — env var `BLOB_READ_WRITE_TOKEN` langsung terisi tanpa perlu setup manual
8. Klik **Deploy** dan tunggu sampai selesai

   ![Deploy Success](docs/deploy-03-success.png)

9. Buka URL project → akses `/admin` → akan redirect ke halaman **Setup Admin**
10. Buat username dan password (min. 6 karakter)

    ![Setup Admin](docs/deploy-04-setup.png)

11. Login dengan credentials yang dibuat — selesai! 🎉

    ![Admin Dashboard](docs/deploy-05-dashboard.png)

---

## Deploy Manual (via GitHub)

Jika ingin fork repo terlebih dahulu:

### 1. Fork & Clone

```bash
git clone https://github.com/<username>/<repo>.git
cd <repo>
```

### 2. Buat Project di Vercel

1. Buka [vercel.com/new](https://vercel.com/new)
2. Import repo GitHub yang sudah di-fork
3. Framework Preset: **Next.js** (otomatis terdeteksi)

### 3. Buat Blob Store

1. Di dashboard Vercel, buka project → tab **Storage**
2. Klik **Create Database** → pilih **Blob**
3. Beri nama (misal: `kie-digital-blob`) → **Create**
4. Blob store otomatis terhubung ke project, env var `BLOB_READ_WRITE_TOKEN` otomatis ditambahkan

   ![Buat Blob Store](docs/manual-01-blob.png)

### 4. Set Environment Variable

Di Vercel dashboard → project → **Settings** → **Environment Variables**, tambahkan:

| Variable      | Nilai                      | Keterangan                                                                                      |
| ------------- | -------------------------- | ----------------------------------------------------------------------------------------------- |
| `AUTH_SECRET` | Random string 32+ karakter | Untuk enkripsi session. Generate di [secretkeygen.vercel.app](https://secretkeygen.vercel.app/) |

> `BLOB_READ_WRITE_TOKEN` sudah otomatis dari langkah 3.

![Set Env Var](docs/manual-02-env.png)

### 5. Deploy

Klik **Deploy**. Setelah selesai, buka URL project.

### 6. Setup Admin

1. Buka `https://<domain>/admin`
2. Akan redirect ke halaman **Setup Admin**
3. Buat username dan password (min. 6 karakter)
4. Setelah setup, login dengan credentials yang dibuat
5. Halaman setup tidak bisa diakses lagi setelah admin dibuat

---

## Development Lokal

### Prasyarat

- Node.js 18+
- npm

### Setup

```bash
# Install dependencies
npm install

# Copy env
cp .env.example .env.local
```

Edit `.env.local`:

```env
AUTH_SECRET=random-string-minimal-32-karakter
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxx  # dari Vercel Blob dashboard
```

> Untuk mendapatkan `BLOB_READ_WRITE_TOKEN`, buat Blob store di Vercel dashboard lalu copy token-nya.

### Jalankan

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

---

## Struktur Admin

![Admin Menu](docs/admin-menu.png)

| Menu     | Fungsi                                                 |
| -------- | ------------------------------------------------------ |
| Settings | Nama situs, deskripsi, WhatsApp, judul section, footer |
| Sorotan  | Kelola video sorotan (YouTube)                         |
| Edukasi  | Kelola materi edukasi                                  |
| Media    | Video edukasi (hanya admin)                            |
| Quiz     | Kelola soal pre-test & post-test                       |
| Peserta  | Lihat data peserta & skor quiz                         |

## Environment Variables

| Variable                | Wajib | Keterangan                    |
| ----------------------- | ----- | ----------------------------- |
| `BLOB_READ_WRITE_TOKEN` | ✅    | Token Vercel Blob             |
| `AUTH_SECRET`           | ✅    | Secret untuk NextAuth session |

## Lisensi

MIT
