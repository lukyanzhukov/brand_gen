import React from 'react';

import { CultureBlockProps } from '@/lib/types'

interface CultureItem {
  title: string;
  description: string;
  icon?: string;
  image?: string;
}

export function CultureBlock({ title, subtitle, items = [], variant }: CultureBlockProps) {
  return (
    <section className="py-12 px-4" style={{ backgroundColor: 'var(--culture-bg)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="rounded-2xl p-8 lg:p-12 shadow-xl"
             style={{ background:`linear-gradient(135deg, var(--culture-accent), var(--primary))` }}>
          <header className="mb-6">
            <h2 className="text-3xl lg:text-5xl font-bold" style={{ color:'var(--background)' }}>{title}</h2>
            {subtitle && <p className="mt-2 text-lg max-w-3xl" style={{ color:'var(--background)' }}>{subtitle}</p>}
          </header>

          <div className="grid gap-4">
            {items.map((it,i)=>(
              <div key={i} className="grid md:grid-cols-3 gap-4 bg-white rounded-xl p-5 shadow-sm items-stretch">
                {it.image && (
                  <div className="md:col-span-1 aspect-[16/10] rounded-lg overflow-hidden">
                    <img src={it.image} alt={it.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className={it.image ? 'md:col-span-2' : 'md:col-span-3'}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                         style={{ backgroundColor:'color-mix(in srgb, var(--culture-accent) 5%, #fff)', }}>
                      <span className="text-xl">{it.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold" style={{ color:'var(--foreground)' }}>{it.title}</h3>
                      <p className="text-sm mt-1" style={{ color:'var(--muted-foreground)' }}>{it.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
