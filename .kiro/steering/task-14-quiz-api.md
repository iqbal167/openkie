# Task 14: API Routes — Quiz & Participants

## Deskripsi

API endpoints untuk registrasi peserta, submit quiz, dan admin CRUD soal.

## Endpoints

### Public (tanpa auth)

#### `POST /api/quiz/register`

- Body: `{ phone, nama }`
- Cek apakah phone sudah terdaftar
- Jika belum: buat participant baru, return `{ registered: true, participant }`
- Jika sudah: return `{ registered: false, participant }` (dengan status pre/post test)

#### `GET /api/quiz/questions?type=preTest|postTest`

- Return soal TANPA `jawabanBenar` (jangan bocorkan jawaban ke client)

#### `POST /api/quiz/submit`

- Body: `{ phone, type: 'preTest' | 'postTest', answers: number[] }`
- Validasi: phone terdaftar, type valid, belum pernah submit type ini
- Hitung skor, update participant, return `{ score, total }`

### Admin (auth required)

#### `GET/POST/PUT/DELETE /api/admin/quiz`

- CRUD soal pre-test & post-test
- Body POST/PUT: `{ type: 'preTest' | 'postTest', question: Question }`
- Body DELETE: `{ type, index }`

#### `GET /api/admin/participants`

- Return semua peserta + skor mereka

## Validasi

- `npm run validate && npm run build`
