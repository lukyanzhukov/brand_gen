'use client';
import React, { useRef } from 'react';

import { GeoBlockProps } from '@/lib/types'

interface Location {
  city: string;
  country: string;
  description?: string;
  type?: string;
  image?: string;
}

export function GeoBlock({ title, subtitle, locations = [], variant, mapImage }: GeoBlockProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollByCards = (dir: 'left' | 'right') => {
    const el = scrollerRef.current; if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -420 : 420, behavior: 'smooth' });
  };

  return (
    <section className="py-12 px-4" style={{ backgroundColor: 'var(--geo-bg)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-2xl p-8 lg:p-12 shadow-xl"
             style={{ background: `linear-gradient(135deg, var(--geo-accent), var(--primary))` }}>
          <header className="mb-6 text-left">
            <h2 className="text-3xl lg:text-5xl font-bold" style={{ color: 'var(--background)' }}>{title}</h2>
            {subtitle && <p className="mt-2 text-lg max-w-3xl" style={{ color: 'var(--background)' }}>{subtitle}</p>}
          </header>

          <div className="relative">
            <div ref={scrollerRef}
                 className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-10 pt-1 pb-2"
                 style={{ WebkitOverflowScrolling:'touch', scrollbarWidth:'none', msOverflowStyle:'none' }}>
              <style jsx>{`div::-webkit-scrollbar{display:none}`}</style>
              {locations.map((l,i)=>(
                <div key={i}
                     className="snap-start shrink-0 basis-[85%] sm:basis-[60%] md:basis-[48%] lg:basis-[40%] xl:basis-[32%] 2xl:basis-[28%] rounded-xl bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                         style={{ backgroundColor:'color-mix(in srgb, var(--accent) 5%, #fff)' }}>
                      <span className="text-xl">🏢</span>
                    </div>
                    <div>
                      <h3 className="font-semibold" style={{ color:'var(--foreground)' }}>{l.city}, {l.country}</h3>
                      {(l.description||l.type) && (
                        <p className="text-sm mt-1" style={{ color:'var(--muted-foreground)' }}>
                          {l.description||l.type}
                        </p>
                      )}
                    </div>
                  </div>
                  {l.image && (
                    <div className="mt-4 aspect-[16/9] rounded-lg overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={l.image} alt={l.city} className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {locations.length>2 && (
              <>
                <button type="button" onClick={()=>scrollByCards('left')}
                        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full items-center justify-center shadow-md hover:shadow-lg"
                        style={{ backgroundColor:'var(--background)', color:'var(--foreground)' }} aria-label="Scroll left">‹</button>
                <button type="button" onClick={()=>scrollByCards('right')}
                        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-9 h-9 rounded-full items-center justify-center shadow-md hover:shadow-lg"
                        style={{ backgroundColor:'var(--background)', color:'var(--foreground)' }} aria-label="Scroll right">›</button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
