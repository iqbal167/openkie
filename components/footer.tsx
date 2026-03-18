interface FooterProps {
  footerText?: string
}

export function Footer({ footerText }: FooterProps) {
  return (
    <footer className="text-muted-foreground border-t py-6 text-center text-sm">
      <p>
        {footerText ||
          'Informasi ini bersifat edukatif dan bukan pengganti konsultasi profesional.'}
      </p>
    </footer>
  )
}
