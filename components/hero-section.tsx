import Image from 'next/image'

interface HeroSectionProps {
  siteName: string
  siteDescription: string
  logoUrl?: string
  bannerUrl?: string
}

export function HeroSection({
  siteName,
  siteDescription,
  logoUrl,
  bannerUrl,
}: HeroSectionProps) {
  return (
    <section>
      {bannerUrl && (
        <div className="relative -mx-4 h-48 md:-mx-8 md:h-64">
          <Image
            src={bannerUrl}
            alt="Banner"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/30 text-white">
            {logoUrl && (
              <Image
                src={logoUrl}
                alt="Logo"
                width={120}
                height={120}
                className="h-20 w-20 rounded-full object-cover md:h-24 md:w-24"
                priority
              />
            )}
            <h1 className="text-xl font-bold tracking-tight drop-shadow-md md:text-2xl">
              {siteName}
            </h1>
          </div>
        </div>
      )}

      {!bannerUrl && (
        <div className="flex flex-col items-center gap-4 py-10 text-center md:py-14">
          {logoUrl && (
            <Image
              src={logoUrl}
              alt="Logo"
              width={120}
              height={120}
              className="h-28 w-28 rounded-full object-cover md:h-32 md:w-32"
              priority
            />
          )}
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            {siteName}
          </h1>
        </div>
      )}

      <div className="-mx-4 mt-4 bg-white/60 px-4 py-3 text-center backdrop-blur-sm md:-mx-8 md:px-8">
        <p className="leading-relaxed text-gray-700 md:text-lg">
          {siteDescription}
        </p>
      </div>
    </section>
  )
}
