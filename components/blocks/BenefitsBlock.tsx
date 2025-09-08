'use client';
import React from 'react';

import { BenefitsBlockProps } from '@/lib/types'

interface BenefitItem {
  title: string;
  description: string;
  category: 'financial' | 'social' | 'career';
  icon?: string;
}

export function BenefitsBlock({ title, subtitle, items = [], variant }: BenefitsBlockProps) {
  if (!items?.length) return null;

  return (
    <section className="py-12 px-4" style={{ backgroundColor: 'var(--benefits-bg)' }}>
      <div className="max-w-7xl mx-auto">
        <div
          className="rounded-2xl p-8 lg:p-12 shadow-xl"
          style={{ background: 'linear-gradient(135deg, var(--benefits-accent), var(--primary))' }}
        >
          {(title || subtitle) && (
            <header className="mb-6">
              {title && (
                <h2 className="text-3xl lg:text-5xl font-bold" style={{ color: 'var(--background)' }}>
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="mt-2 text-lg max-w-3xl" style={{ color: 'var(--background)' }}>
                  {subtitle}
                </p>
              )}
            </header>
          )}

          {/* Desktop / Tablet: грид растягивается на всю ширину */}
          <div className="hidden md:block">
            <div className="grid gap-4 lg:gap-5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
              {items.map((item, i) => (
                <div key={i} className="rounded-xl bg-white p-5 shadow-sm hover:shadow-md transition h-full flex flex-col">
                  <div className="relative w-12 h-12 rounded-xl mb-4 flex items-center justify-center ring-1 ring-black/5">
                    <span aria-hidden className="absolute inset-0 rounded-xl" style={{ backgroundColor: 'var(--accent)', opacity: 0.06 }} />
                    <span className="relative z-10 text-xl">{item.icon ?? '✨'}</span>
                  </div>

                  <h3 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
                    {item.title}
                  </h3>

                  <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                    {item.description}
                  </p>

                  <div className="mt-auto" />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: горизонтальный слайдер со snap */}
          <div
            className="md:hidden -mx-2 px-2 overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scroll"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <div className="flex gap-3 py-1">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="snap-start shrink-0 basis-[88%] xs:basis-[75%] sm:basis-[65%] rounded-xl bg-white p-5 shadow-sm hover:shadow-md transition flex flex-col"
                >
                  <div className="relative w-12 h-12 rounded-xl mb-4 flex items-center justify-center ring-1 ring-black/5">
                    <span aria-hidden className="absolute inset-0 rounded-xl" style={{ backgroundColor: 'var(--accent)', opacity: 0.06 }} />
                    <span className="relative z-10 text-xl">{item.icon ?? '✨'}</span>
                  </div>

                  <h3 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
                    {item.title}
                  </h3>

                  <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                    {item.description}
                  </p>

                  <div className="mt-auto" />
                </div>
              ))}
            </div>
          </div>

          {/* скрываем скроллбары только у .hide-scroll */}
          <style jsx>{`
            .hide-scroll::-webkit-scrollbar { display: none; }
            .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
        </div>
      </div>
    </section>
  );
}
