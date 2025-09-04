import React from 'react'

interface TrackItem {
  title: string
  description: string
  icon?: string
  examples?: string[]
  image?: string
}

interface TracksBlockProps {
  title: string
  subtitle?: string
  items: TrackItem[]
  variant: 'grid' | 'list' | 'cards'
  stats?: { label: string; value: string }[]
}

export function TracksBlock({
  title,
  subtitle,
  items = [],
  variant,
  stats = []
}: TracksBlockProps) {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl p-12 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <div key={index} className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  {item.icon && (
                    <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">{item.icon}</span>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {item.description}
                  </p>
                  {item.examples && item.examples.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-gray-700">Примеры вакансий:</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {item.examples.slice(0, 3).map((example, idx) => (
                          <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {item.image && (
                    <div className="mt-4 w-full h-20 relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}