# Task 13: Pre-Test & Post-Test — Types & Data Layer

## Deskripsi

Tambah types dan data layer untuk fitur quiz (pre-test & post-test). Data peserta dan soal disimpan di Vercel Blob terpisah dari settings.

## Perubahan

### 1. Update `lib/types.ts` — tambah types baru

```ts
export interface Question {
  id: string
  soal: string
  pilihan: string[]
  jawabanBenar: number // index pilihan yang benar
}

export interface QuizData {
  preTest: Question[]
  postTest: Question[]
}

export interface Participant {
  phone: string // nomor WA
  nama: string
  preTest?: { score: number; total: number; completedAt: string }
  postTest?: { score: number; total: number; completedAt: string }
  registeredAt: string
}
```

### 2. Update `lib/data.ts` — tambah repository functions

- `getQuizData(): Promise<QuizData>` — baca dari blob `quiz.json`
- `saveQuizData(data: QuizData): Promise<void>` — tulis ke blob `quiz.json`
- `getParticipants(): Promise<Participant[]>` — baca dari blob `participants.json`
- `saveParticipants(data: Participant[]): Promise<void>` — tulis ke blob `participants.json`
- `getParticipantByPhone(phone: string): Promise<Participant | undefined>`

Default: `{ preTest: [], postTest: [] }` dan `[]`

### 3. Validasi

- `npm run validate && npm run build`
