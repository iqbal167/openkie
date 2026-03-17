export const SITE_NAME = 'KIE MKJP Kelurahan Karang Timur'
export const SITE_DESCRIPTION =
  'Informasi lengkap Metode Kontrasepsi Jangka Panjang (MKJP) untuk warga Kelurahan Karang Timur, Kota Tangerang.'

export interface VideoTestimonial {
  id: string
  title: string
}

// TODO: ganti dengan video ID YouTube unlisted yang sebenarnya
export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  { id: 'dQw4w9WgXcQ', title: 'Testimoni Ibu Sari — Pengguna IUD' },
  { id: 'dQw4w9WgXcQ', title: 'Testimoni Ibu Rina — Pengguna Implan' },
]

export const WHATSAPP_NUMBER = '6281234567890' // TODO: ganti nomor Kader KB
export const WHATSAPP_MESSAGE_TEMPLATE =
  'Halo Kader KB, saya ingin konsultasi tentang MKJP.'
