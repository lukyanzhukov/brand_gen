import React from 'react'

interface FactItem {
  number: string
  label: string
  description?: string
  icon?: string
  image?: string
}

interface FactsBlockProps {
  title: string
  subtitle?: string
  items: FactItem[]
  variant: string
}

export function FactsBlock({ title, subtitle, items = [], variant }: FactsBlockProps) {
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

        <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-3xl p-12 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {items.map((item, index) => (
              <div key={index} className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  {item.icon && (
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">{item.icon}</span>
                    </div>
                  )}
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {item.number}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {item.label}
                  </h3>
                  {item.description && (
                    <p className="text-gray-600 text-sm">
                      {item.description}
                    </p>
                  )}
                  {item.image && (
                    <div className="mt-4 w-full h-20 relative">
                      <img
                        src={item.image}
                        alt={item.label}
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