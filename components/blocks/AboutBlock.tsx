'use client';
import React from 'react';
import Image from 'next/image';
import { AboutBlockProps } from '@/lib/types';

interface Achievement {
  number: string;
  label: string;
  description?: string;
  image?: string;
}

export function AboutBlock({
  title,
  content,
  bullets = [],
  slogan,
  achievements = [],
  companyImage,
  socialLinks = [],
  variant,
}: AboutBlockProps) {
  return (
    <section className="py-12 px-4" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="max-w-7xl mx-auto">
        <div
          className="rounded-2xl p-8 lg:p-12 shadow-xl"
          style={{ background: `linear-gradient(135deg, var(--about-accent), var(--primary))` }}
        >
          {/* GRID: текст слева, достижения справа */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* left (text) */}
            <div className="lg:col-span-7">
              <h2
                className="text-3xl lg:text-5xl font-bold tracking-tight"
                style={{ color: 'var(--background)' }}
              >
                {title}
              </h2>

              {slogan && (
                <p
                  className="mt-3 text-lg lg:text-xl font-medium"
                  style={{ color: 'var(--background)' }}
                >
                  {slogan}
                </p>
              )}

              <p
                className="mt-5 text-base lg:text-lg leading-relaxed max-w-3xl"
                style={{ color: 'var(--background)' }}
              >
                {content}
              </p>

              {bullets?.length > 0 && (
                <ul className="mt-5 space-y-2">
                  {bullets.map((b, i) => (
                    <li key={i} className="flex gap-2">
                      <span
                        className="mt-2 inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: 'var(--background)' }}
                      />
                      <span className="text-base" style={{ color: 'var(--background)' }}>
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* right (achievements) */}
            <div className="lg:col-span-5">
              <div
                className="rounded-xl p-5 lg:p-6 shadow-sm"
                style={{ backgroundColor: 'var(--background)', opacity: 0.98 }}
              >
                {/* сетка карточек достижений */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {achievements.slice(0, 4).map((a, i, arr) => {
                    const isLastOdd = i === arr.length - 1 && arr.length % 2 !== 0;
                    return (
                      <div
                        key={i}
                        className={`rounded-lg p-4 h-full flex flex-col ${isLastOdd ? 'sm:col-span-2' : ''}`}
                        style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div
                            className="text-2xl font-extrabold leading-none"
                            style={{ color: 'var(--about-accent)' }}
                          >
                            {a.number}
                          </div>
                          {/* мини превью при наличии */}
                          {a.image && (
                            <div className="relative w-12 h-12 rounded-md overflow-hidden">
                              <Image
                                src={a.image}
                                alt={a.label}
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            </div>
                          )}
                        </div>

                        <div className="mt-2">
                          <div
                            className="text-base font-semibold"
                            style={{ color: 'var(--foreground)' }}
                          >
                            {a.label}
                          </div>
                          {a.description && (
                            <p
                              className="mt-1 text-sm leading-relaxed"
                              style={{ color: 'var(--muted-foreground)' }}
                            >
                              {a.description}
                            </p>
                          )}
                        </div>

                        {/* растягиваем описание, чтобы карточки были одинаковой высоты */}
                        <div className="mt-auto" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {/* /GRID */}
        </div>
      </div>
    </section>
  );
}
