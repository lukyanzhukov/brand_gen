import { FactsBlockProps } from '@/lib/types'

export function FactsBlock({ title, subtitle, items = [], variant }: FactsBlockProps) {
  return (
    <section className="py-12 px-4" style={{ backgroundColor: 'var(--facts-bg)' }}>
      <div className="max-w-7xl mx-auto">
        <div
          className="rounded-2xl p-8 lg:p-12 shadow-xl"
          style={{ background: `linear-gradient(135deg, var(--facts-accent), var(--primary))` }}
        >
          <header className="mb-8 text-center">
            <h2 className="text-3xl lg:text-5xl font-bold" style={{ color: 'var(--background)' }}>
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-lg max-w-3xl mx-auto" style={{ color: 'var(--background)' }}>
                {subtitle}
              </p>
            )}
          </header>

          <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
            {items.map((it, i) => (
              <div
                key={i}
                className="rounded-xl bg-white p-5 shadow-sm text-center"
              >
                <div className="text-3xl font-bold" style={{ color: 'var(--facts-accent)' }}>
                  {it.number}
                </div>
                <div className="mt-1 font-semibold" style={{ color: 'var(--foreground)' }}>
                  {it.label}
                </div>
                {it.description && (
                  <p className="mt-1 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                    {it.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
