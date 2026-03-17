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
}

export interface SiteSettings {
  siteName: string
  siteDescription: string
  whatsappNumber: string
  whatsappMessageTemplate: string
  videoTestimonials: VideoTestimonial[]
  metodeMKJP: MetodeMKJP[]
}
