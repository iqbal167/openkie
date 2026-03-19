import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight">OpenKIE</h1>
      <p className="text-muted-foreground mt-3 max-w-md text-lg">
        Platform KIE digital open-source. Buat landing page edukasi dengan
        video, materi, dan quiz — gratis.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/register"
          className="bg-primary text-primary-foreground rounded-lg px-6 py-3 text-sm font-semibold"
        >
          Daftar Gratis
        </Link>
        <Link
          href="/login"
          className="rounded-lg border px-6 py-3 text-sm font-semibold"
        >
          Masuk
        </Link>
      </div>
      <div className="text-muted-foreground mt-16 grid max-w-lg gap-6 text-left text-sm">
        <div>
          <p className="text-foreground font-semibold">
            📱 Landing Page Per User
          </p>
          <p>Setiap user punya halaman publik di /u/username</p>
        </div>
        <div>
          <p className="text-foreground font-semibold">
            🎬 Video & Materi Edukasi
          </p>
          <p>Embed YouTube, materi dengan deskripsi lengkap</p>
        </div>
        <div>
          <p className="text-foreground font-semibold">
            ✅ Quiz Pre-Test & Post-Test
          </p>
          <p>Ukur pemahaman peserta sebelum dan sesudah belajar</p>
        </div>
        <div>
          <p className="text-foreground font-semibold">⚙️ Dashboard Admin</p>
          <p>Kelola semua konten dari satu tempat</p>
        </div>
      </div>
    </div>
  )
}
