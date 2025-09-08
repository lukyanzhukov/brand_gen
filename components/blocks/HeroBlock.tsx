import React from 'react'
import { HeroBlockProps } from '@/lib/types'

interface DirectionCard {
  title: string
  description: string
  icon?: string
  color?: string
}

export function HeroBlock({
  title,
  subtitle,
  cta,
  directions = [],
  logoUrl,
  variant,
  teamImage,
  slogan
}: HeroBlockProps) {
  return (
    <section className="py-12 px-4" style={{ backgroundColor: 'var(--surface)' }}>
      <div
        className="max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-xl"
        style={{ background: `linear-gradient(135deg, var(--hero-accent), var(--primary))` }}
      >
        {/* полоса hero */}
        <div className="relative p-10 lg:p-14">
          {/* pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full" style={{ backgroundColor: 'var(--background)' }} />
            <div className="absolute bottom-6 left-10 w-16 h-16 rounded-full" style={{ backgroundColor: 'var(--background)' }} />
          </div>

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center" style={{ color: 'var(--background)' }}>
            <div className="lg:col-span-7">
              <h1 className="text-3xl lg:text-5xl font-bold leading-tight">{title}</h1>
              <p className="mt-3 text-lg lg:text-2xl text-white/90">{subtitle}</p>
              {slogan && <p className="mt-3 text-base text-white/80 font-medium">{slogan}</p>}
              <button
                className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-xl text-base lg:text-lg font-semibold shadow-lg transition-transform hover:scale-[1.03]"
                style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
              >
                {cta}
              </button>
            </div>

            {/* правый медиа-блок по вариантам */}
            <div className="lg:col-span-5">
              {variant === 'withTeam' && teamImage && (
                <div className="aspect-[4/3] rounded-xl overflow-hidden ring-1 ring-white/10">
                  <img src={teamImage} alt="team" className="w-full h-full object-cover" />
                </div>
              )}
              {variant !== 'withTeam' && logoUrl && (
                <div className="flex items-center justify-center">
                  {/* логотип на стеклянной плашке */}
                  <div className="backdrop-blur-md bg-white/10 rounded-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logoUrl} alt="logo" className="h-24 object-contain" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* лента направлений (если есть) */}
        {directions.length > 0 && (
          <div className="bg-white/10">
            <div className="px-4 lg:px-8 py-5 overflow-x-auto scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none]"
                 style={{ WebkitOverflowScrolling: 'touch' }}>
              <div className="hidden lg:grid lg:grid-cols-3 gap-4">
                {directions.slice(0, 3).map((d, i) => (
                  <div key={i} className="rounded-xl p-5 bg-white text-left shadow-sm"
                       style={{ color: 'var(--foreground)' }}>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                           style={{ backgroundColor: 'color-mix(in srgb, var(--culture-accent) 5%, #fff)' }}>
                        <span className="text-xl">{d.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">{d.title}</h3>
                        <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>{d.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* slider для планшета/мобилки и случаев >3 */}
              <div className="flex lg:hidden gap-3 min-w-full">
                {directions.map((d, i) => (
                  <div key={i}
                       className="snap-start shrink-0 basis-[80%] xs:basis-[70%] sm:basis-[60%] rounded-xl p-5 bg-white shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                           style={{ backgroundColor: 'color-mix(in srgb, var(--culture-accent) 5%, #fff)' }}>
                        <span className="text-xl">{d.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>{d.title}</h3>
                        <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>{d.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
