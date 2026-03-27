interface FooterProps {
  footerText?: string
}

export function Footer({ footerText }: FooterProps) {
  return (
    <footer className="-mx-4 bg-white/60 py-6 text-center text-sm text-gray-700 backdrop-blur-sm md:-mx-8">
      <p>
        {footerText ||
          'Informasi ini bersifat edukatif dan bukan pengganti konsultasi profesional.'}
      </p>
    </footer>
  )
}
