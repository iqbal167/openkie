interface HeroSectionProps {
  siteName: string
  siteDescription: string
}

export function HeroSection({ siteName, siteDescription }: HeroSectionProps) {
  return (
    <section className="flex flex-col items-center gap-4 py-10 text-center">
      <div className="bg-primary/10 flex h-32 w-32 items-center justify-center rounded-full text-4xl">
        🏥
      </div>
      <h1 className="text-2xl font-bold tracking-tight">{siteName}</h1>
      <p className="text-muted-foreground leading-relaxed">{siteDescription}</p>
    </section>
  )
}
