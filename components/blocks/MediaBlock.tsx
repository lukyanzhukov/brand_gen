'use client';
import React from 'react';

import { MediaBlockProps } from '@/lib/types'

interface MediaItem {
  title: string;
  description: string;
  url: string;
  type: string; // 'article' | 'video' | 'podcast' | ...
  image?: string;
}

const typeIcon = (t?: string) => {
  if (!t) return '📰';
  const s = t.toLowerCase();
  if (s.includes('video')) return '🎥';
  if (s.includes('pod')) return '🎧';
  if (s.includes('report') || s.includes('pdf')) return '📄';
  return '📰';
};

export function MediaBlock({ title, subtitle, items = [], variant }: MediaBlockProps) {
const Preview = ({ item }: { item: MediaItem }) => (
  <>
    {item.image ? (
      <div className="aspect-[16/9] rounded-lg overflow-hidden mb-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
      </div>
    ) : (
      <div className="aspect-[16/9] rounded-lg mb-3 flex items-center justify-center bg-gray-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h7l2 2h5a2 2 0 012 2v10a2 2 0 01-2 2z"
          />
        </svg>
      </div>
    )}
  </>
);

  return (
    <section className="py-12 px-4" style={{ backgroundColor: 'var(--media-bg)' }}>
      <div className="max-w-7xl mx-auto">
        <div
          className="rounded-2xl p-8 lg:p-12 shadow-xl"
          style={{ background: `linear-gradient(135deg, var(--media-accent), var(--primary))` }}
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

          {/* desktop/tablet grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((m, i) => (
              <a
                key={i}
                href={m.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-white p-5 shadow-sm hover:shadow-md transition"
              >
                <Preview item={m} />
                <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>
                  {m.title}
                </h3>
                {m.description && (
                  <p className="text-sm mt-1 line-clamp-3" style={{ color: 'var(--muted-foreground)' }}>
                    {m.description}
                  </p>
                )}
              </a>
            ))}
          </div>

          {/* mobile slider */}
          <div className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory">
            <style jsx>{`div::-webkit-scrollbar{display:none}`}</style>
            {items.map((m, i) => (
              <a
                key={i}
                href={m.url}
                target="_blank"
                rel="noreferrer"
                className="snap-start shrink-0 basis-[85%] rounded-xl bg-white p-5 shadow-sm"
              >
                <Preview item={m} />
                <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>
                  {m.title}
                </h3>
                {m.description && (
                  <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
                    {m.description}
                  </p>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
