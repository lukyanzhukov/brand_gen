import React from 'react';

import { HiringBlockProps } from '@/lib/types'

interface HiringItem {
  title: string;
  description: string;
  duration?: string;
  icon?: string;
  image?: string;
}

export function HiringBlock({ title, subtitle, items = [], variant }: HiringBlockProps) {
  return (
    <section className="py-12 px-4" style={{ backgroundColor: 'var(--hiring-bg)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="rounded-2xl p-8 lg:p-12 shadow-xl"
             style={{ background:`linear-gradient(135deg, var(--hiring-accent), var(--primary))` }}>
          <header className="mb-6">
            <h2 className="text-3xl lg:text-5xl font-bold" style={{ color:'var(--background)' }}>{title}</h2>
            {subtitle && <p className="mt-2 text-lg max-w-3xl" style={{ color:'var(--background)' }}>{subtitle}</p>}
          </header>

          {/* GRID-степпер: узкая колонка под линию + контент */}
          <div className="relative grid grid-cols-[32px_1fr] gap-4">
            <div className="absolute top-0 bottom-0 left-0 w-[32px]">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
                   style={{ background:'linear-gradient(to bottom, rgba(255,255,255,.35), rgba(255,255,255,.2))' }} />
            </div>

            {items.map((it,i)=>(
              <React.Fragment key={i}>
                <div className="relative">
                  <span className="absolute left-1/2 -translate-x-1/2 top-5 block w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor:'var(--background)', boxShadow:'0 0 0 3px rgba(255,255,255,.35)' }} />
                </div>
                <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm">
                  <h3 className="font-semibold" style={{ color:'var(--foreground)' }}>{it.title}</h3>
                  <p className="text-sm mt-1" style={{ color:'var(--muted-foreground)' }}>{it.description}</p>
                  {it.duration && <p className="text-xs mt-2" style={{ color:'var(--muted-foreground)' }}>{it.duration}</p>}
                  {it.image && (
                    <div className="mt-3 aspect-[16/9] rounded-lg overflow-hidden">
                      <img src={it.image} alt={it.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
