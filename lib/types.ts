export interface VideoTestimonial {
  id: string
  title: string
}

export interface MetodeMKJP {
  nama: string
  deskripsi: string
  kelebihan: string[]
  efekSamping: string[]
  mitosVsFakta: { mitos: string; fakta: string }
  videoUrl?: string
}

export interface SiteSettings {
  siteName: string
  siteDescription: string
  whatsappNumber: string
  whatsappMessageTemplate: string
  videoTestimonials: VideoTestimonial[]
  metodeMKJP: MetodeMKJP[]
  quizEnabled?: boolean
}

export interface Question {
  id: string
  soal: string
  pilihan: string[]
  jawabanBenar: number
}

export interface QuizData {
  preTest: Question[]
  postTest: Question[]
}

export interface QuizResult {
  score: number
  total: number
  completedAt: string
}

export interface Participant {
  phone: string
  nama: string
  preTest?: QuizResult
  postTest?: QuizResult
  registeredAt: string
}
