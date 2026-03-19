# OpenKIE

Platform KIE (Komunikasi, Informasi, Edukasi) digital open-source yang bisa di-deploy sendiri (self-hosted). Setiap user bisa daftar, login, dan punya landing page sendiri untuk sharing materi edukasi — dilengkapi sistem pre-test/post-test.

![Landing Page](docs/screenshot-landing.png)

## Fitur

- 📱 Landing page mobile-first per user (`/u/username`)
- 🎬 Video sorotan (highlight) dengan YouTube embed
- 📚 Materi edukasi dengan modal detail
- ✅ Sistem quiz pre-test & post-test
- ⚙️ Dashboard admin untuk kelola semua konten
- 🔐 Register & login — setiap user kelola data sendiri
- ✏️ Semua teks dan judul bisa dikustomisasi dari admin

## Tech Stack

- [Next.js](https://nextjs.org) (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- [Supabase](https://supabase.com) (PostgreSQL database)
- NextAuth v5 (autentikasi)

---

## Deploy ke Vercel (One-Click)

Cara paling mudah — klik tombol di bawah:

[![Deploy with Vercel](https://vercel.com/button)](<https://vercel.com/new/clone?repository-url=https://github.com/iqbal167/openkie&env=AUTH_SECRET&envDescription=Isi%20AUTH_SECRET%20(random%20string).%20SUPABASE%20env%20otomatis%20terisi%20jika%20pakai%20Vercel%20Supabase%20integration.&envLink=https://secretkeygen.vercel.app/>)

### Prasyarat

Sebelum klik Deploy, buat project Supabase dulu:

1. Buat akun [Supabase](https://supabase.com) (gratis)
2. Buat project baru → pilih region terdekat
3. Buka **SQL Editor** → jalankan isi file [`supabase/schema.sql`](supabase/schema.sql) untuk membuat tabel
4. Buka **Settings** → **API** → catat **Project URL** dan **anon public key**

### Langkah Deploy

1. Buat akun [GitHub](https://github.com/signup) jika belum punya (gratis)
2. Buat akun [Vercel](https://vercel.com/signup) — bisa langsung pakai akun GitHub
3. Klik tombol **Deploy with Vercel** di atas
4. Isi environment variables:

   | Variable            | Nilai                                                                                               |
   | ------------------- | --------------------------------------------------------------------------------------------------- |
   | `AUTH_SECRET`       | Random string 32+ karakter. Generate di [secretkeygen.vercel.app](https://secretkeygen.vercel.app/) |
   | `SUPABASE_URL`      | Project URL dari Supabase dashboard (Settings → API)                                                |
   | `SUPABASE_ANON_KEY` | anon public key dari Supabase dashboard (Settings → API)                                            |

5. Klik **Deploy** dan tunggu sampai selesai
6. Buka URL project → akan muncul halaman utama
7. Klik **Daftar** → buat username dan password (min. 6 karakter)
8. Login → kelola konten di dashboard admin
9. Landing page kamu ada di `https://<domain>/u/<username>` 🎉

---

## Deploy Manual (via GitHub)

### 1. Fork & Clone

```bash
git clone https://github.com/<username>/<repo>.git
cd <repo>
```

### 2. Buat Project Supabase

1. Buat akun di [supabase.com](https://supabase.com)
2. Buat project baru
3. Buka **SQL Editor** → jalankan isi file `supabase/schema.sql`
4. Buka **Settings** → **API** → catat **Project URL** dan **anon public key**

### 3. Buat Project di Vercel

1. Buka [vercel.com/new](https://vercel.com/new)
2. Import repo GitHub yang sudah di-fork
3. Framework Preset: **Next.js** (otomatis terdeteksi)

### 4. Set Environment Variables

Di Vercel dashboard → project → **Settings** → **Environment Variables**, tambahkan:

| Variable            | Nilai                      | Keterangan                                                                                      |
| ------------------- | -------------------------- | ----------------------------------------------------------------------------------------------- |
| `AUTH_SECRET`       | Random string 32+ karakter | Untuk enkripsi session. Generate di [secretkeygen.vercel.app](https://secretkeygen.vercel.app/) |
| `SUPABASE_URL`      | Project URL Supabase       | Dari Supabase dashboard → Settings → API                                                        |
| `SUPABASE_ANON_KEY` | anon public key            | Dari Supabase dashboard → Settings → API                                                        |

### 5. Deploy

Klik **Deploy**. Setelah selesai, buka URL project.

### 6. Mulai Pakai

1. Buka `https://<domain>/register` → buat akun
2. Login di `https://<domain>/login`
3. Kelola konten di dashboard `/admin`
4. Share landing page kamu: `https://<domain>/u/<username>`

---

## Development Lokal

### Prasyarat

- Node.js 18+
- npm
- Project Supabase (gratis di [supabase.com](https://supabase.com))

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
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGci...
```

Jalankan SQL schema di Supabase SQL Editor:

```bash
# Copy isi file supabase/schema.sql → paste di SQL Editor Supabase → Run
```

### Jalankan

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

---

## Cara Kerja

1. User daftar di `/register` → login di `/login`
2. Kelola konten di dashboard `/admin` (settings, video, edukasi, quiz, dll)
3. Setiap user punya landing page publik di `/u/<username>`
4. Peserta bisa akses landing page, ikut quiz pre/post-test
5. Data setiap user terpisah (multi-tenant)

## Struktur Admin

| Menu     | Fungsi                                                 |
| -------- | ------------------------------------------------------ |
| Settings | Nama situs, deskripsi, WhatsApp, judul section, footer |
| Sorotan  | Kelola video sorotan (YouTube)                         |
| Edukasi  | Kelola materi edukasi                                  |
| Media    | Video edukasi (hanya admin)                            |
| Quiz     | Kelola soal pre-test & post-test                       |
| Peserta  | Lihat data peserta & skor quiz                         |
| Akun     | Ubah username & password                               |

## Environment Variables

| Variable            | Wajib | Keterangan                    |
| ------------------- | ----- | ----------------------------- |
| `AUTH_SECRET`       | ✅    | Secret untuk NextAuth session |
| `SUPABASE_URL`      | ✅    | URL project Supabase          |
| `SUPABASE_ANON_KEY` | ✅    | Anon public key dari Supabase |

## Lisensi

MIT
