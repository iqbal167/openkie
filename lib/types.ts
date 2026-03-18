export interface VideoTestimonial {
  id: string
  title: string
}

export interface EducationMaterial {
  name: string
  description: string
  videoUrl?: string
}

export interface SiteSettings {
  siteName: string
  siteDescription: string
  whatsappNumber: string
  whatsappMessageTemplate: string
  educationMaterials: EducationMaterial[]
  quizEnabled?: boolean
  highlightTitle?: string
  educationTitle?: string
  footerText?: string
}

export interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
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
  name: string
  preTest?: QuizResult
  postTest?: QuizResult
  registeredAt: string
}

export interface EducationMedia {
  title: string
  videoUrl: string
}
