import { CTABlockProps } from '@/lib/types'

export function CTABlock({ title, description, buttonText, buttonUrl, variant }: CTABlockProps) {
  return (
    <section className="py-12 px-4" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="max-w-7xl mx-auto">
        <div
          className="rounded-2xl p-10 lg:p-14 shadow-2xl text-center relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, var(--cta-bg), var(--primary))` }}
        >
          {/* фоновый декор */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full" style={{ backgroundColor: 'var(--background)' }} />
            <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full" style={{ backgroundColor: 'var(--background)' }} />
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--cta-text)' }}>
              {title}
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto" style={{ color: 'var(--cta-text)' }}>
              {description}
            </p>

            {/* КНОПКА: цвет текста управляется var(--cta-button-text) */}
            <a
              href={buttonUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cta-button
              className="inline-flex items-center justify-center px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                backgroundColor: 'var(--background)',
                color: 'var(--cta-button-text, var(--foreground))',
              }}
            >
              {buttonText}
            </a>
          </div>

          {/* жестко фиксируем цвет текста кнопки, если сверху что-то переопределяет */}
          <style jsx>{`
            [data-cta-button] {
              color: var(--cta-button-text, var(--foreground)) !important;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
