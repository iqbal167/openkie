# Task 15: Landing Page — Quiz Flow UI

## Deskripsi

Update landing page agar edukasi di-gate oleh pre-test. Flow:

1. User buka halaman → lihat Hero + Video seperti biasa
2. Di section edukasi, tampilkan form input nomor WA + nama
3. Setelah register/login:
   - Jika belum pre-test → tampilkan quiz pre-test (10 soal pilihan ganda)
   - Jika sudah pre-test → tampilkan materi edukasi + tombol "Mulai Post-Test"
   - Jika sudah post-test → tampilkan materi edukasi + ringkasan skor pre & post
4. State peserta disimpan di localStorage (phone) agar tidak perlu input ulang

## Komponen Baru

### `components/quiz-gate.tsx` (Client Component)

- Wrapper yang mengatur flow: register → pre-test → edukasi → post-test
- State: `phone`, `participant`, `step` (register | preTest | edukasi | postTest | done)
- Fetch participant status dari API saat phone disubmit

### `components/quiz-form.tsx` (Client Component)

- Tampilkan soal satu per satu atau semua sekaligus (scroll)
- Pilihan ganda, tombol submit di akhir
- Tampilkan skor setelah submit

### `components/phone-register.tsx` (Client Component)

- Form input nomor WA + nama
- Validasi format nomor (08xxx atau 628xxx)

## Update `app/page.tsx`

- Ganti `<EdukasiSection>` langsung → bungkus dalam `<QuizGate>` yang mengatur flow

## Validasi

- `npm run validate && npm run build`
