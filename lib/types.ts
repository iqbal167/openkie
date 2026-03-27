export interface User {
  id: string
  email: string
  username: string
}

export interface VideoTestimonial {
  id: number
  videoId: string
  title: string
}

export interface EducationMaterial {
  id: number
  name: string
  description: string
  videoUrl?: string
}

export interface SiteSettings {
  siteName: string
  siteDescription: string
  whatsappNumber: string
  whatsappMessageTemplate: string
  quizEnabled?: boolean
  highlightTitle?: string
  educationTitle?: string
  footerText?: string
  bgColorFrom?: string
  bgColorTo?: string
  logoUrl?: string
  bannerUrl?: string
  operatingHoursStart?: string
  operatingHoursEnd?: string
}

export interface Question {
  id: string
  type?: string
  question: string
  options: string[]
  correctAnswer: number
}

export interface QuizResult {
  score: number
  total: number
  completedAt: string
}

export interface Participant {
  id: number
  phone: string
  name: string
  preTest?: QuizResult
  postTest?: QuizResult
  registeredAt: string
}

export interface EducationMedia {
  id: number
  title: string
  videoUrl: string
}
