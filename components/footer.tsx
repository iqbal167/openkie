export function Footer() {
  return (
    <footer className="text-muted-foreground border-t py-6 text-center text-sm">
      <p>
        Informasi ini bersifat edukatif dan bukan pengganti konsultasi medis
        profesional.
      </p>
      <p className="mt-2">
        &copy; {new Date().getFullYear()} Kelurahan Karang Timur, Kota Tangerang
      </p>
    </footer>
  )
}
