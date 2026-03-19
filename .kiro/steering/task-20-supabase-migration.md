# Task 20: Migrasi Vercel Blob → Supabase PostgreSQL

## Objective

Ganti seluruh data layer dari Vercel Blob (JSON files) ke Supabase PostgreSQL. Auth tetap NextAuth, credentials disimpan di tabel Supabase.

## Context

- Vercel Blob punya limitasi CDN caching yang menyebabkan stale data
- Supabase terintegrasi di Vercel marketplace
- Semua blob keys: settings.json, highlight.json, education-materials.json, education-media.json, quiz.json, participants.json, admin.json

## Database Schema

```sql
-- Settings: single-row key-value store
CREATE TABLE settings (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  site_name TEXT NOT NULL DEFAULT 'OpenKIE',
  site_description TEXT NOT NULL DEFAULT 'Platform edukasi digital',
  whatsapp_number TEXT NOT NULL DEFAULT '',
  whatsapp_message_template TEXT NOT NULL DEFAULT 'Halo, saya ingin bertanya.',
  quiz_enabled BOOLEAN NOT NULL DEFAULT false,
  highlight_title TEXT NOT NULL DEFAULT '',
  education_title TEXT NOT NULL DEFAULT '',
  footer_text TEXT NOT NULL DEFAULT ''
);

-- Highlights (video sorotan)
CREATE TABLE highlights (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  video_id TEXT NOT NULL,
  position INT NOT NULL DEFAULT 0
);

-- Education Materials (materi edukasi)
CREATE TABLE education_materials (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  video_url TEXT NOT NULL DEFAULT '',
  position INT NOT NULL DEFAULT 0
);

-- Education Media (private admin videos)
CREATE TABLE education_media (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  video_url TEXT NOT NULL,
  position INT NOT NULL DEFAULT 0
);

-- Quiz Questions
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('preTest', 'postTest')),
  question TEXT NOT NULL,
  options JSONB NOT NULL DEFAULT '[]',
  correct_answer INT NOT NULL DEFAULT 0,
  position INT NOT NULL DEFAULT 0
);

-- Participants
CREATE TABLE participants (
  id SERIAL PRIMARY KEY,
  phone TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  pre_test JSONB,
  post_test JSONB,
  registered_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Admin credentials
CREATE TABLE admin (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  username TEXT NOT NULL,
  password_hash TEXT NOT NULL
);
```

## Steps

1. Install `@supabase/supabase-js`, hapus `@vercel/blob`
2. Buat `lib/supabase.ts` — server-side Supabase client
3. Buat `supabase/schema.sql` — SQL schema file
4. Rewrite `lib/data.ts` — ganti semua readBlob/writeBlob ke Supabase queries
5. Update `lib/types.ts` — sesuaikan types dengan DB schema (tambah id, position)
6. Update semua API routes — sesuaikan dengan data layer baru (CRUD by id, bukan index)
7. Update semua admin pages — sesuaikan dengan id-based operations
8. Update landing page — pastikan fetch dari Supabase
9. Update env vars: `.env.local`, `.env.example`
10. Update README — ganti instruksi Blob ke Supabase, update deploy button
11. Validate & build

## Environment Variables (baru)

- `SUPABASE_URL` — dari Supabase project
- `SUPABASE_ANON_KEY` — public anon key
- `AUTH_SECRET` — tetap untuk NextAuth

## Notes

- Auth tetap NextAuth + bcrypt, credentials di tabel `admin`
- Setup flow tetap sama: /admin/setup → buat akun → login
- Semua CRUD operations pakai id (bukan array index)
- `position` field untuk ordering items
- Hapus semua pending cache logic (tidak perlu lagi dengan DB)
