'use client';
import React from 'react';

import { TracksBlockProps } from '@/lib/types'

interface TrackItem {
  title: string;
  description: string;
  icon?: string;
  examples?: string[];
  image?: string;
}

export function TracksBlock({ title, subtitle, items = [], variant, stats = [] }: TracksBlockProps) {
  return (
    <section className="py-12 px-4" style={{ backgroundColor: 'var(--tracks-bg)' }}>
      <div className="max-w-7xl mx-auto">
        <div
          className="rounded-2xl p-8 lg:p-12 shadow-xl"
          style={{ background: `linear-gradient(135deg, var(--tracks-accent), var(--primary))` }}
        >
          <header className="mb-6">
            <h2 className="text-3xl lg:text-5xl font-bold" style={{ color: 'var(--background)' }}>
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-lg max-w-3xl" style={{ color: 'var(--background)' }}>
                {subtitle}
              </p>
            )}
          </header>

          {/* Desktop/tablet grid без пустот */}
          <div className="hidden md:grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
            {items.map((item, i) => (
              <div key={i} className="rounded-xl p-5 bg-white shadow-sm">
                {item.icon && (
                  <div
                    className="w-10 h-10 rounded-lg mb-3 flex items-center justify-center"
                    style={{ backgroundColor: 'color-mix(in srgb, var(--tracks-accent) 5%, #fff)' }}
                  >
                    <span className="text-xl">{item.icon}</span>
                  </div>
                )}
                <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>
                  {item.title}
                </h3>
                <p className="text-sm mt-2 line-clamp-3" style={{ color: 'var(--muted-foreground)' }}>
                  {item.description}
                </p>
                {item.examples?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.examples.slice(0, 3).map((ex, j) => (
                      <span
                        key={j}
                        className="text-xs px-2 py-1 rounded-full"
                        style={{ backgroundColor: 'var(--primary)', color: 'var(--background)', opacity: 0.9 }}
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          {/* Мобайл: горизонтальный слайдер */}
          <div className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory">
            <style jsx>{`div::-webkit-scrollbar{display:none}`}</style>
            {items.map((item, i) => (
              <div key={i} className="snap-start shrink-0 basis-[80%] rounded-xl p-5 bg-white shadow-sm">
                <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>
                  {item.title}
                </h3>
                <p className="text-sm mt-2" style={{ color: 'var(--muted-foreground)' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
