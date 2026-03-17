import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/constants'

export function HeroSection() {
  return (
    <section className="flex flex-col items-center gap-4 py-10 text-center">
      <div className="bg-primary/10 flex h-32 w-32 items-center justify-center rounded-full text-4xl">
        🏥
      </div>
      <h1 className="text-2xl font-bold tracking-tight">{SITE_NAME}</h1>
      <p className="text-muted-foreground leading-relaxed">
        {SITE_DESCRIPTION}
      </p>
    </section>
  )
}
